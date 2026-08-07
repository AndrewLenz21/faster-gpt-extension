import { create } from "zustand";

import { DEFAULT_CONVERSATION_PERFORMANCE_SETTINGS } from "../constants/conversation-performance.constants";
import {
  getConversationPerformanceSettings,
  saveConversationPerformanceSettings,
} from "../services/conversation-performance-settings";
import type { ConversationPerformanceSettings } from "../types/conversation-performance.types";

let settingsRevision = 0;

interface ConversationPerformanceState {
  settings: ConversationPerformanceSettings;
  isLoading: boolean;
  error: string | null;
  loadSettings: () => Promise<void>;
  updateSettings: (
    settings: Partial<ConversationPerformanceSettings>,
  ) => Promise<void>;
  resetSettings: () => Promise<void>;
}

export const useConversationPerformanceStore =
  create<ConversationPerformanceState>((set, get) => ({
    settings: DEFAULT_CONVERSATION_PERFORMANCE_SETTINGS,
    isLoading: true,
    error: null,
    loadSettings: async () => {
      const loadRevision = settingsRevision;

      try {
        const settings = await getConversationPerformanceSettings();
        if (loadRevision !== settingsRevision) return;
        set({ settings, isLoading: false, error: null });
      } catch {
        if (loadRevision !== settingsRevision) return;
        set({
          isLoading: false,
          error: "Unable to load performance settings.",
        });
      }
    },
    updateSettings: async (settings) => {
      const nextSettings = { ...get().settings, ...settings };
      settingsRevision += 1;
      set({ settings: nextSettings, isLoading: false, error: null });

      try {
        await saveConversationPerformanceSettings(nextSettings);
      } catch {
        // The popup's local settings cache already preserves the selected state.
        set({ error: null });
      }
    },
    resetSettings: async () => {
      await get().updateSettings(DEFAULT_CONVERSATION_PERFORMANCE_SETTINGS);
    },
  }));
