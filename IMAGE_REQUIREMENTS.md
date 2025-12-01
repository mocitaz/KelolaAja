# Dokumentasi Image yang Dibutuhkan

Dokumen ini berisi daftar lengkap semua image yang dibutuhkan untuk komponen-komponen di aplikasi KelolaAja.

## 📋 Daftar Image

### 1. Company Profile Page (`/company/profile`)

#### 1.1. Sekilas Tentang Kami (About Section)
- **Lokasi**: `components/CompanyProfilePage.tsx` - Line 100-110
- **Ukuran**: Aspect ratio 4:3 (disarankan 1200x900px atau lebih besar)
- **Format**: JPG, PNG, atau WebP
- **Deskripsi**: Image yang menggambarkan perusahaan, tim, atau aktivitas perusahaan KelolaAja
- **Saran Konten**: 
  - Foto tim KelolaAja
  - Foto kantor atau workspace
  - Foto aktivitas kerja tim
  - Image yang mencerminkan budaya perusahaan

#### 1.2. Visi (Vision Section)
- **Lokasi**: `components/CompanyProfilePage.tsx` - Line 166-178
- **Ukuran**: Aspect ratio 4:5 (disarankan 800x1000px atau lebih besar)
- **Format**: JPG, PNG, atau WebP
- **Deskripsi**: Image yang menggambarkan visi perusahaan
- **Saran Konten**:
  - Image yang menggambarkan masa depan, inovasi, atau transformasi digital
  - Visual yang mencerminkan "keberkahan dan kesejahteraan"
  - Image dengan tema teknologi dan kemanusiaan

#### 1.3. Misi (Mission Section)
- **Lokasi**: `components/CompanyProfilePage.tsx` - Line 196-206
- **Ukuran**: Aspect ratio 4:5 (disarankan 800x1000px atau lebih besar)
- **Format**: JPG, PNG, atau WebP
- **Deskripsi**: Image yang menggambarkan misi perusahaan
- **Saran Konten**:
  - Image yang menggambarkan pelayanan, solusi, atau komitmen
  - Visual yang mencerminkan misi perusahaan
  - Image dengan tema bisnis dan teknologi

#### 1.4. Core Values - IMPACT (6 Images)
- **Lokasi**: `components/CompanyProfilePage.tsx` - Line 340-351
- **Ukuran**: Aspect ratio 4:5 (disarankan 800x1000px atau lebih besar)
- **Format**: JPG, PNG, atau WebP
- **Jumlah**: 6 images (satu untuk setiap nilai)

##### 1.4.1. Innovation (I)
- **Deskripsi**: Image untuk nilai "Innovation - Inovasi Berkelanjutan"
- **Saran Konten**: 
  - Teknologi modern, inovasi, ide kreatif
  - Brainstorming, development, R&D
  - Gadget, software, digital transformation

##### 1.4.2. Measurable Value (M)
- **Deskripsi**: Image untuk nilai "Measurable Value - Nilai yang Dapat Diukur"
- **Saran Konten**:
  - Analytics, dashboard, metrics
  - Data visualization, charts, graphs
  - Business growth, success metrics

##### 1.4.3. Practical & Simple (P)
- **Deskripsi**: Image untuk nilai "Practical & Simple - Praktis dan Sederhana"
- **Saran Konten**:
  - User-friendly interface, simplicity
  - Easy-to-use, intuitive design
  - Streamlined processes, efficiency

##### 1.4.4. Accountability & Accuracy (A)
- **Deskripsi**: Image untuk nilai "Accountability & Accuracy - Akuntabilitas dan Akurasi Data"
- **Saran Konten**:
  - Data integrity, accuracy, precision
  - Security, trust, reliability
  - Quality assurance, verification

##### 1.4.5. Customer-Centric (C)
- **Deskripsi**: Image untuk nilai "Customer-Centric - Berfokus pada Pengguna"
- **Saran Konten**:
  - Customer service, support
  - User experience, customer satisfaction
  - Client relationship, partnership

##### 1.4.6. Trust & Security (T)
- **Deskripsi**: Image untuk nilai "Trust & Security - Kepercayaan dan Keamanan"
- **Saran Konten**:
  - Security, protection, shield
  - Trust, reliability, safety
  - Data protection, cybersecurity

---

### 2. Homepage Images

#### 2.1. Company Section Image
- **Lokasi**: `components/Company.tsx` - Line 100
- **Path**: `/images/home/company.jpg`
- **Ukuran**: Aspect ratio 16:9 (disarankan 1920x1080px atau lebih besar)
- **Format**: JPG, PNG, atau WebP
- **Deskripsi**: Image untuk section "Tentang Kami" di homepage
- **Saran Konten**:
  - Foto perusahaan atau tim
  - Aktivitas perusahaan
  - Office atau workspace

