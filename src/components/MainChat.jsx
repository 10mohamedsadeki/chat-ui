import { useState } from "react";
import ChatList from "./chatlist/ChatList";
import HeaderChat from "./HeaderChat";
import ChatSection from "./ChatSection";
import AiChat from "./AiChat";

const MainChat = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedChat, setSelectedChat] = useState(null); 
  const [showAIChat, setShowAIChat] = useState(false);
  return (
    <div className="flex flex-col h-screen ">
      <HeaderChat setSearch={setSearch} filterType={filterType} setFilterType={setFilterType}  setShowAIChat={setShowAIChat} />

      <div className="bg-[#f8f8fa] flex  overflow-hidden">
        <div className="w-80 ml-4  h-full overflow-y-auto">
          <ChatList search={search} filterType={filterType} onSelectChat={setSelectedChat} setShowAIChat={setShowAIChat} />
        </div>
        <div className="ml-5 w-[670px] h-[500px] rounded-md overflow-hidden ">
          {showAIChat ? (
            <AiChat />
          ) : (
            <ChatSection selectedChat={selectedChat} />
          )}
        </div> 
      </div>
    </div>
  );
};

export default MainChat;
