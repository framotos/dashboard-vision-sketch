
import React from 'react';
import { Button } from '@/components/ui/button';

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
  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="text-lg font-medium mb-4">Lohnlauf Freigaben</h2>
      
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
    </div>
  );
};

export default Approvals;
