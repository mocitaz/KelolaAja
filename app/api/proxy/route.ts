import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api-config";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const token = request.headers.get("authorization");

  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
  }

  const url = `${API_BASE_URL}${endpoint}`;
  console.log('[Proxy GET] Request to:', url);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json"
      }
    });

    console.log('[Proxy GET] Status:', response.status);

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Proxy GET] Error:', error);
    return NextResponse.json({ success: false, message: "Network error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const token = request.headers.get("authorization");
  const body = await request.json();

  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
  }

  const url = `${API_BASE_URL}${endpoint}`;
  console.log('[Proxy POST] Request to:', url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    console.log('[Proxy POST] Status:', response.status);

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Proxy POST] Error:', error);
    return NextResponse.json({ success: false, message: "Network error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const token = request.headers.get("authorization");
  const body = await request.json();

  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
  }

  const url = `${API_BASE_URL}${endpoint}`;
  console.log('[Proxy PUT] Request to:', url);

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    console.log('[Proxy PUT] Status:', response.status);

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Proxy PUT] Error:', error);
    return NextResponse.json({ success: false, message: "Network error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const token = request.headers.get("authorization");

  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
  }

  const url = `${API_BASE_URL}${endpoint}`;
  console.log('[Proxy DELETE] Request to:', url);

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json"
      }
    });

    console.log('[Proxy DELETE] Status:', response.status);

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Proxy DELETE] Error:', error);
    return NextResponse.json({ success: false, message: "Network error" }, { status: 500 });
  }
}
