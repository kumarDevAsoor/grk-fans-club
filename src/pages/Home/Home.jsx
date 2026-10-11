import React from "react";
import gauthamImage from "../../assets/images/grk1-removebg-preview (1).png";

const Home = () => {
  return (
    <section className="relative overflow-hidden min-h-[100vh] bg-gradient-to-r from-[#28378A] via-[#3A52B6] to-[#FFF6CC] text-white">
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.6),_transparent_35%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_right,_rgba(242,211,92,0.55),_transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0">
        {[...Array(28)].map((_, index) => (
          <span
            key={index}
            className="absolute block rounded-full bg-white/60 blur-sm animate-float"
            style={{
              width: `${Math.floor(Math.random() * 6) + 3}px`,
              height: `${Math.floor(Math.random() * 6) + 3}px`,
              top: `${Math.floor(Math.random() * 96)}%`,
              left: `${Math.floor(Math.random() * 96)}%`,
              opacity: `${Math.random() * 0.35 + 0.15}`,
              animationDuration: `${Math.floor(Math.random() * 6) + 6}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
        {[...Array(10)].map((_, index) => (
          <span
            key={`star-${index}`}
            className="absolute inline-flex h-1.5 w-1.5 rotate-45 bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.3)]"
            style={{
              top: `${Math.floor(Math.random() * 92) + 4}%`,
              left: `${Math.floor(Math.random() * 92) + 4}%`,
              opacity: `${Math.random() * 0.5 + 0.2}`,
            }}
          />
        ))}
        <div className="absolute left-0 top-28 h-48 w-1/2 -translate-x-24 rounded-full bg-white/10 blur-3xl opacity-55 animate-ray" />
        <div className="absolute right-0 top-40 h-56 w-1/3 rounded-full bg-white/10 blur-3xl opacity-50 animate-ray" style={{ animationDelay: "3s" }} />
        <div className="absolute inset-x-10 top-8 h-24 rounded-full bg-[#F2D35C]/15 blur-3xl opacity-30" />
        <div className="absolute right-24 top-24 h-28 w-28 rounded-full bg-[#3A52B6]/20 blur-3xl opacity-60" />
        <div className="absolute left-20 bottom-20 h-32 w-32 rounded-full bg-[#F2D35C]/20 blur-3xl opacity-35" />
        <div className="absolute right-12 bottom-24 h-20 w-20 rounded-full bg-white/20 blur-3xl opacity-25" />
        <div className="absolute left-16 top-32 h-10 w-10 animate-cinema" style={{ animationDelay: "0.5s" }}>
          <svg viewBox="0 0 40 40" className="h-full w-full text-white/80 fill-current">
            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="rgba(255,255,255,0.12)" />
            <circle cx="20" cy="20" r="5" fill="currentColor" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <circle cx="28" cy="12" r="3" fill="currentColor" />
            <circle cx="12" cy="28" r="3" fill="currentColor" />
            <circle cx="28" cy="28" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute right-20 top-20 h-10 w-10 animate-float" style={{ animationDelay: "1.1s", filter: "drop-shadow(0 0 14px rgba(242,211,92,0.9))" }}>
          <svg viewBox="0 0 40 40" className="h-full w-full text-[#F2D35C]/90 fill-current">
            <path d="M20 4l3.7 10.2L35 15l-9 6.8L28 33l-8-5.2-8 5.2 2-11.2L5 15l11.3-0.8L20 4z" />
          </svg>
        </div>
        <div className="absolute left-24 bottom-24 h-12 w-12 animate-particle" style={{ animationDelay: "1.8s", filter: "drop-shadow(0 0 18px rgba(255,255,255,0.9))" }}>
          <svg viewBox="0 0 48 48" className="h-full w-full text-white/95 fill-current">
            <path d="M24 4l5.8 10.1L40 16l-8 6.7L32 38l-8-5.3L16 38l0-15.3L8 16l10.2-1.9L24 4z" opacity="0.95" />
            <circle cx="38" cy="10" r="3" opacity="0.9" />
            <circle cx="10" cy="36" r="2.5" opacity="0.85" />
          </svg>
        </div>
        <div className="absolute right-32 bottom-32 h-10 w-10 animate-float" style={{ animationDelay: "0.7s", filter: "drop-shadow(0 0 12px rgba(242,211,92,0.8))" }}>
          <svg viewBox="0 0 40 40" className="h-full w-full text-[#F2D35C]/80 fill-current">
            <path d="M20 6l4 9.5L35 16l-8.5 6.5L28 34l-8-5.5L12 34l1.5-11.5L4 16l11-0.5L20 6z" />
          </svg>
        </div>
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-10 lg:flex-row-reverse lg:items-center lg:justify-between lg:px-14">
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute inset-0 rounded-[34px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(242,211,92,0.18)]" />
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3A52B6]/20 blur-3xl" />
          <div className="absolute left-1/2 top-[18%] h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-[#F2D35C]/20 blur-3xl opacity-85" />
          <div className="absolute right-0 top-8 h-64 w-64 rounded-full bg-[#F2D35C]/30 blur-3xl opacity-72" />
          <div className="absolute -bottom-8 left-4 h-64 w-64 rounded-full bg-[#F2D35C]/15 blur-3xl opacity-45" />
          <div className="absolute inset-x-0 top-0 h-full rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)] opacity-65" />
          <div className="absolute inset-x-0 top-0 h-full rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.18),transparent)] opacity-20 animate-pulse" />
          <div className="relative mx-auto w-full overflow-visible animate-[float_10s_ease-in-out_infinite]">
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[#F2D35C]/10 backdrop-blur-sm animate-pulse" />
            <img
              src={gauthamImage}
              alt="Gautham Ram Karthik"
              className="relative mx-auto h-auto w-full max-w-[420px] object-contain drop-shadow-[0_40px_100px_rgba(242,211,92,0.32)] filter brightness-90 contrast-95"
            />
          </div>
        </div>

        <div className="z-10 flex w-full max-w-2xl flex-col gap-6 text-center lg:text-lef">
          <h1
            className="mt-4 mb-6 text-[65px] font-bold uppercase leading-[0.95] text-[#F2D35C] drop-shadow-[0_0_22px_rgba(242,211,92,0.95)]"
            style={{ animation: "glow-text 3.2s ease-in-out infinite", color: "#F2D35C" }}
          >
            <span className="block whitespace-nowrap">GAUTHAM RAM</span>
            <span className="block whitespace-nowrap">KARTHIK</span>
          </h1>
          <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-[#F2D35C]/30 bg-[#0D236F]/80 p-6 text-center text-white shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl md:mx-0">
            <div className="mb-4 text-[#F2D35C]/70 uppercase tracking-[0.35em] text-xs">
              ━━━━━━━━━━━━━━━━━━❝
            </div>
            <p className="text-lg font-semibold leading-8 text-white md:text-xl">
              சேர்ந்து உழைப்போம்,
              <br />
              சேர்ந்து வளர்வோம்.
            </p>
            <div className="mt-4 text-[#F2D35C]/70 uppercase tracking-[0.35em] text-xs">
              ❞━━━━━━━━━━━━━━━━━━
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="/membership"
              className="rounded-full bg-[#28378A] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition duration-300 ease-out hover:bg-[#F2D35C] hover:text-[#28378A]"
            >
              Join Membership
            </a>
            <a
              href="/news"
              className="rounded-full border border-[#F2D35C] bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition duration-300 ease-out hover:bg-[#F2D35C] hover:text-[#28378A]"
            >
              Our Gallery
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            <div className="rounded-3xl border border-white/20 bg-white/10 px-5 py-6 text-left shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-sm">
              <p className="text-3xl font-semibold text-white">30K+</p>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#F9EFAE]/80">Members</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
