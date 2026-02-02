'use server'

import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'

const resend = new Resend(process.env.RESEND_API_KEY)

// Fallback email if Sanity fetch fails
const FALLBACK_RECIPIENT = 'hello@xuba.co.nz'

export type ContactFormData = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message: string
  turnstileToken: string
}

export type SendEmailResponse = {
  success: boolean
  error?: string
}

/**
 * Verifies the Turnstile token with Cloudflare's API.
 * Returns true if valid, false otherwise.
 */
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not configured')
    return false
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      }
    )

    const result = await response.json()
    return result.success === true
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return false
  }
}

/**
 * Fetches the contact email from Sanity site settings.
 * Returns fallback email if fetch fails.
 */
async function getRecipientEmail(): Promise<string> {
  try {
    const result = await client.fetch<{ contact?: { email?: string } } | null>(
      `*[_type == "siteSettings"][0]{ contact { email } }`
    )
    return result?.contact?.email || FALLBACK_RECIPIENT
  } catch (error) {
    console.error('Failed to fetch recipient email from Sanity:', error)
    return FALLBACK_RECIPIENT
  }
}

export async function sendContactEmail(
  formData: ContactFormData
): Promise<SendEmailResponse> {
  const { firstName, lastName, email, phone, message, turnstileToken } =
    formData

  try {
    // Verify Turnstile token first
    const isValidToken = await verifyTurnstileToken(turnstileToken)
    if (!isValidToken) {
      return {
        success: false,
        error: 'Security verification failed. Please try again.',
      }
    }

    // Fetch recipient email from Sanity CMS
    const recipientEmail = await getRecipientEmail()

    const { error } = await resend.emails.send({
      from: 'Xuba Contact Form <noreply@notifications.tallysphere.com>',
      to: recipientEmail,
      replyTo: email,
      subject: `New Contact from ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px; border-radius: 8px 8px 0 0;">
              <h1 style="color: #4ade80; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                    <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name</strong>
                    <div style="color: #111827; font-size: 16px; margin-top: 4px;">${firstName} ${lastName}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                    <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</strong>
                    <div style="color: #111827; font-size: 16px; margin-top: 4px;">
                      <a href="mailto:${email}" style="color: #4ade80; text-decoration: none;">${email}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                    <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</strong>
                    <div style="color: #111827; font-size: 16px; margin-top: 4px;">${phone || 'Not provided'}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <strong style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</strong>
                    <div style="color: #111827; font-size: 16px; margin-top: 8px; white-space: pre-wrap; background: #f9fafb; padding: 16px; border-radius: 6px;">${message}</div>
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  This email was sent from the Xuba website contact form.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return {
        success: false,
        error: 'Failed to send email. Please try again.',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Send email error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}
