-- Database Schema for KelolaAja Landing Page

-- Table: visitors
-- Menyimpan data pengunjung website
CREATE TABLE IF NOT EXISTS visitors (
  id SERIAL PRIMARY KEY,
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  page_visited VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: contact_submissions
-- Menyimpan data form kontak yang diisi pengunjung
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  source VARCHAR(100) DEFAULT 'landing_page',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: site_config
-- Menyimpan konfigurasi website yang dapat diubah
CREATE TABLE IF NOT EXISTS site_config (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default configuration
INSERT INTO site_config (key, value) VALUES
  ('whatsapp_number', '6281234567890'),
  ('whatsapp_message', 'Halo! Saya tertarik dengan layanan Anda.'),
  ('site_title', 'KelolaAja - Solusi Terbaik untuk Anda'),
  ('site_description', 'Landing page dinamis dengan Next.js dan Tailwind CSS')
ON CONFLICT (key) DO NOTHING;

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON visitors(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

