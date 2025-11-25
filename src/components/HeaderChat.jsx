import {
  ChevronDown,
  Search,
  Bell,
  MoreVertical,
  Bot,
  Menu,
} from "lucide-react";
import { useState } from "react";

const HeaderChat = ({
  setSearch,
  filterType,
  setFilterType,
  setShowAIChat,
  toggleSidebar,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="lg:w-5xl lg:ml-6 mt-2 bg-[#F7F8FC] p-4 rounded-b-2xl flex items-center justify-between gap-2 sm:gap-4">
      <div className="lg:hidden">
        <button onClick={toggleSidebar} className="p-2 -ml-2">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
      </div>


      <div className="flex items-center bg-white flex-1 min-w-0 lg:flex-none lg:w-auto lg:max-w-lg rounded-full px-4 py-2">
        <div className="relative group">
          <div
            className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer"
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
           
            <span className="hidden xs:block">
              {filterType === "all"
                ? "All"
                : filterType === "groups"
                ? "Groups"
                : "Persons"}
            </span>
            <ChevronDown size={16} />
          </div>

          {openDropdown && (
            <div className="absolute left-0 mt-4 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-2xl z-50">
              <div
                className="px-4 py-2 hover:bg-gray-100/50 cursor-pointer text-sm"
                onClick={() => { setFilterType("all"); setOpenDropdown(false); }}>
                All Category
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100/50 cursor-pointer text-sm"
                onClick={() => { setFilterType("groups"); setOpenDropdown(false); }}>
                Groups
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100/50 cursor-pointer text-sm"
                onClick={() => { setFilterType("persons"); setOpenDropdown(false); }}>
                Persons
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-gray-200 mx-3"></div>

        <input
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none text-gray-600 text-sm bg-transparent min-w-0"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Search size={18} strokeWidth={1.5} className="text-gray-400" />
      </div>

    
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
        <button
          onClick={() => setShowAIChat((prev) => !prev)}
          className="p-2 rounded-lg cursor-pointer hover:bg-gray-200"
        >
          <Bot className="w-5 h-5 text-gray-600" />
        </button>
        <div className="relative p-2">
          <Bell
            size={20}
            strokeWidth={1.5}
            className="text-gray-600 cursor-pointer"
          />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full"></span>
        </div>
        <div className="flex items-center">
          <img
            src="https://i.pravatar.cc/300"
            className="w-8 h-8 rounded-xl object-cover cursor-pointer"
          />
         
          <button className="hidden lg:block p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer">
            <MoreVertical size={20} className="text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderChat;