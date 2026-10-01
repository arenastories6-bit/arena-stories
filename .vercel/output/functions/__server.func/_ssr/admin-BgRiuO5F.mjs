import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as supabase } from "./client-Bp6QJpwD.mjs";
import { a as removeVenueAdmin, i as removeSlotAdmin, n as addSlotAdmin, o as updateVenueAdmin, r as addVenueAdmin, t as Route } from "./admin-DL2CUreQ.mjs";
import { n as cn, t as Button } from "./button-BRmaJFL-.mjs";
import { n as Label, t as Input } from "./label-CU1MI6D6.mjs";
import { t as turf_hero_default } from "./turf-hero-DFRzc-JQ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BgRiuO5F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
function AdminPanel() {
	const [isAuthenticated, setIsAuthenticated] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const { venues, bookings, slots } = Route.useLoaderData();
	const router = useRouter();
	const addVenueFn = useServerFn(addVenueAdmin);
	const removeVenueFn = useServerFn(removeVenueAdmin);
	const updateVenueFn = useServerFn(updateVenueAdmin);
	const addSlotFn = useServerFn(addSlotAdmin);
	const removeSlotFn = useServerFn(removeSlotAdmin);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [isSlotLoading, setIsSlotLoading] = (0, import_react.useState)(false);
	const [newSlot, setNewSlot] = (0, import_react.useState)({
		venue_id: "",
		slot_date: "",
		start_time: "",
		duration_minutes: 60,
		court_label: "",
		capacity: 1
	});
	const [newVenue, setNewVenue] = (0, import_react.useState)({
		name: "",
		location: "",
		description: "",
		price_per_hour: 0
	});
	(0, import_react.useEffect)(() => {
		if (sessionStorage.getItem("adminAuth") === "true") setIsAuthenticated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isAuthenticated) return;
		const channel = supabase.channel("admin-bookings").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "bookings"
		}, (payload) => {
			console.log("Realtime booking event:", payload);
			if (payload.eventType === "INSERT") toast.success("New booking received!");
			router.invalidate();
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [isAuthenticated, router]);
	const handleLogin = (e) => {
		e.preventDefault();
		if (email === "admin@admin.com" && password === "password") {
			setIsAuthenticated(true);
			sessionStorage.setItem("adminAuth", "true");
			toast.success("Logged in successfully");
		} else toast.error("Invalid credentials");
	};
	const handleLogout = () => {
		setIsAuthenticated(false);
		sessionStorage.removeItem("adminAuth");
		toast.success("Logged out");
	};
	const handleAddOrUpdateVenue = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (editingId) {
				const result = await updateVenueFn({ data: {
					id: editingId,
					...newVenue,
					price_per_hour: Number(newVenue.price_per_hour)
				} });
				if (result.success) {
					toast.success("Turf updated successfully");
					setNewVenue({
						name: "",
						location: "",
						description: "",
						price_per_hour: 0
					});
					setEditingId(null);
					router.invalidate();
				} else toast.error(result.error || "Failed to update Turf. Did you add SUPABASE_SERVICE_ROLE_KEY?");
			} else {
				const result = await addVenueFn({ data: {
					...newVenue,
					price_per_hour: Number(newVenue.price_per_hour)
				} });
				if (result.success) {
					toast.success("Turf added successfully");
					setNewVenue({
						name: "",
						location: "",
						description: "",
						price_per_hour: 0
					});
					router.invalidate();
				} else toast.error(result.error || "Failed to add Turf. Did you add SUPABASE_SERVICE_ROLE_KEY?");
			}
		} catch (err) {
			toast.error(err.message || "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};
	const handleEditClick = (venue) => {
		setEditingId(venue.id);
		setNewVenue({
			name: venue.name,
			location: venue.location,
			description: venue.description,
			price_per_hour: venue.price_per_hour
		});
	};
	const handleCancelEdit = () => {
		setEditingId(null);
		setNewVenue({
			name: "",
			location: "",
			description: "",
			price_per_hour: 0
		});
	};
	const handleAddSlot = async (e) => {
		e.preventDefault();
		setIsSlotLoading(true);
		try {
			const result = await addSlotFn({ data: {
				...newSlot,
				duration_minutes: Number(newSlot.duration_minutes),
				capacity: Number(newSlot.capacity)
			} });
			if (result.success) {
				toast.success("Slot added successfully");
				setNewSlot({
					...newSlot,
					court_label: "",
					start_time: ""
				});
				router.invalidate();
			} else toast.error(result.error || "Failed to add slot");
		} catch (err) {
			toast.error(err.message || "An error occurred");
		} finally {
			setIsSlotLoading(false);
		}
	};
	const handleRemoveSlot = async (id) => {
		if (!window.confirm("Are you sure you want to remove this slot?")) return;
		try {
			const result = await removeSlotFn({ data: { id } });
			if (result.success) {
				toast.success("Slot removed successfully");
				router.invalidate();
			} else toast.error(result.error || "Failed to remove slot");
		} catch (err) {
			toast.error(err.message || "An error occurred");
		}
	};
	const handleRemoveVenue = async (id) => {
		if (!window.confirm("Are you sure you want to remove this turf? This might affect existing bookings.")) return;
		try {
			const result = await removeVenueFn({ data: { id } });
			if (result.success) {
				toast.success("Turf removed successfully");
				if (editingId === id) handleCancelEdit();
				router.invalidate();
			} else toast.error(result.error || "Failed to remove Turf. Did you add SUPABASE_SERVICE_ROLE_KEY?");
		} catch (err) {
			toast.error(err.message || "An error occurred");
		}
	};
	if (!isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-hidden bg-hero flex items-center justify-center p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: turf_hero_default,
				alt: "Hero Background",
				className: "absolute inset-0 h-full w-full object-cover object-[64%_center]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-scrim absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 w-full max-w-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "bg-zinc-900/90 backdrop-blur-md border-zinc-800 text-white shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-2xl font-bold",
						children: "Admin Login"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
						className: "text-zinc-400",
						children: "Enter your credentials to access the admin panel."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleLogin,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "bg-zinc-800/80 border-zinc-700 text-white",
									placeholder: "admin@admin.com",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "password",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "bg-zinc-800/80 border-zinc-700 text-white",
									placeholder: "••••••••",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full bg-[#00D084] hover:bg-[#00D084]/90 text-black font-semibold",
								children: "Login"
							})
						]
					}) })]
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-screen overflow-hidden bg-hero text-white p-6 flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: turf_hero_default,
				alt: "Hero Background",
				className: "absolute inset-0 h-full w-full object-cover object-[64%_center]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-scrim absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col min-h-0 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold tracking-tight text-white drop-shadow-md",
						children: "Admin Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-zinc-300 mt-1 drop-shadow-md",
						children: "Manage turfs, bookings, and users."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: handleLogout,
						className: "border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800",
						children: "Logout"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "bookings",
					className: "w-full flex-1 flex flex-col min-h-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "bg-zinc-900 border border-zinc-800 mb-4 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "bookings",
									className: "data-[state=active]:bg-zinc-800 data-[state=active]:text-white",
									children: "Bookings & Users"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "turfs",
									className: "data-[state=active]:bg-zinc-800 data-[state=active]:text-white",
									children: "Turfs (Pitches)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "slots",
									className: "data-[state=active]:bg-zinc-800 data-[state=active]:text-white",
									children: "Slots"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "bookings",
							className: "space-y-4 mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "bg-zinc-900/90 backdrop-blur-md border-zinc-800 shadow-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-white",
									children: "Recent Bookings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									className: "text-zinc-400",
									children: "List of users who booked slots on the platform."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: bookings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-md border border-zinc-800 overflow-y-auto max-h-[600px]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
										className: "bg-zinc-950 sticky top-0 z-10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
											className: "border-zinc-800 hover:bg-zinc-950/50",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													className: "text-zinc-400",
													children: "Code"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													className: "text-zinc-400",
													children: "User / Player"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													className: "text-zinc-400",
													children: "Venue"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													className: "text-zinc-400",
													children: "Date & Time"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													className: "text-zinc-400",
													children: "Team Size"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
													className: "text-right text-zinc-400",
													children: "Amount"
												})
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: bookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
										className: "border-zinc-800 hover:bg-zinc-800/50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												className: "font-medium text-white",
												children: booking.booking_code
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												className: "text-zinc-300",
												children: booking.player_name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												className: "text-zinc-300",
												children: booking.venues?.name || "Unknown"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
												className: "text-zinc-300",
												children: [
													booking.slots?.slot_date,
													" ",
													booking.slots?.start_time
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
												className: "text-zinc-300",
												children: booking.team_size
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
												className: "text-right text-[#00D084]",
												children: ["₹", booking.amount]
											})
										]
									}, booking.id)) })] })
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-center py-8 text-zinc-500",
									children: "No bookings found."
								}) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "turfs",
							className: "flex-1 min-h-0 mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:col-span-1 h-full overflow-y-auto pr-2 pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: "bg-zinc-900/90 backdrop-blur-md border-zinc-800 shadow-xl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											className: "text-white",
											children: editingId ? "Update Turf" : "Add New Turf"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
											className: "text-zinc-400",
											children: editingId ? "Update the details of the selected pitch." : "Create a new pitch for users to select."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: handleAddOrUpdateVenue,
											className: "space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "name",
														className: "text-zinc-300",
														children: "Name"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "name",
														value: newVenue.name,
														onChange: (e) => setNewVenue({
															...newVenue,
															name: e.target.value
														}),
														className: "bg-zinc-800 border-zinc-700 text-white",
														placeholder: "e.g. Central Park Turf",
														required: true
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "location",
														className: "text-zinc-300",
														children: "Location"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "location",
														value: newVenue.location,
														onChange: (e) => setNewVenue({
															...newVenue,
															location: e.target.value
														}),
														className: "bg-zinc-800 border-zinc-700 text-white",
														placeholder: "e.g. Bengaluru • Jayanagar",
														required: true
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "price",
														className: "text-zinc-300",
														children: "Price per Hour (₹)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "price",
														type: "number",
														min: "0",
														value: newVenue.price_per_hour,
														onChange: (e) => setNewVenue({
															...newVenue,
															price_per_hour: e.target.value
														}),
														className: "bg-zinc-800 border-zinc-700 text-white",
														placeholder: "1500",
														required: true
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "desc",
														className: "text-zinc-300",
														children: "Description"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "desc",
														value: newVenue.description,
														onChange: (e) => setNewVenue({
															...newVenue,
															description: e.target.value
														}),
														className: "bg-zinc-800 border-zinc-700 text-white",
														placeholder: "A great place to play...",
														required: true
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-2 mt-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														type: "submit",
														disabled: isLoading,
														className: "flex-1 bg-[#00D084] hover:bg-[#00D084]/90 text-black font-semibold",
														children: isLoading ? "Saving..." : editingId ? "Update Turf" : "Add Turf"
													}), editingId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														type: "button",
														variant: "outline",
														disabled: isLoading,
														onClick: handleCancelEdit,
														className: "border-zinc-700 text-white hover:bg-zinc-800",
														children: "Cancel"
													})]
												})
											]
										}) })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:col-span-2 h-full min-h-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: "bg-zinc-900/90 backdrop-blur-md border-zinc-800 shadow-xl h-full flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
											className: "shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
												className: "text-white",
												children: "Existing Turfs"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
											className: "flex-1 min-h-0 overflow-hidden pb-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-md border border-zinc-800 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
													className: "bg-zinc-950 sticky top-0 z-10 shadow-md",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
														className: "border-zinc-800 hover:bg-zinc-950/50",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
																className: "text-zinc-400",
																children: "Name"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
																className: "text-zinc-400",
																children: "Location"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
																className: "text-right text-zinc-400",
																children: "Price / hr"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
																className: "text-right text-zinc-400",
																children: "Actions"
															})
														]
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: venues.map((venue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
													className: "border-zinc-800 hover:bg-zinc-800/50",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
															className: "font-medium text-white",
															children: venue.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
															className: "text-zinc-300",
															children: venue.location
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
															className: "text-right text-[#00D084]",
															children: ["₹", venue.price_per_hour]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
															className: "text-right space-x-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: "outline",
																size: "sm",
																onClick: () => handleEditClick(venue),
																className: "border-zinc-700 text-white hover:bg-zinc-800",
																children: "Edit"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: "destructive",
																size: "sm",
																onClick: () => handleRemoveVenue(venue.id),
																className: "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white",
																children: "Remove"
															})]
														})
													]
												}, venue.id)) })] })
											})
										})]
									})
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "slots",
							className: "flex-1 min-h-0 mt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:col-span-1 h-full overflow-y-auto pr-2 pb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: "bg-zinc-900/90 backdrop-blur-md border-zinc-800 shadow-xl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
											className: "text-white",
											children: "Add New Slot"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
											className: "text-zinc-400",
											children: "Create available slots for users to book."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: handleAddSlot,
											className: "space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "venue_id",
														className: "text-zinc-300",
														children: "Venue"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														id: "venue_id",
														value: newSlot.venue_id,
														onChange: (e) => setNewSlot({
															...newSlot,
															venue_id: e.target.value
														}),
														className: "flex h-9 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50",
														required: true,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "",
															disabled: true,
															children: "Select Turf"
														}), venues.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: v.id,
															children: v.name
														}, v.id))]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "slot_date",
														className: "text-zinc-300",
														children: "Date"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "slot_date",
														type: "date",
														value: newSlot.slot_date,
														onChange: (e) => setNewSlot({
															...newSlot,
															slot_date: e.target.value
														}),
														className: "bg-zinc-800 border-zinc-700 text-white",
														required: true
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "start_time",
														className: "text-zinc-300",
														children: "Start Time"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "start_time",
														type: "time",
														value: newSlot.start_time,
														onChange: (e) => setNewSlot({
															...newSlot,
															start_time: e.target.value
														}),
														className: "bg-zinc-800 border-zinc-700 text-white",
														required: true
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "duration",
														className: "text-zinc-300",
														children: "Duration (mins)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														id: "duration",
														value: newSlot.duration_minutes,
														onChange: (e) => setNewSlot({
															...newSlot,
															duration_minutes: Number(e.target.value)
														}),
														className: "flex h-9 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50",
														required: true,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: 60,
																children: "60"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: 90,
																children: "90"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: 120,
																children: "120"
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "court_label",
														className: "text-zinc-300",
														children: "Court Label"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "court_label",
														value: newSlot.court_label,
														onChange: (e) => setNewSlot({
															...newSlot,
															court_label: e.target.value
														}),
														className: "bg-zinc-800 border-zinc-700 text-white",
														placeholder: "e.g. Pitch A1",
														required: true
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "capacity",
														className: "text-zinc-300",
														children: "Capacity"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "capacity",
														type: "number",
														min: "1",
														value: newSlot.capacity,
														onChange: (e) => setNewSlot({
															...newSlot,
															capacity: Number(e.target.value)
														}),
														className: "bg-zinc-800 border-zinc-700 text-white",
														required: true
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex gap-2 mt-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														type: "submit",
														disabled: isSlotLoading,
														className: "flex-1 bg-[#00D084] hover:bg-[#00D084]/90 text-black font-semibold",
														children: isSlotLoading ? "Saving..." : "Add Slot"
													})
												})
											]
										}) })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:col-span-2 h-full min-h-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: "bg-zinc-900/90 backdrop-blur-md border-zinc-800 shadow-xl h-full flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
											className: "shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
												className: "text-white",
												children: "Existing Slots"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
											className: "flex-1 min-h-0 overflow-hidden pb-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-md border border-zinc-800 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, {
													className: "bg-zinc-950 sticky top-0 z-10 shadow-md",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
														className: "border-zinc-800 hover:bg-zinc-950/50",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
																className: "text-zinc-400",
																children: "Turf"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
																className: "text-zinc-400",
																children: "Date"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
																className: "text-zinc-400",
																children: "Time"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
																className: "text-zinc-400",
																children: "Court"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
																className: "text-right text-zinc-400",
																children: "Actions"
															})
														]
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: slots && slots.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
													className: "border-zinc-800 hover:bg-zinc-800/50",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
															className: "font-medium text-white",
															children: slot.venues?.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
															className: "text-zinc-300",
															children: slot.slot_date
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
															className: "text-zinc-300",
															children: [
																slot.start_time,
																" (",
																slot.duration_minutes,
																"m)"
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
															className: "text-zinc-300",
															children: slot.court_label
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
															className: "text-right space-x-2",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: "destructive",
																size: "sm",
																onClick: () => handleRemoveSlot(slot.id),
																className: "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white",
																children: "Remove"
															})
														})
													]
												}, slot.id)) })] })
											})
										})]
									})
								})]
							})
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { AdminPanel as component };
