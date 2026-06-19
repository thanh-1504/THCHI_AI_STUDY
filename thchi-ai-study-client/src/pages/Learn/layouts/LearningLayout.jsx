const LearningLayout = ({ children }) => {
  return (
    <div
      className="
      min-h-screen
      bg-[#F5F5F7]
      flex
      justify-center
      items-start
      gap-x-50
      px-10
      pt-8
      "
    >
      {children}
    </div>
  );
};

export default LearningLayout;