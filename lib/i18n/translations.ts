// Translation files for i18n

export type Locale = 'id' | 'en'

export interface Translations {
  nav: {
    features: string
    industries: string
    pricing: string
    company: string
    contact: string
    login: string
    register: string
    help: string
    search: string
  }
  navDropdown: {
    features: {
      finance: string
      project: string
      manufacturing: string
      sales: string
      inventory: string
    }
    industries: {
      fnb: string
      contractor: string
      manufacturing: string
      retail: string
    }
    company: {
      about: string
      contact: string
    }
  }
  hero: {
    title: string
    subtitle: string
    description: string
    ctaText: string
    demoButton: string
  }
  features: {
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  about: {
    title: string
    description: string
  }
  footer: {
    copyright: string
    about: string
    features: string
    contact: string
    contactUs: string
    industries: string
    terms: string
    privacy: string
  }
  benefits?: {
    title: string
    stats: {
      reduceErrors: string
      cutManualProcess: string
      accessReports: string
      customerSupport: string
    }
    features: {
      realtimeReports: {
        title: string
        description: string
      }
      businessControl: {
        title: string
        description: string
      }
      autoRecording: {
        title: string
        description: string
      }
      easyImplementation: {
        title: string
        description: string
      }
    }
  }
  processSteps?: {
    title: string
    steps: {
      analysis: {
        title: string
        description: string
      }
      planning: {
        title: string
        description: string
      }
      training: {
        title: string
        description: string
      }
      goingLive: {
        title: string
        description: string
      }
    }
  }
  ctaSection?: {
    paragraph1: string
    paragraph2: string
    ctaText: string
  }
  erpBenefits?: {
    title: string
    benefits: {
      purchasing: {
        title: string
        description: string
      }
      multiWarehouse: {
        title: string
        description: string
      }
      importExcel: {
        title: string
        description: string
      }
    }
  }
  advancedFeatures?: {
    features: Array<{
      title: string
      description: string
    }>
    learnMore: string
  }
  testimonials?: {
    title: string
    testimonials: Array<{
      quote: string
      name: string
      title: string
      company: string
    }>
  }
  finalCTA?: {
    title: string
    tryFree: string
    scheduleDemo: string
  }
  aboutKelolaAja?: {
    title: string
    subtitle: string
    description: string
    highlight: string
    question: string
    contactVia: string
    ctaText: string
  }
  faq?: {
    title: string
    subtitle: string
    items: Array<{
      question: string
      answer: string
    }>
  }
  pricing?: {
    title: string
    subtitle: string
    description: string
    plans: Array<{
      name: string
      price: string
      pricePeriod: string
      userRange: string
      features: string[]
      ctaText: string
      badgeColor: string
    }>
  }
  kelolaAjaFeatures?: {
    title: string
    features: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  aboutPage?: {
    subtitle: string
    title: string
    content1: string
    content2Part1: string
    content2Part2: string
    vision: {
      title: string
      description: string
    }
    mission: {
      title: string
      items: string[]
    }
  }
  contactPage?: {
    testimonial: {
      name: string
      quote: string
      image: string
    }
    title: string
    benefits: string[]
    form: {
      fullName: string
      companyName: string
      demoDate: string
      demoSession: string
      morning: string
      afternoon: string
      companyEmail: string
      companyPhone: string
      message: string
      submitButton: string
    }
    notes: string[]
  }
}

export const translations: Record<Locale, Translations> = {
  id: {
    nav: {
      features: 'Fitur',
      industries: 'Industri',
      pricing: 'Harga',
      company: 'Perusahaan',
      contact: 'Hubungi Kami',
      login: 'Masuk',
      register: 'Daftar',
      help: 'Bantuan',
      search: 'Cari',
    },
    navDropdown: {
      features: {
        finance: 'Keuangan dan Akuntansi',
        project: 'Manajement Proyek',
        manufacturing: 'Fitur Manufaktur',
        sales: 'Pembelian dan Penjualan',
        inventory: 'Produk dan Inventory',
      },
      industries: {
        fnb: 'Food & Beverage',
        contractor: 'Kontraktor',
        manufacturing: 'Manufaktur',
        retail: 'Retail',
      },
      company: {
        about: 'Tentang Kami',
        contact: 'Kontak Kami',
      },
    },
    hero: {
      title: 'Kelola Usahamu,',
      subtitle: 'Gak Pake Ribet',
      description: 'Tinggalkan cara manual, beralihlah ke KelolaAja software ERP Akuntansi untuk mengelola faktur, pembelian, laporan, hingga analisis bisnis dengan lebih mudah dan gak pake ribet. Semua bisa diakses kapan saja dan di mana saja, membuat pengelolaan bisnis jadi lebih efisien!',
      ctaText: 'Coba Gratis Sekarang',
      demoButton: 'Jadwalkan Demo',
    },
    features: {
      title: 'Fitur Utama',
      subtitle: 'Dapatkan semua yang Anda butuhkan untuk mengelola bisnis',
      items: [
        {
          title: 'Mudah Digunakan',
          description: 'Interface yang intuitif dan user-friendly untuk semua pengguna.',
          icon: '🎯',
        },
        {
          title: 'Terintegrasi',
          description: 'Terhubung dengan berbagai platform dan layanan yang Anda butuhkan.',
          icon: '🔗',
        },
        {
          title: 'Aman & Terpercaya',
          description: 'Keamanan data adalah prioritas utama kami.',
          icon: '🔒',
        },
      ],
    },
    about: {
      title: 'Tentang Kami',
      description: 'Kami adalah tim profesional yang berdedikasi untuk memberikan solusi terbaik bagi bisnis Anda. Dengan pengalaman bertahun-tahun, kami siap membantu Anda mencapai tujuan bisnis.',
    },
    footer: {
      copyright: '© 2024 KelolaAja. All rights reserved.',
      about: 'Tentang',
      features: 'Fitur',
      contact: 'Kontak',
      contactUs: 'Hubungi Kami',
      industries: 'Industri',
      terms: 'Syarat & Ketentuan',
      privacy: 'Kebijakan Privasi',
    },
    benefits: {
      title: 'KelolaAja Bisnis Jadi Lebih Mudah',
      stats: {
        reduceErrors: 'Kurangi kesalahan hingga 90%',
        cutManualProcess: 'Pangkas Proses Manual 80%',
        accessReports: 'Akses Laporan Kapanpun Dimanapun 100%',
        customerSupport: 'Kepuasan Customer Support 100%',
      },
      features: {
        realtimeReports: {
          title: 'Laporan Real-Time',
          description: 'Semua laporan, penjualan, biaya, stok, hingga HR dalam satu software. Analisis lengkap tersedia kapan saja, membuat pengambilan keputusan bisnis lebih cepat.',
        },
        businessControl: {
          title: 'Kontrol Bisnis Jadi Mudah',
          description: 'KelolaAja seluruh proses bisnis dalam satu dashboard. Berikan persetujuan, otorisasi, hingga audit untuk berbagai departemen, sesuai dengan kebutuhan.',
        },
        autoRecording: {
          title: 'Pencatatan Jadi Otomatis',
          description: 'Kurangi waktu pembukuan hingga 95% jadi lebih mudah. Laporan otomatis dan tepat waktu, memungkinkan Anda fokus pada analisis.',
        },
        easyImplementation: {
          title: 'Implementasi Mudah',
          description: 'Mencapai tingkat keberhasilan lebih dari 95% dalam implementasi. Dapatkan perencanaan, pelaksanaan, dan layanan terbaik untuk bisnis Anda.',
        },
      },
    },
    processSteps: {
      title: 'Kelola Usahamu,',
      steps: {
        analysis: {
          title: 'Analisa Proses Bisnis',
          description: 'Tim konsultan kami akan mengidentifikasi masalah dan kebutuhan bisnismu',
        },
        planning: {
          title: 'Perencanaan',
          description: 'Kami pastikan sistem bekerja sesuai dengan proses bisnismu.',
        },
        training: {
          title: 'Pelatihan',
          description: 'Membantu user lewat pelatihan khusus untuk setiap divisi.',
        },
        goingLive: {
          title: 'Going Live',
          description: 'Memastikan semua proses berjalan baik setelah going live.',
        },
      },
    },
    ctaSection: {
      paragraph1: 'Lupakan pencatatan manual yang rumit. Dengan KelolaAja, laporan keuangan real-time, mulai dari transaksi hingga inventori, semuanya terpusat dalam satu platform yang praktis.',
      paragraph2: 'Pantau arus kas, kirim invoice, dan KelolaAja pembelian dengan mudah, sehingga saat ini Anda bisa lebih fokus mengembangkan bisnis daripada mengurusi administrasi.',
      ctaText: 'Coba Gratis Sekarang',
    },
    erpBenefits: {
      title: 'Keuntungan Menggunakan Software ERP KelolaAja',
      benefits: {
        purchasing: {
          title: 'Purchasing',
          description: 'Buat purchase order dan faktur dalam satu langkah mudah.',
        },
        multiWarehouse: {
          title: 'Multi Gudang',
          description: 'KelolaAja stok produkmu dibanyak tempat dengan mudah dan pantau stok pergudang secara realtime.',
        },
        importExcel: {
          title: 'Import dari Excel',
          description: 'Tidak perlu lagi repot memasukkan data produk dan stok secara manual, cukup ketik di Excel dan unggah. Semua informasi akan otomatis terintegrasi ke dalam sistem KelolaAja.',
        },
      },
    },
    advancedFeatures: {
      features: [
        {
          title: 'Keuangan & Akuntansi',
          description: 'Buat laporan keuangan seperti laba rugi, neraca, dan arus kas secara real-time. Pemantauan buku besar, serta utang dan piutang, menjadi lebih sederhana. Dapatkan laporan kinerja perusahaan yang selalu terkini dan menyeluruh.',
        },
        {
          title: 'Manufaktur',
          description: 'KelolaAja proses manufaktur dengan mudah, hitung Harga Pokok Penjualan produk secara otomatis. Rencanakan produksi, Bill of Material, serta hitung biaya bahan baku dan overhead produksi pabrik secara otomatis dengan modul manufaktur.',
        },
        {
          title: 'Manajement Proyek',
          description: 'KelolaAja dirancang untuk semua jenis & skala bisnis. Sekalipun Anda tidak memahami secara mendalam, Anda akan dengan mudah beradaptasi dengan KelolaAja. Selain itu, tim kelolaAja akan selalu membantu sampai Anda bisa.',
        },
        {
          title: 'Pembelian & Penjualan',
          description: 'Proses jual-beli yang lebih fleksibel, bisa pilih jual putus atau konsinyasi. Dilengkapi fitur DP dan diskon bertingkat. Pantau pengiriman barang, buat tagihan, hingga dengan mudah dalam satu software.',
        },
        {
          title: 'Produk & Inventory',
          description: 'KelolaAja produk dan inventory dengan efisien, mulai dari pengadaan hingga pengiriman. Pantau stok secara real-time, atur harga, dan optimalkan alur distribusi menggunakan satu platform.',
        },
        {
          title: 'HR & Payroll',
          description: 'KelolaAja HR dan payroll dengan mudah, mulai dari pengelolaan data karyawan, absensi, hingga perhitungan gaji. Semua proses otomatis, akurat, dan dapat diakses kapan saja, memudahkan manajemen SDM di perusahaan Anda.',
        },
      ],
      learnMore: 'Pelajari Selengkapnya',
    },
    testimonials: {
      title: 'Pengalaman Menggunakan KelolaAja',
      testimonials: [
        {
          quote: 'Mengguanakan software ERP KelolaAja yang simpel, praktis, dan mudah digunakan, menjadikan pengelolaan lebih cepat dan efisien.',
          name: 'Puji Waluyo',
          title: 'Manager',
          company: 'Sriendo Food Prima',
        },
        {
          quote: 'KelolaAja yang simpel, praktis, dan mudah digunakan, menjadikan pengelolaan lebih cepat dan efisien serta dapat di akses dimana saja.',
          name: 'Angga Yudhitama Putra',
          title: 'CEO',
          company: 'Sriendo Food Prima',
        },
        {
          quote: 'Pengelolaan keuangan yang lebih efisien, laporan real-time, dan pengambilan keputusan yang lebih cepat dan akurat.',
          name: 'Ayu Panduwinata',
          title: 'Manager Finance',
          company: '',
        },
      ],
    },
    finalCTA: {
      title: 'KelolaAja Keuangan Bisnismu Agar Mudah!!!',
      tryFree: 'Coba Gratis Sekarang',
      scheduleDemo: 'Jadwalkan Demo',
    },
    aboutKelolaAja: {
      title: 'Apa Itu KelolaAja?',
      subtitle: 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia',
      description: 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.',
      highlight: 'KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.',
      question: 'Ada pertanyaan?',
      contactVia: 'Kontak kami via WhatsApp',
      ctaText: 'Coba Gratis Sekarang',
    },
    faq: {
      title: 'Pertanyaan Umum',
      subtitle: 'Temukan jawaban atas pertanyaan umum tentang KelolaAja',
      items: [
        {
          question: 'Apakah ada pelatihan untuk menggunakan KelolaAja?',
          answer: 'Ada, pelatihan baik secara online maupun langsung, termasuk tutorial, webinar, dan dukungan teknis, agar tim Anda dapat memanfaatkan software tersebut secara optimal.',
        },
        {
          question: 'Apa yang dibutuhkan untuk menggunakan KelolaAja?',
          answer: 'Tidak ada. Anda hanya memerlukan komputer beserta koneksi internet.',
        },
        {
          question: 'Apa manfaat software ERP akuntansi untuk bisnis?',
          answer: 'Akuntansi ERP KelolaAja mampu menghemat waktu pekerjaan perusahaan. Selain itu sistem akuntansi ini juga mampu menghindarkan perusahaan Anda dari kesalahan atau kekeliruan dalam perhitungan akuntansi, membuat laporan bisnis pun menjadi lebih aman, cepat dan mudah.',
        },
        {
          question: 'Apakah Aman Menggunakan KelolaAja?',
          answer: 'KelolaAja bertanggung jawab secara serius atas keamanan yang diperoleh pelanggan. Selain itu, keunggulan dari software, sistem, dan data menjadi prioritas utama kami. Keamanan juga menjadi kunci dari penawaran yang kami berikan. Untuk itu semua informasi yang Anda berikan telah ter-encrypt dan terjaga dengan teknologi dan keamanan yang terkemuka.',
        },
      ],
    },
    pricing: {
      title: 'Semua Fitur Hebat KelolaAja',
      subtitle: 'Hanya 200ribuan/bulan',
      description: 'Dari pembuatan faktur, pembelian, pengelolaan inventaris, manajemen aset tetap, hingga laporan keuangan dan analisis bisnis, semuanya tersedia dalam satu platform.',
      plans: [
        {
          name: 'Small',
          price: 'Rp250,000',
          pricePeriod: 'Per user dibayar per bulan',
          userRange: '5-10 User',
          features: [
            'Alur Bisnis Lengkap',
            'Manajemen Stok',
            'Aset Tetap',
            'Inventori Multi Gudang',
            'Laporan Keuangan & Bisnis',
            'Multi Cabang, Multi Divisi, Multi Outlet, Multi Proyek',
            'Pembatasan Hak Akses',
            'File Attachment',
            'Auto Backup',
            'Free Support',
          ],
          ctaText: 'Coba Gratis Sekarang',
          badgeColor: 'orange',
        },
        {
          name: 'Medium',
          price: 'Rp225,000',
          pricePeriod: 'Per user dibayar per bulan',
          userRange: '11-15 User',
          features: [
            'Alur Bisnis Lengkap',
            'Manajemen Stok',
            'Aset Tetap',
            'Inventori Multi Gudang',
            'Laporan Keuangan & Bisnis',
            'Multi Cabang, Multi Divisi, Multi Outlet, Multi Proyek',
            'Pembatasan Hak Akses',
            'File Attachment',
            'Auto Backup',
            'Free Support',
          ],
          ctaText: 'Coba Gratis Sekarang',
          badgeColor: 'blue',
        },
        {
          name: 'Large',
          price: 'Rp210,000',
          pricePeriod: 'Per user dibayar per bulan',
          userRange: 'Up 16 User',
          features: [
            'Alur Bisnis Lengkap',
            'Manajemen Stok',
            'Aset Tetap',
            'Inventori Multi Gudang',
            'Laporan Keuangan & Bisnis',
            'Multi Cabang, Multi Divisi, Multi Outlet, Multi Proyek',
            'Pembatasan Hak Akses',
            'File Attachment',
            'Auto Backup',
            'Free Support',
          ],
          ctaText: 'Coba Gratis Sekarang',
          badgeColor: 'green',
        },
      ],
    },
    kelolaAjaFeatures: {
      title: 'Fitur KelolaAja',
      features: [
        {
          title: 'Keamanan',
          description: 'Seluruh komunikasi dengan server dienkripsi dengan 256-bit SSL encryption.',
          icon: 'shield',
        },
        {
          title: 'Pembatasan Hak Akses',
          description: 'Atur hak akses untuk setiap karyawan atau akuntan di perusahaanmu. Pastikan hanya memberi hak akses sesuai kebutuhan.',
          icon: 'lock',
        },
        {
          title: 'Penyusutan Aset Otomatis',
          description: 'Perhitungan penyusutan aset tetap akan dilakukan secara otomatis oleh KelolaAja.',
          icon: 'chart',
        },
        {
          title: 'Akses Dari Mana Saja',
          description: 'iOs, Android, Windows, Mac semua bisa untuk mengakses KelolaAja. Tak perlu khawatir!',
          icon: 'cloud',
        },
        {
          title: 'Kustom Akun Akuntansi',
          description: 'Tambah ubah dan hapus akun akuntansi (Chart of Accounts) sesuai kebutuhan bisnismu.',
          icon: 'document',
        },
        {
          title: 'Perhitungan Pajak',
          description: 'Pajakmu akan otomatis dikalkulasi secara realtime oleh KelolaAja. Tak perlu lagi ribet hitung-hitung pajak.',
          icon: 'calculator',
        },
        {
          title: 'Kustomisasi Pajak',
          description: 'Buat pajak sesuai kebutuhan, berapa persen potongannya dan sebagainya.',
          icon: 'tax',
        },
        {
          title: 'Statistik Bisnis',
          description: 'Dapatkan grafik statistik secara realtime untuk memantau performa bisnismu setiap saat.',
          icon: 'statistics',
        },
        {
          title: 'Import Data Masal Excel',
          description: 'Import data invoice, purchase order, produk dan sebagainya dengan file excel, bisa ratusan data dalam satu waktu.',
          icon: 'import',
        },
      ],
    },
  },
  en: {
    nav: {
      features: 'Features',
      industries: 'Industries',
      pricing: 'Pricing',
      company: 'Company',
      contact: 'Contact Us',
      login: 'Login',
      register: 'Register',
      help: 'Help',
      search: 'Search',
    },
    navDropdown: {
      features: {
        finance: 'Finance & Accounting',
        project: 'Project Management',
        manufacturing: 'Manufacturing Features',
        sales: 'Purchasing & Sales',
        inventory: 'Products & Inventory',
      },
      industries: {
        fnb: 'Food & Beverage',
        contractor: 'Contractor',
        manufacturing: 'Manufacturing',
        retail: 'Retail',
      },
      company: {
        about: 'About Us',
        contact: 'Contact Us',
      },
    },
    hero: {
      title: 'Manage Your Business,',
      subtitle: 'No Hassle',
      description: 'Leave manual methods behind, switch to KelolaAja ERP Accounting software to manage invoices, purchases, reports, and business analysis more easily and without hassle. Everything can be accessed anytime, anywhere, making business management more efficient!',
      ctaText: 'Try Free Now',
      demoButton: 'Schedule Demo',
    },
    features: {
      title: 'Key Features',
      subtitle: 'Get everything you need to manage your business',
      items: [
        {
          title: 'Easy to Use',
          description: 'Intuitive and user-friendly interface for all users.',
          icon: '🎯',
        },
        {
          title: 'Integrated',
          description: 'Connected with various platforms and services you need.',
          icon: '🔗',
        },
        {
          title: 'Secure & Trusted',
          description: 'Data security is our top priority.',
          icon: '🔒',
        },
      ],
    },
    about: {
      title: 'About Us',
      description: 'We are a professional team dedicated to providing the best solutions for your business. With years of experience, we are ready to help you achieve your business goals.',
    },
    footer: {
      copyright: '© 2024 KelolaAja. All rights reserved.',
      about: 'About',
      features: 'Features',
      contact: 'Contact',
      contactUs: 'Contact Us',
      industries: 'Industries',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
    },
    benefits: {
      title: 'KelolaAja Business Becomes Easier',
      stats: {
        reduceErrors: 'Reduce errors by up to 90%',
        cutManualProcess: 'Cut Manual Processes by 80%',
        accessReports: 'Access Reports Anytime Anywhere 100%',
        customerSupport: '24/7 Customer Support',
      },
      features: {
        realtimeReports: {
          title: 'Real-Time Reports',
          description: 'Get real-time business reports and analytics to make better decisions.',
        },
        businessControl: {
          title: 'Complete Business Control',
          description: 'Manage all aspects of your business from one platform.',
        },
        autoRecording: {
          title: 'Automatic Recording',
          description: 'All transactions are automatically recorded and organized.',
        },
        easyImplementation: {
          title: 'Easy Implementation',
          description: 'Quick and easy setup process, no technical knowledge required.',
        },
      },
    },
    processSteps: {
      title: 'Manage Your Business, No Hassle',
      steps: {
        analysis: {
          title: 'Business Process Analysis',
          description: 'Our consultant team will identify problems and your business needs',
        },
        planning: {
          title: 'Planning',
          description: 'We ensure the system works according to your business processes.',
        },
        training: {
          title: 'Training',
          description: 'Help users through special training for each division.',
        },
        goingLive: {
          title: 'Going Live',
          description: 'Ensuring all processes run smoothly after going live.',
        },
      },
    },
    ctaSection: {
      paragraph1:
        'Start KelolaAja to help business finances grow rapidly through automation. Reduce 80% of manual processes, speed up bookkeeping, and provide real-time business intelligence. KelolaAja is the best choice for businesses that want to succeed in the digital era.',
      paragraph2:
        'Proven by companies in Indonesia, KelolaAja is a trusted and effective solution for managing business operations.',
      ctaText: 'Try Free Now',
    },
    erpBenefits: {
      title: 'Benefits of Using KelolaAja ERP Software',
      benefits: {
        purchasing: {
          title: 'Purchasing',
          description: 'Create purchase orders and invoices in one easy step.',
        },
        multiWarehouse: {
          title: 'Multi Warehouse',
          description: 'Manage your product stock in many places easily and monitor stock per warehouse in real-time.',
        },
        importExcel: {
          title: 'Import from Excel',
          description: 'No need to bother entering product and stock data manually, just type in Excel and upload. All information will automatically be integrated into the KelolaAja system.',
        },
      },
    },
    advancedFeatures: {
      features: [
        {
          title: 'Finance & Accounting',
          description: 'Create financial reports such as profit and loss, balance sheet, and cash flow in real-time. Monitoring general ledger, as well as receivables and payables, becomes simpler. Get up-to-date and comprehensive company performance reports.',
        },
        {
          title: 'Manufacturing',
          description: 'Manage the manufacturing process easily, automatically calculate the Cost of Goods Sold for products. Plan production, Bill of Material, and automatically calculate raw material costs and factory production overhead with the manufacturing module.',
        },
        {
          title: 'Project Management',
          description: 'KelolaAja is designed for all types & scales of business. Even if you do not understand in depth, you will easily adapt to KelolaAja. In addition, the KelolaAja team will always help until you can.',
        },
        {
          title: 'Purchasing & Sales',
          description: 'More flexible buying and selling processes, you can choose cash sales or consignment. Equipped with DP features and tiered discounts. Monitor goods delivery, create invoices, all easily in one software.',
        },
        {
          title: 'Products & Inventory',
          description: 'Manage products and inventory efficiently, from procurement to delivery. Monitor stock in real-time, set prices, and optimize distribution flow using one platform.',
        },
        {
          title: 'HR & Payroll',
          description: 'Manage HR and payroll easily, from employee data management, attendance, to salary calculation. All processes are automatic, accurate, and accessible anytime, making HR management in your company easier.',
        },
      ],
      learnMore: 'Learn More',
    },
    testimonials: {
      title: 'Experience Using KelolaAja',
      testimonials: [
        {
          quote: 'Using KelolaAja ERP software which is simple, practical, and easy to use, makes management faster and more efficient.',
          name: 'Puji Waluyo',
          title: 'Manager',
          company: 'Sriendo Food Prima',
        },
        {
          quote: 'KelolaAja which is simple, practical, and easy to use, makes management faster and more efficient and can be accessed anywhere.',
          name: 'Angga Yudhitama Putra',
          title: 'CEO',
          company: 'Sriendo Food Prima',
        },
        {
          quote: 'More efficient financial management, real-time reports, and faster and more accurate decision making.',
          name: 'Ayu Panduwinata',
          title: 'Finance Manager',
          company: '',
        },
      ],
    },
    finalCTA: {
      title: 'Manage Your Business Finance Easily!!!',
      tryFree: 'Try Free Now',
      scheduleDemo: 'Schedule Demo',
    },
    aboutKelolaAja: {
      title: 'What is KelolaAja?',
      subtitle: 'Leading ERP Accounting Software for Indonesian Business',
      description: 'KelolaAja ERP Accounting software, founded in 2024 to answer the challenges of companies in managing management systems efficiently. With KelolaAja business software solutions present to meet the needs of various industries. Designed specifically for ease of use and adapted to the needs of Indonesian companies.',
      highlight: 'KelolaAja is the first ERP software that offers the advantage of financial reporting guidance up to tax reporting.',
      question: 'Have questions?',
      contactVia: 'Contact us via WhatsApp',
      ctaText: 'Try Free Now',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about KelolaAja',
      items: [
        {
          question: 'Is there training to use KelolaAja?',
          answer: 'Yes, training both online and in person, including tutorials, webinars, and technical support, so your team can utilize the software optimally.',
        },
        {
          question: 'What is needed to use KelolaAja?',
          answer: 'Nothing. You only need a computer and internet connection.',
        },
        {
          question: 'What are the benefits of ERP accounting software for business?',
          answer: 'KelolaAja ERP Accounting is able to save company work time. In addition, this accounting system is also able to prevent your company from errors or mistakes in accounting calculations, making business reports safer, faster and easier.',
        },
        {
          question: 'Is it Safe to Use KelolaAja?',
          answer: 'KelolaAja is seriously responsible for the security obtained by customers. In addition, the advantages of software, systems, and data are our top priorities. Security is also the key to the offer we provide. For this reason, all information you provide has been encrypted and protected with leading technology and security.',
        },
      ],
    },
    pricing: {
      title: 'All Great Features of KelolaAja',
      subtitle: 'Only 200 thousand/month',
      description: 'From invoice creation, purchasing, inventory management, fixed asset management, to financial reports and business analysis, everything is available in one platform.',
      plans: [
        {
          name: 'Small',
          price: 'Rp250,000',
          pricePeriod: 'Per user paid per month',
          userRange: '5-10 User',
          features: [
            'Complete Business Flow',
            'Stock Management',
            'Fixed Assets',
            'Multi-Warehouse Inventory',
            'Financial & Business Reports',
            'Multi-Branch, Multi-Division, Multi-Outlet, Multi-Project',
            'Access Rights Restriction',
            'File Attachment',
            'Auto Backup',
            'Free Support',
          ],
          ctaText: 'Try Free Now',
          badgeColor: 'orange',
        },
        {
          name: 'Medium',
          price: 'Rp225,000',
          pricePeriod: 'Per user paid per month',
          userRange: '11-15 User',
          features: [
            'Complete Business Flow',
            'Stock Management',
            'Fixed Assets',
            'Multi-Warehouse Inventory',
            'Financial & Business Reports',
            'Multi-Branch, Multi-Division, Multi-Outlet, Multi-Project',
            'Access Rights Restriction',
            'File Attachment',
            'Auto Backup',
            'Free Support',
          ],
          ctaText: 'Try Free Now',
          badgeColor: 'blue',
        },
        {
          name: 'Large',
          price: 'Rp210,000',
          pricePeriod: 'Per user paid per month',
          userRange: 'Up 16 User',
          features: [
            'Complete Business Flow',
            'Stock Management',
            'Fixed Assets',
            'Multi-Warehouse Inventory',
            'Financial & Business Reports',
            'Multi-Branch, Multi-Division, Multi-Outlet, Multi-Project',
            'Access Rights Restriction',
            'File Attachment',
            'Auto Backup',
            'Free Support',
          ],
          ctaText: 'Try Free Now',
          badgeColor: 'green',
        },
      ],
    },
    kelolaAjaFeatures: {
      title: 'KelolaAja Features',
      features: [
        {
          title: 'Security',
          description: 'All communication with the server is encrypted with 256-bit SSL encryption.',
          icon: 'shield',
        },
        {
          title: 'Access Rights Restriction',
          description: 'Set access rights for every employee or accountant in your company. Ensure to only grant access rights as needed.',
          icon: 'lock',
        },
        {
          title: 'Automatic Asset Depreciation',
          description: 'Fixed asset depreciation calculation will be done automatically by KelolaAja.',
          icon: 'chart',
        },
        {
          title: 'Access From Anywhere',
          description: 'iOS, Android, Windows, Mac can all access KelolaAja. No need to worry!',
          icon: 'cloud',
        },
        {
          title: 'Custom Accounting Accounts',
          description: 'Add, change, and delete accounting accounts (Chart of Accounts) according to your business needs.',
          icon: 'document',
        },
        {
          title: 'Tax Calculation',
          description: 'Your taxes will be automatically calculated in real-time by KelolaAja. No need to bother with tax calculations anymore.',
          icon: 'calculator',
        },
        {
          title: 'Tax Customization',
          description: 'Create taxes as needed, including percentage deductions and so on.',
          icon: 'tax',
        },
        {
          title: 'Business Statistics',
          description: 'Get real-time statistical graphs to monitor your business performance at all times.',
          icon: 'statistics',
        },
        {
          title: 'Bulk Excel Data Import',
          description: 'Import invoice data, purchase orders, products, and so on with an Excel file, hundreds of data at once.',
          icon: 'import',
        },
      ],
    },
    aboutPage: {
      subtitle: 'About KelolaAja',
      title: 'Manage Your Business, No Hassle',
      content1:
        'KelolaAja comes as a digital solution to help businesses grow faster, more organized, and more professional. With the spirit of "Manage Your Business, No Hassle", KelolaAja presents a modern, easy-to-use system that is relevant to the needs of entrepreneurs in the digital era.',
      content2Part1:
        'We believe that every business, no matter how small, deserves to be managed with an organized system so it can grow, develop, and compete in the market.',
      content2Part2:
        'Start KelolaAja to help business finances grow rapidly through automation. Reduce 80% of manual processes, speed up bookkeeping, and provide real-time business intelligence. KelolaAja is the best choice for businesses that want to succeed in the digital era. Proven by companies in Indonesia, KelolaAja is a trusted and effective solution for managing business operations.',
      vision: {
        title: 'VISION',
        description: 'The realization of welfare and blessings for humanity through digital solutions.',
      },
      mission: {
        title: 'MISSION',
        items: [
          'Provide digital solutions that facilitate business management.',
          'Help businesses grow productively, efficiently, and sustainably.',
          'Present affordable technology for all business scales.',
          'Maintain the value of blessings in every innovation and service.',
        ],
      },
    },
    contactPage: {
      testimonial: {
        name: 'Ayu Panduwinata',
        quote: 'Business processes are now twice as efficient. In addition, service is also one of KelolaAja\'s advantages. Every time we have a problem, the KelolaAja team is very responsive.',
        image: '/images/default-profile.png',
      },
      title: 'Get Free Consultation For Your Business Process Problems',
      benefits: [
        'Served by a team of specialist consultants in various industries',
        'Identify various problems in your business process along with their solutions',
        'Free consultation conducted online via Zoom',
        'Schedule a consultation according to your wishes',
      ],
      form: {
        fullName: 'Full Name',
        companyName: 'Company Name',
        demoDate: 'Demo Date',
        demoSession: 'Demo Session',
        morning: 'Morning',
        afternoon: 'Afternoon',
        companyEmail: 'Company Email',
        companyPhone: 'Company Phone',
        message: 'Message',
        submitButton: 'Register Now',
      },
      notes: [
        'Please complete your personal data correctly to facilitate communication and confirmation with the KelolaAja team',
        'After you schedule a demo session and free consultation, we will immediately confirm via WhatsApp or email.',
        'Make sure you choose a suitable time so that the demo session runs smoothly and you can get the necessary information.',
        'You can follow the demo or consultation session via smartphone, laptop, or PC, make sure your internet connection is stable.',
      ],
    },
  },
}

