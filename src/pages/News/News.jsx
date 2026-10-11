import { FiBell, FiClock, FiTrendingUp } from "react-icons/fi";

const News = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#071B4C] via-[#0A2559] to-[#0D2B73] text-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <p className="mb-3 inline-flex rounded-full bg-[#F2D35C]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#F2D35C]">
            News Coming Soon
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Latest News & Announcements
          </h1>
          <p className="mt-4 max-w-3xl text-gray-300 leading-8">
            We are preparing the latest GRK updates, event announcements, and membership news for you. Check back soon when this section goes live.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-[#0E2B54]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
            <div className="mb-6 flex items-center gap-3 text-[#F2D35C]">
              <FiBell className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Latest Alerts</h2>
            </div>
            <p className="text-gray-300 leading-7">
              No live updates are available yet. This space will soon feature the latest news about GRK rallies, club announcements, and community highlights.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[#0E2B54]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
            <div className="mb-6 flex items-center gap-3 text-[#F2D35C]">
              <FiTrendingUp className="h-6 w-6" />
              <h2 className="text-xl font-semibold">What to Expect</h2>
            </div>
            <ul className="space-y-4 text-gray-300">
              <li>Event schedules for state and district chapters.</li>
              <li>Membership spotlights and achievement stories.</li>
              <li>Announcements for upcoming fan gatherings.</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[#0E2B54]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
            <div className="mb-6 flex items-center gap-3 text-[#F2D35C]">
              <FiClock className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Stay Updated</h2>
            </div>
            <p className="text-gray-300 leading-7">
              Follow our social channels and website for the official news roll-out. The news center will be updated as soon as our editorial team publishes verified announcements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
