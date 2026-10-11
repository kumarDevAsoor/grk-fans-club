import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function PublicLayout() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-6 md:pt-8">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default PublicLayout;