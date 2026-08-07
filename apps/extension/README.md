# FasterGPT Extension

Browser extension built with [WXT](https://wxt.dev) + [React](https://react.dev).

## Modules

| Module | Purpose |
|---|---|
| [`conversation-performance`](./modules/conversation-performance/) | Metrics, virtualization detection, content optimizations |
| [`current-page`](./modules/current-page/) | Message count and memory diagnostics |
| [`theme`](./modules/theme/) | Four-theme system (Dark, Atom, Sky, Ocean) |
| [`header`](./modules/header/) | Extension header with theme picker |
| [`footer`](./modules/footer/) | Credits and links |
| [`extension`](./modules/extension/) | Popup shell that composes all modules |

## Scripts

```bash
npm run compile    # TypeScript check
npm run build      # Production build
npm run dev        # Dev server with Vivaldi hot reload
```
