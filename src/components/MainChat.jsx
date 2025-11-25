import { useState } from "react";
import ChatList from "./chatlist/ChatList";
import HeaderChat from "./HeaderChat";
import ChatSection from "./ChatSection";
import AiChat from "./AiChat";
import Sidebar from "./Sidebar";

const MainChat = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedChat, setSelectedChat] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
     console.log("handleSelectChat CALLED with:", chat);
    if (showAIChat) {
      setShowAIChat(false);
    }
  };

  const handleGoBack = () => {
  setSelectedChat(null);
  setShowAIChat(false);
};
  
 const isChatting = selectedChat !== null || showAIChat;



  return (
    <div className="flex h-screen bg-[#f8f8fa] overflow-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <div className="flex flex-col flex-1 min-w-0">
        <HeaderChat
          toggleSidebar={toggleSidebar}
          setSearch={setSearch}
          filterType={filterType}
          setFilterType={setFilterType}
          setShowAIChat={setShowAIChat}
        />

       
        <div className="flex flex-1 overflow-hidden">
          
          <div
            className={`
              ${isChatting ? "hidden" : "flex"}
              w-full flex-col
              lg:flex lg:w-80 lg:ml-4 h-full overflow-y-auto border-l lg:border-l-2 border-gray-200
            `}
          >
            <ChatList
              search={search}
              filterType={filterType}
              onSelectChat={handleSelectChat}
              setShowAIChat={setShowAIChat}
            />
          </div>

          
          {isChatting && (
            <div className="w-full h-full flex flex-col lg:flex-1 lg:ml-5">
              {showAIChat ? (
                <AiChat onGoBack={handleGoBack} />
              ) : (
                <ChatSection selectedChat={selectedChat} onGoBack={handleGoBack} />
              )}
            </div>
          )}

         
          {!isChatting && (
            <div className="hidden lg:flex flex-1 ml-5 h-full">
               <div className="flex items-center justify-center h-full w-full text-gray-400 text-lg px-4 text-center">
                 Please select a person to chat
               </div>
            </div>
          )}
        </div>
      </div>

      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
        ></div>
      )}
    </div>
  );
};

export default MainChat;