import {
  CONVERSATION_PERFORMANCE_SETTINGS_STORAGE_KEY,
  DEFAULT_CONVERSATION_PERFORMANCE_SETTINGS,
  SAVE_CONVERSATION_PERFORMANCE_SETTINGS_MESSAGE,
} from "../constants/conversation-performance.constants";
import type { ConversationPerformanceSettings } from "../types/conversation-performance.types";

const LOCAL_SETTINGS_KEY =
  "faster-gpt-extension:conversation-performance-settings";

function canUseExtensionLocalStorage(): boolean {
  return (
    typeof localStorage !== "undefined" &&
    (location.protocol === "chrome-extension:" ||
      location.protocol === "moz-extension:")
  );
}

function normalizeSettings(value: unknown): ConversationPerformanceSettings {
  if (!value || typeof value !== "object") {
    return DEFAULT_CONVERSATION_PERFORMANCE_SETTINGS;
  }

  const settings = value as Partial<ConversationPerformanceSettings>;

  return {
    reduceAnimations: settings.reduceAnimations === true,
    collapseDistantCodeBlocks: settings.collapseDistantCodeBlocks === true,
    pauseOffscreenMedia: settings.pauseOffscreenMedia === true,
    showDiagnostics: settings.showDiagnostics === true,
  };
}

function getCachedSettings(): ConversationPerformanceSettings | null {
  if (!canUseExtensionLocalStorage()) return null;

  try {
    const value = localStorage.getItem(LOCAL_SETTINGS_KEY);
    return value ? normalizeSettings(JSON.parse(value)) : null;
  } catch {
    return null;
  }
}

function cacheSettings(settings: ConversationPerformanceSettings): boolean {
  if (!canUseExtensionLocalStorage()) return false;

  try {
    localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch {
    // Browser storage remains the fallback when extension localStorage is unavailable.
    return false;
  }
}

async function requireOneSuccessfulWrite(
  writes: PromiseSettledResult<unknown>[],
  localCacheSaved: boolean,
): Promise<void> {
  if (localCacheSaved || writes.some((write) => write.status === "fulfilled"))
    return;

  const failedWrite = writes.find(
    (write): write is PromiseRejectedResult => write.status === "rejected",
  );
  throw (
    failedWrite?.reason ?? new Error("Unable to save performance settings.")
  );
}

export async function getConversationPerformanceSettings(): Promise<ConversationPerformanceSettings> {
  const cachedSettings = getCachedSettings();
  if (cachedSettings) return cachedSettings;

  const stored = await browser.storage.local.get(
    CONVERSATION_PERFORMANCE_SETTINGS_STORAGE_KEY,
  );

  const settings = normalizeSettings(
    stored[CONVERSATION_PERFORMANCE_SETTINGS_STORAGE_KEY],
  );
  cacheSettings(settings);

  return settings;
}

export async function saveConversationPerformanceSettings(
  settings: ConversationPerformanceSettings,
): Promise<void> {
  const localCacheSaved = cacheSettings(settings);

  await requireOneSuccessfulWrite(
    await Promise.allSettled([
      browser.storage.local.set({
        [CONVERSATION_PERFORMANCE_SETTINGS_STORAGE_KEY]: settings,
      }),
      browser.runtime.sendMessage({
        type: SAVE_CONVERSATION_PERFORMANCE_SETTINGS_MESSAGE,
        settings,
      }),
    ]),
    localCacheSaved,
  );
}
