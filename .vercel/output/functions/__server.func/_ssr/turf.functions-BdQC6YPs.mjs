import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/turf.functions-BdQC6YPs.js
var getTurfData_createServerFn_handler = createServerRpc({
	id: "60bfc0d9f04262512a50d8dadb27f07af08302be904ffeae990a478f1c1f4209",
	name: "getTurfData",
	filename: "src/lib/turf.functions.ts"
}, (opts) => getTurfData.__executeServer(opts));
var getTurfData = createServerFn({ method: "GET" }).handler(getTurfData_createServerFn_handler, async () => {
	try {
		const { supabaseAdmin } = await import("./client.server-CArrc_EE.mjs");
		const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const [{ data: venues, error: venueError }, { data: slots, error: slotError }] = await Promise.all([supabaseAdmin.from("venues").select("*").eq("active", true).order("featured", { ascending: false }), supabaseAdmin.from("slots").select("*").gte("slot_date", today).order("slot_date").order("start_time")]);
		let finalVenues = venues && venues.length > 0 ? venues : [];
		let finalSlots = slots && slots.length > 0 ? slots : [];
		if (finalSlots.length === 0 && finalVenues.length > 0) {
			const { data: allSlots } = await supabaseAdmin.from("slots").select("*").order("slot_date").order("start_time");
			if (allSlots && allSlots.length > 0) finalSlots = allSlots;
		}
		if (finalVenues.length === 0) {
			finalVenues = [{
				id: "mock-venue-1",
				name: "Arena Stories Pitch (Demo)",
				location: "Mumbai",
				price_per_hour: 1500,
				image_key: "hero",
				active: true,
				featured: true,
				amenities: ["parking", "washroom"],
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				description: "This is a demo venue for fallback purposes.",
				rating: 5,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}];
			finalSlots = [{
				id: "mock-slot-1",
				venue_id: "mock-venue-1",
				slot_date: today,
				start_time: "18:00:00",
				duration_minutes: 60,
				court_label: "Court 1",
				status: "available",
				capacity: 10,
				reserved_count: 0,
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}];
		}
		return {
			venues: finalVenues,
			slots: finalSlots
		};
	} catch (err) {
		console.error("[getTurfData] Failed to connect to Supabase:", err);
		throw new Error("Failed to fetch data from database.");
	}
});
var bookingSchema = objectType({
	venueId: stringType(),
	slotId: stringType(),
	playerName: stringType().trim().min(2).max(80),
	teamSize: numberType().int().min(1).max(22),
	userId: stringType().optional()
});
var createBooking_createServerFn_handler = createServerRpc({
	id: "af0886c2f86759486da720b52c86642b997297f513d2158ef876ebbd07ab4674",
	name: "createBooking",
	filename: "src/lib/turf.functions.ts"
}, (opts) => createBooking.__executeServer(opts));
var createBooking = createServerFn({ method: "POST" }).validator((input) => bookingSchema.parse(input)).handler(createBooking_createServerFn_handler, async ({ data }) => {
	try {
		const { supabaseAdmin } = await import("./client.server-CArrc_EE.mjs");
		const { data: result, error } = await supabaseAdmin.rpc("create_guest_booking", {
			p_venue_id: data.venueId,
			p_slot_id: data.slotId,
			p_player_name: data.playerName,
			p_team_size: data.teamSize,
			...data.userId !== void 0 && { p_user_id: data.userId }
		});
		if (!error && result?.[0]) return result[0];
		throw new Error(error?.message || "Booking failed");
	} catch (err) {
		console.error("[createBooking] DB booking exception:", err);
		throw new Error("Failed to connect to database for booking.");
	}
});
var getMyBookings_createServerFn_handler = createServerRpc({
	id: "420e351989fd7ccb4a000a915a1cb4390ddf4f386f067ec2f73f5d9f2d1ab927",
	name: "getMyBookings",
	filename: "src/lib/turf.functions.ts"
}, (opts) => getMyBookings.__executeServer(opts));
var getMyBookings = createServerFn({ method: "POST" }).validator((input) => input).handler(getMyBookings_createServerFn_handler, async ({ data }) => {
	try {
		const { supabaseAdmin } = await import("./client.server-CArrc_EE.mjs");
		const { data: bookings, error } = await supabaseAdmin.from("bookings").select(`
          *,
          venues:venue_id(name, location, image_key),
          slots:slot_id(slot_date, start_time, duration_minutes, court_label)
        `).eq("user_id", data.userId).order("created_at", { ascending: false });
		if (error) throw new Error(error.message);
		return bookings || [];
	} catch (err) {
		console.error("[getMyBookings] Error fetching bookings:", err);
		throw new Error("Failed to fetch bookings.");
	}
});
//#endregion
export { createBooking_createServerFn_handler, getMyBookings_createServerFn_handler, getTurfData_createServerFn_handler };
