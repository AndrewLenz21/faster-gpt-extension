import { Header } from "@/modules/header";
import { CurrentPage } from "@/modules/current-page";
import { ConversationPerformance } from "@/modules/conversation-performance";
import { Footer } from "@/modules/footer";

function App() {
  return (
    // Keep the browser popup compact while allowing its content to scroll when needed.
    <main className="extension-scrollbar max-h-125 space-y-3 overflow-y-auto bg-extension-background p-3 text-extension-foreground">
      {/* Feature modules own their markup; this shell only controls page composition and scrolling. */}
      <Header />
      <CurrentPage />
      <ConversationPerformance />
      <Footer />
    </main>
  );
}

export default App;
