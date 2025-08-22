import { NextRequest, NextResponse } from 'next/server';

const ANDROID_SERVER = 'http://192.168.29.2:8080';

export async function POST(
  request: NextRequest,
  { params }: { params: { teamId: string } }
) {
  try {
    const body = await request.json();
    
    // Forward the print request to the Android server
    const response = await fetch(`${ANDROID_SERVER}/api/print/${params.teamId}`, {
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
  { params }: { params: { teamId: string } }
) {
  try {
    const body = await request.json();
    const COMPILATION_SERVER = 'http://192.168.29.3:3001';
    
    // Forward the execute request to the compilation server
    const response = await fetch(`${COMPILATION_SERVER}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        teamId: params.teamId,
        json: body.json
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