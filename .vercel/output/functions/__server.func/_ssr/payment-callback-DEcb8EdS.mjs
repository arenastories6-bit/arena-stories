import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Dj1sUdwI.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { t as Button } from "./button-BRmaJFL-.mjs";
import { C as ArrowRight, h as LoaderCircle, v as CircleX, x as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payment-callback-DEcb8EdS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var verifySchema = objectType({
	razorpayOrderId: stringType(),
	razorpayPaymentId: stringType(),
	razorpaySignature: stringType(),
	userEmail: stringType().email(),
	bookingCode: stringType(),
	amount: numberType()
});
var verifyAndSendEmail = createServerFn({ method: "POST" }).validator((input) => verifySchema.parse(input)).handler(createSsrRpc("5ec3d28b6e7f824453e14b1de84adde1e112fd3c62e594b3184f488c4c716c86"));
function PaymentCallbackPage() {
	const router = useRouter();
	const verifyPayment = useServerFn(verifyAndSendEmail);
	const [status, setStatus] = (0, import_react.useState)("loading");
	const [bookingCode, setBookingCode] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let mounted = true;
		async function handleVerification() {
			const savedBookingStr = localStorage.getItem("arena_last_booking");
			if (!savedBookingStr) {
				if (mounted) setStatus("failed");
				return;
			}
			try {
				const savedBooking = JSON.parse(savedBookingStr);
				setBookingCode(savedBooking.booking_code);
				const result = await verifyPayment({ data: {
					razorpayOrderId: savedBooking.razorpayOrderId,
					razorpayPaymentId: savedBooking.razorpayPaymentId,
					razorpaySignature: savedBooking.razorpaySignature,
					userEmail: savedBooking.userEmail,
					bookingCode: savedBooking.booking_code,
					amount: savedBooking.total_amount
				} });
				if (mounted) setStatus(result.paymentStatus === "SUCCESS" ? "success" : "failed");
			} catch (err) {
				console.error("Verification error:", err);
				if (mounted) setStatus("failed");
			}
		}
		handleVerification();
		return () => {
			mounted = false;
		};
	}, [verifyPayment]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background text-foreground flex items-center justify-center p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg border border-border bg-card p-10 shadow-2xl relative overflow-hidden text-center",
			children: [
				status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center animate-in fade-in zoom-in duration-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-16 w-16 animate-spin text-primary mb-6" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl mb-2",
							children: "VERIFYING MATCH..."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Please wait while we confirm your payment."
						})
					]
				}),
				status === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center animate-in fade-in zoom-in duration-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative mx-auto grid h-20 w-20 place-items-center bg-primary text-primary-foreground mb-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-10 w-10" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase text-status-success mb-2",
							children: "Payment Successful"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-5xl mb-4",
							children: "YOU'RE IN."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mb-6",
							children: "We've sent a receipt and your booking code to your email."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-y border-border py-5 w-full mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase text-muted-foreground mb-2",
								children: "Booking Code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-4xl tracking-widest text-primary",
								children: bookingCode
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => router.navigate({ to: "/dashboard" }),
							className: "w-full h-12 as-glow",
							variant: "sport",
							children: ["View My Matches ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
						})
					]
				}),
				status === "failed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center animate-in fade-in zoom-in duration-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative mx-auto grid h-20 w-20 place-items-center bg-status-danger text-white mb-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-10 w-10" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase text-status-danger mb-2",
							children: "Payment Failed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-5xl mb-4",
							children: "MISSED THE PITCH."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mb-8",
							children: "Your payment could not be processed. An email notification has been sent."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => router.navigate({ to: "/" }),
							className: "w-full h-12",
							variant: "sportOutline",
							children: ["Try Again ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { PaymentCallbackPage as component };
