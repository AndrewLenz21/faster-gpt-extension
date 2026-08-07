import { useCallback } from "react";
import type { AppTheme } from "@shared/config/themes";
import { useThemeStore } from "../stores/themeStore";

export function useAppTheme() {
  const theme = useThemeStore((s) => s.theme);
  const setThemeStore = useThemeStore((s) => s.setTheme);

  const setTheme = useCallback(
    (newTheme: AppTheme) => {
      setThemeStore(newTheme);
    },
    [setThemeStore],
  );

  return { theme, setTheme, mounted: true };
}
