import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const url = `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`;
    console.log('[Login Proxy] Attempting login to:', url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    console.log('[Login Proxy] Backend response status:', response.status);

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error('[Login Proxy] Backend returned non-JSON:', text);
      return NextResponse.json({ success: false, message: "Backend error (non-JSON response)" }, { status: response.status || 500 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[Login Proxy] Error:', error);
    return NextResponse.json({ success: false, message: "Network error or Backend unreachable" }, { status: 500 });
  }
}
