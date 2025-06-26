
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useConsultationModal } from "./hooks/useConsultationModal";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MODAL_CONFIG = {
  quick_contact: {
    title: "Quick Contact",
    description: "Send us a quick message and we'll get back to you!",
    fields: ["name", "email", "message"]
  },
  detailed_consultation: {
    title: "AI Consultation",
    description: "Let's discuss your AI automation needs in detail.",
    fields: ["name", "email", "company", "phone", "project_description", "goals", "budget_range", "timeline"]
  },
  newsletter: {
    title: "Newsletter Signup",
    description: "Stay updated with the latest AI automation tips and insights.",
    fields: ["name", "email"]
  },
  general: {
    title: "Contact Us",
    description: "Get in touch with us for any inquiries.",
    fields: ["name", "email", "message"]
  }
};

export function ConsultationModal() {
  const { state, close } = useConsultationModal();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: state.initialEmail || "",
    company: "",
    phone: "",
    project_description: "",
    goals: "",
    budget_range: "",
    timeline: "",
    message: "",
  });

  const config = MODAL_CONFIG[state.modalType];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data for submission
      const submissionData = {
        name: form.name,
        email: form.email,
        company: form.company || null,
        phone: form.phone || null,
        service_type: state.modalType,
        project_description: form.project_description || form.message || null,
        goals: form.goals || null,
        budget_range: form.budget_range || null,
        timeline: form.timeline || null,
        source: state.source,
        status: 'new'
      };

      // Save to consultation_requests table
      const { error } = await supabase.from("consultation_requests").insert([submissionData]);
      if (error) throw error;

      // Call Edge function for notification (emails)
      const edgeRes = await fetch(
        `https://tvbeqmtafjmebiqtkhtd.functions.supabase.co/send-lead-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }
      );

      if (!edgeRes.ok) {
        const msg = await edgeRes.text();
        throw new Error(msg || "Failed to send email notifications");
      }
      
      setSuccess(true);
      toast({
        title: "Request submitted!",
        description: "Your information was received. We'll follow up soon. Confirmation has been sent to your email.",
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
    setSuccess(false);
    setForm({
      name: "",
      email: state.initialEmail || "",
      company: "",
      phone: "",
      project_description: "",
      goals: "",
      budget_range: "",
      timeline: "",
      message: "",
    });
    close();
  };

  const renderField = (fieldName: string) => {
    const commonProps = {
      name: fieldName,
      value: form[fieldName as keyof typeof form],
      onChange: handleChange,
      disabled: loading,
      required: ["name", "email", "message"].includes(fieldName)
    };

    switch (fieldName) {
      case "name":
        return <Input {...commonProps} placeholder="Your Name" />;
      case "email":
        return <Input {...commonProps} type="email" placeholder="Email Address" disabled={!!state.initialEmail || loading} />;
      case "company":
        return <Input {...commonProps} placeholder="Company (optional)" required={false} />;
      case "phone":
        return <Input {...commonProps} placeholder="Phone (optional)" required={false} />;
      case "project_description":
        return <Textarea {...commonProps} placeholder="Describe your project or needs" className="min-h-[100px]" />;
      case "goals":
        return <Textarea {...commonProps} placeholder="What are your main goals?" required={false} />;
      case "budget_range":
        return <Input {...commonProps} placeholder="Budget Range (optional)" required={false} />;
      case "timeline":
        return <Input {...commonProps} placeholder="Timeline (optional)" required={false} />;
      case "message":
        return <Textarea {...commonProps} placeholder="Your message..." className="min-h-[100px]" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={state.isOpen} onOpenChange={closeAndReset}>
      <DialogContent className="max-w-lg">
        <DialogTitle>
          {success ? "Thank you for reaching out!" : config.title}
        </DialogTitle>
        <DialogDescription>
          {success 
            ? "We'll be in touch shortly. Check your inbox for confirmation!"
            : config.description
          }
        </DialogDescription>

        {!success && (
          <form onSubmit={onSubmit} className="space-y-4 py-2">
            {config.fields.map((fieldName) => (
              <div key={fieldName}>
                {renderField(fieldName)}
              </div>
            ))}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </Button>
          </form>
        )}
        
        {success && (
          <Button onClick={closeAndReset} className="w-full">Close</Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
