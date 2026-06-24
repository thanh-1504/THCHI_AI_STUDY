export const buildLearningStep = (words: []) => {
  return words.flatMap((word) => {
    return [
      { type: "FLASHCARD", word },
      { type: "FILL_IN_BLANK", word },
      { type: "LISTEN_AND_TYPE", word },
    ];
  });
};
