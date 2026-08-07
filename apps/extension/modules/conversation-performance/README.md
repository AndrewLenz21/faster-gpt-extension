# Conversation Performance

Provides conversation metrics, virtualization detection, content optimizations, and user-toggled settings.

```
conversation-performance/
  components/
    ConversationPerformance.tsx                  Popup section shell
    ConversationPerformanceCard.tsx              Metrics and optimization toggles
    ConversationPerformanceSettingsPage.tsx      Full options page
    OptimizationToggle.tsx                       Toggle switch component
    PerformanceSettingsCard.tsx                  Settings entry point
  services/
    apply-performance-optimizations.ts           CSS injection, code collapsing, media pause
    conversation-performance-settings.ts         Local + browser storage sync
    initialize-conversation-performance.ts       Content script entry point
  store/
    conversation-performance.store.ts            Zustand store for popup/options UI
  types/
    conversation-performance.types.ts            Settings and metrics types
  constants/
    conversation-performance.constants.ts        Storage keys and defaults
```

## What it does

- **Virtualization detection** — compares total conversation turns (unique `data-turn-id-container` IDs) against mounted turns (`section[data-testid^="conversation-turn-"]`). Reports `detected` when total exceeds mounted and total ≥ 15.
- **Reduce animations** — injects a stylesheet that caps `animation-duration` and `transition-duration` to 1ms on completed messages inside `#thread`, excluding `[data-writing-block]` (streaming content).
- **Collapse distant code** — collapses assistant `<pre>` blocks 800px+ outside the viewport; restores on IntersectionObserver entry, manual Expand click, or toggle disable. Original DOM is never removed.
- **Pause off-screen media** — pauses `<video>` and `<audio>` elements far from the viewport; skips already-paused and streaming content.
- **Diagnostics** — optional popup grid showing DOM nodes, code blocks, images, and virtualization status.

All optimizations default to `false` and require explicit user activation. Settings persist via `browser.storage.local` and extension `localStorage`.
