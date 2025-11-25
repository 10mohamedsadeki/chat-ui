import { Bot, User, ArrowLeft, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { sendToGroq } from "../api/aiService";

const AiChat = ({ onGoBack }) => {
  const STORAGE_KEY = "chat_messages_ai";
  const savedMessages = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("JSON parsing error:", e);
      return null;
    }
  })();

  const [messages, setMessages] = useState(
    savedMessages || [
      {
        id: 1,
        sender: "bot",
        text: "Hello! How can I assist you today?",
        timestamp: Date.now(),
      },
    ]
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;

    const userMsg = {
      sender: "user",
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const input = text;
    setText("");

    try {
      const aiReply = await sendToGroq(input);
      const botMsg = {
        sender: "bot",
        text: aiReply.choices[0].message.content,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.log("AI error:", err);
    }
  };

  return (
    <div className="flex flex-col h-full mb-2 bg-white rounded-md overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between border-b bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onGoBack && onGoBack();
            }}
            className="p-1 -ml-1 text-gray-600 block lg:hidden z-30"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Bot className="w-5 h-5 text-purple-500" />
            AI Assistant
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#FAFAFA]">
        {messages.map((msg, idx) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={idx}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-3 max-w-[80%] lg:max-w-md ${
                  isUser ? "flex-row-reverse" : ""
                }`}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-gray-100">
                  {isUser ? (
                    <User className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Bot className="w-5 h-5 text-purple-500" />
                  )}
                </div>

                <div
                  className={`flex flex-col ${
                    isUser ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      isUser
                        ? "bg-gray-200 text-gray-800 rounded-tr-lg"
                        : "bg-purple-500 text-white rounded-tl-lg"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2">
          <input
            className="flex-1 px-4 py-3 bg-gray-50 rounded-xl outline-none text-sm placeholder-gray-400"
            placeholder="Ask AI anything..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-purple-500 text-white p-3 rounded-xl"
            onClick={handleSend}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
