# 🔧 Troubleshooting: Error 400 pada Job Application Submit

## Masalah
Error 400 (Bad Request) saat submit job application dari frontend.

## ✅ Perbaikan yang Sudah Dilakukan

### 1. Error Handling yang Lebih Baik
- Menambahkan logging untuk debugging
- Menampilkan error message dari backend dengan jelas
- Parsing error response dengan benar

### 2. Validasi Form
- Validasi `applicantPhone` sebagai required field
- Validasi `jobId` sebelum submit
- Validasi semua required fields

### 3. Format Data
- Memastikan semua field dikirim dengan format yang benar
- Trim whitespace pada semua string fields
- Hanya kirim optional fields jika ada value

## 🔍 Cara Debug

### 1. Cek Console Browser
Buka Developer Tools (F12) → Console tab, lalu cari:
- `Response status:` - Status code dari backend
- `Response text:` - Response body dari backend
- `Submission error:` - Detail error

### 2. Cek Network Tab
1. Buka Developer Tools (F12) → Network tab
2. Submit form lagi
3. Cari request ke `/api/v1/job-applications/apply`
4. Klik request tersebut
5. Lihat tab "Response" untuk melihat error message dari backend

### 3. Cek Backend Logs
Jika backend berjalan di terminal, cek error logs di terminal backend.

## 🐛 Kemungkinan Masalah

### 1. Field Required Tidak Terisi
Pastikan semua field required terisi:
- ✅ jobId (harus valid, bukan 0)
- ✅ applicantName
- ✅ applicantEmail
- ✅ applicantPhone (sekarang required)
- ✅ cv (file)

### 2. Format Email Tidak Valid
Email harus dalam format yang benar: `email@domain.com`

### 3. Ukuran File CV Terlalu Besar
CV maksimal 10MB. Jika lebih besar, akan error.

### 4. Format File CV Tidak Didukung
Backend mungkin hanya menerima file PDF, DOC, atau DOCX.

### 5. Backend Tidak Berjalan
Pastikan backend berjalan di port 8080:
```bash
cd kelolaAja-BE
npm run dev
```

### 6. CORS Error
Jika ada CORS error, pastikan backend sudah dikonfigurasi untuk menerima request dari frontend.

### 7. Database Error
Backend mungkin tidak bisa menyimpan ke database. Cek:
- Apakah database berjalan?
- Apakah koneksi database benar?
- Apakah tabel sudah dibuat?

## 🔧 Solusi

### Jika Error Message Menyebutkan Field Tertentu
- Cek apakah field tersebut sudah diisi
- Cek format field (misalnya email, phone number)
- Cek apakah value field valid

### Jika Error "CV is required"
- Pastikan file CV sudah dipilih
- Pastikan file CV tidak kosong
- Coba upload file CV lain

### Jika Error "Job not found"
- Pastikan jobId valid
- Cek apakah job posting masih aktif di database

### Jika Error "File too large"
- Kompres file CV atau gunakan file yang lebih kecil
- Maksimal 10MB

## 📝 Checklist

Sebelum submit, pastikan:
- [ ] Nama lengkap sudah diisi
- [ ] Email sudah diisi dan formatnya benar
- [ ] Nomor telepon sudah diisi
- [ ] CV sudah diupload
- [ ] Backend sudah berjalan
- [ ] Database sudah terhubung

## 🆘 Jika Masih Error

1. **Copy error message** dari console browser
2. **Copy error response** dari Network tab
3. **Cek backend logs** untuk error detail
4. **Kirimkan informasi ini** untuk debugging lebih lanjut

## 📞 Informasi yang Diperlukan untuk Debugging

Jika masih error, siapkan informasi berikut:
1. Error message lengkap dari console
2. Response status code (400, 500, dll)
3. Response body dari backend
4. Field apa yang diisi saat error
5. Apakah backend berjalan?
6. Apakah database berjalan?

---

**Catatan:** Dengan perbaikan error handling yang baru, error message dari backend sekarang akan ditampilkan dengan jelas di UI. Cek pesan error di form untuk mengetahui masalah spesifiknya.


