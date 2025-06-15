
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConsultationModal } from "./hooks/useConsultationModal";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Step = 0 | 1 | 2;

const SERVICE_LABELS: Record<string, string> = {
  automation: "Custom AI Automation",
  consulting: "1:1 Consulting",
  get_started: "AI Consultation",
  work_with_me: "Work With Me / Partnership",
  general: "General Inquiry",
  newsletter: "Newsletter Signup",
};

export function ConsultationModal() {
  const { state, close } = useConsultationModal();
  const [step, setStep] = useState<Step>(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: state.initialEmail || "",
    company: "",
    phone: "",
    service_type: state.serviceType,
    project_description: "",
    goals: "",
    current_challenges: "",
    budget_range: "",
    timeline: "",
    preferred_contact_method: "",
    referral_info: "",
  });

  // Update service type if/when modal is opened by another CTA
  if (form.service_type !== state.serviceType) {
    form.service_type = state.serviceType;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    setLoading(true);

    try {
      // Save to consultation_requests table
      const { error } = await supabase.from("consultation_requests").insert([
        {
          ...form,
          service_type: state.serviceType,
          source: state.source,
        },
      ]);
      if (error) throw error;

      // Call Edge function for notification (emails)
      const edgeRes = await fetch(
        `https://tvbeqmtafjmebiqtkhtd.functions.supabase.co/send-lead-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, service_type: state.serviceType, source: state.source }),
        }
      );

      if (!edgeRes.ok) {
        const msg = await edgeRes.text();
        throw new Error(msg || "Failed to send email notifications");
      }
      setSuccess(true);
      toast({
        title: "Request submitted!",
        description:
          "Your information was received. We'll follow up soon. Confirmation has been sent to your email.",
      });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message || "Failed to send your request. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeAndReset = () => {
    setStep(0);
    setSuccess(false);
    setForm({
      name: "",
      email: state.initialEmail || "",
      company: "",
      phone: "",
      service_type: state.serviceType,
      project_description: "",
      goals: "",
      current_challenges: "",
      budget_range: "",
      timeline: "",
      preferred_contact_method: "",
      referral_info: "",
    });
    close();
  };

  // Steps: 0 - Contact Info, 1 - Project/Details, 2 - Confirmation
  return (
    <Dialog open={state.isOpen} onOpenChange={closeAndReset}>
      <DialogContent className="max-w-lg">
        <DialogTitle>
          {
            success
              ? "Thank you for reaching out!"
              : SERVICE_LABELS[state.serviceType] || "Contact Request"
          }
        </DialogTitle>
        <DialogDescription>
          {success
            ? "We'll be in touch shortly. Check your inbox for confirmation!"
            : "Please provide your information and we'll contact you soon."}
        </DialogDescription>

        {!success && (
          <form
            className="space-y-4 py-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (step < 2) return setStep((s) => ((s + 1) as Step));
              void onSubmit();
            }}
          >
            {step === 0 && (
              <>
                <Input name="name" value={form.name} onChange={handleChange} disabled={loading} placeholder="Your Name" required />
                <Input type="email" name="email" value={form.email} onChange={handleChange} disabled={!!state.initialEmail || loading} placeholder="Email" required />
                <Input name="company" value={form.company} onChange={handleChange} disabled={loading} placeholder="Company (optional)" />
                <Input name="phone" value={form.phone} onChange={handleChange} disabled={loading} placeholder="Phone (optional)" />
              </>
            )}
            {step === 1 && (
              <>
                {form.service_type !== "newsletter" && (
                  <>
                    <textarea name="project_description" value={form.project_description} onChange={handleChange} disabled={loading} placeholder="Project Description" className="w-full rounded px-3 py-2 border bg-background" />
                    <textarea name="goals" value={form.goals} onChange={handleChange} disabled={loading} placeholder="Your Goals" className="w-full rounded px-3 py-2 border bg-background" />
                    <textarea name="current_challenges" value={form.current_challenges} onChange={handleChange} disabled={loading} placeholder="Current Challenges" className="w-full rounded px-3 py-2 border bg-background" />
                    <Input name="budget_range" value={form.budget_range} onChange={handleChange} disabled={loading} placeholder="Budget Range (optional)" />
                    <Input name="timeline" value={form.timeline} onChange={handleChange} disabled={loading} placeholder="Timeline (optional)" />
                    <Input name="preferred_contact_method" value={form.preferred_contact_method} onChange={handleChange} disabled={loading} placeholder="Preferred Contact Method" />
                    <Input name="referral_info" value={form.referral_info} onChange={handleChange} disabled={loading} placeholder="How did you hear about us? (optional)" />
                  </>
                )}
                {form.service_type === "newsletter" && (
                  <p className="text-sm text-muted-foreground text-center">You're signing up for the newsletter! Just hit next to confirm.</p>
                )}
              </>
            )}
            <div className="flex gap-2 mt-4">
              {step > 0 && (
                <Button type="button" variant="outline" onClick={() => setStep((s) => ((s - 1) as Step))} disabled={loading}>
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="ml-auto"
                disabled={loading}
              >
                {step < 1 ? "Next" : "Submit"}
              </Button>
            </div>
          </form>
        )}
        {success && (
          <Button onClick={closeAndReset} className="w-full">Close</Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
