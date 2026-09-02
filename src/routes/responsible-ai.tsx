import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Lock,
  Eye,
  ClipboardCheck,
  AlertTriangle,
  Users,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "How to use AI output safely and accountably: never enter confidential or sensitive workplace information, verify outputs, and stay in control of decisions.",
      },
      { property: "og:title", content: "Responsible AI" },
      {
        property: "og:description",
        content:
          "Guidance for using AI workplace tools safely — protect sensitive information and stay accountable for AI-assisted work.",
      },
    ],
  }),
  component: ResponsibleAiPage,
});

const PRINCIPLES = [
  {
    icon: Lock,
    title: "Never enter confidential or sensitive information",
    body: "Do not paste confidential, proprietary, sensitive, or personal information into any AI tool. This includes trade secrets, financial records, customer data, employee details, contracts, security credentials, and anything your workplace classifies as restricted. Assume anything you enter could be retained or seen by others.",
  },
  {
    icon: Eye,
    title: "Review every output before you use it",
    body: "AI-generated content may contain errors, outdated facts, or fabricated details. Treat each result as a first draft, not a final answer. Check names, dates, figures, and claims against a trusted source before acting on them or sharing them.",
  },
  {
    icon: ClipboardCheck,
    title: "Verify before you decide",
    body: "Never let AI make a consequential workplace decision on its own. Use it to support your judgement. For anything that affects hiring, performance, budgets, legal, or compliance, a person must review and approve the final decision.",
  },
  {
    icon: Users,
    title: "Be transparent about AI use",
    body: "Tell colleagues and stakeholders when a document, summary, or message was drafted with AI support. Transparency keeps collaboration accountable and lets others apply the same scrutiny you did.",
  },
];

const DO_NOT = [
  "Customer or employee personal data",
  "Trade secrets and proprietary IP",
  "Financial, payroll, or contract details",
  "Security credentials and access keys",
  "Anything marked confidential or restricted",
];

const DO = [
  "Anonymise examples before pasting them in",
  "Summarise public or non-sensitive material",
  "Treat output as a draft to verify",
  "Keep a human in charge of final decisions",
  "Disclose AI assistance to your team",
];

function ResponsibleAiPage() {
  return (
    <AppShell
      title="Responsible AI"
      description="Use AI workplace tools safely and accountably. The single most important rule: never enter confidential or sensitive workplace information. Review, verify, and stay in control of every decision."
    >
      <div className="space-y-8">
        <section className="surface-card p-5 sm:p-6">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 size-6 shrink-0 text-primary" />
            <div>
              <h2 className="text-lg font-semibold">Use AI safely and accountably</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                These tools help you work faster, but they do not replace your judgement. AI can
                sound confident while being wrong. To use AI output responsibly, follow the guidance
                below — starting with the rule that matters most.
              </p>
            </div>
          </div>
        </section>

        <section className="surface-card border-primary/40 bg-primary-soft p-5 sm:p-6">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 size-6 shrink-0 text-accent-foreground" />
            <div>
              <h2 className="text-lg font-semibold text-accent-foreground">
                Never enter confidential or sensitive information
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-accent-foreground">
                This is a session-only prototype with no database and no accounts, but the rule still
                applies to any AI tool you use: do not paste confidential, proprietary, sensitive, or
                personal information. Assume that anything you enter into an AI tool could be stored,
                reviewed, or used to train future models. When in doubt, leave it out.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Principles for responsible use</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="surface-card p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-3 text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="surface-card p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-base font-semibold">
              <AlertTriangle className="size-4.5 text-destructive" /> Do not enter
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {DO_NOT.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-destructive">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-base font-semibold">
              <ShieldCheck className="size-4.5 text-primary" /> Do instead
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {DO.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-primary">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="surface-card p-5 sm:p-6">
          <h2 className="text-base font-semibold">If something looks wrong</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            If an AI output seems off, do not use it. Discard it, verify against your source, or ask a
            colleague to review. Never forward AI-generated content as fact without checking it first.
            When an AI tool refuses or returns an error, stop and reconsider whether the input itself
            was appropriate to share.
          </p>
          <div className="mt-5">
            <Link
              to="/settings"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Review data and privacy settings
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
