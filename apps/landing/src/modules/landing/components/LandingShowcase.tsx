export default function LandingShowcase() {
  return (
    <section id="demo" className="relative px-4 pb-6 sm:pb-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div
          className="anim-fade-up showcase-frame"
          style={{ animationDelay: "80ms" } as React.CSSProperties}
        >
          <img
            src="/images/gif/presentation.gif"
            alt="FasterGPT popup showing conversation metrics and performance controls"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center gap-4 px-1 sm:px-2">
          <span className="features-eyebrow w-fit">LIVE PREVIEW</span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Metrics, memory, and controls in one popup
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            See total messages, mounted messages, virtualization status, estimated tab memory, and
            conversation performance toggles — all without leaving ChatGPT.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Message count and mounted DOM awareness
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Virtualization detection starting at 15 messages
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Tab memory estimate with component breakdown
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-2 lg:grid-flow-dense">
        <div className="flex flex-col justify-center gap-4 px-1 sm:px-2 lg:col-start-1">
          <span className="features-eyebrow w-fit">THEMES</span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Four polished themes that match your workflow
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Switch between Dark, Atom, Sky, and Ocean. Theme preference persists across popup closes,
            reloads, and browser restarts.
          </p>
        </div>

        <div
          className="anim-fade-up showcase-frame lg:col-start-2"
          style={{ animationDelay: "140ms" } as React.CSSProperties}
        >
          <img
            src="/images/gif/themes-gif.gif"
            alt="FasterGPT theme switcher cycling through Dark, Atom, Sky, and Ocean"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
