import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

type Msg = { role: "system" | "user" | "assistant"; content: string };

async function complete(messages: Msg[]): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI is not configured.");

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: MODEL, messages }),
  });

  if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
  if (res.status === 402) throw new Error("AI credits exhausted. Please top up to continue.");
  if (!res.ok) throw new Error(`AI request failed (${res.status}). Please try again.`);

  const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const text = json.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("The AI returned an empty response.");
  return text;
}

const MEETING_SYSTEM = `You are a workplace meeting analyst. Analyse the meeting notes provided. Create a concise and accurate summary, identify important decisions, extract action items, identify responsible people when mentioned, and highlight all deadlines.
Base everything strictly on the user's notes — never invent names, decisions or dates. If a section has no information in the notes, write "Not mentioned in the notes."
Respond in GitHub-flavoured markdown using exactly these headings, in this order:
## Meeting Summary
## Key Decisions
## Action Items
## Responsible People
## Deadlines`;

const RESEARCH_SYSTEM = `You are a workplace research assistant. Analyse the provided topic or content. Generate an accurate summary, identify important insights, provide practical recommendations, and suggest useful questions for further research. Clearly distinguish facts from assumptions (label uncertain statements as "Assumption:").
Respond in GitHub-flavoured markdown using exactly these headings, in this order:
## Summary
## Key Insights
## Recommendations
## Questions to Explore`;

const CHAT_SYSTEM = `You are the AI Workplace Assistant, a pragmatic productivity coach for professionals. Answer the user's actual question directly, using the conversation context. Be concise, structured and practical: prefer short paragraphs, numbered steps or bullet lists. Use markdown. Never ask the user for confidential or personal data.`;

export const analyzeMeetingNotes = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ notes: z.string().min(20).max(20000) }).parse(data))
  .handler(async ({ data }) =>
    complete([
      { role: "system", content: MEETING_SYSTEM },
      { role: "user", content: `Meeting notes:\n\n${data.notes}` },
    ]).then((content) => ({ content })),
  );

export const generateResearchInsights = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ topic: z.string().min(3).max(20000) }).parse(data))
  .handler(async ({ data }) =>
    complete([
      { role: "system", content: RESEARCH_SYSTEM },
      { role: "user", content: `Topic or content to research:\n\n${data.topic}` },
    ]).then((content) => ({ content })),
  );

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        messages: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string().min(1).max(8000),
            }),
          )
          .min(1)
          .max(40),
      })
      .parse(data),
  )
  .handler(async ({ data }) =>
    complete([{ role: "system", content: CHAT_SYSTEM }, ...data.messages]).then((content) => ({
      content,
    })),
  );
