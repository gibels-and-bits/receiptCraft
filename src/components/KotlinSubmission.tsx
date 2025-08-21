'use client';

import React, { useState } from 'react';
import { uploadInterpreter, testPrint, updateInterpreter } from '../lib/api';

interface KotlinSubmissionProps {
  jsonDsl: string;
  serverUrl?: string;
}

export const KotlinSubmission: React.FC<KotlinSubmissionProps> = ({ 
  jsonDsl, 
  serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://192.168.29.2:8080' 
}) => {
  const [teamName, setTeamName] = useState('');
  const [kotlinCode, setKotlinCode] = useState('');
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

  const handleSubmit = async () => {
    if (!teamName.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a team name' });
      return;
    }
    
    if (!kotlinCode.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your Kotlin interpreter code' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await uploadInterpreter(teamName, kotlinCode);
      setEndpoint(response.endpoint);
      const extractedTeamId = response.endpoint.split('/').pop() || '';
      setTeamId(extractedTeamId);
      setStatusMessage({ 
        type: 'success', 
        text: `Interpreter uploaded successfully! Your endpoint: ${response.endpoint}` 
      });
    } catch (err) {
      setStatusMessage({ 
        type: 'error', 
        text: err instanceof Error ? err.message : 'Failed to submit interpreter' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!teamId) {
      setStatusMessage({ type: 'error', text: 'No team ID found. Please submit first.' });
      return;
    }

    if (!kotlinCode.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your Kotlin interpreter code' });
      return;
    }

    setIsUpdating(true);
    setStatusMessage(null);

    try {
      await updateInterpreter(teamId, kotlinCode);
      setStatusMessage({ 
        type: 'success', 
        text: 'Interpreter updated successfully!' 
      });
    } catch (err) {
      setStatusMessage({ 
        type: 'error', 
        text: err instanceof Error ? err.message : 'Failed to update interpreter' 
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTestPrint = async () => {
    if (!endpoint) {
      setStatusMessage({ type: 'error', text: 'Please upload your interpreter first' });
      return;
    }

    if (!jsonDsl) {
      setStatusMessage({ type: 'error', text: 'No JSON DSL available. Design a receipt first!' });
      return;
    }

    setIsTesting(true);
    setStatusMessage(null);

    try {
      const jsonObject = JSON.parse(jsonDsl);
      const response = await testPrint(endpoint, jsonObject);
      setStatusMessage({ 
        type: 'success', 
        text: `Print test ${response.success ? 'successful' : 'failed'}! Check the server console for output.` 
      });
    } catch (err) {
      setStatusMessage({ 
        type: 'error', 
        text: err instanceof Error ? err.message : 'Failed to test print' 
      });
    } finally {
      setIsTesting(false);
    }
  };

  const sampleKotlinCode = `fun interpret(jsonString: String, printer: EpsonPrinter) {
    // Parse your JSON format
    val json = Json.parseToJsonElement(jsonString)
    val elements = json.jsonObject["elements"]?.jsonArray ?: return
    
    // Process each element
    for (element in elements) {
        val obj = element.jsonObject
        when (obj["type"]?.jsonPrimitive?.content) {
            "text" -> {
                val content = obj["content"]?.jsonPrimitive?.content ?: ""
                printer.addText(content)
            }
            "barcode" -> {
                val data = obj["data"]?.jsonPrimitive?.content ?: ""
                printer.addBarcode(data, BarcodeType.CODE39, null)
            }
            "feed" -> {
                val lines = obj["lines"]?.jsonPrimitive?.int ?: 1
                printer.addFeedLine(lines)
            }
            // Add more element types...
        }
    }
    
    printer.cutPaper()
}`;

  return (
    <div className="h-full p-8 bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Kotlin Interpreter Submission</h2>
        
        {/* Team Info Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Team Name
            <span className="ml-2 text-xs text-gray-500 font-normal">
              (Make it unique - it will be used in your URL endpoint)
            </span>
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter your unique team name"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            disabled={!!endpoint}
          />
          {endpoint && (
            <div className="mt-2 p-3 bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-gray-100">Your Endpoint:</strong>{' '}
                <code className="text-green-400 bg-black px-2 py-1 rounded font-mono">{endpoint}</code>
              </p>
            </div>
          )}
        </div>

        {/* Kotlin Code Editor */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Kotlin Interpreter Code
          </label>
          <textarea
            value={kotlinCode}
            onChange={(e) => setKotlinCode(e.target.value)}
            placeholder={sampleKotlinCode}
            className="w-full h-96 px-4 py-3 bg-black text-green-400 font-mono text-sm border border-gray-600 rounded-lg placeholder-gray-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            spellCheck={false}
          />
        </div>

        {/* Status Messages */}
        {statusMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            statusMessage.type === 'success' ? 'bg-green-900 border border-green-700 text-green-200' :
            statusMessage.type === 'error' ? 'bg-red-900 border border-red-700 text-red-200' :
            'bg-blue-900 border border-blue-700 text-blue-200'
          }`}>
            {statusMessage.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          {!endpoint ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !teamName.trim() || !kotlinCode.trim()}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                isSubmitting || !teamName.trim() || !kotlinCode.trim()
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {isSubmitting ? 'Uploading...' : 'Submit Interpreter'}
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                disabled={isUpdating || !kotlinCode.trim()}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                  isUpdating || !kotlinCode.trim()
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-yellow-600 text-white hover:bg-yellow-700 active:bg-yellow-800'
                }`}
              >
                {isUpdating ? 'Updating...' : 'Update Interpreter'}
              </button>
              
              <button
                onClick={handleTestPrint}
                disabled={isTesting}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                  isTesting
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'
                }`}
              >
                {isTesting ? 'Testing...' : 'Test Print'}
              </button>
            </>
          )}
        </div>

        {/* Info Section */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="font-semibold mb-2 text-gray-200">Current JSON DSL:</h4>
            <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto max-h-40 font-mono">
              {jsonDsl || '// No JSON generated yet - design a receipt first!'}
            </pre>
          </div>
          
          <div className="p-4 bg-gray-700 border border-gray-600 rounded-lg">
            <p className="text-sm text-gray-400">
              <strong className="text-gray-300">Tips:</strong>
            </p>
            <ul className="text-sm text-gray-400 mt-1 list-disc list-inside">
              <li>Check <code className="px-1 py-0.5 bg-gray-900 text-green-400 rounded">kotlin-examples/</code> for templates</li>
              <li>Test locally with MockEpsonPrinter first</li>
              <li>Handle all element types in your JSON</li>
              <li>Always call printer.cutPaper() at the end</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};