import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const AnimatedHeader = () => {
  const isMobile = useIsMobile();
  
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const title = "DASHBOARD";

  return (
    <motion.div 
      className={`flex items-center justify-between ${
        isMobile ? 'mb-4 flex-col gap-4' : 'mb-8'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`flex items-center ${
        isMobile ? 'gap-2 flex-col text-center' : 'gap-6'
      }`}>
        <h1 
          className={`text-white font-bold ${
            isMobile ? 'text-2xl' : 'text-4xl'
          }`}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <div
          className={`text-slate-400 ${
            isMobile ? 'text-xs' : 'text-sm'
          }`}
        >
          Real-time Analytics
        </div>
      </div>

      <div className={`flex items-center ${
        isMobile ? 'gap-2' : 'gap-4'
      }`}>
        {/* Search bar - Hide on mobile */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative"
          >
            <motion.input
              type="text"
              placeholder="Search..."
              className="bg-slate-700 text-white px-4 py-2 pl-10 rounded-lg border border-slate-600 focus:border-yellow-400 focus:outline-none transition-colors"
              whileFocus={{ scale: 1.05 }}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          </motion.div>
        )}

        {/* Notification bell */}
        <button
          className={`relative bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors ${
            isMobile ? 'p-2' : 'p-3'
          }`}
        >
          <Bell className="text-white" size={isMobile ? 16 : 20} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
        </button>

        {/* User profile */}
        <button
          className={`bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors ${
            isMobile ? 'p-2' : 'p-3'
          }`}
        >
          <User className="text-white" size={isMobile ? 16 : 20} />
        </button>

        {/* Menu button - Hide on mobile since we have hamburger menu */}
        {!isMobile && (
          <button
            className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
          >
            <Menu className="text-white" size={24} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AnimatedHeader;

