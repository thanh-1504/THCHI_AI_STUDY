import FillInTheBlank from "../Study-Shared/cards/FillInTheBlank";
import ActionButton from "../Study-Shared/shared/ActionButton";
import LearningProgress from "../Study-Shared/shared/LearningProgress";
import ProgressBar from "../Study-Shared/shared/ProgressBar";
import LearningLayout from "./layouts/LearningLayout";

const Learning = () => {
  return (
    <div>
      <LearningLayout>
        {/* ── Left: card + controls ── */}
        <div className="flex flex-col min-w-[520px]">
          <ProgressBar currentStep={8} totalSteps={20} />
          <FillInTheBlank />
          <ActionButton />
        </div>

        {/* ── Right: progress sidebar ── */}
        <LearningProgress learned={8} total={20} streak={12} />
      </LearningLayout>
    </div>
  );
};

export default Learning;
