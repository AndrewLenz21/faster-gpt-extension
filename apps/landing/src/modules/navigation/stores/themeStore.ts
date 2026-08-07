import { create } from "zustand";
import type { AppTheme } from "@shared/config/themes";
import { DEFAULT_THEME, APP_THEME_NAMES } from "@shared/config/themes";
import { STORAGE_KEYS } from "@core/storage";

const THEME_SET = new Set<string>(APP_THEME_NAMES);

function applyDomTheme(theme: AppTheme): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const t of APP_THEME_NAMES) root.classList.remove(t);
  root.classList.add(theme);
}

function readStoredTheme(): AppTheme {
  if (typeof localStorage === "undefined") return DEFAULT_THEME;
  const raw = localStorage.getItem(STORAGE_KEYS.theme);
  if (!raw) return DEFAULT_THEME;

  try {
    const data = JSON.parse(raw) as { state?: { theme?: unknown } };
    const theme = data.state?.theme;
    if (typeof theme === "string" && THEME_SET.has(theme)) return theme as AppTheme;
  } catch {
    if (THEME_SET.has(raw)) return raw as AppTheme;
  }

  return DEFAULT_THEME;
}

function writeStoredTheme(theme: AppTheme): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEYS.theme,
      JSON.stringify({ state: { theme }, version: 0 }),
    );
  } catch {
    /* noop */
  }
}

const initialTheme = readStoredTheme();
applyDomTheme(initialTheme);

type ThemeState = {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme,
  setTheme: (theme) => {
    applyDomTheme(theme);
    writeStoredTheme(theme);
    set({ theme });
  },
}));

if (typeof document !== "undefined") {
  useThemeStore.subscribe(() => {
    applyDomTheme(useThemeStore.getState().theme);
  });
}
