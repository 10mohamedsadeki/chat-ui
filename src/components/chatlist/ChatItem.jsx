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
    <div
      className={`${
        isSelected ? "bg-purple-50 border-l-2 border-purple-400" : "bg-transparent"
      }`}
    >
      <div
        onClick={onClick}
        className={`${
          isGroup ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } flex w-full items-center justify-between py-2 px-3 lg:px-4 hover:bg-gray-100 rounded-lg`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {isGroup ? (
            <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-semibold flex-shrink-0">
              {initials}
            </div>
          ) : (
            <img
              src={avatar}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            />
          )}

          <div className="flex flex-col gap-0.5 overflow-hidden">
            <div className="font-semibold text-sm truncate">{name}</div>
            <div className="text-gray-500 text-xs truncate">{lastMessage}</div>
          </div>
        </div>

        {!isGroup && unreadCount > 0 && (
          <div className="bg-purple-600 text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full ml-2 flex-shrink-0">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
}