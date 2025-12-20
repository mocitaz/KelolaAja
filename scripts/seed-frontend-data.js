/**
 * Script to seed database with data from Frontend Components
 * 
 * Usage:
 * 1. Make sure backend is running at http://localhost:8080
 * 2. Run: ACCESS_TOKEN=your_token node scripts/seed-frontend-data.js
 *    OR just run it and follow the login prompt.
 */

const readline = require('readline');
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

// --- DATA DEFINITIONS FROM FRONTEND ---

const testimonials = [
    {
        personName: 'Puji Waluyo',
        position: 'Manager',
        company: 'Sriendo Food Prima',
        testimonialText: 'Mengguanakan software ERP KelolaAja yang simpel, praktis, dan mudah digunakan, menjadikan pengelolaan lebih cepat dan efisien.',
        rating: 5,
        imageUrl: '', // No image in fallback
        displayOrder: 1,
        isActive: true
    },
    {
        personName: 'Angga Yudhitama Putra',
        position: 'CEO',
        company: 'Sriendo Food Prima',
        testimonialText: 'KelolaAja yang simpel, praktis, dan mudah digunakan, menjadikan pengelolaan lebih cepat dan efisien serta dapat di akses dimana saja.',
        rating: 5,
        imageUrl: '',
        displayOrder: 2,
        isActive: true
    },
    {
        personName: 'Ayu Panduwinata',
        position: 'Manager Finance',
        company: '',
        testimonialText: 'Pengelolaan keuangan yang lebih efisien, laporan real-time, dan pengambilan keputusan yang lebih cepat dan akurat.',
        rating: 5,
        imageUrl: '/images/common/ayu.png',
        displayOrder: 3,
        isActive: true
    }
];

const partners = [
    { partnerName: "Sri", logoUrl: "/images/partners/sri.png", displayOrder: 1 },
    { partnerName: "Sriendo Foods", logoUrl: "/images/partners/sriendofoods.png", displayOrder: 2 },
    { partnerName: "Aura Food", logoUrl: "/images/partners/aurafood.png", displayOrder: 3 },
    { partnerName: "Damika", logoUrl: "/images/partners/logo-damika.png", displayOrder: 4 },
    { partnerName: "KAS", logoUrl: "/images/partners/logo-kas.png", displayOrder: 5 },
    { partnerName: "MB Furnistore", logoUrl: "/images/partners/logo-mb-furnistore.jpg", displayOrder: 6 },
    { partnerName: "MML", logoUrl: "/images/partners/logo-mml.jpg", displayOrder: 7 },
    { partnerName: "SBS", logoUrl: "/images/partners/logo-sbs.jpg", displayOrder: 8 }
];

