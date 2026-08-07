import { useEffect } from "react";

import { useCurrentPageStore } from "@/modules/current-page/store/current-page.store";

import { useConversationPerformanceStore } from "../store/conversation-performance.store";
import { ConversationPerformanceCard } from "./ConversationPerformanceCard";
import { PerformanceSettingsCard } from "./PerformanceSettingsCard";

export function ConversationPerformance() {
  const activePage = useCurrentPageStore((state) => state.activePage);
  const isPageLoading = useCurrentPageStore((state) => state.isLoading);
  const settings = useConversationPerformanceStore((state) => state.settings);
  const isSettingsLoading = useConversationPerformanceStore(
    (state) => state.isLoading,
  );
  const loadSettings = useConversationPerformanceStore(
    (state) => state.loadSettings,
  );
  const updateSettings = useConversationPerformanceStore(
    (state) => state.updateSettings,
  );

  useEffect(() => {
    void loadSettings();
  }, [loadSettings]);

  return (
    <section
      aria-label="Conversation performance controls"
      className="space-y-3"
    >
      <ConversationPerformanceCard
        metrics={activePage?.conversationPerformance ?? null}
        isPageLoading={isPageLoading}
        isSettingsLoading={isSettingsLoading}
        settings={settings}
        onSettingChange={(settings) => void updateSettings(settings)}
      />
      <PerformanceSettingsCard />
    </section>
  );
}
