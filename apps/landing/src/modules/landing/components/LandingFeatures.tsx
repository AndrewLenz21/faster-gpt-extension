import { Activity, Layers, MemoryStick, Zap } from "lucide-react";

const ICONS = {
  metrics: Activity,
  virtualization: Layers,
  memory: MemoryStick,
  optimize: Zap,
} as const;

const FEATURES = [
  {
    icon: "metrics" as const,
    variant: "metrics",
    title: "Conversation metrics",
    description:
      "Count total turns and currently mounted messages using ChatGPT's own DOM structure.",
  },
  {
    icon: "virtualization" as const,
    variant: "virtualization",
    title: "Virtualization awareness",
    description:
      "Compare total vs mounted messages to detect native virtualization without false positives.",
  },
  {
    icon: "memory" as const,
    variant: "memory",
    title: "Tab memory estimate",
    description:
      "Estimate page memory from JS heap, DOM, HTML, images, and resources with a clear breakdown.",
  },
  {
    icon: "optimize" as const,
    variant: "optimize",
    title: "Opt-in optimizations",
    description:
      "Reduce animations, collapse distant code blocks, and pause off-screen media — non-destructively.",
  },
];

export default function LandingFeatures() {
  return (
    <>
      <section id="features" className="features-section relative px-4 py-14 sm:py-20">
        <div aria-hidden="true" className="features-background">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1800 360"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              className="deco-line"
              d="M 0 240 C 200 200, 380 280, 560 220 S 900 120, 1140 180 S 1500 260, 1800 160"
            />
            <path
              className="deco-line deco-line-soft"
              d="M 0 300 C 240 260, 480 320, 720 280 S 1140 220, 1380 260 S 1660 300, 1800 240"
            />
            <g className="deco-bars">
              <rect className="deco-bar" x="1380" y="200" width="6" height="60" rx="2" />
              <rect className="deco-bar" x="1410" y="170" width="6" height="90" rx="2" />
              <rect className="deco-bar" x="1440" y="190" width="6" height="70" rx="2" />
              <rect className="deco-bar" x="1470" y="150" width="6" height="110" rx="2" />
              <rect className="deco-bar" x="1500" y="180" width="6" height="80" rx="2" />
              <rect className="deco-bar" x="1530" y="160" width="6" height="100" rx="2" />
              <rect className="deco-bar" x="1560" y="200" width="6" height="60" rx="2" />
              <rect className="deco-bar" x="1590" y="180" width="6" height="80" rx="2" />
              <rect className="deco-bar" x="1620" y="170" width="6" height="90" rx="2" />
              <rect className="deco-bar" x="1650" y="190" width="6" height="70" rx="2" />
              <rect className="deco-bar" x="1680" y="160" width="6" height="100" rx="2" />
              <rect className="deco-bar" x="1710" y="200" width="6" height="60" rx="2" />
            </g>
            <g className="deco-dots">
              {Array.from({ length: 6 }).map((_, row) =>
                Array.from({ length: 6 }).map((__, col) => (
                  <circle
                    key={`${row}-${col}`}
                    className="deco-dot"
                    cx={60 + col * 18}
                    cy={100 + row * 18}
                    r="1.2"
                  />
                )),
              )}
            </g>
          </svg>
        </div>

        <div className="features-container">
          <div className="relative mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <span
              className="anim-fade-up features-eyebrow"
              style={{ animationDelay: "0ms" } as React.CSSProperties}
            >
              WHY IT HELPS
            </span>
            <h2
              className="anim-fade-up mt-4 text-center text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ animationDelay: "60ms" } as React.CSSProperties}
            >
              Features
            </h2>
            <p
              className="anim-fade-up features-subtitle mt-3"
              style={{ animationDelay: "120ms" } as React.CSSProperties}
            >
              Understand long ChatGPT threads, spot virtualization, and optionally lighten the page
              — all from a focused extension popup.
            </p>
          </div>

          <div className="relative mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {FEATURES.map((feature, i) => {
              const Icon = ICONS[feature.icon];
              return (
                <div
                  key={feature.icon}
                  className="anim-fade-up"
                  style={{ animationDelay: `${(i + 1) * 80 + 120}ms` } as React.CSSProperties}
                >
                  <article className={`feature-card feature-card--${feature.variant}`}>
                    <div
                      className={`feature-icon feature-icon--${feature.variant}`}
                      aria-hidden="true"
                    >
                      <Icon />
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative px-4 pb-16">
        <div className="mx-auto max-w-5xl">
          <div className="showcase-frame overflow-hidden">
            <img
              src="/images/options.png"
              alt="FasterGPT performance settings page with content optimization toggles"
              loading="lazy"
              className="w-full"
            />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Settings persist in extension storage and sync between popup and options page in real
            time.
          </p>
        </div>
      </section>

      <footer className="relative border-t border-border/40 px-4 py-8 text-center text-xs text-muted-foreground">
        <p>
          Open Source — MIT licensed. Built for Vivaldi / Chromium browsers.
        </p>
        <p className="mt-3 flex items-center justify-center gap-4">
          <a
            href="/privacy"
            className="inline-flex items-center rounded-md px-2 py-1 font-medium transition hover:text-foreground"
          >
            Privacy Policy
          </a>
          <a
            href="https://github.com/AndrewLenz21/faster-gpt-extension"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md px-2 py-1 font-medium transition hover:text-foreground"
          >
            GitHub
          </a>
        </p>
      </footer>
    </>
  );
}
