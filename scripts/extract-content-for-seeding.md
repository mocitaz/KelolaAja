# 📋 Panduan Ekstraksi Konten dari FE ke Seeders

Dokumen ini membantu Anda mengekstrak konten dari `lib/i18n/translations.ts` untuk di-update ke seeders di Backend.

## 📍 Lokasi File

- **Frontend Translations**: `lib/i18n/translations.ts`
- **Backend Seeders**: `kelolaAja-BE/prisma/seed-*.ts`

## 🔄 Mapping Konten FE ke Seeders BE

### 1. FAQ Content

**Frontend Location**: `translations.id.faq.items` dan `translations.en.faq.items`

**Backend Seeder**: `kelolaAja-BE/prisma/seed-faqs.ts`

**Format di FE**:
```typescript
faq: {
  items: [
    {
      question: 'Apa itu KelolaAja?',
      answer: 'KelolaAja adalah software ERP...'
    }
  ]
}
```

**Format di Seeder**:
```typescript
{
  categoryCode: "GENERAL", // Pilih kategori yang sesuai
  displayOrder: 1,
  translations: {
    id: {
      question: "Apa itu KelolaAja?",
      answer: "KelolaAja adalah software ERP..."
    },
    en: {
      question: "What is KelolaAja?",
      answer: "KelolaAja is an ERP software..."
    }
  }
}
```

**Total FAQ di FE**: 9 items (ID) + 9 items (EN)

---

### 2. Testimonials Content

**Frontend Location**: `translations.id.testimonials.testimonials` dan `translations.en.testimonials.testimonials`

**Backend Seeder**: `kelolaAja-BE/prisma/seed-testimonials.ts`

**Format di FE**:
```typescript
testimonials: {
  testimonials: [
    {
      quote: 'Mengguanakan software ERP KelolaAja...',
      name: 'Puji Waluyo',
      title: 'Manager',
      company: 'Sriendo Food Prima'
    }
  ]
}
```

**Format di Seeder**:
```typescript
{
  name: "Puji Waluyo",
  title: "Manager",
  company: "Sriendo Food Prima",
  rating: 5,
  isFeatured: true,
  displayOrder: 1,
  translations: {
    id: {
      quote: "Mengguanakan software ERP KelolaAja..."
    },
    en: {
      quote: "Using KelolaAja ERP software..."
    }
  }
}
```

**Total Testimonials di FE**: 3 items (ID) + 3 items (EN)

---

### 3. Benefits Stats

**Frontend Location**: `translations.id.benefits.stats`

**Backend Seeder**: `kelolaAja-BE/prisma/seed-benefit-stats.ts`

**Format di FE**:
```typescript
benefits: {
  stats: {
    reduceErrors: 'Kurangi kesalahan hingga 90%',
    cutManualProcess: 'Pangkas Proses Manual 80%',
    accessReports: 'Akses Laporan Kapanpun Dimanapun 100%',
    customerSupport: 'Kepuasan Customer Support 100%'
  }
}
```

**Format di Seeder**: 
Lihat struktur di `seed-benefit-stats.ts` - perlu mapping manual ke format stat yang sesuai

---

### 4. Process Steps

**Frontend Location**: `translations.id.processSteps.steps`

**Backend Seeder**: `kelolaAja-BE/prisma/seed-process-steps.ts`

**Format di FE**:
```typescript
processSteps: {
  steps: {
    analysis: {
      title: 'Analisa Proses Bisnis',
      description: 'Tim konsultan kami akan mengidentifikasi...'
    },
    planning: { ... },
    training: { ... },
    goingLive: { ... }
  }
}
```

**Format di Seeder**:
```typescript
{
  stepCode: "STEP_ANALYSIS",
  displayOrder: 1,
  translations: {
    id: {
      title: "Analisa Proses Bisnis",
      description: "Tim konsultan kami akan mengidentifikasi..."
    },
    en: {
      title: "Business Process Analysis",
      description: "Our consultant team will identify..."
    }
  }
}
```

---

### 5. ERP Benefits

**Frontend Location**: `translations.id.erpBenefits.benefits`

**Backend Seeder**: `kelolaAja-BE/prisma/seed-erp-benefits.ts`

