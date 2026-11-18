import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wordmark } from "@/components/Wordmark";
import { useAuth } from "@/hooks/useAuth";
import heroRight from "@/assets/hero-right.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Barberly" },
      { name: "description", content: "Sign in or create a Barberly account as a customer or barber." },
      { property: "og:title", content: "Sign in — Barberly" },
      { property: "og:description", content: "Sign in or create your Barberly account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

type Role = "customer" | "shop";

function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<Role>("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/barbers" });
  }, [user, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } =
      mode === "signup"
        ? await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin, data: { role } },
          })
        : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/barbers" });
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex flex-col px-6 py-6 md:px-12">
        <Wordmark />
        <div className="m-auto w-full max-w-sm py-12 animate-fade-up">
          <h1 className="text-5xl font-medium">{mode === "signup" ? "Create account" : "Welcome back"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signup" ? "Join Barberly in a few seconds." : "Sign in to book your next look."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            {mode === "signup" && (
              <div role="tablist" aria-label="Account type" className="grid grid-cols-2 rounded-full bg-muted p-1">
                {([["customer", "Customer"], ["shop", "Barber"]] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={role === value}
                    onClick={() => setRole(value)}
                    className={`rounded-full py-2 text-sm font-medium transition-colors ${role === value ? "bg-primary text-primary-foreground shadow-card" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl bg-card" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-xl bg-card" />
            </div>
            <Button type="submit" variant="pill" size="lg" className="w-full" disabled={busy}>
              {busy ? "Please wait…" : mode === "signup" ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signup" ? "Already have an account?" : "New to Barberly?"}{" "}
            <button type="button" onClick={() => setMode(mode === "signup" ? "signin" : "signup")} className="font-medium text-foreground underline underline-offset-4">
              {mode === "signup" ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
      <div className="hidden bg-cream p-6 md:block">
        <img src={heroRight} alt="Styled wavy hair" className="h-full w-full rounded-[2rem] object-cover" />
      </div>
    </div>
  );
}
