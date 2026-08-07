import type { SVGProps } from 'react';

export function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m19.4 15 .1 1.5-2.1 2.1-1.5-.1-1.1.8-.6 1.4h-3l-.6-1.4-1.1-.8-1.5.1-2.1-2.1.1-1.5-.8-1.1-1.4-.6v-3l1.4-.6.8-1.1-.1-1.5 2.1-2.1 1.5.1 1.1-.8.6-1.4h3l.6 1.4 1.1.8 1.5-.1 2.1 2.1-.1 1.5.8 1.1 1.4.6v3l-1.4.6-.8 1.1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}
