import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TrafficChart = () => {
  const data = [
    { name: 'Desktop', value: 60, color: '#f59e0b' },
    { name: 'Mobile', value: 25, color: '#475569' },
    { name: 'Tablet', value: 15, color: '#334155' },
  ];

  return (
    <div className="bg-slate-700 rounded-2xl p-6">
      <h3 className="text-white text-xl font-semibold mb-6">Traffic</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficChart;

