import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AgeGenderStatPageComponent = ({ chartData, totalCount }) => {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg mt-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">회원 연령대 및 성별 통계</h2>
        <p className="text-gray-500 mt-2">총 회원수: <span className="font-bold text-blue-600">{totalCount}명</span></p>
      </div>
      
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }}/>
            <Bar dataKey="남성" stackId="a" fill="#3b82f6" name="남성" radius={[0, 0, 4, 4]} />
            <Bar dataKey="여성" stackId="a" fill="#ec4899" name="여성" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AgeGenderStatPageComponent