# Theme

Four-theme system persisted in extension local storage.

```
theme/
  theme.ts                  Theme names, getStoredTheme, applyTheme
  components/
    ThemePicker.tsx         Reusable theme dropdown menu
```

## Themes

| Theme | Class | Color scheme |
|---|---|---|
| Dark | `.dark` | Dark |
| Atom | `.atom` | Dark (blue accent) |
| Sky | `.sky` | Light |
| Ocean | `.ocean` | Light (cyan accent) |

## How it works

- `applyTheme(theme)` adds the theme class to `<html>` and writes to `localStorage`.
- `getStoredTheme()` reads from `localStorage`, falling back to `dark`.
- `ThemePicker` is a reusable `<IconButton>` + dropdown menu component shared by the popup header and options page.
- Cross-page sync: `ThemePicker` listens for the `window` `storage` event, so selecting a theme in the popup updates an open options tab (and vice versa).
- Theme tokens come from the `styles-mock/` directory (imported by popup and options stylesheets).
