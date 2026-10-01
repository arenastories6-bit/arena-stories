import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-Bp6QJpwD.mjs";
import { t as Button } from "./button-BRmaJFL-.mjs";
import { n as Label, t as Input } from "./label-CU1MI6D6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as BrandLogo, r as useAuth } from "./use-auth-BgNSPXFN.mjs";
import { C as ArrowRight, m as Mail } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CwbcWU5M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const [isSignUp, setIsSignUp] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	if (isAuthenticated) router.navigate({ to: "/" });
	const handleAuth = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (isSignUp) {
				const { error } = await supabase.auth.signUp({
					email,
					password
				});
				if (error) throw error;
				toast.success("Account created! You can now log in.");
				setIsSignUp(false);
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				toast.success("Welcome back!");
				router.navigate({ to: "/" });
			}
		} catch (error) {
			toast.error(error.message || "An error occurred during authentication.");
		} finally {
			setLoading(false);
		}
	};
	const handleGoogleLogin = async () => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: { redirectTo: `${window.location.origin}/` }
			});
			if (error) throw error;
		} catch (error) {
			toast.error(error.message || "An error occurred with Google login.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background text-foreground flex items-center justify-center p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md border border-border bg-card p-8 shadow-2xl relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -right-24 h-48 w-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-10 relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
							size: 48,
							className: "mx-auto mb-4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl mb-2 text-primary",
							children: "ARENA STORIES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm uppercase font-bold tracking-widest",
							children: isSignUp ? "Join the squad" : "Sign in to book"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleAuth,
					className: "space-y-6 relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								placeholder: "captain@team.com",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "h-12 border-input focus-visible:ring-primary"
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
								placeholder: "••••••••",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "h-12 border-input focus-visible:ring-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: loading,
							className: "w-full as-glow h-12",
							variant: "sport",
							children: [loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In", !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 mb-8 relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full border-t border-border" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative flex justify-center text-xs uppercase font-bold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-card px-2 text-muted-foreground",
							children: "Or continue with"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					className: "w-full h-12 relative z-10 border-border hover:bg-muted",
					onClick: handleGoogleLogin,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mr-2 h-4 w-4" }), "Google OAuth"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 text-center text-sm relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: isSignUp ? "Already have an account?" : "Don't have an account?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIsSignUp(!isSignUp),
						className: "ml-2 text-primary font-bold hover:underline",
						children: isSignUp ? "Sign In" : "Sign Up"
					})]
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
