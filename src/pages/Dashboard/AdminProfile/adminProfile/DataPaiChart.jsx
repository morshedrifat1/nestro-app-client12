// ChartPieLabel.jsx
import React from "react"
import { TrendingUp } from "lucide-react"
import { Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts"

// Chart Data
const chartData = [
  { key: "Posts", total: 275, fill: "#2b7fff" },
  { key: "Comments", total: 200, fill: "#8ec5ff" },
  { key: "Users", total: 187, fill: "#193cb8" },
]

export default function DataPaiChart() {
  return (
    <div className="p-5 border border-mainborder rounded-lg shadow-2xs bg-boxbg flex flex-col lg:max-w-sm w-full">
      <div className="text-center mb-2">
        <h2 className="text-xl text-base-300 font-semibold">Pie Chart - Label</h2>
        <p className="text-sm text-base-content">January - June 2024</p>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Tooltip />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="key"
              label
              outerRadius={80}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-center">
        <div className="flex justify-center items-center gap-2 font-medium text-base-content">
          Trending up by 5.2% this month
          <TrendingUp className="w-4 h-4 text-green-600" />
        </div>
        <p className="text-base-content mt-2">Showing total visitors for the last 6 months</p>
      </div>
    </div>
  )
}
