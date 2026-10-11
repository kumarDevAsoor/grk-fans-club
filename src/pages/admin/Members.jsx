import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiDownload, FiPrinter, FiEye, FiCheckCircle, FiXCircle, FiTrash2, FiFileText } from "react-icons/fi";
import { jsPDF } from "jspdf";
import dayjs from "dayjs";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firestore";

const initialMembers = [
  {
    id: "local-1",
    memberId: "GRK000001",
    fullName: "Kumar G",
    mobileNumber: "9876543210",
    email: "kumar.g@example.com",
    gender: "Male",
    bloodGroup: "A+",
    state: "Tamil Nadu",
    district: "Thoothukudi",
    city: "Kovilpatti",
    address: "7/24 Main Street, Kovilpatti",
    status: "pending",
    createdAt: "2026-07-11",
  },
  {
    id: "local-2",
    memberId: "GRK000002",
    fullName: "Arjun",
    mobileNumber: "9876543211",
    email: "arjun.r@example.com",
    gender: "Male",
    bloodGroup: "O+",
    state: "Tamil Nadu",
    district: "Chennai",
    city: "Chennai",
    address: "12 Green Avenue, Chennai",
    status: "approved",
    createdAt: "2026-07-11",
  },
  {
    id: "local-3",
    memberId: "GRK000003",
    fullName: "Priya S.",
    mobileNumber: "9876543212",
    email: "priya.s@example.com",
    gender: "Female",
    bloodGroup: "B+",
    state: "Karnataka",
    district: "Bengaluru",
    city: "Bengaluru",
    address: "44 Lotus Road, Bengaluru",
    status: "rejected",
    createdAt: "2026-07-10",
  },
];

const formatDate = (value) => {
  if (!value) return "";
  const dateValue = value?.toDate?.() ?? value;
  return dayjs(dateValue).isValid() ? dayjs(dateValue).format("DD-MMM-YYYY") : String(value);
};

const parseDate = (value) => {
  if (!value) return null;
  return dayjs(value?.toDate?.() ?? value);
};

const buildStatusPill = (status) => {
  const classes = {
    pending: "bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20",
    approved: "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20",
    rejected: "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20",
  };
  return classes[status] || "bg-white/10 text-white border border-white/10";
};

