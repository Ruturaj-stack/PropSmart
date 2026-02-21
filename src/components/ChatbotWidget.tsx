import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateChatbotResponse } from "@/services/chatbot";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

/**
 * AI Property Assistant Chatbot
 * Client-side chatbot with localStorage persistence
 * Works without authentication!
 */
const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("chatbot_messages");
    if (saved) {
      const parsed = JSON.parse(saved) as Array<
        Omit<Message, "timestamp"> & { timestamp: string }
      >;
      setMessages(
        parsed.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      );
    } else {
      // Welcome message for new users
      const welcomeMsg: Message = {
        id: "1",
        role: "assistant",
        content:
          "Hello! 👋 I'm your PropSmart AI assistant. I can help you find properties, compare options, and answer questions about real estate. How can I assist you today?",
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
      localStorage.setItem("chatbot_messages", JSON.stringify([welcomeMsg]));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    localStorage.setItem("chatbot_messages", JSON.stringify(newMessages));

    // Generate AI response instantly for better feel
    const response = generateChatbotResponse(userMessage);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.message,
      timestamp: new Date(),
    };

    const updatedMessages = [...newMessages, aiMsg];
    setMessages(updatedMessages);
    localStorage.setItem("chatbot_messages", JSON.stringify(updatedMessages));
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    const welcomeMsg: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: "Chat cleared! How can I help you today?",
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
    localStorage.setItem("chatbot_messages", JSON.stringify([welcomeMsg]));
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-elevated transition-transform hover:scale-110"
        title="AI Assistant"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl border border-border bg-card shadow-elevated transition-all ${
        isMinimized ? "h-14 w-80" : "h-[600px] w-96"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-accent px-4 py-3 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-accent-foreground" />
          <div>
            <h3 className="font-semibold text-accent-foreground text-sm">
              AI Assistant
            </h3>
            <p className="text-xs text-accent-foreground/80">
              Always here to help
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isMinimized && (
            <button
              onClick={clearChat}
              className="text-accent-foreground/80 hover:text-accent-foreground text-xs px-2 py-1 rounded hover:bg-accent-foreground/10"
              title="Clear chat"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-accent-foreground/80 hover:text-accent-foreground"
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4" />
            ) : (
              <Minimize2 className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-accent-foreground/80 hover:text-accent-foreground"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                    <Bot className="h-4 w-4 text-accent" />
                  </div>
                )}

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-card-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>

                {msg.role === "user" && (
                  <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                    <User className="h-4 w-4 text-foreground" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading dots removed for instant feel */}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/30"
                disabled={loading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                size="sm"
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground text-center">
              💡 Try: "Show me properties under ₹50L" or "Compare apartments vs
              villas"
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatbotWidget;
