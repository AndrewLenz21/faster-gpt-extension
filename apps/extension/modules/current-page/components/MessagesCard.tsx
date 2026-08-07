import type { ActivePageStatistics } from '../types/current-page.types';

import { MessageCircleIcon } from '@/shared/icons';

export interface MessagesCardProps {
  activePage: ActivePageStatistics | null;
  isLoading: boolean;
}

export function MessagesCard({ activePage, isLoading }: MessagesCardProps) {
  const messageCount = activePage?.messageCount;
  const description = isLoading
    ? 'Checking the current page'
    : activePage?.isChatGptPage
      ? 'Messages detected in this chat'
      : 'Open ChatGPT to count messages';

  return (
    <article className="flex items-center gap-3 rounded-2xl border border-extension-border bg-extension-surface/85 p-4 shadow-extension-soft">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-extension-accent/30 bg-extension-accent/10 text-extension-accent">
        <MessageCircleIcon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-semibold text-extension-foreground">Messages</h2>
        <p className="mt-0.5 truncate text-xs text-extension-muted">{description}</p>
      </div>

      <p className="shrink-0 text-2xl font-semibold tracking-[-0.03em] text-extension-accent">
        {messageCount ?? '—'}
      </p>
    </article>
  );
}
