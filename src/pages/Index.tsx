
import React, { useState, useEffect } from 'react';
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
  
  // Create a unique key for current selection to render unique components
  const currentKey = `${selectedMonth}-${activeGroup}`;
  
  // Data structures to store information for all combinations of month and group
  const [conflictsData, setConflictsData] = useState<{
    [key: string]: Array<{id: number, name: string, message: string, resolved: boolean}>
  }>({});
  
  const [documentsData, setDocumentsData] = useState<{
    [key: string]: Array<{id: string, name: string, category: string}>
  }>({});
  
  const [approvalsData, setApprovalsData] = useState<{
    [key: string]: Array<{id: number, type: string, timestamp: string | null, status: 'approved' | 'open'}>
  }>({});
  
  // Initialize with sample data
  useEffect(() => {
    // Sample conflicts data for Mai 2025
    setConflictsData(prevData => ({
      ...prevData,
      'Mai 2025-1': [
        {
          id: 1,
          name: 'Max Mustermann',
          message: 'Fehlerhafte Stundenkalkulation im Monat Mai',
          resolved: false
        },
        {
          id: 2,
          name: 'Julia Schmidt',
          message: 'Fehlende Überstundenpauschale',
          resolved: false
        },
        {
          id: 3,
          name: 'Tobias Wagner',
          message: 'Kranktage wurden nicht korrekt erfasst',
          resolved: true
        },
        {
          id: 4,
          name: 'Lena Fischer',
          message: 'Urlaubstage stimmen nicht mit Planung überein',
          resolved: false
        },
      ],
      'Mai 2025-2': [
        {
          id: 5,
          name: 'Felix Meyer',
          message: 'Zuschläge für Wochenendarbeit fehlen',
          resolved: false
        }
      ],
      'Mai 2025-3': [
        {
          id: 6,
          name: 'Nina Hoffmann',
          message: 'Steuerklasse wurde nicht korrekt aktualisiert',
          resolved: true
        }
      ]
    }));
    
    // Sample documents data for Juli 2024
    setDocumentsData(prevData => ({
      ...prevData,
      'Juli 2024-1': [
        {
          id: '1',
          name: 'Probeabrechnung.pdf',
          category: 'preliminary'
        },
        {
          id: '2',
          name: 'Monats_Berichterstellung.pdf',
          category: 'other'
        }
      ]
    }));
    
    // Sample approvals data for Mai 2025
    setApprovalsData(prevData => ({
      ...prevData,
      'Mai 2025-1': [
        {
          id: 1,
          type: 'Probeabrechnung',
          timestamp: '28.04.25, 14:15 Uhr',
          status: 'approved'
        },
        {
          id: 2,
          type: 'Finale Abrechnung',
          timestamp: '30.04.25, 10:22 Uhr',
          status: 'approved'
        }
      ],
      'Mai 2025-2': [
        {
          id: 3,
          type: 'Probeabrechnung',
          timestamp: '28.04.25, 16:45 Uhr',
          status: 'approved'
        },
        {
          id: 4,
          type: 'Finale Abrechnung',
          timestamp: null,
          status: 'open'
        }
      ],
      'Mai 2025-3': [
        {
          id: 5,
          type: 'Probeabrechnung',
          timestamp: null,
          status: 'open'
        }
      ]
    }));
  }, []);
  
  // Handle adding a new conflict
  const handleAddConflict = (name: string, message: string) => {
    setConflictsData(prevData => {
      const currentConflicts = prevData[currentKey] || [];
      const nextId = currentConflicts.length > 0 
        ? Math.max(...currentConflicts.map(c => c.id)) + 1 
        : 1;
      
      return {
        ...prevData,
        [currentKey]: [
          ...currentConflicts,
          {
            id: nextId,
            name,
            message,
            resolved: false
          }
        ]
      };
    });
  };
  
  // Handle document upload
  const handleDocumentUpload = (newDocuments: Array<{id: string, name: string, category: string}>) => {
    setDocumentsData(prevData => {
      const currentDocs = prevData[currentKey] || [];
      
      return {
        ...prevData,
        [currentKey]: [...currentDocs, ...newDocuments]
      };
    });
  };
  
  // Handle approval status change
  const handleApprovalStatusChange = (id: number, status: 'approved' | 'open') => {
    setApprovalsData(prevData => {
      const currentApprovals = [...(prevData[currentKey] || [])];
      const approvalIndex = currentApprovals.findIndex(a => a.id === id);
      
      if (approvalIndex >= 0) {
        currentApprovals[approvalIndex] = {
          ...currentApprovals[approvalIndex],
          status,
          timestamp: status === 'approved' ? new Date().toLocaleString('de-DE') : null
        };
      }
      
      return {
        ...prevData,
        [currentKey]: currentApprovals
      };
    });
  };
  
  // Get the current data for the selected month and group
  const currentConflicts = conflictsData[currentKey] || [];
  const currentDocuments = documentsData[currentKey] || [];
  const currentApprovals = approvalsData[currentKey] || [];
  
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
            key={`exports-${currentKey}`}
            monthLabel={selectedMonth} 
            groupNumber={activeGroup} 
          />
          
          <Conflicts 
            key={`conflicts-${currentKey}`}
            initialConflicts={currentConflicts}
            onConflictAdd={({name, message}) => handleAddConflict(name, message)}
          />
          
          <DocumentUploads 
            key={`documents-${currentKey}`}
            initialDocuments={currentDocuments}
            onDocumentsUpload={handleDocumentUpload}
          />
          
          <Approvals 
            key={`approvals-${currentKey}`}
            approvals={currentApprovals}
            onApprovalStatusChange={handleApprovalStatusChange}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