**Format di FE**:
```typescript
erpBenefits: {
  benefits: {
    purchasing: {
      title: 'Purchasing',
      description: 'Buat purchase order...'
    },
    multiWarehouse: { ... },
    importExcel: { ... }
  }
}
```

---

### 6. Advanced Features

**Frontend Location**: `translations.id.advancedFeatures.features`

**Backend Seeder**: `kelolaAja-BE/prisma/seed-advanced-features.ts`

**Format di FE**:
```typescript
advancedFeatures: {
  features: [
    {
      title: 'Keuangan & Akuntansi',
      description: 'Buat laporan keuangan...'
    }
  ]
}
```

---

### 7. KelolaAja Features

**Frontend Location**: `translations.id.kelolaAjaFeatures.features`

**Backend Seeder**: `kelolaAja-BE/prisma/seed-kelolaaja-features.ts`

---

### 8. Pricing Plans

**Frontend Location**: `translations.id.pricing.plans`

**Backend Seeder**: `kelolaAja-BE/prisma/seed-pricing.ts`

**Note**: Pricing plans perlu mapping ke struktur database yang lebih kompleks (dengan features, billing cycle, dll)

---

## 🛠️ Cara Update Seeder dengan Konten dari FE

### Step-by-Step:

1. **Buka file translations.ts**:
   ```bash
   code lib/i18n/translations.ts
   ```

2. **Identifikasi konten yang ingin di-update** (misalnya FAQ)

3. **Buka seeder yang sesuai** (misalnya `seed-faqs.ts`):
   ```bash
   code kelolaAja-BE/prisma/seed-faqs.ts
   ```

4. **Copy konten dari FE** dan sesuaikan format ke struktur seeder

5. **Pastikan translations ID dan EN lengkap**

6. **Jalankan seeder**:
   ```bash
   cd kelolaAja-BE
   npx ts-node prisma/seed-faqs.ts
   ```

## 📊 Checklist Konten FE yang Sudah Ada di Seeders

Gunakan checklist ini untuk tracking:

- [x] FAQ - Ada 9 FAQ di FE, perlu dicek apakah semua sudah di seeder
- [x] Testimonials - Ada 3 testimonials di FE
- [x] Benefits Stats - Ada 4 stats di FE
- [x] Process Steps - Ada 4 steps di FE
- [x] ERP Benefits - Ada 3 benefits di FE
- [x] Advanced Features - Ada 6 features di FE
- [x] KelolaAja Features - Perlu dicek
- [x] Pricing Plans - Perlu dicek struktur lengkapnya
- [x] Features - Perlu dicek apakah sesuai dengan FE
- [x] Industries - Perlu dicek konten industries pages

## ⚠️ Catatan Penting

1. **Translations**: Pastikan selalu ada versi ID dan EN untuk setiap konten
2. **Display Order**: Pastikan `displayOrder` urut dan konsisten
3. **Categories**: Untuk FAQ, pastikan `categoryCode` sesuai dengan kategori yang ada
4. **Required Fields**: Setiap seeder mungkin punya required fields yang berbeda, cek struktur database/schema

## 🔍 Quick Reference

| Konten FE | Seeder File | Status |
|-----------|-------------|--------|
| FAQ Items | `seed-faqs.ts` | ✅ Ada struktur |
| Testimonials | `seed-testimonials.ts` | ✅ Ada struktur |
| Benefit Stats | `seed-benefit-stats.ts` | ✅ Ada struktur |
| Process Steps | `seed-process-steps.ts` | ✅ Ada struktur |
| ERP Benefits | `seed-erp-benefits.ts` | ✅ Ada struktur |
| Advanced Features | `seed-advanced-features.ts` | ✅ Ada struktur |
| KelolaAja Features | `seed-kelolaaja-features.ts` | ✅ Ada struktur |
| Pricing Plans | `seed-pricing.ts` | ✅ Ada struktur |
| Features | `seed-features.ts` | ✅ Ada struktur |
| Industries | `seed-industries.ts` | ✅ Ada struktur |

## 🚀 Next Steps

1. **Jalankan seed-all** untuk mengisi database dengan data default
2. **Verifikasi** konten di FE apakah sudah sesuai dengan yang di database
3. **Update seeders** jika ada konten baru di FE yang belum ada
4. **Test** di frontend apakah semua konten tampil dengan benar


