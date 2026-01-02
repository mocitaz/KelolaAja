# KelolaAja API Documentation

> Dokumentasi lengkap untuk semua API endpoints KelolaAja Backend

**Base URL:** `http://localhost:5000/api` (Development)  
**Version:** 1.0.0  
**Last Updated:** January 2, 2026

---

## 📑 Table of Contents

1. [Authentication](#authentication)
2. [Pricing & Features](#pricing--features)
3. [Content Management](#content-management)
4. [Career & Jobs](#career--jobs)
5. [Frontend Data](#frontend-data)
6. [Analytics](#analytics)
7. [Media Files](#media-files)
8. [Common Patterns](#common-patterns)
9. [Error Handling](#error-handling)

---

## 🔐 Authentication

### Login
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "userId": 1,
      "username": "admin",
      "email": "admin@kelolaaja.com",
      "role": "Admin",
      "fullName": "Admin User"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Register
```
POST /api/auth/register
```

### Logout
```
POST /api/auth/logout
```

### Get Current User
```
GET /api/auth/me
Authorization: Bearer {token}
```

---

## 💰 Pricing & Features

### Pricing Plans

#### Get All Pricing Plans
```
GET /api/pricing-plans
Query Parameters:
  - locale: id | en (optional, default: id)
  - includeInactive: boolean (optional, default: false)
```

#### Get Pricing Plan by ID
```
GET /api/pricing-plans/:planId
Query Parameters:
  - locale: id | en (optional)
```

#### Create Pricing Plan
```
POST /api/pricing-plans
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "planCode": "BASIC",
  "pricePerUserMonth": 50000,
  "minUsers": 1,
  "maxUsers": 10,
  "displayOrder": 1,
  "badgeColor": "#3B82F6",
  "isActive": true,
  "translations": [
    {
      "locale": "id",
      "planName": "Paket Basic",
      "pricePeriod": "/bulan",
      "userRange": "1-10 pengguna",
      "description": "Cocok untuk bisnis kecil"
    },
    {
      "locale": "en",
      "planName": "Basic Plan",
      "pricePeriod": "/month",
      "userRange": "1-10 users",
      "description": "Perfect for small business"
    }
  ],
  "features": [
    {
      "featureId": 1,
      "isIncluded": true,
      "displayOrder": 0
    }
  ]
}
```

#### Update Pricing Plan
```
PUT /api/pricing-plans/:planId
Authorization: Bearer {token}
```

#### Delete Pricing Plan
```
DELETE /api/pricing-plans/:planId
Authorization: Bearer {token}
```

### Features

#### Get All Features
```
GET /api/features
Query Parameters:
  - locale: id | en (optional)
  - category: string (optional)
```

#### Create Feature
```
POST /api/features
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "featureCode": "FEATURE_001",
  "category": "core",
  "displayOrder": 0,
  "isActive": true,
  "translations": [
    {
      "locale": "id",
      "featureName": "Manajemen Inventory",
      "description": "Kelola stok barang dengan mudah"
    },
    {
      "locale": "en",
      "featureName": "Inventory Management",
      "description": "Manage your stock easily"
    }
  ]
}
```

---

## 📄 Content Management

### Content Sections

#### Get All Content Sections
```
GET /api/content-sections
Query Parameters:
  - locale: id | en (optional)
  - sectionType: string (optional)
  - pageLocation: string (optional)
```

#### Create Content Section
```
POST /api/content-sections
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "sectionType": "hero",
  "sectionKey": "home_hero",
  "pageLocation": "home",
  "displayOrder": 0,
  "isActive": true,
  "metadata": {
    "bgColor": "#F3F4F6",
    "alignment": "center"
  },
  "translations": [
    {
      "locale": "id",
      "title": "Kelola Bisnis Lebih Mudah",
      "subtitle": "Dengan ERP Terpadu",
      "description": "Solusi lengkap untuk bisnis modern",
      "content": "<p>Content HTML...</p>"
    },
    {
      "locale": "en",
      "title": "Manage Business Easier",
      "subtitle": "With Integrated ERP",
      "description": "Complete solution for modern business",
      "content": "<p>HTML Content...</p>"
    }
  ],
  "mediaFiles": [
    {
      "fileId": 1,
      "mediaType": "image",
      "usage": "hero_image",
      "displayOrder": 0
    }
  ]
}
```

### Testimonials

#### Get All Testimonials
```
GET /api/testimonials
Query Parameters:
  - locale: id | en (optional)
  - isFeatured: boolean (optional)
```

#### Create Testimonial
```
POST /api/admin/testimonials
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "John Doe",
  "title": "CEO",
  "company": "Tech Corp",
  "photoFileId": 123,
  "rating": 5,
  "displayOrder": 0,
  "isFeatured": true,
  "isActive": true,
  "translations": [
    {
      "locale": "id",
      "quote": "Sangat membantu bisnis kami!"
    },
    {
      "locale": "en",
      "quote": "Very helpful for our business!"
    }
  ]
}
```

### Industries

#### Get All Industries
```
GET /api/industries
Query Parameters:
  - locale: id | en (optional)
```

#### Get Industry by Slug
```
GET /api/industries/:slug
Query Parameters:
  - locale: id | en (optional)
```

#### Create Industry
```
POST /api/industries
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "industryCode": "RETAIL",
  "slug": "retail",
  "iconName": "store",
  "displayOrder": 0,
  "isActive": true,
  "translations": [
    {
      "locale": "id",
      "title": "Retail",
      "description": "Solusi untuk bisnis retail",
      "introText": "Kelola toko retail Anda"
    },
    {
      "locale": "en",
      "title": "Retail",
      "description": "Solution for retail business",
      "introText": "Manage your retail store"
    }
  ],
  "problems": [
    {
      "displayOrder": 0,
      "translations": [
        {
          "locale": "id",
          "title": "Stok Sulit Dikontrol",
          "description": "Kesulitan tracking inventory"
        },
        {
          "locale": "en",
          "title": "Hard to Control Stock",
          "description": "Difficulty in tracking inventory"
        }
      ]
    }
  ],
  "solutions": [
    {
      "displayOrder": 0,
      "translations": [
        {
          "locale": "id",
          "title": "Real-time Inventory",
          "description": "Pantau stok secara real-time"
        },
        {
          "locale": "en",
          "title": "Real-time Inventory",
          "description": "Monitor stock in real-time"
        }
      ]
    }
  ]
}
```

### FAQ

#### Get All FAQs
```
GET /api/faqs
Query Parameters:
  - locale: id | en (optional)
  - categoryId: number (optional)
```

#### Create FAQ Category
```
POST /api/admin/faq-categories
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "categoryCode": "GENERAL",
  "displayOrder": 0,
  "isActive": true,
  "translations": [
    {
      "locale": "id",
      "categoryName": "Umum"
    },
    {
      "locale": "en",
      "categoryName": "General"
    }
  ]
}
```

#### Create FAQ
```
POST /api/admin/faqs
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "categoryId": 1,
  "displayOrder": 0,
  "isActive": true,
  "translations": [
    {
      "locale": "id",
      "question": "Apa itu KelolaAja?",
      "answer": "KelolaAja adalah sistem ERP..."
    },
    {
      "locale": "en",
      "question": "What is KelolaAja?",
      "answer": "KelolaAja is an ERP system..."
    }
  ]
}
```

---

## 💼 Career & Jobs

### Job Postings

#### Get All Job Postings
```
GET /api/jobs
Query Parameters:
  - locale: id | en (optional, default: id)
  - jobType: FullTime | PartTime | Contract | Internship | Freelance (optional)
  - jobLevel: EntryLevel | Junior | MidLevel | Senior | Lead | Manager | Director | Executive (optional)
  - workLocation: OnSite | Remote | Hybrid (optional)
  - department: string (optional)
  - isActive: boolean (optional, default: true)
  - isFeatured: boolean (optional)
  - page: number (optional, default: 1)
  - limit: number (optional, default: 10)
```

#### Get Job Posting by Slug
```
GET /api/jobs/:slug
Query Parameters:
  - locale: id | en (optional)
```

#### Create Job Posting
```
POST /api/jobs
Authorization: Bearer {token}
```

**❗ IMPORTANT: Common Error - Translations Format**

Error yang sering terjadi saat create/update:
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": [
        {
            "field": "body.translations",
            "message": "Invalid input: expected array, received object"
        }
    ]
}
```

### ❌ Format SALAH (Object)

Frontend sering mengirim translations sebagai object:

```javascript
const payload = {
  jobCode: "DEV-001",
  slug: "senior-developer",
  jobType: "FullTime",
  jobLevel: "Senior",
  workLocation: "Hybrid",
  
  // ❌ SALAH - Format Object
  translations: {
    id: {
      locale: "id",
      title: "Senior Developer",
      shortDescription: "Deskripsi singkat...",
      description: "Deskripsi lengkap...",
      qualifications: "Kualifikasi...",
      additionalInfo: "Info tambahan..."
    },
    en: {
      locale: "en",
      title: "Senior Developer",
      shortDescription: "Short description...",
      description: "Full description...",
      qualifications: "Qualifications...",
      additionalInfo: "Additional info..."
    }
  }
}
```

### ✅ Format BENAR (Array)

API mengharapkan translations sebagai array:

```javascript
const payload = {
  jobCode: "DEV-001",
  slug: "senior-developer",
  jobType: "FullTime",
  jobLevel: "Senior",
  workLocation: "Hybrid",
  
  // ✅ BENAR - Format Array
  translations: [
    {
      locale: "id",
      title: "Senior Developer",
      shortDescription: "Deskripsi singkat...",
      description: "Deskripsi lengkap...",
      qualifications: "Kualifikasi...",
      additionalInfo: "Info tambahan..."
    },
    {
      locale: "en",
      title: "Senior Developer",
      shortDescription: "Short description...",
      description: "Full description...",
      qualifications: "Qualifications...",
      additionalInfo: "Additional info..."
    }
  ]
}
```

---

## 📋 Complete API Format

### 1. Create Job Posting

**Endpoint:** `POST /api/admin/job-postings`

**Request Body:**

```javascript
{
  // Basic Information
  "jobCode": "DEV-001",
  "slug": "senior-developer",
  "department": "Engineering",
  "jobType": "FullTime",        // FullTime | PartTime | Contract | Internship | Freelance
  "jobLevel": "Senior",          // EntryLevel | Junior | MidLevel | Senior | Lead | Manager | Director | Executive
  "workLocation": "Hybrid",      // OnSite | Remote | Hybrid
  
  // Location
  "city": "Jakarta",
  "country": "Indonesia",
  
  // Salary (Optional)
  "salaryMin": 15000000,
  "salaryMax": 25000000,
  "salaryCurrency": "IDR",
  "salaryPeriod": "monthly",     // monthly | yearly
  "showSalary": false,
  
  // Job Details
  "positions": 2,
  "experienceYears": 5,
  "applicationDeadline": "2026-02-28T23:59:59Z",
  
  // Status
  "isActive": true,
  "isFeatured": false,
  "publishedAt": "2026-01-02T00:00:00Z",
  
  // ✅ Translations (ARRAY)
  "translations": [
    {
      "locale": "id",
      "title": "Senior Developer",
      "shortDescription": "Mencari senior developer berpengalaman",
      "description": "Deskripsi lengkap pekerjaan...",
      "qualifications": "- Minimal 5 tahun pengalaman\n- Menguasai Node.js",
      "additionalInfo": "Benefit dan info tambahan..."
    },
    {
      "locale": "en",
      "title": "Senior Developer",
      "shortDescription": "Looking for experienced senior developer",
      "description": "Full job description...",
      "qualifications": "- Minimum 5 years experience\n- Expert in Node.js",
      "additionalInfo": "Benefits and additional info..."
    }
  ],
  
  // ✅ Requirements (ARRAY)
  "requirements": [
    {
      "locale": "id",
      "requirement": "Minimal S1 Teknik Informatika atau setara",
      "isRequired": true,
      "displayOrder": 0
    },
    {
      "locale": "en",
      "requirement": "Bachelor's degree in Computer Science or equivalent",
      "isRequired": true,
      "displayOrder": 0
    },
    {
      "locale": "id",
      "requirement": "Pengalaman 5+ tahun di Node.js",
      "isRequired": true,
      "displayOrder": 1
    },
    {
      "locale": "en",
      "requirement": "5+ years experience in Node.js",
      "isRequired": true,
      "displayOrder": 1
    }
  ],
  
  // ✅ Responsibilities (ARRAY)
  "responsibilities": [
    {
      "locale": "id",
      "responsibility": "Mengembangkan dan maintain backend services",
      "displayOrder": 0
    },
    {
      "locale": "en",
      "responsibility": "Develop and maintain backend services",
      "displayOrder": 0
    },
    {
      "locale": "id",
      "responsibility": "Melakukan code review untuk junior developers",
      "displayOrder": 1
    },
    {
      "locale": "en",
      "responsibility": "Conduct code reviews for junior developers",
      "displayOrder": 1
    }
  ],
  
  // ✅ Benefits (ARRAY)
  "benefits": [
    {
      "locale": "id",
      "benefit": "Asuransi Kesehatan",
      "description": "BPJS Kesehatan dan asuransi swasta",
      "iconName": "health",
      "displayOrder": 0
    },
    {
      "locale": "en",
      "benefit": "Health Insurance",
      "description": "BPJS and private health insurance",
      "iconName": "health",
      "displayOrder": 0
    },
    {
      "locale": "id",
      "benefit": "Work From Home",
      "description": "Fleksibilitas kerja dari rumah",
      "iconName": "home",
      "displayOrder": 1
    },
    {
      "locale": "en",
      "benefit": "Work From Home",
      "description": "Flexible work from home arrangement",
      "iconName": "home",
      "displayOrder": 1
    }
  ]
}
```

}
```

**✅ Request Body (Correct Format):**

```javascript
{
  // Basic Information
  "jobCode": "DEV-001",
  "slug": "senior-developer",
  "department": "Engineering",
  "jobType": "FullTime",        // FullTime | PartTime | Contract | Internship | Freelance
  "jobLevel": "Senior",          // EntryLevel | Junior | MidLevel | Senior | Lead | Manager | Director | Executive
  "workLocation": "Hybrid",      // OnSite | Remote | Hybrid
  
  // Location
  "city": "Jakarta",
  "country": "Indonesia",
  
  // Salary (Optional)
  "salaryMin": 15000000,
  "salaryMax": 25000000,
  "salaryCurrency": "IDR",
  "salaryPeriod": "monthly",     // monthly | yearly
  "showSalary": false,
  
  // Job Details
  "positions": 2,
  "experienceYears": 5,
  "applicationDeadline": "2026-02-28T23:59:59Z",
  
  // Status
  "isActive": true,
  "isFeatured": false,
  "publishedAt": "2026-01-02T00:00:00Z",
  
  // ✅ Translations (MUST BE ARRAY)
  "translations": [
    {
      "locale": "id",
      "title": "Senior Developer",
      "shortDescription": "Mencari senior developer berpengalaman",
      "description": "Deskripsi lengkap pekerjaan...",
      "qualifications": "- Minimal 5 tahun pengalaman\n- Menguasai Node.js",
      "additionalInfo": "Benefit dan info tambahan..."
    },
    {
      "locale": "en",
      "title": "Senior Developer",
      "shortDescription": "Looking for experienced senior developer",
      "description": "Full job description...",
      "qualifications": "- Minimum 5 years experience\n- Expert in Node.js",
      "additionalInfo": "Benefits and additional info..."
    }
  ],
  
  // ✅ Requirements (ARRAY, Optional)
  "requirements": [
    {
      "locale": "id",
      "requirement": "Minimal S1 Teknik Informatika atau setara",
      "isRequired": true,
      "displayOrder": 0
    },
    {
      "locale": "en",
      "requirement": "Bachelor's degree in Computer Science or equivalent",
      "isRequired": true,
      "displayOrder": 0
    }
  ],
  
  // ✅ Responsibilities (ARRAY, Optional)
  "responsibilities": [
    {
      "locale": "id",
      "responsibility": "Mengembangkan dan maintain backend services",
      "displayOrder": 0
    },
    {
      "locale": "en",
      "responsibility": "Develop and maintain backend services",
      "displayOrder": 0
    }
  ],
  
  // ✅ Benefits (ARRAY, Optional)
  "benefits": [
    {
      "locale": "id",
      "benefit": "Asuransi Kesehatan",
      "description": "BPJS Kesehatan dan asuransi swasta",
      "iconName": "health",
      "displayOrder": 0
    },
    {
      "locale": "en",
      "benefit": "Health Insurance",
      "description": "BPJS and private health insurance",
      "iconName": "health",
      "displayOrder": 0
    }
  ]
}
```

#### Update Job Posting
```
PUT /api/jobs/:jobId
Authorization: Bearer {token}
```

**Request Body:** (All fields optional, but use array format for translations, requirements, etc)

```json
{
  "slug": "senior-backend-developer",
  "isActive": false,
  "closedAt": "2026-01-15T23:59:59Z",
  "translations": [
    {
      "locale": "id",
      "title": "Senior Backend Developer"
    }
  ]
}
```

#### Delete Job Posting
```
DELETE /api/jobs/:jobId
Authorization: Bearer {token}
```

### Job Applications

#### Submit Job Application
```
POST /api/job-applications
```

**Request Body:**
```json
{
  "jobId": 1,
  "applicantName": "John Doe",
  "applicantEmail": "john@example.com",
  "applicantPhone": "+628123456789",
  "currentCompany": "Tech Corp",
  "currentPosition": "Developer",
  "yearsOfExperience": 5,
  "expectedSalary": 20000000,
  "salaryCurrency": "IDR",
  "availableFrom": "2026-02-01",
  "coverLetter": "I am interested in...",
  "cvFileId": 456,
  "portfolioUrl": "https://portfolio.example.com",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "githubUrl": "https://github.com/johndoe",
  "referralSource": "linkedin"
}
```

#### Get Job Applications (Admin)
```
GET /api/job-applications
Authorization: Bearer {token}
Query Parameters:
  - jobId: number (optional)
  - status: Pending | Reviewed | Shortlisted | Interview | Offered | Rejected | Accepted (optional)
  - page: number (optional)
  - limit: number (optional)
```

#### Update Application Status
```
PUT /api/job-applications/:applicationId/status
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "Shortlisted",
  "adminNotes": "Good candidate, schedule interview",
  "rating": 4
}
```

---

## 🎨 Frontend Data

### Partners

#### Get All Partners
```
GET /api/partners
Query Parameters:
  - locale: id | en (optional)
```

#### Create Partner
```
POST /api/partners
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "partnerName": "Partner Corp",
  "websiteUrl": "https://partner.com",
  "logoFileId": 789,
  "displayOrder": 0,
  "isActive": true,
  "translations": [
    {
      "locale": "id",
      "description": "Partner terpercaya kami"
    },
    {
      "locale": "en",
      "description": "Our trusted partner"
    }
  ]
}
```

### Benefit Stats

#### Get All Benefit Stats
```
GET /api/benefit-stats
Query Parameters:
  - locale: id | en (optional)
```

#### Create Benefit Stat
```
POST /api/benefit-stats
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "statCode": "STAT_001",
  "statValue": "10,000+",
  "displayOrder": 0,
  "isActive": true,
  "translations": [
    {
      "locale": "id",
      "label": "Pengguna Aktif"
    },
    {
      "locale": "en",
      "label": "Active Users"
    }
  ]
}
```

### Process Steps

#### Get All Process Steps
```
GET /api/process-steps
Query Parameters:
  - locale: id | en (optional)
```

### ERP Benefits

#### Get All ERP Benefits
```
GET /api/erp-benefits
Query Parameters:
  - locale: id | en (optional)
```

### About Cards

#### Get All About Cards
```
GET /api/about-cards
Query Parameters:
  - locale: id | en (optional)
```

### Advanced Features

#### Get All Advanced Features
```
GET /api/advanced-features
Query Parameters:
  - locale: id | en (optional)
```

### KelolaAja Features

#### Get All KelolaAja Features
```
GET /api/kelolaaja-features
Query Parameters:
  - locale: id | en (optional)
```

### Core Values

#### Get All Core Values
```
GET /api/core-values
Query Parameters:
  - locale: id | en (optional)
```

### Our Philosophy

#### Get All Our Philosophy
```
GET /api/our-philosophies
Query Parameters:
  - locale: id | en (optional)
```

---

## 📊 Analytics

### Track Page View
```
POST /api/analytics/pageview
```

**Request Body:**
```json
{
  "pagePath": "/pricing",
  "pageTitle": "Pricing Plans",
  "referrer": "https://google.com"
}
```

### Track Event
```
POST /api/analytics/event
```

**Request Body:**
```json
{
  "eventType": "button_click",
  "eventTarget": "cta_signup",
  "eventData": {
    "location": "hero_section"
  }
}
```

### Get Analytics Summary (Admin)
```
GET /api/analytics/summary
Authorization: Bearer {token}
Query Parameters:
  - startDate: YYYY-MM-DD (optional)
  - endDate: YYYY-MM-DD (optional)
```

---

## 📁 Media Files

### Upload Media File
```
POST /api/media-files/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: File (required)
- `altText`: string (optional)
- `isPublic`: boolean (optional, default: true)

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "fileId": 123,
    "fileName": "image.jpg",
    "filePath": "/uploads/2026/01/image.jpg",
    "fileType": "image",
    "mimeType": "image/jpeg",
    "fileSize": 102400,
    "width": 1920,
    "height": 1080,
    "storageUrl": "https://cdn.kelolaaja.com/uploads/2026/01/image.jpg"
  }
}
```

### Get Media File
```
GET /api/media-files/:fileId
```

### Delete Media File
```
DELETE /api/media-files/:fileId
Authorization: Bearer {token}
```

---

## 📮 Contact Submissions

### Submit Contact Form
```
POST /api/contact-submissions
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+628123456789",
  "message": "I want to know more about your product",
  "source": "contact_page"
}
```

### Get Contact Submissions (Admin)
```
GET /api/admin/contact-submissions
Authorization: Bearer {token}
Query Parameters:
  - status: pending | contacted | resolved (optional)
  - page: number (optional)
  - limit: number (optional)
```

### Update Submission Status
```
PUT /api/admin/contact-submissions/:submissionId
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "contacted",
  "adminNotes": "Followed up via email",
  "assignedTo": 1
}
```

---

## 🔧 Site Configuration

### Get Site Config
```
GET /api/site-config
Query Parameters:
  - category: string (optional)
```

### Update Site Config
```
PUT /api/site-config/:configKey
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "configValue": "New Value",
  "description": "Configuration description"
}
```

---

## 🎯 Common Patterns

### ✅ Translations Format (CRITICAL)

**ALL** entities with translations (pricing plans, features, testimonials, FAQs, jobs, etc.) MUST use **ARRAY format**, NOT object format.

**❌ WRONG (Object):**
```javascript
{
  translations: {
    id: { locale: "id", title: "..." },
    en: { locale: "en", title: "..." }
  }
}
```

**✅ CORRECT (Array):**
```javascript
{
  translations: [
    { locale: "id", title: "..." },
    { locale: "en", title: "..." }
  ]
}
```

### Pagination Response Format

```json
{
  "success": true,
  "message": "Data fetched successfully",
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 95,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Locale Support

All `GET` endpoints support `locale` query parameter:
- `locale=id` (Indonesian) - Default
- `locale=en` (English)

Example:
```
GET /api/pricing-plans?locale=en
GET /api/jobs?locale=id
```

### Soft Delete

Most entities use soft delete. To include deleted items (Admin only):
```
GET /api/pricing-plans?includeDeleted=true
```

### Display Order

Entities with `displayOrder` are sorted automatically. Lower values appear first.

### Active/Inactive Status

Most entities have `isActive` field. By default, only active items are returned to public endpoints.

---

## ❌ Error Handling

### Standard Error Response

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [
    {
      "field": "body.email",
      "message": "Invalid email format"
    }
  ]
}
```

### Common HTTP Status Codes

- `200 OK` - Success
- `201 Created` - Resource created successfully
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Duplicate resource (e.g., unique constraint violation)
- `500 Internal Server Error` - Server error

### Common Validation Errors

#### 1. Invalid Translations Format
```json
{
  "field": "body.translations",
  "message": "Invalid input: expected array, received object"
}
```
**Solution:** Convert translations from object to array format.

#### 2. Invalid Enum Value
```json
{
  "field": "body.jobType",
  "message": "Invalid enum value. Expected 'FullTime' | 'PartTime' | 'Contract' | 'Internship' | 'Freelance'"
}
```
**Solution:** Use correct enum value (case-sensitive).

#### 3. Required Field Missing
```json
{
  "field": "body.title",
  "message": "Required"
}
```
**Solution:** Provide the required field.

#### 4. Duplicate Unique Field
```json
{
  "field": "body.slug",
  "message": "Slug already exists"
}
```
**Solution:** Use a different unique value.

---

## 📝 Enums Reference

### UserRole
- `Admin` - Full access
- `Editor` - Can create and edit content
- `Viewer` - Read-only access

### Locale
- `id` - Indonesian
- `en` - English

### JobType
- `FullTime`
- `PartTime`
- `Contract`
- `Internship`
- `Freelance`

### JobLevel
- `EntryLevel`
- `Junior`
- `MidLevel`
- `Senior`
- `Lead`
- `Manager`
- `Director`
- `Executive`

### WorkLocation
- `OnSite`
- `Remote`
- `Hybrid`

### ApplicationStatus
- `Pending`
- `Reviewed`
- `Shortlisted`
- `Interview`
- `Offered`
- `Rejected`
- `Accepted`

---

## 🔄 Frontend Integration Guide

### Converting Object to Array for Translations

```javascript
// If your state is in object format
const translationsObject = {
  id: { locale: "id", title: "Judul Indonesia", ... },
  en: { locale: "en", title: "English Title", ... }
};

// Convert to array before sending to API
const translationsArray = Object.values(translationsObject);

// Or manually
const translationsArray = [
  { locale: "id", ...translationsObject.id },
  { locale: "en", ...translationsObject.en }
];

// Send to API
const payload = {
  // ... other fields
  translations: translationsArray  // ✅ Array format
};
```

### Example: React Hook for Job Posting

```javascript
const createJobPosting = async (formData) => {
  try {
    // Ensure translations is array
    const payload = {
      ...formData,
      translations: Array.isArray(formData.translations) 
        ? formData.translations 
        : Object.values(formData.translations),
      requirements: Array.isArray(formData.requirements)
        ? formData.requirements
        : Object.values(formData.requirements),
      // ... same for other array fields
    };
    
    const response = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      // Handle validation errors
      console.error(data.errors);
    }
    
    return data;
  } catch (error) {
    console.error('Error creating job posting:', error);
  }
};
```

---

## 📞 Support & Resources

- **Schema:** `/prisma/schema.prisma`
- **Validators:** `/src/validators/`
- **Controllers:** `/src/controllers/`
- **Routes:** `/src/routes/`

For detailed field requirements, refer to the validator files in `/src/validators/`.

---

**Last Updated:** January 2, 2026  
**Maintained by:** KelolaAja Development Team
