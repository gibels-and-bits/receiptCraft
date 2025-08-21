'use client';

import React, { useState } from 'react';
import { ReceiptDesigner } from '../components/ReceiptDesigner';
import { KotlinSubmission } from '../components/KotlinSubmission';
import { ReceiptPrinter } from '../components/ReceiptPrinter';
import { HTMLCanvasEpsonPrinter } from '../html-canvas-printer';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'design' | 'preview' | 'submit'>('design');
  const [jsonDsl, setJsonDsl] = useState<string>('');
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  const handleJsonUpdate = (json: string) => {
    setJsonDsl(json);
  };

  const handlePreview = () => {
    if (canvasRef && jsonDsl) {
      try {
        const printer = new HTMLCanvasEpsonPrinter(canvasRef);
        // Parse and render the JSON to canvas
        const data = JSON.parse(jsonDsl);
        
        // Simple rendering for preview
        data.elements?.forEach((element: any) => {
          switch (element.type) {
            case 'text':
              printer.addText(element.content || '');
              break;
            case 'barcode':
              printer.addBarcode(element.data || '', element.barcodeType || 'CODE39');
              break;
            case 'feed':
              printer.addFeedLine(element.lines || 1);
              break;
            case 'divider':
              printer.addText('-'.repeat(48));
              printer.addFeedLine(1);
              break;
            // Add more cases as needed
          }
        });
        printer.cutPaper();
      } catch (err) {
        console.error('Preview error:', err);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            🧾 Receipt Designer Challenge: Full-Stack Edition
          </h1>
          <p className="text-gray-600 mt-1">
            Design visually, compile to JSON, interpret with Kotlin
          </p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('design')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'design'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 Design
            </button>
            <button
              onClick={() => {
                setActiveTab('preview');
                setTimeout(handlePreview, 100);
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'preview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              👁️ Preview
            </button>
            <button
              onClick={() => setActiveTab('submit')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'submit'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🚀 Submit
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto">
          {activeTab === 'design' && (
            <div className="h-full flex">
              <div className="flex-1">
                <ReceiptDesigner onJsonUpdate={handleJsonUpdate} />
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full p-6">
              <div className="h-full bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4">Receipt Preview</h2>
                <div className="flex gap-6 h-full">
                  <div className="flex-1 border rounded p-4 overflow-auto">
                    <canvas
                      ref={setCanvasRef}
                      width={384}
                      height={800}
                      className="mx-auto bg-white"
                      style={{ border: '1px solid #ddd' }}
                    />
                  </div>
                  <div className="w-96">
                    <h3 className="font-medium mb-2">JSON DSL</h3>
                    <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded h-96 overflow-auto">
                      {jsonDsl || '// Design a receipt first'}
                    </pre>
                    <button
                      onClick={handlePreview}
                      className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Refresh Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submit' && (
            <div className="h-full">
              <KotlinSubmission jsonDsl={jsonDsl} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t px-6 py-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>
            Build your receipt designer → Generate JSON DSL → Write Kotlin interpreter → Test on real hardware!
          </p>
        </div>
      </footer>
    </div>
  );
}