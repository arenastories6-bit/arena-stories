import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as nodemailer } from "../_libs/nodemailer.mjs";
import crypto from "crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/email.functions-DN-LvrDg.js
function getTransporter() {
	return nodemailer.createTransport({
		host: process.env["SMTP_HOST"] || "smtp.gmail.com",
		port: parseInt(process.env["SMTP_PORT"] || "587"),
		secure: process.env["SMTP_SECURE"] === "true",
		auth: {
			user: process.env["SMTP_USER"],
			pass: process.env["SMTP_PASS"]
		}
	});
}
function getEmailHTML(status, bookingCode, amount, venueName = "Arena Stories Pitch") {
	const isSuccess = status === "success";
	const title = isSuccess ? "YOU'RE IN." : "BOOKING FAILED.";
	const color = isSuccess ? "#facc15" : "#ef4444";
	const message = isSuccess ? `Your booking for ${venueName} is confirmed. Show this code when you arrive at the pitch.` : "Unfortunately, your payment could not be processed. Please try booking again.";
	return `
    <div style="font-family: 'Inter', Helvetica, sans-serif; background-color: #020617; color: #f8fafc; padding: 40px 20px; text-align: center;">
      <div style="max-w-md; margin: 0 auto; background-color: #0f172a; padding: 40px; border: 1px solid #1e293b;">
        <h3 style="color: ${color}; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px;">
          ${isSuccess ? "Booking Confirmed" : "Payment Failed"}
        </h3>
        <h1 style="font-size: 48px; margin: 0 0 20px 0; font-family: serif; font-weight: normal; line-height: 1;">
          ${title}
        </h1>
        <p style="color: #94a3b8; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
          ${message}
        </p>
        
        ${isSuccess ? `
          <div style="border-top: 1px solid #1e293b; border-bottom: 1px solid #1e293b; padding: 30px 0; margin-bottom: 30px;">
            <p style="font-size: 40px; font-family: serif; letter-spacing: 4px; color: ${color}; margin: 0;">
              ${bookingCode}
            </p>
          </div>
        ` : ""}
        
        <p style="color: #94a3b8; font-size: 14px; margin: 0;">
          Total Amount: <strong style="color: #f8fafc;">₹${amount}</strong>
        </p>
      </div>
    </div>
  `;
}
var verifySchema = objectType({
	razorpayOrderId: stringType(),
	razorpayPaymentId: stringType(),
	razorpaySignature: stringType(),
	userEmail: stringType().email(),
	bookingCode: stringType(),
	amount: numberType()
});
var verifyAndSendEmail_createServerFn_handler = createServerRpc({
	id: "5ec3d28b6e7f824453e14b1de84adde1e112fd3c62e594b3184f488c4c716c86",
	name: "verifyAndSendEmail",
	filename: "src/lib/email.functions.ts"
}, (opts) => verifyAndSendEmail.__executeServer(opts));
var verifyAndSendEmail = createServerFn({ method: "POST" }).validator((input) => verifySchema.parse(input)).handler(verifyAndSendEmail_createServerFn_handler, async ({ data }) => {
	try {
		const keySecret = process.env["RAZORPAY_KEY_SECRET"];
		if (!keySecret) throw new Error("Razorpay secret not configured");
		const generatedSignature = crypto.createHmac("sha256", keySecret).update(data.razorpayOrderId + "|" + data.razorpayPaymentId).digest("hex");
		let paymentStatus = "FAILED";
		if (generatedSignature === data.razorpaySignature) paymentStatus = "SUCCESS";
		const isSuccess = paymentStatus === "SUCCESS";
		if (process.env["SMTP_USER"] && process.env["SMTP_PASS"]) {
			const transporter = getTransporter();
			const html = getEmailHTML(isSuccess ? "success" : "failed", data.bookingCode, data.amount);
			await transporter.sendMail({
				from: `"Arena Stories" <${process.env["SMTP_USER"]}>`,
				to: data.userEmail,
				subject: isSuccess ? `Match Confirmed: ${data.bookingCode}` : "Payment Failed",
				html
			});
			const adminEmail = process.env["ADMIN_EMAIL"] || process.env["SMTP_USER"];
			if (adminEmail) await transporter.sendMail({
				from: `"Arena Stories System" <${process.env["SMTP_USER"]}>`,
				to: adminEmail,
				subject: `[SYSTEM] ${isSuccess ? "New Booking" : "Failed Booking"} - ${data.bookingCode}`,
				html: `User ${data.userEmail} attempted a booking.<br><br>` + html
			});
		} else console.warn("SMTP credentials not provided. Emails were NOT sent.");
		return {
			success: true,
			paymentStatus
		};
	} catch (err) {
		console.error("[verifyAndSendEmail] Exception:", err);
		throw new Error(err.message || "Failed to verify and send emails");
	}
});
//#endregion
export { verifyAndSendEmail_createServerFn_handler };
