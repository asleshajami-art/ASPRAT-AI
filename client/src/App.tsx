import { useState } from "react";
import "./App.css";

type Message = {
role: "user" | "assistant";
content: string;
};

function App() {
const [input, setInput] = useState("");
const [messages, setMessages] = useState<Message[]>([]);
const [loading, setLoading] = useState(false);

async function sendMessage() {
const text = input.trim();

if (!text || loading) return;

setMessages((previous) => [
  ...previous,
  { role: "user", content: text },
]);

setInput("");
setLoading(true);

try {
 const response = await fetch("https://asprat-ai-ooep.vercel.app/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message: text }),
});

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  const data: {
  success: boolean;
  reply?: string;
  message?: string;
} = await response.json();

  setMessages((previous) => [
    ...previous,
    {
      role: "assistant",
     content: data.reply || data.message || "No response received.",
    },
  ]);
} catch {
  setMessages((previous) => [
    ...previous,
    {
      role: "assistant",
      content:
        "Unable to connect to ASPRAT AI server. Please check whether the backend is running.",
    },
  ]);
} finally {
  setLoading(false);
}

}

function newChat() {
setMessages([]);
setInput("");
}

return <div className="app"> <aside className="sidebar"> <div className="brand"> <div className="brand-icon">A</div> <div> <h2>ASPRAT AI</h2> <p>Your intelligent assistant</p> </div> </div>

```
    <button className="new-chat" onClick={newChat}>
      <span>＋</span> New Chat
    </button>

    <div className="sidebar-label">YOUR SPACE</div>
    <div className="sidebar-item">💬 AI Assistant</div>
    <div className="sidebar-item">✨ Explore AI</div>

    <div className="sidebar-footer">
      <div className="avatar">A</div>
      <div>
        <strong>ASPRAT AI</strong>
        <p>Four Names. One Intelligence.</p>
      </div>
    </div>
  </aside>

  <main className="main">
    <header className="topbar">
      <div>
        <span className="status-dot"></span>
        <span>AI Workspace</span>
      </div>
      <span className="model-badge">LLM PLATFORM</span>
    </header>

    <section className="chat-area">
      {messages.length === 0 ? (
        <div className="welcome">
          <div className="welcome-icon">✦</div>
          <p className="eyebrow">WELCOME TO ASPRAT AI</p>

          <h1>
            Your ideas,
            <br />
            <span>meet intelligence.</span>
          </h1>

          <p className="welcome-description">
            Ask questions, explore ideas, and discover new
            possibilities with your AI assistant.
          </p>

          <div className="suggestions">
            <button
              onClick={() =>
                setInput("Explain artificial intelligence simply")
              }
            >
              <span>✧</span>
              <strong>Learn something</strong>
              <small>Understand a new topic</small>
            </button>

            <button
              onClick={() =>
                setInput("Give me ideas for a creative project")
              }
            >
              <span>◈</span>
              <strong>Explore ideas</strong>
              <small>Discover new possibilities</small>
            </button>

            <button
              onClick={() =>
                setInput("Help me write a professional email")
              }
            >
              <span>✎</span>
              <strong>Create something</strong>
              <small>Turn thoughts into words</small>
            </button>
          </div>
        </div>
      ) : (
        <div className="messages">
          {messages.map((message, index) => (
            <div
              className={`message ${message.role}`}
              key={index}
            >
              <div className="message-avatar">
                {message.role === "user" ? "Y" : "A"}
              </div>

              <div className="message-content">
                <strong>
                  {message.role === "user" ? "You" : "ASPRAT AI"}
                </strong>
                <p>{message.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="typing">
              <span></span>
              <span></span>
              <span></span>
              <small>Connecting to ASPRAT AI...</small>
            </div>
          )}
        </div>
      )}
    </section>

    <footer className="input-section">
      <div className="input-box">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();
              void sendMessage();
            }
          }}
          placeholder="Message ASPRAT AI..."
          rows={2}
        />

        <div className="input-bottom">
          <span>✧ Your ideas start here</span>

          <button
            className="send-button"
            onClick={() => void sendMessage()}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            ↑
          </button>
        </div>
      </div>

      <p className="disclaimer">
        ASPRAT AI demo · Backend connection test
      </p>
    </footer>
  </main>
</div>
}

export default App;
