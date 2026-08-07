import type { SVGProps } from 'react';

export function GaugeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 18a7 7 0 1 1 14 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="m12 12 3.5-3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M12 18h.01" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}
