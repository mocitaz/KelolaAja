# 📚 Panduan Seeding Database KelolaAja

## 🎯 Tujuan

Dokumen ini menjelaskan cara mengisi database dengan semua konten yang ada di Frontend (FE) agar FE dan Backend (BE) terintegrasi dengan baik.

## 📋 Prasyarat

1. ✅ Database PostgreSQL sudah berjalan
2. ✅ Backend sudah terhubung ke database
3. ✅ Folder `kelolaAja-BE` sudah ada dan dapat diakses
4. ✅ Prisma Client sudah di-generate

## 🚀 Cara Menjalankan Seeding

### Opsi 1: Seeding Semua Data (Recommended)

Jalankan semua seeders sekaligus:

```bash
cd kelolaAja-BE
npm run seed:all
```

Script ini akan menjalankan semua seeders dalam urutan yang benar:
1. Admin Users (user default untuk login admin)
2. Site Config
3. Pricing Plans
4. Features
5. Industries
6. Feature Pages
7. FAQ & Categories
8. Testimonials
9. Partners
10. Benefit Stats
11. Process Steps
12. ERP Benefits
13. KelolaAja Features

### Opsi 2: Seeding Individual

Jika ingin menjalankan seeder tertentu saja:

```bash
cd kelolaAja-BE

# Seeding FAQ
npx ts-node prisma/seed-faqs.ts

# Seeding Testimonials
npx ts-node prisma/seed-testimonials.ts

# Seeding Features
npx ts-node prisma/seed-features.ts

# Seeding Pricing Plans
npx ts-node prisma/seed-pricing.ts

# dll...
```

## 📦 Konten yang Akan Di-Seed

### 1. Admin Users
- **Default Admin User**
  - Email: `admin@kelolaaja.com`
  - Password: `admin123`
  - Role: Admin

### 2. Site Configuration
- Konfigurasi dasar website
- Informasi perusahaan
- Social media links
- Contact information

### 3. Pricing Plans
- Paket pricing (Startup, Business, Enterprise)
- Fitur untuk setiap paket
- Harga dan billing cycle

### 4. Features
- Daftar fitur utama KelolaAja
- Kategori fitur (Finance, Manufacturing, dll)
- Translations (ID & EN)

### 5. FAQ & Categories
- Kategori FAQ:
  - General (Umum)
  - Pricing (Harga & Paket)
  - Features (Fitur)
  - Support (Dukungan & Bantuan)
- FAQ items dengan translations

### 6. Testimonials
- Testimoni dari customer
- Rating, nama, company
- Translations

### 7. Partners
- Logo partner
- Informasi partner

### 8. Homepage Sections
- **Benefit Stats**: Statistik keuntungan
- **Process Steps**: Langkah-langkah menggunakan KelolaAja
- **ERP Benefits**: Keuntungan menggunakan ERP
- **About Cards**: Kartu informasi tentang
- **Advanced Features**: Fitur lanjutan
- **KelolaAja Features**: Fitur khusus KelolaAja

### 9. Industries
- Industri yang dilayani
- Masalah dan solusi per industri
- Media/images

### 10. Feature Pages
- Halaman detail untuk setiap fitur
- Items dalam halaman fitur

## 🔄 Sinkronisasi Konten FE dengan Seeders

Konten di Frontend (`lib/i18n/translations.ts`) sudah disesuaikan dengan seeders di Backend. Namun, jika ada konten baru di FE yang belum ada di seeders:

### Langkah Sinkronisasi:

1. **Identifikasi konten baru** di `lib/i18n/translations.ts`
2. **Update seeder yang sesuai** di `kelolaAja-BE/prisma/seed-*.ts`
3. **Jalankan seeder** untuk memasukkan konten baru

### Contoh: Menambah FAQ Baru

1. Tambahkan FAQ di `lib/i18n/translations.ts`:
```typescript
faq: {
  items: [
    {
      question: 'FAQ Baru?',
      answer: 'Jawaban FAQ baru...'
    }
  ]
}
```

2. Update `kelolaAja-BE/prisma/seed-faqs.ts`:
```typescript
const faqs = [
  // ... existing FAQs
  {
    categoryCode: "GENERAL",
    displayOrder: 10,
    translations: {
      id: {
        question: "FAQ Baru?",
        answer: "Jawaban FAQ baru..."
      },
      en: {
        question: "New FAQ?",
        answer: "New FAQ answer..."
      }
    }
  }
];
```

