import { useEffect } from "react";

import { ThemePicker } from "@/modules/theme";
import { GaugeIcon } from "@/shared/icons";

import { useConversationPerformanceStore } from "../store/conversation-performance.store";
import { OptimizationToggle } from "./OptimizationToggle";

export function ConversationPerformanceSettingsPage() {
  const settings = useConversationPerformanceStore((state) => state.settings);
  const isLoading = useConversationPerformanceStore((state) => state.isLoading);
  const error = useConversationPerformanceStore((state) => state.error);
  const loadSettings = useConversationPerformanceStore(
    (state) => state.loadSettings,
  );
  const updateSettings = useConversationPerformanceStore(
    (state) => state.updateSettings,
  );
  const resetSettings = useConversationPerformanceStore(
    (state) => state.resetSettings,
  );
  const enabledOptimizations = [
    settings.reduceAnimations,
    settings.collapseDistantCodeBlocks,
    settings.pauseOffscreenMedia,
  ].filter(Boolean).length;

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  return (
    <main className="mx-auto min-h-screen max-w-2xl space-y-4 bg-extension-background p-6 text-extension-foreground">
      <header className="relative z-100 flex items-center gap-3 rounded-2xl border border-extension-border bg-extension-nav p-4 shadow-extension-soft">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-extension-accent/30 bg-extension-accent/10 text-extension-accent">
          <GaugeIcon className="size-5" />
        </div>
        <div>
          <h1 className="text-base font-semibold">Performance Settings</h1>
          <p className="mt-0.5 text-sm text-extension-muted">
            Diagnostics and optimization options
          </p>
        </div>
        <div className="ml-auto">
          <ThemePicker />
        </div>
      </header>

      <section className="rounded-2xl border border-extension-border bg-extension-surface/85 p-4 shadow-extension-soft">
        <h2 className="text-sm font-semibold">Conversation Performance</h2>
        <p className="mt-0.5 text-xs text-extension-muted">
          All optimizations are off by default and apply only on ChatGPT tabs.
        </p>

        <div className="mt-4 space-y-2">
          <OptimizationToggle
            label="Reduce animations"
            description="Minimize long transitions, decorative effects, and smooth scrolling in completed messages."
            checked={settings.reduceAnimations}
            disabled={isLoading}
            onCheckedChange={(reduceAnimations) =>
              void updateSettings({ reduceAnimations })
            }
          />
          <OptimizationToggle
            label="Collapse distant code blocks"
            description="Visually collapse assistant code blocks far outside the viewport. Expand them at any time."
            checked={settings.collapseDistantCodeBlocks}
            disabled={isLoading}
            onCheckedChange={(collapseDistantCodeBlocks) =>
              void updateSettings({ collapseDistantCodeBlocks })
            }
          />
          <OptimizationToggle
            label="Pause off-screen media"
            description="Pause compatible video and audio outside the viewport without removing it."
            checked={settings.pauseOffscreenMedia}
            disabled={isLoading}
            onCheckedChange={(pauseOffscreenMedia) =>
              void updateSettings({ pauseOffscreenMedia })
            }
          />
          <OptimizationToggle
            label="Show conversation diagnostics"
            description="Show mounted messages, DOM nodes, code blocks, images, and virtualization status in the popup."
            checked={settings.showDiagnostics}
            disabled={isLoading}
            onCheckedChange={(showDiagnostics) =>
              void updateSettings({ showDiagnostics })
            }
          />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-2xl border border-extension-border bg-extension-surface/85 p-4 shadow-extension-soft">
          <h2 className="text-sm font-semibold">Virtualization detection</h2>
          <p className="mt-1 text-xs leading-5 text-extension-muted">
            The popup compares the total known conversation turns with complete
            turns currently mounted by ChatGPT. Detection starts at 15 messages
            to avoid misleading short-chat results.
          </p>
        </article>
        <article className="rounded-2xl border border-extension-border bg-extension-surface/85 p-4 shadow-extension-soft">
          <h2 className="text-sm font-semibold">Optimization status</h2>
          <p className="mt-1 text-xs leading-5 text-extension-muted">
            {enabledOptimizations} of 3 content optimizations enabled.
            Diagnostics are{" "}
            {settings.showDiagnostics
              ? "visible in the popup."
              : "hidden from the popup."}
          </p>
        </article>
      </section>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <button
        type="button"
        className="rounded-xl border border-extension-border px-3 py-2 text-sm font-medium text-extension-muted transition hover:border-extension-accent/40 hover:text-extension-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-extension-ring"
        onClick={() => void resetSettings()}
      >
        Reset to defaults
      </button>
    </main>
  );
}
