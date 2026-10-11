import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import AdminRoute from "./AdminRoute";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import News from "../pages/News/News";
import State from "../pages/State/State";
import Contact from "../pages/Contact/Contact";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Membership from "../pages/Member/Membership";

import Dashboard from "../pages/admin/Dashboard";
import Members from "../pages/admin/Members";
import Movies from "../pages/admin/Movies";
import AdminNews from "../pages/admin/News";
import Events from "../pages/admin/Events";
import Committee from "../pages/admin/Committee";
import Settings from "../pages/admin/Settings";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/state" element={<State />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/membership" element={<Membership />} />
      </Route>

      {/* Admin Layout */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="movies" element={<Movies />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="events" element={<Events />} />
          <Route path="committee" element={<Committee />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;