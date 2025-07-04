import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, BarChart3, Mail, Settings, ChevronRight } from 'lucide-react';

const AnimatedSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: User, label: 'Save', active: false },
    { icon: BarChart3, label: 'Bel', active: false },
    { icon: Mail, label: 'Email', active: false },
    { icon: Settings, label: 'Gear', active: false },
  ];

  const sidebarVariants = {
    expanded: { width: 320 },
    collapsed: { width: 80 }
  };

  const logoVariants = {
    expanded: { scale: 1, rotate: 0 },
    collapsed: { scale: 0.8, rotate: 180 }
  };

  return (
    <motion.div 
      className="bg-gradient-to-b from-slate-800 to-slate-900 h-screen p-6 flex flex-col relative overflow-hidden"
      variants={sidebarVariants}
      animate={isExpanded ? "expanded" : "collapsed"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%'
            }}
            animate={{ 
              y: [null, Math.random() * 100 + '%'],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      {/* Toggle button */}
      <motion.button
        className="absolute top-6 right-4 z-10 p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="text-white" size={16} />
        </motion.div>
      </motion.button>

      {/* Logo Section */}
      <motion.div 
        className="flex items-center gap-4 mb-12"
        variants={logoVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
      >
        {/* React Logo */}
        <motion.div 
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
          whileHover={{ 
            scale: 1.1,
            rotate: 360,
            transition: { duration: 0.5 }
          }}
        >
          <div className="w-8 h-8 border-2 border-white rounded-full relative">
            <motion.div 
              className="absolute inset-0 border-2 border-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ transform: 'rotate(45deg)' }}
            />
            <motion.div 
              className="absolute inset-0 border-2 border-white rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ transform: 'rotate(-45deg)' }}
            />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </motion.div>
        
        {/* JS Logo */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 20px rgba(251, 191, 36, 0.5)"
              }}
            >
              <span className="text-black font-bold text-lg">JS</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Menu Items */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.a
                  href="#"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative overflow-hidden ${
                    item.active
                      ? 'bg-slate-700 text-white border-l-4 border-yellow-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    x: 5
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '0%' }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <IconComponent size={20} />
                  </motion.div>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span 
                        className="font-medium relative z-10"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </motion.div>
  );
};

export default AnimatedSidebar;

