import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ItemTopic from "../../components/ItemTopic";
import TitleCourse from "../../components/TitleCourse";
import useUIStore from "../../store/useUIStore";

const LearnCourseDetail = () => {
  const { setIsSelectedCourse } = useUIStore();
  const course = useLoaderData();
  useEffect(() => {
    return () => {
      setIsSelectedCourse(false);
    };
  }, []);
  return (
    <div className="">
      <div
        onClick={() => {
          setIsSelectedCourse(false);
          //   navigate(`/${course.id}`);
        }}
        className="flex items-center gap-x-2 text-gray-400 hover:text-text-yellow cursor-pointer hover:transition-colors duration-150"
      >
        <ArrowLeft size={18} />
        <span>Xem danh sách khóa học</span>
      </div>
      <div>
        <TitleCourse label={course.title}></TitleCourse>
        {course.topics && course.topics.length > 0 && (
          <div className="px-26 flex flex-col gap-y-5">
            {course.topics.map((topic) => {
              return <ItemTopic key={topic.id} topic={topic}></ItemTopic>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default LearnCourseDetail;