const kelolaAjaFeatures = [
    {
        iconName: 'shield',
        title: { id: 'Keamanan', en: 'Security' },
        description: { id: 'Seluruh komunikasi dengan server dienkripsi dengan 256-bit SSL encryption.', en: 'All communication with the server is encrypted with 256-bit SSL encryption.' },
        displayOrder: 1
    },
    {
        iconName: 'lock',
        title: { id: 'Pembatasan Hak Akses', en: 'Access Rights Restriction' },
        description: { id: 'Atur hak akses untuk setiap karyawan atau akuntan di perusahaanmu. Pastikan hanya memberi hak akses sesuai kebutuhan.', en: 'Set access rights for every employee or accountant in your company. Ensure to only grant access rights as needed.' },
        displayOrder: 2
    },
    {
        iconName: 'chart',
        title: { id: 'Penyusutan Aset Otomatis', en: 'Automatic Asset Depreciation' },
        description: { id: 'Perhitungan penyusutan aset tetap akan dilakukan secara otomatis oleh KelolaAja.', en: 'Fixed asset depreciation calculation will be done automatically by KelolaAja.' },
        displayOrder: 3
    },
    {
        iconName: 'cloud',
        title: { id: 'Akses Dari Mana Saja', en: 'Access From Anywhere' },
        description: { id: 'iOs, Android, Windows, Mac semua bisa untuk mengakses KelolaAja. Tak perlu khawatir!', en: 'iOS, Android, Windows, Mac can all access KelolaAja. No need to worry!' },
        displayOrder: 4
    },
    {
        iconName: 'document',
        title: { id: 'Kustom Akun Akuntansi', en: 'Custom Accounting Accounts' },
        description: { id: 'Tambah ubah dan hapus akun akuntansi (Chart of Accounts) sesuai kebutuhan bisnismu.', en: 'Add, change, and delete accounting accounts (Chart of Accounts) according to your business needs.' },
        displayOrder: 5
    },
    {
        iconName: 'calculator',
        title: { id: 'Perhitungan Pajak', en: 'Tax Calculation' },
        description: { id: 'Pajakmu akan otomatis dikalkulasi secara realtime oleh KelolaAja. Tak perlu lagi ribet hitung-hitung pajak.', en: 'Your taxes will be automatically calculated in real-time by KelolaAja. No need to bother with tax calculations anymore.' },
        displayOrder: 6
    },
    {
        iconName: 'tax',
        title: { id: 'Kustomisasi Pajak', en: 'Tax Customization' },
        description: { id: 'Buat pajak sesuai kebutuhan, berapa persen potongannya dan sebagainya.', en: 'Create taxes as needed, including percentage deductions and so on.' },
        displayOrder: 7
    },
    {
        iconName: 'statistics',
        title: { id: 'Statistik Bisnis', en: 'Business Statistics' },
        description: { id: 'Dapatkan grafik statistik secara realtime untuk memantau performa bisnismu setiap saat.', en: 'Get real-time statistical graphs to monitor your business performance at all times.' },
        displayOrder: 8
    },
    {
        iconName: 'import',
        title: { id: 'Import Data Masal Excel', en: 'Bulk Excel Data Import' },
        description: { id: 'Import data invoice, purchase order, produk dan sebagainya dengan file excel, bisa ratusan data dalam satu waktu.', en: 'Import invoice data, purchase orders, products, and so on with an Excel file, hundreds of data at once.' },
        displayOrder: 9
    }
];

const advancedFeatures = [
    {
        title: { id: 'Keuangan & Akuntansi', en: 'Finance & Accounting' },
        description: { id: 'Buat laporan keuangan seperti laba rugi, neraca, dan arus kas secara real-time. Pemantauan buku besar, serta utang dan piutang, menjadi lebih sederhana.', en: 'Create financial reports such as profit and loss, balance sheet, and cash flow in real-time. Monitoring general ledger, as well as receivables and payables, becomes simpler.' },
        imageUrl: '/images/finance/feature-finance.jpg',
        linkUrl: '/features/finance',
        displayOrder: 1
    },
    {
        title: { id: 'Manufaktur', en: 'Manufacturing' },
        description: { id: 'KelolaAja proses manufaktur dengan mudah, hitung Harga Pokok Penjualan produk secara otomatis. Rencanakan produksi, Bill of Material.', en: 'Manage the manufacturing process easily, automatically calculate the Cost of Goods Sold for products. Plan production, Bill of Material.' },
        imageUrl: '/images/manufacturing/feature-manufacturing.jpg',
        linkUrl: '/features/manufacturing',
        displayOrder: 2
    },
    {
        title: { id: 'Manajement Proyek', en: 'Project Management' },
        description: { id: 'KelolaAja dirancang untuk semua jenis & skala bisnis. Sekalipun Anda tidak memahami secara mendalam, Anda akan dengan mudah beradaptasi dengan KelolaAja.', en: 'KelolaAja is designed for all types & scales of business. Even if you do not understand in depth, you will easily adapt to KelolaAja.' },
        imageUrl: '/images/project/feature-project.jpg',
        linkUrl: '/features/project',
        displayOrder: 3
    },
    {
        title: { id: 'Pembelian & Penjualan', en: 'Purchasing & Sales' },
        description: { id: 'Proses jual-beli yang lebih fleksibel, bisa pilih jual putus atau konsinyasi. Dilengkapi fitur DP dan diskon bertingkat.', en: 'More flexible buying and selling processes, you can choose cash sales or consignment. Equipped with DP features and tiered discounts.' },
        imageUrl: '/images/sales/feature-sales.jpg',
        linkUrl: '/features/sales',
        displayOrder: 4
    },
    {
        title: { id: 'Produk & Inventory', en: 'Products & Inventory' },
        description: { id: 'KelolaAja produk dan inventory dengan efisien, mulai dari pengadaan hingga pengiriman. Pantau stok secara real-time, atur harga.', en: 'Manage products and inventory efficiently, from procurement to delivery. Monitor stock in real-time, set prices.' },
        imageUrl: '/images/inventory/feature-inventory.jpg',
        linkUrl: '/features/inventory',
        displayOrder: 5
    },
    {
        title: { id: 'HR & Payroll', en: 'HR & Payroll' },
        description: { id: 'KelolaAja HR dan payroll dengan mudah, mulai dari pengelolaan data karyawan, absensi, hingga perhitungan gaji.', en: 'Manage HR and payroll easily, from employee data management, attendance, to salary calculation.' },
        imageUrl: '/images/hr/feature-hr.jpg',
        linkUrl: '#',
        displayOrder: 6
    }
];

