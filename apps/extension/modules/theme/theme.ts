export const EXTENSION_THEMES = ["dark", "atom", "sky", "ocean"] as const;

export type ExtensionTheme = (typeof EXTENSION_THEMES)[number];

const THEME_STORAGE_KEY = "faster-gpt-extension:theme";
const DEFAULT_THEME: ExtensionTheme = "dark";

function isExtensionTheme(value: string | null): value is ExtensionTheme {
  return EXTENSION_THEMES.some((theme) => theme === value);
}

export function getStoredTheme(): ExtensionTheme {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return isExtensionTheme(storedTheme) ? storedTheme : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme: ExtensionTheme): void {
  document.documentElement.classList.remove(...EXTENSION_THEMES);
  document.documentElement.classList.add(theme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The selected theme remains active for the current extension page.
  }
}
