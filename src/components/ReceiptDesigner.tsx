'use client';

import React from 'react';

interface ReceiptDesignerProps {
  onJsonUpdate: (json: string) => void;
}

/**
 * TODO: Build your receipt designer here!
 * 
 * Requirements:
 * - Create a visual interface for designing receipts
 * - Support various element types (text, barcode, QR code, etc.)
 * - Generate JSON DSL from the design
 * - Call onJsonUpdate() whenever the design changes
 * 
 * Ideas to consider:
 * - Drag and drop interface
 * - Element palette
 * - Properties panel
 * - Live JSON preview
 * - Template presets
 */
export const ReceiptDesigner: React.FC<ReceiptDesignerProps> = ({ onJsonUpdate }) => {
  // TODO: Implement your receipt designer
  
  // Example: Update parent with sample JSON
  React.useEffect(() => {
    const sampleJson = {
      elements: [
        { type: "text", content: "TODO: Build your designer!" }
      ]
    };
    onJsonUpdate(JSON.stringify(sampleJson, null, 2));
  }, [onJsonUpdate]);

  return (
    <div className="h-full p-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 h-full">
        <h2 className="text-2xl font-bold mb-4">Receipt Designer</h2>
        
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">🚧 TODO: Implement Your Designer</h3>
          <p className="text-gray-700 mb-4">
            This is where you'll build your visual receipt designer!
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Create a way to add receipt elements</li>
            <li>Support different element types (text, barcode, QR, images, etc.)</li>
            <li>Allow editing element properties</li>
            <li>Generate JSON DSL from your design</li>
            <li>Make it intuitive for non-technical users</li>
          </ul>
          
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              <strong>Hint:</strong> Check out the existing printer interfaces in 
              <code className="mx-1 px-2 py-1 bg-gray-200 rounded">src/interfaces/</code>
              for available receipt elements and properties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};