const processSteps = [
    {
        iconName: 'analysis',
        title: { id: 'Analisa Proses Bisnis', en: 'Business Process Analysis' },
        description: { id: 'Tim konsultan kami akan mengidentifikasi masalah dan kebutuhan bisnismu', en: 'Our consultant team will identify problems and your business needs' },
        displayOrder: 1
    },
    {
        iconName: 'planning',
        title: { id: 'Perencanaan', en: 'Planning' },
        description: { id: 'Kami pastikan sistem bekerja sesuai dengan proses bisnismu.', en: 'We ensure the system works according to your business processes.' },
        displayOrder: 2
    },
    {
        iconName: 'training',
        title: { id: 'Pelatihan', en: 'Training' },
        description: { id: 'Membantu user lewat pelatihan khusus untuk setiap divisi.', en: 'Help users through special training for each division.' },
        displayOrder: 3
    },
    {
        iconName: 'goingLive',
        title: { id: 'Going Live', en: 'Going Live' },
        description: { id: 'Memastikan semua proses berjalan baik setelah going live.', en: 'Ensuring all processes run smoothly after going live.' },
        displayOrder: 4
    }
];

const erpBenefits = [
    {
        title: { id: 'Purchasing', en: 'Purchasing' },
        description: { id: 'Buat purchase order dan faktur dalam satu langkah mudah.', en: 'Create purchase orders and invoices in one easy step.' },
        imageUrl: '/images/home/purchasing.jpg',
        displayOrder: 1
    },
    {
        title: { id: 'Multi Gudang', en: 'Multi Warehouse' },
        description: { id: 'KelolaAja stok produkmu dibanyak tempat dengan mudah dan pantau stok pergudang secara realtime.', en: 'Manage your product stock in many places easily and monitor stock per warehouse in real-time.' },
        imageUrl: '/images/home/multi-gudang.jpg',
        displayOrder: 2
    },
    {
        title: { id: 'Import dari Excel', en: 'Import from Excel' },
        description: { id: 'Tidak perlu lagi repot memasukkan data produk dan stok secara manual, cukup ketik di Excel dan unggah.', en: 'No need to manually enter product and stock data, just type in Excel and upload.' },
        imageUrl: '/images/inventory/import-excel.jpg',
        displayOrder: 3
    }
];

const industries = [
    {
        slug: 'fnb',
        iconName: '🍽️',
        name: { id: 'Food & Beverage', en: 'Food & Beverage' },
        description: { id: 'Solusi lengkap untuk mengelola restoran, kafe, dan bisnis kuliner Anda. Kelola menu, pesanan, inventory, dan laporan keuangan dengan mudah.', en: 'Complete solution for managing your restaurant, cafe, and culinary business. Manage menus, orders, inventory, and financial reports easily.' },
        displayOrder: 1
    },
    {
        slug: 'contractor',
        iconName: '🏗️',
        name: { id: 'Kontraktor', en: 'Contractor' },
        description: { id: 'Sistem manajemen proyek konstruksi yang terintegrasi. Kelola proyek, material, tenaga kerja, dan progress dengan efisien.', en: 'Integrated construction project management system. Manage projects, materials, labor, and progress efficiently.' },
        displayOrder: 2
    },
    {
        slug: 'manufacturing',
        iconName: '🏭',
        name: { id: 'Manufaktur', en: 'Manufacturing' },
        description: { id: 'Sistem manufaktur terintegrasi untuk mengelola produksi, quality control, supply chain, dan inventory management.', en: 'Integrated manufacturing system to manage production, quality control, supply chain, and inventory management.' },
        displayOrder: 3
    },
    {
        slug: 'retail',
        iconName: '🛍️',
        name: { id: 'Retail', en: 'Retail' },
        description: { id: 'Solusi lengkap untuk mengelola toko retail dan e-commerce. Kelola produk, penjualan, inventory, dan customer dengan mudah.', en: 'Complete solution for managing retail stores and e-commerce. Manage products, sales, inventory, and customers easily.' },
        displayOrder: 4
    }
];