#### 2.2. Features Section Image
- **Lokasi**: `components/Features.tsx` - Line 70
- **Path**: `/images/home/features.jpg`
- **Ukuran**: Aspect ratio 16:9 (disarankan 1920x1080px atau lebih besar)
- **Format**: JPG, PNG, atau WebP
- **Deskripsi**: Image untuk section "Fitur Unggulan" di homepage
- **Saran Konten**:
  - Screenshot atau mockup aplikasi KelolaAja
  - Dashboard atau interface ERP
  - Visual fitur-fitur utama

---

## 📁 Struktur Folder dan Penamaan File

### Penamaan File Standar

Semua file image menggunakan format penamaan berikut:
- **Format**: `kebab-case` (huruf kecil dengan tanda hubung)
- **Ekstensi**: `.jpg`, `.png`, atau `.webp`
- **Contoh**: `company-profile-about-us.jpg`

### Struktur Folder Lengkap

```
public/
├── images/
│   ├── home/
│   │   ├── company.jpg                    (Homepage - Company Section)
│   │   └── features.jpg                   (Homepage - Features Section)
│   └── company-profile/
│       ├── about-us.jpg                   (Sekilas Tentang Kami - 4:3)
│       ├── vision.jpg                     (Visi - 4:5)
│       ├── mission.jpg                    (Misi - 4:5)
│       └── core-values/
│           ├── innovation.jpg             (I - Innovation - 4:5)
│           ├── measurable-value.jpg      (M - Measurable Value - 4:5)
│           ├── practical-simple.jpg      (P - Practical & Simple - 4:5)
│           ├── accountability-accuracy.jpg (A - Accountability & Accuracy - 4:5)
│           ├── customer-centric.jpg      (C - Customer-Centric - 4:5)
│           └── trust-security.jpg        (T - Trust & Security - 4:5)
```

### Daftar Penamaan File Lengkap

#### Homepage Images
| No | Nama File | Path Lengkap | Deskripsi | Aspect Ratio |
|---|-----------|--------------|-----------|--------------|
| 1 | `company.jpg` | `/images/home/company.jpg` | Company Section Image | 16:9 |
| 2 | `features.jpg` | `/images/home/features.jpg` | Features Section Image | 16:9 |

#### Company Profile Images
| No | Nama File | Path Lengkap | Deskripsi | Aspect Ratio |
|---|-----------|--------------|-----------|--------------|
| 1 | `about-us.jpg` | `/images/company-profile/about-us.jpg` | Sekilas Tentang Kami | 4:3 |
| 2 | `vision.jpg` | `/images/company-profile/vision.jpg` | Visi | 4:5 |
| 3 | `mission.jpg` | `/images/company-profile/mission.jpg` | Misi | 4:5 |

#### Core Values Images (IMPACT)
| No | Nama File | Path Lengkap | Deskripsi | Aspect Ratio |
|---|-----------|--------------|-----------|--------------|
| 1 | `innovation.jpg` | `/images/company-profile/core-values/innovation.jpg` | Innovation (I) | 4:5 |
| 2 | `measurable-value.jpg` | `/images/company-profile/core-values/measurable-value.jpg` | Measurable Value (M) | 4:5 |
| 3 | `practical-simple.jpg` | `/images/company-profile/core-values/practical-simple.jpg` | Practical & Simple (P) | 4:5 |
| 4 | `accountability-accuracy.jpg` | `/images/company-profile/core-values/accountability-accuracy.jpg` | Accountability & Accuracy (A) | 4:5 |
| 5 | `customer-centric.jpg` | `/images/company-profile/core-values/customer-centric.jpg` | Customer-Centric (C) | 4:5 |
| 6 | `trust-security.jpg` | `/images/company-profile/core-values/trust-security.jpg` | Trust & Security (T) | 4:5 |

### Quick Reference - Path untuk Implementasi

```typescript
// Homepage Images
const HOME_IMAGES = {
  company: '/images/home/company.jpg',
  features: '/images/home/features.jpg',
}

// Company Profile Images
const COMPANY_PROFILE_IMAGES = {
  aboutUs: '/images/company-profile/about-us.jpg',
  vision: '/images/company-profile/vision.jpg',
  mission: '/images/company-profile/mission.jpg',
}

// Core Values Images
const CORE_VALUES_IMAGES = {
  I: '/images/company-profile/core-values/innovation.jpg',
  M: '/images/company-profile/core-values/measurable-value.jpg',
  P: '/images/company-profile/core-values/practical-simple.jpg',
  A: '/images/company-profile/core-values/accountability-accuracy.jpg',
  C: '/images/company-profile/core-values/customer-centric.jpg',
  T: '/images/company-profile/core-values/trust-security.jpg',
}
```

