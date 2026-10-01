import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-4vrNtc-r.js
var getAdminData_createServerFn_handler = createServerRpc({
	id: "0f1837f395f4bb48539777c2bbb6472ccf9a55c7f793455b67f68354476c518e",
	name: "getAdminData",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminData.__executeServer(opts));
var getAdminData = createServerFn({ method: "GET" }).handler(getAdminData_createServerFn_handler, async () => {
	try {
		const { supabaseAdmin } = await import("./client.server-CArrc_EE.mjs");
		const { data: venues, error: venuesError } = await supabaseAdmin.from("venues").select("*").order("created_at", { ascending: false });
		const { data: bookings, error: bookingsError } = await supabaseAdmin.from("bookings").select("*, venues(name), slots(slot_date, start_time)").order("created_at", { ascending: false });
		const { data: slots, error: slotsError } = await supabaseAdmin.from("slots").select("*, venues(name)").order("slot_date", { ascending: false }).order("start_time", { ascending: true });
		return {
			venues: venues || [],
			bookings: bookings || [],
			slots: slots || []
		};
	} catch (err) {
		console.error("[getAdminData] Failed to fetch admin data:", err);
		return {
			venues: [],
			bookings: [],
			slots: []
		};
	}
});
var addVenueSchema = objectType({
	name: stringType().min(2),
	location: stringType().min(2),
	description: stringType().min(2),
	price_per_hour: numberType().min(0)
});
var addVenueAdmin_createServerFn_handler = createServerRpc({
	id: "d6687b6b84cd8f02fd9c69a2db0811e1e3686cb167aef4b1c002e1b9c29d2886",
	name: "addVenueAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => addVenueAdmin.__executeServer(opts));
var addVenueAdmin = createServerFn({ method: "POST" }).validator((input) => addVenueSchema.parse(input)).handler(addVenueAdmin_createServerFn_handler, async ({ data }) => {
	try {
		const { supabaseAdmin } = await import("./client.server-CArrc_EE.mjs");
		const { data: venue, error } = await supabaseAdmin.from("venues").insert([{
			...data,
			active: true,
			featured: false,
			rating: 5,
			amenities: [
				"Floodlights",
				"Changing room",
				"Free parking"
			],
			image_key: "hero"
		}]).select().single();
		if (error) throw new Error(error.message);
		return {
			success: true,
			venue
		};
	} catch (err) {
		console.error("[addVenueAdmin] Failed to add venue:", err);
		return {
			success: false,
			error: err.message
		};
	}
});
var removeVenueSchema = objectType({ id: stringType() });
var removeVenueAdmin_createServerFn_handler = createServerRpc({
	id: "847635069fedf183997dba8083583874aa975f737ef92815eb5fd86a72b4183d",
	name: "removeVenueAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => removeVenueAdmin.__executeServer(opts));
var removeVenueAdmin = createServerFn({ method: "POST" }).validator((input) => removeVenueSchema.parse(input)).handler(removeVenueAdmin_createServerFn_handler, async ({ data }) => {
	try {
		const { supabaseAdmin } = await import("./client.server-CArrc_EE.mjs");
		const { error } = await supabaseAdmin.from("venues").delete().eq("id", data.id);
		if (error) throw new Error(error.message);
		return { success: true };
	} catch (err) {
		console.error("[removeVenueAdmin] Failed to remove venue:", err);
		return {
			success: false,
			error: err.message
		};
	}
});
var updateVenueSchema = objectType({
	id: stringType(),
	name: stringType().min(2),
	location: stringType().min(2),
	description: stringType().min(2),
	price_per_hour: numberType().min(0)
});
var updateVenueAdmin_createServerFn_handler = createServerRpc({
	id: "8f4b6a58ae59ee98c7f55ca0a2d818395321dc2e1edc2baf888d1d687deef031",
	name: "updateVenueAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => updateVenueAdmin.__executeServer(opts));
var updateVenueAdmin = createServerFn({ method: "POST" }).validator((input) => updateVenueSchema.parse(input)).handler(updateVenueAdmin_createServerFn_handler, async ({ data }) => {
	try {
		const { supabaseAdmin } = await import("./client.server-CArrc_EE.mjs");
		const { id, ...updates } = data;
		const { error } = await supabaseAdmin.from("venues").update(updates).eq("id", id);
		if (error) throw new Error(error.message);
		return { success: true };
	} catch (err) {
		console.error("[updateVenueAdmin] Failed to update venue:", err);
		return {
			success: false,
			error: err.message
		};
	}
});
var addSlotSchema = objectType({
	venue_id: stringType().uuid(),
	slot_date: stringType(),
	start_time: stringType(),
	duration_minutes: numberType().int(),
	court_label: stringType().min(1),
	capacity: numberType().int().min(1)
});
var addSlotAdmin_createServerFn_handler = createServerRpc({
	id: "67462b4fe6a52b43f6162d23f2582cc3dea640194a6e53d3e1bb4b2f22e0c0bf",
	name: "addSlotAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => addSlotAdmin.__executeServer(opts));
var addSlotAdmin = createServerFn({ method: "POST" }).validator((input) => addSlotSchema.parse(input)).handler(addSlotAdmin_createServerFn_handler, async ({ data }) => {
	try {
		const { supabaseAdmin } = await import("./client.server-CArrc_EE.mjs");
		const { data: slot, error } = await supabaseAdmin.from("slots").insert([{
			...data,
			status: "available",
			reserved_count: 0
		}]).select().single();
		if (error) throw new Error(error.message);
		return {
			success: true,
			slot
		};
	} catch (err) {
		console.error("[addSlotAdmin] Failed to add slot:", err);
		return {
			success: false,
			error: err.message
		};
	}
});
var removeSlotSchema = objectType({ id: stringType().uuid() });
var removeSlotAdmin_createServerFn_handler = createServerRpc({
	id: "a0541f94d84c7e9d9d4148597ccd4c04d089b86ef3246aa9f2d3d339c716db6a",
	name: "removeSlotAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => removeSlotAdmin.__executeServer(opts));
var removeSlotAdmin = createServerFn({ method: "POST" }).validator((input) => removeSlotSchema.parse(input)).handler(removeSlotAdmin_createServerFn_handler, async ({ data }) => {
	try {
		const { supabaseAdmin } = await import("./client.server-CArrc_EE.mjs");
		const { error } = await supabaseAdmin.from("slots").delete().eq("id", data.id);
		if (error) throw new Error(error.message);
		return { success: true };
	} catch (err) {
		console.error("[removeSlotAdmin] Failed to remove slot:", err);
		return {
			success: false,
			error: err.message
		};
	}
});
//#endregion
export { addSlotAdmin_createServerFn_handler, addVenueAdmin_createServerFn_handler, getAdminData_createServerFn_handler, removeSlotAdmin_createServerFn_handler, removeVenueAdmin_createServerFn_handler, updateVenueAdmin_createServerFn_handler };
