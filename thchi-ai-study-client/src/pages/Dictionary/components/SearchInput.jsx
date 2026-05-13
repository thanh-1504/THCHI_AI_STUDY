const SearchInput = () => {
  return (
    <div className="relative flex items-center justify-center gap-5 min-h-20 px-10 rounded-xl">
      <input
        type="text"
        placeholder="Gõ vào đây từ bạn muốn tìm"
        className="bg-white p-3 w-full outline-none rounded-sm pr-15"
      />
      <img
        src="/glass.png"
        alt="glass icon"
        className="w-10 h-10 object-cover absolute top-1/2 right-13 -translate-y-1/2 hover:cursor-pointer hover:opacity-80 transition-opacity duration-75"
      />
    </div>
  );
};
export default SearchInput;
