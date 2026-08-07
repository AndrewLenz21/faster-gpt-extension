import type { ConversationPerformanceMetrics } from "@/modules/current-page/types/current-page.types";
import { GaugeIcon } from "@/shared/icons";

import type { ConversationPerformanceSettings } from "../types/conversation-performance.types";
import { OptimizationToggle } from "./OptimizationToggle";

export interface ConversationPerformanceCardProps {
  metrics: ConversationPerformanceMetrics | null;
  isPageLoading: boolean;
  isSettingsLoading: boolean;
  settings: ConversationPerformanceSettings;
  onSettingChange: (settings: Partial<ConversationPerformanceSettings>) => void;
}

function getStatusLabel(
  metrics: ConversationPerformanceMetrics | null,
): string {
  if (!metrics || metrics.totalMessages == null) return "Unable to determine";
  if (metrics.virtualizationStatus === "detected")
    return "Virtualization active";
  if (metrics.virtualizationStatus === "not-detected")
    return "All messages rendered";
  return "Unable to determine";
}

function formatMetric(value: number | null): string {
  return value == null ? "Unavailable" : value.toLocaleString();
}

export function ConversationPerformanceCard({
  metrics,
  isPageLoading,
  isSettingsLoading,
  settings,
  onSettingChange,
}: ConversationPerformanceCardProps) {
  const statusLabel = getStatusLabel(metrics);
  const hasConversation = metrics?.totalMessages != null;

  return (
    <section
      aria-label="Conversation performance"
      className="rounded-2xl border border-extension-border bg-extension-surface/85 p-4 shadow-extension-soft"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-extension-accent/30 bg-extension-accent/10 text-extension-accent">
          <GaugeIcon className="size-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-extension-foreground">
            Conversation Performance
          </h2>
          <p className="mt-0.5 text-xs text-extension-muted">
            Optimize long and heavy chats
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-extension-border bg-extension-background/45 px-3 py-2.5">
        <p className="text-xs font-semibold text-extension-foreground">
          {isPageLoading ? "Checking conversation" : statusLabel}
        </p>
        <p className="mt-0.5 text-xs text-extension-muted">
          {isPageLoading
            ? "Inspecting mounted conversation content"
            : hasConversation
              ? `${metrics.totalMessages} total messages · ${metrics.mountedMessages ?? 0} currently rendered`
              : "Open ChatGPT to inspect a conversation"}
        </p>
      </div>

      {settings.showDiagnostics && hasConversation ? (
        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg border border-extension-border bg-extension-background/30 p-2">
            <dt className="text-extension-muted">DOM nodes</dt>
            <dd className="mt-0.5 font-semibold text-extension-foreground">
              {formatMetric(metrics.domNodeCount)}
            </dd>
          </div>
          <div className="rounded-lg border border-extension-border bg-extension-background/30 p-2">
            <dt className="text-extension-muted">Code blocks</dt>
            <dd className="mt-0.5 font-semibold text-extension-foreground">
              {formatMetric(metrics.codeBlockCount)}
            </dd>
          </div>
          <div className="rounded-lg border border-extension-border bg-extension-background/30 p-2">
            <dt className="text-extension-muted">Images</dt>
            <dd className="mt-0.5 font-semibold text-extension-foreground">
              {formatMetric(metrics.imageCount)}
            </dd>
          </div>
          <div className="rounded-lg border border-extension-border bg-extension-background/30 p-2">
            <dt className="text-extension-muted">Status</dt>
            <dd className="mt-0.5 font-semibold text-extension-foreground">
              {statusLabel}
            </dd>
          </div>
        </dl>
      ) : null}

      <div className="mt-3 space-y-2">
        <OptimizationToggle
          label="Reduce animations"
          description="Minimize transitions and visual effects"
          checked={settings.reduceAnimations}
          disabled={isSettingsLoading}
          onCheckedChange={(reduceAnimations) =>
            onSettingChange({ reduceAnimations })
          }
        />
        <OptimizationToggle
          label="Collapse distant code"
          description="Reduce rendering work in long answers"
          checked={settings.collapseDistantCodeBlocks}
          disabled={isSettingsLoading}
          onCheckedChange={(collapseDistantCodeBlocks) =>
            onSettingChange({ collapseDistantCodeBlocks })
          }
        />
      </div>
    </section>
  );
}
