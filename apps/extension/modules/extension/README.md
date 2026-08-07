# Extension

Popup shell that composes all feature modules into a single scrollable layout.

```
extension/
  ui/
    App.tsx    Composes Header, CurrentPage, ConversationPerformance, and Footer
```

## What it does

- Renders the extension popup with standard spacing and scroll support.
- Wires the header settings button to the theme picker.
- Passes no business logic — every module owns its own state and rendering.
