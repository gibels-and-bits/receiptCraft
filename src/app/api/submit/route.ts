import { NextRequest, NextResponse } from 'next/server';

const COMPILATION_SERVER = 'http://192.168.29.3:3001';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { team_id, teamName, interpreterCode } = body;
    
    // Forward to compilation server - it will handle Android server notification
    const compileResponse = await fetch(`${COMPILATION_SERVER}/compile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId: team_id,
        teamName: teamName,
        code: interpreterCode
      }),
    });

    if (!compileResponse.ok) {
      const errorData = await compileResponse.json();
      console.error('Compilation failed:', errorData);
      return NextResponse.json(
        { 
          error: 'Compilation failed', 
          details: errorData.error || 'Unknown compilation error',
          lineNumber: errorData.lineNumber 
        },
        { status: 400 }
      );
    }

    const compileResult = await compileResponse.json();
    if (!compileResult.success) {
      console.error('Compilation not successful:', compileResult);
      return NextResponse.json(
        { 
          error: 'Compilation failed', 
          details: compileResult.error,
          lineNumber: compileResult.lineNumber 
        },
        { status: 400 }
      );
    }

    // Return success with team info
    return NextResponse.json({
      success: true,
      message: compileResult.message || `Interpreter compiled and uploaded successfully for ${teamName}`,
      teamId: team_id,
      team_id
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to compilation server', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const teamId = url.pathname.split('/').pop();
    const body = await request.json();
    
    // Forward the request to the Android server
    const response = await fetch(`${ANDROID_SERVER}/submit/${teamId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Server error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to server', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}