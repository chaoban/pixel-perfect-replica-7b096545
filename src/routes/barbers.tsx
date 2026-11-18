import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/Wordmark";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/barbers")({
  head: () => ({
    meta: [
      { title: "Barbers — Barberly" },
      { name: "description", content: "Your Barberly home: browse barbers or manage your barber profile." },
      { property: "og:title", content: "Barbers — Barberly" },
      { property: "og:description", content: "Your Barberly home." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BarbersPage,
});

function BarbersPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (!user) return <div className="min-h-screen bg-background" />;
  const isShop = user.user_metadata?.["role"] === "shop";

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-5 md:px-8">
        <Wordmark />
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-sm sm:inline">Hi {user.email}</span>
          {isShop && <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">barber</span>}
          <Button variant="pillOutline" size="sm" onClick={signOut} className="px-4">Sign Out</Button>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-24 text-center animate-fade-up">
        <div className="rounded-[2rem] bg-cream px-6 py-16">
          <h1 className="text-4xl font-medium md:text-5xl">
            {isShop ? "理髮師後台即將上線" : "附近的理髮師即將上線"}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {isShop
              ? "下一個里程碑會加上個人檔案、服務項目與排班管理。"
              : "下一個里程碑會加上瀏覽與預約功能。"}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            {isShop
              ? "Your barber dashboard is coming soon — profile, services & schedule arrive in the next milestone."
              : "Barbers near you are coming soon — browse & booking arrive in the next milestone."}
          </p>
        </div>
      </main>
    </div>
  );
}
