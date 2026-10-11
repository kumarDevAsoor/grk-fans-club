import React from "react";
import actorImage from "../../assets/images/abt.png";
import presidentImage from "../../assets/images/head.jpg";
import managerImage from "../../assets/images/manager.jpg";

const leadership = [
  { name: "Sella Pandi", designation: "GRK Fans Club President", image: presidentImage },
  { name: "Gopinath Thiraviam", designation: "GRK Manager", image: managerImage },
];

const stats = [
  { value: "30K+", label: "Active Members" },
  { value: "120+", label: "Events Conducted" },
  { value: "18", label: "District Chapters" },
];

const objectives = [
  "Promote positive fan engagement and community service",
  "Celebrate achievements through meaningful events and outreach",
  "Support causes that reflect compassion, unity, and growth",
];

const About = () => {
  return (
    <section className="relative overflow-hidden bg-[#071B4C] px-6 py-16 text-white sm:px-8 lg:px-14">
      <div className="mx-auto max-w-7xl space-y-14">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-4 text-sm uppercase tracking-[0.35em] text-[#F2D35C]/80 sm:text-base">
            <div className="h-px w-20 bg-[#F2D35C]/40 sm:w-28" />
            <span>ABOUT THE OFFICIAL FANS CLUB</span>
            <div className="h-px w-20 bg-[#F2D35C]/40 sm:w-28" />
          </div>
          <h1 className="max-w-4xl text-4xl font-bold uppercase tracking-[0.2em] text-[#F2D35C] sm:text-5xl">
            About Gautham Ram Karthik
          </h1>
          <p className="max-w-3xl text-xl font-semibold text-white sm:text-2xl">
            Together We Support • Together We Grow
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          {/* Left column */}
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              <h2 className="text-2xl font-semibold uppercase tracking-[0.25em] text-[#F2D35C] sm:text-3xl">
                About Gautham Ram Karthik
              </h2>
              <p className="mt-6 text-base leading-8 text-gray-200 sm:text-lg">
                Gautham Ram Karthik is a beloved performer whose humility, dedication, and strong connection with people make him a true inspiration. He continues to leave a lasting impression through every role, every gesture, and every act of kindness.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#F2D35C]/20 bg-[#0D236F]/80 p-8 shadow-[0_30px_80px_rgba(242,211,92,0.18)] backdrop-blur-xl">
              <h3 className="text-2xl font-semibold uppercase tracking-[0.25em] text-[#F2D35C]">
                About GRK Fans Club
              </h3>
              <p className="mt-5 text-base leading-8 text-gray-200 sm:text-lg">
                The GRK Fans Club is a vibrant community created to celebrate Gautham Ram Karthik with pride, respect, and purpose. We bring together supporters who believe in spreading positivity, organizing meaningful events, and standing united as one family.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#1D4ED8]/20 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div className="text-center">
                <div className="mx-auto h-px w-24 bg-[#F2D35C]" />
                <h3 className="mt-4 text-2xl font-semibold uppercase tracking-[0.25em] text-[#071B4C] sm:text-3xl">
                  Our Leadership
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
                  Meet the dedicated team leading the Official Gautham Ram Karthik Fans Club
                </p>
                <div className="mx-auto mt-4 h-px w-24 bg-[#F2D35C]" />
              </div>

              <div className="mt-8 grid gap-y-6 gap-x-[5px] grid-cols-1 sm:grid-cols-2 justify-items-stretch">
                {leadership.map((person) => (
                  <div key={person.designation} className="w-full max-w-[420px] flex flex-col min-h-[380px] rounded-2xl border border-[#1D4ED8]/20 bg-white shadow-xl overflow-hidden mx-auto">
                    <div className="h-[250px] w-full flex-shrink-0 overflow-hidden rounded-t-2xl border-b border-[#E6EEF9]/20 bg-white shadow-inner">
                      <img src={person.image} alt={person.name} className="block h-full w-full object-cover object-center" />
                    </div>
                    <div className="px-4 py-5 text-center flex-1 flex flex-col justify-end">
                      <p className="text-lg font-semibold text-[#F2D35C]">{person.name}</p>
                      <p className="mt-2 text-sm font-medium uppercase tracking-[0.25em] text-[#071B4C]">{person.designation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#122363]/90 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
              <img src={actorImage} alt="Gautham Ram Karthik" className="h-[520px] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071B4C] via-[#071B4C]/80 to-transparent p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-[#F2D35C]/80">Official Fan Community</p>
                <p className="mt-3 text-sm leading-6 text-gray-200 sm:text-base">A platform where support turns into service, celebration, and lasting friendship.</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#F2D35C]/20 bg-[#0D236F]/80 p-8 shadow-[0_30px_80px_rgba(242,211,92,0.18)] backdrop-blur-xl">
              <h3 className="text-2xl font-semibold uppercase tracking-[0.25em] text-[#F2D35C]">Mission • Vision • Objectives</h3>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#F2D35C]/80">Mission</p>
                  <p className="mt-2 text-base leading-7 text-gray-200">To foster a positive, united, and service-driven fan community around Gautham Ram Karthik.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#F2D35C]/80">Vision</p>
                  <p className="mt-2 text-base leading-7 text-gray-200">To grow into a strong family of supporters who inspire change and celebrate excellence together.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#F2D35C]/80">Objectives</p>
                  <ul className="mt-3 space-y-2 text-base leading-7 text-gray-200">
                    {objectives.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#F2D35C]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#122363]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            <h3 className="text-2xl font-semibold uppercase tracking-[0.25em] text-[#F2D35C]">Membership Statistics</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.25em] text-[#F2D35C]/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#F2D35C]/20 bg-[#0D236F]/80 p-8 shadow-[0_30px_80px_rgba(242,211,92,0.18)] backdrop-blur-xl">
            <h3 className="text-2xl font-semibold uppercase tracking-[0.25em] text-[#F2D35C]">Join the Official Fans Club</h3>
            <p className="mt-5 text-base leading-8 text-gray-200 sm:text-lg">Become part of a community that celebrates, supports, and grows together with Gautham Ram Karthik.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/register" className="rounded-full bg-[#F2D35C] px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#071B4C] transition hover:scale-[1.02]">Join Now</a>
              <a href="/contact" className="rounded-full border border-[#F2D35C] px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#F2D35C] hover:text-[#071B4C]">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
