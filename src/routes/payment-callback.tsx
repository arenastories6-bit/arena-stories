import { useEffect, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { verifyAndSendEmail } from "@/lib/email.functions";
import { Check, XCircle, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/payment-callback")({
  component: PaymentCallbackPage,
});

function PaymentCallbackPage() {
  const router = useRouter();
  const verifyPayment = useServerFn(verifyAndSendEmail);
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [bookingCode, setBookingCode] = useState<string>("");

  useEffect(() => {
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

        const result = await verifyPayment({
          data: {
            razorpayOrderId: savedBooking.razorpayOrderId,
            razorpayPaymentId: savedBooking.razorpayPaymentId,
            razorpaySignature: savedBooking.razorpaySignature,
            userEmail: savedBooking.userEmail,
            bookingCode: savedBooking.booking_code,
            amount: savedBooking.total_amount,
          }
        });

        if (mounted) {
          setStatus(result.paymentStatus === "SUCCESS" ? "success" : "failed");
        }
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

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-5">
      <div className="w-full max-w-lg border border-border bg-card p-10 shadow-2xl relative overflow-hidden text-center">
        
        {status === "loading" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-6" />
            <h1 className="font-display text-4xl mb-2">VERIFYING MATCH...</h1>
            <p className="text-muted-foreground">Please wait while we confirm your payment.</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="relative mx-auto grid h-20 w-20 place-items-center bg-primary text-primary-foreground mb-6">
              <Check className="h-10 w-10" />
            </div>
            <p className="text-xs font-bold uppercase text-status-success mb-2">Payment Successful</p>
            <h1 className="font-display text-5xl mb-4">YOU'RE IN.</h1>
            <p className="text-muted-foreground mb-6">
              We've sent a receipt and your booking code to your email.
            </p>
            <div className="border-y border-border py-5 w-full mb-8">
              <p className="text-xs font-bold uppercase text-muted-foreground mb-2">Booking Code</p>
              <p className="font-display text-4xl tracking-widest text-primary">
                {bookingCode}
              </p>
            </div>
            <Button 
              onClick={() => router.navigate({ to: "/dashboard" })} 
              className="w-full h-12 as-glow" 
              variant="sport"
            >
              View My Matches <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {status === "failed" && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
            <div className="relative mx-auto grid h-20 w-20 place-items-center bg-status-danger text-white mb-6">
              <XCircle className="h-10 w-10" />
            </div>
            <p className="text-xs font-bold uppercase text-status-danger mb-2">Payment Failed</p>
            <h1 className="font-display text-5xl mb-4">MISSED THE PITCH.</h1>
            <p className="text-muted-foreground mb-8">
              Your payment could not be processed. An email notification has been sent.
            </p>
            <Button 
              onClick={() => router.navigate({ to: "/" })} 
              className="w-full h-12" 
              variant="sportOutline"
            >
              Try Again <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

      </div>
    </main>
  );
}
