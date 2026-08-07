import type { SVGProps } from 'react';

export function MessageCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 11.5a8 8 0 0 1-8.5 8 8.77 8.77 0 0 1-3.8-.9L4 20l1.3-3.5A7.83 7.83 0 0 1 4 12a8 8 0 0 1 8.5-8A8 8 0 0 1 20 11.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2.4" />
    </svg>
  );
}
