
import React from 'react';
import { Briefcase, Cross } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <Briefcase className="h-6 w-6 text-medical-300" />
        <Cross className="h-4 w-4 text-medical-600 absolute -top-1 -right-1" />
      </div>
      <span className="text-xl font-bold text-medical-600">HEALTH POINT</span>
    </div>
  );
};

export default Logo;
