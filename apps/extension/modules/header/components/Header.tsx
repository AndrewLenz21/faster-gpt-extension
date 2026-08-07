import { ThemePicker } from "@/modules/theme";
import { IconButton } from "@/shared/components/IconButton";
import { GithubIcon, OpenSourceLogoIcon } from "@/shared/icons";

export interface HeaderProps {
  onGithubClick?: () => void;
}

export function Header({ onGithubClick }: HeaderProps) {
  return (
    <header className="relative z-100 flex w-full items-center gap-3 rounded-extension border border-extension-border bg-extension-nav px-3.5 py-3 shadow-extension-soft backdrop-blur-sm">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-extension-accent/30 bg-extension-accent/10 text-extension-accent shadow-[0_8px_20px_oklch(0.73_0.17_245/0.12)]">
        <OpenSourceLogoIcon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold tracking-[-0.01em] text-extension-foreground">
          faster-gpt-extension
        </p>
        <div className="flex items-center gap-1.5">
          <p className="truncate text-xs text-extension-muted">
            Open source · Built for conversations
          </p>
          <IconButton
            aria-label="Open GitHub repository"
            className="size-5 border-0 bg-transparent p-0 text-extension-muted hover:bg-transparent hover:text-extension-foreground focus-visible:outline-offset-1"
            onClick={onGithubClick}
          >
            <GithubIcon className="size-3.5" />
          </IconButton>
        </div>
      </div>

      <ThemePicker />
    </header>
  );
}
