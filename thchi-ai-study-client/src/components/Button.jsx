const Button = ({ children, style = "", onClick }) => {
  const styleBase =
    "text-base px-12 py-4 rounded-3xl font-semibold hover:cursor-pointer transition-all active:translate-y-1";
  return (
    <button
      onClick={onClick}
      className={`${styleBase} ${style}`}
      // className="text-base bg-(image:--my-gradient) text-white px-12 py-4 rounded-3xl font-semibold hover:cursor-pointer hover:opacity-80 transition-all shadow-[0_5px_0_#1f8f2f] active:shadow-[0_0px_0_#1f8f2f] active:translate-y-1"
    >
      {children}
    </button>
  );
};
export default Button;
