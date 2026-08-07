import type { ConversationPerformanceSettings } from "../types/conversation-performance.types";

const ANIMATION_CLASS = "faster-gpt-reduce-animations";
const COLLAPSED_CODE_ATTRIBUTE = "data-faster-gpt-collapsed-code";
const CONTENT_STYLE_ID = "faster-gpt-conversation-performance-styles";
const DISTANT_VIEWPORT_MARGIN = 800;

const disabledSettings: ConversationPerformanceSettings = {
  reduceAnimations: false,
  collapseDistantCodeBlocks: false,
  pauseOffscreenMedia: false,
  showDiagnostics: false,
};

let activeSettings = disabledSettings;
let collapseObserver: IntersectionObserver | null = null;
let mutationObserver: MutationObserver | null = null;
let observedScrollRoot: Element | null = null;
let refreshScheduled = false;
const collapsedCodeBlocks = new Map<HTMLPreElement, HTMLDivElement>();

function getThread(): HTMLElement | null {
  return document.querySelector('[data-side-pane-shell-host="true"] #thread');
}

function ensureStyles(): void {
  if (document.getElementById(CONTENT_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = CONTENT_STYLE_ID;
  style.textContent = `
    :root.${ANIMATION_CLASS} [data-scroll-root] { scroll-behavior: auto !important; }
    :root.${ANIMATION_CLASS} #thread [data-message-author-role]:not(:has([data-writing-block])) [class*="animate-"],
    :root.${ANIMATION_CLASS} #thread [data-message-author-role]:not(:has([data-writing-block])) [class*="transition-"] {
      animation-duration: 1ms !important;
      transition-duration: 1ms !important;
    }
    pre[${COLLAPSED_CODE_ATTRIBUTE}] {
      block-size: 1px !important;
      min-block-size: 0 !important;
      max-block-size: 1px !important;
      content-visibility: auto !important;
      contain-intrinsic-size: 0 1px !important;
      margin-block: 0 !important;
      overflow: hidden !important;
      padding-block: 0 !important;
    }
    [data-faster-gpt-code-placeholder] {
      align-items: center;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 0.75rem;
      color: inherit;
      display: flex;
      font: 500 0.75rem/1.25rem ui-sans-serif, system-ui, sans-serif;
      gap: 0.75rem;
      justify-content: space-between;
      margin-block: 0.75rem;
      padding: 0.5rem 0.75rem;
    }
    [data-faster-gpt-code-placeholder] button {
      background: transparent;
      border: 0;
      color: inherit;
      cursor: pointer;
      font: inherit;
      font-weight: 700;
      padding: 0.25rem;
      text-decoration: underline;
    }
  `;
  document.head.append(style);
}

function removeStylesIfUnused(): void {
  if (
    activeSettings.reduceAnimations ||
    activeSettings.collapseDistantCodeBlocks
  )
    return;
  document.getElementById(CONTENT_STYLE_ID)?.remove();
}

function isDistantFromViewport(element: Element): boolean {
  const bounds = element.getBoundingClientRect();

  return (
    bounds.bottom < -DISTANT_VIEWPORT_MARGIN ||
    bounds.top > window.innerHeight + DISTANT_VIEWPORT_MARGIN
  );
}

function restoreCodeBlock(codeBlock: HTMLPreElement): void {
  const placeholder = collapsedCodeBlocks.get(codeBlock);
  if (!placeholder) return;

  codeBlock.removeAttribute(COLLAPSED_CODE_ATTRIBUTE);
  placeholder.remove();
  collapseObserver?.unobserve(placeholder);
  collapsedCodeBlocks.delete(codeBlock);
}

function restoreAllCodeBlocks(): void {
  for (const codeBlock of [...collapsedCodeBlocks.keys()]) {
    restoreCodeBlock(codeBlock);
  }
}

function collapseCodeBlock(codeBlock: HTMLPreElement): void {
  if (
    collapsedCodeBlocks.has(codeBlock) ||
    codeBlock.closest("[data-writing-block]")
  )
    return;

  const placeholder = document.createElement("div");
  placeholder.dataset.fasterGptCodePlaceholder = "true";
  const label = document.createElement("span");
  label.textContent = "Code block collapsed";
  const expandButton = document.createElement("button");
  expandButton.type = "button";
  expandButton.textContent = "Expand";
  expandButton.addEventListener("click", () => restoreCodeBlock(codeBlock));
  placeholder.append(label, expandButton);

  codeBlock.before(placeholder);
  codeBlock.setAttribute(COLLAPSED_CODE_ATTRIBUTE, "true");
  collapsedCodeBlocks.set(codeBlock, placeholder);
  collapseObserver?.observe(placeholder);
}

function updateCodeBlocks(): void {
  if (!activeSettings.collapseDistantCodeBlocks) return;

  const thread = getThread();
  if (!thread) return;

  for (const codeBlock of thread.querySelectorAll<HTMLPreElement>(
    'section[data-turn="assistant"] pre',
  )) {
    if (isDistantFromViewport(codeBlock)) collapseCodeBlock(codeBlock);
  }
}

function updateMedia(): void {
  if (!activeSettings.pauseOffscreenMedia) return;

  const thread = getThread();
  if (!thread) return;

  for (const media of thread.querySelectorAll<HTMLMediaElement>(
    "video, audio",
  )) {
    if (
      media.paused ||
      media.closest("[data-writing-block]") ||
      !isDistantFromViewport(media)
    )
      continue;
    void media.pause();
  }
}

function refreshOptimizations(): void {
  refreshScheduled = false;
  connectScrollRoot(getThread());
  updateCodeBlocks();
  updateMedia();
}

function scheduleRefresh(): void {
  if (refreshScheduled) return;
  refreshScheduled = true;
  window.requestAnimationFrame(refreshOptimizations);
}

function stopObservers(): void {
  collapseObserver?.disconnect();
  collapseObserver = null;
  mutationObserver?.disconnect();
  mutationObserver = null;
  observedScrollRoot?.removeEventListener("scroll", scheduleRefresh);
  observedScrollRoot = null;
}

function connectScrollRoot(thread: HTMLElement | null): void {
  const scrollRoot = thread?.closest("[data-scroll-root]");
  if (!scrollRoot || scrollRoot === observedScrollRoot) return;

  observedScrollRoot?.removeEventListener("scroll", scheduleRefresh);
  scrollRoot.addEventListener("scroll", scheduleRefresh, { passive: true });
  observedScrollRoot = scrollRoot;
}

function startObservers(): void {
  if (!collapseObserver) {
    collapseObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          for (const [codeBlock, placeholder] of collapsedCodeBlocks) {
            if (placeholder === entry.target) restoreCodeBlock(codeBlock);
          }
        }
      },
      { rootMargin: `${DISTANT_VIEWPORT_MARGIN}px 0px` },
    );
  }

  if (!mutationObserver) {
    mutationObserver = new MutationObserver(scheduleRefresh);
    mutationObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  connectScrollRoot(getThread());

  scheduleRefresh();
}

export function applyPerformanceOptimizations(
  settings: ConversationPerformanceSettings,
): void {
  activeSettings = settings;
  document.documentElement.classList.toggle(
    ANIMATION_CLASS,
    settings.reduceAnimations,
  );

  if (settings.reduceAnimations || settings.collapseDistantCodeBlocks)
    ensureStyles();
  if (!settings.collapseDistantCodeBlocks) restoreAllCodeBlocks();

  if (settings.collapseDistantCodeBlocks || settings.pauseOffscreenMedia) {
    startObservers();
  } else {
    stopObservers();
  }

  removeStylesIfUnused();
}
