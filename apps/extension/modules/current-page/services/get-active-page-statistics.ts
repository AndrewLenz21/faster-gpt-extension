import type { ActivePageStatistics } from "../types/current-page.types";
import type { PageDiagnostics } from "../types/page-diagnostics.types";
import { collectPageDiagnostics } from "./get-page-diagnostics";

function inspectActivePage() {
  const hostname = window.location.hostname;
  const isChatGptPage =
    hostname === "chatgpt.com" ||
    hostname.endsWith(".chatgpt.com") ||
    hostname === "chat.openai.com";
  const unknownMetrics = {
    totalMessages: null,
    mountedMessages: null,
    virtualizationStatus: "unknown" as const,
    domNodeCount: null,
    codeBlockCount: null,
    imageCount: null,
  };

  if (!isChatGptPage) {
    return {
      isChatGptPage,
      messageCount: null,
      conversationPerformance: unknownMetrics,
    };
  }

  const thread = document.querySelector(
    '[data-side-pane-shell-host="true"] #thread',
  );
  if (!thread) {
    return {
      isChatGptPage,
      messageCount: 0,
      conversationPerformance: unknownMetrics,
    };
  }

  const turnIds = new Set(
    Array.from(thread.querySelectorAll("[data-turn-id-container]"))
      .map((element) => element.getAttribute("data-turn-id-container"))
      .filter((turnId) => turnId && turnId !== "client-created-root"),
  );
  const totalMessages = turnIds.size;
  const mountedMessages = thread.querySelectorAll(
    'section[data-testid^="conversation-turn-"]',
  ).length;
  const MIN_MESSAGES_FOR_VIRTUALIZATION_CHECK = 15;
  const virtualizationStatus: "detected" | "not-detected" | "unknown" =
    totalMessages === 0
      ? "unknown"
      : totalMessages > mountedMessages &&
          totalMessages >= MIN_MESSAGES_FOR_VIRTUALIZATION_CHECK
        ? "detected"
        : "not-detected";

  return {
    isChatGptPage,
    messageCount: totalMessages,
    conversationPerformance: {
      totalMessages,
      mountedMessages,
      virtualizationStatus,
      domNodeCount: document.getElementsByTagName("*").length,
      codeBlockCount: thread.querySelectorAll("pre").length,
      imageCount: thread.querySelectorAll("[data-message-author-role] img")
        .length,
    },
  };
}

export async function getActivePageStatistics(): Promise<ActivePageStatistics | null> {
  try {
    const [activeTab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (activeTab?.id == null) {
      return null;
    }

    const [pageResult, diagnosticsResult] = await Promise.all([
      browser.scripting.executeScript({
        func: inspectActivePage,
        target: { tabId: activeTab.id },
      }),
      browser.scripting.executeScript({
        func: collectPageDiagnostics,
        target: { tabId: activeTab.id },
      }),
    ]);
    const page = pageResult[0]?.result;
    const diagnostics = diagnosticsResult[0]?.result as
      PageDiagnostics | undefined;

    if (!page || !diagnostics) {
      return null;
    }

    const activePage: ActivePageStatistics = {
      diagnostics,
      isChatGptPage: page.isChatGptPage,
      messageCount: page.messageCount,
      conversationPerformance: page.conversationPerformance,
    };

    if (import.meta.env.DEV) {
      console.info(
        "[current-page] raw page diagnostics",
        activePage.diagnostics,
      );
      console.table({
        totalMessages: activePage.conversationPerformance.totalMessages,
        mountedMessages: activePage.conversationPerformance.mountedMessages,
        virtualizationStatus:
          activePage.conversationPerformance.virtualizationStatus,
        domNodeCount: activePage.conversationPerformance.domNodeCount,
        codeBlockCount: activePage.conversationPerformance.codeBlockCount,
        imageCount: activePage.conversationPerformance.imageCount,
        totalMessageStrategy: "[data-turn-id-container] unique IDs",
        mountedMessageStrategy: 'section[data-testid^="conversation-turn-"]',
      });
    }

    return activePage;
  } catch {
    return null;
  }
}
