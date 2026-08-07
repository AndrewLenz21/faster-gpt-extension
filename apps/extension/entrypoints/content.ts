import { initializeConversationPerformance } from "@/modules/conversation-performance/services/initialize-conversation-performance";

export default defineContentScript({
  matches: [
    "*://chatgpt.com/*",
    "*://*.chatgpt.com/*",
    "*://chat.openai.com/*",
  ],
  main() {
    initializeConversationPerformance();
  },
});
