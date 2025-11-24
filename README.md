# KelolaAja - ERP System Website

Website modern untuk sistem ERP KelolaAja dengan fitur lengkap dan admin dashboard.

## 🚀 Features

### Public Website

- ✅ Homepage dengan hero section
- ✅ Halaman fitur (Finance, HR, Inventory, Manufacturing, Project, Sales)
- ✅ Halaman industri (Contractor, F&B, Manufacturing, Retail)
- ✅ Pricing plans
- ✅ Company profile
- ✅ Contact form
- ✅ Multi-language support (Indonesian & English)

### Admin Dashboard

- ✅ **Full-featured admin panel** untuk mengelola website
- ✅ User management dengan role-based access
- ✅ Content management (features, partners, testimonials, FAQs)
- ✅ Pricing plans & features management
- ✅ Contact form submissions viewer
- ✅ Analytics & statistics
- ✅ Audit logs untuk tracking aktivitas
- ✅ Responsive design

## 📍 Access Points

### Public Website

```
http://localhost:3000
```

### Admin Dashboard

```
http://localhost:3000/login
```

**Default Admin Credentials:**

- Email: `admin@kelolaaja.com`
- Password: `admin123`

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **Icons:** Heroicons
- **Authentication:** JWT (via Backend API)

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm atau yarn
- PostgreSQL database
- Backend API running on port 8080

### Setup

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd KelolaAja
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   # Copy example file
   cp .env.local.example .env.local
   ```

   Edit `.env.local`:

   ```env
   # Backend API Base URL
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Access the application**
   - Website: `http://localhost:3000`
   - Admin: `http://localhost:3000/login`

## 📚 Documentation

Dokumentasi lengkap tersedia di:

- **[DOCS_INDEX.md](./DOCS_INDEX.md)** - 📚 Index semua dokumentasi
- **[PANDUAN_ADMIN.md](./PANDUAN_ADMIN.md)** - 🇮🇩 Panduan admin dalam Bahasa Indonesia
- **[ADMIN_ACCESS.md](./ADMIN_ACCESS.md)** - 🔑 Quick access guide
- **[ADMIN_DASHBOARD.md](./ADMIN_DASHBOARD.md)** - 📖 Full admin documentation
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - ✅ Implementation checklist
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - 🔌 Backend API reference

## 🎯 Quick Start - Admin Dashboard

### 1. Login ke Admin Panel

```
URL      : http://localhost:3000/login
Email    : admin@kelolaaja.com
Password : admin123
```

### 2. Available Admin Features

- **Dashboard** - Overview & statistics
- **Users** - Manage users & permissions
- **Pricing Plans** - Manage pricing & features
- **Features** - Product features management
- **Partners** - Partner logos & info
- **Contact Submissions** - View contact form messages
- **Analytics** - Website statistics
- **Audit Logs** - System activity tracking

### 3. Role-Based Access

- **Admin** - Full access
- **Editor** - Content management only
- **Viewer** - Read-only access

## 📁 Project Structure

```
KelolaAja/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── admin/                   # 🔐 Admin dashboard
│   │   ├── layout.tsx           # Admin layout
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── login/               # Login page
│   │   ├── users/               # User management
│   │   ├── pricing-plans/       # Pricing management
│   │   ├── features/            # Features management
│   │   ├── partners/            # Partners management
│   │   ├── contact-submissions/ # Contact forms
│   │   ├── analytics/           # Analytics
│   │   └── audit-logs/          # Audit logs
│   ├── company/                 # Company page
│   ├── contact/                 # Contact page
│   ├── features/                # Feature pages
│   ├── industries/              # Industry pages
│   ├── pricing/                 # Pricing page
│   └── api/                     # API routes
├── components/                  # React components
├── contexts/                    # React contexts
├── hooks/                       # Custom hooks
├── lib/                         # Utilities
├── public/                      # Static assets
└── scripts/                     # Database scripts
```

## 🔒 Security

- ✅ JWT-based authentication
- ✅ Role-based access control (RBAC)
- ✅ Secure password requirements
- ✅ Token expiration (15 min for access, 7 days for refresh)
- ✅ Audit logging untuk semua aktivitas
- ✅ Input validation & sanitization

## 🌐 Multi-Language Support

Website mendukung 2 bahasa:

- 🇮🇩 Indonesian (default)
- 🇬🇧 English

Semua content dapat dikelola dalam kedua bahasa via admin dashboard.

## 🎨 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop layouts
- ✅ Touch-friendly navigation
- ✅ Adaptive images

## � API Configuration

API endpoints dikonfigurasi secara terpusat di `/lib/api-config.ts` untuk memudahkan maintenance.

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Switching Environments

**Development:**

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

**Production:**

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Usage in Components

```typescript
import { apiFetch, API_ENDPOINTS } from "@/lib/api-config";

// Simple fetch with auto proxy and auth
const response = await apiFetch(API_ENDPOINTS.USERS.LIST);
const data = await response.json();
```

Semua API calls otomatis menggunakan:

- ✅ Next.js proxy (menghindari CORS)
- ✅ Auto authentication headers
- ✅ Centralized endpoint management

## �📊 Analytics

Admin dashboard menyediakan:

- Total visitors tracking
- Page views statistics
- Top pages report
- Date range filtering
- Real-time overview

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:migrate   # Run database migrations
npm run db:export    # Export database
npm run db:import    # Import database

# Code Quality
npm run lint         # Run ESLint
```

## 🐛 Troubleshooting

### Admin Login Gagal

- Pastikan backend API running di `http://localhost:8080`
- Cek database sudah di-seed dengan default users
- Clear browser localStorage dan coba lagi

### Data Tidak Muncul

- Buka browser DevTools → Network tab
- Verify API responses (should be 200 OK)
- Check if backend database has data

### CORS Errors

- **Solusi:** Aplikasi sudah menggunakan Next.js API proxy, tidak ada CORS error
- Semua API calls melalui `/api/proxy` route
- Backend tidak perlu CORS configuration untuk frontend

Detail troubleshooting: API_DOCUMENTATION.md

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy via Vercel dashboard or CLI
```

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm run start
```

**Environment Variables untuk Production:**

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `JWT_SECRET` - JWT secret key (backend)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is proprietary software.

## 👥 Team

- **Developer:** KelolaAja Development Team
- **Version:** 1.0.0
- **Last Updated:** November 23, 2025

## 📞 Support

Untuk bantuan atau pertanyaan:

- 📧 Email: support@kelolaaja.com
- 📚 Documentation: [DOCS_INDEX.md](./DOCS_INDEX.md)
- 🐛 Issues: Create issue di GitHub repository

---

## ⭐ Features Highlight

### ✅ Sudah Tersedia

- Public website lengkap
- **Admin dashboard dengan 8+ modul**
- User management & RBAC
- Content management system
- Analytics & reporting
- Multi-language support
- Responsive design
- Contact form integration
- SEO optimized

### 🔜 Coming Soon

- Email notifications
- Advanced analytics
- File upload untuk media
- Rich text editor
- Data export (CSV/Excel)
- Bulk operations
- Advanced search

---

**Made with ❤️ by KelolaAja Team**

**Status:** ✅ **Production Ready**
