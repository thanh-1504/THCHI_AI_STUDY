import {
  ArrowRightLeft,
  BookOpen,
  ChevronDown,
  House,
  NotebookText,
  Settings,
  UserRoundCog,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import PremiumIcon from "../components/icons/PremiumIcon";

const AdminLayout = () => {
  const location = useLocation();

  // Auto-open the accordion if we're on a course/lesson route
  const isCourseRoute =
    location.pathname.startsWith("/admin/courses") ||
    location.pathname.startsWith("/admin/lessons");

  const [courseOpen, setCourseOpen] = useState(isCourseRoute);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-x-3 cursor-pointer pl-8 py-3 rounded-lg transition-colors duration-150 hover:text-white ${
      isActive
        ? "bg-white text-yellow-500 font-semibold"
        : "hover:bg-yellow-500 text-black font-medium"
    }`;

  return (
    <div className="flex">
      {/* Sidebar Admin */}
      <aside className="min-h-screen min-w-[20%] max-w-[20%] bg-yellow-400 px-2">
        {/* User Information */}
        <div className="flex items-center justify-center gap-x-2 pt-5">
          <img
            className="w-13 h-13 object-cover rounded-full"
            src="https://plus.unsplash.com/premium_photo-1688676796006-bbd1599bbfb6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User avatar"
          />
          <div>
            <p className="text-black font-medium">Dương Nhật Thành</p>
            <p className="text-black font-medium text-sm text-center">Administrator</p>
          </div>
        </div>

        <nav className="flex flex-col mt-5">
          {/* Dashboard */}
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            <House size={21} />
            <span>Dashboard</span>
          </NavLink>

          {/* Người dùng */}
          <NavLink to="/admin/users" className={navLinkClass}>
            <UserRoundCog size={21} />
            <span>Người dùng</span>
          </NavLink>

          {/* Gói Premium */}
          <NavLink to="/admin/premiums" className={navLinkClass}>
            <PremiumIcon />
            <span>Gói Premium</span>
          </NavLink>

          {/* Giao dịch */}
          <NavLink to="/admin/transaction" className={navLinkClass}>
            <ArrowRightLeft size={21} />
            <span>Giao dịch</span>
          </NavLink>

          {/* ── Khóa học & Bài học (accordion) ── */}
          <div>
            {/* Parent toggle button */}
            <button
              onClick={() => setCourseOpen((prev) => !prev)}
              className={`w-full flex items-center gap-x-3 cursor-pointer pl-8 pr-3 py-3 rounded-lg transition-colors duration-150 font-medium
                ${
                  isCourseRoute
                    ? "bg-white text-yellow-500 font-semibold"
                    : "text-black hover:bg-yellow-500 hover:text-white"
                }`}
            >
              <BookOpen size={21} className="flex-shrink-0" />
              <span className="flex-1 text-left">Khóa học &amp; Bài học</span>
              <ChevronDown
                size={16}
                className={`flex-shrink-0 transition-transform duration-200 ${
                  courseOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Sub-items */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                courseOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {/* "Khóa học" is active only on the course list page */}
              <NavLink
                to="/admin/courses"
                end
                className={() => {
                  const isActive = location.pathname === "/admin/courses";
                  return `flex items-center gap-x-3 cursor-pointer pl-14 py-2.5 rounded-lg transition-colors duration-150 text-sm ${
                    isActive
                      ? "text-white font-semibold bg-yellow-500"
                      : "text-black font-medium hover:bg-yellow-500 hover:text-white"
                  }`;
                }}
              >
                • Khóa học
              </NavLink>
              {/* "Bài học" is active when viewing a course detail (/admin/courses/:id) or /admin/lessons */}
              <NavLink
                to="/admin/lessons"
                className={() => {
                  const isActive =
                    location.pathname.startsWith("/admin/lessons") ||
                    /^\/admin\/courses\/\d+/.test(location.pathname);
                  return `flex items-center gap-x-3 cursor-pointer pl-14 py-2.5 rounded-lg transition-colors duration-150 text-sm ${
                    isActive
                      ? "text-white font-semibold bg-yellow-500"
                      : "text-black font-medium hover:bg-yellow-500 hover:text-white"
                  }`;
                }}
              >
                • Bài học
              </NavLink>
            </div>
          </div>

          {/* Cài đặt hệ thống */}
          <NavLink to="/admin/settings" className={navLinkClass}>
            <Settings size={21} />
            <span>Cài đặt hệ thống</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
