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
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #080808; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 40px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #0f0f0f; border: 4px solid #1a1a1a; padding: 40px; text-align: left;">
                
                <!-- Logo & Header -->
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-bottom: 4px solid #D02020; padding-bottom: 24px; margin-bottom: 32px;">
                      <tr>
                        <td>
                          <!-- Geometric Logo Shapes -->
                          <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                            <tr>
                              <td style="width: 14px; height: 14px; background-color: #D02020; border-radius: 50%;"></td>
                              <td style="width: 6px;"></td>
                              <td style="width: 14px; height: 14px; background-color: #1040C0;"></td>
                              <td style="width: 6px;"></td>
                              <td style="width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent; border-bottom: 14px solid #F0C020;"></td>
                            </tr>
                          </table>
                          <span style="font-size: 10px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; color: #888888; font-family: 'Courier New', Courier, monospace;">
                            DIRECTORE // PRODUCTION INQUIRY
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Sender Meta Details Card -->
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="20" style="background-color: #161616; border-left: 4px solid #1040C0; margin-bottom: 32px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="font-size: 10px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #888888; margin: 0 0 6px 0;">Sender Details</p>
                          <h2 style="font-size: 28px; font-weight: 900; text-transform: uppercase; color: #ffffff; margin: 0 0 4px 0; letter-spacing: -1px; line-height: 1.1;">
                            ${name}
                          </h2>
                          <a href="mailto:${email}" style="font-size: 14px; font-weight: bold; color: #1040C0; text-decoration: none;">
                            ${email}
                          </a>
                          
                          <div style="height: 16px;"></div>
                          
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td>
                                <span style="font-size: 9px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; color: #555555; display: block;">Transmission Received</span>
                                <span style="font-size: 12px; font-weight: bold; color: #aaaaaa; display: block; font-family: 'Courier New', Courier, monospace;">${time}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message Body -->
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 40px;">
                      <tr>
                        <td>
                          <p style="font-size: 10px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #888888; margin: 0 0 12px 0;">Message</p>
                          <div style="font-size: 16px; color: #e5e5e5; line-height: 1.8; font-weight: normal; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080808; border: 1px solid #222222; padding: 24px; min-height: 120px;">
                            ${message.replace(/\n/g, '<br/>')}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top: 2px dashed #222222; padding-top: 24px;">
                      <tr>
                        <td>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="font-size: 10px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #444444; font-family: 'Courier New', Courier, monospace;">
                                SYSTEM: ONLINE // 4K · PRORES · ENGAGED
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
