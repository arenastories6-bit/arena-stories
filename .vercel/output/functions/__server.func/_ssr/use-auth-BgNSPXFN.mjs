import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-Bp6QJpwD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-BgNSPXFN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BrandLogo({ size = 36, glow = true, className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 512 512",
		width: size,
		height: size,
		className: `shrink-0 select-none ${glow ? "filter drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]" : ""} ${className}`,
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "blGold",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#fef08a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "50%",
							stopColor: "#f59e0b"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#b45309"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "blEmerald",
					x1: "100%",
					y1: "100%",
					x2: "0%",
					y2: "0%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#047857"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "50%",
							stopColor: "#10b981"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#6ee7b7"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "blDarkEmerald",
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "100%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "#022c22"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "#064e3b"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
					id: "blGlow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
						stdDeviation: "8",
						result: "coloredBlur"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "coloredBlur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "256,24 464,144 464,368 256,488 48,368 48,144",
				fill: "url(#blDarkEmerald)",
				stroke: "url(#blEmerald)",
				strokeWidth: "12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M256 80 L120 380 L180 380 L256 190 L332 380 L392 380 Z",
				fill: "url(#blGold)",
				filter: "url(#blGlow)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M180 280 L332 280",
				stroke: "url(#blEmerald)",
				strokeWidth: "32",
				strokeLinecap: "round",
				filter: "url(#blGlow)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "256,50 266,75 296,85 266,95 256,120 246,95 216,85 246,75",
				fill: "#ffffff",
				filter: "url(#blGlow)"
			})
		]
	});
}
var AuthContext = (0, import_react.createContext)({
	user: null,
	session: null,
	isLoading: true,
	isAuthenticated: false
});
var AuthProvider = ({ children }) => {
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const getSession = async () => {
			const { data: { session } } = await supabase.auth.getSession();
			setSession(session);
			setUser(session?.user || null);
			setIsLoading(false);
		};
		getSession();
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user || null);
			setIsLoading(false);
		});
		return () => {
			subscription.unsubscribe();
		};
	}, []);
	const value = {
		user,
		session,
		isLoading,
		isAuthenticated: !!user
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
};
var useAuth = () => {
	const context = (0, import_react.useContext)(AuthContext);
	if (context === void 0) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
//#endregion
export { BrandLogo as n, useAuth as r, AuthProvider as t };
