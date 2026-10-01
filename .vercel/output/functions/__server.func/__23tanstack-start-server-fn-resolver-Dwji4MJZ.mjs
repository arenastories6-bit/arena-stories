//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-Dwji4MJZ.js
var manifest = {
	"08b027d4838b178d3209092d0b63c1f870f4b3e305239b3e5bd4fe97b45c2d13": {
		functionName: "initiateRazorpayPayment_createServerFn_handler",
		importer: () => import("./_ssr/razorpay.functions-BndjCoBe.mjs")
	},
	"0f1837f395f4bb48539777c2bbb6472ccf9a55c7f793455b67f68354476c518e": {
		functionName: "getAdminData_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-4vrNtc-r.mjs")
	},
	"420e351989fd7ccb4a000a915a1cb4390ddf4f386f067ec2f73f5d9f2d1ab927": {
		functionName: "getMyBookings_createServerFn_handler",
		importer: () => import("./_ssr/turf.functions-BdQC6YPs.mjs")
	},
	"5ec3d28b6e7f824453e14b1de84adde1e112fd3c62e594b3184f488c4c716c86": {
		functionName: "verifyAndSendEmail_createServerFn_handler",
		importer: () => import("./_ssr/email.functions-DN-LvrDg.mjs")
	},
	"60bfc0d9f04262512a50d8dadb27f07af08302be904ffeae990a478f1c1f4209": {
		functionName: "getTurfData_createServerFn_handler",
		importer: () => import("./_ssr/turf.functions-BdQC6YPs.mjs")
	},
	"67462b4fe6a52b43f6162d23f2582cc3dea640194a6e53d3e1bb4b2f22e0c0bf": {
		functionName: "addSlotAdmin_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-4vrNtc-r.mjs")
	},
	"847635069fedf183997dba8083583874aa975f737ef92815eb5fd86a72b4183d": {
		functionName: "removeVenueAdmin_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-4vrNtc-r.mjs")
	},
	"8f4b6a58ae59ee98c7f55ca0a2d818395321dc2e1edc2baf888d1d687deef031": {
		functionName: "updateVenueAdmin_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-4vrNtc-r.mjs")
	},
	"a0541f94d84c7e9d9d4148597ccd4c04d089b86ef3246aa9f2d3d339c716db6a": {
		functionName: "removeSlotAdmin_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-4vrNtc-r.mjs")
	},
	"af0886c2f86759486da720b52c86642b997297f513d2158ef876ebbd07ab4674": {
		functionName: "createBooking_createServerFn_handler",
		importer: () => import("./_ssr/turf.functions-BdQC6YPs.mjs")
	},
	"d6687b6b84cd8f02fd9c69a2db0811e1e3686cb167aef4b1c002e1b9c29d2886": {
		functionName: "addVenueAdmin_createServerFn_handler",
		importer: () => import("./_ssr/admin.functions-4vrNtc-r.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
