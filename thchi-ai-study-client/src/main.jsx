import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./routes/routes";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
