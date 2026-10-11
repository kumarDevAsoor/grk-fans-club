import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaHome,
  FaImages,
  FaNewspaper,
  FaCalendarAlt,
  FaUsers,
  FaTelegramPlane,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import logoImage from "../assets/images/logo.jpg";
import crowdImage from "../assets/images/crowd_PNG5.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071B4C] text-white">
      <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-r from-[#F2D35C] via-[#FFF5B5] to-[#F2D35C]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center shadow-xl shadow-[#00000033] md:text-left">
            <div className="mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-[#F2D35C] bg-white/10 md:mx-0">
              <img
                src={logoImage}
                alt="GRK logo"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-[0.35em] text-[#F2D35C]">
              GRK Fans Club
            </h2>
            <p className="mt-5 text-sm leading-7 text-gray-200">
              Gautham Ram Karthik Official Fans Club is a united family of fans
              who celebrate, support and stand together with pride and passion.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-[#00000033]">
            <div className="flex items-center justify-center gap-3 text-[#F2D35C]">
              <span className="h-px w-10 bg-[#F2D35C]/60" />
              <span className="text-2xl">★</span>
              <span className="h-px w-10 bg-[#F2D35C]/60" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-[#F2D35C]">
              Quick Links
            </h2>
            <ul className="mt-8 space-y-4 text-gray-200">
              <li>
                <Link to="/" className="flex items-center gap-3 hover:text-[#F2D35C]">
                  <FaHome />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-3 hover:text-[#F2D35C]">
                  <FaUsers />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/membership" className="flex items-center gap-3 hover:text-[#F2D35C]">
                  <FaUsers />
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/news" className="flex items-center gap-3 hover:text-[#F2D35C]">
                  <FaNewspaper />
                  News
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-[#00000033]">
            <div className="flex items-center justify-center gap-3 text-[#F2D35C]">
              <span className="h-px w-10 bg-[#F2D35C]/60" />
              <span className="text-2xl">★</span>
              <span className="h-px w-10 bg-[#F2D35C]/60" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-[#F2D35C]">
              Social Media
            </h2>
            <ul className="mt-8 space-y-4 text-gray-200">
              <li className="flex items-center gap-3 hover:text-[#F2D35C] cursor-pointer">
                <FaFacebookF />
                <a
                  href="https://www.facebook.com/AllIndiaGRKFC/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li className="flex items-center gap-3 hover:text-[#F2D35C]">
                <FaInstagram />
                <a
                  href="https://www.instagram.com/allindiagrkfc/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li className="flex items-center gap-3 hover:text-[#F2D35C] cursor-pointer">
                <FaYoutube />
                <a
                  href="https://www.youtube.com/@AllIndiaGRKFC"
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                </a>
              </li>
              {/* <li className="flex items-center gap-3 hover:text-[#F2D35C] cursor-pointer">
                <FaTelegramPlane />
                Telegram
              </li> */}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-[#00000033]">
            <div className="flex items-center justify-center gap-3 text-[#F2D35C]">
              <span className="h-px w-10 bg-[#F2D35C]/60" />
              <span className="text-2xl">★</span>
              <span className="h-px w-10 bg-[#F2D35C]/60" />
            </div>
            <h3 className="mt-6 text-center text-3xl font-bold text-[#F2D35C]">
              Contact Us
            </h3>
            <div className="mt-8 text-gray-200 space-y-4">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#F2D35C] h-5 w-5" />
                <span>9361414257</span>
              </div>
              <div className="flex items-center gap-3">
                {/* <FaEnvelope className="text-[#F2D35C] h-5 w-5" /> */}
                <span>allindiagrkfc@gmail.com</span>
              </div>
              <p className="text-sm text-gray-300">
                Reach out for membership, events, or fan group support.
              </p>
            </div>
          </div>
        </div>

        <div
          className="h-28 opacity-20 bg-bottom bg-cover bg-center"
          style={{ backgroundImage: `url(${crowdImage})` }}
        />

        <div className=" border-t border-[#F2D35C]/20">
          <div className="flex flex-col items-center justify-center gap-3 text-center text-sm text-gray-300 md:flex-row md:gap-4">
            <span className="text-[#F2D35C] text-xl">★</span>
            <span>© 2026 Gautham Ram Karthik Official Fans Club. All Rights Reserved.</span>
            <span className="text-[#F2D35C] text-xl">★</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
