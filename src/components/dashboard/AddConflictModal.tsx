
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample names for the dropdown
const sampleNames = [
  'Hannah Keuerhof',
  'Elisa Braun',
  'Max Mustermann',
  'Julia Schmidt',
  'Tobias Wagner',
  'Lena Fischer',
  'Felix Meyer',
  'Sarah Schneider',
  'Lukas Weber',
  'Nina Hoffmann'
];

interface AddConflictModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddConflict: (name: string, message: string) => void;
}

const AddConflictModal: React.FC<AddConflictModalProps> = ({ isOpen, onOpenChange, onAddConflict }) => {
  const [selectedName, setSelectedName] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = () => {
    if (selectedName && message) {
      onAddConflict(selectedName, message);
      setSelectedName('');
      setMessage('');
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Konflikt hinzufügen</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <Select value={selectedName} onValueChange={setSelectedName}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Name auswählen" />
              </SelectTrigger>
              <SelectContent>
                {sampleNames.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Nachricht</label>
            <Textarea 
              id="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder="Konfliktbeschreibung eingeben..." 
              className="min-h-[120px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Abbrechen</Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-payroll-blue hover:bg-blue-700 text-white"
            disabled={!selectedName || !message}
          >
            Hinzufügen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddConflictModal;
