import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body as {
    name: string;
    email: string;
    message: string;
  };

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const time = new Date().toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  try {
    await resend.emails.send({
      from: 'Directore Portfolio <onboarding@resend.dev>',
      to: 'axpatel009009@gmail.com',
      replyTo: email,
      subject: `[Portfolio Inquiry] New message from ${name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #0a0a0a; color: #fff; padding: 40px; max-width: 600px; margin: 0 auto;">
          <!-- Header -->
          <div style="border-bottom: 3px solid #D02020; padding-bottom: 24px; margin-bottom: 32px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #D02020;"></div>
              <div style="width: 10px; height: 10px; background: #F0C020;"></div>
              <div style="width: 10px; height: 10px; border-radius: 50%; background: #4ade80;"></div>
            </div>
            <p style="font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin: 0;">
              DIRECTORE // INCOMING TRANSMISSION
            </p>
          </div>

          <!-- Body -->
          <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 8px;">
            Message from
          </p>
          <h1 style="font-size: 36px; font-weight: 900; text-transform: uppercase; letter-spacing: -2px; color: #fff; margin: 0 0 4px 0;">
            ${name}
          </h1>
          <p style="font-size: 13px; color: #D02020; margin: 0 0 32px 0;">${email}</p>

          <!-- Message box -->
          <div style="border: 1px solid rgba(255,255,255,0.1); padding: 24px; margin-bottom: 32px; background: rgba(255,255,255,0.03);">
            <p style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin: 0 0 12px 0;">
              Message
            </p>
            <p style="font-size: 16px; color: rgba(255,255,255,0.8); line-height: 1.7; margin: 0;">
              ${message.replace(/\n/g, '<br/>')}
            </p>
          </div>

          <!-- Meta -->
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; display: flex; justify-content: space-between;">
            <p style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.2); margin: 0;">
              ${time}
            </p>
            <p style="font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.2); margin: 0;">
              directore.portfolio
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
