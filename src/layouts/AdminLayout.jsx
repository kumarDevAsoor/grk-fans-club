import { Link, Outlet, useLocation } from "react-router-dom";
import { FiUsers, FiFilm, FiFileText, FiCalendar, FiUsers as FiCommittee, FiSettings, FiHome, FiLogOut } from "react-icons/fi";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: FiHome },
  { label: "Members", to: "/admin/members", icon: FiUsers },
  { label: "Movies", to: "/admin/movies", icon: FiFilm },
  { label: "News", to: "/admin/news", icon: FiFileText },
  { label: "Events", to: "/admin/events", icon: FiCalendar },
  { label: "Committee", to: "/admin/committee", icon: FiCommittee },
  { label: "Settings", to: "/admin/settings", icon: FiSettings },
  { label: "Logout", to: "/admin/logout", icon: FiLogOut, action: () => window.location.assign("/login") },
];

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#061229] text-white">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside className="w-full min-w-0 border-b border-white/10 bg-[#071B4C]/95 px-6 py-6 md:w-72 md:border-b-0 md:border-r md:py-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-3xl bg-[#F2D35C]/15 text-[#F2D35C] text-2xl font-bold">G</div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#F2D35C]/80">GRK Admin</p>
              <p className="text-sm text-gray-300">Super Admin</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              if (item.action) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    active ? "bg-[#F2D35C] text-[#071B4C]" : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-12 rounded-[1.85rem] border border-white/10 bg-white/5 p-5 text-sm text-gray-300">
            <p className="mb-3 uppercase tracking-[0.3em] text-[#F2D35C]/80">Quick link</p>
            <Link to="/" className="block rounded-2xl bg-[#F2D35C]/10 px-4 py-3 text-[#F2D35C] transition hover:bg-[#F2D35C]/20">
              View Website
            </Link>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
