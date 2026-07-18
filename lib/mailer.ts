import nodemailer from "nodemailer"

const FROM_NAME = "Bhutan Aravia Peaks"
// Resend sends from the verified bhutanaraviapeaks.com domain (SPF/DKIM authenticated),
// which keeps mail out of spam folders and avoids Gmail's daily sending cap.
const RESEND_FROM = "hello@bhutanaraviapeaks.com"

export type SendEmailInput = {
  to: string
  subject: string
  html: string
  replyTo?: string
}

async function sendViaResend(input: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error("RESEND_API_KEY is not set")

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${FROM_NAME} <${RESEND_FROM}>`,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Resend API error ${res.status}: ${body}`)
  }
}

async function sendViaGmail(input: SendEmailInput): Promise<void> {
  const gmailEmail = process.env.GMAIL_EMAIL
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailEmail || !gmailAppPassword) {
    throw new Error(
      "Email is not configured. Set RESEND_API_KEY, or GMAIL_EMAIL and GMAIL_APP_PASSWORD, in your environment.",
    )
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailEmail, pass: gmailAppPassword },
  })

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${gmailEmail}>`,
    to: input.to,
    subject: input.subject,
    html: input.html,
    ...(input.replyTo ? { replyTo: input.replyTo } : {}),
  })
}

/**
 * Sends via Resend (domain-authenticated) when RESEND_API_KEY is set,
 * falling back to Gmail SMTP if Resend fails or isn't configured.
 * Throws only when every configured channel fails.
 */
export async function sendEmail(input: SendEmailInput): Promise<void> {
  if (process.env.RESEND_API_KEY) {
    try {
      await sendViaResend(input)
      return
    } catch (resendError) {
      console.error("[mailer] Resend failed, falling back to Gmail SMTP:", resendError)
    }
  }
  await sendViaGmail(input)
}
