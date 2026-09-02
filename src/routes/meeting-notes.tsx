import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/AppShell";
import { AiToolPanel } from "@/components/AiToolPanel";
import { analyzeMeetingNotes } from "@/lib/ai.functions";

export const Route = createFileRoute("/meeting-notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summariser | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Paste meeting notes and get an AI summary with key decisions, action items, responsible people and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summariser" },
      {
        property: "og:description",
        content: "Turn long meeting notes into decisions, action items and deadlines in seconds.",
      },
    ],
  }),
  component: MeetingNotesPage,
});

function MeetingNotesPage() {
  const analyze = useServerFn(analyzeMeetingNotes);

  return (
    <AppShell
      title="Meeting Notes Summariser"
      description="Paste your raw meeting notes and get a structured, editable summary of what was decided and who does what next."
    >
      <AiToolPanel
        inputLabel="Meeting notes"
        placeholder="Paste your meeting notes here — attendees, discussion points, decisions, dates…"
        actionLabel="Generate Summary"
        outputLabel="AI Summary"
        sections={[
          "Meeting Summary",
          "Key Decisions",
          "Action Items",
          "Responsible People",
          "Deadlines",
        ]}
        run={async (notes) => (await analyze({ data: { notes } })).content}
      />
    </AppShell>
  );
}
