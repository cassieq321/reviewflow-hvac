'use server'

import { Resend } from 'resend';

// This pulls your secret key from Vercel/Environment Variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendShieldAlert(name: string, phone: string, feedback: string, company: string) {
  try {
    const data = await resend.emails.send({
      from: 'ReviewFlow <onboarding@resend.dev>',
      to: 'cassiequaye@gmail.com', 
      subject: `🚨 NEGATIVE REVIEW SHIELDED: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #ef4444;">Review Intercepted</h2>
          <p><strong>Customer:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Feedback:</strong> ${feedback}</p>
          <hr />
          <p style="font-size: 10px; color: #999;">Sent via ReviewFlow AI Shield</p>
        </div>
      `,
    });
    
    console.log("Resend Success Response:", data);
    return { success: true };
  } catch (error) {
    console.error("Resend System Error:", error);
    return { success: false };
  }
}