// --- HELPER FUNCTIONS ---

const login = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok && data.success && data.data?.accessToken) {
            return data.data.accessToken;
        }
        throw new Error(data.message || 'Login failed');
    } catch (error) {
        throw new Error(`Login error: ${error.message}`);
    }
};

const seedData = async (accessToken, endpoint, data, nameField = 'title') => {
    console.log(`\n🌱 Seeding ${endpoint}...`);
    let successCount = 0;
    let failCount = 0;

    // Transform data if needed for simple structure
    // Some endpoints might require specific structure, usually they accept a flat object + translations array

    for (const item of data) {
        try {
            // Construct payload
            const payload = { ...item };

            // Handle translations if present
            const translations = [];
            if (item.title && typeof item.title === 'object') {
                translations.push({ locale: 'id', title: item.title.id, description: item.description?.id || '' });
                translations.push({ locale: 'en', title: item.title.en, description: item.description?.en || '' });
                payload.title = item.title.id; // Default fallback
                payload.description = item.description?.id || '';
                delete payload.translations; // Will be re-added
            }
            if (item.name && typeof item.name === 'object') {
                translations.push({ locale: 'id', name: item.name.id, description: item.description?.id || '' });
                translations.push({ locale: 'en', name: item.name.en, description: item.description?.en || '' });
                payload.name = item.name.id;
                payload.description = item.description?.id || '';
            }

            if (translations.length > 0) {
                payload.translations = translations;
            }

            // Special case for Partners (no translations usually, simplified structure)
            if (endpoint.includes('partners')) {
                // Partners usually don't have translations structure in simple implementations, 
                // but if the API supports it, great. The payload above works for features.
                // Let's assume partners are simple.
                if (item.partnerName) payload.partnerName = item.partnerName;
            }

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(payload)
            });
            const resData = await response.json();

            if (response.ok && resData.success) {
                const displayName = item.title?.id || item.partnerName || item.name?.id || item.personName || 'Item';
                console.log(`✅ Added: ${displayName}`);
                successCount++;
            } else {
                console.error(`❌ Failed: ${resData.message || 'Unknown error'}`);
                failCount++;
            }
        } catch (error) {
            console.error(`❌ Error: ${error.message}`);
            failCount++;
        }
    }
    console.log(`✨ ${endpoint} finished. Success: ${successCount}, Failed: ${failCount}`);
};

// --- MAIN EXECUTION ---

const promptInput = (question) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => rl.question(question, (ans) => { rl.close(); resolve(ans); }));
};

(async () => {
    console.log('🚀 Starting Frontend Data Seeder...');

    let accessToken = process.env.ACCESS_TOKEN;
    if (!accessToken) {
        const useLogin = await promptInput('Do you want to login? (y/n): ');
        if (useLogin.toLowerCase().startsWith('y')) {
            const username = await promptInput('Username: ');
            const password = await promptInput('Password: ');
            console.log('Logging in...');
            accessToken = await login(username, password);
            console.log('✅ Login successful!\n');
        } else {
            console.log('Please provide ACCESS_TOKEN env var.');
            process.exit(1);
        }
    }

    // Execute seeding for each section
    await seedData(accessToken, '/api/v1/admin/testimonials', testimonials, 'personName');
    await seedData(accessToken, '/api/v1/partners/admin', partners, 'partnerName');
    await seedData(accessToken, '/api/v1/kelolaaja-features/admin', kelolaAjaFeatures, 'title');
    await seedData(accessToken, '/api/v1/advanced-features/admin', advancedFeatures, 'title');
    await seedData(accessToken, '/api/v1/process-steps/admin', processSteps, 'title');
    await seedData(accessToken, '/api/v1/erp-benefits/admin', erpBenefits, 'title');
    await seedData(accessToken, '/api/v1/industries/admin', industries, 'name');

    console.log('\n🎉 All seeding completed!');
})();
