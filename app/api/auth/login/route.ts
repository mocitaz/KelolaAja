import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      // Try to get error message from response
      try {
        const errorData = await response.json();
        return NextResponse.json(
          { success: false, message: errorData.message || "Login failed" },
          { status: response.status }
        );
      } catch {
        return NextResponse.json(
          { success: false, message: `Backend server error (${response.status})` },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    // More specific error handling
    if (error.code === "ECONNREFUSED" || error.message?.includes("fetch failed")) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Backend server is not running. Please start the backend API on port 8080." 
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message || "Network error. Please try again." },
      { status: 500 }
    );
  }
}
