import type { ConversationPerformanceSettings } from "../types/conversation-performance.types";

export const CONVERSATION_PERFORMANCE_SETTINGS_STORAGE_KEY =
  "conversationPerformanceSettings";
export const SAVE_CONVERSATION_PERFORMANCE_SETTINGS_MESSAGE =
  "conversation-performance/save-settings";

export const DEFAULT_CONVERSATION_PERFORMANCE_SETTINGS: ConversationPerformanceSettings =
  {
    reduceAnimations: false,
    collapseDistantCodeBlocks: false,
    pauseOffscreenMedia: false,
    showDiagnostics: false,
  };
