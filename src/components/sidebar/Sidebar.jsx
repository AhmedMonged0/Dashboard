import React from 'react';
import { Home, User, BarChart3, Mail, Settings } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: User, label: 'Save', active: false },
    { icon: BarChart3, label: 'Bel', active: false },
    { icon: Mail, label: 'Email', active: false },
    { icon: Settings, label: 'Gear', active: false },
  ];

  return (
    <div className="w-80 bg-slate-800 h-screen p-6 flex flex-col">
      {/* Logo Section */}
      <div className="flex items-center gap-4 mb-12">
        {/* React Logo */}
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white rounded-full relative">
            <div className="absolute inset-0 border-2 border-white rounded-full transform rotate-45"></div>
            <div className="absolute inset-0 border-2 border-white rounded-full transform -rotate-45"></div>
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
        
        {/* JS Logo */}
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
          <span className="text-black font-bold text-lg">JS</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    item.active
                      ? 'bg-slate-700 text-white border-l-4 border-yellow-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <IconComponent size={20} />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

