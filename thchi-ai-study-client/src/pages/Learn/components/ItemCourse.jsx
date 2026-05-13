const ItemCourse = () => {
  return (
    <div className="px-3 py-2 bg-yellow-400 shadow-lg mt-5 mx-40 rounded-2xl hover:opacity-80 transition-opacity duration-100 hover:cursor-pointer">
      <p className="uppercase text-neutral-800 font-semibold pl-4 text-2xl mb-4 mt-2">
        1000 TỪ CƠ BẢN
      </p>
      <div>
        <div className="flex items-center">
          <img
            src="goal.png"
            alt="Mục tiêu"
            className="w-20 h-20 object-cover"
          />
          <span className="text-lg">Củng cố nền tảng tiếng anh</span>
        </div>
        <div className="flex items-center">
          <img src="hat.png" alt="hat" className="w-20 h-20 object-cover" />
          <span className="text-lg">Từ vựng nền tảng</span>
        </div>
      </div>
    </div>
  );
};
export default ItemCourse;
