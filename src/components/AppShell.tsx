import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  Search,
  MessageSquare,
  Settings,
  ShieldCheck,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/meeting-notes", label: "Meeting Notes Summariser", icon: FileText },
  { to: "/research", label: "AI Research Assistant", icon: Search },
  { to: "/chatbot", label: "AI Chatbot", icon: MessageSquare },
  { to: "/responsible-ai", label: "Responsible AI", icon: ShieldCheck },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="size-4.5 shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Sparkles className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-sm font-bold">AI Workplace</span>
        <span className="block text-xs text-muted-foreground">Productivity Assistant</span>
      </span>
    </div>
  );
}

export function AppShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden w-72 shrink-0 border-r border-sidebar-border bg-sidebar p-5 lg:flex lg:flex-col lg:gap-8">
        <Brand />
        <NavLinks />
        <div className="mt-auto flex flex-col gap-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Session-only prototype. Nothing you enter is stored after you close the tab.
          </p>
          <p className="rounded-lg border border-warning/30 bg-warning-soft px-3 py-2 text-xs font-medium leading-relaxed text-warning-foreground">
            Never enter confidential or sensitive workplace information.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur lg:hidden">
          <button
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground"
          >
            <Menu className="size-5" />
          </button>
          <Brand />
        </header>

        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-foreground/40"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <div className="absolute inset-y-0 left-0 flex w-72 flex-col gap-8 bg-sidebar p-5 shadow-lift">
              <div className="flex items-center justify-between">
                <Brand />
                <button
                  aria-label="Close navigation"
                  onClick={() => setOpen(false)}
                  className="flex size-9 items-center justify-center rounded-lg border border-border"
                >
                  <X className="size-4" />
                </button>
              </div>
              <NavLinks onNavigate={() => setOpen(false)} />
              <p className="mt-auto rounded-lg border border-warning/30 bg-warning-soft px-3 py-2 text-xs font-medium leading-relaxed text-warning-foreground">
                Never enter confidential or sensitive workplace information.
              </p>
            </div>
          </div>
        )}

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          <header className="mb-8">
            <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
            {description && (
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {description}
              </p>
            )}
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
