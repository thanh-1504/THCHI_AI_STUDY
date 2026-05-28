import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import Dictionary from "../pages/Dictionary/Dictionary";
import Home from "../pages/Home";
import Learn from "../pages/Learn/Learn";
import Notebook from "../pages/Notebook/Notebook";
import NotebookActive from "../pages/Notebook/NotebookActive";
import Rank from "../pages/Rank/Rank";
import Review from "../pages/Review";

const router = createBrowserRouter([
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
        ],
      },
    ],
  },
]);
export default router;
