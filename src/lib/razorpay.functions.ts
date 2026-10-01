import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import Razorpay from "razorpay";

const razorpaySchema = z.object({
  amount: z.number().positive(),
  bookingId: z.string(),
});

export const initiateRazorpayPayment = createServerFn({ method: "POST" })
  .validator((input) => razorpaySchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const key_id = process.env['RAZORPAY_KEY_ID'];
      const key_secret = process.env['RAZORPAY_KEY_SECRET'];

      if (!key_id || !key_secret) {
        throw new Error("Razorpay credentials not found in environment variables.");
      }

      const razorpay = new Razorpay({
        key_id,
        key_secret,
      });

      const amountInPaise = Math.round(data.amount * 100);

      const options = {
        amount: amountInPaise,
        currency: "INR",
        receipt: data.bookingId,
        payment_capture: 1, // Auto capture
      };

      const order = await razorpay.orders.create(options);

      return {
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: key_id,
      };
    } catch (err: any) {
      console.error("[initiateRazorpayPayment] Exception:", err);
      throw new Error(err.message || "Razorpay payment initiation failed");
    }
  });
