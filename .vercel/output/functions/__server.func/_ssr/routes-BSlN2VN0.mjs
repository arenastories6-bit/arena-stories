import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as supabase } from "./client-Bp6QJpwD.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createSsrRpc } from "./createSsrRpc-Dj1sUdwI.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { t as Button } from "./button-BRmaJFL-.mjs";
import { t as turf_hero_default } from "./turf-hero-DFRzc-JQ.mjs";
import { n as BrandLogo, r as useAuth } from "./use-auth-BgNSPXFN.mjs";
import { C as ArrowRight, _ as Clock3, a as Sun, b as ChevronLeft, c as Plus, d as Minus, f as Menu, i as Trophy, l as Phone, n as X, o as Sparkles, p as MapPin, r as Users, s as ShieldCheck, t as Zap, u as Moon, x as Check, y as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as createBooking } from "./turf.functions-gWESyUwD.mjs";
import { t as Route } from "./routes-Bh8QjndX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BSlN2VN0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var THEME_STORAGE_KEY = "theme";
function useTheme() {
	const [theme, setThemeState] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem(THEME_STORAGE_KEY);
			if (saved === "dark" || saved === "light") return saved;
		}
		return "light";
	});
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		if (theme === "dark") root.classList.add("dark");
		else root.classList.remove("dark");
	}, [theme]);
	(0, import_react.useEffect)(() => {
		const handleStorage = (event) => {
			if (event.key === "theme") {
				if (event.newValue === "dark" || event.newValue === "light") setThemeState(event.newValue);
			}
		};
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);
	const setTheme = (newTheme) => {
		setThemeState(newTheme);
		try {
			localStorage.setItem(THEME_STORAGE_KEY, newTheme);
			const root = document.documentElement;
			if (newTheme === "dark") root.classList.add("dark");
			else root.classList.remove("dark");
		} catch {}
	};
	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};
	return {
		theme,
		isDark: theme === "dark",
		setTheme,
		toggleTheme
	};
}
var razorpaySchema = objectType({
	amount: numberType().positive(),
	bookingId: stringType()
});
var initiateRazorpayPayment = createServerFn({ method: "POST" }).validator((input) => razorpaySchema.parse(input)).handler(createSsrRpc("08b027d4838b178d3209092d0b63c1f870f4b3e305239b3e5bd4fe97b45c2d13"));
var arena_aerial_default = "/assets/arena-aerial-B1jMc66T.jpg";
var match_action_default = "/assets/match-action-iGE6Q0Ht.jpg";
/**
* Arena Stories — Main Booking Page
*
* Single-page app for box cricket pitch booking.
* Layout:
*   1. Fixed header with logo + nav
*   2. Hero section with live booking console
*   3. Pitches / venue cards
*   4. Brand feature strip ("Every Detail. Match Ready.")
*   5. Full booking flow (stepper → slot grid → confirm)
*   6. Footer
*
* State is entirely local — no external state manager needed.
* Server data is fetched via TanStack Start server functions.
*/
var imageMap = {
	hero: turf_hero_default,
	aerial: arena_aerial_default,
	action: match_action_default
};
function ArenaStories() {
	const { venues, slots } = Route.useLoaderData();
	const router = useRouter();
	const submitBooking = useServerFn(createBooking);
	const submitRazorpayInit = useServerFn(initiateRazorpayPayment);
	const { isAuthenticated, user } = useAuth();
	const { isDark, toggleTheme } = useTheme();
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [venueId, setVenueId] = (0, import_react.useState)(venues[0]?.id ?? "");
	const venue = venues.find((item) => item.id === venueId) ?? venues[0];
	const venueSlots = (0, import_react.useMemo)(() => slots.filter((slot) => slot.venue_id === venueId), [slots, venueId]);
	const days = [...new Set(venueSlots.map((slot) => slot.slot_date))];
	const [dayIndex, setDayIndex] = (0, import_react.useState)(0);
	const activeDate = days[Math.min(dayIndex, Math.max(days.length - 1, 0))];
	const activeSlots = venueSlots.filter((slot) => slot.slot_date === activeDate);
	const [slotId, setSlotId] = (0, import_react.useState)("");
	const [teamSize, setTeamSize] = (0, import_react.useState)(10);
	const [playerName, setPlayerName] = (0, import_react.useState)("");
	const [booking, setBooking] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const chosenSlot = slots.find((slot) => slot.id === slotId);
	const step = booking ? 4 : slotId ? 3 : venueId ? 2 : 1;
	const jumpToBooking = () => document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
	const changeVenue = (id) => {
		setVenueId(id);
		setSlotId("");
		setDayIndex(0);
		setBooking(null);
	};
	/** Format a YYYY-MM-DD date string as "Mon, 23 Sep" */
	const formatDay = (value) => new Intl.DateTimeFormat("en-IN", {
		weekday: "short",
		day: "2-digit",
		month: "short"
	}).format(/* @__PURE__ */ new Date(`${value}T12:00:00`));
	/** Format a HH:mm:ss time string as "6:30 PM" */
	const formatTime = (value) => (/* @__PURE__ */ new Date(`2026-01-01T${value}`)).toLocaleTimeString("en-IN", {
		hour: "numeric",
		minute: "2-digit"
	});
	async function confirmBooking() {
		if (!venue || !slotId || playerName.trim().length < 2) {
			setError("Select a slot and enter the captain's name.");
			return;
		}
		setSubmitting(true);
		setError("");
		try {
			const razorpayInit = await submitRazorpayInit({ data: {
				amount: venue.price_per_hour,
				bookingId: `B-${Date.now()}`
			} });
			const result = await submitBooking({ data: {
				venueId: venue.id,
				slotId,
				playerName,
				teamSize,
				userId: user?.id
			} });
			const options = {
				key: razorpayInit.keyId,
				amount: razorpayInit.amount,
				currency: razorpayInit.currency,
				name: "Arena Stories",
				description: `Booking for ${venue.name}`,
				order_id: razorpayInit.orderId,
				handler: function(response) {
					localStorage.setItem("arena_last_booking", JSON.stringify({
						...result,
						razorpayOrderId: response.razorpay_order_id,
						razorpayPaymentId: response.razorpay_payment_id,
						razorpaySignature: response.razorpay_signature,
						userEmail: user?.email || ""
					}));
					router.navigate({ to: "/payment-callback" });
				},
				prefill: {
					name: playerName,
					email: user?.email || ""
				},
				theme: { color: "#eab308" }
			};
			const rzp = new window.Razorpay(options);
			rzp.on("payment.failed", function(response) {
				setError(`Payment Failed: ${response.error.description}`);
			});
			rzp.open();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Booking failed. Please try another slot.");
			setSubmitting(false);
		}
	}
	if (!venue) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: isDark ? "dark" : "",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "min-h-screen bg-background text-foreground transition-colors duration-300",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:h-20 lg:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#top",
							className: "group flex min-w-0 select-none items-center gap-3 font-sans text-xl font-extrabold tracking-tight text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
								size: 36,
								className: "transition-transform duration-300 group-hover:scale-105"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "brand-shimmer",
								children: "ARENA"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground/80",
								children: "//STORIES"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
									className: "hidden items-center gap-8 text-xs font-bold uppercase lg:flex",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "transition-colors hover:text-primary",
											href: "#pitches",
											children: "Pitches"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "transition-colors hover:text-primary",
											href: "#book",
											children: "Book Now"
										}),
										isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => router.navigate({ to: "/dashboard" }),
											className: "transition-colors hover:text-primary cursor-pointer font-bold uppercase",
											children: "My Match"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => supabase.auth.signOut(),
											className: "transition-colors hover:text-status-danger cursor-pointer",
											children: "Sign Out"
										})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => router.navigate({ to: "/auth" }),
											className: "transition-colors hover:text-primary cursor-pointer",
											children: "Sign In"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									"aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
									title: isDark ? "Switch to light mode" : "Switch to dark mode",
									onClick: toggleTheme,
									className: "transition-transform duration-200 active:scale-95",
									children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-5 w-5 text-amber-400 transition-all hover:rotate-45" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-5 w-5 text-foreground transition-all hover:-rotate-12" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "as-glow hidden sm:inline-flex",
									variant: "sport",
									onClick: jumpToBooking,
									children: ["Book a match ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									className: "lg:hidden",
									"aria-label": "Open menu",
									onClick: () => setMenuOpen((v) => !v),
									children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
								})
							]
						})]
					}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "grid border-t border-border bg-background p-5 text-xl font-bold uppercase lg:hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "border-b border-border py-3",
								href: "#pitches",
								onClick: () => setMenuOpen(false),
								children: "Pitches"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "border-b border-border py-3",
								href: "#book",
								onClick: () => setMenuOpen(false),
								children: "Book Now"
							}),
							isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "border-b border-border py-3 text-left uppercase font-bold",
								onClick: () => {
									router.navigate({ to: "/dashboard" });
									setMenuOpen(false);
								},
								children: "My Match"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "border-b border-border py-3 text-left hover:text-status-danger",
								onClick: () => {
									supabase.auth.signOut();
									setMenuOpen(false);
								},
								children: "Sign Out"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "border-b border-border py-3 text-left",
								onClick: () => {
									router.navigate({ to: "/auth" });
									setMenuOpen(false);
								},
								children: "Sign In"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold tracking-wider text-muted-foreground uppercase",
									children: "Appearance"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: toggleTheme,
									className: "flex items-center gap-2 text-xs",
									children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4 text-amber-400" }), " Switch to Light"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }), " Switch to Dark"] })
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					id: "top",
					className: "relative min-h-[860px] overflow-hidden bg-hero pt-16 text-hero-foreground lg:min-h-[min(940px,100svh)] lg:pt-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: turf_hero_default,
							alt: "Box cricket match under arena floodlights",
							width: 1920,
							height: 1088,
							className: "absolute inset-0 h-full w-full object-cover object-[64%_center]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-scrim absolute inset-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto grid min-h-[calc(860px-4rem)] w-full max-w-7xl content-end gap-12 px-5 pb-8 pt-28 lg:min-h-[calc(min(940px,100svh)-5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(390px,0.72fr)] lg:items-end lg:gap-16 lg:px-8 lg:pb-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "reveal-up min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-12 bg-primary" }), "Box Cricket · Bengaluru"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
											className: "max-w-3xl font-display text-6xl leading-[0.88] sm:text-7xl lg:text-[6.7rem]",
											children: [
												"Where cricket",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
													className: "font-normal text-primary",
													children: "writes its stories."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-7 max-w-lg text-sm leading-7 text-hero-muted sm:text-base",
											children: "Floodlit pitches built for the city's best players. Pick your slot, gather your squad, and let the match do the talking."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-9 flex items-center gap-8 border-l border-primary pl-5 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-hero-foreground",
												children: "03 private pitches"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-hero-muted",
												children: "Maintained weekly"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold text-hero-foreground",
												children: "4.9 match rating"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-hero-muted",
												children: "Across Bengaluru"
											})] })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
									"aria-label": "Live booking console",
									className: "reveal-up border border-hero-foreground/20 bg-hero/90 p-5 shadow-2xl backdrop-blur-md sm:p-7",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-5 border-b border-hero-foreground/15 pb-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] font-semibold uppercase text-primary",
												children: "Live availability"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-2 font-display text-4xl leading-none",
												children: "Book your match."
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex shrink-0 items-center gap-2 text-[10px] font-semibold uppercase text-hero-muted",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 animate-pulse rounded-full bg-primary" }), "Updated now"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "hero-venue",
												className: "text-[10px] font-semibold uppercase text-hero-muted",
												children: "Pitch"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												id: "hero-venue",
												value: venueId,
												onChange: (e) => changeVenue(e.target.value),
												className: "mt-2 h-12 w-full border border-hero-foreground/20 bg-hero px-3 text-sm font-semibold text-hero-foreground outline-hidden focus:border-primary",
												children: venues.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: item.id,
													children: item.name
												}, item.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 flex items-end justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] font-semibold uppercase text-hero-muted",
												children: "Match date"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-display text-2xl",
												children: activeDate ? formatDay(activeDate) : "No dates"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "icon",
													variant: "ghost",
													className: "border border-hero-foreground/20 text-hero-foreground hover:bg-hero-foreground hover:text-hero",
													"aria-label": "Previous match day",
													disabled: dayIndex === 0,
													onClick: () => {
														setDayIndex((v) => Math.max(0, v - 1));
														setSlotId("");
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "icon",
													variant: "ghost",
													className: "border border-hero-foreground/20 text-hero-foreground hover:bg-hero-foreground hover:text-hero",
													"aria-label": "Next match day",
													disabled: dayIndex >= days.length - 1,
													onClick: () => {
														setDayIndex((v) => Math.min(days.length - 1, v + 1));
														setSlotId("");
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-4 grid grid-cols-3 gap-2",
											children: activeSlots.filter((slot) => slot.status !== "booked").slice(0, 3).map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: slot.id === slotId ? "sport" : "ghost",
												className: `h-14 border text-xs ${slot.id === slotId ? "border-primary" : "border-hero-foreground/20 text-hero-foreground hover:border-primary hover:bg-transparent hover:text-primary"}`,
												onClick: () => {
													setSlotId(slot.id);
													setBooking(null);
												},
												children: formatTime(slot.start_time)
											}, slot.id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 flex items-end justify-between gap-4 border-t border-hero-foreground/15 pt-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] font-semibold uppercase text-hero-muted",
												children: "From"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-display text-3xl",
												children: [
													"₹",
													venue.price_per_hour,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-sans text-xs text-hero-muted",
														children: " / hour"
													})
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "lg",
												variant: "sport",
												onClick: jumpToBooking,
												children: [
													slotId ? "Continue" : "See all slots",
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
												]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 border-t border-hero-foreground/15 pt-5 text-[10px] font-semibold uppercase text-hero-muted lg:col-span-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-hero-foreground/15" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live booking · Instant confirmation" })
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "pitches",
					className: "px-5 py-20 lg:px-8 lg:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
							number: "01",
							kicker: "Pick your ground",
							title: "BUILT FOR THE GAME."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-5 lg:grid-cols-3",
							children: venues.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: `group overflow-hidden border transition-all duration-300 ${venueId === item.id ? "border-primary shadow-[var(--shadow-punch)]" : "border-border hover:border-foreground/40"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-[4/3] overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: imageMap[item.image_key] ?? "/assets/arena-aerial-B1jMc66T.jpg",
											alt: `${item.name} box cricket pitch`,
											width: 1408,
											height: 912,
											loading: "lazy",
											className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "absolute left-4 top-4 bg-surface-inverse px-3 py-1 text-xs font-bold uppercase text-surface-inverse-foreground",
											children: ["0", index + 1]
										}),
										item.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute right-4 top-4 bg-gold px-3 py-1 text-xs font-bold uppercase text-gold-foreground",
											children: "Most played"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "absolute bottom-4 left-4 font-display text-3xl text-white drop-shadow-md",
											children: item.name
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-card p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "flex items-start gap-2 text-sm text-muted-foreground leading-relaxed",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 shrink-0 text-primary mt-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.location })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "flex items-center gap-2 text-sm text-muted-foreground font-semibold",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 shrink-0 text-primary" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-primary",
														children: "+91 70935 93568"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-normal",
														children: "Muttala Ashok"
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-4 flex flex-wrap gap-2",
											children: item.amenities.map((amenity) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-sm bg-muted/60 px-2 py-1 text-xs font-bold uppercase text-muted-foreground border border-border/50",
												children: amenity
											}, amenity))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 flex items-end justify-between border-t border-border pt-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-display text-3xl",
												children: ["₹", item.price_per_hour]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: " / hour"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: venueId === item.id ? "sport" : "sportOutline",
												onClick: () => {
													changeVenue(item.id);
													document.querySelector("#book")?.scrollIntoView({ behavior: "smooth" });
												},
												children: venueId === item.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), " Selected"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Choose ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})] })
											})]
										})
									]
								})]
							}, item.id))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid min-h-[70vh] bg-surface-inverse text-surface-inverse-foreground lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-h-[430px] overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: match_action_default,
								alt: "Cricket batsman playing a powerful shot inside an Arena Stories pitch",
								width: 1408,
								height: 912,
								loading: "lazy",
								className: "absolute inset-0 h-full w-full object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(0deg,oklch(0.10_0.03_155/0.65),transparent_60%)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "absolute bottom-8 left-8 font-display text-7xl text-primary",
								children: "NO EXCUSES."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center p-8 lg:p-16",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase text-primary",
								children: "Match-ready as standard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-4 max-w-xl font-display text-6xl leading-[0.9] sm:text-8xl",
								children: [
									"EVERY DETAIL.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"GAME DAY READY."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 grid gap-px bg-surface-inverse-foreground/20 sm:grid-cols-2",
								children: [
									{
										icon: Sparkles,
										label: "Pro-grade pitch"
									},
									{
										icon: Zap,
										label: "Floodlit nights"
									},
									{
										icon: Clock3,
										label: "Open till midnight"
									},
									{
										icon: Trophy,
										label: "10-a-side matches"
									},
									{
										icon: Users,
										label: "Squad bookings"
									},
									{
										icon: ShieldCheck,
										label: "Safety checked"
									}
								].map(({ icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 bg-surface-inverse p-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold uppercase",
										children: label
									})]
								}, label))
							})
						] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					id: "book",
					className: "pitch-grid px-5 py-20 lg:px-8 lg:py-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-7xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
							number: "02",
							kicker: "Live booking",
							title: "LOCK IN YOUR MATCH."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.7fr)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mb-7 grid grid-cols-4 gap-1",
										children: [
											"Pitch",
											"Slot",
											"Details",
											"Confirmed"
										].map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1 transition-colors duration-300 ${index + 1 <= step ? "bg-primary" : "bg-muted"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: `mt-2 text-xs font-bold uppercase ${index + 1 <= step ? "text-foreground" : "text-muted-foreground"}`,
											children: [
												"0",
												index + 1,
												" ",
												label
											]
										})] }, label))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold uppercase text-muted-foreground",
										children: "Pitch"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: venueId,
										onChange: (e) => changeVenue(e.target.value),
										className: "mt-2 h-12 w-full border border-input bg-background px-4 font-bold outline-hidden focus:border-primary",
										children: venues.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: item.id,
											children: [
												item.name,
												" — ₹",
												item.price_per_hour,
												"/hr"
											]
										}, item.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold uppercase text-muted-foreground",
											children: "Select date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-4xl",
											children: activeDate ? formatDay(activeDate) : "No dates"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "sportOutline",
												"aria-label": "Previous day",
												disabled: dayIndex === 0,
												onClick: () => {
													setDayIndex((v) => Math.max(0, v - 1));
													setSlotId("");
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "sportOutline",
												"aria-label": "Next day",
												disabled: dayIndex >= days.length - 1,
												onClick: () => {
													setDayIndex((v) => Math.min(days.length - 1, v + 1));
													setSlotId("");
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4",
										children: activeSlots.map((slot) => {
											const booked = slot.status === "booked";
											const selected = slot.id === slotId;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: selected ? "sport" : "sportOutline",
												disabled: booked,
												className: "h-16 flex-col",
												onClick: () => {
													setSlotId(slot.id);
													setBooking(null);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(slot.start_time) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] normal-case opacity-65",
													children: booked ? "Booked" : `Pitch ${slot.court_label}`
												})]
											}, slot.id);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "player-name",
											className: "text-xs font-bold uppercase text-muted-foreground",
											children: "Captain's name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "player-name",
											value: playerName,
											onChange: (e) => setPlayerName(e.target.value),
											placeholder: "Your full name",
											className: "mt-2 h-12 w-full border border-input bg-background px-4 outline-hidden placeholder:text-muted-foreground focus:border-primary"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-bold uppercase text-muted-foreground",
											children: "Players"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex h-12 items-center border border-input",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "icon",
													variant: "ghost",
													"aria-label": "Remove player",
													onClick: () => setTeamSize((v) => Math.max(1, v - 1)),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-12 text-center font-bold",
													children: teamSize
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "icon",
													variant: "ghost",
													"aria-label": "Add player",
													onClick: () => setTeamSize((v) => Math.min(22, v + 1)),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
												})
											]
										})] })]
									}),
									error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										role: "alert",
										className: "mt-4 border-l-4 border-status-danger bg-muted p-3 text-sm font-semibold",
										children: error
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
								id: "status",
								className: "self-start border border-border bg-card p-6 lg:sticky lg:top-24",
								children: booking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative mx-auto grid h-16 w-16 place-items-center bg-primary text-primary-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-8 w-8" }), [
												"-top-2 -left-2",
												"-top-2 -right-2",
												"-bottom-2 -left-2",
												"-bottom-2 -right-2"
											].map((pos) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `confetti-dot absolute h-3 w-3 rounded-full bg-gold ${pos}` }, pos))]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-5 text-xs font-bold uppercase text-status-success",
											children: "Booking confirmed"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-2 font-display text-5xl",
											children: "YOU'RE IN."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-muted-foreground",
											children: "Show this code when you arrive at the pitch."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-6 border-y border-border py-5 font-display text-4xl tracking-widest text-primary",
											children: booking.booking_code
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-sm text-muted-foreground",
											children: ["Total paid: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["₹", booking.total_amount] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "mt-6 w-full",
											variant: "sportOutline",
											onClick: () => {
												setBooking(null);
												setSlotId("");
												setPlayerName("");
											},
											children: "Book another match"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold uppercase text-primary",
										children: "Booking summary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 font-display text-4xl",
										children: venue.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 space-y-4 border-y border-border py-5 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
												label: "Location",
												value: venue.location.split("•")[1]?.trim() ?? venue.location
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
												label: "Date",
												value: activeDate ? formatDay(activeDate) : "Select a date"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
												label: "Kick-off",
												value: chosenSlot ? `${formatTime(chosenSlot.start_time)} · ${chosenSlot.duration_minutes} min` : "Select a slot"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
												label: "Squad",
												value: `${teamSize} players`
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-end justify-between py-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground",
											children: "Total"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-5xl",
											children: ["₹", chosenSlot ? venue.price_per_hour * (chosenSlot.duration_minutes / 60) : venue.price_per_hour]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "lg",
										variant: "sport",
										className: "as-glow w-full",
										disabled: submitting || !slotId,
										onClick: () => {
											if (!isAuthenticated) router.navigate({ to: "/auth" });
											else confirmBooking();
										},
										children: [
											submitting ? "Securing slot…" : isAuthenticated ? "Confirm match" : "Sign In to Book",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), "Live availability secured at confirmation"]
									})
								] })
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "border-t border-border bg-surface-inverse px-5 py-10 text-surface-inverse-foreground lg:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-7xl gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
								size: 40,
								glow: false
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-4xl sm:text-5xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "brand-shimmer",
									children: "ARENA"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-surface-inverse-foreground/80",
									children: "//STORIES"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-surface-inverse-foreground/55",
							children: "Every match. A new story."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase text-surface-inverse-foreground/45",
							children: "© 2026 Arena Stories · Bengaluru"
						})]
					})
				})
			]
		})
	});
}
/** Section title with leading number, kicker, and large heading */
function SectionTitle({ number, kicker, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 border-b border-border pb-7 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-display text-5xl text-primary",
			children: ["/", number]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase text-muted-foreground",
				children: kicker
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-5xl leading-[0.9] sm:text-7xl lg:text-8xl",
				children: title
			})]
		})]
	});
}
/** A single label / value row in the booking summary panel */
function Summary({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "text-right",
			children: value
		})]
	});
}
//#endregion
export { ArenaStories as component };
