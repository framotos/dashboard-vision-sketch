
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  category: string;
}

interface DocumentUploadsProps {
  initialDocuments: Document[];
}

const DocumentUploads: React.FC<DocumentUploadsProps> = ({ initialDocuments }) => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  
  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>, category: string) => {
    event.preventDefault();
    // In a real application, we would handle file uploads here
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  
  const renderCategoryDocuments = (category: string, title: string) => {
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
          >
            hochladen oder reinziehen
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white p-5 rounded-lg mb-6">
      <h2 className="text-lg font-medium mb-4">Dokumentenuploads</h2>
      
      {renderCategoryDocuments('preliminary', 'Probeabrechnung')}
      {renderCategoryDocuments('final', 'Finale Abrechnung')}
      {renderCategoryDocuments('transfer', 'Überweisungsvorlage')}
      
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
        >
          hochladen oder reinziehen
        </div>
      </div>
    </div>
  );
};

export default DocumentUploads;
