import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  Search,
  MessageSquare,
  ArrowRight,
  Clock,
  ListChecks,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Summarise meeting notes, research any topic and chat with an AI workplace assistant — no sign-up required.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Three AI tools for busy teams: meeting summaries, research insights and a workplace chat assistant.",
      },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/meeting-notes" as const,
    icon: FileText,
    title: "Meeting Notes Summariser",
    copy: "Turn long notes into decisions, action items, owners and deadlines.",
  },
  {
    to: "/research" as const,
    icon: Search,
    title: "AI Research Assistant",
    copy: "Get summaries, insights and recommendations on any topic or article.",
  },
  {
    to: "/chatbot" as const,
    icon: MessageSquare,
    title: "AI Chatbot",
    copy: "Prioritise tasks, draft emails and build action plans in conversation.",
  },
];

const STATS = [
  { label: "Hours saved this month", value: "18.5", icon: Clock, hint: "example data" },
  { label: "Summaries generated", value: "42", icon: ListChecks, hint: "example data" },
  { label: "Action items captured", value: "137", icon: TrendingUp, hint: "example data" },
];

const ACTIVITY = [
  { title: "Q3 planning workshop summarised", tool: "Meeting Notes", time: "12 minutes ago" },
  { title: "Research: hybrid work policy benchmarks", tool: "Research Assistant", time: "1 hour ago" },
  { title: "Drafted client follow-up email", tool: "AI Chatbot", time: "Yesterday" },
  { title: "Sprint retro action items extracted", tool: "Meeting Notes", time: "2 days ago" },
];

function Dashboard() {
  return (
    <AppShell
      title="Welcome back"
      description="Use AI to cut through admin work: summarise meetings, research faster and get help planning your day. No account needed — just pick a tool and start."
    >
      <div className="space-y-10">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map(({ to, icon: Icon, title, copy }) => (
            <Link
              key={to}
              to={to}
              className="surface-card group flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-lift"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground">
                <Icon className="size-5" />
              </span>
              <h2 className="text-base font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{copy}</p>
              <span className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-medium text-primary">
                Open tool
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </section>

        <section>
          <h2 className="text-lg font-semibold">Productivity overview</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Example statistics to illustrate how usage would be tracked.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {STATS.map(({ label, value, icon: Icon, hint }) => (
              <div key={label} className="surface-card p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <Icon className="size-4 text-primary" />
                </div>
                <p className="mt-3 text-3xl font-bold">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Recent activity</h2>
          <ul className="surface-card mt-4 divide-y divide-border">
            {ACTIVITY.map((item) => (
              <li
                key={item.title}
                className="flex flex-wrap items-center justify-between gap-2 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.tool}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
