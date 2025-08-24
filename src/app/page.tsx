'use client';

import React, { useState } from 'react';
import { ReceiptDesigner } from '../components/ReceiptDesigner';
import { KotlinSubmission } from '../components/KotlinSubmission';
import Rules from '../components/Rules';
import { testPrint } from '../lib/api';
// TODO: Import and use the HTMLCanvasEpsonPrinter for preview functionality

export default function Home() {
  const [activeTab, setActiveTab] = useState<'rules' | 'design' | 'preview' | 'submit'>('rules');
  const [jsonDsl, setJsonDsl] = useState<string>(JSON.stringify({ elements: [] }, null, 2));
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printStatus, setPrintStatus] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [selectedRound, setSelectedRound] = useState<number>(0);

  const handleJsonUpdate = (json: string) => {
    setJsonDsl(json);
  };

  const handleSubmissionSuccess = (newEndpoint: string, newTeamId: string) => {
    setEndpoint(newEndpoint);
    setTeamId(newTeamId);
  };

  const handlePrintCurrentDesign = async () => {
    if (!endpoint) {
      setPrintStatus({ type: 'error', text: 'No interpreter uploaded yet' });
      return;
    }

    if (!jsonDsl) {
      setPrintStatus({ type: 'error', text: 'No design to print - create a receipt first!' });
      return;
    }

    setIsPrinting(true);
    setPrintStatus(null);

    try {
      const jsonObject = JSON.parse(jsonDsl);
      const response = await testPrint(endpoint, jsonObject, selectedRound);
      
      // Check if it was ASCII mode or real printer
      const successMessage = response.message?.includes('ASCII') 
        ? `Round ${selectedRound} executed successfully! (ASCII mode - ${response.commandCount || 0} commands)`
        : `Round ${selectedRound} design sent to printer successfully!`;
      
      setPrintStatus({ 
        type: 'success', 
        text: successMessage
      });
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setPrintStatus(null), 3000);
    } catch (err) {
      setPrintStatus({ 
        type: 'error', 
        text: err instanceof Error ? err.message : 'Failed to print design' 
      });
    } finally {
      setIsPrinting(false);
    }
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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">
              🧾 Receipt Designer Challenge: Full-Stack Edition
            </h1>
            <p className="text-gray-400 mt-1">
              Design visually, compile to JSON, interpret with Kotlin
            </p>
          </div>
          
          {/* Print Button - Only visible after successful submission */}
          {endpoint && (
            <div className="flex items-center gap-4">
              {printStatus && (
                <div className={`px-4 py-2 rounded-lg text-sm ${
                  printStatus.type === 'success' 
                    ? 'bg-green-900 border border-green-700 text-green-200' 
                    : 'bg-red-900 border border-red-700 text-red-200'
                }`}>
                  {printStatus.text}
                </div>
              )}
              
              {/* Round Selector */}
              <select 
                value={selectedRound} 
                onChange={(e) => setSelectedRound(Number(e.target.value))}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value={0}>Practice (No Order)</option>
                <option value={1}>Round 1 - Basic</option>
                <option value={2}>Round 2 - Promotions</option>
                <option value={3}>Round 3 - Customer</option>
                <option value={4}>Round 4 - Complex</option>
                <option value={5}>Round 5 - Final</option>
              </select>
              
              <button
                onClick={handlePrintCurrentDesign}
                disabled={isPrinting || !jsonDsl}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  isPrinting || !jsonDsl
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-lg hover:shadow-xl'
                }`}
              >
                <span className="text-lg">🖨️</span>
                {isPrinting ? 'Printing...' : `Print Round ${selectedRound}`}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('rules')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'rules'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              📜 Rules
            </button>
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
          {activeTab === 'rules' && (
            <div className="h-full overflow-y-auto">
              <Rules />
            </div>
          )}

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
            <div className="h-full overflow-y-auto">
              <KotlinSubmission 
                jsonDsl={jsonDsl} 
                onSubmissionSuccess={handleSubmissionSuccess}
              />
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