# Footer

Credits section at the bottom of the extension popup.

```
footer/
  components/
    Footer.tsx        "Made with ♥ by Andrew" with GitHub links
  constants/
    footer.constants.ts   Brand name, portfolio/repository URLs, version
```

## What it does

- Shows `Made with ♥ by Andrew` where "Andrew" links to the portfolio GitHub.
- Shows the GitHub logo linking to the project repository, next to the version number.
- Accepts optional `portfolioUrl`, `repositoryUrl`, and `version` props; falls back to constants.
