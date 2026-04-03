'use server'

import { Resend } from 'resend';

// This pulls your secret key from that .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendShieldAlert(name: string, phone: string, feedback: string, company: string) {
  try {
    await resend.emails.send({
      from: 'ReviewFlow <onboarding@resend.dev>',
      to: ['cassiequaye@GMAIL.COM'], // <--- CHANGE THIS TO YOUR ACTUAL EMAIL
      subject: `🚨 NEGATIVE REVIEW SHIELDED: ${company}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #3b82f6;">Review Intercepted</h2>
          <p><strong>Customer:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Feedback:</strong> ${feedback}</p>
          <hr />
          <p style="font-size: 10px; color: #999;">Sent via ReviewFlow AI Shield</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}