const Members = () => {
  const [members, setMembers] = useState(initialMembers);
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeMember, setActiveMember] = useState(null);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "members"),
      (snapshot) => {
        const collectionMembers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (collectionMembers.length) {
          setMembers(collectionMembers);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Unable to load members:", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const states = useMemo(() => [...new Set(members.map((member) => member.state).filter(Boolean))], [members]);
  const districts = useMemo(
    () => [...new Set(members.filter((member) => (stateFilter ? member.state === stateFilter : true)).map((member) => member.district).filter(Boolean))],
    [members, stateFilter]
  );
  const cities = useMemo(
    () => [...new Set(members
      .filter((member) => (stateFilter ? member.state === stateFilter : true))
      .filter((member) => (districtFilter ? member.district === districtFilter : true))
      .map((member) => member.city)
      .filter(Boolean))],
    [members, stateFilter, districtFilter]
  );
  const bloodGroups = useMemo(() => [...new Set(members.map((member) => member.bloodGroup).filter(Boolean))], [members]);
  const genders = useMemo(() => [...new Set(members.map((member) => member.gender).filter(Boolean))], [members]);
  const statuses = ["pending", "approved", "rejected"];

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const memberDate = parseDate(member.createdAt);
      const searchMatch =
        member.fullName?.toLowerCase().includes(query) ||
        member.memberId?.toLowerCase().includes(query) ||
        member.mobileNumber?.includes(query);

      const stateMatch = stateFilter ? member.state === stateFilter : true;
      const districtMatch = districtFilter ? member.district === districtFilter : true;
      const cityMatch = cityFilter ? member.city === cityFilter : true;
      const bloodGroupMatch = bloodGroupFilter ? member.bloodGroup === bloodGroupFilter : true;
      const genderMatch = genderFilter ? member.gender === genderFilter : true;
      const statusMatch = statusFilter ? member.status === statusFilter : true;

      let dateMatch = true;
      if (dateFilter !== "all" && memberDate) {
        if (dateFilter === "today") {
          dateMatch = memberDate.isSame(dayjs(), "day");
        } else if (dateFilter === "yesterday") {
          dateMatch = memberDate.isSame(dayjs().subtract(1, "day"), "day");
        } else if (dateFilter === "thisWeek") {
          dateMatch = memberDate.isSame(dayjs(), "week");
        } else if (dateFilter === "thisMonth") {
          dateMatch = memberDate.isSame(dayjs(), "month");
        } else if (dateFilter === "custom") {
          const from = dayjs(customFrom);
          const to = dayjs(customTo);
          dateMatch = customFrom && customTo ? memberDate.isBetween(from, to, "day", "[]") : true;
        }
      }

      return searchMatch && stateMatch && districtMatch && cityMatch && bloodGroupMatch && genderMatch && statusMatch && dateMatch;
    });
  }, [members, search, stateFilter, districtFilter, cityFilter, bloodGroupFilter, genderFilter, statusFilter, dateFilter, customFrom, customTo]);

  const selectedMembers = useMemo(() => members.filter((member) => selectedIds.includes(member.id)), [members, selectedIds]);
  const allSelected = filteredMembers.length > 0 && filteredMembers.every((member) => selectedIds.includes(member.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(filteredMembers.map((member) => member.id));
  };

  const toggleSelectRow = (id) => {
    setSelectedIds((current) => (current.includes(id) ? current.filter((selected) => selected !== id) : [...current, id]));
  };

  const downloadCard = (member, pdf) => {
    const document = pdf ?? new jsPDF({ unit: "pt", format: "a4" });
    document.setFillColor(7, 27, 76);
    document.rect(40, 40, 515, 210, "F");
    document.setFontSize(28);
    document.setTextColor(242, 211, 92);
    document.text("GRK Fans Club", 70, 95);
    document.setFontSize(18);
    document.setTextColor(255, 255, 255);
    document.text(`Member ID: ${member.memberId}`, 70, 130);
    document.text(`Name: ${member.fullName}`, 70, 155);
    document.text(`Mobile: ${member.mobileNumber}`, 70, 180);
    document.text(`State: ${member.state}`, 70, 205);
    document.text(`Blood Group: ${member.bloodGroup}`, 70, 230);
    document.setFontSize(12);
    document.setTextColor(180, 180, 180);
    document.text("Official GRK membership card", 70, 255);
    return document;
  };

  const downloadSelectedCards = () => {
    if (!selectedMembers.length) {
      window.alert("Select members to download cards.");
      return;
    }

    const document = new jsPDF({ unit: "pt", format: "a4" });
    selectedMembers.forEach((member, index) => {
      if (index > 0) {
        document.addPage();
      }
      downloadCard(member, document);
    });
    document.save("grk-members-cards.pdf");
  };

  const exportSelectedToExcel = async () => {
    if (!selectedMembers.length) {
      window.alert("Select members first to export.");
      return;
    }

    try {
      const XLSX = await import("xlsx");
      const worksheet = XLSX.utils.json_to_sheet(
        selectedMembers.map((member) => ({
          MemberID: member.memberId,
          Name: member.fullName,
          Mobile: member.mobileNumber,
          Email: member.email,
          State: member.state,
          District: member.district,
          City: member.city,
          BloodGroup: member.bloodGroup,
          Gender: member.gender,
          Status: member.status,
          Registered: formatDate(member.createdAt),
        }))
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
      XLSX.writeFile(workbook, "grk-selected-members.xlsx");
    } catch (error) {
      window.alert("Unable to export selected members. Please try again.");
      console.error(error);
    }
  };

  const updateMemberStatus = async (memberId, status) => {
    try {
      const memberRef = doc(db, "members", memberId);
      await updateDoc(memberRef, {
        status,
        approvedAt: status === "approved" ? serverTimestamp() : null,
        approvedBy: status === "approved" ? "admin" : null,
      });
      setSelectedIds((current) => current.filter((id) => id !== memberId));
    } catch (error) {
      console.error("Unable to update member status:", error);
      window.alert("Unable to update member status. Please try again.");
    }
  };

  const handleBulkAction = async (status) => {
    if (!selectedIds.length) {
      window.alert("Select members to update status.");
      return;
    }

    if (!window.confirm(`Confirm ${status} selected members?`)) {
      return;
    }

    try {
      await Promise.all(
        selectedIds.map((id) =>
          updateDoc(doc(db, "members", id), {
            status,
            approvedAt: status === "approved" ? serverTimestamp() : null,
            approvedBy: status === "approved" ? "admin" : null,
          })
        )
      );
      setSelectedIds([]);
    } catch (error) {
      console.error("Unable to update selected members:", error);
      window.alert("Unable to update selected members. Please try again.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) {
      window.alert("Select members to delete.");
      return;
    }
    if (!window.confirm("Delete selected members permanently?")) {
      return;
    }

    try {
      await Promise.all(selectedIds.map((id) => deleteDoc(doc(db, "members", id))));
      setSelectedIds([]);
    } catch (error) {
      console.error("Unable to delete selected members:", error);
      window.alert("Unable to delete selected members. Please try again.");
    }
  };

  const viewMember = (member) => {
    setActiveMember(member);
  };

  const closeDrawer = () => {
    setActiveMember(null);
  };

  const changeMemberStatus = async (member, status) => {
    if (!window.confirm(`Confirm ${status} for ${member.fullName}?`)) {
      return;
    }
    await updateMemberStatus(member.id, status);
    setActiveMember(null);
  };

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] border border-white/10 bg-[#0C1E4D]/90 p-8 shadow-[0_35px_100px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#F2D35C]/80">Members</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Member Management</h1>
        <p className="mt-3 max-w-2xl text-gray-300">
          Search, filter, export, and manage club members. This admin page supports bulk approvals, rejections, exports, and membership card downloads.
        </p>
      </header>

      <section className="grid gap-4 xl:grid-cols-[1.45fr_0.55fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[#0E2B54]/90 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
          <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
            <div>
              <label className="block text-sm font-medium text-gray-200">Search</label>
              <div className="mt-2 flex items-center gap-3 rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3">
                <FiSearch className="h-5 w-5 text-[#F2D35C]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, member ID, or mobile"
                  className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-200">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3 text-white outline-none"
                >
                  <option value="">All Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status} className="bg-[#0E2B54] text-white">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">Date Filter</label>
                <select
                  value={dateFilter}
                  onChange={(e) => {
                    setDateFilter(e.target.value);
                    setCustomFrom("");
                    setCustomTo("");
                  }}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3 text-white outline-none"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="thisWeek">This Week</option>
                  <option value="thisMonth">This Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>
          </div>

          {dateFilter === "custom" && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-200">From</label>
                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">To</label>
                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                  className="mt-2 w-full rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3 text-white outline-none"
                />
              </div>
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-200">State</label>
              <select
                value={stateFilter}
                onChange={(e) => {
                  setStateFilter(e.target.value);
                  setDistrictFilter("");
                  setCityFilter("");
                }}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3 text-white outline-none"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state} className="bg-[#0E2B54] text-white">
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">District</label>
              <select
                value={districtFilter}
                onChange={(e) => {
                  setDistrictFilter(e.target.value);
                  setCityFilter("");
                }}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3 text-white outline-none"
              >
                <option value="">All Districts</option>
                {districts.map((district) => (
                  <option key={district} value={district} className="bg-[#0E2B54] text-white">
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">City</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3 text-white outline-none"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-[#0E2B54] text-white">
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-200">Blood Group</label>
              <select
                value={bloodGroupFilter}
                onChange={(e) => setBloodGroupFilter(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3 text-white outline-none"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map((bloodGroup) => (
                  <option key={bloodGroup} value={bloodGroup} className="bg-[#0E2B54] text-white">
                    {bloodGroup}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">Gender</label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-[#071B4C] px-4 py-3 text-white outline-none"
              >
                <option value="">All Genders</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender} className="bg-[#0E2B54] text-white">
                    {gender}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={() => handleBulkAction("approved")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#10B981] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#059669]"
            >
              <FiCheckCircle className="h-4 w-4" /> Bulk Approve
            </button>
            <button
              onClick={() => handleBulkAction("rejected")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#EF4444] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#DC2626]"
            >
              <FiXCircle className="h-4 w-4" /> Bulk Reject
            </button>
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8B5CF6] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#7C3AED]"
            >
              <FiTrash2 className="h-4 w-4" /> Delete Selected
            </button>
            <button
              onClick={downloadSelectedCards}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#2563eb]"
            >
              <FiFileText className="h-4 w-4" /> Download Cards
            </button>
            <button
              onClick={exportSelectedToExcel}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F2D35C] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-[#071B4C] transition hover:bg-[#e5cc4a]"
            >
              <FiDownload className="h-4 w-4" /> Export Excel
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
          <p className="text-sm uppercase tracking-[0.28em] text-[#F2D35C]/80">Quick Summary</p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-[#0B204F]/80 p-5">
              <p className="text-sm text-gray-400">Total Members in System</p>
              <p className="mt-2 text-3xl font-semibold text-white">{members.length}</p>
            </div>
            <div className="rounded-3xl bg-[#0B204F]/80 p-5">
              <p className="text-sm text-gray-400">Selected Members</p>
              <p className="mt-2 text-3xl font-semibold text-white">{selectedIds.length}</p>
            </div>
            <div className="rounded-3xl bg-[#0B204F]/80 p-5">
              <p className="text-sm text-gray-400">Filtered Results</p>
              <p className="mt-2 text-3xl font-semibold text-white">{filteredMembers.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C1E4D]/90 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-[#071B4C]/90 text-left text-xs uppercase tracking-[0.3em] text-gray-400">
              <tr>
                <th className="px-5 py-4 w-16">
                  <label className="flex items-center gap-2 text-white">
                    <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} className="h-4 w-4 rounded border-white/20 bg-[#0B204F] text-[#F2D35C] focus:ring-[#F2D35C]" />
                  </label>
                </th>
                <th className="px-5 py-4">Photo / Member ID</th>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Mobile</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Blood Group</th>
                <th className="px-5 py-4">Registered</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredMembers.map((member) => {
                const initials = member.fullName?.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <tr key={member.id} className="bg-[#071B4C]/70 hover:bg-[#091a3d]/90 transition-colors">
                    <td className="px-5 py-4 align-top">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(member.id)}
                        onChange={() => toggleSelectRow(member.id)}
                        className="h-4 w-4 rounded border-white/20 bg-[#0B204F] text-[#F2D35C] focus:ring-[#F2D35C]"
                      />
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#F2D35C]/10 text-[#F2D35C] font-semibold">
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{member.memberId}</p>
                          <p className="mt-1 text-xs text-gray-400">{member.gender}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top text-white">{member.fullName}</td>
                    <td className="px-5 py-4 align-top text-white">{member.mobileNumber}</td>
                    <td className="px-5 py-4 align-top text-white">
                      <p>{member.state}</p>
                      <p className="mt-1 text-xs text-gray-400">{member.district}, {member.city}</p>
                    </td>
                    <td className="px-5 py-4 align-top text-white">{member.bloodGroup}</td>
                    <td className="px-5 py-4 align-top text-white">{formatDate(member.createdAt)}</td>
                    <td className="px-5 py-4 align-top">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${buildStatusPill(member.status)}`}>
                        {member.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => viewMember(member)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10"
                        >
                          <FiEye className="h-3.5 w-3.5" /> View
                        </button>
                        <button
                          onClick={() => downloadCard(member).save(`${member.memberId}-card.pdf`)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#F2D35C]/10 px-3 py-2 text-xs text-[#F2D35C] transition hover:bg-[#F2D35C]/20"
                        >
                          <FiFileText className="h-3.5 w-3.5" /> Card
                        </button>
                        <button
                          onClick={() => handleBulkAction(member.status === "approved" ? "rejected" : "approved")}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#3B82F6]/10 px-3 py-2 text-xs text-white transition hover:bg-white/10"
                        >
                          {member.status === "approved" ? <FiXCircle className="h-3.5 w-3.5" /> : <FiCheckCircle className="h-3.5 w-3.5" />}
                          {member.status === "approved" ? "Reject" : "Approve"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {activeMember && (
        <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#071B4C]/95 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#F2D35C]/80">Member Details</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{activeMember.fullName}</h2>
            </div>
            <button onClick={closeDrawer} className="text-gray-300 transition hover:text-white">
              Close
            </button>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#F2D35C]/10 text-3xl font-semibold text-[#F2D35C]">
                {activeMember.fullName
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-gray-400">Member ID</p>
                <p className="mt-1 text-xl font-semibold text-white">{activeMember.memberId}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
                <p className="text-sm text-gray-400">Mobile</p>
                <p className="mt-2 text-white">{activeMember.mobileNumber}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
                <p className="text-sm text-gray-400">WhatsApp</p>
                <p className="mt-2 text-white">{activeMember.mobileNumber}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
                <p className="text-sm text-gray-400">Email</p>
                <p className="mt-2 text-white">{activeMember.email}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
                <p className="text-sm text-gray-400">Date of Birth</p>
                <p className="mt-2 text-white">{activeMember.dob || "—"}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
                <p className="text-sm text-gray-400">Gender</p>
                <p className="mt-2 text-white">{activeMember.gender || "—"}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
                <p className="text-sm text-gray-400">Blood Group</p>
                <p className="mt-2 text-white">{activeMember.bloodGroup || "—"}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
                <p className="text-sm text-gray-400">State</p>
                <p className="mt-2 text-white">{activeMember.state}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
                <p className="text-sm text-gray-400">District</p>
                <p className="mt-2 text-white">{activeMember.district}</p>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
              <p className="text-sm text-gray-400">City</p>
              <p className="mt-2 text-white">{activeMember.city}</p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
              <p className="text-sm text-gray-400">Address</p>
              <p className="mt-2 text-white">{activeMember.address || "No address added"}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
                <p className="text-sm text-gray-400">Registered Date</p>
                <p className="mt-2 text-white">{formatDate(activeMember.createdAt)}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-[#0B204F]/80 p-5">
                <p className="text-sm text-gray-400">Status</p>
                <p className="mt-2 text-white">{activeMember.status}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => changeMemberStatus(activeMember, "approved")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#10B981] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#059669]"
              >
                <FiCheckCircle className="h-4 w-4" /> Approve
              </button>
              <button
                onClick={() => changeMemberStatus(activeMember, "rejected")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#EF4444] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#DC2626]"
              >
                <FiXCircle className="h-4 w-4" /> Reject
              </button>
              <button
                onClick={() => downloadCard(activeMember).save(`${activeMember.memberId}-card.pdf`)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3B82F6] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#2563eb]"
              >
                <FiFileText className="h-4 w-4" /> Download Card
              </button>
              <button
                onClick={async () => {
                  if (!window.confirm("Delete this member?")) return;
                  await deleteDoc(doc(db, "members", activeMember.id));
                  closeDrawer();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8B5CF6] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#7C3AED]"
              >
                <FiTrash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Members;
