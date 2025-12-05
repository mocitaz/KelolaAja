# ⚡ Quick Start - Database Seeding

## 🚀 Langkah Cepat untuk Mengisi Database

### 1. Pastikan Prerequisites

```bash
# Cek apakah database sudah berjalan
cd kelolaAja-BE
# Pastikan .env sudah dikonfigurasi dengan benar
```

### 2. Generate Prisma Client (Jika belum)

```bash
cd kelolaAja-BE
npx prisma generate
```

### 3. Jalankan Semua Seeders

```bash
cd kelolaAja-BE
npm run seed:all
```

**Atau jika menggunakan yarn:**
```bash
cd kelolaAja-BE
yarn seed:all
```

### 4. Verifikasi

Login ke admin panel:
- URL: `http://localhost:3000/login`
- Email: `admin@kelolaaja.com`
- Password: `admin123`

## 📋 Apa yang Akan Di-Seed?

✅ Admin User (default login)
✅ Site Configuration
✅ Pricing Plans (3 paket)
✅ Features (fitur utama)
✅ FAQ Categories & FAQs (9 FAQ)
✅ Testimonials (3 testimonial)
✅ Partners
✅ Benefit Stats (4 statistik)
✅ Process Steps (4 langkah)
✅ ERP Benefits (3 benefits)
✅ Advanced Features (6 fitur)
✅ KelolaAja Features
✅ About Cards
✅ Industries (optional)
✅ Feature Pages (optional)

## 🔧 Troubleshooting Cepat

**Error: "Admin user not found"**
→ Pastikan `seed.ts` dijalankan pertama

**Error: "Cannot connect to database"**
→ Cek file `.env` dan pastikan PostgreSQL berjalan

**Data tidak muncul di frontend**
→ Pastikan backend API sudah berjalan dan bisa diakses dari FE

## 📚 Dokumentasi Lengkap

Lihat `DATABASE_SEEDING_GUIDE.md` untuk dokumentasi lengkap.

## 💡 Tips

- Seeders sudah memiliki pengecekan untuk menghindari duplikasi
- Jika ingin reset database: `npx prisma migrate reset` (HATI-HATI: hapus semua data!)
- Setelah seeding, semua konten bisa diupdate via admin panel

---

**Selamat! Database Anda sekarang terisi dan siap digunakan! 🎉**



