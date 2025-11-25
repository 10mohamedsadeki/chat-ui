export default function ChatItem({
  avatar,
  name,
  lastMessage,
  unreadCount,
  isGroup,
  initials,
  onClick,
  isSelected,
}) {
  
  return (
  <div className={`${isSelected ? "bg-purple-50 border-l-2 border-purple-400 " : "bg-transparent"}`}>
    <div onClick={onClick} className={`${isGroup ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}   flex w-full  items-center justify-between py-1 px-6 cursor-pointer hover:bg-gray-100 rounded-lg`}>
      <div className="flex items-center gap-4">
        {isGroup ? (
          <div
            className="
              w-8 h-8 
              rounded-full bg-purple-100 
              flex items-center justify-center 
              text-purple-600 text-[11px] font-semibold
            "
          >
            {initials}
          </div>
        ) : (
          <img src={avatar} className="w-8 h-8 rounded-full object-cover" />
        )}

        <div className="flex flex-col gap-1">
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-gray-500 text-xs truncate w-[180px]">
            {lastMessage}
          </div>
        </div>
      </div>

      {!isGroup && unreadCount > 0 && (
        <div className="bg-white  text-purple-600 text-[10px] font-semibold px-1 py-1 rounded-full">
         {unreadCount}
        </div>
      )}
    </div>
  </div>
    
  );
}
