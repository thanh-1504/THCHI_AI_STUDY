import Button from "../../components/Button";
import CoursesModal from "./components/CoursesModal";
import useUIStore from "../../store/useUIStore";
import { ArrowLeft } from "lucide-react";
import TitleCourse from "../../components/TitleCourse";
import ItemTopic from "../../components/ItemTopic";
import RecommendationUI from "../../components/RecommendationUI";
const Learn = () => {
  const { isOpenModal, setIsOpenModal, isSelectedCourse, setIsSelectedCourse } = useUIStore()
  return (
    <div className="relative min-h-screen">
      {isOpenModal && <CoursesModal ></CoursesModal>}
      {/*If user haven't chosen a lesson yet*/}
      {!isSelectedCourse && <RecommendationUI isOpenModal />}
      {/*If user chosen a lesson*/}
      {isSelectedCourse && <div>
        <div onClick={() => setIsSelectedCourse(false)} className="flex items-center gap-x-2 text-gray-400 hover:text-text-yellow cursor-pointer hover:transition-colors duration-150">
          <ArrowLeft size={18} />
          <span>Xem danh sách khóa học</span>
        </div>
        <div>
          <TitleCourse label="1000 từ cơ bản"></TitleCourse>
          <div className="px-26 flex flex-col gap-y-5">
            <ItemTopic></ItemTopic>
            <ItemTopic></ItemTopic>
            <ItemTopic></ItemTopic>
            <ItemTopic></ItemTopic>
            <ItemTopic></ItemTopic>
            <ItemTopic></ItemTopic>
          </div>
        </div>
      </div>}

    </div>
  );
};
export default Learn;
