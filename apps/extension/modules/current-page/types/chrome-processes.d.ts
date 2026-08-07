declare namespace chrome.processes {
  interface ProcessTask {
    tabId?: number;
    title?: string;
  }

  interface Process {
    id: number;
    privateMemory?: number;
    jsMemoryAllocated?: number;
    jsMemoryUsed?: number;
    tasks?: ProcessTask[];
  }

  function getProcessIdForTab(tabId: number): Promise<number>;

  function getProcessInfo(
    processIds: number | number[],
    includeMemory: boolean,
  ): Promise<Record<number, Process>>;
}
