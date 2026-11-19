
import { NavLink } from "react-router-dom";
import {
  Home,
  Smartphone,
  Package,
  UserRound,
  Globe,
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/home", icon: Home },
  { name: "My eSIMs", path: "/my-esims", icon: Smartphone },
  { name: "Plans", path: "/plans", icon: Package },
  { name: "Profile", path: "/profile", icon: UserRound },
];

function BottomNav() {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-white/10 bg-[#0B0B0F] px-6 py-8 z-50">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
            <Globe size={23} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white">
            eSIM<span className="text-purple-400">ly</span>
          </span>
        </div>

        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
          Menu
        </p>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-purple-600/20 text-purple-400"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto text-xs text-gray-600">
          © 2026 eSIMly
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-[#111015]/95 backdrop-blur-xl border-t border-white/10 px-2 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 min-w-0 px-2 transition ${
                    isActive
                      ? "text-purple-400"
                      : "text-gray-500 hover:text-white"
                  }`
                }
              >
                <Icon size={21} />
                <span className="text-[10px] font-medium">
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default BottomNav;
