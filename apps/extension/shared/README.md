# Shared

`shared` contains reusable components, icons, hooks, types, constants, styles, and utilities.

Feature-specific code must remain inside its corresponding module. Move a component into `shared` only when it is reusable across multiple modules. Feature stores must not be placed inside `shared`.

`styles-mock` is a visual reference folder, not production code. Production UI must translate mock styles into Tailwind classes rather than importing mock CSS.
