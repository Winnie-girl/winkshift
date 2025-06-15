
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const body = await req.json();
    const {
      name,
      email,
      service_type,
      source,
      company,
      phone,
      project_description,
      goals,
      current_challenges,
      budget_range,
      timeline,
      preferred_contact_method,
      referral_info,
    } = body;

    // Compose email details
    const isNewsletter = service_type === "newsletter";
    // Send confirmation to user
    await resend.emails.send({
      from: "Lovable <onboarding@resend.dev>",
      to: [email],
      subject: isNewsletter
        ? "Thanks for signing up for our newsletter!"
        : `We received your ${service_type} inquiry!`,
      html: isNewsletter
        ? `<h1>Welcome, ${name || email}!</h1>
            <p>You've joined the Lovable AI newsletter. Stay tuned for insights & resources.</p>`
        : `<h1>Thank you, ${name}!</h1>
            <p>We received your consultation request for <b>${service_type}</b>. We'll be in touch soon!</p>
            <p><b>Summary:</b></p>
            <ul>
              <li>Email: ${email}</li>
              <li>Company: ${company || "-"}</li>
              <li>Phone: ${phone || "-"}</li>
              <li>Project: ${project_description || "-"}</li>
              <li>Goals: ${goals || "-"}</li>
              <li>Budget: ${budget_range || "-"}</li>
            </ul>
            <p>Talk soon!<br>The Lovable Team</p>`,
    });
    // Send notification to admin
    await resend.emails.send({
      from: "Lovable <onboarding@resend.dev>",
      to: ["youremail@yourdomain.com"], // <-- REPLACE with your real email!
      subject: `New ${service_type} lead from ${name || email}`,
      html: `<h2>New ${service_type} inquiry</h2>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          <li>Company: ${company}</li>
          <li>Phone: ${phone}</li>
          <li>Project: ${project_description}</li>
          <li>Goals: ${goals}</li>
          <li>Current Challenges: ${current_challenges}</li>
          <li>Budget: ${budget_range}</li>
          <li>Timeline: ${timeline}</li>
          <li>Preferred Contact: ${preferred_contact_method}</li>
          <li>Referral Info: ${referral_info}</li>
          <li>Source: ${source}</li>
        </ul>
        <p>Check Supabase dashboard for full lead details.</p>`,
    });

    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
