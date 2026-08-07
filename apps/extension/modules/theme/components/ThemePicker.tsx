import { useEffect, useRef, useState } from "react";

import { IconButton } from "@/shared/components/IconButton";
import { SettingsIcon } from "@/shared/icons";

import {
  applyTheme,
  EXTENSION_THEMES,
  getStoredTheme,
  type ExtensionTheme,
} from "../theme";

const THEME_LABELS: Record<ExtensionTheme, string> = {
  dark: "Dark",
  atom: "Atom",
  sky: "Sky",
  ocean: "Ocean",
};

const THEME_SWATCHES: Record<ExtensionTheme, string> = {
  dark: "bg-zinc-800",
  atom: "bg-violet-500",
  sky: "bg-sky-400",
  ocean: "bg-cyan-500",
};

export function ThemePicker() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ExtensionTheme>(getStoredTheme);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    const synchronizeTheme = () => {
      const storedTheme = getStoredTheme();
      applyTheme(storedTheme);
      setTheme(storedTheme);
    };

    document.addEventListener("mousedown", closeMenu);
    window.addEventListener("storage", synchronizeTheme);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
      window.removeEventListener("storage", synchronizeTheme);
    };
  }, []);

  const selectTheme = (nextTheme: ExtensionTheme) => {
    applyTheme(nextTheme);
    setTheme(nextTheme);
    setIsThemeMenuOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <IconButton
        aria-label="Choose extension theme"
        aria-expanded={isThemeMenuOpen}
        aria-haspopup="menu"
        onClick={() => setIsThemeMenuOpen((isOpen) => !isOpen)}
      >
        <SettingsIcon className="size-4" />
      </IconButton>

      {isThemeMenuOpen ? (
        <div
          role="menu"
          aria-label="Choose extension theme"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-110 w-40 rounded-xl border border-extension-border bg-extension-surface p-1.5 shadow-extension-soft"
        >
          <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-extension-muted">
            Theme
          </p>
          {EXTENSION_THEMES.map((themeOption) => {
            const isSelected = themeOption === theme;

            return (
              <button
                key={themeOption}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition ${isSelected ? "bg-extension-accent/15 font-semibold text-extension-accent" : "text-extension-foreground hover:bg-extension-background/60"}`}
                onClick={() => selectTheme(themeOption)}
              >
                <span
                  className={`size-2.5 rounded-full ${THEME_SWATCHES[themeOption]}`}
                />
                {THEME_LABELS[themeOption]}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
