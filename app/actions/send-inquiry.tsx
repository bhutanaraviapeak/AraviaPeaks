"use server"

import nodemailer from "nodemailer"
import { createSubmission } from "@/lib/db/submissions"

type InquiryData = {
  fullName: string
  email: string
  phone: string
  country: string
  packageType: string
  travelMonth: string
  groupSize: string
  duration: string
  message: string
}

const BUSINESS_EMAIL = "bhutanaraviapeak@gmail.com"

function generateReferenceNumber(): string {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `BAP${timestamp}${random}`
}

function getTransporter() {
  const gmailEmail = process.env.GMAIL_EMAIL
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailEmail || !gmailAppPassword) {
    throw new Error(
      "Email is not configured. Set GMAIL_EMAIL and GMAIL_APP_PASSWORD in your environment (see GMAIL_SETUP_GUIDE.md).",
    )
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailEmail, pass: gmailAppPassword },
  })
}

function buildAdminHtml(data: InquiryData, referenceNumber: string) {
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
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
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
            <h1>New Travel Inquiry</h1>
            <div class="ref-number">
              Inquiry Reference Number
              <strong>${referenceNumber}</strong>
            </div>
          </div>
          <div class="content">
            <div class="section">
              <div class="section-title">Personal Information</div>
              <div class="info-grid">
                <div><div class="label">Full Name</div><div class="value">${data.fullName}</div></div>
                <div><div class="label">Email</div><div class="value">${data.email}</div></div>
                <div><div class="label">Phone</div><div class="value">${data.phone}</div></div>
                <div><div class="label">Country</div><div class="value">${data.country}</div></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">Trip Details</div>
              <div class="info-grid">
                <div><div class="label">Package Type</div><div class="value">${data.packageType}</div></div>
                <div><div class="label">Travel Month</div><div class="value">${data.travelMonth}</div></div>
                <div><div class="label">Group Size</div><div class="value">${data.groupSize}</div></div>
                <div><div class="label">Duration</div><div class="value">${data.duration}</div></div>
              </div>
            </div>
            ${
              data.message
                ? `<div class="section">
                     <div class="section-title">Additional Message</div>
                     <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
                   </div>`
                : ""
            }
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
          <div class="header"><h1>Thank You for Your Inquiry</h1></div>
          <div class="content">
            <div class="message-box">
              <h2 style="color: #122536; margin-top: 0;">Dear ${fullName},</h2>
              <p>Thank you for your travel inquiry with Bhutan Aravia Peaks. We are thrilled you're considering us for your journey to the Land of the Thunder Dragon.</p>
              <p>Our travel specialists have received your inquiry and will contact you within <span class="highlight">24 hours</span> with a customized itinerary and curated options.</p>
              <div class="ref-box">
                <div style="color: #122536; font-weight: 600;">Your Inquiry Reference</div>
                <strong>${referenceNumber}</strong>
              </div>
              <p>Please keep this reference number for your records — you can quote it in any future correspondence with us.</p>
              <p style="margin-top: 30px;">
                <strong>Warmest regards,</strong><br>
                The Bhutan Aravia Peaks Team
              </p>
            </div>
          </div>
          <div class="footer">
            <p><strong>Bhutan Aravia Peaks</strong></p>
            <p>Email: ${BUSINESS_EMAIL}</p>
          </div>
        </div>
      </body>
    </html>
  `
}

export async function sendInquiryEmail(data: InquiryData) {
  try {
    const transporter = getTransporter()
    const referenceNumber = generateReferenceNumber()

    try {
      await createSubmission({ type: "inquiry", referenceNumber, ...data })
    } catch (dbError) {
      // The dashboard log is best-effort; it should never block the email flow.
      console.error("[inquiry] Failed to log submission to MongoDB:", dbError)
    }

    await transporter.sendMail({
      from: `"Bhutan Aravia Peaks" <${process.env.GMAIL_EMAIL}>`,
      to: BUSINESS_EMAIL,
      replyTo: data.email,
      subject: `New Travel Inquiry from ${data.fullName} - Ref: ${referenceNumber}`,
      html: buildAdminHtml(data, referenceNumber),
    })

    try {
      await transporter.sendMail({
        from: `"Bhutan Aravia Peaks" <${process.env.GMAIL_EMAIL}>`,
        to: data.email,
        subject: `Thank You for Your Inquiry - Ref: ${referenceNumber}`,
        html: buildCustomerHtml(data.fullName, referenceNumber),
      })
    } catch (autoReplyError) {
      // The inquiry itself was already delivered; a failed auto-reply shouldn't fail the request.
      console.error("[inquiry] Auto-reply to customer failed:", autoReplyError)
    }

    return {
      success: true,
      message: "Inquiry sent successfully",
      referenceNumber,
    }
  } catch (error) {
    console.error("[inquiry] Error sending inquiry email:", error)
    return {
      success: false,
      message: "Failed to send inquiry. Please try again or contact us directly.",
    }
  }
}
