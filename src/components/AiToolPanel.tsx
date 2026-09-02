import { useState } from "react";
import { Loader2, Copy, Eraser, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResponsibleAiNotice } from "@/components/ResponsibleAiNotice";

export function AiToolPanel({
  inputLabel,
  placeholder,
  actionLabel,
  outputLabel,
  sections,
  run,
}: {
  inputLabel: string;
  placeholder: string;
  actionLabel: string;
  outputLabel: string;
  sections: string[];
  run: (input: string) => Promise<string>;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (input.trim().length < 20) {
      toast.error("Please add a bit more detail first.");
      return;
    }
    setLoading(true);
    try {
      setOutput(await run(input.trim()));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Copy failed — please select the text manually.");
    }
  };

  return (
    <div className="space-y-6">
      <ResponsibleAiNotice />

      <section className="surface-card p-5 sm:p-6">
        <label htmlFor="ai-input" className="text-sm font-semibold">
          {inputLabel}
        </label>
        <Textarea
          id="ai-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="mt-3 min-h-40 resize-y sm:min-h-56 bg-background text-sm leading-relaxed"
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button onClick={handleGenerate} disabled={loading} size="lg" className="w-full sm:w-auto">
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {loading ? "Generating…" : actionLabel}
          </Button>
          <span className="text-xs text-muted-foreground">
            {input.trim() ? `${input.trim().split(/\s+/).length} words` : "Paste your content above"}
          </span>
        </div>
      </section>

      <section className="surface-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold">{outputLabel}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Editable output · {sections.join(" · ")}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!output}>
              <Copy className="size-4" /> Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setOutput("");
                setInput("");
              }}
              disabled={!output && !input}
            >
              <Eraser className="size-4" /> Clear
            </Button>
          </div>
        </div>

        {loading && !output ? (
          <div className="mt-4 space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-muted" />
            ))}
          </div>
        ) : (
          <Textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Your AI-generated result will appear here, ready to edit."
            className="mt-4 min-h-64 resize-y sm:min-h-72 bg-background font-mono text-[13px] leading-relaxed"
          />
        )}
      </section>
    </div>
  );
}
