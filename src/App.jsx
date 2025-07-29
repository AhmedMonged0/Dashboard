import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import AnimatedSidebar from './components/animations/AnimatedSidebar';
import AnimatedHeader from './components/animations/AnimatedHeader';
import AnimatedCard from './components/animations/AnimatedCard';
import Enhanced3DChart from './components/charts/Enhanced3DChart';
import Enhanced3DDonut from './components/charts/Enhanced3DDonut';
import AnimatedTransactions from './components/animations/AnimatedTransactions';
import ParticleBackground from './components/effects/ParticleBackground';
import { useIsMobile } from './hooks/use-mobile';
import './App.css';

// Loading component for 3D elements
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full">
    <motion.div
      className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

function App() {
  const isMobile = useIsMobile();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Sidebar */}
      <AnimatedSidebar />
      
      {/* Main Content */}
      <motion.div 
        className={`flex-1 relative z-10 ${
          isMobile ? 'p-4 pt-20' : 'p-8'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Header */}
        <motion.div variants={itemVariants}>
          <AnimatedHeader />
        </motion.div>
        
        {/* Stats Grid */}
        <motion.div 
          className={`grid gap-4 mb-6 ${
            isMobile 
              ? 'grid-cols-1 sm:grid-cols-2' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'
          }`}
          variants={itemVariants}
        >
          <AnimatedCard title="Total Revenue" value="$24,560" index={0} />
          <AnimatedCard title="Sales" value="3,200" index={1} />
          <AnimatedCard title="Customers" value="1,250" index={2} />
          <AnimatedCard title="Growth" value="+12%" index={3} />
        </motion.div>
        
        {/* Enhanced 3D Charts Grid */}
        <motion.div 
          className={`grid gap-4 mb-6 ${
            isMobile 
              ? 'grid-cols-1' 
              : 'grid-cols-1 lg:grid-cols-2 gap-8 mb-8'
          }`}
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Enhanced3DChart title="3D Overview Analytics" />
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Enhanced3DDonut title="3D Traffic Distribution" />
          </motion.div>
        </motion.div>
        
        {/* Animated Transactions */}
        <motion.div variants={itemVariants}>
          <AnimatedTransactions />
        </motion.div>

        {/* Floating Action Button */}
        <motion.button
          className={`fixed z-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg flex items-center justify-center ${
            isMobile 
              ? 'bottom-4 right-4 w-12 h-12' 
              : 'bottom-8 right-8 w-16 h-16'
          }`}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 30px rgba(245, 158, 11, 0.5)"
          }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <span className={`text-white ${isMobile ? 'text-lg' : 'text-2xl'}`}>⚡</span>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Ambient lighting effect */}
      <div className="fixed inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-orange-500/5 pointer-events-none" />
    </div>
  );
}

export default App;

