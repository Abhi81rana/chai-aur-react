
import {
  Home,
  Users,
  BriefcaseBusiness,
  MessageSquare,
  Bell,
  Search
} from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white font-bold text-2xl px-2 rounded">
            in
          </div>

          <div className="hidden sm:flex items-center bg-gray-100 rounded-md px-3 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none px-2 w-40"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 text-gray-500">
          <div className="flex flex-col items-center">
            <Home size={21} />
            <span className="text-xs hidden sm:block">Home</span>
          </div>

          <div className="flex flex-col items-center">
            <Users size={21} />
            <span className="text-xs hidden sm:block">My Network</span>
          </div>

          <div className="flex flex-col items-center">
            <BriefcaseBusiness size={21} />
            <span className="text-xs hidden sm:block">Jobs</span>
          </div>

          <div className="flex flex-col items-center">
            <MessageSquare size={21} />
            <span className="text-xs hidden sm:block">Messaging</span>
          </div>

          <div className="flex flex-col items-center">
            <Bell size={21} />
            <span className="text-xs hidden sm:block">Notifications</span>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
