const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-xl bg-(image:--my-gradient) text-white px-12 py-4 rounded-2xl font-semibold hover:cursor-pointer hover:opacity-80 transition-opacity"
    >
      {children}
    </button>
  );
};
export default Button;
