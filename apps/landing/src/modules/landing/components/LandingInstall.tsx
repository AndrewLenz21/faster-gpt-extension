import { useState } from "react";
import { Download, Globe, Puzzle, FolderOpen, RefreshCcw, MonitorSmartphone, Check } from "lucide-react";

const DOWNLOAD_URL = "/downloads/faster-gpt-extension-1.0.0.zip";
const DOWNLOAD_FILENAME = "faster-gpt-extension-1.0.0.zip";

const VIVALDI_STEPS = [
  "Download the zip and unzip it to a folder you can find later.",
  "Open Vivaldi and go to vivaldi://extensions.",
  "Turn on Developer mode (top-right toggle).",
  "Click Load unpacked and select the unzipped folder.",
  "Pin FasterGPT to the toolbar and open ChatGPT to try it.",
];

const CHROME_STEPS = [
  "Download the zip and unzip it to a folder you can find later.",
  "Open Chrome and go to chrome://extensions.",
  "Turn on Developer mode (top-right toggle).",
  "Click Load unpacked and select the unzipped folder.",
  "Pin FasterGPT to the toolbar and open ChatGPT to try it.",
];

export default function LandingInstall() {
  const [copied, setCopied] = useState(false);

  const copyUnzipCommand = () => {
    const commands = [
      "unzip faster-gpt-extension-1.0.0.zip -d faster-gpt-extension",
      "# Windows",
      "Expand-Archive faster-gpt-extension-1.0.0.zip",
    ];
    navigator.clipboard.writeText(commands.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const InstallSteps = ({
    browser,
    icon,
    url,
    steps,
  }: {
    browser: string;
    icon: React.ReactNode;
    url: string;
    steps: string[];
  }) => (
    <div className="feature-card">
      <div className="mb-5 flex items-center justify-between">
        <div className="feature-icon feature-icon--virtualization" aria-hidden="true">
          {icon}
        </div>
        <code className="rounded-md border border-border/60 bg-background/60 px-2 py-1 text-xs text-muted-foreground">
          {url}
        </code>
      </div>
      <h3 className="feature-title text-base">{browser}</h3>
      <ol className="mt-3 space-y-2.5">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border/70 text-[11px] font-semibold text-primary">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <section id="install" className="features-section relative px-4 py-14 sm:py-20">
      <div className="features-container mx-auto max-w-6xl">
        <div className="relative mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <span className="anim-fade-up features-eyebrow" style={{ animationDelay: "0ms" } as React.CSSProperties}>
            GET STARTED
          </span>
          <h2
            className="anim-fade-up mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ animationDelay: "60ms" } as React.CSSProperties}
          >
            Download &amp; install
          </h2>
          <p
            className="anim-fade-up features-subtitle mt-3"
            style={{ animationDelay: "120ms" } as React.CSSProperties}
          >
            Works in any Chromium browser — Vivaldi, Chrome, Edge, and more. It's open source, free,
            and your data never leaves your browser.
          </p>
        </div>

        <div className="anim-fade-up mx-auto mb-10 flex max-w-2xl flex-col items-center gap-4 text-center">
          <a
            href={DOWNLOAD_URL}
            download={DOWNLOAD_FILENAME}
            className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Download FasterGPT 1.0.0
          </a>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <RefreshCcw className="h-3.5 w-3.5" /> Zip · ~256 KB
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Puzzle className="h-3.5 w-3.5" /> Manifest V3
            </span>
            <button
              type="button"
              onClick={copyUnzipCommand}
              className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/60 px-2.5 py-1 font-medium transition hover:bg-accent/60"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <MonitorSmartphone className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy unzip command"}
            </button>
          </div>
          <p className="max-w-md text-xs text-muted-foreground/80">
            Unzip the file before loading — the browser needs the actual extension folder, not a
            compressed archive.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="anim-fade-up" style={{ animationDelay: "160ms" } as React.CSSProperties}>
            <InstallSteps
              browser="Vivaldi"
              icon={<Globe className="h-4 w-4" />}
              url="vivaldi://extensions"
              steps={VIVALDI_STEPS}
            />
          </div>
          <div className="anim-fade-up" style={{ animationDelay: "240ms" } as React.CSSProperties}>
            <InstallSteps
              browser="Chrome"
              icon={<Globe className="h-4 w-4" />}
              url="chrome://extensions"
              steps={CHROME_STEPS}
            />
          </div>
        </div>

        <div className="anim-fade-up mx-auto mt-8 max-w-2xl rounded-xl border border-border/60 bg-card/50 p-5 text-center" style={{ animationDelay: "320ms" } as React.CSSProperties}>
          <div className="mb-2 flex items-center justify-center gap-2">
            <FolderOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Tips</span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Keep the unzipped folder — deleting it removes the extension. Updates are installed by
            downloading the new zip and clicking <span className="font-medium text-foreground">Refresh</span> on
            the extension card. Once published, the Chrome Web Store listing will give you one-click
            auto-updating installs.
          </p>
        </div>
      </div>
    </section>
  );
}
