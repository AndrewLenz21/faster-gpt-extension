import { ChevronRightIcon, SlidersIcon } from "@/shared/icons";

export function PerformanceSettingsCard() {
  return (
    <button
      type="button"
      aria-label="Open performance settings"
      className="group flex w-full items-center gap-3 rounded-2xl border border-extension-border bg-extension-surface/85 p-4 text-left shadow-extension-soft transition duration-200 hover:border-extension-accent/40 hover:bg-extension-accent/5 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-extension-ring"
      onClick={() => void browser.runtime.openOptionsPage()}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-extension-accent/30 bg-extension-accent/10 text-extension-accent">
        <SlidersIcon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-semibold text-extension-foreground">
          Performance Settings
        </h2>
        <p className="mt-0.5 truncate text-xs text-extension-muted">
          Diagnostics and optimization options
        </p>
      </div>
      <ChevronRightIcon className="size-5 shrink-0 text-extension-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-extension-foreground" />
    </button>
  );
}
