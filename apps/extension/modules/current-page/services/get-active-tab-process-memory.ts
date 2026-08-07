import type { ActiveTabProcessMemory } from "../types/page-diagnostics.types";

function detectProcessesApi(): {
  available: boolean;
  errorCode?: string;
} {
  const api = chrome.processes;

  if (!api) {
    return { available: false, errorCode: "PROCESSES_API_UNAVAILABLE" };
  }

  if (typeof api.getProcessIdForTab !== "function") {
    return { available: false, errorCode: "PROCESSES_API_UNAVAILABLE" };
  }

  if (typeof api.getProcessInfo !== "function") {
    return { available: false, errorCode: "PROCESSES_API_UNAVAILABLE" };
  }

  return { available: true };
}

export async function getActiveTabProcessMemory(): Promise<ActiveTabProcessMemory> {
  const capability = detectProcessesApi();

  if (import.meta.env.DEV) {
    console.log("chrome.processes capability", {
      namespaceAvailable: Boolean(chrome.processes),
      getProcessIdForTabAvailable:
        typeof chrome.processes?.getProcessIdForTab === "function",
      getProcessInfoAvailable:
        typeof chrome.processes?.getProcessInfo === "function",
    });
  }

  if (!capability.available) {
    return {
      supported: false,
      processId: null,
      privateMemoryBytes: null,
      jsMemoryUsedBytes: null,
      jsMemoryAllocatedBytes: null,
      taskCount: null,
      errorCode: capability.errorCode,
    };
  }

  try {
    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (activeTab?.id == null) {
      return {
        supported: true,
        processId: null,
        privateMemoryBytes: null,
        jsMemoryUsedBytes: null,
        jsMemoryAllocatedBytes: null,
        taskCount: null,
        errorCode: "NO_ACTIVE_TAB",
      };
    }

    const processId = await chrome.processes.getProcessIdForTab(activeTab.id);

    if (processId == null || processId === 0) {
      return {
        supported: true,
        processId: null,
        privateMemoryBytes: null,
        jsMemoryUsedBytes: null,
        jsMemoryAllocatedBytes: null,
        taskCount: null,
        errorCode: "NO_PROCESS_ID",
      };
    }

    const processMap = await chrome.processes.getProcessInfo(processId, true);

    const process = processMap[processId];

    if (!process) {
      return {
        supported: true,
        processId,
        privateMemoryBytes: null,
        jsMemoryUsedBytes: null,
        jsMemoryAllocatedBytes: null,
        taskCount: null,
        errorCode: "PROCESS_INFO_MISSING",
      };
    }

    const privateMemoryBytes =
      process.privateMemory != null && process.privateMemory > 0
        ? process.privateMemory
        : null;

    return {
      supported: true,
      processId,
      privateMemoryBytes,
      jsMemoryUsedBytes: process.jsMemoryUsed ?? null,
      jsMemoryAllocatedBytes: process.jsMemoryAllocated ?? null,
      taskCount: process.tasks?.length ?? null,
    };
  } catch {
    return {
      supported: true,
      processId: null,
      privateMemoryBytes: null,
      jsMemoryUsedBytes: null,
      jsMemoryAllocatedBytes: null,
      taskCount: null,
      errorCode: "API_ERROR",
    };
  }
}
