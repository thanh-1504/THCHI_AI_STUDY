import { Outlet } from "react-router-dom";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";

const Home = () => {
  return (
    <div className="flex items-start min-h-screen bg-white">
      {/* Sidebar Left */}
      <SidebarLeft></SidebarLeft>

      {/* Main Content */}
      <div className="w-[60%] p-6">
        {/* <Chart /> */}
        <Outlet />
      </div>

      {/* Sidebar Right */}
      <SidebarRight></SidebarRight>
    </div>
  );
};

export default Home;
