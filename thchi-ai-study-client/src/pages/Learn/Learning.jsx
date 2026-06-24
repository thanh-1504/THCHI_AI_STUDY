import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { buildLearningStep } from "../../utils/build.learning.step";
import FillInTheBlank from "../Study-Shared/cards/FillInTheBlank";
import FlashcardWord from "../Study-Shared/cards/FlashcardWord";
import ListendAndType from "../Study-Shared/cards/ListenAndType";
import ActionButton from "../Study-Shared/shared/ActionButton";
import LearningProgress from "../Study-Shared/shared/LearningProgress";
import ProgressBar from "../Study-Shared/shared/ProgressBar";
import LearningLayout from "./layouts/LearningLayout";

const Learning = () => {
  const topicIncludeWords = useLoaderData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const queue = useMemo(() => {
    return buildLearningStep(topicIncludeWords.words);
  }, [topicIncludeWords]);
  const currentStep = queue[currentIndex];
  const isFinished = currentIndex >= queue.length;

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  if (isFinished) return;
  return (
    <div>
      <LearningLayout>
        {/* ── Left: card + controls ── */}
        <div className="flex flex-col min-w-[520px]">
          <ProgressBar
            currentStep={currentIndex + 1}
            totalSteps={queue.length}
          />
          {currentStep.type === "FLASHCARD" && (
            <FlashcardWord word={currentStep.word} onNext={handleNext} />
          )}
          {currentStep.type === "FILL_IN_BLANK" && (
            <FillInTheBlank word={currentStep.word} onNext={handleNext} />
          )}
          {currentStep.type === "LISTEN_AND_TYPE" && (
            <ListendAndType word={currentStep.word} onNext={handleNext} />
          )}
          <ActionButton
            step={currentStep}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>

        {/* ── Right: progress sidebar ── */}
        <LearningProgress learned={8} total={20} streak={12} />
      </LearningLayout>
    </div>
  );
};

export default Learning;
