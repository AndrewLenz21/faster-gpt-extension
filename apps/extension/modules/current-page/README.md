# Current Page

Displays real-time statistics about the active browser tab.

## Architecture

```
current-page/
  components/     UI only; receives data through props
  services/       Browser API and content-script calls
  store/          Zustand store; owns refresh lifecycle
  types/          Module-level type definitions
  utils/          Pure calculation and formatting functions
```

- `CurrentPage` triggers a one-shot refresh when the popup opens.
- The popup queries the active tab through `browser.scripting.executeScript`.
- Diagnostics run on the page, not in the popup, so DOM and `performance` APIs are available.
- System memory is read from `browser.system.memory` directly.

## What is measured

### Messages card
- Active page detection: `chatgpt.com`, `chat.openai.com`.
- User and assistant message count from DOM selectors.
- Shows placeholder text when the active tab is not ChatGPT.

### Current Tab Memory card

The main value is an **experimental page estimate**, not exact browser-tab RAM. Vivaldi/Chromium do not expose per-tab process memory to extensions, so the estimate combines five weak signals:

| Signal | Source | Heuristic |
|--------|--------|-----------|
| JS heap | `performance.memory.usedJSHeapSize` | Used directly (Chromium-only) |
| Image media | `naturalWidth × naturalHeight × 4` for every `<img>` | × 0.5, capped at 256 MB |
| DOM estimate | `document.getElementsByTagName('*').length` | 160 bytes per element, capped at 64 MB |
| HTML estimate | Serialized `documentElement.outerHTML` length | × 2, capped at 32 MB |
| Resources | `performance.getEntriesByType('resource')` decoded body size | × 0.1, capped at 128 MB |

Every contributing signal is individually capped so no single estimate dominates
unrealistically. The estimate switches to `diagnostics-only` mode when `performance.memory`
is unavailable (for example, Firefox).

System memory is measured separately through `chrome.system.memory` and represents
actual physical RAM, not page memory.

## Hover tooltip

The `Estimated` badge in the card shows the five-component breakdown on hover or
keyboard focus. The info icon provides the methodology explanation.

## Development logging

In development mode the raw page diagnostics and computed estimate are logged to the
console:

```
[current-page] raw page diagnostics …
[current-page] experimental estimate …
```

## Suggestions for improvement

1. **Cross-origin iframe memory**
   Scripting cannot inspect cross-origin iframes. Pages that embed many third-party
   frames will be underestimated. A `debugger` permission could attach to individual
   targets, but has significant security and privacy implications.

2. **Canvas and WebGL memory**
   Canvas 2D and WebGL contexts hold GPU memory outside the JS heap.
   `canvas.toDataURL()` can approximate 2D usage but is expensive. WebGL has no
   standard introspection API.

3. **Service Worker and Web Worker heaps**
   The current `performance.memory` call runs in the main document. Workers have
   separate heaps. `performance.measureUserAgentSpecificMemory()` (Chrome origin
   trial) can return an aggregate breakdown but is asynchronous and browser-specific.

4. **Persistent baseline capture**
   Take a snapshot immediately after `DOMContentLoaded` and compare against live
   values. This would show how much memory the page leaks over time.

5. **Tune heuristics with real data**
   The current constants are conservative guesses. Collecting side-by-side comparisons
   with Vivaldi's internal tab memory display across different page types would allow
   the retention factors and caps to be calibrated.

6. **Navigation and resource overlap**
   The decoded resource total and serialized HTML double-count the same bytes. A future
   refinement could track which document elements correspond to which resource entries
   and subtract overlap from the estimate.

7. **Offscreen / lazily loaded images**
   Images with `loading="lazy"` that have not entered the viewport may report
   `naturalWidth = 0`. Their memory will be missed until the browser decodes them.

8. **Font and CSS object memory**
   Web fonts and stylesheet objects consume memory not tracked by any of the five
   signals. The resource entries track the raw byte transfers, but the parsed and
   applied memory is opaque.

9. **Continuous polling**
   Currently the popup takes a single snapshot. A content-script-based interval
   could track memory over time, which would allow showing trends or detecting
   leaks while the popup remains open.

10. **Firefox fallback**
    `performance.memory` is unimplemented in Firefox. The extension reports
    `diagnostics-only` mode, which still includes DOM, HTML, images, and resource
    estimates but lacks the JS heap baseline.
