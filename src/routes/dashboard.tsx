import { useEffect, useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useAuth } from "@/hooks/use-auth";
import { getMyBookings } from "@/lib/turf.functions";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Calendar, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/turf-hero.jpg";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const fetchBookings = useServerFn(getMyBookings);
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated || !user) {
      router.navigate({ to: "/auth" });
      return;
    }

    async function loadBookings() {
      try {
        const data = await fetchBookings({ data: { userId: user!.id } });
        setBookings(data);
      } catch (err) {
        console.error("Failed to load bookings", err);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, [isAuthenticated, isLoading, user, fetchBookings, router]);

  if (isLoading || loading) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="font-bold uppercase tracking-widest text-muted-foreground">Loading your matches...</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border/60 bg-background/90 backdrop-blur-xl px-5 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <BrandLogo size={32} />
          <span className="font-sans text-xl font-extrabold tracking-tight">
            <span className="brand-shimmer">ARENA</span>
            <span className="text-foreground/80">//STORIES</span>
          </span>
        </div>
        <Button variant="ghost" onClick={() => router.navigate({ to: "/" })} className="text-xs uppercase font-bold">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pitch
        </Button>
      </header>

      <main className="flex-1 p-5 lg:p-8 max-w-5xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="font-display text-5xl mb-2 text-primary">MY MATCHES</h1>
          <p className="text-muted-foreground">Your booking history and upcoming slots.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center border border-border bg-card p-12 mt-10">
            <h2 className="font-display text-3xl mb-4">NO MATCHES YET.</h2>
            <p className="text-muted-foreground mb-8">It's time to gather your squad and write your first story.</p>
            <Button variant="sport" onClick={() => router.navigate({ to: "/" })} className="as-glow h-12 px-8">
              Book a Pitch
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="border border-border bg-card p-6 flex flex-col sm:flex-row gap-6">
                <div className="sm:w-1/3 aspect-video sm:aspect-square md:aspect-[4/3] bg-muted relative overflow-hidden hidden sm:block">
                  <img 
                    src={heroImage} 
                    alt="Venue" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 text-[10px] font-bold uppercase">
                    {booking.status}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-3xl">{booking.venues?.name || "Arena"}</h3>
                      <p className="font-display text-2xl text-primary">₹{booking.amount}</p>
                    </div>
                    
                    <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {booking.venues?.location}</p>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" /> 
                        {new Date(booking.slots?.slot_date).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" /> 
                        {booking.slots?.start_time} · {booking.slots?.duration_minutes} min ({booking.slots?.court_label})
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Booking Code</p>
                      <p className="font-display text-2xl tracking-widest">{booking.booking_code}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
