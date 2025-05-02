
import React from 'react';

interface PayrollGroupProps {
  groupNumber: number;
  isActive?: boolean;
  onClick?: () => void;
}

const PayrollGroup: React.FC<PayrollGroupProps> = ({ 
  groupNumber, 
  isActive = false,
  onClick 
}) => {
  return (
    <div 
      className={`flex-1 py-2.5 px-4 text-center transition-all duration-200 ${
        isActive 
          ? 'bg-white shadow-sm' 
          : 'bg-payroll-lightgray hover:bg-gray-100 cursor-pointer'
      }`}
      onClick={onClick}
    >
      <h3 className="text-sm font-medium">Abrechnungsgruppe {groupNumber}</h3>
    </div>
  );
};

export default PayrollGroup;
