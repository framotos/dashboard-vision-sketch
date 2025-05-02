import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Conflict {
  id: number;
  name: string;
  message: string;
  resolved: boolean;
}

interface ConflictsProps {
  initialConflicts: Conflict[];
}

const Conflicts: React.FC<ConflictsProps> = ({ initialConflicts }) => {
  const [conflicts, setConflicts] = useState<Conflict[]>(initialConflicts);
  const [activeTab, setActiveTab] = useState("open");
  const [isOpen, setIsOpen] = useState(true);
  
  const openConflicts = conflicts.filter(conflict => !conflict.resolved);
  const resolvedConflicts = conflicts.filter(conflict => conflict.resolved);
  
  const toggleResolved = (id: number) => {
    setConflicts(conflicts.map(conflict => 
      conflict.id === id 
        ? { ...conflict, resolved: !conflict.resolved }
        : conflict
    ));
  };
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white p-5 rounded-lg mb-6"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Offene Konflikte</h2>
          <span className="bg-gray-100 text-xs px-1.5 py-0.5 rounded">{openConflicts.length}</span>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="open">Offen</TabsTrigger>
            <TabsTrigger value="resolved">Behoben</TabsTrigger>
            <TabsTrigger value="all">Alle Konflikte</TabsTrigger>
          </TabsList>
          
          <TabsContent value="open" className="border-t border-gray-100 pt-3">
            {openConflicts.length > 0 ? (
              <ConflictsList conflicts={openConflicts} onToggle={toggleResolved} />
            ) : (
              <p className="text-sm text-gray-500 py-2">Keine offenen Konflikte</p>
            )}
          </TabsContent>
          
          <TabsContent value="resolved" className="border-t border-gray-100 pt-3">
            {resolvedConflicts.length > 0 ? (
              <ConflictsList conflicts={resolvedConflicts} onToggle={toggleResolved} />
            ) : (
              <p className="text-sm text-gray-500 py-2">Keine behobenen Konflikte</p>
            )}
          </TabsContent>
          
          <TabsContent value="all" className="border-t border-gray-100 pt-3">
            <ConflictsList conflicts={conflicts} onToggle={toggleResolved} />
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm" className="text-payroll-blue flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Konflikt hinzufügen
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

interface ConflictsListProps {
  conflicts: Conflict[];
  onToggle: (id: number) => void;
}

const ConflictsList: React.FC<ConflictsListProps> = ({ conflicts, onToggle }) => {
  return (
    <div>
      <div className="grid grid-cols-12 text-sm font-medium text-gray-500 mb-2">
        <div className="col-span-3">Name</div>
        <div className="col-span-8">Nachricht</div>
        <div className="col-span-1 text-right">Behoben</div>
      </div>
      
      {conflicts.map(conflict => (
        <div key={conflict.id} className="grid grid-cols-12 py-2 border-b border-gray-100 text-sm">
          <div className="col-span-3">{conflict.name}</div>
          <div className="col-span-8 italic text-gray-600">"{conflict.message}"</div>
          <div className="col-span-1 text-right">
            <input 
              type="checkbox" 
              checked={conflict.resolved}
              onChange={() => onToggle(conflict.id)}
              className="h-4 w-4 rounded border-gray-300 text-payroll-blue focus:ring-payroll-blue"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Conflicts;
