'use client';

import React, { useState, useCallback } from 'react';
import { LayoutModel } from '../interfaces/receipt-models';

interface ReceiptElement {
  id: string;
  type: 'text' | 'barcode' | 'qrcode' | 'image' | 'divider' | 'dynamic' | 'feed';
  content?: string;
  data?: string;
  field?: string;
  lines?: number;
  imageData?: string;
  barcodeType?: string;
  style?: {
    bold?: boolean;
    size?: 'SMALL' | 'NORMAL' | 'LARGE' | 'XLARGE';
  };
}

interface ReceiptDesignerProps {
  onJsonUpdate: (json: string) => void;
}

export const ReceiptDesigner: React.FC<ReceiptDesignerProps> = ({ onJsonUpdate }) => {
  const [elements, setElements] = useState<ReceiptElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [jsonPreview, setJsonPreview] = useState<string>('');

  const elementTypes = [
    { type: 'text', label: 'Text', icon: '📝' },
    { type: 'barcode', label: 'Barcode', icon: '📊' },
    { type: 'qrcode', label: 'QR Code', icon: '🔲' },
    { type: 'image', label: 'Image', icon: '🖼️' },
    { type: 'divider', label: 'Divider', icon: '➖' },
    { type: 'dynamic', label: 'Dynamic Field', icon: '🔄' },
    { type: 'feed', label: 'Line Feed', icon: '↩️' },
  ];

  const dynamicFields = [
    '{store_name}',
    '{store_address}',
    '{cashier_name}',
    '{timestamp}',
    '{order_number}',
    '{subtotal}',
    '{tax}',
    '{total}',
    '{item_list}',
  ];

  const addElement = (type: string) => {
    const newElement: ReceiptElement = {
      id: `element-${Date.now()}`,
      type: type as any,
      content: type === 'text' ? 'Sample Text' : undefined,
      data: type === 'barcode' || type === 'qrcode' ? '123456789' : undefined,
      field: type === 'dynamic' ? '{store_name}' : undefined,
      lines: type === 'feed' ? 1 : undefined,
      barcodeType: type === 'barcode' ? 'CODE39' : undefined,
    };
    
    setElements([...elements, newElement]);
    updateJson([...elements, newElement]);
  };

  const updateElement = (id: string, updates: Partial<ReceiptElement>) => {
    const updatedElements = elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(updatedElements);
    updateJson(updatedElements);
  };

  const deleteElement = (id: string) => {
    const updatedElements = elements.filter(el => el.id !== id);
    setElements(updatedElements);
    updateJson(updatedElements);
  };

  const moveElement = (id: string, direction: 'up' | 'down') => {
    const index = elements.findIndex(el => el.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === elements.length - 1)) {
      return;
    }
    
    const newElements = [...elements];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newElements[index], newElements[swapIndex]] = [newElements[swapIndex], newElements[index]];
    
    setElements(newElements);
    updateJson(newElements);
  };

  const updateJson = (elements: ReceiptElement[]) => {
    const json = {
      elements: elements.map(({ id, ...el }) => el)
    };
    const jsonString = JSON.stringify(json, null, 2);
    setJsonPreview(jsonString);
    onJsonUpdate(jsonString);
  };

  return (
    <div className="flex h-full">
      {/* Element Palette */}
      <div className="w-48 bg-gray-100 p-4 border-r">
        <h3 className="font-bold mb-4">Elements</h3>
        <div className="space-y-2">
          {elementTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => addElement(type)}
              className="w-full p-2 bg-white rounded hover:bg-blue-50 text-left flex items-center gap-2 transition-colors"
            >
              <span>{icon}</span>
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Design Canvas */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="font-bold mb-4">Receipt Layout</h3>
        {elements.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Click an element from the palette to start designing
          </div>
        ) : (
          <div className="space-y-2">
            {elements.map((element, index) => (
              <div
                key={element.id}
                className={`p-3 bg-white border rounded-lg cursor-pointer transition-all ${
                  selectedElement === element.id ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedElement(element.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="font-medium text-sm text-gray-600">{element.type.toUpperCase()}</span>
                    {element.content && <div className="mt-1">{element.content}</div>}
                    {element.data && <div className="mt-1 font-mono text-sm">{element.data}</div>}
                    {element.field && <div className="mt-1 text-blue-600">{element.field}</div>}
                    {element.lines && <div className="mt-1 text-sm">Lines: {element.lines}</div>}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); moveElement(element.id, 'up'); }}
                      className="p-1 hover:bg-gray-100 rounded"
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); moveElement(element.id, 'down'); }}
                      className="p-1 hover:bg-gray-100 rounded"
                      disabled={index === elements.length - 1}
                    >
                      ↓
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }}
                      className="p-1 hover:bg-red-100 text-red-600 rounded"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Properties Panel */}
      <div className="w-80 bg-gray-50 p-4 border-l">
        <h3 className="font-bold mb-4">Properties</h3>
        {selectedElement && elements.find(el => el.id === selectedElement) ? (
          <div className="space-y-4">
            {(() => {
              const element = elements.find(el => el.id === selectedElement)!;
              return (
                <>
                  {element.type === 'text' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Text Content</label>
                      <textarea
                        value={element.content || ''}
                        onChange={(e) => updateElement(selectedElement, { content: e.target.value })}
                        className="w-full p-2 border rounded"
                        rows={3}
                      />
                      <div className="mt-2 space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={element.style?.bold || false}
                            onChange={(e) => updateElement(selectedElement, { 
                              style: { ...element.style, bold: e.target.checked }
                            })}
                            className="mr-2"
                          />
                          Bold
                        </label>
                        <div>
                          <label className="block text-sm font-medium mb-1">Size</label>
                          <select
                            value={element.style?.size || 'NORMAL'}
                            onChange={(e) => updateElement(selectedElement, {
                              style: { ...element.style, size: e.target.value as any }
                            })}
                            className="w-full p-2 border rounded"
                          >
                            <option value="SMALL">Small</option>
                            <option value="NORMAL">Normal</option>
                            <option value="LARGE">Large</option>
                            <option value="XLARGE">Extra Large</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {(element.type === 'barcode' || element.type === 'qrcode') && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Data</label>
                      <input
                        type="text"
                        value={element.data || ''}
                        onChange={(e) => updateElement(selectedElement, { data: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                      {element.type === 'barcode' && (
                        <div className="mt-2">
                          <label className="block text-sm font-medium mb-1">Barcode Type</label>
                          <select
                            value={element.barcodeType || 'CODE39'}
                            onChange={(e) => updateElement(selectedElement, { barcodeType: e.target.value })}
                            className="w-full p-2 border rounded"
                          >
                            <option value="CODE39">CODE39</option>
                            <option value="CODE128">CODE128</option>
                            <option value="EAN13">EAN13</option>
                            <option value="UPC_A">UPC-A</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {element.type === 'dynamic' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Dynamic Field</label>
                      <select
                        value={element.field || ''}
                        onChange={(e) => updateElement(selectedElement, { field: e.target.value })}
                        className="w-full p-2 border rounded"
                      >
                        {dynamicFields.map(field => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  {element.type === 'feed' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Number of Lines</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={element.lines || 1}
                        onChange={(e) => updateElement(selectedElement, { lines: parseInt(e.target.value) })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            Select an element to edit its properties
          </div>
        )}
        
        {/* JSON Preview */}
        <div className="mt-8">
          <h4 className="font-medium mb-2">JSON Preview</h4>
          <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded overflow-x-auto max-h-64">
            {jsonPreview || '{\n  "elements": []\n}'}
          </pre>
        </div>
      </div>
    </div>
  );
};