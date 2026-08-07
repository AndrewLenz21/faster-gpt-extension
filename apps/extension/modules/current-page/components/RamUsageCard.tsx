import type { SystemMemoryUsage } from "../types/current-page.types";
import type {
  ActiveTabProcessMemory,
  PageDiagnostics,
  PageEstimate,
  MemoryMeasurementMode,
} from "../types/page-diagnostics.types";
import { formatBytes } from "../utils/format-bytes";

import { InfoIcon, MemoryIcon } from "@/shared/icons";

export interface RamUsageCardProps {
  diagnostics: PageDiagnostics | null;
  displayBytes: number | null;
  estimate: PageEstimate | null;
  isLoading: boolean;
  measurementMode: MemoryMeasurementMode;
  processMemory: ActiveTabProcessMemory | null;
  systemMemory: SystemMemoryUsage | null;
}

const MODE_CONFIG: Record<
  MemoryMeasurementMode,
  { badge: string; subtitle: string }
> = {
  "renderer-process": {
    badge: "Process",
    subtitle: "Renderer process private memory",
  },
  "experimental-estimate": {
    badge: "Estimated",
    subtitle: "",
  },
  "diagnostics-only": {
    badge: "Limited",
    subtitle: "Diagnostics available, memory estimate limited",
  },
};

function getTooltipContent(
  mode: MemoryMeasurementMode,
  estimate: PageEstimate | null,
  diagnostics: PageDiagnostics | null,
) {
  if (mode === "renderer-process") {
    return (
      <>
        <span className="block font-medium text-extension-foreground">
          Renderer process memory
        </span>
        <p className="mt-1">
          Memory reported for the tab's main renderer process. It may still
          differ from Vivaldi because a page can use additional processes such
          as cross-origin frames, workers, and GPU resources.
        </p>
      </>
    );
  }

  if (!estimate) {
    return "Page diagnostics are unavailable.";
  }

  return (
    <>
      <dl className="mt-1.5 space-y-1">
        <div className="flex justify-between gap-3">
          <dt>JS heap</dt>
          <dd className="font-medium text-extension-foreground">
            {estimate.javaScriptHeapBytes == null
              ? "Unavailable"
              : formatBytes(estimate.javaScriptHeapBytes)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Image media</dt>
          <dd className="font-medium text-extension-foreground">
            {formatBytes(estimate.imageContributionBytes)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>DOM estimate</dt>
          <dd className="font-medium text-extension-foreground">
            {formatBytes(estimate.domContributionBytes)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>HTML estimate</dt>
          <dd className="font-medium text-extension-foreground">
            {formatBytes(estimate.htmlContributionBytes)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Resources</dt>
          <dd className="font-medium text-extension-foreground">
            {diagnostics?.resources.hasDecodedBodyBytes
              ? formatBytes(estimate.resourceContributionBytes)
              : "Not exposed"}
          </dd>
        </div>
      </dl>
    </>
  );
}

function getInfoTooltip(mode: MemoryMeasurementMode): string | null {
  switch (mode) {
    case "renderer-process":
      return "Memory reported for the tab's main renderer process. It may still differ from Vivaldi because a page can use additional processes such as cross-origin frames, workers, and GPU resources.";
    case "experimental-estimate":
      return "Experimental estimate based on JavaScript heap, DOM complexity, serialized HTML, and loaded-resource data. Actual browser tab memory may be higher and may differ from Vivaldi's internal measurement.";
    default:
      return null;
  }
}

export function RamUsageCard({
  diagnostics,
  displayBytes,
  estimate,
  isLoading,
  measurementMode,
  processMemory: _processMemory,
  systemMemory,
}: RamUsageCardProps) {
  const config = MODE_CONFIG[measurementMode];

  const pageMemoryValue =
    displayBytes != null
      ? formatBytes(displayBytes)
      : isLoading
        ? "Checking..."
        : "\u2014";

  const systemMemoryUsedBytes = systemMemory
    ? Math.max(0, systemMemory.capacityBytes - systemMemory.availableBytes)
    : 0;
  const systemMemoryUsedPercent = systemMemory
    ? Math.min(
        100,
        Math.round((systemMemoryUsedBytes / systemMemory.capacityBytes) * 100),
      )
    : 0;
  const systemMemoryUsage = systemMemory
    ? `${formatBytes(systemMemoryUsedBytes)} used of ${formatBytes(systemMemory.capacityBytes)}`
    : "Unavailable";

  const infoTooltip = getInfoTooltip(measurementMode);
  const tooltipContent = getTooltipContent(
    measurementMode,
    estimate,
    diagnostics,
  );

  return (
    <article className="rounded-2xl border border-extension-border bg-extension-surface/85 p-3 shadow-extension-soft">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-extension-success/30 bg-extension-success/10 text-extension-success">
          <MemoryIcon className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="truncate text-sm font-semibold text-extension-foreground">
              Est. Tab Memory
            </h2>
            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              <span className="group relative inline-flex">
                <span
                  tabIndex={0}
                  role="img"
                  aria-label={`View ${config.subtitle} breakdown`}
                  className="inline-flex rounded-md border border-extension-success/30 bg-extension-success/10 px-1.5 py-0.5 text-[10px] font-medium text-extension-success transition-colors duration-200 hover:border-extension-success/50 hover:bg-extension-success/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-extension-ring"
                >
                  {config.badge}
                </span>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-lg border border-extension-border bg-extension-background px-2.5 py-2 text-[11px] leading-4 text-extension-muted opacity-0 shadow-extension-soft transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                  {tooltipContent}
                </span>
              </span>
              {infoTooltip ? (
                <span className="group relative inline-flex">
                  <span
                    tabIndex={0}
                    role="img"
                    aria-label={infoTooltip}
                    className="inline-flex text-extension-muted transition-colors duration-200 hover:text-extension-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-extension-ring"
                  >
                    <InfoIcon className="size-3.5" />
                  </span>
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-lg border border-extension-border bg-extension-background px-2.5 py-2 text-[11px] leading-4 text-extension-muted opacity-0 shadow-extension-soft transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
                  >
                    {infoTooltip}
                  </span>
                </span>
              ) : null}
            </div>
          </div>

          {config.subtitle ? (
            <p className="text-xs font-medium text-extension-muted">
              {config.subtitle}
            </p>
          ) : null}

          <p className="text-xl font-semibold tracking-[-0.03em] text-extension-success">
            {pageMemoryValue}
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mt-2 border-t border-extension-border"
      />
      <div className="mt-2">
        <div className="flex items-center justify-between gap-3 text-xs">
          <p className="truncate text-extension-muted">
            RAM: {systemMemoryUsage}
          </p>
          {systemMemory ? (
            <span className="shrink-0 text-xs font-medium text-extension-success">
              {systemMemoryUsedPercent}%
            </span>
          ) : null}
        </div>

        {systemMemory ? (
          <progress
            aria-label="System memory usage"
            aria-valuetext={`${systemMemoryUsedPercent}% of system memory is in use`}
            className="mt-1.5 h-2 w-full overflow-hidden rounded-full border-0 bg-extension-background accent-extension-success [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-extension-success [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-extension-background [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-extension-success"
            max={100}
            value={systemMemoryUsedPercent}
          />
        ) : null}
      </div>
    </article>
  );
}
