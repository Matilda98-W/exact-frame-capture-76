import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Monitor, Lock, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Appearance preferences, responsible AI information and data privacy reminders for the AI Workplace Productivity Assistant.",
      },
      { property: "og:title", content: "Settings" },
      {
        property: "og:description",
        content: "Appearance, responsible AI guidance and privacy reminders.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [compact, setCompact] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = compact ? "15px" : "";
  }, [compact]);

  return (
    <AppShell
      title="Settings"
      description="Adjust how the workspace looks and review how this prototype handles your information."
    >
      <div className="space-y-6">
        <section className="surface-card p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <Monitor className="size-4.5 text-primary" /> Appearance
          </h2>
          <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-muted/60 p-4">
            <div>
              <Label htmlFor="compact" className="text-sm font-medium">
                Compact density
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Slightly smaller text and spacing, useful on laptops.
              </p>
            </div>
            <Switch id="compact" checked={compact} onCheckedChange={setCompact} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Preferences apply to this browser session only.
          </p>
        </section>

        <section className="surface-card p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <ShieldAlert className="size-4.5 text-primary" /> Responsible AI
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="font-semibold text-foreground">Responsible AI Notice:</strong>{" "}
            AI-generated content may contain errors or incomplete information. Always review and
            verify AI outputs before using them for important workplace decisions. Do not enter
            confidential, sensitive, or personal information.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>· Treat AI output as a first draft, never as a final decision.</li>
            <li>· Check names, dates and figures against the original source.</li>
            <li>· Tell colleagues when a document was drafted with AI support.</li>
          </ul>
        </section>

        <section className="surface-card p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <Lock className="size-4.5 text-primary" /> Data privacy reminder
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            There are no accounts and no database. Your notes, research and chat history exist only
            in this browser session and disappear when you close or refresh the tab.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              sessionStorage.clear();
              setCleared(true);
            }}
          >
            Clear session data
          </Button>
          {cleared && <p className="mt-2 text-xs text-primary">Session data cleared.</p>}
        </section>
      </div>
    </AppShell>
  );
}
