import React from 'react';
import { motion } from 'framer-motion';

const AnimatedTransactions = () => {
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 border border-slate-600"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
    >
      <motion.h3 
        className="text-white text-xl font-semibold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        Recent Transactions
      </motion.h3>
      
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {transactions.map((transaction, index) => (
          <motion.div 
            key={transaction.id}
            variants={itemVariants}
            className="flex items-center justify-between group"
            whileHover={{ x: 10 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                className="w-2 h-2 bg-yellow-400 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
              
              <span className="text-slate-400 group-hover:text-white transition-colors">
                {transaction.name}
              </span>
              
              <div className="w-32 h-2 bg-slate-600 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${transaction.progress}%` }}
                  transition={{ 
                    duration: 1.5,
                    delay: 1.2 + index * 0.1,
                    ease: "easeOut"
                  }}
                />
              </div>
            </div>
            
            <motion.span 
              className="text-yellow-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + index * 0.1 }}
              whileHover={{ 
                scale: 1.1,
                textShadow: "0 0 10px rgba(245, 158, 11, 0.5)"
              }}
            >
              {transaction.status}()
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%',
              y: '100%',
              opacity: 0
            }}
            animate={{ 
              y: '-10%',
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              delay: i * 0.8,
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedTransactions;

