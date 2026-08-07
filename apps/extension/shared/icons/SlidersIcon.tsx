import type { SVGProps } from 'react';

export function SlidersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 7h16M4 17h16M8 3v8M16 13v8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <circle cx="8" cy="7" r="2" fill="currentColor" />
      <circle cx="16" cy="17" r="2" fill="currentColor" />
    </svg>
  );
}
