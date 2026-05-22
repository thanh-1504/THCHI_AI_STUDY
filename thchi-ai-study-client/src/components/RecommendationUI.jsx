import Button from "./Button"
import useUIStore from "../store/useUIStore";
import { useNavigate } from "react-router-dom";

const RecommendationUI = ({ isOpenModal = false, imgUrl = "ThChi_ViewCourse.png", textButton = "Danh sách khóa học" }) => {
    const navigate = useNavigate()
    const { setIsOpenModal } = useUIStore()
    return (
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 text-center">
            <div>
                <img src={imgUrl} alt="Xem danh sách khóa học" className="w-80 h-80 object-contain -mb-13" />
            </div>
            <div className="mb-8">
                <p className="font-semibold text-xl">Chưa có từ vựng nào trong sổ tay.</p>
                <p className="font-semibold text-xl">Hãy học 1 bài từ để cập nhật sổ tay</p>
            </div>
            <Button onClick={isOpenModal ? setIsOpenModal : () => navigate("/learn")}>{textButton}</Button>
        </div>
    )
}
export default RecommendationUI;