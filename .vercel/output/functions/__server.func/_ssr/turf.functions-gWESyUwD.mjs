import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Dj1sUdwI.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/turf.functions-gWESyUwD.js
var getTurfData = createServerFn({ method: "GET" }).handler(createSsrRpc("60bfc0d9f04262512a50d8dadb27f07af08302be904ffeae990a478f1c1f4209"));
var bookingSchema = objectType({
	venueId: stringType(),
	slotId: stringType(),
	playerName: stringType().trim().min(2).max(80),
	teamSize: numberType().int().min(1).max(22),
	userId: stringType().optional()
});
var createBooking = createServerFn({ method: "POST" }).validator((input) => bookingSchema.parse(input)).handler(createSsrRpc("af0886c2f86759486da720b52c86642b997297f513d2158ef876ebbd07ab4674"));
var getMyBookings = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("420e351989fd7ccb4a000a915a1cb4390ddf4f386f067ec2f73f5d9f2d1ab927"));
//#endregion
export { getMyBookings as n, getTurfData as r, createBooking as t };
