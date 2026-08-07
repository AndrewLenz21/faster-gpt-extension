# Header

Extension header bar with logo, title, GitHub link, and theme picker.

```
header/
  components/
    Header.tsx       Branding, theme menu trigger, GitHub icon link
```

## What it does

- Displays the open-source logo, extension title, and tagline.
- Contains a settings-gear button that opens the `ThemePicker` dropdown (Dark, Atom, Sky, Ocean).
- The GitHub icon opens the project repository in a new tab.
- Header has `z-[100]` stacking context so the theme menu renders above content cards.
