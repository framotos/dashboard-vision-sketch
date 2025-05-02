
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExportsProps {
  monthLabel: string;
  groupNumber: number;
}

const Exports: React.FC<ExportsProps> = ({ monthLabel, groupNumber }) => {
  return (
    <div className="bg-white p-5 rounded-lg mb-6">
      <h2 className="text-lg font-medium mb-3">Exporte</h2>
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
    </div>
  );
};

export default Exports;
