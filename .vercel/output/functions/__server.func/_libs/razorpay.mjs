import { a as __toCommonJS, i as __require, n as __esmMin, r as __exportAll, t as __commonJSMin } from "../_runtime.mjs";
import { t as require_axios } from "./axios+[...].mjs";
//#region node_modules/razorpay/dist/utils/nodeify.js
var require_nodeify = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function nodeify(promise, cb) {
		if (!cb) return promise.then(function(response) {
			return response.data;
		});
		return promise.then(function(response) {
			cb(null, response.data);
		})["catch"](function(error) {
			cb(error, null);
		});
	};
}));
//#endregion
//#region node_modules/razorpay/dist/utils/razorpay-utils.js
var require_razorpay_utils = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	var crypto = __require("crypto");
	function getDateInSecs(date) {
		return +new Date(date) / 1e3;
	}
	function normalizeDate(date) {
		return isNumber(date) ? date : getDateInSecs(date);
	}
	function isNumber(num) {
		return !isNaN(Number(num));
	}
	function isNonNullObject(input) {
		return !!input && _typeof(input) === "object" && !Array.isArray(input);
	}
	function normalizeBoolean(bool) {
		if (bool === void 0) return bool;
		return bool ? 1 : 0;
	}
	function isDefined(value) {
		return typeof value !== "undefined";
	}
	function normalizeNotes() {
		var notes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		var normalizedNotes = {};
		for (var key in notes) normalizedNotes["notes[".concat(key, "]")] = notes[key];
		return normalizedNotes;
	}
	function prettify(val) {
		return JSON.stringify(val, null, 2);
	}
	function getTestError(summary, expectedVal, gotVal) {
		return new Error("\n".concat(summary, "\n") + "Expected(".concat(_typeof(expectedVal), ")\n").concat(prettify(expectedVal), "\n\n") + "Got(".concat(_typeof(gotVal), ")\n").concat(prettify(gotVal)));
	}
	function validateWebhookSignature(body, signature, secret) {
		var crypto = __require("crypto");
		if (!isDefined(body) || !isDefined(signature) || !isDefined(secret)) throw Error("Invalid Parameters: Please give request body,signature sent in X-Razorpay-Signature header and webhook secret from dashboard as parameters");
		body = body.toString();
		return crypto.createHmac("sha256", secret).update(body).digest("hex") === signature;
	}
	function validatePaymentVerification() {
		var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		var signature = arguments.length > 1 ? arguments[1] : void 0;
		var secret = arguments.length > 2 ? arguments[2] : void 0;
		var paymentId = params.payment_id;
		if (!secret) throw new Error("secret is mandatory");
		if (isDefined(params.order_id) === true) var payload = params.order_id + "|" + paymentId;
		else if (isDefined(params.subscription_id) === true) {
			var subscriptionId = params.subscription_id;
			var payload = paymentId + "|" + subscriptionId;
		} else if (isDefined(params.payment_link_id) === true) {
			var paymentLinkId = params.payment_link_id;
			var paymentLinkRefId = params.payment_link_reference_id;
			var paymentLinkStatus = params.payment_link_status;
			var payload = paymentLinkId + "|" + paymentLinkRefId + "|" + paymentLinkStatus + "|" + paymentId;
		} else throw new Error("Either order_id or subscription_id is mandatory");
		return validateWebhookSignature(payload, signature, secret);
	}
	function generateOnboardingSignature() {
		var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		var secret = arguments.length > 1 ? arguments[1] : void 0;
		return encrypt(JSON.stringify(params), secret);
	}
	function encrypt(dataToEncrypt, secret) {
		try {
			var keyBytes = Buffer.from(secret.slice(0, 16), "utf8");
			var iv = crypto.randomBytes(12);
			var cipher = crypto.createCipheriv("aes-128-gcm", keyBytes, iv);
			var encryptedData = cipher.update(dataToEncrypt, "utf8");
			encryptedData = Buffer.concat([encryptedData, cipher["final"]()]);
			var authTag = cipher.getAuthTag();
			return Buffer.concat([
				iv,
				encryptedData,
				authTag
			]).toString("hex");
		} catch (err) {
			throw new Error("Encryption failed: ".concat(err.message));
		}
	}
	function isValidUrl(url) {
		try {
			new URL(url);
			return true;
		} catch (error) {
			return false;
		}
	}
	module.exports = {
		normalizeNotes,
		normalizeDate,
		normalizeBoolean,
		isNumber,
		getDateInSecs,
		prettify,
		isDefined,
		isNonNullObject,
		getTestError,
		validateWebhookSignature,
		validatePaymentVerification,
		isValidUrl,
		generateOnboardingSignature
	};
}));
//#endregion
//#region node_modules/razorpay/dist/api.js
var require_api = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _classCallCheck(a, n) {
		if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
	}
	function _defineProperties(e, r) {
		for (var t = 0; t < r.length; t++) {
			var o = r[t];
			o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
		}
	}
	function _createClass(e, r, t) {
		return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var axios = require_axios()["default"];
	var nodeify = require_nodeify();
	var isNonNullObject = require_razorpay_utils().isNonNullObject;
	var allowedHeaders = {
		"X-Razorpay-Account": "",
		"Content-Type": "application/json"
	};
	function getValidHeaders(headers) {
		var result = {};
		if (!isNonNullObject(headers)) return result;
		return Object.keys(headers).reduce(function(result, headerName) {
			if (allowedHeaders.hasOwnProperty(headerName)) result[headerName] = headers[headerName];
			return result;
		}, result);
	}
	function normalizeError(err) {
		throw {
			statusCode: err.response.status,
			error: err.response.data.error
		};
	}
	module.exports = /* @__PURE__ */ function() {
		function API(options) {
			_classCallCheck(this, API);
			_defineProperty(this, "version", "v1");
			this.rq = axios.create(this._createConfig(options));
		}
		return _createClass(API, [
			{
				key: "_createConfig",
				value: function _createConfig(options) {
					var config = {
						baseURL: options.hostUrl,
						headers: Object.assign({ "User-Agent": options.ua }, getValidHeaders(options.headers))
					};
					if (options.key_id && options.key_secret) config.auth = {
						username: options.key_id,
						password: options.key_secret
					};
					if (options.oauthToken) config.headers = _objectSpread({ "Authorization": "Bearer ".concat(options.oauthToken) }, config.headers);
					return config;
				}
			},
			{
				key: "getEntityUrl",
				value: function getEntityUrl(params) {
					return params.hasOwnProperty("version") ? "/".concat(params.version).concat(params.url) : "/".concat(this.version).concat(params.url);
				}
			},
			{
				key: "get",
				value: function get(params, cb) {
					return nodeify(this.rq.get(this.getEntityUrl(params), { params: params.data })["catch"](normalizeError), cb);
				}
			},
			{
				key: "post",
				value: function post(params, cb) {
					return nodeify(this.rq.post(this.getEntityUrl(params), params.data)["catch"](normalizeError), cb);
				}
			},
			{
				key: "postFormData",
				value: function postFormData(params, cb) {
					return nodeify(this.rq.post(this.getEntityUrl(params), params.formData, { "headers": { "Content-Type": "multipart/form-data" } })["catch"](normalizeError), cb);
				}
			},
			{
				key: "put",
				value: function put(params, cb) {
					return nodeify(this.rq.put(this.getEntityUrl(params), params.data)["catch"](normalizeError), cb);
				}
			},
			{
				key: "patch",
				value: function patch(params, cb) {
					return nodeify(this.rq.patch(this.getEntityUrl(params), params.data)["catch"](normalizeError), cb);
				}
			},
			{
				key: "delete",
				value: function _delete(params, cb) {
					return nodeify(this.rq["delete"](this.getEntityUrl(params))["catch"](normalizeError), cb);
				}
			}
		]);
	}();
}));
//#endregion
//#region node_modules/razorpay/package.json
var package_exports = /* @__PURE__ */ __exportAll({
	default: () => package_default,
	dependencies: () => dependencies,
	description: () => description,
	devDependencies: () => devDependencies,
	files: () => files,
	keywords: () => keywords,
	license: () => "MIT",
	main: () => main,
	mocha: () => mocha,
	name: () => name,
	repository: () => repository,
	scripts: () => scripts,
	typings: () => typings,
	version: () => version
}), name, version, description, main, typings, scripts, repository, keywords, files, mocha, devDependencies, dependencies, package_default;
var init_package = __esmMin((() => {
	name = "razorpay";
	version = "2.9.8";
	description = "Official Node SDK for Razorpay API";
	main = "dist/razorpay";
	typings = "dist/razorpay";
	scripts = {
		"prepublish": "npm test",
		"clean": "rm -rf dist && mkdir dist",
		"cp-types": "mkdir dist/types && cp lib/types/* dist/types && cp lib/utils/*d.ts dist/utils",
		"cp-ts": "cp lib/razorpay.d.ts dist/ && cp lib/oAuthTokenClient.d.ts dist/ && npm run cp-types",
		"build:commonjs": "babel lib -d dist",
		"build": "npm run clean && npm run build:commonjs && npm run cp-ts",
		"debug": "npm run build && node-debug examples/index.js",
		"test": "npm run build && mocha --recursive --require @babel/register test/ && nyc --reporter=text mocha",
		"coverage": "nyc report --reporter=text-lcov > coverage.lcov"
	};
	repository = {
		"type": "git",
		"url": "https://github.com/razorpay/razorpay-node.git"
	};
	keywords = [
		"razorpay",
		"payments",
		"node",
		"nodejs",
		"razorpay-node"
	];
	files = ["dist"];
	mocha = {
		"recursive": true,
		"full-trace": true
	};
	devDependencies = {
		"@babel/cli": "^7.24.5",
		"@babel/core": "^7.24.5",
		"@babel/preset-env": "^7.24.5",
		"@babel/register": "^7.24.5",
		"@types/node": "^20.12.12",
		"chai": "^4.3.4",
		"deep-equal": "^2.0.5",
		"mocha": "^9.0.0",
		"nock": "^13.1.1",
		"nyc": "^15.1.0",
		"typescript": "^4.9.4"
	};
	dependencies = { "axios": "^1.18.1" };
	package_default = {
		name,
		version,
		description,
		main,
		typings,
		scripts,
		repository,
		keywords,
		files,
		mocha,
		license: "MIT",
		devDependencies,
		dependencies
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/accounts.js
var require_accounts = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	var _excluded = ["file"];
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function _objectWithoutProperties(e, t) {
		if (null == e) return {};
		var o, r, i = _objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(e);
			for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	module.exports = function(api) {
		var BASE_URL = "/accounts";
		return {
			create: function create(params, callback) {
				return api.post({
					version: "v2",
					url: "".concat(BASE_URL),
					data: params
				}, callback);
			},
			edit: function edit(accountId, params, callback) {
				return api.patch({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId),
					data: params
				}, callback);
			},
			fetch: function fetch(accountId, callback) {
				return api.get({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId)
				}, callback);
			},
			"delete": function _delete(accountId, callback) {
				return api["delete"]({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId)
				}, callback);
			},
			uploadAccountDoc: function uploadAccountDoc(accountId, params, callback) {
				var file = params.file, rest = _objectWithoutProperties(params, _excluded);
				return api.postFormData({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/documents"),
					formData: _objectSpread({ file: file.value }, rest)
				}, callback);
			},
			fetchAccountDoc: function fetchAccountDoc(accountId, callback) {
				return api.get({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/documents")
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/stakeholders.js
var require_stakeholders = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	var _excluded = ["file"];
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function _objectWithoutProperties(e, t) {
		if (null == e) return {};
		var o, r, i = _objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(e);
			for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	module.exports = function(api) {
		var BASE_URL = "/accounts";
		return {
			create: function create(accountId, params, callback) {
				return api.post({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders"),
					data: params
				}, callback);
			},
			edit: function edit(accountId, stakeholderId, params, callback) {
				return api.patch({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders/").concat(stakeholderId),
					data: params
				}, callback);
			},
			fetch: function fetch(accountId, stakeholderId, callback) {
				return api.get({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders/").concat(stakeholderId)
				}, callback);
			},
			all: function all(accountId, callback) {
				return api.get({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders")
				}, callback);
			},
			uploadStakeholderDoc: function uploadStakeholderDoc(accountId, stakeholderId, params, callback) {
				var file = params.file, rest = _objectWithoutProperties(params, _excluded);
				return api.postFormData({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders/").concat(stakeholderId, "/documents"),
					formData: _objectSpread({ file: file.value }, rest)
				}, callback);
			},
			fetchStakeholderDoc: function fetchStakeholderDoc(accountId, stakeholderId, callback) {
				return api.get({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/stakeholders/").concat(stakeholderId, "/documents")
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/payments.js
var require_payments = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function _objectDestructuringEmpty(t) {
		if (null == t) throw new TypeError("Cannot destructure " + t);
	}
	function _extends() {
		return _extends = Object.assign ? Object.assign.bind() : function(n) {
			for (var e = 1; e < arguments.length; e++) {
				var t = arguments[e];
				for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
			}
			return n;
		}, _extends.apply(null, arguments);
	}
	var normalizeDate = require_razorpay_utils().normalizeDate;
	var ID_REQUIRED_MSG = "`payment_id` is mandatory";
	var BASE_URL = "/payments";
	module.exports = function(api) {
		return {
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip;
				var expand;
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				if (params.hasOwnProperty("expand[]")) expand = { "expand[]": params["expand[]"] };
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url: "".concat(BASE_URL),
					data: {
						from,
						to,
						count,
						skip,
						expand
					}
				}, callback);
			},
			fetch: function fetch(paymentId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				var expand;
				if (!paymentId) throw new Error("`payment_id` is mandatory");
				if (params.hasOwnProperty("expand[]")) expand = { "expand[]": params["expand[]"] };
				return api.get({
					url: "".concat(BASE_URL, "/").concat(paymentId),
					data: { expand }
				}, callback);
			},
			capture: function capture(paymentId, amount, currency, callback) {
				if (!paymentId) throw new Error("`payment_id` is mandatory");
				if (!amount) throw new Error("`amount` is mandatory");
				var payload = { amount };
				/**
				* For backward compatibility,
				* the third argument can be a callback
				* instead of currency.
				* Set accordingly.
				*/
				if (typeof currency === "function" && !callback) {
					callback = currency;
					currency = void 0;
				} else if (typeof currency === "string") payload.currency = currency;
				return api.post({
					url: "".concat(BASE_URL, "/").concat(paymentId, "/capture"),
					data: payload
				}, callback);
			},
			createPaymentJson: function createPaymentJson(params, callback) {
				var url = "".concat(BASE_URL, "/create/json"), rest = _extends({}, (_objectDestructuringEmpty(params), params)), data = Object.assign(rest);
				return api.post({
					url,
					data
				}, callback);
			},
			createRecurringPayment: function createRecurringPayment(params, callback) {
				return api.post({
					url: "".concat(BASE_URL, "/create/recurring"),
					data: params
				}, callback);
			},
			edit: function edit(paymentId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				if (!paymentId) throw new Error("`payment_id` is mandatory");
				return api.patch({
					url: "".concat(BASE_URL, "/").concat(paymentId),
					data: params
				}, callback);
			},
			refund: function refund(paymentId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				if (!paymentId) throw new Error("`payment_id` is mandatory");
				return api.post({
					url: "".concat(BASE_URL, "/").concat(paymentId, "/refund"),
					data: params
				}, callback);
			},
			fetchMultipleRefund: function fetchMultipleRefund(paymentId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, url = "".concat(BASE_URL, "/").concat(paymentId, "/refunds");
				return api.get({
					url,
					data: _objectSpread(_objectSpread({}, params), {}, {
						from,
						to,
						count,
						skip
					})
				}, callback);
			},
			fetchRefund: function fetchRefund(paymentId, refundId, callback) {
				if (!paymentId) throw new Error("payment Id` is mandatory");
				if (!refundId) throw new Error("refund Id` is mandatory");
				return api.get({ url: "".concat(BASE_URL, "/").concat(paymentId, "/refunds/").concat(refundId) }, callback);
			},
			fetchTransfer: function fetchTransfer(paymentId, callback) {
				if (!paymentId) throw new Error("payment Id` is mandatory");
				return api.get({ url: "".concat(BASE_URL, "/").concat(paymentId, "/transfers") }, callback);
			},
			transfer: function transfer(paymentId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				if (!paymentId) throw new Error("`payment_id` is mandatory");
				return api.post({
					url: "".concat(BASE_URL, "/").concat(paymentId, "/transfers"),
					data: params
				}, callback);
			},
			bankTransfer: function bankTransfer(paymentId, callback) {
				if (!paymentId) return Promise.reject(ID_REQUIRED_MSG);
				return api.get({ url: "".concat(BASE_URL, "/").concat(paymentId, "/bank_transfer") }, callback);
			},
			fetchCardDetails: function fetchCardDetails(paymentId, callback) {
				if (!paymentId) return Promise.reject(ID_REQUIRED_MSG);
				return api.get({ url: "".concat(BASE_URL, "/").concat(paymentId, "/card") }, callback);
			},
			fetchPaymentDowntime: function fetchPaymentDowntime(callback) {
				return api.get({ url: "".concat(BASE_URL, "/downtimes") }, callback);
			},
			fetchPaymentDowntimeById: function fetchPaymentDowntimeById(downtimeId, callback) {
				if (!downtimeId) return Promise.reject("Downtime Id is mandatory");
				return api.get({ url: "".concat(BASE_URL, "/downtimes/").concat(downtimeId) }, callback);
			},
			otpGenerate: function otpGenerate(paymentId, callback) {
				if (!paymentId) return Promise.reject("payment Id is mandatory");
				return api.post({ url: "".concat(BASE_URL, "/").concat(paymentId, "/otp_generate") }, callback);
			},
			otpSubmit: function otpSubmit(paymentId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				if (!paymentId) return Promise.reject("payment Id is mandatory");
				return api.post({
					url: "".concat(BASE_URL, "/").concat(paymentId, "/otp/submit"),
					data: params
				}, callback);
			},
			otpResend: function otpResend(paymentId, callback) {
				if (!paymentId) return Promise.reject("payment Id is mandatory");
				return api.post({ url: "".concat(BASE_URL, "/").concat(paymentId, "/otp/resend") }, callback);
			},
			createUpi: function createUpi() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var url = "".concat(BASE_URL, "/create/upi"), rest = _extends({}, (_objectDestructuringEmpty(params), params)), data = Object.assign(rest);
				return api.post({
					url,
					data
				}, callback);
			},
			validateVpa: function validateVpa() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var url = "".concat(BASE_URL, "/validate/vpa"), rest = _extends({}, (_objectDestructuringEmpty(params), params)), data = Object.assign(rest);
				return api.post({
					url,
					data
				}, callback);
			},
			fetchPaymentMethods: function fetchPaymentMethods(callback) {
				return api.get({ url: "/methods" }, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/refunds.js
var require_refunds = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var _require = require_razorpay_utils();
	var normalizeDate = _require.normalizeDate;
	_require.normalizeNotes;
	module.exports = function(api) {
		return {
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, payment_id = params.payment_id;
				var url = "/refunds";
				if (payment_id) url = "/payments/".concat(payment_id, "/refunds");
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url,
					data: {
						from,
						to,
						count,
						skip
					}
				}, callback);
			},
			edit: function edit(refundId, params, callback) {
				if (!refundId) throw new Error("refund Id is mandatory");
				return api.patch({
					url: "/refunds/".concat(refundId),
					data: params
				}, callback);
			},
			fetch: function fetch(refundId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				var payment_id = params.payment_id;
				if (!refundId) throw new Error("`refund_id` is mandatory");
				var url = "/refunds/".concat(refundId);
				if (payment_id) url = "/payments/".concat(payment_id).concat(url);
				return api.get({ url }, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/orders.js
var require_orders = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	var _excluded = ["currency"];
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function _objectWithoutProperties(e, t) {
		if (null == e) return {};
		var o, r, i = _objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(e);
			for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	var normalizeDate = require_razorpay_utils().normalizeDate;
	module.exports = function(api) {
		return {
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, authorized = params.authorized, receipt = params.receipt;
				var expand;
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				if (params.hasOwnProperty("expand[]")) expand = { "expand[]": params["expand[]"] };
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				authorized = authorized;
				return api.get({
					url: "/orders",
					data: {
						from,
						to,
						count,
						skip,
						authorized,
						receipt,
						expand
					}
				}, callback);
			},
			fetch: function fetch(orderId, callback) {
				if (!orderId) throw new Error("`order_id` is mandatory");
				return api.get({ url: "/orders/".concat(orderId) }, callback);
			},
			create: function create() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var currency = params.currency, otherParams = _objectWithoutProperties(params, _excluded);
				currency = currency || "INR";
				var data = Object.assign(_objectSpread({ currency }, otherParams));
				return api.post({
					url: "/orders",
					data
				}, callback);
			},
			edit: function edit(orderId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				if (!orderId) throw new Error("`order_id` is mandatory");
				return api.patch({
					url: "/orders/".concat(orderId),
					data: params
				}, callback);
			},
			fetchPayments: function fetchPayments(orderId, callback) {
				if (!orderId) throw new Error("`order_id` is mandatory");
				return api.get({ url: "/orders/".concat(orderId, "/payments") }, callback);
			},
			fetchTransferOrder: function fetchTransferOrder(orderId, callback) {
				if (!orderId) throw new Error("`order_id` is mandatory");
				return api.get({ url: "/orders/".concat(orderId, "/?expand[]=transfers&status") }, callback);
			},
			viewRtoReview: function viewRtoReview(orderId, callback) {
				return api.post({ url: "/orders/".concat(orderId, "/rto_review") }, callback);
			},
			editFulfillment: function editFulfillment(orderId) {
				var param = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				arguments.length > 2 && arguments[2];
				return api.post({
					url: "/orders/".concat(orderId, "/fulfillment"),
					data: param
				});
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/customers.js
var require_customers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(api) {
		return {
			create: function create(params, callback) {
				return api.post({
					url: "/customers",
					data: params
				}, callback);
			},
			edit: function edit(customerId, params, callback) {
				return api.put({
					url: "/customers/".concat(customerId),
					data: params
				}, callback);
			},
			fetch: function fetch(customerId, callback) {
				return api.get({ url: "/customers/".concat(customerId) }, callback);
			},
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var count = params.count, skip = params.skip;
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url: "/customers",
					data: {
						count,
						skip
					}
				}, callback);
			},
			fetchTokens: function fetchTokens(customerId, callback) {
				return api.get({ url: "/customers/".concat(customerId, "/tokens") }, callback);
			},
			fetchToken: function fetchToken(customerId, tokenId, callback) {
				return api.get({ url: "/customers/".concat(customerId, "/tokens/").concat(tokenId) }, callback);
			},
			deleteToken: function deleteToken(customerId, tokenId, callback) {
				return api["delete"]({ url: "/customers/".concat(customerId, "/tokens/").concat(tokenId) }, callback);
			},
			addBankAccount: function addBankAccount(customerId, params, callback) {
				return api.post({
					url: "/customers/".concat(customerId, "/bank_account"),
					data: params
				}, callback);
			},
			deleteBankAccount: function deleteBankAccount(customerId, bankId, callback) {
				return api["delete"]({ url: "/customers/".concat(customerId, "/bank_account/").concat(bankId) }, callback);
			},
			requestEligibilityCheck: function requestEligibilityCheck(params, callback) {
				return api.post({
					url: "/customers/eligibility",
					data: params
				}, callback);
			},
			fetchEligibility: function fetchEligibility(eligibilityId, callback) {
				return api.get({ url: "/customers/eligibility/".concat(eligibilityId) }, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/transfers.js
var require_transfers = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var normalizeDate = require_razorpay_utils().normalizeDate;
	module.exports = function(api) {
		return {
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, payment_id = params.payment_id, recipient_settlement_id = params.recipient_settlement_id;
				var url = "/transfers";
				if (payment_id) url = "/payments/".concat(payment_id, "/transfers");
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url,
					data: {
						from,
						to,
						count,
						skip,
						recipient_settlement_id
					}
				}, callback);
			},
			fetch: function fetch(transferId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				params.payment_id;
				if (!transferId) throw new Error("`transfer_id` is mandatory");
				var url = "/transfers/".concat(transferId);
				return api.get({ url }, callback);
			},
			create: function create(params, callback) {
				return api.post({
					url: "/transfers",
					data: params
				}, callback);
			},
			edit: function edit(transferId, params, callback) {
				return api.patch({
					url: "/transfers/".concat(transferId),
					data: params
				}, callback);
			},
			reverse: function reverse(transferId, params, callback) {
				if (!transferId) throw new Error("`transfer_id` is mandatory");
				var url = "/transfers/".concat(transferId, "/reversals");
				return api.post({
					url,
					data: params
				}, callback);
			},
			fetchSettlements: function fetchSettlements(callback) {
				return api.get({ url: "/transfers?expand[]=recipient_settlement" }, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/tokens.js
var require_tokens = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	require_razorpay_utils().normalizeNotes;
	module.exports = function(api) {
		var BASE_URL = "/tokens";
		return {
			create: function create(params, callback) {
				return api.post({
					url: "".concat(BASE_URL),
					data: params
				}, callback);
			},
			fetch: function fetch(params, callback) {
				return api.post({
					url: "".concat(BASE_URL, "/fetch"),
					data: params
				}, callback);
			},
			"delete": function _delete(params, callback) {
				return api.post({
					url: "".concat(BASE_URL, "/delete"),
					data: params
				}, callback);
			},
			processPaymentOnAlternatePAorPG: function processPaymentOnAlternatePAorPG(params, callback) {
				return api.post({
					url: "".concat(BASE_URL, "/service_provider_tokens/token_transactional_data"),
					data: params
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/virtualAccounts.js
var require_virtualAccounts = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	var _excluded = [
		"from",
		"to",
		"count",
		"skip"
	];
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function _objectWithoutProperties(e, t) {
		if (null == e) return {};
		var o, r, i = _objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(e);
			for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	var _require = require_razorpay_utils();
	var normalizeDate = _require.normalizeDate;
	_require.normalizeNotes;
	var BASE_URL = "/virtual_accounts";
	var ID_REQUIRED_MSG = "`virtual_account_id` is mandatory";
	module.exports = function(api) {
		return {
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, otherParams = _objectWithoutProperties(params, _excluded);
				var url = BASE_URL;
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url,
					data: _objectSpread({
						from,
						to,
						count,
						skip
					}, otherParams)
				}, callback);
			},
			fetch: function fetch(virtualAccountId, callback) {
				if (!virtualAccountId) return Promise.reject(ID_REQUIRED_MSG);
				var url = "".concat(BASE_URL, "/").concat(virtualAccountId);
				return api.get({ url }, callback);
			},
			create: function create() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				return api.post({
					url: BASE_URL,
					data: params
				}, callback);
			},
			close: function close(virtualAccountId, callback) {
				if (!virtualAccountId) return Promise.reject(ID_REQUIRED_MSG);
				return api.post({ url: "".concat(BASE_URL, "/").concat(virtualAccountId, "/close") }, callback);
			},
			fetchPayments: function fetchPayments(virtualAccountId, callback) {
				if (!virtualAccountId) return Promise.reject(ID_REQUIRED_MSG);
				var url = "".concat(BASE_URL, "/").concat(virtualAccountId, "/payments");
				return api.get({ url }, callback);
			},
			addReceiver: function addReceiver(virtualAccountId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				if (!virtualAccountId) return Promise.reject(ID_REQUIRED_MSG);
				return api.post({
					url: "".concat(BASE_URL, "/").concat(virtualAccountId, "/receivers"),
					data: params
				}, callback);
			},
			allowedPayer: function allowedPayer(virtualAccountId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				if (!virtualAccountId) return Promise.reject(ID_REQUIRED_MSG);
				return api.post({
					url: "".concat(BASE_URL, "/").concat(virtualAccountId, "/allowed_payers"),
					data: params
				}, callback);
			},
			deleteAllowedPayer: function deleteAllowedPayer(virtualAccountId, allowedPayerId, callback) {
				if (!virtualAccountId) return Promise.reject(ID_REQUIRED_MSG);
				if (!allowedPayerId) return Promise.reject("allowed payer id is mandatory");
				return api["delete"]({ url: "".concat(BASE_URL, "/").concat(virtualAccountId, "/allowed_payers/").concat(allowedPayerId) }, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/invoices.js
var require_invoices = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var normalizeDate = require_razorpay_utils().normalizeDate;
	module.exports = function invoicesApi(api) {
		var BASE_URL = "/invoices", MISSING_ID_ERROR = "Invoice ID is mandatory";
		/**
		* Invoice entity gets used for both Payment Links and Invoices system.
		* Few of the methods are only meaningful for Invoices system and
		* calling those for against/for a Payment Link would throw
		* Bad request error.
		*/
		return {
			create: function create() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var url = BASE_URL;
				return api.post({
					url,
					data: params
				}, callback);
			},
			edit: function edit(invoiceId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				var url = "".concat(BASE_URL, "/").concat(invoiceId);
				if (!invoiceId) return Promise.reject("Invoice ID is mandatory");
				return api.patch({
					url,
					data: params
				}, callback);
			},
			issue: function issue(invoiceId, callback) {
				if (!invoiceId) return Promise.reject(MISSING_ID_ERROR);
				var url = "".concat(BASE_URL, "/").concat(invoiceId, "/issue");
				return api.post({ url }, callback);
			},
			"delete": function _delete(invoiceId, callback) {
				if (!invoiceId) return Promise.reject(MISSING_ID_ERROR);
				var url = "".concat(BASE_URL, "/").concat(invoiceId);
				return api["delete"]({ url }, callback);
			},
			cancel: function cancel(invoiceId, callback) {
				if (!invoiceId) return Promise.reject(MISSING_ID_ERROR);
				var url = "".concat(BASE_URL, "/").concat(invoiceId, "/cancel");
				return api.post({ url }, callback);
			},
			fetch: function fetch(invoiceId, callback) {
				if (!invoiceId) return Promise.reject(MISSING_ID_ERROR);
				var url = "".concat(BASE_URL, "/").concat(invoiceId);
				return api.get({ url }, callback);
			},
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url,
					data: _objectSpread(_objectSpread({}, params), {}, {
						from,
						to,
						count,
						skip
					})
				}, callback);
			},
			notifyBy: function notifyBy(invoiceId, medium, callback) {
				if (!invoiceId) return Promise.reject(MISSING_ID_ERROR);
				if (!medium) return Promise.reject("`medium` is required");
				var url = "".concat(BASE_URL, "/").concat(invoiceId, "/notify_by/").concat(medium);
				return api.post({ url }, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/iins.js
var require_iins = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(api) {
		var BASE_URL = "/iins";
		return {
			fetch: function fetch(tokenIin, callback) {
				return api.get({ url: "".concat(BASE_URL, "/").concat(tokenIin) }, callback);
			},
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				return api.get({
					url: "".concat(BASE_URL, "/list"),
					data: params
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/paymentLink.js
var require_paymentLink = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var normalizeDate = require_razorpay_utils().normalizeDate;
	module.exports = function paymentLinkApi(api) {
		var BASE_URL = "/payment_links", MISSING_ID_ERROR = "Payment Link ID is mandatory";
		return {
			create: function create(params, callback) {
				var url = BASE_URL;
				return api.post({
					url,
					data: params
				}, callback);
			},
			cancel: function cancel(paymentLinkId, callback) {
				if (!paymentLinkId) return Promise.reject(MISSING_ID_ERROR);
				var url = "".concat(BASE_URL, "/").concat(paymentLinkId, "/cancel");
				return api.post({ url }, callback);
			},
			fetch: function fetch(paymentLinkId, callback) {
				if (!paymentLinkId) return Promise.reject(MISSING_ID_ERROR);
				var url = "".concat(BASE_URL, "/").concat(paymentLinkId);
				return api.get({ url }, callback);
			},
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url,
					data: _objectSpread(_objectSpread({}, params), {}, {
						from,
						to,
						count,
						skip
					})
				}, callback);
			},
			edit: function edit(paymentLinkId, params, callback) {
				return api.patch({
					url: "".concat(BASE_URL, "/").concat(paymentLinkId),
					data: params
				}, callback);
			},
			notifyBy: function notifyBy(paymentLinkId, medium, callback) {
				if (!paymentLinkId) return Promise.reject(MISSING_ID_ERROR);
				if (!medium) return Promise.reject("`medium` is required");
				var url = "".concat(BASE_URL, "/").concat(paymentLinkId, "/notify_by/").concat(medium);
				return api.post({ url }, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/plans.js
var require_plans = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var normalizeDate = require_razorpay_utils().normalizeDate;
	module.exports = function plansApi(api) {
		var BASE_URL = "/plans", MISSING_ID_ERROR = "Plan ID is mandatory";
		return {
			create: function create() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var url = BASE_URL;
				return api.post({
					url,
					data: params
				}, callback);
			},
			fetch: function fetch(planId, callback) {
				if (!planId) return Promise.reject(MISSING_ID_ERROR);
				var url = "".concat(BASE_URL, "/").concat(planId);
				return api.get({ url }, callback);
			},
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url,
					data: _objectSpread(_objectSpread({}, params), {}, {
						from,
						to,
						count,
						skip
					})
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/products.js
var require_products = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(api) {
		var BASE_URL = "/accounts";
		return {
			requestProductConfiguration: function requestProductConfiguration(accountId, params, callback) {
				return api.post({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/products"),
					data: params
				}, callback);
			},
			edit: function edit(accountId, productId, params, callback) {
				return api.patch({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/products/").concat(productId),
					data: params
				}, callback);
			},
			fetch: function fetch(accountId, productId, callback) {
				return api.get({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/products/").concat(productId)
				}, callback);
			},
			fetchTnc: function fetchTnc(productName, callback) {
				return api.get({
					version: "v2",
					url: "/products/".concat(productName, "/tnc")
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/subscriptions.js
var require_subscriptions = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var normalizeDate = require_razorpay_utils().normalizeDate;
	module.exports = function subscriptionsApi(api) {
		var BASE_URL = "/subscriptions", MISSING_ID_ERROR = "Subscription ID is mandatory";
		return {
			create: function create() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var url = BASE_URL;
				return api.post({
					url,
					data: params
				}, callback);
			},
			fetch: function fetch(subscriptionId, callback) {
				if (!subscriptionId) return Promise.reject(MISSING_ID_ERROR);
				var url = "".concat(BASE_URL, "/").concat(subscriptionId);
				return api.get({ url }, callback);
			},
			update: function update(subscriptionId, params, callback) {
				var url = "".concat(BASE_URL, "/").concat(subscriptionId);
				if (!subscriptionId) return Promise.reject(MISSING_ID_ERROR);
				return api.patch({
					url,
					data: params
				}, callback);
			},
			pendingUpdate: function pendingUpdate(subscriptionId, callback) {
				var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/retrieve_scheduled_changes");
				if (!subscriptionId) return Promise.reject(MISSING_ID_ERROR);
				return api.get({ url }, callback);
			},
			cancelScheduledChanges: function cancelScheduledChanges(subscriptionId, callback) {
				var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/cancel_scheduled_changes");
				if (!subscriptionId) return Promise.reject("Subscription Id is mandatory");
				return api.post({ url }, callback);
			},
			pause: function pause(subscriptionId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/pause");
				if (!subscriptionId) return Promise.reject("Subscription Id is mandatory");
				return api.post({
					url,
					data: params
				}, callback);
			},
			resume: function resume(subscriptionId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/resume");
				if (!subscriptionId) return Promise.reject("Subscription Id is mandatory");
				return api.post({
					url,
					data: params
				}, callback);
			},
			deleteOffer: function deleteOffer(subscriptionId, offerId, callback) {
				var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/").concat(offerId);
				if (!subscriptionId) return Promise.reject("Subscription Id is mandatory");
				return api["delete"]({ url }, callback);
			},
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url,
					data: _objectSpread(_objectSpread({}, params), {}, {
						from,
						to,
						count,
						skip
					})
				}, callback);
			},
			cancel: function cancel(subscriptionId) {
				var cancelAtCycleEnd = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/cancel");
				if (!subscriptionId) return Promise.reject(MISSING_ID_ERROR);
				return api.post(_objectSpread({ url }, cancelAtCycleEnd && { data: { cancel_at_cycle_end: 1 } }), callback);
			},
			createAddon: function createAddon(subscriptionId, params, callback) {
				var url = "".concat(BASE_URL, "/").concat(subscriptionId, "/addons");
				if (!subscriptionId) return Promise.reject(MISSING_ID_ERROR);
				return api.post({
					url,
					data: _objectSpread({}, params)
				}, callback);
			},
			createRegistrationLink: function createRegistrationLink() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				return api.post({
					url: "/subscription_registration/auth_links",
					data: params
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/addons.js
var require_addons = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var normalizeDate = require_razorpay_utils().normalizeDate;
	module.exports = function(api) {
		var BASE_URL = "/addons", MISSING_ID_ERROR = "Addon ID is mandatory";
		return {
			fetch: function fetch(addonId, callback) {
				if (!addonId) return Promise.reject(MISSING_ID_ERROR);
				var url = "".concat(BASE_URL, "/").concat(addonId);
				return api.get({ url }, callback);
			},
			"delete": function _delete(addonId, callback) {
				if (!addonId) return Promise.reject(MISSING_ID_ERROR);
				var url = "".concat(BASE_URL, "/").concat(addonId);
				return api["delete"]({ url }, callback);
			},
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments[1];
				var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url,
					data: _objectSpread(_objectSpread({}, params), {}, {
						from,
						to,
						count,
						skip
					})
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/settlements.js
var require_settlements = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = function(api) {
		var BASE_URL = "/settlements";
		return {
			createOndemandSettlement: function createOndemandSettlement() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var url = "".concat(BASE_URL, "/ondemand");
				return api.post({
					url,
					data: params
				}, callback);
			},
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
				return api.get({
					url,
					data: _objectSpread(_objectSpread({}, params), {}, {
						from,
						to,
						count,
						skip
					})
				}, callback);
			},
			fetch: function fetch(settlementId, callback) {
				if (!settlementId) return Promise.reject("settlement Id is mandatroy");
				return api.get({ url: "".concat(BASE_URL, "/").concat(settlementId) }, callback);
			},
			fetchOndemandSettlementById: function fetchOndemandSettlementById(settlementId) {
				var param = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				var expand;
				if (!settlementId) return Promise.reject("settlment Id is mandatroy");
				if (param.hasOwnProperty("expand[]")) expand = { "expand[]": param["expand[]"] };
				return api.get({
					url: "".concat(BASE_URL, "/ondemand/").concat(settlementId),
					data: { expand }
				}, callback);
			},
			fetchAllOndemandSettlement: function fetchAllOndemandSettlement() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var expand;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, url = "".concat(BASE_URL, "/ondemand");
				if (params.hasOwnProperty("expand[]")) expand = { "expand[]": params["expand[]"] };
				return api.get({
					url,
					data: _objectSpread(_objectSpread({}, params), {}, {
						from,
						to,
						count,
						skip,
						expand
					})
				}, callback);
			},
			reports: function reports() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var day = params.day, count = params.count, skip = params.skip, url = "".concat(BASE_URL, "/recon/combined");
				return api.get({
					url,
					data: _objectSpread(_objectSpread({}, params), {}, {
						day,
						count,
						skip
					})
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/qrCode.js
var require_qrCode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = function(api) {
		var BASE_URL = "/payments/qr_codes";
		return {
			create: function create() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var url = BASE_URL;
				return api.post({
					url,
					data: params
				}, callback);
			},
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
				return api.get({
					url,
					data: _objectSpread(_objectSpread({}, params), {}, {
						from,
						to,
						count,
						skip
					})
				}, callback);
			},
			fetchAllPayments: function fetchAllPayments(qrCodeId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, url = "".concat(BASE_URL, "/").concat(qrCodeId, "/payments");
				return api.get({
					url,
					data: _objectSpread(_objectSpread({}, params), {}, {
						from,
						to,
						count,
						skip
					})
				}, callback);
			},
			fetch: function fetch(qrCodeId, callback) {
				if (!qrCodeId) return Promise.reject("qrCode Id is mandatroy");
				return api.get({ url: "".concat(BASE_URL, "/").concat(qrCodeId) }, callback);
			},
			close: function close(qrCodeId, callback) {
				if (!qrCodeId) return Promise.reject("qrCode Id is mandatroy");
				var url = "".concat(BASE_URL, "/").concat(qrCodeId, "/close");
				return api.post({ url }, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/fundAccount.js
var require_fundAccount = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	module.exports = function(api) {
		return {
			create: function create(params, callback) {
				return api.post({
					url: "/fund_accounts",
					data: _objectSpread({}, params)
				}, callback);
			},
			fetch: function fetch(customerId, callback) {
				if (!customerId) return Promise.reject("Customer Id is mandatroy");
				return api.get({ url: "/fund_accounts?customer_id=".concat(customerId) }, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/items.js
var require_items = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	var _excluded = ["amount", "currency"];
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function _objectWithoutProperties(e, t) {
		if (null == e) return {};
		var o, r, i = _objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(e);
			for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	var normalizeDate = require_razorpay_utils().normalizeDate;
	module.exports = function(api) {
		return {
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip, authorized = params.authorized, receipt = params.receipt;
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url: "/items",
					data: {
						from,
						to,
						count,
						skip,
						authorized,
						receipt
					}
				}, callback);
			},
			fetch: function fetch(itemId, callback) {
				if (!itemId) throw new Error("`item_id` is mandatory");
				return api.get({ url: "/items/".concat(itemId) }, callback);
			},
			create: function create() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var amount = params.amount, currency = params.currency, rest = _objectWithoutProperties(params, _excluded);
				currency = currency || "INR";
				if (!amount) throw new Error("`amount` is mandatory");
				var data = Object.assign(_objectSpread({
					currency,
					amount
				}, rest));
				return api.post({
					url: "/items",
					data
				}, callback);
			},
			edit: function edit(itemId) {
				var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				if (!itemId) throw new Error("`item_id` is mandatory");
				var url = "/items/".concat(itemId);
				return api.patch({
					url,
					data: params
				}, callback);
			},
			"delete": function _delete(itemId, callback) {
				if (!itemId) throw new Error("`item_id` is mandatory");
				return api["delete"]({ url: "/items/" + itemId }, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/cards.js
var require_cards = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(api) {
		return {
			fetch: function fetch(itemId, callback) {
				if (!itemId) throw new Error("`card_id` is mandatory");
				return api.get({ url: "/cards/".concat(itemId) }, callback);
			},
			requestCardReference: function requestCardReference(params, callback) {
				return api.post({
					url: "/cards/fingerprints",
					data: params
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/webhooks.js
var require_webhooks = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var normalizeDate = require_razorpay_utils().normalizeDate;
	module.exports = function(api) {
		var BASE_URL = "/accounts";
		return {
			create: function create(params, accountId, callback) {
				var payload = {
					url: "/webhooks",
					data: params
				};
				if (accountId) payload = {
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/webhooks"),
					data: params
				};
				return api.post(payload, callback);
			},
			edit: function edit(params, webhookId, accountId, callback) {
				if (accountId && webhookId) return api.patch({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/webhooks/").concat(webhookId),
					data: params
				}, callback);
				return api.put({
					url: "/webhooks/".concat(webhookId),
					data: params
				}, callback);
			},
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var accountId = arguments.length > 1 ? arguments[1] : void 0;
				var callback = arguments.length > 2 ? arguments[2] : void 0;
				var from = params.from, to = params.to, count = params.count, skip = params.skip;
				if (from) from = normalizeDate(from);
				if (to) to = normalizeDate(to);
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				var data = _objectSpread(_objectSpread({}, params), {}, {
					from,
					to,
					count,
					skip
				});
				if (accountId) return api.get({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/webhooks/"),
					data
				}, callback);
				return api.get({
					url: "/webhooks",
					data
				}, callback);
			},
			fetch: function fetch(webhookId, accountId, callback) {
				return api.get({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/webhooks/").concat(webhookId)
				}, callback);
			},
			"delete": function _delete(webhookId, accountId, callback) {
				return api["delete"]({
					version: "v2",
					url: "".concat(BASE_URL, "/").concat(accountId, "/webhooks/").concat(webhookId)
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/documents.js
var require_documents = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	var _excluded = ["file"];
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	function _objectWithoutProperties(e, t) {
		if (null == e) return {};
		var o, r, i = _objectWithoutPropertiesLoose(e, t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(e);
			for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
		}
		return i;
	}
	function _objectWithoutPropertiesLoose(r, e) {
		if (null == r) return {};
		var t = {};
		for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
			if (-1 !== e.indexOf(n)) continue;
			t[n] = r[n];
		}
		return t;
	}
	module.exports = function(api) {
		var BASE_URL = "/documents";
		return {
			create: function create(params, callback) {
				var file = params.file, rest = _objectWithoutProperties(params, _excluded);
				return api.postFormData({
					url: "".concat(BASE_URL),
					formData: _objectSpread({ file: file.value }, rest)
				}, callback);
			},
			fetch: function fetch(documentId, callback) {
				return api.get({ url: "".concat(BASE_URL, "/").concat(documentId) }, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/resources/disputes.js
var require_disputes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(api) {
		var BASE_URL = "/disputes";
		return {
			fetch: function fetch(disputeId, callback) {
				return api.get({ url: "".concat(BASE_URL, "/").concat(disputeId) }, callback);
			},
			all: function all() {
				var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
				var callback = arguments.length > 1 ? arguments[1] : void 0;
				var count = params.count, skip = params.skip;
				count = Number(count) || 10;
				skip = Number(skip) || 0;
				return api.get({
					url: "".concat(BASE_URL),
					data: {
						count,
						skip
					}
				}, callback);
			},
			accept: function accept(disputeId, callback) {
				return api.post({ url: "".concat(BASE_URL, "/").concat(disputeId, "/accept") }, callback);
			},
			contest: function contest(disputeId, param, callback) {
				return api.patch({
					url: "".concat(BASE_URL, "/").concat(disputeId, "/contest"),
					data: param
				}, callback);
			}
		};
	};
}));
//#endregion
//#region node_modules/razorpay/dist/razorpay.js
var require_razorpay = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function _classCallCheck(a, n) {
		if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
	}
	function _defineProperties(e, r) {
		for (var t = 0; t < r.length; t++) {
			var o = r[t];
			o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
		}
	}
	function _createClass(e, r, t) {
		return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var API = require_api();
	var pkg = (init_package(), __toCommonJS(package_exports).default);
	var _validateWebhookSignature = require_razorpay_utils().validateWebhookSignature;
	var Razorpay = /*#__PURE__*/ function() {
		function Razorpay() {
			var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
			_classCallCheck(this, Razorpay);
			var key_id = options.key_id, key_secret = options.key_secret, oauthToken = options.oauthToken, headers = options.headers;
			if (!key_id && !oauthToken) throw new Error("`key_id` or `oauthToken` is mandatory");
			this.key_id = key_id;
			this.key_secret = key_secret;
			this.oauthToken = oauthToken;
			this.api = new API({
				hostUrl: "https://api.razorpay.com",
				ua: "razorpay-node@".concat(Razorpay.VERSION),
				key_id,
				key_secret,
				headers,
				oauthToken
			});
			this.addResources();
		}
		return _createClass(Razorpay, [{
			key: "addResources",
			value: function addResources() {
				Object.assign(this, {
					accounts: require_accounts()(this.api),
					stakeholders: require_stakeholders()(this.api),
					payments: require_payments()(this.api),
					refunds: require_refunds()(this.api),
					orders: require_orders()(this.api),
					customers: require_customers()(this.api),
					transfers: require_transfers()(this.api),
					tokens: require_tokens()(this.api),
					virtualAccounts: require_virtualAccounts()(this.api),
					invoices: require_invoices()(this.api),
					iins: require_iins()(this.api),
					paymentLink: require_paymentLink()(this.api),
					plans: require_plans()(this.api),
					products: require_products()(this.api),
					subscriptions: require_subscriptions()(this.api),
					addons: require_addons()(this.api),
					settlements: require_settlements()(this.api),
					qrCode: require_qrCode()(this.api),
					fundAccount: require_fundAccount()(this.api),
					items: require_items()(this.api),
					cards: require_cards()(this.api),
					webhooks: require_webhooks()(this.api),
					documents: require_documents()(this.api),
					disputes: require_disputes()(this.api)
				});
			}
		}], [{
			key: "validateWebhookSignature",
			value: function validateWebhookSignature() {
				return _validateWebhookSignature.apply(void 0, arguments);
			}
		}]);
	}();
	_defineProperty(Razorpay, "VERSION", pkg.version);
	module.exports = Razorpay;
}));
//#endregion
export { require_razorpay as t };
