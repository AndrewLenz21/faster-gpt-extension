export interface OptimizationToggleProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function OptimizationToggle({
  label,
  description,
  checked,
  disabled = false,
  onCheckedChange,
}: OptimizationToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className="flex w-full items-center gap-3 rounded-xl border border-extension-border bg-extension-background/45 px-3 py-2.5 text-left transition hover:border-extension-accent/40 enabled:active:scale-[0.99] disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-extension-ring"
      onClick={() => onCheckedChange(!checked)}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold text-extension-foreground">
          {label}
        </span>
        <span className="mt-0.5 block text-[11px] leading-4 text-extension-muted">
          {description}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? "bg-extension-accent" : "bg-extension-border"}`}
      >
        <span
          className={`absolute top-0.5 size-4 rounded-full bg-extension-background shadow-sm transition-transform ${checked ? "translate-x-4.5" : "translate-x-0.5"}`}
        />
      </span>
    </button>
  );
}
