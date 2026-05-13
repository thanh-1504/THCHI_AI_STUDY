const Steps = () => {
  return (
    <div className="bg-gray-100 p-5 mt-10 rounded-xl">
      {/* Step 1 */}
      <div>
        <p className="font-semibold text-lg">
          Step 1:{" "}
          <span className="font-normal ml-3 text-base">
            Nhập từ vựng vào ô tìm kiếm
          </span>
          <img
            src="input_search.png"
            alt="Thanh tìm kiếm"
            className="w-80 h-80 object-cover -mt-[100px] mx-auto"
          />
        </p>
      </div>
      {/* Step 2 */}
      <div className="-mt-25">
        <p className="font-semibold text-lg">
          Step 2:{" "}
          <span className="font-normal ml-3 text-base">
            Nhấn nút Save để lưu từ vào Sổ tay của bạn
          </span>
        </p>
      </div>
    </div>
  );
};
export default Steps;