3. Jalankan seeder:
```bash
cd kelolaAja-BE
npx ts-node prisma/seed-faqs.ts
```

## 🔍 Verifikasi Seeding

Setelah seeding selesai, verifikasi dengan:

### 1. Cek Admin User
Login ke admin panel:
- URL: `http://localhost:3000/login`
- Email: `admin@kelolaaja.com`
- Password: `admin123`

### 2. Cek Data di Database
```bash
cd kelolaAja-BE
npx prisma studio
```

Atau query langsung:
```sql
-- Cek FAQs
SELECT * FROM "FAQ" LIMIT 10;

-- Cek Features
SELECT * FROM "FEATURE" LIMIT 10;

-- Cek Testimonials
SELECT * FROM "TESTIMONIAL" LIMIT 10;
```

### 3. Cek di Frontend
1. Buka homepage: `http://localhost:3000`
2. Pastikan:
   - ✅ FAQ section menampilkan data dari database
   - ✅ Features menampilkan data dari database
   - ✅ Testimonials menampilkan data dari database
   - ✅ Pricing section menampilkan data dari database

## 🛠️ Troubleshooting

### Error: "Admin user not found"
**Solusi**: Pastikan seeder admin user dijalankan pertama:
```bash
cd kelolaAja-BE
npx ts-node prisma/seed.ts
```

### Error: "Category not found" (untuk FAQ)
**Solusi**: Pastikan FAQ categories dibuat sebelum FAQs:
```bash
cd kelolaAja-BE
npx ts-node prisma/seed-faqs.ts
```

### Error: "Feature not found" (untuk Feature Pages)
**Solusi**: Pastikan Features di-seed sebelum Feature Pages:
```bash
cd kelolaAja-BE
npx ts-node prisma/seed-features.ts
npx ts-node prisma/seed-feature-pages.ts
```

### Database masih kosong setelah seeding
**Cek:**
1. Apakah database connection string benar di `.env`?
2. Apakah Prisma Client sudah di-generate?
   ```bash
   cd kelolaAja-BE
   npx prisma generate
   ```
3. Apakah ada error saat seeding? Cek log output

### Data duplikat
**Solusi**: Seeders sudah ada pengecekan untuk menghindari duplikasi. Jika ingin reset:
```bash
# HATI-HATI: Ini akan menghapus semua data!
cd kelolaAja-BE
npx prisma migrate reset
npm run seed:all
```

## 📝 Catatan Penting

1. **Jangan edit seeders jika tidak perlu**: Seeders sudah disesuaikan dengan struktur database
2. **Backup database sebelum reset**: Jika ingin reset database, pastikan sudah backup
3. **Urutan seeding penting**: Beberapa seeder bergantung pada seeder lain (contoh: FAQ bergantung pada Categories)
4. **Konten di FE sebagai fallback**: Jika API tidak mengembalikan data, FE akan menggunakan konten dari `translations.ts` sebagai fallback

## 🔄 Update Konten Setelah Seeding

Setelah database terisi, semua konten dapat diupdate melalui:
1. **Admin Panel**: Login ke `/admin` dan update konten melalui UI
2. **Database langsung**: Via Prisma Studio atau query SQL
3. **Update seeders**: Untuk perubahan permanen, update seeders dan jalankan ulang

## 📚 Referensi

- [Prisma Seeding Documentation](https://www.prisma.io/docs/guides/database/seed-database)
- [API Documentation](./kelolaAja-BE/API_DOCUMENTATION.md)
- [Admin Panel Guide](./PANDUAN_ADMIN.md)

## ✅ Checklist Seeding

Gunakan checklist ini untuk memastikan semua data ter-seed:

- [ ] Admin user berhasil dibuat
- [ ] Site configuration berhasil dibuat
- [ ] Pricing plans berhasil dibuat
- [ ] Features berhasil dibuat
- [ ] FAQ categories berhasil dibuat
- [ ] FAQs berhasil dibuat
- [ ] Testimonials berhasil dibuat
- [ ] Partners berhasil dibuat
- [ ] Benefit stats berhasil dibuat
- [ ] Process steps berhasil dibuat
- [ ] ERP benefits berhasil dibuat
- [ ] About cards berhasil dibuat
- [ ] Advanced features berhasil dibuat
- [ ] KelolaAja features berhasil dibuat
- [ ] Industries berhasil dibuat (optional)
- [ ] Feature pages berhasil dibuat (optional)

Setelah semua checklist tercentang, database siap digunakan! 🎉



