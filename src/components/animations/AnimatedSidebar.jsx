import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, BarChart3, Mail, Settings, ChevronRight, Menu, X } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const AnimatedSidebar = () => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
      setIsMobileMenuOpen(false);
    } else {
      setIsExpanded(true);
    }
  }, [isMobile]);
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: User, label: 'Save', active: false },
    { icon: BarChart3, label: 'Bel', active: false },
    { icon: Mail, label: 'Email', active: false },
    { icon: Settings, label: 'Gear', active: false },
  ];

  const sidebarVariants = {
    expanded: { 
      width: isMobile ? '100vw' : 320,
      x: 0
    },
    collapsed: { 
      width: isMobile ? '100vw' : 80,
      x: isMobile ? '-100%' : 0
    },
    mobileOpen: {
      width: '100vw',
      x: 0
    }
  };

  const logoVariants = {
    expanded: { scale: 1, rotate: 0 },
    collapsed: { scale: 0.8, rotate: 180 }
  };

  const getSidebarState = () => {
    if (isMobile) {
      return isMobileMenuOpen ? "mobileOpen" : "collapsed";
    }
    return isExpanded ? "expanded" : "collapsed";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          className="fixed top-4 left-4 z-50 p-3 bg-slate-800 rounded-lg shadow-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isMobileMenuOpen ? (
            <X className="text-white" size={20} />
          ) : (
            <Menu className="text-white" size={20} />
          )}
        </motion.button>
      )}

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.div 
        className={`bg-gradient-to-b from-slate-800 to-slate-900 h-screen p-6 flex flex-col relative overflow-hidden ${
          isMobile ? 'fixed z-50' : ''
        }`}
        variants={sidebarVariants}
        animate={getSidebarState()}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >


      {/* Toggle button - Only show on desktop */}
      {!isMobile && (
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
      )}

      {/* Close button for mobile */}
      {isMobile && isMobileMenuOpen && (
        <motion.button
          className="absolute top-6 right-4 z-10 p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="text-white" size={16} />
        </motion.button>
      )}

      {/* Logo Section */}
      <motion.div 
        className="flex items-center gap-4 mb-12"
        variants={logoVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
      >
        {/* React Logo */}
        <div 
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
        >
          <div className="w-8 h-8 border-2 border-white rounded-full relative">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
        
        {/* JS Logo */}
        <AnimatePresence>
          {(isExpanded || (isMobile && isMobileMenuOpen)) && (
            <motion.div 
              className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
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
                <a
                  href="#"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    item.active
                      ? 'bg-slate-700 text-white border-l-4 border-yellow-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <IconComponent size={20} />
                  
                  <AnimatePresence>
                    {(isExpanded || (isMobile && isMobileMenuOpen)) && (
                      <motion.span 
                        className="font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </motion.div>
    </>
  );
};

export default AnimatedSidebar;

