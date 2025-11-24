# API Configuration Guide

## 📁 File Structure

```
lib/
  api-config.ts          # Centralized API configuration

app/
  api/
    proxy/
      route.ts           # Generic API proxy (GET, POST, PUT, DELETE)
    auth/
      login/
        route.ts         # Login-specific proxy
```

## 🔧 Configuration File

**`/lib/api-config.ts`** contains:

1. **API_BASE_URL** - Backend API base URL from environment variable
2. **API_ENDPOINTS** - All API endpoints organized by resource
3. **FRONTEND_API** - Next.js proxy routes
4. **Helper functions** - Utility functions for API calls

## 🌍 Environment Variables

### Development (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Production (.env.local)

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 📝 Usage Examples

### 1. Using apiFetch Helper (Recommended)

```typescript
import { apiFetch, API_ENDPOINTS } from "@/lib/api-config";

// GET request
const response = await apiFetch(API_ENDPOINTS.USERS.LIST);
const data = await response.json();

// POST request
const response = await apiFetch(API_ENDPOINTS.USERS.CREATE, {
  method: "POST",
  body: JSON.stringify({ name: "John", email: "john@example.com" })
});

// PUT request
const response = await apiFetch(API_ENDPOINTS.USERS.UPDATE(123), {
  method: "PUT",
  body: JSON.stringify({ name: "Jane" })
});

// DELETE request
const response = await apiFetch(API_ENDPOINTS.USERS.DELETE(123), {
  method: "DELETE"
});
```

### 2. Manual Fetch with Proxy

```typescript
import { getProxyUrl, getAuthHeaders, API_ENDPOINTS } from "@/lib/api-config";

const response = await fetch(getProxyUrl(API_ENDPOINTS.USERS.LIST), {
  headers: {
    ...getAuthHeaders(),
    "Content-Type": "application/json"
  }
});
```

### 3. Direct Endpoint Usage

```typescript
import { API_ENDPOINTS } from "@/lib/api-config";

// Static endpoint
const endpoint = API_ENDPOINTS.AUTH.LOGIN;
// Result: '/api/v1/auth/login'

// Dynamic endpoint with parameter
const endpoint = API_ENDPOINTS.USERS.UPDATE(42);
// Result: '/api/v1/users/42'
```

## 🔐 Authentication

The `apiFetch` helper automatically includes:

- Authorization header from localStorage
- Content-Type: application/json
- Proper proxy URL formatting

## 🚀 Adding New Endpoints

Edit `/lib/api-config.ts`:

```typescript
export const API_ENDPOINTS = {
  // ... existing endpoints

  // Add new resource
  PRODUCTS: {
    LIST: "/api/v1/products",
    CREATE: "/api/v1/products",
    UPDATE: (id: number) => `/api/v1/products/${id}`,
    DELETE: (id: number) => `/api/v1/products/${id}`,
    DETAIL: (id: number) => `/api/v1/products/${id}`
  }
} as const;
```

## ✅ Benefits

1. **Single Source of Truth** - Semua API URLs di satu tempat
2. **Easy Environment Switching** - Ganti URL cukup di `.env.local`
3. **Type Safety** - TypeScript autocomplete untuk endpoints
4. **Auto Authentication** - Headers otomatis ditambahkan
5. **CORS Free** - Semua request melalui Next.js proxy
6. **Easy Debugging** - Mudah trace API calls

## 🔄 Migration from Old Code

**Before:**

```typescript
const response = await fetch("http://localhost:8080/api/v1/users", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    "Content-Type": "application/json"
  }
});
```

**After:**

```typescript
import { apiFetch, API_ENDPOINTS } from "@/lib/api-config";

const response = await apiFetch(API_ENDPOINTS.USERS.LIST);
```

## 🛠️ Troubleshooting

### API calls failing?

1. Check `.env.local` exists and has correct URL
2. Restart dev server after changing `.env.local`
3. Check browser console for errors
4. Verify backend is running

### Wrong API URL being used?

1. Check `process.env.NEXT_PUBLIC_API_URL` value
2. Make sure variable starts with `NEXT_PUBLIC_`
3. Restart Next.js dev server

### Authentication errors?

1. Check localStorage has `accessToken`
2. Verify token hasn't expired
3. Check `getAuthHeaders()` is returning correct header
