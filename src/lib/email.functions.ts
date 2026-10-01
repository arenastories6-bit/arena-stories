import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import nodemailer from "nodemailer";

// ─────────────────────────────────────────────────────────
// Mail Transporter Setup
// ─────────────────────────────────────────────────────────
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env['SMTP_HOST'] || "smtp.gmail.com",
    port: parseInt(process.env['SMTP_PORT'] || "587"),
    secure: process.env['SMTP_SECURE'] === "true",
    auth: {
      user: process.env['SMTP_USER'],
      pass: process.env['SMTP_PASS'],
    },
  });
}

// ─────────────────────────────────────────────────────────
// HTML Email Templates (Matches Arena Stories Vibe)
// ─────────────────────────────────────────────────────────
function getEmailHTML(
  status: "success" | "failed",
  bookingCode: string,
  amount: number,
  venueName: string = "Arena Stories Pitch"
) {
  const isSuccess = status === "success";
  const title = isSuccess ? "YOU'RE IN." : "BOOKING FAILED.";
  const color = isSuccess ? "#facc15" : "#ef4444"; // Gold or Red
  const message = isSuccess
    ? `Your booking for ${venueName} is confirmed. Show this code when you arrive at the pitch.`
    : "Unfortunately, your payment could not be processed. Please try booking again.";

  return `
    <div style="font-family: 'Inter', Helvetica, sans-serif; background-color: #020617; color: #f8fafc; padding: 40px 20px; text-align: center;">
      <div style="max-w-md; margin: 0 auto; background-color: #0f172a; padding: 40px; border: 1px solid #1e293b;">
        <h3 style="color: ${color}; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">
          ${isSuccess ? 'Booking Confirmed' : 'Payment Failed'}
        </h3>
        <h1 style="font-size: 48px; margin: 0 0 20px 0; font-family: serif; font-weight: normal; line-height: 1;">
          ${title}
        </h1>
        <p style="color: #94a3b8; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
          ${message}
        </p>
        
        ${
          isSuccess
            ? `
          <div style="border-top: 1px solid #1e293b; border-bottom: 1px solid #1e293b; padding: 30px 0; margin-bottom: 30px;">
            <p style="font-size: 40px; font-family: serif; letter-spacing: 4px; color: ${color}; margin: 0;">
              ${bookingCode}
            </p>
          </div>
        `
            : ""
        }
        
        <p style="color: #94a3b8; font-size: 14px; margin: 0;">
          Total Amount: <strong style="color: #f8fafc;">₹${amount}</strong>
        </p>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────
// Verify & Send Email Server Function
// ─────────────────────────────────────────────────────────
import crypto from "crypto";

const verifySchema = z.object({
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
  userEmail: z.string().email(),
  bookingCode: z.string(),
  amount: z.number(),
});

export const verifyAndSendEmail = createServerFn({ method: "POST" })
  .validator((input) => verifySchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const keySecret = process.env['RAZORPAY_KEY_SECRET'];
      
      if (!keySecret) {
        throw new Error("Razorpay secret not configured");
      }

      // Verify signature
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(data.razorpayOrderId + "|" + data.razorpayPaymentId)
        .digest("hex");

      let paymentStatus = "FAILED";
      
      if (generatedSignature === data.razorpaySignature) {
        paymentStatus = "SUCCESS";
      }

      const isSuccess = paymentStatus === "SUCCESS";

      // 2. Send Emails
      if (process.env['SMTP_USER'] && process.env['SMTP_PASS']) {
        const transporter = getTransporter();
        const html = getEmailHTML(isSuccess ? "success" : "failed", data.bookingCode, data.amount);

        // Send to User
        await transporter.sendMail({
          from: `"Arena Stories" <${process.env['SMTP_USER']}>`,
          to: data.userEmail,
          subject: isSuccess ? `Match Confirmed: ${data.bookingCode}` : "Payment Failed",
          html,
        });

        // Send to Admin
        const adminEmail = process.env['ADMIN_EMAIL'] || process.env['SMTP_USER'];
        if (adminEmail) {
          await transporter.sendMail({
            from: `"Arena Stories System" <${process.env['SMTP_USER']}>`,
            to: adminEmail,
            subject: `[SYSTEM] ${isSuccess ? 'New Booking' : 'Failed Booking'} - ${data.bookingCode}`,
            html: `User ${data.userEmail} attempted a booking.<br><br>` + html,
          });
        }
      } else {
        console.warn("SMTP credentials not provided. Emails were NOT sent.");
      }

      return {
        success: true,
        paymentStatus,
      };
    } catch (err: any) {
      console.error("[verifyAndSendEmail] Exception:", err);
      throw new Error(err.message || "Failed to verify and send emails");
    }
  });
