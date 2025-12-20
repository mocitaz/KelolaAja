import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api-config";

// Helper for proxying requests
async function proxyRequest(request: NextRequest, method: string) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  const token = request.headers.get("authorization");

  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
  }

  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`[Proxy ${method}] Request to:`, url);

  try {
    const headers: HeadersInit = {
      Authorization: token || ""
    };

    // Copy Content-Type if present
    const contentType = request.headers.get("content-type");
    if (contentType) {
      headers["Content-Type"] = contentType;
    }

    // Determine body - for GET/DELETE it's null, for others use stream or text
    let body: BodyInit | null = null;
    if (method !== "GET" && method !== "HEAD") {
      // If it's JSON, we can parse and re-stringify (or just forward stream)
      // If it's FormData, we MUST forward the stream to preserve boundary
      if (request.body) {
        body = request.body;
        // Important: When forwarding a stream with FormData, the Content-Type header 
        // with boundary must be preserved exactly as received.
        // fetch() will generate a new boundary if we pass a FormData object, 
        // but here we are passing the raw stream, so we keep the original header.
      }
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
      // duplex: 'half' might be needed for streaming bodies in some environments,
      // but standard fetch usually handles ReadableStream.
      // Next.js extension:
      // @ts-ignore
      duplex: 'half'
    });

    console.log(`[Proxy ${method}] Status:`, response.status);

    // Get response body
    // We should return the same content type as received
    const responseContentType = response.headers.get("content-type");

    if (responseContentType && responseContentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } else {
      // For non-JSON responses (e.g. blobs, text), forward as is
      const arrayBuffer = await response.arrayBuffer();
      return new NextResponse(arrayBuffer, {
        status: response.status,
        headers: {
          "Content-Type": responseContentType || "application/octet-stream"
        }
      });
    }
  } catch (error) {
    console.error(`[Proxy ${method}] Error:`, error);
    return NextResponse.json({ success: false, message: "Network error", error: String(error) }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return proxyRequest(request, "GET");
}

export async function POST(request: NextRequest) {
  return proxyRequest(request, "POST");
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request, "PUT");
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request, "DELETE");
}

