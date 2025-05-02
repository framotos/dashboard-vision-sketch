
import React, { useState } from 'react';
import { ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ExportsProps {
  monthLabel: string;
  groupNumber: number;
}

const Exports: React.FC<ExportsProps> = ({ monthLabel, groupNumber }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="bg-white p-5 rounded-lg mb-6"
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Exporte</h2>
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
        <div>
          <Button 
            variant="outline" 
            className="text-payroll-gray flex items-center gap-2"
          >
            <ArrowDown className="h-4 w-4" />
            Bewegungsdaten herunterladen
          </Button>
          <p className="text-xs mt-2 text-gray-500">
            Enthält die Vergütungsdaten aller Mitarbeitenden dieser Abrechnungsgruppe für diesen Monat
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Exports;
