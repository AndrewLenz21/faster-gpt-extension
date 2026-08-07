import type {
  ConversationPerformanceMetrics,
  VirtualizationStatus,
} from "@/modules/current-page/types/current-page.types";

export type { ConversationPerformanceMetrics, VirtualizationStatus };

export interface ConversationPerformanceSettings {
  reduceAnimations: boolean;
  collapseDistantCodeBlocks: boolean;
  pauseOffscreenMedia: boolean;
  showDiagnostics: boolean;
}
