import { FiMapPin, FiClock, FiArrowRight } from "react-icons/fi";

const State = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#071B4C] via-[#0A2559] to-[#0D2B73] text-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <p className="mb-3 inline-flex rounded-full bg-[#F2D35C]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#F2D35C]">
            Coming Soon
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            State Updates Page
          </h1>
          <p className="mt-4 max-w-2xl text-gray-300 leading-8">
            We are working on building state-level information and resources for all GRK fans across India. Stay tuned for details on state chapters, local events, and leadership contacts.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-[#0E2B54]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 text-[#F2D35C] mb-6">
              <FiMapPin className="h-6 w-6" />
              <h2 className="text-xl font-semibold">State Chapter Preview</h2>
            </div>
            <p className="text-gray-300 leading-7">
              This section will soon highlight state-wise chapters, district coordinators, and local membership drives. For now, please check back later as we finalize regional layouts and leadership details.
            </p>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Feature</p>
                <p className="mt-2 text-white font-semibold">State Chapter Directory</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Feature</p>
                <p className="mt-2 text-white font-semibold">Local Event Listings</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Feature</p>
                <p className="mt-2 text-white font-semibold">District Support Contacts</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0A2559] to-[#162D79] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 text-[#F2D35C] mb-6">
              <FiClock className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Launch Timeline</h2>
            </div>
            <ul className="space-y-5 text-gray-300">
              <li className="rounded-3xl bg-white/5 p-5">
                <p className="font-semibold text-white">Phase 1</p>
                <p className="mt-1 text-sm text-gray-400">Finalize state chapter structure and contact mapping</p>
              </li>
              <li className="rounded-3xl bg-white/5 p-5">
                <p className="font-semibold text-white">Phase 2</p>
                <p className="mt-1 text-sm text-gray-400">Publish district leadership pages and event notifications</p>
              </li>
              <li className="rounded-3xl bg-white/5 p-5">
                <p className="font-semibold text-white">Phase 3</p>
                <p className="mt-1 text-sm text-gray-400">Open state pages for membership applications and local updates</p>
              </li>
            </ul>
            <button
              type="button"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#F2D35C] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#071B4C] transition hover:bg-[#e5cc4a]"
            >
              Notify Me <FiArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default State;
