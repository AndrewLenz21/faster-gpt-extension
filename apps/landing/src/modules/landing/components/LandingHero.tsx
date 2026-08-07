import { Button } from "@shared/components/ui";
import { Download } from "lucide-react";

const GITHUB_URL = "https://github.com/AndrewLenz21/faster-gpt-extension";
const DOWNLOAD_URL = "/downloads/faster-gpt-extension-1.0.0.zip";

export default function LandingHero() {
  return (
    <section className="relative px-4 pt-12 pb-8 text-center sm:pt-16 sm:pb-10">
      <div className="anim-fade-down" style={{ animationDelay: "0ms" } as React.CSSProperties}>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Open source · Built for ChatGPT
        </span>
      </div>

      <h1
        className="anim-fade-down mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        style={{ animationDelay: "80ms" } as React.CSSProperties}
      >
        Faster conversations.
        <br className="hidden sm:block" /> Clearer performance.
      </h1>

      <p
        className="anim-fade-down mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base"
        style={{ animationDelay: "160ms" } as React.CSSProperties}
      >
        FasterGPT is a browser extension that surfaces conversation metrics, virtualization
        awareness, and optional content optimizations for ChatGPT — without replacing native
        behavior.
      </p>

      <div
        className="anim-fade-down mt-7 flex flex-wrap items-center justify-center gap-3"
        style={{ animationDelay: "240ms" } as React.CSSProperties}
      >
        <a
          href={DOWNLOAD_URL}
          download="faster-gpt-extension-1.0.0.zip"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Download className="h-4 w-4" />
          Download for Chrome / Vivaldi
        </a>
        <Button
          variant="outline"
          size="lg"
          className="gap-2"
          onClick={() => window.open(GITHUB_URL, "_blank", "noopener,noreferrer")}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.589 2 12.253c0 4.53 2.865 8.371 6.839 9.728.5.095.682-.223.682-.496 0-.245-.009-.894-.014-1.755-2.782.62-3.369-1.373-3.369-1.373-.455-1.184-1.11-1.499-1.11-1.499-.908-.638.069-.625.069-.625 1.004.073 1.532 1.057 1.532 1.057.892 1.568 2.341 1.115 2.912.853.091-.663.349-1.115.635-1.371-2.221-.26-4.556-1.14-4.556-5.074 0-1.121.39-2.037 1.029-2.755-.103-.262-.446-1.308.098-2.726 0 0 .84-.276 2.75 1.052A9.31 9.31 0 0 1 12 6.104a9.31 9.31 0 0 1 2.504.347c1.909-1.328 2.748-1.052 2.748-1.052.545 1.418.202 2.464.1 2.726.64.718 1.028 1.634 1.028 2.755 0 3.943-2.338 4.81-4.566 5.065.359.32.678.95.678 1.916 0 1.383-.012 2.499-.012 2.839 0 .276.18.596.688.495C19.138 20.62 22 16.781 22 12.253 22 6.589 17.523 2 12 2Z" />
          </svg>
          View on GitHub
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          See it in action
        </Button>
      </div>
    </section>
  );
}
