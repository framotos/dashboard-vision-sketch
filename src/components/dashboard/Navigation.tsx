
import React from 'react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'workspace', label: 'Workspace Daten' },
    { id: 'payroll', label: 'Lohnläufe' },
    { id: 'employees', label: 'Mitarbeiterdaten' },
  ];

  return (
    <div className="border-b border-gray-200">
      <ul className="flex space-x-6 px-6">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              className={`py-3 px-1 ${
                activeTab === tab.id
                  ? 'text-payroll-blue border-b-2 border-payroll-blue font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
