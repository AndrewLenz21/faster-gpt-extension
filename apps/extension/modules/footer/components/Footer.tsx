import { GithubIcon, HeartIcon } from "@/shared/icons";

import { FOOTER_DEFAULTS } from "../constants/footer.constants";

export interface FooterProps {
  portfolioUrl?: string;
  repositoryUrl?: string;
  version?: string;
}

export function Footer({
  portfolioUrl,
  repositoryUrl,
  version = FOOTER_DEFAULTS.version,
}: FooterProps) {
  const profileUrl = portfolioUrl ?? FOOTER_DEFAULTS.portfolioUrl;
  const repoUrl = repositoryUrl ?? FOOTER_DEFAULTS.repositoryUrl;

  return (
    <footer className="flex flex-wrap items-center gap-x-3 gap-y-2 px-1 pb-1 pt-0.5 text-xs text-extension-muted">
      <p
        aria-label={`Made with love by ${FOOTER_DEFAULTS.brandName}`}
        className="flex items-center gap-1 whitespace-nowrap"
      >
        <span>Made with</span>
        <HeartIcon className="size-3 text-extension-accent" />
        <span>by</span>
        {profileUrl ? (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-extension-foreground transition-colors duration-200 hover:text-extension-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-extension-ring"
          >
            {FOOTER_DEFAULTS.brandName}
          </a>
        ) : (
          <span className="font-medium text-extension-foreground">
            {FOOTER_DEFAULTS.brandName}
          </span>
        )}
      </p>

      <span className="ml-auto flex items-center gap-2 whitespace-nowrap">
        {repoUrl ? (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Faster GPT GitHub repository"
            className="transition-colors duration-200 hover:text-extension-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-extension-ring"
          >
            <GithubIcon className="size-3.5" />
          </a>
        ) : null}
        <span>{version}</span>
      </span>
    </footer>
  );
}
