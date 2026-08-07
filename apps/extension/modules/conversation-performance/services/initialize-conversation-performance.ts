import { CONVERSATION_PERFORMANCE_SETTINGS_STORAGE_KEY } from "../constants/conversation-performance.constants";
import { getConversationPerformanceSettings } from "./conversation-performance-settings";
import { applyPerformanceOptimizations } from "./apply-performance-optimizations";

export function initializeConversationPerformance(): void {
  const applyStoredSettings = async () => {
    const settings = await getConversationPerformanceSettings();
    applyPerformanceOptimizations(settings);
  };

  void applyStoredSettings();

  browser.storage.onChanged.addListener((changes, areaName) => {
    if (
      areaName !== "local" ||
      !changes[CONVERSATION_PERFORMANCE_SETTINGS_STORAGE_KEY]
    )
      return;
    void applyStoredSettings();
  });
}
