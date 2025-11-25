import { ChevronDown, Search, Bell, MoreVertical, Bot } from "lucide-react";
import { useState } from "react";
const HeaderChat = ({ setSearch, filterType, setFilterType, setShowAIChat }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="w-full ml-6  mt-2 bg-[#F7F8FC] p-4 rounded-b-2xl flex items-center justify-between gap-80">
      <div className="flex items-center bg-white  w-[500px] rounded-full px-4 py-4">
        <div className="relative group">
          <div
            className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer"
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
            <span>
              {filterType === "all"
                ? "All Categery"
                : filterType === "groups"
                ? "Groups"
                : "Persons"}
            </span>
            <ChevronDown size={16} />
          </div>

          {openDropdown && (
  <div className="absolute right-0 mt-1 bg-white/90 backdrop-blur-md 
                  border border-gray-200/50 rounded-xl shadow-2xl z-50">

    <div
      className="px-3 py-2 hover:bg-gray-100/50 cursor-pointer"
      onClick={() => { setFilterType("all"); setOpenDropdown(false); }}
    >
      All Category
    </div>

    <div
      className="px-3 py-2 hover:bg-gray-100/50 cursor-pointer"
      onClick={() => { setFilterType("groups"); setOpenDropdown(false); }}
    >
      Groups
    </div>

    <div
      className="px-3 py-2 hover:bg-gray-100/50 cursor-pointer"
      onClick={() => { setFilterType("persons"); setOpenDropdown(false); }}
    >
      Persons
    </div>

  </div>
)}
        </div>

        <div className="w-px h-5 bg-gray-200 mx-3"></div>

        <input
          type="text"
          placeholder="Search here ..."
          className="flex-1 outline-none text-gray-600 text-sm"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Search size={18} strokeWidth={1.5} className="text-gray-400" />
        
      </div>

      
  

      <div className="flex items-center gap-4 ">
        <div className="hover:bg-gray-300 rounded-lg cursor-pointer">
           <button 
    onClick={() => setShowAIChat(prev => !prev)}
    className="p-2 rounded-lg cursor-pointer "
  >
    <Bot className="w-5 h-5 text-gray-600" />
  </button>
        </div>
       
        <div className="relative">
          <Bell
            size={20}
            strokeWidth={1.5}
            className="text-gray-600 cursor-pointer"
          />
          <span className="absolute top-0 right-0 w-2 h-2 bg-purple-500 rounded-full"></span>
        </div>
        <div className="flex items-center">
          <img
            src="https://i.pravatar.cc/300"
            className="w-8 h-8 rounded-xl overflow-hidden object-cover cursor-pointer"
          />
          <div>
            <button className="p-2 rounded-xl hover:bg-gray-100 transition cursor-pointer">
              <MoreVertical size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderChat;
