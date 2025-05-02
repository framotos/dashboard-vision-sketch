
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
  
  // Create empty data structures for all possible months and groups
  const [conflicts, setConflicts] = useState<{
    [month: string]: {
      [group: number]: Array<{id: number, name: string, message: string, resolved: boolean}>
    }
  }>({});
  
  const [documents, setDocuments] = useState<{
    [month: string]: {
      [group: number]: Array<{id: string, name: string, category: string}>
    }
  }>({});
  
  const [approvals, setApprovals] = useState<{
    [month: string]: {
      [group: number]: Array<{id: number, type: string, timestamp: string | null, status: 'approved' | 'open'}>
    }
  }>({});
  
  // Initialize with sample data for the current month and group
  useEffect(() => {
    // Sample data for July 2024, Group 1
    setConflicts({
      'Juli 2024': {
        1: [
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
        ],
        2: [],
        3: []
      },
      'Mai 2025': {
        1: [
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
        2: [
          {
            id: 5,
            name: 'Felix Meyer',
            message: 'Zuschläge für Wochenendarbeit fehlen',
            resolved: false
          }
        ],
        3: [
          {
            id: 6,
            name: 'Nina Hoffmann',
            message: 'Steuerklasse wurde nicht korrekt aktualisiert',
            resolved: true
          }
        ]
      }
    });
    
    setDocuments({
      'Juli 2024': {
        1: [
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
        ],
        2: [],
        3: []
      },
      'Mai 2025': {
        1: [
          {
            id: '1',
            name: 'Probeabrechnung_Mai2025.pdf',
            category: 'preliminary'
          },
          {
            id: '2',
            name: 'Finale_Abrechnung_Mai2025.pdf',
            category: 'final'
          }
        ],
        2: [
          {
            id: '3',
            name: 'Ueberweisung_Mai2025_G2.pdf',
            category: 'transfer'
          }
        ],
        3: []
      }
    });
    
    setApprovals({
      'Juli 2024': {
        1: [
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
        ],
        2: [],
        3: []
      },
      'Mai 2025': {
        1: [
          {
            id: 1,
            type: 'Probeabrechnung',
            timestamp: '28.04.25, 14:15 Uhr',
            status: 'approved' as const
          },
          {
            id: 2,
            type: 'Finale Abrechnung',
            timestamp: '30.04.25, 10:22 Uhr',
            status: 'approved' as const
          }
        ],
        2: [
          {
            id: 3,
            type: 'Probeabrechnung',
            timestamp: '28.04.25, 16:45 Uhr',
            status: 'approved' as const
          },
          {
            id: 4,
            type: 'Finale Abrechnung',
            timestamp: null,
            status: 'open' as const
          }
        ],
        3: [
          {
            id: 5,
            type: 'Probeabrechnung',
            timestamp: null,
            status: 'open' as const
          }
        ]
      }
    });
  }, []);
  
  // Handle adding a new conflict
  const handleAddConflict = (name: string, message: string) => {
    setConflicts(prevConflicts => {
      // Make sure the month and group exist
      const updatedConflicts = { ...prevConflicts };
      if (!updatedConflicts[selectedMonth]) {
        updatedConflicts[selectedMonth] = {};
      }
      if (!updatedConflicts[selectedMonth][activeGroup]) {
        updatedConflicts[selectedMonth][activeGroup] = [];
      }
      
      // Find the next ID
      const currentConflicts = updatedConflicts[selectedMonth][activeGroup];
      const nextId = currentConflicts.length > 0 
        ? Math.max(...currentConflicts.map(c => c.id)) + 1 
        : 1;
      
      // Add the new conflict
      updatedConflicts[selectedMonth][activeGroup] = [
        ...currentConflicts,
        {
          id: nextId,
          name,
          message,
          resolved: false
        }
      ];
      
      return updatedConflicts;
    });
  };
  
  // Get the data for the current selection
  const currentConflicts = conflicts[selectedMonth]?.[activeGroup] || [];
  const currentDocuments = documents[selectedMonth]?.[activeGroup] || [];
  const currentApprovals = approvals[selectedMonth]?.[activeGroup] || [];
  
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
            initialConflicts={currentConflicts}
            onConflictAdd={({name, message}) => handleAddConflict(name, message)}
          />
          
          <DocumentUploads 
            initialDocuments={currentDocuments} 
          />
          
          <Approvals 
            approvals={currentApprovals} 
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
