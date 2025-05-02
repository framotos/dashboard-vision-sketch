
import React, { useState, useRef } from 'react';
import { X, ChevronDown, ChevronUp, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Document {
  id: string;
  name: string;
  category: string;
}

interface DocumentUploadsProps {
  initialDocuments: Document[];
  onDocumentsUpload?: (documents: Document[]) => void;
}

const DocumentUploads: React.FC<DocumentUploadsProps> = ({ initialDocuments, onDocumentsUpload }) => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [isOpen, setIsOpen] = useState(true);
  
  // Create refs for each upload area
  const preliminaryRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);
  const transferRef = useRef<HTMLInputElement>(null);
  const otherRef = useRef<HTMLInputElement>(null);
  
  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>, category: string) => {
    event.preventDefault();
    
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFiles(Array.from(event.dataTransfer.files), category);
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFiles(Array.from(event.target.files), category);
    }
  };
  
  const handleFiles = (files: File[], category: string) => {
    const newDocs = files.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      category
    }));
    
    const updatedDocs = [...documents, ...newDocs];
    setDocuments(updatedDocs);
    
    if (onDocumentsUpload) {
      onDocumentsUpload(newDocs);
    }
  };
  
  const handleUploadClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };
  
  const renderCategoryDocuments = (category: string, title: string, ref: React.RefObject<HTMLInputElement>) => {
    const categoryDocs = documents.filter(doc => doc.category === category);
    
    return (
      <div className="mb-5">
        <h3 className="text-sm font-medium mb-2">{title}</h3>
        {categoryDocs.length > 0 ? (
          <div className="space-y-2">
            {categoryDocs.map(doc => (
              <div 
                key={doc.id}
                className="flex items-center gap-2 bg-blue-50 text-blue-800 rounded-md p-2 text-sm"
              >
                <span className="flex-1">{doc.name}</span>
                <button 
                  onClick={() => removeDocument(doc.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer text-sm text-gray-500 hover:border-gray-400 transition-colors"
            onDrop={(e) => handleDrop(e, category)}
            onDragOver={handleDragOver}
            onClick={() => handleUploadClick(ref)}
          >
            <Upload className="h-4 w-4 mx-auto mb-2" />
            hochladen oder reinziehen
            <input 
              type="file"
              ref={ref}
              className="hidden"
              onChange={(e) => handleFileChange(e, category)}
              multiple
            />
          </div>
        )}
      </div>
    );
  };
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white p-5 rounded-lg mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Dokumentenuploads</h2>
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
        {renderCategoryDocuments('preliminary', 'Probeabrechnung', preliminaryRef)}
        {renderCategoryDocuments('final', 'Finale Abrechnung', finalRef)}
        {renderCategoryDocuments('transfer', 'Überweisungsvorlage', transferRef)}
        
        <div className="mb-5">
          <h3 className="text-sm font-medium mb-2">Weitere Dokumente</h3>
          <div className="space-y-2">
            {documents
              .filter(doc => doc.category === 'other')
              .map(doc => (
                <div 
                  key={doc.id}
                  className="flex items-center gap-2 bg-blue-50 text-blue-800 rounded-md p-2 text-sm"
                >
                  <span className="flex-1">{doc.name}</span>
                  <button 
                    onClick={() => removeDocument(doc.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
          </div>
          
          <div
            className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer text-sm text-gray-500 hover:border-gray-400 transition-colors"
            onDrop={(e) => handleDrop(e, 'other')}
            onDragOver={handleDragOver}
            onClick={() => handleUploadClick(otherRef)}
          >
            <Upload className="h-4 w-4 mx-auto mb-2" />
            hochladen oder reinziehen
            <input 
              type="file"
              ref={otherRef}
              className="hidden"
              onChange={(e) => handleFileChange(e, 'other')}
              multiple
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DocumentUploads;