---

## 🎨 Spesifikasi Teknis

### Format File
- **Format yang Disarankan**: WebP (untuk performa terbaik)
- **Format Alternatif**: JPG, PNG
- **Kualitas**: Minimal 80% untuk JPG, lossless untuk PNG

### Ukuran File
- **Maksimal**: 500KB per image (untuk performa optimal)
- **Target**: 200-300KB per image
- **Kompresi**: Gunakan tool seperti TinyPNG, ImageOptim, atau Squoosh

### Resolusi
- **Minimum**: Sesuai dengan aspect ratio yang disebutkan
- **Disarankan**: 2x dari ukuran tampilan untuk retina display
- **Maksimal**: Tidak perlu lebih dari 3000px pada dimensi terpanjang

### Optimasi
- Gunakan `next/image` component untuk optimasi otomatis
- Pastikan semua image memiliki `alt` text yang deskriptif
- Pertimbangkan lazy loading untuk image di bawah fold

---

## 📝 Checklist Implementasi

### Company Profile Page
- [ ] Upload image untuk "Sekilas Tentang Kami" (aspect 4:3)
- [ ] Upload image untuk "Visi" (aspect 4:5)
- [ ] Upload image untuk "Misi" (aspect 4:5)
- [ ] Upload image untuk "Innovation" (I) (aspect 4:5)
- [ ] Upload image untuk "Measurable Value" (M) (aspect 4:5)
- [ ] Upload image untuk "Practical & Simple" (P) (aspect 4:5)
- [ ] Upload image untuk "Accountability & Accuracy" (A) (aspect 4:5)
- [ ] Upload image untuk "Customer-Centric" (C) (aspect 4:5)
- [ ] Upload image untuk "Trust & Security" (T) (aspect 4:5)

### Homepage
- [ ] Upload image untuk Company Section (`/images/home/company.jpg`)
- [ ] Upload image untuk Features Section (`/images/home/features.jpg`)

---

## 🔧 Cara Mengganti Image

### Untuk Company Profile Page

1. **Sekilas Tentang Kami**:
   - Ganti placeholder di `components/CompanyProfilePage.tsx` line 100-110
   - Gunakan komponen `Image` dari `next/image`
   - Contoh:
   ```tsx
   <Image
     src="/images/company-profile/about-us.jpg"
     alt="Sekilas Tentang Kami"
     fill
     className="object-cover"
     sizes="(max-width: 1024px) 100vw, 50vw"
   />
   ```

2. **Visi & Misi**:
   - Ganti placeholder di line 166-178 (Visi) dan 196-206 (Misi)
   - Gunakan format yang sama seperti di atas

3. **Core Values**:
   - Ganti placeholder di line 340-351
   - Buat mapping untuk setiap nilai (I, M, P, A, C, T)
   - Contoh:
   ```tsx
   const coreValueImages = {
     I: '/images/company-profile/core-values/innovation.jpg',
     M: '/images/company-profile/core-values/measurable-value.jpg',
     P: '/images/company-profile/core-values/practical-simple.jpg',
     A: '/images/company-profile/core-values/accountability-accuracy.jpg',
     C: '/images/company-profile/core-values/customer-centric.jpg',
     T: '/images/company-profile/core-values/trust-security.jpg',
   }
   ```

### Untuk Homepage

1. **Company Section**:
   - Pastikan file ada di `/public/images/home/company.jpg`
   - Image akan otomatis dimuat oleh komponen `Company.tsx`

2. **Features Section**:
   - Pastikan file ada di `/public/images/home/features.jpg`
   - Image akan otomatis dimuat oleh komponen `Features.tsx`

---

## 📞 Catatan Penting

1. **Hak Cipta**: Pastikan semua image yang digunakan memiliki lisensi yang sesuai atau sudah mendapatkan izin penggunaan
2. **Konsistensi**: Gunakan style dan tone yang konsisten untuk semua image
3. **Branding**: Pastikan image sesuai dengan brand identity KelolaAja
4. **Testing**: Setelah upload, test di berbagai device dan browser untuk memastikan image tampil dengan baik
5. **Backup**: Simpan backup semua image original sebelum kompresi

---

## 🎯 Prioritas Upload

### Prioritas Tinggi
1. ✅ Image untuk "Sekilas Tentang Kami" (Company Profile)
2. ✅ Image untuk Visi (Company Profile)
3. ✅ Image untuk Misi (Company Profile)
4. ✅ Image untuk Core Values - Innovation (I)

### Prioritas Sedang
5. Image untuk Core Values lainnya (M, P, A, C, T)
6. Image untuk Homepage - Company Section
7. Image untuk Homepage - Features Section

---

**Terakhir Diupdate**: 2025-01-27
**Versi**: 1.0

