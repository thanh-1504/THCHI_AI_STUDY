import { AlertTriangle, CheckCircle, Crown, Eye, Filter, Printer, User, X } from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const generateTransactions = () => {
  const plans = ["Premium 1 Tháng", "Premium 3 Tháng", "Premium 1 Năm"];
  const prices = {
    "Premium 1 Tháng": 99000,
    "Premium 3 Tháng": 258000,
    "Premium 1 Năm": 799000,
  };
  const methods = ["Momo", "VNPay", "Thẻ ATM"];
  const statuses = ["Thành công", "Thành công", "Thành công", "Thất bại"];
  const emails = [
    "nguyenvana@gmail.com",
    "tranthib@gmail.com",
    "levanc@gmail.com",
    "phamthid@gmail.com",
    "hoangvane@gmail.com",
    "dangthif@gmail.com",
    "buithig@gmail.com",
    "vothih@gmail.com",
    "lydoi@gmail.com",
    "tranvanj@gmail.com",
  ];

  return Array.from({ length: 1520 }, (_, i) => {
    const id = 1520 - i;
    const plan = plans[i % 3];
    const method = methods[i % 3];
    const status = statuses[i % 4];
    const date = new Date(
      2024,
      4,
      (Math.floor(i / 6) % 28) + 1,
      i % 24,
      (i * 7) % 60,
    );
    return {
      id,
      code: `GD${12345678 - i}`,
      email: emails[i % emails.length],
      plan,
      amount: prices[plan],
      method,
      status,
      date: date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });
};

const ALL_TRANSACTIONS = generateTransactions();
const ITEMS_PER_PAGE_OPTIONS = [6, 10, 20, 50];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN").format(price) + "đ";

const StatusBadge = ({ status }) => {
  const styles =
    status === "Thành công"
      ? "text-green-500 font-semibold"
      : "text-red-500 font-semibold";
  return <span className={styles}>{status}</span>;
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────
const InfoRow = ({ label, value, valueClass = "" }) => (
  <div className="flex justify-between items-start py-2.5 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className={`text-sm font-medium text-gray-700 text-right max-w-[55%] ${valueClass}`}>
      {value}
    </span>
  </div>
);

const DetailModal = ({ tx, onClose }) => {
  if (!tx) return null;

  const isFailed = tx.status === "Thất bại";

  // Derive some mock extra fields from the transaction
  const userId = `USR${String(tx.id % 1000).padStart(3, "0")}`;
  const fullName = tx.email.split("@")[0];
  const startDate = tx.date.split(" ")[0]; // "dd/MM/yyyy"
  const [d, m, y] = startDate.split("/").map(Number);
  const endMonth = tx.plan === "Premium 1 Năm" ? m + 12 : tx.plan === "Premium 3 Tháng" ? m + 3 : m + 1;
  const endDate = `${String(d).padStart(2, "0")}/${String(endMonth > 12 ? endMonth - 12 : endMonth).padStart(2, "0")}/${y + (endMonth > 12 ? 1 : 0)}`;
  const thirdPartyRef = `${tx.method === "Momo" ? "MoMo" : tx.method}${Math.floor(Math.random() * 9000000000) + 1000000000}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Chi tiết giao dịch</h3>
            <p className="text-sm text-gray-400 mt-0.5">
              Mã giao dịch:{" "}
              <span className="font-semibold text-yellow-500">{tx.code}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer mt-0.5"
          >
            <X size={15} className="text-gray-500" />
          </button>
        </div>

        {/* ── 3 Info Panels ── */}
        <div className="px-6 pt-5 pb-2">
          <div className="grid grid-cols-3 gap-4">
            {/* Panel 1 – Transaction info */}
            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                  <CheckCircle size={16} className="text-pink-500" />
                </div>
                <span className="text-sm font-semibold text-gray-700">1. Thông tin giao dịch</span>
              </div>
              <InfoRow label="Mã giao dịch" value={tx.code} />
              <InfoRow label="Ngày & giờ giao dịch" value={tx.date} />
              <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
                <span className="text-sm text-gray-500">Trạng thái</span>
                {isFailed ? (
                  <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"></span>
                    Thất bại
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-500 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <CheckCircle size={12} />
                    Thành công
                  </span>
                )}
              </div>
              <InfoRow label="Phương thức thanh toán" value={tx.method} />
              <InfoRow label="Số tiền" value={formatPrice(tx.amount)} valueClass="font-bold text-yellow-500" />
              <InfoRow label="Mã tham chiếu bên thứ 3" value={thirdPartyRef} />
            </div>

            {/* Panel 2 – User info */}
            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                  <User size={16} className="text-purple-500" />
                </div>
                <span className="text-sm font-semibold text-gray-700">2. Thông tin người dùng</span>
              </div>
              <InfoRow label="Họ tên" value={fullName} />
              <InfoRow label="Email" value={tx.email} />
              <InfoRow label="ID người dùng" value={userId} />
            </div>

            {/* Panel 3 – Premium plan info */}
            <div className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <Crown size={16} className="text-yellow-500" />
                </div>
                <span className="text-sm font-semibold text-gray-700">3. Thông tin gói Premium</span>
              </div>
              <InfoRow label="Tên gói" value={tx.plan} />
              <InfoRow label="Ngày bắt đầu" value={startDate} />
              <InfoRow label="Ngày hết hạn" value={endDate} />
              <div className="flex justify-between items-center py-2.5">
                <span className="text-sm text-gray-500">Trạng thái gói hiện tại</span>
                <span className="inline-flex items-center bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                  Hoạt động
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Failure Info Section (conditional) ── */}
        {isFailed && (
          <div className="mx-6 mt-3 mb-2 border border-red-100 bg-red-50/60 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="text-sm font-semibold text-red-600">4. Thông tin thất bại</span>
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              <div>
                <p className="text-xs text-gray-500 mb-1">Lý do thất bại</p>
                <p className="text-sm text-gray-700">Giao dịch bị hủy bởi người dùng</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Thời điểm thất bại</p>
                <p className="text-sm text-gray-700">{tx.date}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── Footer Buttons ── */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 mt-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Đóng
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-yellow-400 hover:bg-yellow-500 rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            <Printer size={15} />
            In hóa đơn
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const AdminTransaction = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Filters
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Detail modal
  const [detail, setDetail] = useState(null);

  // ── Filter logic ─────────────────────────────────────────────────────────
  const filtered = ALL_TRANSACTIONS.filter((tx) => {
    const q = search.toLowerCase();
    if (
      q &&
      !tx.email.toLowerCase().includes(q) &&
      !tx.code.toLowerCase().includes(q)
    )
      return false;
    if (planFilter !== "all" && tx.plan !== planFilter) return false;
    if (statusFilter !== "all" && tx.status !== statusFilter) return false;
    return true;
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, pageCount - 1);
  const offset = safePage * itemsPerPage;
  const paginated = filtered.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => setCurrentPage(selected);

  const handleFilter = () => {
    setCurrentPage(0);
  };

  const plans = ["Premium 1 Tháng", "Premium 3 Tháng", "Premium 1 Năm"];

  return (
    <>
      <DetailModal tx={detail} onClose={() => setDetail(null)} />
      <div className="min-h-screen bg-gray-50 p-6 space-y-5">
        {/* ── Page Header ── */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý giao dịch
          </h1>
        </div>

        {/* ── Filter Bar ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm theo email, mã giao dịch..."
              className="flex-1 min-w-[200px] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all"
            />

            {/* Plan filter */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all cursor-pointer"
            >
              <option value="all">Tất cả gói</option>
              {plans.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all cursor-pointer"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="Thành công">Thành công</option>
              <option value="Thất bại">Thất bại</option>
            </select>

            {/* From date */}
            <div className="relative">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="Từ ngày"
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all cursor-pointer"
              />
            </div>

            {/* To date */}
            <div className="relative">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="Đến ngày"
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 transition-all cursor-pointer"
              />
            </div>

            {/* Filter button */}
            <button
              onClick={handleFilter}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer shadow-sm whitespace-nowrap ml-auto"
            >
              <Filter size={15} />
              Lọc
            </button>
          </div>
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {[
                    "ID",
                    "Mã giao dịch",
                    "Gói",
                    "Số Tiền",
                    "Phương thức",
                    "Trạng thái",
                    "Thao tác",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-4 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="text-center py-16 text-gray-400 text-sm"
                    >
                      Không tìm thấy giao dịch nào
                    </td>
                  </tr>
                ) : (
                  paginated.map((tx, idx) => (
                    <tr
                      key={tx.id}
                      className={`hover:bg-yellow-50/30 transition-colors duration-100 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                      }`}
                    >
                      {/* ID */}
                      <td className="px-5 py-4 text-sm text-gray-500 font-medium w-12">
                        {offset + idx + 1}
                      </td>

                      {/* Code */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold text-gray-700">
                          {tx.code}
                        </span>
                      </td>

                      {/* Plan */}
                      <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {tx.plan}
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold text-gray-700">
                          {formatPrice(tx.amount)}
                        </span>
                      </td>

                      {/* Method */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {tx.method}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={tx.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <button
                          title="Xem chi tiết"
                          onClick={() => setDetail(tx)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 transition-all cursor-pointer"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination Footer ── */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
            {/* Info */}
            <p className="text-sm text-gray-500">
              Hiển thị{" "}
              <span className="font-semibold text-gray-700">
                {filtered.length === 0 ? 0 : offset + 1} –{" "}
                {Math.min(offset + itemsPerPage, filtered.length)}
              </span>{" "}
              trong tổng số{" "}
              <span className="font-semibold text-gray-700">
                {filtered.length}
              </span>
            </p>

            {/* react-paginate */}
            <ReactPaginate.default
              pageCount={pageCount}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              forcePage={safePage}
              onPageChange={handlePageChange}
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              containerClassName="flex items-center gap-1"
              pageLinkClassName="w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              activeClassName=""
              activeLinkClassName="!bg-yellow-400 !text-white shadow-sm"
              previousClassName=""
              previousLinkClassName="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer font-bold"
              nextClassName=""
              nextLinkClassName="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer font-bold"
              breakLinkClassName="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
              disabledLinkClassName="opacity-30 cursor-not-allowed pointer-events-none"
            />

            {/* Items per page */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Hiển thị</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(0);
                }}
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer"
              >
                {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTransaction;
