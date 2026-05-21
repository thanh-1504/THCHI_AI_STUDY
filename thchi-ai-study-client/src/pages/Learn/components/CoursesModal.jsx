import { useEffect } from "react";
import HeaderModal from "./HeaderModal";
import ItemCourse from "./ItemCourse";
const CoursesModal = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="relative w-[65%] bg-white h-screen flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <HeaderModal />

        {/* Modal body - Vùng này sẽ đảm nhận việc cuộn nội dung */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4">
          <ItemCourse />

        </div>
      </div>
    </div>
  );
};
export default CoursesModal;
