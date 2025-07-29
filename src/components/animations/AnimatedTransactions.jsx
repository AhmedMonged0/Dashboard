import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/use-mobile';

const AnimatedTransactions = () => {
  const isMobile = useIsMobile();
  const transactions = [
    { id: 1, name: 'Customers', status: 'Complete', progress: 100 },
    { id: 2, name: 'Customers', status: 'Complete', progress: 75 },
    { id: 3, name: 'Customers', status: 'Complete', progress: 60 },
    { id: 4, name: 'Customers', status: 'Complete', progress: 90 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div 
      className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border border-slate-600 hover:shadow-lg transition-shadow duration-200 ${
        isMobile ? 'p-4' : 'p-6'
      }`}
    >
      <h3 
        className={`text-white font-semibold mb-6 ${
          isMobile ? 'text-lg' : 'text-xl'
        }`}
      >
        Recent Transactions
      </h3>
      
      <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
        {transactions.map((transaction, index) => (
          <div 
            key={transaction.id}
            className="flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              
              <span className={`text-slate-400 group-hover:text-white transition-colors ${
                isMobile ? 'text-sm' : 'text-base'
              }`}>
                {transaction.name}
              </span>
              
              <div className={`bg-slate-600 rounded-full overflow-hidden h-2 ${
                isMobile ? 'w-20' : 'w-32'
              }`}>
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: `${transaction.progress}%` }}
                />
              </div>
            </div>
            
            <span className={`text-yellow-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {transaction.status}()
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTransactions;

