"use server"

import { headers } from "next/headers"
import { after } from "next/server"
import { sendEmail } from "@/lib/mailer"
import { createSubmission, countRecentSubmissionsByIp } from "@/lib/db/submissions"

type ContactData = {
  fullName: string
  email: string
  phone: string
  country: string
  message: string
  // Honeypot field — hidden from humans; only bots fill it.
  website?: string
}

const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

async function getClientIp(): Promise<string> {
  const hdrs = await headers()
  const forwarded = hdrs.get("x-forwarded-for") ?? ""
  return forwarded.split(",")[0].trim() || hdrs.get("x-real-ip") || "unknown"
}

// Where admin notifications actually land — the real inbox behind info@'s forwarding rule.
const BUSINESS_EMAIL = "bhutanaraviapeak@gmail.com"
// What customers see in email footers — the professional domain address.
const DISPLAY_EMAIL = "info@bhutanaraviapeaks.com"

function generateReferenceNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `BAP${timestamp}${random}`
}

function buildAdminHtml(data: ContactData, referenceNumber: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 0; }
          .header { background: linear-gradient(135deg, #122536 0%, #b08733 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
          .ref-number { background: rgba(255,255,255,0.15); padding: 15px; margin-top: 15px; border-radius: 8px; font-size: 14px; }
          .ref-number strong { font-size: 20px; display: block; margin-top: 8px; }
          .content { background: #fafaf8; padding: 30px; }
          .section { background: white; padding: 25px; margin: 15px 0; border-radius: 8px; border-left: 5px solid #b08733; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
          .section-title { color: #122536; font-weight: 700; margin-bottom: 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
          .info-row { margin: 15px 0; }
          .label { font-weight: 600; color: #122536; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { color: #333; margin-top: 4px; }
          .message-box { background: #f8f6f3; padding: 20px; border-radius: 8px; margin-top: 15px; border-left: 3px solid #b08733; }
          .footer { text-align: center; padding: 30px 30px 20px; color: #696969; font-size: 12px; background: #e8e3de; border-top: 1px solid #ddd6ce; }
          .footer p { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Message</h1>
            <div class="ref-number">
              Reference Number
              <strong>${referenceNumber}</strong>
            </div>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Contact Information</div>
              <div class="info-row"><div class="label">Full Name</div><div class="value">${data.fullName}</div></div>
              <div class="info-row"><div class="label">Email</div><div class="value">${data.email}</div></div>
              <div class="info-row"><div class="label">Phone</div><div class="value">${data.phone}</div></div>
              <div class="info-row"><div class="label">Country</div><div class="value">${data.country}</div></div>
            </div>
            <div class="section">
              <div class="section-title">Message</div>
              <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
            </div>
          </div>
          <div class="footer">
            <p><strong>Reference: ${referenceNumber}</strong></p>
            <p>Submitted through the Bhutan Aravia Peaks website. Reply directly to this email to respond to ${data.fullName}.</p>
          </div>
        </div>
      </body>
    </html>
  `
}

function buildCustomerHtml(fullName: string, referenceNumber: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 0; background: white; }
          .header { background: linear-gradient(135deg, #122536 0%, #b08733 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 26px; font-weight: 700; }
          .content { padding: 40px 30px; background: #fafaf8; }
          .message-box { background: white; padding: 30px; border-radius: 8px; border-left: 5px solid #b08733; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
          .ref-box { background: #f8f6f3; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; border: 2px dashed #b08733; }
          .ref-box strong { font-size: 24px; color: #122536; display: block; margin-top: 8px; }
          .footer { text-align: center; padding: 30px; color: #696969; font-size: 12px; background: #e8e3de; }
          .highlight { color: #b08733; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>Thank You for Contacting Us</h1></div>
          <div class="content">
            <div class="message-box">
              <h2 style="color: #122536; margin-top: 0;">Dear ${fullName},</h2>
              <p>Thank you for reaching out to Bhutan Aravia Peaks! We have received your message and our team will get back to you within <span class="highlight">24 hours</span>.</p>
              <div class="ref-box">
                <div style="color: #122536; font-weight: 600;">Reference Number</div>
                <strong>${referenceNumber}</strong>
              </div>
              <p>Please keep this reference number for your records — you can quote it in any future correspondence with us.</p>
              <p style="margin-top: 30px;">
                <strong>Best regards,</strong><br>
                The Bhutan Aravia Peaks Team
              </p>
            </div>
          </div>
          <div class="footer">
            <p><strong>Bhutan Aravia Peaks</strong></p>
            <p>Email: ${DISPLAY_EMAIL}</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function sendContactEmail(rawData: ContactData) {
  try {
    // Honeypot: a hidden field humans never see. If it's filled, this is a bot —
    // return a fake success so it doesn't learn to adapt, and store/send nothing.
    const { website, ...data } = rawData
    if (website) {
      return { success: true, message: "Message sent successfully", referenceNumber: generateReferenceNumber() }
    }

    const ip = await getClientIp()
    if (ip !== "unknown") {
      try {
        const recent = await countRecentSubmissionsByIp(ip, RATE_LIMIT_WINDOW_MS)
        if (recent >= RATE_LIMIT_MAX) {
          return {
            success: false,
            message: "Too many submissions from your connection. Please try again in an hour, or reach us on WhatsApp.",
          }
        }
      } catch (rateLimitError) {
        // If the check itself fails, let the submission through rather than block a real customer.
        console.error("[contact] Rate limit check failed:", rateLimitError)
      }
    }

    const referenceNumber = generateReferenceNumber()

    // The dashboard log and the admin notification don't depend on each other —
    // run them together instead of one after the other.
    const [dbResult, adminEmailResult] = await Promise.allSettled([
      createSubmission({ type: "contact", referenceNumber, ip, ...data }),
      sendEmail({
        to: BUSINESS_EMAIL,
        replyTo: data.email,
        subject: `New Contact from ${data.fullName} - Ref: ${referenceNumber}`,
        html: buildAdminHtml(data, referenceNumber),
      }),
    ])

    if (dbResult.status === "rejected") {
      // The dashboard log is best-effort; it should never block the response.
      console.error("[contact] Failed to log submission to MongoDB:", dbResult.reason)
    }
    if (adminEmailResult.status === "rejected") {
      throw adminEmailResult.reason
    }

    // The customer's auto-reply isn't needed for the response we give them right
    // now — send it after we respond so it doesn't add to their wait.
    after(async () => {
      try {
        await sendEmail({
          to: data.email,
          subject: `Thank You for Contacting Bhutan Aravia Peaks - Ref: ${referenceNumber}`,
          html: buildCustomerHtml(data.fullName, referenceNumber),
        })
      } catch (autoReplyError) {
        console.error("[contact] Auto-reply to customer failed:", autoReplyError)
      }
    })

    return {
      success: true,
      message: "Message sent successfully",
      referenceNumber,
    }
  } catch (error) {
    console.error("[contact] Error sending contact email:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again or contact us directly.",
    }
  }
}
