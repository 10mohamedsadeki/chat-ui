import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { getGroups } from "../../api/groups";
import { getUsers } from "../../api/users";
import { getChatByUserId } from "../../api/chat";

export default function ChatList({ search, filterType, onSelectChat, setShowAIChat }) {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  useEffect(() => {
    getGroups().then((data) => {
      setGroups(data || []);
    });
  }, []);
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data || []);
    });
  }, []);

  useEffect(() => {
    if (users.length === 0) return;

     async function fetchAllMessages() {
      const updatedUsers = await Promise.all(
        users.map(async (user) => {
          const res = await getChatByUserId(user.id);
          const msgs = res.data || [];
          
          const sorted = msgs.sort((a, b) => a.timestamp - b.timestamp);
          const lastMessage = sorted.length > 0 ? sorted.at(-1).message : "No messages yet";
          const unreadCount = msgs.filter((m) => {
            return m.toUser === user.id && !m.isRead;
          }).length;

          return {
            ...user,
            lastMessage,
            unreadCount,
          };
        })
      );
      setUsers(updatedUsers);
    }

    fetchAllMessages();
  }, [users.length]);

  const formattedGroups = groups.map((group) => ({
    id: group.id,
    name: group.name,
    avatar: group.profileImage,
    isGroup: true,
    initials: group.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase(),
  }));

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.username,
    avatar: user.profileImage,
    lastMessage: user.lastMessage || "No messages yet",
    unreadCount: user.unreadCount || 0,
    isGroup: false,
  }));
 
  const filteredUsers = formattedUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredGroups = formattedGroups.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <aside className="flex flex-col  py-4 h-full overflow-y-auto border-l-2 border-l-[#efeff1]">
      <div className="flex items-center justify-between mb-2 ">
        <div className="text-[#2d2c31] text-3xl mt-1 mb-4 ml-4 font-[Poppins] font-semibold ">
          Groups
        </div>
      </div>
      {(filterType === "all" || filterType === "groups") && (
        <div className="flex flex-col gap-1 mb-3 ">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((chat) => <ChatItem key={chat.id} {...chat} />)
          ) : (
            <div className="text-xs text-gray-400 px-1">No groups</div>
          )}
        </div>
      )}

      <button className="text-[#a097ce] text-[12px] mt-1 mb-4 px-1  hover:underline cursor-pointer">
        SHOW ALL
      </button>

      <div className="flex items-center justify-between mb-2">
        <div className="text-[#2d2c31] text-3xl mt-1 mb-4 ml-4 font-[Poppins] font-semibold">
          Person
        </div>
      </div>
      {(filterType === "all" || filterType === "persons") && (
        <div className="flex flex-col gap-1 mb-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <ChatItem
                key={user.id}
                {...user}
                onClick={() => {
                  setSelectedChatId(user.id);
                  onSelectChat({ id: user.id, type: "user" });
                  setShowAIChat(false);
                }}
                isSelected={selectedChatId === user.id}
                
              />
            ))
          ) : (
            <div className="text-xs text-gray-400 px-1">No users found</div>
          )}
        </div>
      )}

      <button className="text-[#a097ce] text-[12px] mt-1 mb-4 px-1  hover:underline cursor-pointer">
        SHOW ALL
      </button>
    </aside>
  );
}
