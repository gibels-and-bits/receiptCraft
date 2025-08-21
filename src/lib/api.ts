/**
 * API client for the receipt printer server
 */

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080';

export interface SubmissionResponse {
  endpoint: string;
  status: string;
}

export interface PrintResponse {
  success: boolean;
  error?: string;
}

/**
 * Upload interpreter code to the server
 */
export async function uploadInterpreter(teamName: string, code: string): Promise<SubmissionResponse> {
  const response = await fetch(`${SERVER_URL}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      teamName, 
      interpreterCode: code 
    })
  });
  
  if (!response.ok) {
    throw new Error(`Failed to upload interpreter: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Test print with uploaded interpreter
 */
export async function testPrint(endpoint: string, json: object): Promise<PrintResponse> {
  const response = await fetch(`${SERVER_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json)
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Print failed: ${response.status} - ${errorText}`);
  }
  
  return response.json();
}

/**
 * Update interpreter code (before submission freeze)
 */
export async function updateInterpreter(teamId: string, code: string): Promise<{ status: string }> {
  const response = await fetch(`${SERVER_URL}/submit/${teamId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      interpreterCode: code 
    })
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update interpreter: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Check server health
 */
export async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${SERVER_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    return response.ok;
  } catch {
    return false;
  }
}