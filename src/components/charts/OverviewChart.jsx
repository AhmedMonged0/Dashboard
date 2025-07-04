import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const OverviewChart = () => {
  const data = [
    { name: 'Jeft', value: 400 },
    { name: 'Feb', value: 600 },
    { name: 'Min', value: 800 },
    { name: 'Age', value: 1200 },
    { name: 'May', value: 1400 },
  ];

  return (
    <div className="bg-slate-700 rounded-2xl p-6">
      <h3 className="text-white text-xl font-semibold mb-6">Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#f59e0b' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewChart;

