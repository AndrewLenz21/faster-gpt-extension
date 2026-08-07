import { ThemeMenu } from "./ThemeMenu";
import { Download } from "lucide-react";

const GITHUB_URL = "https://github.com/AndrewLenz21/faster-gpt-extension";
const DOWNLOAD_URL = "/downloads/faster-gpt-extension-1.0.0.zip";

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 h-16 border-b backdrop-blur-2xl backdrop-saturate-150"
      style={{
        borderColor: "var(--nav-border, rgb(255 255 255 / 0.08))",
        background:
          "var(--nav-bg, linear-gradient(180deg, rgba(23,23,23,0.78) 0%, rgba(10,10,10,0.58) 100%))",
        boxShadow: "var(--nav-shadow, 0 16px 50px -22px rgba(0,0,0,0.95))",
      }}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5 no-underline">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            FG
          </span>
          <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            FasterGPT
          </span>
        </a>

        <nav className="flex items-center gap-1 sm:gap-2">
          <a
            href="#features"
            className="hidden rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-accent/50 hover:text-foreground sm:inline-flex"
          >
            Features
          </a>
          <a
            href="#demo"
            className="hidden rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-accent/50 hover:text-foreground sm:inline-flex"
          >
            Demo
          </a>
          <a
            href="#install"
            className="hidden items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-accent/50 hover:text-foreground sm:inline-flex"
          >
            Install
          </a>
          <a
            href={DOWNLOAD_URL}
            download="faster-gpt-extension-1.0.0.zip"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download</span>
          </a>
          <ThemeMenu />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open FasterGPT on GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent/50 hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.589 2 12.253c0 4.53 2.865 8.371 6.839 9.728.5.095.682-.223.682-.496 0-.245-.009-.894-.014-1.755-2.782.62-3.369-1.373-3.369-1.373-.455-1.184-1.11-1.499-1.11-1.499-.908-.638.069-.625.069-.625 1.004.073 1.532 1.057 1.532 1.057.892 1.568 2.341 1.115 2.912.853.091-.663.349-1.115.635-1.371-2.221-.26-4.556-1.14-4.556-5.074 0-1.121.39-2.037 1.029-2.755-.103-.262-.446-1.308.098-2.726 0 0 .84-.276 2.75 1.052A9.31 9.31 0 0 1 12 6.104a9.31 9.31 0 0 1 2.504.347c1.909-1.328 2.748-1.052 2.748-1.052.545 1.418.202 2.464.1 2.726.64.718 1.028 1.634 1.028 2.755 0 3.943-2.338 4.81-4.566 5.065.359.32.678.95.678 1.916 0 1.383-.012 2.499-.012 2.839 0 .276.18.596.688.495C19.138 20.62 22 16.781 22 12.253 22 6.589 17.523 2 12 2Z" />
            </svg>
          </a>
        </nav>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "var(--nav-highlight, linear-gradient(90deg, transparent 0%, rgb(255 255 255 / 0.08) 50%, transparent 100%))",
        }}
        aria-hidden="true"
      />
    </header>
  );
}
