import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import Dictionary from "../pages/Dictionary/Dictionary";
import Home from "../pages/Home";
import Learn from "../pages/Learn/Learn";
import Review from "../pages/Review";
import Notebook from "../pages/Notebook/Notebook";
import NotebookActive from "../pages/Notebook/NotebookActive";

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
            path: "/notebook"
          },
          {
            element: <NotebookActive />,
            path: "/notebook/word-active"
          }
        ],
      },
    ],
  },
]);
export default router;
