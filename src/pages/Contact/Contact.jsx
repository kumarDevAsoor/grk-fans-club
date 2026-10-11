import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#071B4C] via-[#0A2559] to-[#0D2B73] text-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
          <p className="mb-3 inline-flex rounded-full bg-[#F2D35C]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#F2D35C]">
            Get in Touch
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Contact GRK Fans Club
          </h1>
          <p className="mt-4 max-w-3xl text-gray-300 leading-8">
            Have a question, suggestion, or want to know more about membership? Use the form below or reach our team through any of the contact channels.
            Sample details are shown here and will be updated later.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-[#0E2B54]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
              <h2 className="text-2xl font-semibold text-white">Contact Info</h2>
              <p className="mt-3 text-gray-300 leading-7">
                Reach our team for general questions, membership support, or event inquiries. We aim to respond within 24 hours.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/5 p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2D35C]/15 text-[#F2D35C]">
                    <FiPhone className="h-5 w-5" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Phone</p>
                  <p className="mt-2 text-white font-semibold">+91 98765 43210</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2D35C]/15 text-[#F2D35C]">
                    <FiMail className="h-5 w-5" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Email</p>
                  <p className="mt-2 text-white font-semibold">contact@grkfansclub.in</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2D35C]/15 text-[#F2D35C]">
                    <FiMapPin className="h-5 w-5" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Office</p>
                  <p className="mt-2 text-white font-semibold">72, GRK Fans Club HQ, Chennai, Tamil Nadu</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2D35C]/15 text-[#F2D35C]">
                    <FiClock className="h-5 w-5" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Hours</p>
                  <p className="mt-2 text-white font-semibold">Mon - Sat • 09:00 AM - 06:00 PM</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0A2559] to-[#162D79] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
              <h2 className="text-2xl font-semibold text-white">Team Leads</h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-white/5 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Membership Support</p>
                  <p className="mt-2 text-white font-semibold">Ms. Meera R.</p>
                  <p className="mt-1 text-gray-400 text-sm">Phone: +91 99876 54321</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-gray-400">Public Relations</p>
                  <p className="mt-2 text-white font-semibold">Mr. Arun S.</p>
                  <p className="mt-1 text-gray-400 text-sm">Email: pr@grkfansclub.in</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">Send us a message</h2>
            <p className="mt-3 text-gray-300 leading-7">
              Use this form to send a quick message. We will update this with active submission support once the contact system is live.
            </p>
            <form className="mt-8 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-3xl border border-white/10 bg-[#0E2B54] px-4 py-3 text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-3xl border border-white/10 bg-[#0E2B54] px-4 py-3 text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-200">Message</label>
                <textarea
                  rows="5"
                  placeholder="Tell us how we can help"
                  className="w-full rounded-3xl border border-white/10 bg-[#0E2B54] px-4 py-3 text-white placeholder-gray-400 focus:border-[#F2D35C] focus:outline-none"
                />
              </div>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#F2D35C] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#071B4C] transition hover:bg-[#e5cc4a]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
