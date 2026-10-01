import { o as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as require_razorpay } from "../_libs/razorpay.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/razorpay.functions-BndjCoBe.js
var import_razorpay = /* @__PURE__ */ __toESM(require_razorpay());
var razorpaySchema = objectType({
	amount: numberType().positive(),
	bookingId: stringType()
});
var initiateRazorpayPayment_createServerFn_handler = createServerRpc({
	id: "08b027d4838b178d3209092d0b63c1f870f4b3e305239b3e5bd4fe97b45c2d13",
	name: "initiateRazorpayPayment",
	filename: "src/lib/razorpay.functions.ts"
}, (opts) => initiateRazorpayPayment.__executeServer(opts));
var initiateRazorpayPayment = createServerFn({ method: "POST" }).validator((input) => razorpaySchema.parse(input)).handler(initiateRazorpayPayment_createServerFn_handler, async ({ data }) => {
	try {
		const key_id = process.env["RAZORPAY_KEY_ID"];
		const key_secret = process.env["RAZORPAY_KEY_SECRET"];
		if (!key_id || !key_secret) throw new Error("Razorpay credentials not found in environment variables.");
		const razorpay = new import_razorpay.default({
			key_id,
			key_secret
		});
		const options = {
			amount: Math.round(data.amount * 100),
			currency: "INR",
			receipt: data.bookingId,
			payment_capture: 1
		};
		const order = await razorpay.orders.create(options);
		return {
			success: true,
			orderId: order.id,
			amount: order.amount,
			currency: order.currency,
			keyId: key_id
		};
	} catch (err) {
		console.error("[initiateRazorpayPayment] Exception:", err);
		throw new Error(err.message || "Razorpay payment initiation failed");
	}
});
//#endregion
export { initiateRazorpayPayment_createServerFn_handler };
