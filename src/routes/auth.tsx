import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandLogo } from "@/components/brand-logo";
import { ArrowRight, Mail } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to home
  if (isAuthenticated) {
    router.navigate({ to: "/" });
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Account created! You can now log in.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
        router.navigate({ to: "/" });
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "An error occurred with Google login.");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-5">
      <div className="w-full max-w-md border border-border bg-card p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-10 relative z-10">
          <BrandLogo size={48} className="mx-auto mb-4" />
          <h1 className="font-display text-4xl mb-2 text-primary">ARENA STORIES</h1>
          <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">
            {isSignUp ? "Join the squad" : "Sign in to book"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="captain@team.com" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-input focus-visible:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 border-input focus-visible:ring-primary"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full as-glow h-12" variant="sport">
            {loading ? "Please wait..." : (isSignUp ? "Create Account" : "Sign In")}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>

        <div className="mt-8 mb-8 relative z-10">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase font-bold">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full h-12 relative z-10 border-border hover:bg-muted"
          onClick={handleGoogleLogin}
        >
          <Mail className="mr-2 h-4 w-4" />
          Google OAuth
        </Button>

        <div className="mt-8 text-center text-sm relative z-10">
          <span className="text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-2 text-primary font-bold hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </main>
  );
}
