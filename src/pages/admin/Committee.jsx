const Committee = () => {
  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] border border-white/10 bg-[#0C1E4D]/90 p-8 shadow-[0_35px_100px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-[#F2D35C]/80">Committee</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Leadership Committee</h1>
        <p className="mt-3 max-w-2xl text-gray-300">
          Add and manage committee members for the fan club. This area will store contact details for presidents, state admins, district coordinators, and volunteers.
        </p>
      </header>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.24)]">
        <p className="text-gray-300">
          Committee management is coming soon. You can use this page to keep leadership roles and regional admins up to date.
        </p>
      </div>
    </div>
  );
};

export default Committee;
