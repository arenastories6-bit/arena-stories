import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as Button } from "./button-BRmaJFL-.mjs";
import { t as turf_hero_default } from "./turf-hero-DFRzc-JQ.mjs";
import { n as BrandLogo, r as useAuth } from "./use-auth-BgNSPXFN.mjs";
import { S as Calendar, g as Clock, h as LoaderCircle, p as MapPin, w as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as getMyBookings } from "./turf.functions-gWESyUwD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-hyTTkUNp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const router = useRouter();
	const { user, isAuthenticated, isLoading } = useAuth();
	const fetchBookings = useServerFn(getMyBookings);
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (isLoading) return;
		if (!isAuthenticated || !user) {
			router.navigate({ to: "/auth" });
			return;
		}
		async function loadBookings() {
			try {
				const data = await fetchBookings({ data: { userId: user.id } });
				setBookings(data);
			} catch (err) {
				console.error("Failed to load bookings", err);
			} finally {
				setLoading(false);
			}
		}
		loadBookings();
	}, [
		isAuthenticated,
		isLoading,
		user,
		fetchBookings,
		router
	]);
	if (isLoading || loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background flex flex-col items-center justify-center text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-10 w-10 animate-spin text-primary mb-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-bold uppercase tracking-widest text-muted-foreground",
			children: "Loading your matches..."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border/60 bg-background/90 backdrop-blur-xl px-5 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { size: 32 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-sans text-xl font-extrabold tracking-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-shimmer",
						children: "ARENA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground/80",
						children: "//STORIES"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				onClick: () => router.navigate({ to: "/" }),
				className: "text-xs uppercase font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), " Back to Pitch"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 p-5 lg:p-8 max-w-5xl mx-auto w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl mb-2 text-primary",
					children: "MY MATCHES"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Your booking history and upcoming slots."
				})]
			}), bookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center border border-border bg-card p-12 mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl mb-4",
						children: "NO MATCHES YET."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mb-8",
						children: "It's time to gather your squad and write your first story."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "sport",
						onClick: () => router.navigate({ to: "/" }),
						className: "as-glow h-12 px-8",
						children: "Book a Pitch"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6",
				children: bookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-border bg-card p-6 flex flex-col sm:flex-row gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:w-1/3 aspect-video sm:aspect-square md:aspect-[4/3] bg-muted relative overflow-hidden hidden sm:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: turf_hero_default,
							alt: "Venue",
							className: "absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 text-[10px] font-bold uppercase",
							children: booking.status
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-3xl",
								children: booking.venues?.name || "Arena"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-2xl text-primary",
								children: ["₹", booking.amount]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 mt-4 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }),
										" ",
										booking.venues?.location
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-primary" }), new Date(booking.slots?.slot_date).toLocaleDateString("en-IN", {
										weekday: "short",
										day: "2-digit",
										month: "short",
										year: "numeric"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-primary" }),
										booking.slots?.start_time,
										" · ",
										booking.slots?.duration_minutes,
										" min (",
										booking.slots?.court_label,
										")"
									]
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 pt-4 border-t border-border flex justify-between items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase font-bold text-muted-foreground mb-1",
								children: "Booking Code"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tracking-widest",
								children: booking.booking_code
							})] })
						})]
					})]
				}, booking.id))
			})]
		})]
	});
}
//#endregion
export { DashboardPage as component };
