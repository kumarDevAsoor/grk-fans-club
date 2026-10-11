import { useEffect, useMemo, useState } from "react";
import { FiUsers, FiMapPin, FiHome, FiFilm, FiFileText, FiCalendar } from "react-icons/fi";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import dayjs from "dayjs";
import { db } from "../../firebase/firestore";

const defaultRecentEvents = [
  { id: 1, title: "GRK Fans Meetup", date: "22-Jul-2026", location: "Chennai" },
  { id: 2, title: "State Launch Event", date: "01-Aug-2026", location: "Bengaluru" },
  { id: 3, title: "District Volunteer Drive", date: "10-Aug-2026", location: "Hyderabad" },
];

const formatDate = (value) => {
  if (!value) return "";
  const dateValue = value?.toDate?.() ?? value;
  return dayjs(dateValue).isValid() ? dayjs(dateValue).format("DD-MMM-YYYY") : String(value);
};

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [moviesCount, setMoviesCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [recentEvents, setRecentEvents] = useState(defaultRecentEvents);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "members"),
      (snapshot) => {
        const membersList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMembers(membersList);
        setLoading(false);
      },
      (error) => {
        console.error("Unable to load members:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [eventsSnap, moviesSnap, newsSnap] = await Promise.all([
          getDocs(collection(db, "events")),
          getDocs(collection(db, "movies")),
          getDocs(collection(db, "news")),
        ]);

        setEventsCount(eventsSnap.size);
        setMoviesCount(moviesSnap.size);
        setNewsCount(newsSnap.size);

        if (!eventsSnap.empty) {
          const mappedEvents = eventsSnap.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0))
            .slice(0, 3)
            .map((event) => ({
              id: event.id,
              title: event.title ?? event.name ?? "Upcoming event",
              location: event.location ?? event.city ?? "TBD",
              date: formatDate(event.date) || String(event.date),
            }));
          setRecentEvents(mappedEvents);
        }
      } catch (error) {
        console.error("Unable to load dashboard counts:", error);
      }
    };

    loadCounts();
  }, []);

  const totalMembers = members.length;
  const pendingMembers = useMemo(() => members.filter((member) => member.status === "pending").length, [members]);
  const approvedMembers = useMemo(() => members.filter((member) => member.status === "approved").length, [members]);
  const rejectedMembers = useMemo(() => members.filter((member) => member.status === "rejected").length, [members]);
  const districtsCount = useMemo(() => new Set(members.map((member) => member.district ?? "")).size, [members]);

  const latestMembers = useMemo(() => {
    return members
      .slice()
      .sort((a, b) => new Date(b.createdAt?.toDate?.() ?? b.createdAt) - new Date(a.createdAt?.toDate?.() ?? a.createdAt))
      .slice(0, 3)
      .map((member) => ({
        id: member.id,
        memberId: member.memberId,
        name: member.fullName,
        state: member.state,
        district: member.district,
        joined: formatDate(member.createdAt),
      }));
  }, [members]);

  const memberStats = [
    { id: 1, label: "Total Members", value: loading ? "..." : totalMembers, icon: FiUsers, accent: "from-[#FFCA44] to-[#F2D35C]" },
    { id: 2, label: "Pending", value: loading ? "..." : pendingMembers, icon: FiHome, accent: "from-[#F59E0B] to-[#FBBF24]" },
    { id: 3, label: "Approved", value: loading ? "..." : approvedMembers, icon: FiHome, accent: "from-[#22C55E] to-[#16A34A]" },
    { id: 4, label: "Rejected", value: loading ? "..." : rejectedMembers, icon: FiHome, accent: "from-[#EF4444] to-[#DC2626]" },
    { id: 5, label: "Districts", value: loading ? "..." : districtsCount, icon: FiMapPin, accent: "from-[#6DBDF0] to-[#4C8CF5]" },
    { id: 6, label: "Movies", value: loading ? "..." : moviesCount, icon: FiFilm, accent: "from-[#22C55E] to-[#16A34A]" },
    { id: 7, label: "News", value: loading ? "..." : newsCount, icon: FiFileText, accent: "from-[#F97316] to-[#EA580C]" },
    { id: 8, label: "Events", value: loading ? "..." : eventsCount, icon: FiCalendar, accent: "from-[#38BDF8] to-[#0EA5E9]" },
  ];

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] border border-white/10 bg-[#0C1E4D]/90 p-8 shadow-[0_35px_100px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#F2D35C]/80">Dashboard</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Admin Overview</h1>
        <p className="mt-3 max-w-2xl text-gray-300">
          Manage fan club members, news, events, and club content from the admin console. This dashboard surfaces the latest club metrics and quick actions for daily operations.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {memberStats.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${card.accent} text-white shadow-[0_15px_40px_rgba(0,0,0,0.18)]`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-6 text-sm uppercase tracking-[0.25em] text-gray-400">{card.label}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[#0A2559]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#F2D35C]/80">Latest Registrations</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Recent signups</h2>
            </div>
            <button className="rounded-full bg-[#F2D35C] px-5 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#071B4C] transition hover:bg-[#e5cc4a]">
              Export
            </button>
          </div>
          <div className="mt-8 space-y-4">
            {(latestMembers.length ? latestMembers : defaultRecentEvents).map((member) => (
              <div key={member.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-400">{member.memberId}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{member.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{member.state}</p>
                    <p className="mt-2 text-white">{member.joined}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-300">{member.district}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#0A2559]/90 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
          <p className="text-sm uppercase tracking-[0.28em] text-[#F2D35C]/80">Recent Events</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Upcoming activations</h2>
          <div className="mt-8 space-y-4">
            {recentEvents.map((event) => (
              <div key={event.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-lg font-semibold text-white">{event.title}</p>
                <p className="mt-2 text-sm text-gray-300">{event.location}</p>
                <p className="mt-2 text-sm text-[#F2D35C]">{event.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#F2D35C]/80">Quick Actions</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Manage the club faster</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-[#F2D35C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#071B4C] transition hover:bg-[#e5cc4a]">
              Add News
            </button>
            <button className="rounded-full bg-[#3B82F6] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#2563eb]">
              Add Event
            </button>
            <button className="rounded-full bg-[#10B981] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#059669]">
              Export Members
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
