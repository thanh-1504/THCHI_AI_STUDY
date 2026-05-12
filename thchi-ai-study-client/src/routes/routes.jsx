import { createBrowserRouter } from "react-router";
import App from "../app";
import Home from "../pages/Home";
import Test from "../pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "test",
        element: <Test />,
      },
    ],
  },
]);
export default router;
