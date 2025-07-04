import React from 'react';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-white text-4xl font-bold">DASHBOARD</h1>
      <button className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
        <Menu className="text-white" size={24} />
      </button>
    </div>
  );
};

export default Header;

