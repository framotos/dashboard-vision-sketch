
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeaderProps {
  companyName: string;
}

const Header: React.FC<HeaderProps> = ({ companyName }) => {
  return (
    <div className="flex items-center px-6 py-3 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-payroll-gray">Ordio Payroll Plus</span>
        <span className="text-gray-400 mx-1">&gt;</span>
        <span className="font-semibold">{companyName}</span>
      </div>
    </div>
  );
};

export default Header;
