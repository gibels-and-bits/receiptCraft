import { NextRequest, NextResponse } from 'next/server';

const ANDROID_SERVER = 'http://192.168.29.2:8080';
const COMPILATION_SERVER = 'http://192.168.29.3:3001';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { team_id, jsonData } = body;
    
    console.log(`[PRINT API] Processing print request for team: ${team_id}`);
    console.log(`[PRINT API] JSON data:`, jsonData);
    
    // Step 1: Execute interpreter with JSON data on compilation server
    console.log(`[PRINT API] Sending to compilation server: ${COMPILATION_SERVER}/execute`);
    const executeResponse = await fetch(`${COMPILATION_SERVER}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId: team_id,
        jsonData: typeof jsonData === 'string' ? jsonData : JSON.stringify(jsonData)
      }),
    });

    console.log(`[PRINT API] Compilation server response status: ${executeResponse.status}`);
    
    if (!executeResponse.ok) {
      const errorData = await executeResponse.json();
      console.error(`[PRINT API] Compilation server error:`, errorData);
      return NextResponse.json(
        { 
          error: 'Execution failed', 
          details: errorData.error || 'Unknown execution error'
        },
        { status: 400 }
      );
    }

    const executeResult = await executeResponse.json();
    console.log(`[PRINT API] Execution result:`, executeResult);
    
    if (!executeResult.success) {
      console.error(`[PRINT API] Execution not successful:`, executeResult.error);
      return NextResponse.json(
        { 
          error: 'Execution failed', 
          details: executeResult.error
        },
        { status: 400 }
      );
    }
    
    console.log(`[PRINT API] Commands generated: ${executeResult.commands?.length || 0}`);
    console.log(`[PRINT API] Commands:`, JSON.stringify(executeResult.commands));
    
    // Step 2: Send printer commands to Android server
    const printRequestBody = {
      team_id,
      commands: executeResult.commands
    };
    console.log(`[PRINT API] Sending to Android server: ${ANDROID_SERVER}/api/print-commands`);
    console.log(`[PRINT API] Print request body:`, JSON.stringify(printRequestBody));
    
    const printResponse = await fetch(`${ANDROID_SERVER}/api/print-commands`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(printRequestBody),
    });

    console.log(`[PRINT API] Android server response status: ${printResponse.status}`);
    
    if (!printResponse.ok) {
      const errorText = await printResponse.text();
      console.error(`[PRINT API] Android server error: ${printResponse.status}`, errorText);
      return NextResponse.json(
        { error: `Print server error: ${printResponse.status}`, details: errorText },
        { status: printResponse.status }
      );
    }

    const printResult = await printResponse.json();
    console.log(`[PRINT API] Print result:`, printResult);
    return NextResponse.json(printResult);
  } catch (error) {
    console.error('Print proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to process print request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}