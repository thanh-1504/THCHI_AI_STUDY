import {
  ArrowLeft,
  BookOpen,
  Brain,
  Calendar,
  ChevronRight,
  Clock,
  CreditCard,
  History,
  Info,
  Lock,
  Mail,
  Pencil,
  Phone,
  Shield,
  TrendingUp,
  User,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ─── Mock Data (in real app, fetch by id from API) ────────────────────────────
const MOCK_USERS_DETAIL = {
  1: {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0123 456 789",
    birthday: "15/08/2000",
    gender: "Nam",
    createdAt: "12/05/2024 10:30",
    role: "User",
    status: "Hoạt động",
    userId: "#USR001",
    avatar: "NV",
    avatarColor: "bg-blue-400",
    premium: {
      plan: "Premium 3 Tháng",
      startDate: "12/05/2024",
      endDate: "12/08/2024",
      status: "Hoạt động",
    },
    stats: {
      totalCourses: 3,
      totalLessons: 47,
      totalVocab: 1256,
      masteredVocab: 892,
      reviewingVocab: 364,
    },
  },
  2: {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    phone: "0987 654 321",
    birthday: "22/03/1998",
    gender: "Nữ",
    createdAt: "11/05/2024 08:45",
    role: "User",
    status: "Hoạt động",
    userId: "#USR002",
    avatar: "TT",
    avatarColor: "bg-purple-400",
    premium: null,
    stats: {
      totalCourses: 1,
      totalLessons: 12,
      totalVocab: 340,
      masteredVocab: 200,
      reviewingVocab: 140,
    },
  },
  3: {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@gmail.com",
    phone: "0369 852 147",
    birthday: "05/12/1995",
    gender: "Nam",
    createdAt: "10/05/2024 14:20",
    role: "Premium",
    status: "Hoạt động",
    userId: "#USR003",
    avatar: "LV",
    avatarColor: "bg-green-400",
    premium: {
      plan: "Premium 1 Năm",
      startDate: "10/05/2024",
      endDate: "10/05/2025",
      status: "Hoạt động",
    },
    stats: {
      totalCourses: 8,
      totalLessons: 120,
      totalVocab: 4500,
      masteredVocab: 3200,
      reviewingVocab: 1300,
    },
  },
  4: {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@gmail.com",
    phone: "0912 345 678",
    birthday: "18/07/2001",
    gender: "Nữ",
    createdAt: "09/05/2024 09:15",
    role: "User",
    status: "Bị khóa",
    userId: "#USR004",
    avatar: "PT",
    avatarColor: "bg-pink-400",
    premium: null,
    stats: {
      totalCourses: 0,
      totalLessons: 5,
      totalVocab: 80,
      masteredVocab: 30,
      reviewingVocab: 50,
    },
  },
  5: {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@gmail.com",
    phone: "0765 432 198",
    birthday: "30/11/1993",
    gender: "Nam",
    createdAt: "08/05/2024 16:00",
    role: "Premium",
    status: "Hoạt động",
    userId: "#USR005",
    avatar: "HV",
    avatarColor: "bg-yellow-400",
    premium: {
      plan: "Premium 1 Tháng",
      startDate: "08/05/2024",
      endDate: "08/06/2024",
      status: "Hoạt động",
    },
    stats: {
      totalCourses: 5,
      totalLessons: 68,
      totalVocab: 2100,
      masteredVocab: 1500,
      reviewingVocab: 600,
    },
  },
  6: {
    id: 6,
    name: "Đặng Thị F",
    email: "dangthif@gmail.com",
    phone: "0834 567 890",
    birthday: "25/04/1999",
    gender: "Nữ",
    createdAt: "07/05/2024 11:30",
    role: "User",
    status: "Hoạt động",
    userId: "#USR006",
    avatar: "ĐT",
    avatarColor: "bg-indigo-400",
    premium: null,
    stats: {
      totalCourses: 2,
      totalLessons: 25,
      totalVocab: 600,
      masteredVocab: 400,
      reviewingVocab: 200,
    },
  },
  7: {
    id: 7,
    name: "Admin",
    email: "admin@webmochi.com",
    phone: "0911 000 000",
    birthday: "01/01/1990",
    gender: "Nam",
    createdAt: "01/05/2024 00:00",
    role: "Admin",
    status: "Hoạt động",
    userId: "#ADM001",
    avatar: "AD",
    avatarColor: "bg-orange-400",
    premium: null,
    stats: {
      totalCourses: 0,
      totalLessons: 0,
      totalVocab: 0,
      masteredVocab: 0,
      reviewingVocab: 0,
    },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    "Hoạt động": "bg-green-100 text-green-600",
    "Bị khóa": "bg-red-100 text-red-500",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        map[status] || "bg-gray-100 text-gray-400"
      }`}
    >
      {status}
    </span>
  );
};

const InfoRow = ({ icon: Icon, label, value, valueClass = "" }) => (
  <div className="flex items-start py-3 border-b border-gray-50 last:border-0">
    <div className="flex items-center gap-2 w-44 flex-shrink-0">
      <Icon size={14} className="text-gray-400" />
      <span className="text-sm text-gray-500">{label}:</span>
    </div>
    <span className={`text-sm font-medium text-gray-800 ${valueClass}`}>
      {value}
    </span>
  </div>
);

const StatRow = ({ icon: Icon, label, value, iconColor = "text-gray-400" }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
    <div className="flex items-center gap-2">
      <Icon size={15} className={iconColor} />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
    <span className="text-sm font-bold text-gray-800">
      {value.toLocaleString()}
    </span>
  </div>
);

// ─── Tab Navigation ───────────────────────────────────────────────────────────
const TABS = [
  { id: "info", label: "Thông tin chung", icon: Info },
  { id: "progress", label: "Tiến độ học tập", icon: TrendingUp },
  { id: "history", label: "Lịch sử giao dịch", icon: History },
  { id: "premium", label: "Thông tin gói Premium", icon: CreditCard },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminUserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  const user = MOCK_USERS_DETAIL[Number(id)] || MOCK_USERS_DETAIL[1];

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-5">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Chi tiết người dùng
          </h1>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mt-1">
            <button
              onClick={() => navigate("/admin/users")}
              className="text-sm text-yellow-500 hover:text-yellow-600 font-medium transition-colors cursor-pointer"
            >
              Quản lý người dùng
            </button>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-sm text-gray-400">Chi tiết người dùng</span>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/users")}
            className="flex items-center gap-2 border border-gray-200 text-gray-600 rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer bg-white shadow-sm"
          >
            <ArrowLeft size={16} />
            Quay lại
          </button>
          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer shadow-sm">
            <Lock size={16} />
            Khóa tài khoản
          </button>
          <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer shadow-sm">
            <Pencil size={16} />
            Chỉnh sửa
          </button>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-4 gap-5 items-start">
        {/* ── Left: User Card + Tabs ── */}
        <div className="col-span-1 space-y-4">
          {/* User Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            {/* Avatar */}
            <div
              className={`w-24 h-24 rounded-full ${user.avatarColor} flex items-center justify-center text-white text-3xl font-bold shadow-md mb-4 ring-4 ring-white ring-offset-2 ring-offset-gray-50`}
            >
              {user.avatar}
            </div>
            <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              User ID: {user.userId}
            </p>
            <div className="mt-3">
              <StatusBadge status={user.status} />
            </div>
          </div>

          {/* Tab Menu */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {TABS.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-all cursor-pointer
                    ${idx !== TABS.length - 1 ? "border-b border-gray-50" : ""}
                    ${
                      isActive
                        ? "bg-yellow-50 text-yellow-600 border-l-[3px] border-l-yellow-400"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                >
                  <Icon size={16} className={isActive ? "text-yellow-500" : "text-gray-400"} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right: Content ── */}
        <div className="col-span-3 space-y-4">
          {/* ── Tab: Thông tin chung ── */}
          {activeTab === "info" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {/* General Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <User size={17} className="text-yellow-500" />
                    Thông tin chung
                  </h3>
                  <InfoRow icon={UserCheck} label="Họ và tên" value={user.name} />
                  <InfoRow icon={Mail} label="Email" value={user.email} />
                  <InfoRow icon={Phone} label="Số điện thoại" value={user.phone} />
                  <InfoRow icon={Calendar} label="Ngày sinh" value={user.birthday} />
                  <InfoRow icon={User} label="Giới tính" value={user.gender} />
                  <InfoRow icon={Clock} label="Ngày tạo tài khoản" value={user.createdAt} />
                  <InfoRow icon={Shield} label="Vai trò" value={user.role} />
                </div>

                {/* Learning Stats */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-base font-bold text-gray-700 mb-4 flex items-center gap-2">
                    <TrendingUp size={17} className="text-yellow-500" />
                    Thống kê học tập
                  </h3>
                  <StatRow
                    icon={BookOpen}
                    label="Tổng khóa học đã học"
                    value={user.stats.totalCourses}
                    iconColor="text-blue-400"
                  />
                  <StatRow
                    icon={Brain}
                    label="Tổng bài học đã học"
                    value={user.stats.totalLessons}
                    iconColor="text-purple-400"
                  />
                  <StatRow
                    icon={BookOpen}
                    label="Từ vựng đã học"
                    value={user.stats.totalVocab}
                    iconColor="text-green-500"
                  />
                  <StatRow
                    icon={UserCheck}
                    label="Từ vựng đã thuộc"
                    value={user.stats.masteredVocab}
                    iconColor="text-yellow-500"
                  />
                  <StatRow
                    icon={Clock}
                    label="Từ vựng đang ôn (ngủ đông)"
                    value={user.stats.reviewingVocab}
                    iconColor="text-orange-400"
                  />
                </div>
              </div>

              {/* Premium Info */}
              {user.premium ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-base font-bold text-gray-700 mb-5 flex items-center gap-2">
                    <CreditCard size={17} className="text-yellow-500" />
                    Gói Premium hiện tại
                  </h3>
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Gói</p>
                      <p className="text-sm font-bold text-gray-700">
                        {user.premium.plan}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Ngày bắt đầu</p>
                      <p className="text-sm font-bold text-gray-700">
                        {user.premium.startDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Ngày hết hạn</p>
                      <p className="text-sm font-bold text-gray-700">
                        {user.premium.endDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Trạng thái</p>
                      <StatusBadge status={user.premium.status} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-6 text-center">
                  <CreditCard size={32} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400 font-medium">
                    Người dùng chưa đăng ký gói Premium
                  </p>
                </div>
              )}
            </>
          )}

          {/* ── Tab: Tiến độ học tập ── */}
          {activeTab === "progress" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <TrendingUp size={48} className="mx-auto text-yellow-300 mb-3" />
              <h3 className="text-base font-bold text-gray-700 mb-1">
                Tiến độ học tập
              </h3>
              <p className="text-sm text-gray-400">
                Dữ liệu tiến độ học tập của{" "}
                <span className="font-semibold text-gray-600">{user.name}</span>{" "}
                sẽ hiển thị ở đây.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-blue-600">
                    {user.stats.totalCourses}
                  </p>
                  <p className="text-xs text-blue-500 mt-1">Khóa học tham gia</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-purple-600">
                    {user.stats.totalLessons}
                  </p>
                  <p className="text-xs text-purple-500 mt-1">Bài học hoàn thành</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-2xl font-bold text-green-600">
                    {user.stats.totalVocab.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-500 mt-1">Từ vựng đã học</p>
                </div>
              </div>
            </div>
          )}

          {/* ── Tab: Lịch sử giao dịch ── */}
          {activeTab === "history" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-700 flex items-center gap-2">
                  <History size={17} className="text-yellow-500" />
                  Lịch sử giao dịch
                </h3>
              </div>
              {user.premium ? (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Mã GD", "Gói", "Số tiền", "Phương thức", "Trạng thái", "Ngày GD"].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-50 hover:bg-yellow-50/30">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        #TXN001
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">
                        {user.premium.plan}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                        249,000₫
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">MoMo</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                          Thành công
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {user.premium.startDate}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className="p-10 text-center">
                  <History size={36} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400">Chưa có giao dịch nào</p>
                </div>
              )}
            </div>
          )}

          {/* ── Tab: Thông tin gói Premium ── */}
          {activeTab === "premium" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-bold text-gray-700 mb-5 flex items-center gap-2">
                <CreditCard size={17} className="text-yellow-500" />
                Thông tin gói Premium
              </h3>
              {user.premium ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-5 text-white shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-100 text-sm">Gói hiện tại</p>
                        <p className="text-2xl font-bold mt-1">
                          {user.premium.plan}
                        </p>
                      </div>
                      <CreditCard size={40} className="text-yellow-200 opacity-70" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-5 border-t border-yellow-300/50 pt-4">
                      <div>
                        <p className="text-yellow-100 text-xs">Bắt đầu</p>
                        <p className="font-semibold mt-0.5">
                          {user.premium.startDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-yellow-100 text-xs">Hết hạn</p>
                        <p className="font-semibold mt-0.5">
                          {user.premium.endDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-yellow-100 text-xs">Trạng thái</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white mt-0.5">
                          {user.premium.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                    <p className="text-sm text-yellow-700 font-medium">
                      💡 Quyền lợi gói Premium
                    </p>
                    <ul className="mt-2 space-y-1">
                      {[
                        "Truy cập không giới hạn tất cả khóa học",
                        "Luyện tập flashcard không giới hạn",
                        "Xem báo cáo học tập chi tiết",
                        "Ưu tiên hỗ trợ từ đội ngũ THCHI",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm text-yellow-700 flex items-center gap-2"
                        >
                          <span className="text-yellow-500">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <CreditCard size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-sm text-gray-500 font-medium">
                    Người dùng chưa có gói Premium
                  </p>
                  <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer">
                    Tặng gói Premium
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetail;
