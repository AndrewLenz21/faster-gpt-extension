import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function IconButton({ children, className = '', type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-extension-border bg-extension-surface/70 text-extension-muted transition duration-200 hover:border-extension-accent/40 hover:bg-extension-accent/10 hover:text-extension-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-extension-ring ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
