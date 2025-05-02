
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ApprovalItem {
  id: number;
  type: string;
  timestamp: string | null;
  status: 'approved' | 'open';
}

interface ApprovalsProps {
  approvals: ApprovalItem[];
}

const Approvals: React.FC<ApprovalsProps> = ({ approvals }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white p-5 rounded-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Lohnlauf Freigaben</h2>
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
        <div className="grid grid-cols-12 text-sm font-medium text-gray-500 mb-2">
          <div className="col-span-4">Art</div>
          <div className="col-span-5">Timestamp</div>
          <div className="col-span-3 text-right">Status</div>
        </div>
        
        {approvals.map(approval => (
          <div key={approval.id} className="grid grid-cols-12 py-3 border-b border-gray-100 text-sm">
            <div className="col-span-4">
              {approval.type}
            </div>
            <div className="col-span-5">
              {approval.timestamp || '-'}
            </div>
            <div className="col-span-3 text-right">
              {approval.status === 'approved' ? (
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                  freigegeben
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                  offen
                </span>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-6 text-right">
          <Button className="bg-payroll-blue hover:bg-blue-700">
            Abrechnungsgruppe abschließen
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Approvals;
