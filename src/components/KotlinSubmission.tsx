'use client';

import React, { useState } from 'react';

interface KotlinSubmissionProps {
  jsonDsl: string;
  serverUrl?: string;
}

export const KotlinSubmission: React.FC<KotlinSubmissionProps> = ({ 
  jsonDsl, 
  serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080' 
}) => {
  const [teamName, setTeamName] = useState('');
  const [kotlinCode, setKotlinCode] = useState('');
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!teamName || !kotlinCode) {
      setError('Please provide team name and Kotlin code');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${serverUrl}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName,
          interpreterCode: kotlinCode
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setEndpoint(data.endpoint);
      setTestResult(`Interpreter uploaded successfully! Your endpoint: ${data.endpoint}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit interpreter');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestPrint = async () => {
    if (!endpoint) {
      setError('Please upload your interpreter first');
      return;
    }

    if (!jsonDsl) {
      setError('No JSON DSL available. Design a receipt first.');
      return;
    }

    setIsTesting(true);
    setError(null);
    setTestResult(null);

    try {
      const response = await fetch(`${serverUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonDsl
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setTestResult('Print test successful! Check the server console for output.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to test print');
    } finally {
      setIsTesting(false);
    }
  };

  const sampleKotlinCode = `// Team: ${teamName || 'Your Team Name'}

fun interpret(jsonString: String, printer: EpsonPrinter) {
    // Parse your JSON format
    val receipt = parseReceipt(jsonString)
    
    // Process each element
    for (element in receipt.elements) {
        when (element.type) {
            "text" -> {
                printer.addText(element.content, element.style)
            }
            "barcode" -> {
                printer.addBarcode(element.data, element.barcodeType, null)
            }
            // ... handle other types
        }
    }
    
    printer.cutPaper()
}

// Add your parsing logic here
fun parseReceipt(json: String): Receipt {
    // Your implementation
}`;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">Kotlin Interpreter Submission</h2>
        <p className="text-sm text-gray-300 mt-1">
          Write your Kotlin interpreter to process the JSON DSL
        </p>
      </div>

      {/* Team Info */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter your team name"
              className="w-full p-2 border rounded"
            />
          </div>
          {endpoint && (
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Your Endpoint</label>
              <div className="p-2 bg-green-50 border border-green-300 rounded font-mono text-sm">
                {endpoint}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 p-4 overflow-hidden">
        <label className="block text-sm font-medium mb-2">Kotlin Interpreter Code</label>
        <textarea
          value={kotlinCode}
          onChange={(e) => setKotlinCode(e.target.value)}
          placeholder={sampleKotlinCode}
          className="w-full h-full p-4 font-mono text-sm border rounded bg-gray-900 text-green-400"
          style={{ minHeight: '400px' }}
        />
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mx-4 mb-2 p-3 bg-red-50 border border-red-300 rounded text-red-700">
          {error}
        </div>
      )}
      {testResult && (
        <div className="mx-4 mb-2 p-3 bg-green-50 border border-green-300 rounded text-green-700">
          {testResult}
        </div>
      )}

      {/* Actions */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !teamName || !kotlinCode}
            className={`flex-1 py-2 px-4 rounded font-medium transition-colors ${
              isSubmitting || !teamName || !kotlinCode
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Uploading...' : 'Upload Interpreter'}
          </button>
          
          <button
            onClick={handleTestPrint}
            disabled={isTesting || !endpoint}
            className={`flex-1 py-2 px-4 rounded font-medium transition-colors ${
              isTesting || !endpoint
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isTesting ? 'Testing...' : 'Test Print'}
          </button>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Server URL:</strong> {serverUrl}</p>
          <p className="mt-1">
            {endpoint 
              ? '✅ Interpreter uploaded. Ready for testing!'
              : '⚠️ Upload your interpreter to enable testing'}
          </p>
        </div>
      </div>
    </div>
  );
};