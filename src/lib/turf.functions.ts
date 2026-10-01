import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";



export const getTurfData = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const today = new Date().toISOString().slice(0, 10);

    const [{ data: venues, error: venueError }, { data: slots, error: slotError }] =
      await Promise.all([
        supabaseAdmin.from("venues").select("*").eq("active", true).order("featured", { ascending: false }),
        supabaseAdmin.from("slots").select("*").gte("slot_date", today).order("slot_date").order("start_time"),
      ]);

    // if (venueError) {
    //   console.warn("[getTurfData] Venue fetch warning:", venueError.message);
    // }
    // if (slotError) {
    //   console.warn("[getTurfData] Slot fetch warning:", slotError.message);
    // }

    let finalVenues = venues && venues.length > 0 ? venues : [];
    let finalSlots = slots && slots.length > 0 ? slots : [];

    // Fallback: If no future slots exist in DB, fetch all slots regardless of date
    if (finalSlots.length === 0 && finalVenues.length > 0) {
      const { data: allSlots } = await supabaseAdmin.from("slots").select("*").order("slot_date").order("start_time");
      if (allSlots && allSlots.length > 0) {
        finalSlots = allSlots;
      }
    }
    
    // Hard fallback if database completely fails so the site still loads
    if (finalVenues.length === 0) {
      finalVenues = [
        { 
          id: "mock-venue-1", 
          name: "Arena Stories Pitch (Demo)", 
          location: "Mumbai", 
          price_per_hour: 1500, 
          image_key: "hero", 
          active: true, 
          featured: true,
          amenities: ["parking", "washroom"],
          created_at: new Date().toISOString(),
          description: "This is a demo venue for fallback purposes.",
          rating: 5,
          updated_at: new Date().toISOString()
        }
      ];
      finalSlots = [
        { id: "mock-slot-1", venue_id: "mock-venue-1", slot_date: today, start_time: "18:00:00", duration_minutes: 60, court_label: "Court 1", status: "available", capacity: 10, reserved_count: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      ];
    }

    return { venues: finalVenues, slots: finalSlots };
  } catch (err) {
    console.error("[getTurfData] Failed to connect to Supabase:", err);
    throw new Error("Failed to fetch data from database.");
  }
});

const bookingSchema = z.object({
  venueId: z.string(),
  slotId: z.string(),
  playerName: z.string().trim().min(2).max(80),
  teamSize: z.number().int().min(1).max(22),
  userId: z.string().optional(),
});

export const createBooking = createServerFn({ method: "POST" })
  .validator((input) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: result, error } = await supabaseAdmin.rpc("create_guest_booking", {
        p_venue_id: data.venueId,
        p_slot_id: data.slotId,
        p_player_name: data.playerName,
        p_team_size: data.teamSize,
        ...(data.userId !== undefined && { p_user_id: data.userId }),
      });

      if (!error && result?.[0]) {
        return result[0];
      }
      
      throw new Error(error?.message || "Booking failed");
    } catch (err) {
      console.error("[createBooking] DB booking exception:", err);
      throw new Error("Failed to connect to database for booking.");
    }
  });

export const getMyBookings = createServerFn({ method: "POST" })
  .validator((input: { userId: string }) => input)
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      
      const { data: bookings, error } = await supabaseAdmin
        .from("bookings")
        .select(`
          *,
          venues:venue_id(name, location, image_key),
          slots:slot_id(slot_date, start_time, duration_minutes, court_label)
        `)
        .eq("user_id", data.userId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      return bookings || [];
    } catch (err) {
      console.error("[getMyBookings] Error fetching bookings:", err);
      throw new Error("Failed to fetch bookings.");
    }
  });