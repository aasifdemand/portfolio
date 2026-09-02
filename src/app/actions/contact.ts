'use server'

import nodemailer from 'nodemailer'
import { PERSONAL_INFO } from '@/lib/constants'

export interface ContactActionResult {
  success: boolean
  error?: string
  simulated?: boolean
}

export async function sendContactEmail(formData: FormData): Promise<ContactActionResult> {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const subject = (formData.get('subject') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!name || !email || !message) {
    return { success: false, error: 'Name, email, and message are required.' }
  }

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  const gmailUser = process.env.GMAIL_USER?.trim() || PERSONAL_INFO.email
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.trim()

  // Graceful development mode fallback if app password is not configured yet
  if (!gmailPass) {
    console.warn(
      '[Contact Action] GMAIL_APP_PASSWORD is not set in environment variables. Simulating email dispatch in dev mode.'
    )
    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    return { success: true, simulated: true }
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    })

    const mailOptions = {
      from: `"${name} (Portfolio Inquiry)" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `[Portfolio] ${subject || 'New Contact Form Message'} - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'No Subject'}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #4f46e5; margin-top: 0; font-size: 20px;">New Portfolio Message</h2>
          <p style="color: #4b5563; font-size: 14px; margin-bottom: 24px;">You received a new inquiry from your portfolio website (<strong>Aasif.dev</strong>).</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280; width: 100px; font-weight: 600;">Name:</td>
              <td style="padding: 8px 0; color: #111827; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
              <td style="padding: 8px 0; color: #4f46e5;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Subject:</td>
              <td style="padding: 8px 0; color: #111827;">${subject || 'No Subject'}</td>
            </tr>
          </table>

          <div style="background-color: #f9fafb; border-left: 4px solid #4f46e5; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="font-size: 12px; color: #9ca3af; margin: 0; border-top: 1px solid #f3f4f6; padding-top: 16px;">
            Tip: You can hit "Reply" directly in your email app to reply to <strong>${email}</strong>.
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error: unknown) {
    console.error('[Contact Action Error]:', error)
    const errorMsg = error instanceof Error ? error.message : 'Failed to send email.'
    return { success: false, error: errorMsg }
  }
}
