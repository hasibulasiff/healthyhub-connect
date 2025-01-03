import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  type: string;
  data: any;
}

const getEmailTemplate = (type: string, data: any) => {
  switch (type) {
    case 'membership_expiring':
      return {
        subject: 'Your Membership is Expiring Soon',
        html: `
          <h2>Hello ${data.username},</h2>
          <p>Your membership at ${data.centerName} will expire on ${data.expiryDate}.</p>
          <p>Renew now to continue enjoying our services!</p>
          <a href="${data.renewalLink}" style="background-color: #6E59A5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Renew Membership</a>
        `
      };
    case 'new_message':
      return {
        subject: 'New Message Received',
        html: `
          <h2>Hello ${data.username},</h2>
          <p>You have received a new message from ${data.senderName}.</p>
          <p>Click below to view the message:</p>
          <a href="${data.messageLink}" style="background-color: #6E59A5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Message</a>
        `
      };
    default:
      return {
        subject: 'Notification from HealthyThako',
        html: `<p>${data.message}</p>`
      };
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to, type, data }: EmailRequest = await req.json();
    const template = getEmailTemplate(type, data);

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'HealthyThako <notifications@healthythako.com>',
        to: [to],
        subject: template.subject,
        html: template.html,
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});