const DetectiveGuide = () => {
  return (
    <div className="relative flex items-end gap-4 mt-6">
      <img
        src="/ThChi_Detective.png"
        alt="ThChi Detective"
        className="w-40 object-contain z-10"
      />
      <div className="relative bg-gray-100 border border-gray-200 shadow-md rounded-3xl px-6 py-5 max-w-xl">
        <div className="absolute left-[-10px] bottom-6 w-5 h-5 bg-gray-100 border-l border-b border-gray-200 rotate-45"></div>
        <p className="text-lg text-gray-700 leading-relaxed">
          Dễ dàng tra cứu từ chưa biết và lưu lại từ vựng vào Sổ tay
        </p>
      </div>
    </div>
  );
};
export default DetectiveGuide;
