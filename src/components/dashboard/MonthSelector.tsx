
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedMonth, onMonthChange }) => {
  const months = [
    'Januar 2024',
    'Februar 2024',
    'März 2024',
    'April 2024',
    'Mai 2024',
    'Juni 2024',
    'Juli 2024',
    'August 2024',
    'September 2024',
    'Oktober 2024',
    'November 2024',
    'Dezember 2024',
  ];

  return (
    <div className="px-6 py-4">
      <Select value={selectedMonth} onValueChange={onMonthChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder={selectedMonth} />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MonthSelector;
