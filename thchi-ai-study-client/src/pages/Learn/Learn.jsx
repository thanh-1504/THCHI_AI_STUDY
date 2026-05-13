import { useState } from "react";
import Button from "../../components/Button";
import CoursesModal from "./components/CoursesModal";
const Learn = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative min-h-screen">
      {isOpen && <CoursesModal setIsOpen={setIsOpen}></CoursesModal>}
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
        <div>
          <img src="ThChi_ViewCourse.png" alt="Xem danh sách khóa học" />
        </div>
        <Button onClick={() => setIsOpen(true)}>Danh sách khóa học</Button>
      </div>
    </div>
  );
};
export default Learn;
