import { useNavigate } from "react-router-dom";
import useUIStore from "../store/useUIStore";
import Button from "./Button";

const RecommendationUI = ({
  isOpenModal = false,
  text = "Chưa có từ vựng nào trong sổ tay. Hãy học 1 bài từ để cập nhật sổ tay",
  path = "/learn",
  imgUrl = "ThChi_ViewCourse.png",
  textButton = "Danh sách khóa học",
  showMoreButton = false,
}) => {
  const navigate = useNavigate();
  const { setIsOpenModal } = useUIStore();
  return (
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <div>
        <img
          src={imgUrl}
          alt="Xem danh sách khóa học"
          className="w-80 h-80 object-contain -mb-13"
        />
      </div>
      <div className="mb-8">
        <p className="font-semibold text-xl leading-relaxed  whitespace-pre-line px-1">
          {text}
        </p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <Button
          style="bg-(image:--my-gradient) text-white hover:opacity-80 shadow-[0_5px_0_#1f8f2f] active:shadow-[0_0px_0_#1f8f2f]"
          onClick={isOpenModal ? setIsOpenModal : () => navigate(path)}
        >
          {textButton}
        </Button>
        {showMoreButton && (
          <Button
            onClick={() => navigate("/learn")}
            style="bg-white text-black shadow-[0_5px_0_#e0e0e0] active:shadow-[0_0px_0_#e0e0e0] border border-[#e0e0e0]"
          >
            Học từ mới
          </Button>
        )}
      </div>
    </div>
  );
};
export default RecommendationUI;
