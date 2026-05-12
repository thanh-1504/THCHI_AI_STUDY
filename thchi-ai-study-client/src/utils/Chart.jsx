import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { level: "1", count: 24, color: "#ff5c5c" },
  { level: "2", count: 12, color: "#ffcb08" },
  { level: "3", count: 50, color: "#4dd0e1" },
  { level: "4", count: 107, color: "#42a5f5" },
  { level: "5", count: 1748, color: "#283593" },
];

const Chart = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
          barCategoryGap="1%"
        >
          {/* Trục X: Bỏ đường kẻ, chỉ giữ lại số level */}
          <XAxis
            dataKey="level"
            axisLine={{ stroke: "#E5E7EB", strokeWidth: 4 }} // Đường kẻ ngang màu xám đậm dưới chân
            tickLine={false}
            tick={{ fill: "#000", fontWeight: "bold", fontSize: 24 }}
            dy={15}
          />

          {/* Trục Y: Ẩn hoàn toàn vì chúng ta dùng Label trên đầu cột */}
          <YAxis hide={true} domain={[0, "dataMax + 200"]} />

          <Bar
            dataKey="count"
            barSize={60}
            radius={[15, 15, 0, 0]} // Bo góc phía trên cột
          >
            {/* Đổ màu riêng cho từng cột dựa theo data */}
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}

            {/* Hiển thị số lượng từ trên đầu cột */}
            <LabelList
              dataKey="count"
              position="top"
              content={(props) => {
                const { x, y, width, value } = props;
                return (
                  <text
                    x={x + width / 2}
                    y={y - 10}
                    textAnchor="middle"
                    className="font-bold text-lg fill-black"
                  >
                    {value} <tspan className="text-sm font-normal">từ</tspan>
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Phần text bên dưới biểu đồ */}
      <div className="text-center mt-4">
        <p className="text-xl font-medium">
          Chuẩn bị ôn tập:{" "}
          <span className="text-[#ffcb08] font-bold">1941</span> từ
        </p>
        <button className="mt-5 text-xl bg-(image:--my-gradient) text-white px-12 py-4 rounded-3xl font-semibold hover:cursor-pointer hover:opacity-80 transition-opacity">Ôn tập ngay</button>
      </div>
    </div>
  );
};

export default Chart;
