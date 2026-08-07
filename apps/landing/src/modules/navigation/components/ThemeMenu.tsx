import { useEffect, useRef, useState } from "react";
import { Palette } from "lucide-react";
import { APP_THEMES, DEFAULT_THEME, type AppTheme } from "@shared/config/themes";
import { useAppTheme } from "../providers";

const THEME_SWATCHES: Record<AppTheme, string> = {
  dark: "bg-zinc-800",
  atom: "bg-violet-500",
  sky: "bg-sky-400",
  ocean: "bg-cyan-500",
};

export function ThemeMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { theme, setTheme, mounted } = useAppTheme();
  const current = mounted ? (theme ?? DEFAULT_THEME) : DEFAULT_THEME;
  const currentTheme = APP_THEMES.find((tm) => tm.name === current) ?? APP_THEMES[0];

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-accent/50 hover:text-foreground"
        aria-label="Change theme"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <Palette className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline text-xs font-medium">{currentTheme.label}</span>
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Choose theme"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-44 rounded-xl border border-border bg-card p-1.5 shadow-lg"
        >
          <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Theme
          </p>
          {APP_THEMES.map((themeOption) => {
            const isSelected = themeOption.name === current;
            return (
              <button
                key={themeOption.name}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition ${
                  isSelected
                    ? "bg-accent font-semibold text-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                }`}
                onClick={() => {
                  setTheme(themeOption.name);
                  setOpen(false);
                }}
              >
                <span className={`size-2.5 rounded-full ${THEME_SWATCHES[themeOption.name]}`} />
                {themeOption.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
