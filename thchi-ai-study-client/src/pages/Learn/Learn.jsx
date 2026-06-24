import { Suspense } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import RecommendationUI from "../../components/RecommendationUI";
import useUIStore from "../../store/useUIStore";
import CoursesModal from "./components/CoursesModal";

const Learn = () => {
  const navigate = useNavigate();
  const { isOpenModal, setIsOpenModal, isSelectedCourse, setIsSelectedCourse } =
    useUIStore();
  const courses = useLoaderData();
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="relative min-h-screen">
        {isOpenModal && <CoursesModal courses={courses}></CoursesModal>}
        {/*If user haven't chosen a lesson yet*/}
        {!isSelectedCourse && <RecommendationUI isOpenModal />}
        {/*If user chosen a lesson*/}
        {/* {isSelectedCourse &&
          courses.length > 0 &&
          courses.map((course) => {
            return (
              <div key={course.id}>
                <div
                  onClick={() => {
                    setIsSelectedCourse(false);
                  }}
                  className="flex items-center gap-x-2 text-gray-400 hover:text-text-yellow cursor-pointer hover:transition-colors duration-150"
                >
                  <ArrowLeft size={18} />
                  <span>Xem danh sách khóa học</span>
                </div>
                <div>
                  <TitleCourse label={courses[0].title}></TitleCourse>
                  <div className="px-26 flex flex-col gap-y-5">
                    <ItemTopic></ItemTopic>
                    <ItemTopic></ItemTopic>
                    <ItemTopic></ItemTopic>
                    <ItemTopic></ItemTopic>
                    <ItemTopic></ItemTopic>
                    <ItemTopic></ItemTopic>
                  </div>
                </div>
              </div>
            );
          })} */}
      </div>
    </Suspense>
  );
};
export default Learn;
