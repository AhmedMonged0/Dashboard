import React from 'react';

const TransactionList = () => {
  const transactions = [
    { id: 1, name: 'Customers', status: 'Complete', progress: 100 },
    { id: 2, name: 'Customers', status: 'Complete', progress: 75 },
    { id: 3, name: 'Customers', status: 'Complete', progress: 60 },
    { id: 4, name: 'Customers', status: 'Complete', progress: 90 },
  ];

  return (
    <div className="bg-slate-700 rounded-2xl p-6">
      <h3 className="text-white text-xl font-semibold mb-6">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-slate-400">{transaction.name}</span>
              <div className="w-32 h-2 bg-slate-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${transaction.progress}%` }}
                ></div>
              </div>
            </div>
            <span className="text-yellow-400 text-sm">{transaction.status}()</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;

