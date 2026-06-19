import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  CircleDollarSign,
  CreditCard,
  Eye,
  NotebookText,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const revenueData = [
  { month: "Tháng 12", revenue: 85000000 },
  { month: "Tháng 1", revenue: 95000000 },
  { month: "Tháng 2", revenue: 78000000 },
  { month: "Tháng 3", revenue: 110000000 },
  { month: "Tháng 4", revenue: 130000000 },
  { month: "Tháng 5", revenue: 125000000 },
  { month: "Tháng 6", revenue: 152450000 },
];

const accountTypeData = [
  { name: "Premium", value: 26.2, color: "#eab308" },
  { name: "Free", value: 73.8, color: "#e5e7eb" },
];

const topCourses = [
  { rank: 1, name: "TOEIC Vocabulary", students: 2450 },
  { rank: 2, name: "Từ vựng THPT Quốc gia", students: 1880 },
  { rank: 3, name: "English for Work", students: 1134 },
];

const topLessons = [
  { rank: 1, name: "Unit 1 – Greetings", students: 1250 },
  { rank: 2, name: "Unit 2 – Workplace", students: 1020 },
  { rank: 3, name: "Unit 3 – Travel", students: 980 },
];

const recentTransactions = [
  {
    id: 1,
    email: "user125@gmail.com",
    plan: "Premium 1 Tháng",
    amount: 99000,
    status: "Thành công",
  },
  {
    id: 2,
    email: "thantr@gmail.com",
    plan: "Premium 3 Tháng",
    amount: 249000,
    status: "Thành công",
  },
  {
    id: 3,
    email: "minhchu@gmail.com",
    plan: "Premium 1 Năm",
    amount: 799000,
    status: "Thành công",
  },
];

// ─── Helper Components ────────────────────────────────────────────────────────
const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const formatMillions = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value;
};

const StatCard = ({ icon: Icon, iconBg, label, value, change, positive }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
    <div className="flex items-center gap-1">
      {positive ? (
        <ArrowUp size={14} className="text-green-500" />
      ) : (
        <ArrowDown size={14} className="text-red-400" />
      )}
      <span className={`text-xs font-semibold ${positive ? "text-green-500" : "text-red-400"}`}>
        {change}
      </span>
      <span className="text-xs text-gray-400 ml-1">so với tháng trước</span>
    </div>
  </div>
);

const CustomTooltipRevenue = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-3">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-bold text-yellow-600">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = () => (
  <div className="flex flex-col gap-2 justify-center">
    {accountTypeData.map((entry) => (
      <div key={entry.name} className="flex items-center gap-2">
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-xs text-gray-600">
          {entry.name}: <strong>{entry.value}%</strong>
        </span>
      </div>
    ))}
  </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard tổng quan</h1>
          <p className="text-sm text-gray-400 mt-0.5">Xem tổng quan hệ thống THCHI AI Study</p>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1688676796006-bbd1599bbfb6?q=80&w=687&auto=format&fit=crop"
            alt="Admin"
          />
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">Admin</p>
            <p className="text-xs text-gray-400">Quản trị viên</p>
          </div>
        </div>
      </div>

      {/* ── Stat Cards Row ── */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          iconBg="bg-blue-400"
          label="Tổng người dùng"
          value="12,450"
          change="+10.5%"
          positive
        />
        <StatCard
          icon={TrendingUp}
          iconBg="bg-yellow-400"
          label="Người dùng Premium"
          value="3,256"
          change="+6.2%"
          positive
        />
        <StatCard
          icon={CircleDollarSign}
          iconBg="bg-green-500"
          label="Doanh thu tháng"
          value="152,450,000₫"
          change="+13.8%"
          positive
        />
        <StatCard
          icon={CreditCard}
          iconBg="bg-purple-400"
          label="Tỷ lệ Premium / Free"
          value="26.2%"
          change="+5.1%"
          positive
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Revenue Area Chart */}
        <div className="col-span-2 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-700">
                Doanh thu (6 tháng gần nhất)
              </h2>
            </div>
            <select className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer">
              <option>6 Tháng</option>
              <option>3 Tháng</option>
              <option>1 Năm</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatMillions}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltipRevenue />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#eab308"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                dot={{ fill: "#eab308", r: 4, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#eab308", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart – Account Types */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-base font-bold text-gray-700 mb-4">Tỷ lệ tài khoản</h2>
          <div className="flex-1 flex items-center justify-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={accountTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {accountTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, ""]}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <CustomLegend />
          </div>
          {/* Center label overlay text */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-yellow-50 rounded-xl p-3 text-center">
              <p className="text-xs text-yellow-600 font-medium">Premium</p>
              <p className="text-lg font-bold text-yellow-600">26.2%</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500 font-medium">Free</p>
              <p className="text-lg font-bold text-gray-500">73.8%</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tables Row ── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Top Courses */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <BookOpen size={16} className="text-yellow-500" />
              Top khóa học được học nhiều
            </h2>
          </div>
          <div className="space-y-3">
            {topCourses.map((course) => (
              <div
                key={course.rank}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                      ${course.rank === 1 ? "bg-yellow-400" : course.rank === 2 ? "bg-gray-400" : "bg-orange-300"}`}
                  >
                    {course.rank}
                  </span>
                  <span className="text-sm text-gray-700 font-medium">{course.name}</span>
                </div>
                <span className="text-xs text-gray-400">{course.students.toLocaleString()} lượt học</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Lessons */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <NotebookText size={16} className="text-yellow-500" />
              Top bài học được học nhiều
            </h2>
          </div>
          <div className="space-y-3">
            {topLessons.map((lesson) => (
              <div
                key={lesson.rank}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                      ${lesson.rank === 1 ? "bg-yellow-400" : lesson.rank === 2 ? "bg-gray-400" : "bg-orange-300"}`}
                  >
                    {lesson.rank}
                  </span>
                  <span className="text-sm text-gray-700 font-medium">{lesson.name}</span>
                </div>
                <span className="text-xs text-gray-400">{lesson.students.toLocaleString()} lượt học</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <CircleDollarSign size={16} className="text-yellow-500" />
              Giao dịch mới nhất
            </h2>
            <button className="text-xs text-yellow-500 font-semibold hover:text-yellow-600 transition-colors">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-700 font-medium truncate max-w-[130px]">
                    {tx.email}
                  </span>
                  <span className="text-xs text-gray-400">{tx.plan}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs font-bold text-gray-700">{formatCurrency(tx.amount)}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-600">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Stats Row ── */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center">
            <BookOpen size={22} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Tổng khóa học</p>
            <p className="text-xl font-bold text-gray-800">48</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
            <NotebookText size={22} className="text-blue-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Tổng bài học</p>
            <p className="text-xl font-bold text-gray-800">320</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
            <Eye size={22} className="text-purple-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Lượt học hôm nay</p>
            <p className="text-xl font-bold text-gray-800">1,284</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
            <Users size={22} className="text-green-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Người dùng mới hôm nay</p>
            <p className="text-xl font-bold text-gray-800">87</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;