import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Sparkles, User } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { ResponsibleAiNotice } from "@/components/ResponsibleAiNotice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatWithAssistant } from "@/lib/ai.functions";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Workplace Assistant Chat | AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Chat with an AI workplace assistant to prioritise tasks, draft emails and build action plans.",
      },
      { property: "og:title", content: "AI Workplace Assistant Chat" },
      {
        property: "og:description",
        content: "Ask anything about tasks, emails, planning and project organisation.",
      },
    ],
  }),
  component: ChatbotPage,
});

type ChatMessage = { role: "user" | "assistant"; content: string };

const EXAMPLES = [
  "Help me prioritise my tasks.",
  "Draft a professional email.",
  "Create an action plan.",
  "Help me organise my project.",
];

function ChatbotPage() {
  const chat = useServerFn(chatWithAssistant);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await chat({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: res.content }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "The assistant could not reply.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      title="AI Workplace Assistant"
      description="Ask questions, draft communications and plan your work. Conversation history lasts for this session only."
    >
      <div className="space-y-6">
        <ResponsibleAiNotice />

        <section className="surface-card flex h-[60vh] min-h-100 flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
            {messages.length === 0 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Try one of these to get started:
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {EXAMPLES.map((example) => (
                    <button
                      key={example}
                      onClick={() => send(example)}
                      className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-left text-sm font-medium transition-colors hover:border-primary hover:bg-primary-soft"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-accent-foreground">
                    <Sparkles className="size-4" />
                  </span>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <User className="size-4" />
                  </span>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> The assistant is thinking…
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-border bg-card p-3 sm:p-4"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask the assistant anything about your work…"
              className="max-h-40 min-h-11 flex-1 resize-none bg-background text-sm"
            />
            <Button type="submit" size="lg" disabled={loading || !input.trim()}>
              <Send className="size-4" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </form>
        </section>
      </div>
    </AppShell>
  );
}
