import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../assets/images/logo.jpg";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "News", to: "/news" },
  { label: "Membership", to: "/membership" },
  { label: "Contact", to: "/contact" },
  { label: "Admin", to: "/admin" },
];

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState(location.pathname || "/");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    handleScroll();
    setActiveLink(location.pathname || "/");
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 backdrop-blur-xl transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-[#071B4C]/95 shadow-[0_26px_80px_-40px_rgba(0,0,0,0.75)]"
          : "bg-[#071B4C]/90 shadow-[0_8px_24px_-18px_rgba(0,0,0,0.35)]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-white">
        <div className="flex items-center gap-4">
          <img
            src={logoImage}
            alt="GRK logo"
            className="h-12 w-12 rounded-full border border-[#F2D35C]/40 bg-white/10 object-cover shadow-[0_0_18px_rgba(242,211,92,0.22)]"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold uppercase tracking-[0.45em] text-[#F2D35C]">
              ★ ★ ★
            </span>
            <span className="text-sm uppercase tracking-[0.12em] text-gray-200">
              All India GRK Official Fans Club
            </span>
            <span className="text-[10px] uppercase tracking-[0.45em] text-gray-400">
              Reg. No. 144/2024
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-8 text-sm uppercase tracking-[0.16em] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative transition-colors duration-300 ${
                activeLink === link.to
                  ? "text-[#F2D35C]"
                  : "text-gray-200 hover:text-[#F2D35C]"
              }`}
            >
              {link.label}
              <span
                className={`absolute left-0 top-full mt-2 block h-0.5 w-full bg-[#F2D35C] transition-opacity duration-300 ${
                  activeLink === link.to ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/membership"
            className="rounded-full border border-[#F2D35C]/40 bg-[#F2D35C]/10 px-4 py-2 text-sm font-semibold text-[#F2D35C] transition duration-300 hover:border-[#F2D35C] hover:bg-[#F2D35C]/20"
          >
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;