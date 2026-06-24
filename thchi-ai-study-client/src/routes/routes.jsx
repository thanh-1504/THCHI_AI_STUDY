import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import AdminLayout from "../layouts/AdminLayout";
import AdminCourse from "../pages/Admin/AdminCourse";
import AdminCourseDetail from "../pages/Admin/AdminCourseDetail";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminPremium from "../pages/Admin/AdminPremium";
import AdminTransaction from "../pages/Admin/AdminTransaction";
import AdminUser from "../pages/Admin/AdminUser";
import AdminUserDetail from "../pages/Admin/AdminUserDetail";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import RegisterMethod from "../pages/Auth/RegisterMethod";
import ResetPassword from "../pages/Auth/ResetPassword";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import Community from "../pages/Community/Community";
import CommunityMyPost from "../pages/Community/CommunityMyPost";
import Dictionary from "../pages/Dictionary/Dictionary";
import Home from "../pages/Home";
import Learn from "../pages/Learn/Learn";
import LearnCourseDetail from "../pages/Learn/LearnCourseDetail";
import Learning from "../pages/Learn/Learning";
import Notebook from "../pages/Notebook/Notebook";
import NotebookActive from "../pages/Notebook/NotebookActive";
import Rank from "../pages/Rank/Rank";
import Review from "../pages/Review";
import learnServices from "../services/learn.service";
const router = createBrowserRouter([
  // App Routes
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        children: [
          { path: "/dictionary", element: <Dictionary /> },
          {
            element: <Review />,
            path: "/review",
          },
          {
            element: <Learn />,
            path: "/learn",
            loader: learnServices.getCourses,
          },
          {
            element: <LearnCourseDetail />,
            path: "/learn/:id",
            loader: ({ params }) => learnServices.getCourse(params.id),
          },
          {
            element: <Notebook />,
            path: "/notebook",
          },
          {
            element: <NotebookActive />,
            path: "/notebook/word-active",
          },
          {
            element: <Rank />,
            path: "/rank",
          },
          {
            element: <Community />,
            path: "/community",
          },
          {
            path: "/community/my-post",
            element: <CommunityMyPost />,
          },
        ],
      },
    ],
  },

  // Learning Route
  {
    path: "/learning/:topicId",
    element: <Learning />,
    loader: ({ params }) => {
      return learnServices.getTopicIncludeWord(params.topicId);
    },
  },

  // User Auth Routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterMethod />,
  },
  {
    path: "/register-email",
    element: <Register />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  // Admin Auth Routes
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/users", element: <AdminUser /> },
      { path: "/admin/users/:id", element: <AdminUserDetail /> },
      { path: "/admin/premiums", element: <AdminPremium /> },
      { path: "/admin/transaction", element: <AdminTransaction /> },
      { path: "/admin/courses", element: <AdminCourse /> },
      { path: "/admin/courses/:id", element: <AdminCourseDetail /> },
    ],
  },
]);
export default router;
