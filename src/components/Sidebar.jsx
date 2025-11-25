import { useState } from "react";
import {
  Activity,
  Package,
  Globe,
  Mail,
  Clock,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: Activity,
  },
  {
    label: "Shipment",
    icon: Package,
  },
  {
    label: "Tracking",
    icon: Globe,
  },
  {
    label: "Messages",
    icon: Mail,
    badge: 358,
  },
  {
    label: "Revenue",
    icon: Clock,
  },
  {
    label: "Maps",
    icon: MapPin,
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("B");
  const [itemActive, setItemActive] = useState("Messages");
  return (
    <div className="flex flex-row relative">
      <div className="absolute -top-28 left-14 w-64 -rotate-20 h-96 bg-white/5 rounded-full "></div>


      <div className="h-screen w-[75px] rounded-r-[34px] bg-[#5f46e2] z-10">
        <div className="flex flex-col items-center h-full gap-16">
          <h1 className="text-[22px] font-semibold rotate-90 tracking-wide text-white mt-[60px]">
            Jualin.
          </h1>

          <div className="flex flex-col items-center gap-3 mt-[30px] w-full h-full">
            {["B", "A", "C", "+"].map((item) => (
              <div
                key={item}
                className={`w-full h-12 flex justify-center items-center transition-all duration-300 ${
                  active === item ? "border-l-2 border-white" : ""
                }`}
                onClick={() => setActive(item)}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-[14px] font-semibold shadow-md cursor-pointer ${
                    item === "B"
                      ? "bg-[#e8dc4b]"
                      : item === "A"
                      ? "bg-[#b68af9]"
                      : item === "C"
                      ? "bg-[#f8789d]"
                      : "border border-white/50"
                  }`}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-screen w-[247px] bg-[#745afc] -ml-8 rounded-r-[34px] shadow-lg ">
        <div className="flex flex-col items-center mt-[60px] gap-16">
          <div className="flex flex-row items-center w-full justify-between px-5">
            <div className="py-1 px-3 bg-[#6a51ef] rounded-full ml-8 flex justify-center items-center gap-2 cursor-pointer shadow-sm">
              <span className="text-white font-semibold tracking-wider text-[12px]">
                CABANG YOG
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-white font-semibold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="w-5 h-5 ml-4 bg-[#6a51ef] shadow-sm rounded-full flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-1 items-start ">
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                onClick={() => setItemActive(item.label)}
                className="relative w-full cursor-pointer "
              >
                {itemActive === item.label && (
                  <div className="absolute inset-0 bg-white -left-2.5 w-[140%] h-full rounded-br-lg  rounded-l-[120px]" />
                )}

                <div
                  className={`relative flex items-center justify-between px-4 py-3 ` }
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      size={22}
                      className={`${
                        itemActive === item.label
                          ? "text-purple-600"
                          : "text-white"
                      }`}
                    />
                    <span
                      className={`text-sm font-semibold font-[Poppins] tracking-wide
          ${itemActive === item.label ? "text-purple-600" : "text-white/95"}`}
                    >
                      {item.label}
                    </span>
                  </div>

                  
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-4 mt-8">
              <div className="flex flex-row items-center gap-4 cursor-pointer w-full px-4">
                <Settings size={22} className="text-white" />
                <span className="text-white/95 text-sm font-semibold font-[Poppins] tracking-wide">
                  Settings
                </span>
              </div>
              <div className="flex flex-row items-center gap-4 cursor-pointer w-full px-4">
                <LogOut size={22} className="text-white" />
                <span className="text-white/95 text-sm font-semibold font-[Poppins] tracking-wide">
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
