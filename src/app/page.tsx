'use client';

import React, { useState } from 'react';
import { ReceiptDesigner } from '../components/ReceiptDesigner';
import { KotlinSubmission } from '../components/KotlinSubmission';
// TODO: Import and use the HTMLCanvasEpsonPrinter for preview functionality

export default function Home() {
  const [activeTab, setActiveTab] = useState<'design' | 'preview' | 'submit'>('design');
  const [jsonDsl, setJsonDsl] = useState<string>('');

  const handleJsonUpdate = (json: string) => {
    setJsonDsl(json);
  };

  const handlePreview = () => {
    // TODO: Implement preview functionality
    // 1. Parse the JSON DSL
    // 2. Use HTMLCanvasEpsonPrinter to render to canvas
    // 3. Show the receipt preview
    console.log('Preview not implemented yet!');
    console.log('Current JSON:', jsonDsl);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-100">
            🧾 Receipt Designer Challenge: Full-Stack Edition
          </h1>
          <p className="text-gray-400 mt-1">
            Design visually, compile to JSON, interpret with Kotlin
          </p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('design')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'design'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
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
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              👁️ Preview
            </button>
            <button
              onClick={() => setActiveTab('submit')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'submit'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
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
            <div className="h-full">
              <ReceiptDesigner onJsonUpdate={handleJsonUpdate} />
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="h-full p-6">
              <div className="h-full bg-gray-800 rounded-lg shadow-2xl p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-100">Receipt Preview</h2>
                
                <div className="bg-gray-700 border-2 border-orange-500 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2 text-orange-400">🚧 TODO: Implement Preview</h3>
                  <p className="text-gray-300 mb-4">
                    This is where you'll render the receipt preview using HTMLCanvasEpsonPrinter!
                  </p>
                  
                  <ul className="list-disc list-inside space-y-2 text-gray-400">
                    <li>Add a canvas element for rendering</li>
                    <li>Parse the JSON DSL</li>
                    <li>Use HTMLCanvasEpsonPrinter to render elements</li>
                    <li>Show the visual receipt preview</li>
                  </ul>
                  
                  <div className="mt-6 p-4 bg-gray-900 rounded">
                    <h4 className="font-semibold mb-2 text-gray-200">Current JSON:</h4>
                    <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto max-h-40 font-mono">
                      {jsonDsl || '// Design a receipt first'}
                    </pre>
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
      <footer className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
          <p>
            Build your receipt designer → Generate JSON DSL → Write Kotlin interpreter → Test on real hardware!
          </p>
        </div>
      </footer>
    </div>
  );
}