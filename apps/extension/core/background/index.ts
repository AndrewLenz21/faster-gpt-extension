import {
  CONVERSATION_PERFORMANCE_SETTINGS_STORAGE_KEY,
  SAVE_CONVERSATION_PERFORMANCE_SETTINGS_MESSAGE,
} from "@/modules/conversation-performance/constants/conversation-performance.constants";
import type { ConversationPerformanceSettings } from "@/modules/conversation-performance/types/conversation-performance.types";

function isConversationPerformanceSettings(
  value: unknown,
): value is ConversationPerformanceSettings {
  if (!value || typeof value !== "object") return false;

  const settings = value as Partial<ConversationPerformanceSettings>;

  return (
    typeof settings.reduceAnimations === "boolean" &&
    typeof settings.collapseDistantCodeBlocks === "boolean" &&
    typeof settings.pauseOffscreenMedia === "boolean" &&
    typeof settings.showDiagnostics === "boolean"
  );
}

export function initializeBackground() {
  browser.runtime.onMessage.addListener((message: unknown) => {
    if (!message || typeof message !== "object") return;

    const request = message as {
      type?: string;
      settings?: unknown;
    };

    if (request.type === SAVE_CONVERSATION_PERFORMANCE_SETTINGS_MESSAGE) {
      if (!isConversationPerformanceSettings(request.settings)) {
        return Promise.reject(
          new Error("Invalid conversation performance settings."),
        );
      }

      return browser.storage.local.set({
        [CONVERSATION_PERFORMANCE_SETTINGS_STORAGE_KEY]: request.settings,
      });
    }
  });
}
