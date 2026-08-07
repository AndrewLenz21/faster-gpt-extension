import { create } from "zustand";

import { getActivePageStatistics } from "../services/get-active-page-statistics";
import { getActiveTabProcessMemory } from "../services/get-active-tab-process-memory";
import { getSystemMemoryUsage } from "../services/get-system-memory-usage";
import type {
  ActivePageStatistics,
  SystemMemoryUsage,
} from "../types/current-page.types";
import type {
  ActiveTabProcessMemory,
  MemoryMeasurementMode,
  PageEstimate,
} from "../types/page-diagnostics.types";
import { calculatePageEstimate } from "../utils/calculate-page-estimate";

function bytesToMB(bytes: number | null | undefined): string {
  if (bytes == null || bytes === 0) return "N/A";
  return `${(bytes / (1024 * 1024)).toFixed(1)}`;
}

function determineMeasurementMode(
  processMemory: ActiveTabProcessMemory | null,
  estimate: PageEstimate | null,
): MemoryMeasurementMode {
  if (
    processMemory?.supported &&
    processMemory.privateMemoryBytes != null &&
    processMemory.privateMemoryBytes > 0
  ) {
    return "renderer-process";
  }

  if (estimate?.javaScriptHeapBytes != null) {
    return "experimental-estimate";
  }

  return "diagnostics-only";
}

function determineDisplayBytes(
  processMemory: ActiveTabProcessMemory | null,
  estimate: PageEstimate | null,
): number | null {
  if (
    processMemory?.supported &&
    processMemory.privateMemoryBytes != null &&
    processMemory.privateMemoryBytes > 0
  ) {
    return processMemory.privateMemoryBytes;
  }

  return estimate?.estimatedBytes ?? null;
}

interface CurrentPageState {
  activePage: ActivePageStatistics | null;
  displayBytes: number | null;
  estimate: PageEstimate | null;
  isLoading: boolean;
  measurementMode: MemoryMeasurementMode;
  processMemory: ActiveTabProcessMemory | null;
  systemMemory: SystemMemoryUsage | null;
  refresh: () => Promise<void>;
}

export const useCurrentPageStore = create<CurrentPageState>((set) => ({
  activePage: null,
  displayBytes: null,
  estimate: null,
  isLoading: true,
  measurementMode: "diagnostics-only",
  processMemory: null,
  systemMemory: null,
  refresh: async () => {
    set({ isLoading: true });

    const [pageResult, systemMemoryResult, processResult] =
      await Promise.allSettled([
        getActivePageStatistics(),
        getSystemMemoryUsage(),
        getActiveTabProcessMemory(),
      ]);

    const activePage =
      pageResult.status === "fulfilled" ? pageResult.value : null;
    const systemMemory =
      systemMemoryResult.status === "fulfilled"
        ? systemMemoryResult.value
        : null;
    const processMemory =
      processResult.status === "fulfilled" ? processResult.value : null;

    const estimate = activePage
      ? calculatePageEstimate(activePage.diagnostics)
      : null;
    const measurementMode = determineMeasurementMode(processMemory, estimate);
    const displayBytes = determineDisplayBytes(processMemory, estimate);

    if (import.meta.env.DEV && activePage && estimate) {
      console.info("[current-page] experimental estimate", estimate);

      console.table({
        browser: navigator.userAgent,
        tabId: activePage.isChatGptPage ? "chatgpt" : "other",
        processId: processMemory?.processId,
        rendererPrivateMemoryMB: bytesToMB(processMemory?.privateMemoryBytes),
        rendererJsMemoryMB: bytesToMB(processMemory?.jsMemoryUsedBytes),
        performanceJsHeapMB: bytesToMB(
          activePage.diagnostics.javaScriptHeap?.usedBytes,
        ),
        heuristicEstimateMB: bytesToMB(estimate.estimatedBytes),
        measurementMode,
      });
    }

    set({
      activePage,
      displayBytes,
      estimate,
      isLoading: false,
      measurementMode,
      processMemory,
      systemMemory,
    });
  },
}));
