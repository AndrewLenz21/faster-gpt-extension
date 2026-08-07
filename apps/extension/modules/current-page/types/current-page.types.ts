import type { PageDiagnostics } from "./page-diagnostics.types";

export interface SystemMemoryUsage {
  availableBytes: number;
  capacityBytes: number;
}

export type VirtualizationStatus = "detected" | "not-detected" | "unknown";

export interface ConversationPerformanceMetrics {
  totalMessages: number | null;
  mountedMessages: number | null;
  virtualizationStatus: VirtualizationStatus;
  domNodeCount: number | null;
  codeBlockCount: number | null;
  imageCount: number | null;
}

export interface ActivePageStatistics {
  diagnostics: PageDiagnostics;
  isChatGptPage: boolean;
  messageCount: number | null;
  conversationPerformance: ConversationPerformanceMetrics;
}
