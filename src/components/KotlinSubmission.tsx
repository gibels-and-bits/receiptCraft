'use client';

import React from 'react';

interface KotlinSubmissionProps {
  jsonDsl: string;
  serverUrl?: string;
}

/**
 * TODO: Build your Kotlin interpreter submission interface!
 * 
 * Requirements:
 * - Allow teams to enter their team name
 * - Provide a code editor for Kotlin interpreter code
 * - Submit the interpreter to the server
 * - Test the interpreter with the current JSON DSL
 * - Show the server response/status
 * 
 * API Endpoints:
 * - POST /submit - Upload interpreter
 * - POST /print/{teamId} - Test print with JSON
 * - PUT /submit/{teamId} - Update interpreter
 * 
 * Check src/lib/api.ts for API client functions
 */
export const KotlinSubmission: React.FC<KotlinSubmissionProps> = ({ 
  jsonDsl, 
  serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080' 
}) => {
  // TODO: Implement your submission interface
  
  return (
    <div className="h-full p-8 bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-6 h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Kotlin Interpreter Submission</h2>
        
        <div className="bg-gray-700 border-2 border-blue-500 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-2 text-blue-400">🚧 TODO: Implement Submission Interface</h3>
          <p className="text-gray-300 mb-4">
            This is where teams will submit their Kotlin interpreter code!
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li>Add team name input field</li>
            <li>Create code editor for Kotlin interpreter</li>
            <li>Implement upload to server functionality</li>
            <li>Add test print button</li>
            <li>Display server responses and status</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-900 rounded">
            <h4 className="font-semibold mb-2 text-gray-200">Current JSON DSL:</h4>
            <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto max-h-64 font-mono">
              {jsonDsl || '// No JSON generated yet'}
            </pre>
          </div>
          
          <div className="p-4 bg-gray-700 border border-gray-600 rounded">
            <p className="text-sm text-gray-300">
              <strong className="text-gray-100">Server URL:</strong> <span className="text-blue-400 font-mono">{serverUrl}</span>
            </p>
            <p className="text-sm mt-1 text-gray-400">
              <strong className="text-gray-300">Hint:</strong> Check the <code className="px-1 py-0.5 bg-gray-900 text-green-400 rounded font-mono">kotlin-examples/</code> folder for starter code and mock printer!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};