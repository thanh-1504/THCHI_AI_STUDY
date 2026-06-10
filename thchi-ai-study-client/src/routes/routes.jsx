import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import RegisterMethod from "../pages/Auth/RegisterMethod";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import Community from "../pages/Community/Community";
import CommunityMyPost from "../pages/Community/CommunityMyPost";
import Dictionary from "../pages/Dictionary/Dictionary";
import Home from "../pages/Home";
import Learn from "../pages/Learn/Learn";
import Notebook from "../pages/Notebook/Notebook";
import NotebookActive from "../pages/Notebook/NotebookActive";
import Rank from "../pages/Rank/Rank";
import Review from "../pages/Review";
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

  // Admin Routes
  {
    path: "/admin",
    element: "",
  },
]);
export default router;
