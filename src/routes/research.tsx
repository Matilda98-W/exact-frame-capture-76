import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/AppShell";
import { AiToolPanel } from "@/components/AiToolPanel";
import { generateResearchInsights } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Enter a topic or paste an article to get an AI summary, key insights, recommendations and questions to explore.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      {
        property: "og:description",
        content: "Summaries, insights, recommendations and open questions from any topic or text.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const research = useServerFn(generateResearchInsights);

  return (
    <AppShell
      title="AI Research Assistant"
      description="Enter a research topic or paste article content, and get contextual insights you can edit and reuse."
    >
      <AiToolPanel
        inputLabel="Research topic or content"
        placeholder="e.g. 'Hybrid work policies for a 40-person design team' — or paste an article to analyse…"
        actionLabel="Generate Research Insights"
        outputLabel="Research Insights"
        sections={["Summary", "Key Insights", "Recommendations", "Questions to Explore"]}
        run={async (topic) => (await research({ data: { topic } })).content}
      />
    </AppShell>
  );
}
