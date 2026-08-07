import { useEffect } from "react";

import { useCurrentPageStore } from "../store/current-page.store";
import { MessagesCard } from "./MessagesCard.tsx";
import { RamUsageCard } from "./RamUsageCard.tsx";

export interface CurrentPageProps {}

export function CurrentPage() {
  const activePage = useCurrentPageStore((state) => state.activePage);
  const displayBytes = useCurrentPageStore((state) => state.displayBytes);
  const estimate = useCurrentPageStore((state) => state.estimate);
  const isLoading = useCurrentPageStore((state) => state.isLoading);
  const measurementMode = useCurrentPageStore((state) => state.measurementMode);
  const processMemory = useCurrentPageStore((state) => state.processMemory);
  const refresh = useCurrentPageStore((state) => state.refresh);
  const systemMemory = useCurrentPageStore((state) => state.systemMemory);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <section aria-label="Current page statistics" className="space-y-3">
      <MessagesCard activePage={activePage} isLoading={isLoading} />
      <RamUsageCard
        diagnostics={activePage?.diagnostics ?? null}
        displayBytes={displayBytes}
        estimate={estimate}
        isLoading={isLoading}
        measurementMode={measurementMode}
        processMemory={processMemory}
        systemMemory={systemMemory}
      />
    </section>
  );
}
