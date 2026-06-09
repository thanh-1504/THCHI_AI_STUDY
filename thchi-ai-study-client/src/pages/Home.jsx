import { Outlet } from "react-router-dom";
import AchievementModal from "../components/modals/AchievementModal";
import SettingModal from "../components/modals/SettingModal";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import useUIStore from "../store/useUIStore";

const Home = () => {
  const {
    isOpenAchievementModal,
    isOpenSettingModal,
    setIsOpenAchievementModal,
    setIsOpenSettingModal,
  } = useUIStore();
  return (
    <div className="flex items-start min-h-screen bg-white">
      {/* Sidebar Left */}
      <SidebarLeft></SidebarLeft>

      {/* Main Content */}
      <div className="w-[60%] pt-0 p-6 mx-auto bg-white">
        {/* <Chart /> */}
        <Outlet />
      </div>

      {/* Sidebar Right */}
      <SidebarRight></SidebarRight>

      {isOpenAchievementModal && (
        <AchievementModal onClose={() => setIsOpenAchievementModal(false)} />
      )}
      {isOpenSettingModal && <SettingModal onClose={() => setIsOpenSettingModal(false)} />}
    </div>
  );
};

export default Home;
