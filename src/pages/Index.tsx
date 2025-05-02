
import React, { useState } from 'react';
import Header from '@/components/dashboard/Header';
import Navigation from '@/components/dashboard/Navigation';
import MonthSelector from '@/components/dashboard/MonthSelector';
import PayrollGroup from '@/components/dashboard/PayrollGroup';
import Exports from '@/components/dashboard/Exports';
import Conflicts from '@/components/dashboard/Conflicts';
import DocumentUploads from '@/components/dashboard/DocumentUploads';
import Approvals from '@/components/dashboard/Approvals';

const Index = () => {
  const [activeTab, setActiveTab] = useState('payroll');
  const [selectedMonth, setSelectedMonth] = useState('Juli 2024');
  const [activeGroup, setActiveGroup] = useState(1);
  
  const conflicts = [
    {
      id: 1,
      name: 'Hannah Keuerhof',
      message: 'Irgendwas, dass Andi hier schreiben würde.',
      resolved: false
    },
    {
      id: 2,
      name: 'Elisa Braun',
      message: 'Noch etwas, dass er schreiben würde',
      resolved: false
    }
  ];
  
  const documents = [
    {
      id: '1',
      name: 'Probeabrechnung.pdf',
      category: 'preliminary'
    },
    {
      id: '2',
      name: 'Monats_Berichterstellung.pdf',
      category: 'other'
    },
    {
      id: '3',
      name: 'Mandanten-Benachrichtigungen.pdf',
      category: 'other'
    },
    {
      id: '4',
      name: 'ZV-Ausgabe.pdf',
      category: 'other'
    },
    {
      id: '5',
      name: 'ZV-Ausgabe.pdf',
      category: 'other'
    }
  ];
  
  const approvals = [
    {
      id: 1,
      type: 'Probeabrechnung',
      timestamp: '30.04.23, 16:32 Uhr',
      status: 'approved' as const
    },
    {
      id: 2,
      type: 'Finale Abrechnung',
      timestamp: null,
      status: 'open' as const
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header companyName="Ninja Foods GmbH" />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="pb-10">
        <MonthSelector 
          selectedMonth={selectedMonth} 
          onMonthChange={setSelectedMonth} 
        />
        
        <div className="px-6 mb-6">
          <div className="grid grid-cols-3 gap-1 mb-6">
            <PayrollGroup 
              groupNumber={1} 
              isActive={activeGroup === 1} 
              onClick={() => setActiveGroup(1)}
            />
            <PayrollGroup 
              groupNumber={2} 
              isActive={activeGroup === 2} 
              onClick={() => setActiveGroup(2)}
            />
            <PayrollGroup 
              groupNumber={3} 
              isActive={activeGroup === 3} 
              onClick={() => setActiveGroup(3)}
            />
          </div>
          
          <Exports 
            monthLabel={selectedMonth} 
            groupNumber={activeGroup} 
          />
          
          <Conflicts 
            initialConflicts={conflicts} 
          />
          
          <DocumentUploads 
            initialDocuments={documents} 
          />
          
          <Approvals 
            approvals={approvals} 
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
