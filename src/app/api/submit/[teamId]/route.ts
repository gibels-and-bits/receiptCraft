import { NextRequest, NextResponse } from 'next/server';

const DEBUG_MODE = process.env.DEBUG === 'true';
const ANDROID_SERVER = DEBUG_MODE ? 'http://localhost:8080' : 'http://192.168.29.2:8080';
const COMPILATION_SERVER = DEBUG_MODE ? 'http://localhost:3001' : 'http://192.168.29.3:3001';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  try {
    const { teamId } = await params;
    const body = await request.json();
    
    // Forward the print request to the Android server
    const response = await fetch(`${ANDROID_SERVER}/api/print/${teamId}`, {
      method: 'POST',
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  try {
    const { teamId } = await params;
    const body = await request.json();
    
    // Forward the update request to the compilation server to recompile
    const response = await fetch(`${COMPILATION_SERVER}/compile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId: teamId,
        teamName: teamId, // Use teamId as teamName for updates
        code: body.interpreterCode
      }),
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