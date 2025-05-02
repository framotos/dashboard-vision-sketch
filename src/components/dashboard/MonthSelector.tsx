
import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ selectedMonth, onMonthChange }) => {
  // Available months for selection
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
    'Januar 2025',
    'Februar 2025',
    'März 2025',
    'April 2025',
    'Mai 2025',
    'Juni 2025',
  ];

  return (
    <div className="px-6 py-4">
      <Select value={selectedMonth} onValueChange={onMonthChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Monat auswählen">
            {selectedMonth}
          </SelectValue>
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
