import { ShieldAlert } from "lucide-react";

export function ResponsibleAiNotice() {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-primary-soft p-4 text-sm text-accent-foreground">
      <ShieldAlert className="mt-0.5 size-5 shrink-0" />
      <p>
        <strong className="font-semibold">Responsible AI Notice:</strong> AI-generated content may
        contain errors or incomplete information. Always review and verify AI outputs before using
        them for important workplace decisions. Do not enter confidential, sensitive, or personal
        information.
      </p>
    </div>
  );
}
