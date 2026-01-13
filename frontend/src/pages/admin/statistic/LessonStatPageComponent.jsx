import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ec4899'];

const LessonStatPageComponent = ({ chartData, totalCount }) => {
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const currentValue = payload[0].value;
      const percentage = totalCount > 0 ? ((currentValue / totalCount) * 100).toFixed(1) : 0;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-lg text-sm">
          <p className="font-bold text-gray-700 mb-1">{`${payload[0].name}`}</p>
          <p className="text-blue-600 font-semibold">{`${currentValue}건`}</p>
          <p className="text-gray-400">{`(${percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full p-8 bg-white rounded-xl shadow-lg mt-4 border border-gray-100">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">종목별 인기 현황</h2>
          <p className="text-gray-500 text-sm mt-1">카테고리별 수강신청 비율 통계</p>
        </div>
        <div className="text-right">
          <span className="text-gray-500 text-sm">총 신청 건수</span>
          <p className="text-3xl font-extrabold text-blue-600">{totalCount}<span className="text-base font-normal text-gray-500 ml-1">건</span></p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2 h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%" cy="50%"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">상세 통계</h3>
            <ul className="space-y-3">
              {chartData.map((entry, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="font-bold text-gray-700">{entry.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-extrabold text-gray-800 text-lg">{entry.value}<span className="text-xs font-normal text-gray-400 ml-1">건</span></span>
                    <span className="text-sm font-medium text-gray-500 w-12 text-right">
                      {totalCount > 0 ? ((entry.value / totalCount) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonStatPageComponent;