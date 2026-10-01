import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Dj1sUdwI.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DL2CUreQ.js
var getAdminData = createServerFn({ method: "GET" }).handler(createSsrRpc("0f1837f395f4bb48539777c2bbb6472ccf9a55c7f793455b67f68354476c518e"));
var addVenueSchema = objectType({
	name: stringType().min(2),
	location: stringType().min(2),
	description: stringType().min(2),
	price_per_hour: numberType().min(0)
});
var addVenueAdmin = createServerFn({ method: "POST" }).validator((input) => addVenueSchema.parse(input)).handler(createSsrRpc("d6687b6b84cd8f02fd9c69a2db0811e1e3686cb167aef4b1c002e1b9c29d2886"));
var removeVenueSchema = objectType({ id: stringType() });
var removeVenueAdmin = createServerFn({ method: "POST" }).validator((input) => removeVenueSchema.parse(input)).handler(createSsrRpc("847635069fedf183997dba8083583874aa975f737ef92815eb5fd86a72b4183d"));
var updateVenueSchema = objectType({
	id: stringType(),
	name: stringType().min(2),
	location: stringType().min(2),
	description: stringType().min(2),
	price_per_hour: numberType().min(0)
});
var updateVenueAdmin = createServerFn({ method: "POST" }).validator((input) => updateVenueSchema.parse(input)).handler(createSsrRpc("8f4b6a58ae59ee98c7f55ca0a2d818395321dc2e1edc2baf888d1d687deef031"));
var addSlotSchema = objectType({
	venue_id: stringType().uuid(),
	slot_date: stringType(),
	start_time: stringType(),
	duration_minutes: numberType().int(),
	court_label: stringType().min(1),
	capacity: numberType().int().min(1)
});
var addSlotAdmin = createServerFn({ method: "POST" }).validator((input) => addSlotSchema.parse(input)).handler(createSsrRpc("67462b4fe6a52b43f6162d23f2582cc3dea640194a6e53d3e1bb4b2f22e0c0bf"));
var removeSlotSchema = objectType({ id: stringType().uuid() });
var removeSlotAdmin = createServerFn({ method: "POST" }).validator((input) => removeSlotSchema.parse(input)).handler(createSsrRpc("a0541f94d84c7e9d9d4148597ccd4c04d089b86ef3246aa9f2d3d339c716db6a"));
var $$splitComponentImporter = () => import("./admin-BgRiuO5F.mjs");
var Route = createFileRoute("/admin")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async () => {
		return await getAdminData();
	}
});
//#endregion
export { removeVenueAdmin as a, removeSlotAdmin as i, addSlotAdmin as n, updateVenueAdmin as o, addVenueAdmin as r, Route as t };
