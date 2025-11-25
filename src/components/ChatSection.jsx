import { useEffect, useState } from "react";
import { getChatByUserId, getUserDetails, sendMessage } from "../api/chat";
import {
  MoreVertical,
  Smile,
  Paperclip,
  Mic,
  Send,
  ArrowLeft,
} from "lucide-react";

const ChatSection = ({ selectedChat, onGoBack }) => {
  const [messages, setMessages] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [text, setText] = useState("");
  const currentUserId = 7;

  const handleSend = async () => {
    if (!text.trim()) return;
    const res = await sendMessage(currentUserId, selectedChat.id, text);
    setMessages((prev) => [
      ...prev,
      {
        fromUser: currentUserId,
        toUser: selectedChat.id,
        message: text,
        timestamp: Date.now(),
      },
    ]);
    setText("");
  };

  useEffect(() => {
    if (selectedChat) {
      getChatByUserId(selectedChat.id).then((response) => {
        setMessages(response.data || []);
      });

      getUserDetails(selectedChat.id).then((response) => {
        setUserDetails(response.data);
      });
    }
  }, [selectedChat]);

  if (selectedChat === null) {
    return (
      <div className="flex items-center  justify-center h-full text-gray-400 text-lg px-4 text-center">
        Please select a person to chat
      </div>
    );
  }
  return (
    <div className="flex flex-col mb-2 h-full bg-white rounded-md overflow-hidden">
      <div className="px-4 py-3 flex justify-between items-center bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onGoBack && onGoBack();
            }}
            className="p-1 -ml-1 text-gray-600 block lg:hidden z-30"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-lg font-semibold">{userDetails?.username}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-3">
            <img
              src={userDetails?.profileImage}
              alt="Member"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-1">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#FAFAFA]">
        {messages.length === 0 && (
          <div className="flex h-full justify-center items-center text-gray-400">
            No messages yet...
          </div>
        )}

        {messages.map((msg, index) => {
          const isSent = msg.fromUser === currentUserId;

          return (
            <div
              key={index}
              className={`flex ${isSent ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-3 max-w-[80%] lg:max-w-md ${
                  isSent ? "flex-row-reverse" : ""
                }`}
              >
                {!isSent && (
                  <img
                    src={userDetails?.profileImage}
                    className="w-8 h-8 rounded-full shrink-0"
                  />
                )}

                <div
                  className={`flex flex-col ${
                    isSent ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={
                      isSent
                        ? "bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-tr-lg"
                        : "bg-pink-500 text-white px-4 py-2 rounded-2xl rounded-tl-lg"
                    }
                  >
                    {msg.message}
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
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="hidden sm:block text-gray-400 hover:text-gray-500 p-2">
            <Smile className="w-5 h-5" />
          </button>
          <button className="hidden sm:block text-gray-400 hover:text-gray-500 p-2">
            <Paperclip className="w-5 h-5" />
          </button>
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

export default ChatSection;
