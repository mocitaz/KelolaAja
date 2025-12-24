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
  comingSoon: {
    title: string
    message: string
    close: string
  }
  navDropdown: {
    features: {
      finance: string
      project: string
      manufacturing: string
      sales: string
      inventory: string
      hr: string
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
      sales: {
        title: string
        description: string
      }
      multiWarehouse: {
        title: string
        description: string
      }
      darkMode: {
        title: string
        description: string
      }
      multiExportInvoice: {
        title: string
        description: string
      }
      documentApproval: {
        title: string
        description: string
      }
      purchasePriceMovement: {
        title: string
        description: string
      }
      stockMovementRealtime: {
        title: string
        description: string
      }
      stockRealtime: {
        title: string
        description: string
      }
      stockTransfer: {
        title: string
        description: string
      }
      vendorPayables: {
        title: string
        description: string
      }
      customerReceivables: {
        title: string
        description: string
      }
      authorizationGroup: {
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
    showAll: string
    showLess: string
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
  industries?: {
    title: string
    subtitle: string
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
    errors: {
      fullNameRequired: string
      companyNameRequired: string
      demoDateRequired: string
      demoSessionRequired: string
      companyEmailRequired: string
      companyEmailInvalid: string
      companyPhoneRequired: string
      messageRequired: string
    }
    notes: string[]
  }
  featuresPage?: {
    hero: {
      title: string
      subtitle: string
    }
    features: Array<{
      title: string
      description: string
      shortDesc: string
    }>
    cta: {
      title: string
      description: string
      buttonText: string
    }
    about: {
      title: string
      subtitle: string
      description1: string
      description2: string
      buttonText: string
    }
    faq: {
      title: string
      subtitle: string
      showAll: string
      showLess: string
      items: Array<{
        question: string
        answer: string
      }>
    }
    learnMore: string
  }
  industriesPage?: {
    hero: {
      badge: string
      title: string
      subtitle: string
    }
    learnMore: string
  }
  industryPages?: {
    fnb?: {
      heroTitle: string
      introText: string
      title: string
      description: string
      problems: Array<{
        title: string
        description: string
      }>
      solutionsTitle: string
      solutions: Array<{
        title: string
        description: string
      }>
      cta: {
        title: string
        description: string
        buttonText: string
      }
      about: {
        title: string
        subtitle?: string
        description1: string
        description2: string
        buttonText: string
      }
      faq: Array<{
        question: string
        answer: string
      }>
    }
    contractor?: {
      heroTitle: string
      introText: string
      title: string
      description: string
      problems: Array<{
        title: string
        description: string
      }>
      solutionsTitle: string
      solutions: Array<{
        title: string
        description: string
      }>
      cta: {
        title: string
        description: string
        buttonText: string
      }
      about: {
        title: string
        subtitle?: string
        description1: string
        description2: string
        buttonText: string
      }
      faq: Array<{
        question: string
        answer: string
      }>
    }
    retail?: {
      heroTitle: string
      introText: string
      title: string
      description: string
      problems: Array<{
        title: string
        description: string
      }>
      solutionsTitle: string
      solutions: Array<{
        title: string
        description: string
      }>
      cta: {
        title: string
        description: string
        buttonText: string
      }
      about: {
        title: string
        subtitle?: string
        description1: string
        description2: string
        buttonText: string
      }
      faq: Array<{
        question: string
        answer: string
      }>
    }
    manufacturing?: {
      heroTitle: string
      introText: string
      title: string
      description: string
      problems: Array<{
        title: string
        description: string
      }>
      solutionsTitle: string
      solutions: Array<{
        title: string
        description: string
      }>
      cta: {
        title: string
        description: string
        buttonText: string
      }
      about: {
        title: string
        subtitle?: string
        description1: string
        description2: string
        buttonText: string
      }
      faq: Array<{
        question: string
        answer: string
      }>
    }
  }
  companyProfile?: {
    hero: {
      badge: string
      title: string
      titleHighlight: string
    }
    about: {
      title: string
      description1: string
      description2: string
      description3: string
    }
    vision: {
      badge: string
      title: string
      description: string
    }
    mission: {
      badge: string
      title: string
      items: string[]
    }
    agileValues: {
      badge: string
      title: string
      subtitle?: string
      values: {
        A: {
          title: string
          subtitle: string
          description: string
        }
        G: {
          title: string
          subtitle: string
          description: string
        }
        I: {
          title: string
          subtitle: string
          description: string
        }
        L: {
          title: string
          subtitle: string
          description: string
        }
        E: {
          title: string
          subtitle: string
          description: string
        }
      }
    }
    coreValues: {
      badge: string
      title: string
      impact: string
      fromImpact: string
      values: {
        I: {
          title: string
          subtitle: string
          description: string
        }
        M: {
          title: string
          subtitle: string
          description: string
        }
        P: {
          title: string
          subtitle: string
          description: string
        }
        A: {
          title: string
          subtitle: string
          description: string
        }
        C: {
          title: string
          subtitle: string
          description: string
        }
        T: {
          title: string
          subtitle: string
          description: string
        }
      }
    }
  }
  financePage?: {
    hero: {
      title: string
      description: string
      ctaButton: string
    }
    softwareFeatures: {
      title: string
      subtitle: string
      description: string
    }
    mainTitle: string
    mainDescription: string
    features: Array<{
      title: string
      description: string
    }>
    cta: {
      mainText1: string
      mainText2: string
      highlights: string[]
      tryFreeButton: string
      consultButton: string
      optimizeTitle: string
      optimizeDescription: string
    }
    about: {
      title: string
      subtitle: string
      description1: string
      description2: string
    }
  }
  manufacturingPage?: {
    hero: {
      title: string
      description: string
      ctaButton: string
    }
    softwareFeatures: {
      title: string
      subtitle: string
      description: string
    }
    mainTitle: string
    mainDescription: string
    features: Array<{
      title: string
      description: string
    }>
    cta: {
      mainText1: string
      mainText2: string
      highlights: string[]
      tryFreeButton: string
      consultButton: string
      optimizeTitle: string
      optimizeDescription: string
    }
    about: {
      title: string
      subtitle: string
      description1: string
      description2: string
    }
  }
  inventoryPage?: {
    hero: {
      title: string
      description: string
      ctaButton: string
    }
    softwareFeatures: {
      title: string
      subtitle: string
      description: string
    }
    mainTitle: string
    mainDescription: string
    features: Array<{
      title: string
      description: string
    }>
    cta: {
      mainText1: string
      mainText2: string
      highlights: string[]
      tryFreeButton: string
      consultButton: string
      optimizeTitle: string
      optimizeDescription: string
    }
    about: {
      title: string
      subtitle: string
      description1: string
      description2: string
    }
  }
  projectPage?: {
    hero: {
      title: string
      description: string
      ctaButton: string
    }
    softwareFeatures: {
      title: string
      subtitle: string
      description: string
    }
    mainTitle: string
    mainDescription: string
    features: Array<{
      title: string
      description: string
    }>
    cta: {
      mainText1: string
      mainText2: string
      highlights: string[]
      tryFreeButton: string
      consultButton: string
      optimizeTitle: string
      optimizeDescription: string
    }
    about: {
      title: string
      subtitle: string
      description1: string
      description2: string
    }
  }
  salesPage?: {
    hero: {
      title: string
      description: string
      ctaButton: string
    }
    softwareFeatures: {
      title: string
      subtitle: string
      description: string
    }
    mainTitle: string
    mainDescription: string
    features: Array<{
      title: string
      description: string
    }>
    cta: {
      mainText1: string
      mainText2: string
      highlights: string[]
      tryFreeButton: string
      consultButton: string
      optimizeTitle: string
      optimizeDescription: string
    }
    about: {
      title: string
      subtitle: string
      description1: string
      description2: string
    }
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
    comingSoon: {
      title: 'Segera Hadir',
      message: 'Modul HR & Payroll sedang dalam tahap pengembangan. Nantikan pembaruan selanjutnya untuk fitur manajemen SDM yang lebih lengkap.',
      close: 'Tutup'
    },
    navDropdown: {
      features: {
        finance: 'Keuangan dan Akuntansi',
        project: 'Manajement Proyek',
        manufacturing: 'Fitur Manufaktur',
        sales: 'Pembelian dan Penjualan',
        inventory: 'Produk dan Inventory',
        hr: 'HR & Payroll',
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
    industries: {
      title: 'Industri yang Kami Layani',
      subtitle: 'Solusi terbaik untuk berbagai industri dan kebutuhan bisnis Anda',
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
        sales: {
          title: 'Penjualan',
          description: 'Kelola seluruh proses penjualan secara terintegrasi, mulai dari penawaran, pesanan pelanggan, pengiriman, hingga penagihan dan penerimaan pembayaran. Dengan alur yang jelas dan data yang tercatat rapi, KelolaAja membantu meningkatkan kontrol penjualan, mempercepat siklus penagihan, serta memastikan setiap transaksi tercatat akurat dan mudah dipantau.',
        },
        multiWarehouse: {
          title: 'Multi Gudang',
          description: 'Kelola stok dan pergerakan barang di berbagai lokasi gudang secara terpusat dan real-time. KelolaAja membantu memastikan kontrol stok yang lebih akurat, meminimalkan selisih persediaan, serta mendukung operasional distribusi yang lebih efisien di setiap gudang.',
        },
        darkMode: {
          title: 'Dark Mode',
          description: 'Nikmati tampilan antarmuka yang lebih nyaman untuk penggunaan jangka panjang, terutama saat bekerja di malam hari atau di lingkungan minim cahaya.',
        },
        multiExportInvoice: {
          title: 'Multi Export Invoice',
          description: 'Ekspor invoice penjualan ke berbagai format sesuai kebutuhan bisnis, seperti PDF A4, kwitansi, maupun format thermal. KelolaAja memudahkan penyesuaian dokumen penagihan untuk kebutuhan administrasi, pencetakan, dan pengiriman ke pelanggan, tanpa proses tambahan yang rumit.',
        },
        documentApproval: {
          title: 'Approval Dokumen',
          description: 'Kelola proses persetujuan dokumen secara terkontrol sebelum transaksi diproses lebih lanjut. KelolaAja membantu memastikan setiap invoice dan dokumen penting telah melalui tahapan verifikasi yang tepat, mengurangi risiko kesalahan, serta menjaga kepatuhan dan akurasi data dalam operasional bisnis.',
        },
        purchasePriceMovement: {
          title: 'Pergerakan Harga Beli',
          description: 'Pantau riwayat dan perubahan harga beli barang secara detail berdasarkan transaksi, waktu, dan tipe dokumen. KelolaAja membantu memberikan visibilitas penuh terhadap tren harga pembelian, sehingga bisnis dapat mengambil keputusan pembelian yang lebih tepat, mengontrol biaya, dan menjaga konsistensi margin.',
        },
        stockMovementRealtime: {
          title: 'Pergerakan Stok Real Time',
          description: 'Pantau setiap pergerakan stok masuk dan keluar secara real-time berdasarkan transaksi, gudang, dan periode tertentu. KelolaAja memberikan visibilitas penuh atas saldo persediaan, membantu mencegah selisih stok, serta memastikan pengambilan keputusan operasional yang lebih cepat dan akurat.',
        },
        stockRealtime: {
          title: 'Stok Real Time',
          description: 'Pantau ketersediaan stok secara real-time di setiap gudang dan kategori barang. KelolaAja membantu memastikan informasi persediaan selalu akurat, memudahkan perencanaan operasional, serta mencegah kehabisan atau kelebihan stok yang dapat mengganggu kelancaran bisnis.',
        },
        stockTransfer: {
          title: 'Transfer Stok',
          description: 'Kelola perpindahan stok antar gudang secara terkontrol dan terdokumentasi. KelolaAja memastikan setiap transfer barang tercatat dengan jelas, menjaga akurasi saldo persediaan di setiap lokasi, serta mendukung kelancaran distribusi tanpa risiko selisih stok.',
        },
        vendorPayables: {
          title: 'Hutang Vendor',
          description: 'Pantau dan kelola kewajiban pembayaran ke vendor secara terstruktur dan transparan. KelolaAja membantu memantau jatuh tempo, umur hutang, serta status pembayaran setiap transaksi, sehingga arus kas lebih terkontrol dan risiko keterlambatan pembayaran dapat diminimalkan.',
        },
        customerReceivables: {
          title: 'Piutang Pelanggan',
          description: 'Kelola piutang pelanggan secara terstruktur dan real-time. KelolaAja membantu memantau jatuh tempo, umur piutang, serta status pembayaran setiap transaksi penjualan, sehingga arus kas lebih terjaga dan risiko piutang macet dapat diminimalkan.',
        },
        authorizationGroup: {
          title: 'Grup Otorisasi',
          description: 'Atur hak akses dan kewenangan pengguna sesuai peran dan tanggung jawab masing-masing. KelolaAja membantu memastikan setiap transaksi dan fitur hanya dapat diakses oleh pihak yang berwenang, sehingga kontrol internal lebih terjaga, risiko kesalahan berkurang, dan keamanan operasional tetap terjamin.',
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
      subtitle: '',
      description: 'KelolaAja adalah software ERP terintegrasi yang dikembangkan khusus untuk menjawab kebutuhan small to growing businesses di Indonesia. Dirancang untuk menyederhanakan proses manajemen keuangan, pembukuan, pelaporan, hingga operasional bisnis lainnya secara menyeluruh, KelolaAja memungkinkan perusahaan untuk mengelola dan memantau aktivitas bisnis secara real-time, dari mana saja, dengan efisiensi tinggi dan akurasi yang konsisten.',
      highlight: 'Meski dioptimalkan untuk bisnis yang sedang tumbuh, KelolaAja dibangun dengan standar dan kapabilitas enterprise-class. Ini memastikan bahwa perusahaan skala besar sekalipun tetap dapat mengandalkan KelolaAja dalam memenuhi kompleksitas kebutuhan internal mereka.',
      question: 'Ada pertanyaan?',
      contactVia: 'Kontak kami via WhatsApp',
      ctaText: 'Coba Gratis Sekarang',
    },
    faq: {
      title: 'Pertanyaan Umum',
      subtitle: 'Temukan jawaban atas pertanyaan umum tentang KelolaAja',
      showAll: 'Lihat Semua FAQ',
      showLess: 'Tampilkan Lebih Sedikit',
      items: [
        {
          question: 'Apa yang membedakan KelolaAja dari software ERP lain di pasaran?',
          answer: 'KelolaAja menghadirkan keseimbangan antara kualitas sistem, kedalaman fitur, dan keterjangkauan biaya. Dibanding ERP lokal maupun global, KelolaAja menawarkan solusi yang komprehensif dan efisien secara biaya, tanpa mengorbankan fungsionalitas inti.',
        },
        {
          question: 'Apakah pengguna perlu memiliki pengalaman teknis untuk menggunakan KelolaAja?',
          answer: 'Tidak. KelolaAja dirancang dengan antarmuka yang intuitif dan alur kerja yang disederhanakan berdasarkan riset langsung terhadap kebutuhan pengguna bisnis di berbagai level. Sistem ini dapat digunakan tanpa pengalaman teknis sebelumnya.',
        },
        {
          question: 'Berapa lama proses implementasi KelolaAja?',
          answer: 'Proses implementasi KelolaAja umumnya memakan waktu antara 1 hingga 3 bulan, tergantung pada kompleksitas struktur bisnis, jumlah modul yang digunakan, dan kesiapan data internal perusahaan. Rentang waktu ini mencakup seluruh tahapan penting seperti analisis kebutuhan, konfigurasi sistem, migrasi data, pelatihan pengguna, hingga pendampingan saat go-live.',
        },
        {
          question: 'Apakah KelolaAja bisa disesuaikan dengan kebutuhan bisnis saya?',
          answer: 'KelolaAja telah dirancang untuk langsung mendukung proses bisnis umum tanpa perlu kustomisasi. Jika ada kebutuhan sangat spesifik, kustomisasi dimungkinkan dengan biaya tambahan sesuai kompleksitas. Namun, kami tidak merekomendasikan kustomisasi kecuali benar-benar diperlukan, agar sistem tetap efisien, stabil, dan scalable.',
        },
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
    contactPage: {
      testimonial: {
        name: 'Ayu Panduwinata',
        quote: 'Proses bisnis sekarang jadi dua kali lebih efisien. Selain itu, pelayanan juga salah satu kelebihan KelolaAja. Setiap kali kami ada kendala, tim KelolaAja sangat responsif.',
        image: '/images/common/ayu.png',
      },
      title: 'Dapatkan Konsultasi Gratis Untuk Masalah Proses Bisnis Anda',
      benefits: [
        'Dilayani tim konsultan spesialis di berbagai industri',
        'Identifikasi berbagai masalah dalam proses bisnis Anda beserta solusinya',
        'Konsultasi gratis dilakukan online via Zoom',
        'Jadwalkan konsultasi sesuai keinginan Anda',
      ],
      form: {
        fullName: 'Nama Lengkap',
        companyName: 'Nama Perusahaan',
        demoDate: 'Tanggal Demo',
        demoSession: 'Sesi Demo',
        morning: 'Pagi',
        afternoon: 'Siang',
        companyEmail: 'Email Perusahaan',
        companyPhone: 'Nomer Perusahaan',
        message: 'Pesan',
        submitButton: 'Daftar Sekarang',
      },
      errors: {
        fullNameRequired: 'Nama lengkap wajib diisi',
        companyNameRequired: 'Nama perusahaan wajib diisi',
        demoDateRequired: 'Tanggal demo wajib diisi',
        demoSessionRequired: 'Sesi demo wajib dipilih',
        companyEmailRequired: 'Email perusahaan wajib diisi',
        companyEmailInvalid: 'Format email tidak valid',
        companyPhoneRequired: 'Nomor perusahaan wajib diisi',
        messageRequired: 'Pesan wajib diisi',
      },
      notes: [
        'Harap lengkapi data diri Anda dengan benar untuk memudahkan komunikasi dan konfirmasi dengan tim KelolaAja',
        'Setelah Anda menjadwalkan sesi demo dan konsultasi gratis, kami akan segera mengonfirmasi melalui WhatsApp atau email.',
        'Pastikan Anda memilih waktu yang sesuai agar sesi demo berjalan lancar dan Anda bisa memperoleh informasi yang diperlukan.',
        'Anda dapat mengikuti sesi demo atau konsultasi melalui smartphone, laptop, atau PC, pastikan juga koneksi internet Anda stabil.',
      ],
    },
    financePage: {
      hero: {
        title: 'Keuangan dan Akuntansi',
        description: 'Sistem keuangan lengkap untuk arus kas, pembukuan, dan laporan. KelolaAja menyediakan solusi terintegrasi untuk mengelola seluruh aspek keuangan bisnis Anda dengan mudah dan efisien.',
        ctaButton: 'Hubungi Kami',
      },
      softwareFeatures: {
        title: 'Software dengan Fitur',
        subtitle: 'Pembukuan dan Mudah Digunakan',
        description: 'KelolaAja dirancang khusus untuk kemudahan penggunaan, bahkan bagi mereka yang tidak memiliki latar belakang akuntansi. Interface yang intuitif dan user-friendly memastikan Anda dapat mengelola pembukuan bisnis dengan mudah dan efisien.',
      },
      mainTitle: 'Keuangan dan Akuntansi',
      mainDescription: 'Dapatkan kontrol penuh atas keuangan bisnis Anda dengan sistem akuntansi yang lengkap dan terintegrasi. Dari pencatatan transaksi hingga laporan keuangan real-time, semua tersedia dalam satu platform.',
      features: [
        {
          title: 'Mudah Untuk Pemula',
          description: 'KelolaAja dirancang untuk semua jenis & skala bisnis. Sekalipun Anda tidak memahami secara mendalam, Anda akan dengan mudah beradaptasi dengan KelolaAja. Selain itu, tim KelolaAja akan selalu membantu sampai Anda bisa.',
        },
        {
          title: 'Pencatatan Data Lebih Mudah',
          description: 'Semua alur bisnis menjadi lebih mudah dipantau. Mulai dari proses pembelian, Penjualan, utang dan piutang, sampai dengan penghitungan penyusutan aset bisa Anda lakukan dengan mudah di KelolaAja.',
        },
        {
          title: 'Pelaporan Konsolidasi',
          description: 'Punya banyak bisnis tapi ingin data keuangan dalam 1 database terpusat? Dengan KelolaAja bisa! Fitur konsolidasi akan secara otomatis mengkompilasi laporan dari masing-masing perusahaan ke dalam satu laporan konsolidasi.',
        },
        {
          title: 'Laporan Realtime',
          description: 'KelolaAja Anda akan mendapatkan lebih dari 35 laporan keuangan yang bisa Anda hasilkan secara instan dalam 1 klik. Kini tidak ada lagi informasi keuangan yang Anda lewatkan dan memudahkan Anda mengambil keputusan yang lebih baik.',
        },
      ],
      cta: {
        mainText1: 'Lupakan pencatatan manual yang rumit. Dengan KelolaAja, laporan keuangan real-time, mulai dari transaksi hingga inventori, semuanya terpusat dalam satu platform yang praktis.',
        mainText2: 'Pantau arus kas, kirim invoice, dan KelolaAja pembelian dengan mudah, sehingga saat ini Anda bisa lebih fokus mengembangkan bisnis daripada mengurusi administrasi.',
        highlights: ['Laporan Real-Time', 'Pantau Arus Kas', 'Invoice Otomatis', 'Platform Terpusat'],
        tryFreeButton: 'Coba Gratis Sekarang',
        consultButton: 'Konsultasi Gratis Sekarang',
        optimizeTitle: 'Siap Mengoptimalkan Keuangan Bisnis Anda?',
        optimizeDescription: 'KelolaAja menyediakan sistem keuangan lengkap untuk mengelola arus kas, pembukuan, dan laporan dengan mudah dan efisien.',
      },
      about: {
        title: 'Apa Itu KelolaAja?',
        subtitle: 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia',
        description1: 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.',
        description2: 'KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.',
      },
    },
    manufacturingPage: {
      hero: {
        title: 'Fitur Manufaktur',
        description: 'Sistem manufaktur terintegrasi untuk produksi dan supply chain. KelolaAja proses manufaktur dengan mudah, hitung Harga Pokok Penjualan produk secara otomatis dan optimalkan efisiensi produksi.',
        ctaButton: 'Hubungi Kami',
      },
      softwareFeatures: {
        title: 'Software dengan Fitur',
        subtitle: 'Manufaktur dan Mudah Digunakan',
        description: 'KelolaAja dirancang khusus untuk kemudahan penggunaan, bahkan bagi mereka yang tidak memiliki latar belakang manufaktur. Interface yang intuitif dan user-friendly memastikan Anda dapat mengelola proses manufaktur dengan mudah dan efisien.',
      },
      mainTitle: 'Fitur Manufaktur',
      mainDescription: 'Dapatkan kontrol penuh atas proses manufaktur Anda dengan sistem yang lengkap dan terintegrasi. Dari perencanaan produksi hingga laporan manufaktur real-time, semua tersedia dalam satu platform.',
      features: [
        {
          title: 'KelolaAja Proyek Menjadi Simpel',
          description: 'Lihat profitabilitas setiap proyek dengan laporan budget dan realisasi anggaran. Pantau berapa pengeluaran, margin profit, dan budget tersisa setiap saat. Fitur approval bertingkat dan bisa disetting sesuai kebutuhan. Cek setiap pengeluaran lengkap dengan history.',
        },
        {
          title: 'Pantau Approval Secara Real Time',
          description: 'Manajemen berbagai proyek dalam satu waktu secara real time. Pantau dan beri approval untuk pembelian barang dari mana saja, pantau budget dan profitabilitas lewat laporan laba rugi per proyek dan pantau progres dengan Task Management Dashboard.',
        },
        {
          title: 'Laporan Keuangan Otomatis',
          description: 'Pantau berapa pengeluaran, margin profit, dan budget tersisa setiap saat. Fitur approval bertingkat dan bisa disetting sesuai kebutuhan. Cek setiap pengeluaran lengkap dengan history. Pengeluaran dan pemasukan di lapangan saat operasional berjalan dengan otomatis dan semua invoice dan payment terdokumentasi di satu modul. Laporan pengeluaran terintegrasi dengan modul keuangan dan akuntansi dan terdokumentasi lengkap untuk pembelian barang, penggunaan bahan baku.',
        },
        {
          title: 'Analisis Laba Rugi',
          description: 'Dapatkan gambaran kesehatan keuangan semua proyek dalam satu dashboard. Laporan Laba Rugi lengkap dengan visualisasi. Cari tahu keuntungan dari setiap jenis kategori proyek. Ketahui proyek-proyek dengan performa terbaik. Ekspor data ke format Excel, CSV dan PDF kapanpun dibutuhkan.',
        },
      ],
      cta: {
        mainText1: 'Lupakan pencatatan manual yang rumit. Dengan KelolaAja, laporan keuangan real-time, mulai dari transaksi hingga inventori, semuanya terpusat dalam satu platform yang praktis.',
        mainText2: 'Pantau arus kas, kirim invoice, dan KelolaAja pembelian dengan mudah, sehingga saat ini Anda bisa lebih fokus mengembangkan bisnis daripada mengurusi administrasi.',
        highlights: ['Laporan Real-Time', 'Pantau Arus Kas', 'Invoice Otomatis', 'Platform Terpusat'],
        tryFreeButton: 'Coba Gratis Sekarang',
        consultButton: 'Konsultasi Gratis Sekarang',
        optimizeTitle: 'Siap Mengoptimalkan Proses Manufaktur Anda?',
        optimizeDescription: 'KelolaAja menyediakan sistem manufaktur terintegrasi untuk produksi dan supply chain dengan mudah dan efisien.',
      },
      about: {
        title: 'Apa Itu KelolaAja?',
        subtitle: 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia',
        description1: 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.',
        description2: 'KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.',
      },
    },
    inventoryPage: {
      hero: {
        title: 'Produk dan Inventory',
        description: 'Manajemen inventory dengan tracking real-time. KelolaAja produk dan inventory dengan efisien, mulai dari pengadaan hingga pengiriman dengan optimasi alur distribusi.',
        ctaButton: 'Hubungi Kami',
      },
      softwareFeatures: {
        title: 'Software dengan Fitur',
        subtitle: 'Produk dan Inventory Mudah Digunakan',
        description: 'KelolaAja dirancang khusus untuk kemudahan penggunaan, bahkan bagi mereka yang tidak memiliki latar belakang inventory. Interface yang intuitif dan user-friendly memastikan Anda dapat mengelola produk dan inventory dengan mudah dan efisien.',
      },
      mainTitle: 'Produk dan Inventory',
      mainDescription: 'Dapatkan kontrol penuh atas manajemen inventory Anda dengan sistem yang lengkap dan terintegrasi. Dari tracking stok hingga laporan inventory real-time, semua tersedia dalam satu platform.',
      features: [
        {
          title: 'Lacak Produk Paling Laris',
          description: 'Dapatkan pembaruan laporan produk terlaris, total profit yang dihasilkan, dan stok produk yang habis secara real-time. Manfaatkan data ini untuk membuat keputusan yang lebih tepat dalam melakukan reorder dan menetapkan harga produk Anda.',
        },
        {
          title: 'Import dari Excel',
          description: 'Tidak perlu lagi repot memasukkan data produk dan stok secara manual, cukup ketik di Excel dan unggah. Semua informasi akan otomatis terintegrasi ke dalam sistem KelolaAja.',
        },
        {
          title: 'Multi Gudang',
          description: 'KelolaAja stok produkmu dibanyak tempat dengan mudah dan pantau stok pergudang secara realtime.',
        },
        {
          title: 'Laporan Realtime',
          description: 'Akses laporan stok di setiap gudang secara detail dan real-time, tanpa perlu menunggu akhir bulan. Pantau pergerakan stok secara langsung dan pastikan barang selalu terpantau dengan baik.',
        },
        {
          title: 'Stok Opname',
          description: 'Proses stok opname jadi lebih praktis! Unduh laporan stok terbaru dalam format Excel, perbarui jumlah stok, dan langsung unggah ke KelolaAja. Cepat dan mudah!',
        },
        {
          title: 'Transfer Gudang',
          description: 'Pindahkan barang antar gudang dengan simpel. Nikmati pencatatan stok yang rapi dan teratur tanpa kerepotan.',
        },
        {
          title: 'Pantau Kapan Saja dan Di Mana Saja',
          description: 'Pantau stok kapan saja, tanpa harus ke kantor atau gudang. Cukup buka laporan dari ponsel atau laptop, di mana pun Anda berada.',
        },
      ],
      cta: {
        mainText1: 'Lupakan pencatatan manual yang rumit. Dengan KelolaAja, laporan keuangan real-time, mulai dari transaksi hingga inventori, semuanya terpusat dalam satu platform yang praktis.',
        mainText2: 'Pantau arus kas, kirim invoice, dan KelolaAja pembelian dengan mudah, sehingga saat ini Anda bisa lebih fokus mengembangkan bisnis daripada mengurusi administrasi.',
        highlights: ['Laporan Real-Time', 'Pantau Arus Kas', 'Invoice Otomatis', 'Platform Terpusat'],
        tryFreeButton: 'Coba Gratis Sekarang',
        consultButton: 'Konsultasi Gratis Sekarang',
        optimizeTitle: 'Siap Mengoptimalkan Manajemen Inventory Anda?',
        optimizeDescription: 'KelolaAja menyediakan sistem inventory dengan tracking real-time untuk mengelola produk dari pengadaan hingga pengiriman.',
      },
      about: {
        title: 'Apa Itu KelolaAja?',
        subtitle: 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia',
        description1: 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.',
        description2: 'KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.',
      },
    },
    featuresPage: {
      hero: {
        title: 'Fitur KelolaAja',
        subtitle: 'Solusi ERP lengkap untuk mengelola seluruh aspek bisnis Anda dalam satu platform terintegrasi',
      },
      features: [
        {
          title: 'Keuangan & Akuntansi',
          description: 'Buat laporan keuangan seperti laba rugi, neraca, dan arus kas secara real-time. Pemantauan buku besar, serta utang dan piutang, menjadi lebih sederhana. Dapatkan laporan kinerja perusahaan yang selalu terkini dan menyeluruh.',
          shortDesc: 'Sistem keuangan lengkap untuk arus kas, pembukuan, dan laporan',
        },
        {
          title: 'Manufaktur',
          description: 'KelolaAja proses manufaktur dengan mudah, hitung Harga Pokok Penjualan produk secara otomatis. Rencanakan produksi, Bill of Material, serta hitung biaya bahan baku dan overhead produksi pabrik secara otomatis dengan modul manufaktur.',
          shortDesc: 'Sistem manufaktur terintegrasi untuk produksi dan supply chain',
        },
        {
          title: 'Manajement Proyek',
          description: 'KelolaAja dirancang untuk semua jenis & skala bisnis. Sekalipun Anda tidak memahami secara mendalam, Anda akan dengan mudah beradaptasi dengan KelolaAja. Selain itu, tim kelolaAja akan selalu membantu sampai Anda bisa.',
          shortDesc: 'Kelola proyek, track progress, dan monitor timeline',
        },
        {
          title: 'Pembelian & Penjualan',
          description: 'Proses jual-beli yang lebih fleksibel, bisa pilih jual putus atau konsinyasi. Dilengkapi fitur DP dan diskon bertingkat. Pantau pengiriman barang, buat tagihan, hingga dengan mudah dalam satu software.',
          shortDesc: 'Proses pembelian dan penjualan dari quotation hingga invoice',
        },
        {
          title: 'Produk & Inventory',
          description: 'KelolaAja produk dan inventory dengan efisien, mulai dari pengadaan hingga pengiriman. Pantau stok secara real-time, atur harga, dan optimalkan alur distribusi menggunakan satu platform.',
          shortDesc: 'Manajemen inventory dengan tracking real-time',
        },
        {
          title: 'HR & Payroll',
          description: 'KelolaAja HR dan payroll dengan mudah, mulai dari pengelolaan data karyawan, absensi, hingga perhitungan gaji. Semua proses otomatis, akurat, dan dapat diakses kapan saja, memudahkan manajemen SDM di perusahaan Anda.',
          shortDesc: 'Kelola HR dan payroll dengan mudah dan otomatis',
        },
      ],
      cta: {
        title: 'Siap Mengoptimalkan Bisnis Anda?',
        description: 'Temukan solusi ERP yang tepat untuk kebutuhan bisnis Anda. Hubungi kami untuk konsultasi gratis.',
        buttonText: 'Konsultasi Gratis Sekarang',
      },
      about: {
        title: 'Apa Itu KelolaAja?',
        subtitle: 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia',
        description1: 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.',
        description2: 'KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.',
        buttonText: 'Coba Gratis Sekarang',
      },
      faq: {
        title: 'Pertanyaan Umum',
        subtitle: 'Temukan jawaban atas pertanyaan umum tentang KelolaAja',
        showAll: 'Lihat Semua FAQ',
        showLess: 'Tampilkan Lebih Sedikit',
        items: [
          {
            question: 'Apa itu KelolaAja?',
            answer: 'KelolaAja adalah software ERP terintegrasi yang dikembangkan khusus untuk menjawab kebutuhan small to growing businesses di Indonesia. Dirancang untuk menyederhanakan proses manajemen keuangan, pembukuan, pelaporan, hingga operasional bisnis lainnya secara menyeluruh, KelolaAja memungkinkan perusahaan untuk mengelola dan memantau aktivitas bisnis secara real-time, dari mana saja, dengan efisiensi tinggi dan akurasi yang konsisten.\n\nMeski dioptimalkan untuk bisnis yang sedang tumbuh, KelolaAja dibangun dengan standar dan kapabilitas enterprise-class. Ini memastikan bahwa perusahaan skala besar sekalipun tetap dapat mengandalkan KelolaAja dalam memenuhi kompleksitas kebutuhan internal mereka.',
          },
          {
            question: 'Apa yang membedakan KelolaAja dari software ERP lain di pasaran?',
            answer: 'KelolaAja menghadirkan keseimbangan antara kualitas sistem, kedalaman fitur, dan keterjangkauan biaya. Dibanding ERP lokal maupun global, KelolaAja menawarkan solusi yang komprehensif dan efisien secara biaya, tanpa mengorbankan fungsionalitas inti.',
          },
          {
            question: 'Apakah pengguna perlu memiliki pengalaman teknis untuk menggunakan KelolaAja?',
            answer: 'Tidak. KelolaAja dirancang dengan antarmuka yang intuitif dan alur kerja yang disederhanakan berdasarkan riset langsung terhadap kebutuhan pengguna bisnis di berbagai level. Sistem ini dapat digunakan tanpa pengalaman teknis sebelumnya.',
          },
          {
            question: 'Berapa lama proses implementasi KelolaAja?',
            answer: 'Proses implementasi KelolaAja umumnya memakan waktu antara 1 hingga 3 bulan, tergantung pada kompleksitas struktur bisnis, jumlah modul yang digunakan, dan kesiapan data internal perusahaan. Rentang waktu ini mencakup seluruh tahapan penting seperti analisis kebutuhan, konfigurasi sistem, migrasi data, pelatihan pengguna, hingga pendampingan saat go-live.',
          },
          {
            question: 'Apakah KelolaAja bisa disesuaikan dengan kebutuhan bisnis saya?',
            answer: 'KelolaAja telah dirancang untuk langsung mendukung proses bisnis umum tanpa perlu kustomisasi. Jika ada kebutuhan sangat spesifik, kustomisasi dimungkinkan dengan biaya tambahan sesuai kompleksitas. Namun, kami tidak merekomendasikan kustomisasi kecuali benar-benar diperlukan, agar sistem tetap efisien, stabil, dan scalable.',
          },
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
      learnMore: 'Pelajari Selengkapnya',
    },
    projectPage: {
      hero: {
        title: 'Manajemen Proyek',
        description: 'Kelola proyek, track progress, dan monitor timeline dengan mudah. Sistem manajemen proyek terintegrasi untuk memastikan setiap proyek berjalan sesuai rencana dan budget.',
        ctaButton: 'Hubungi Kami',
      },
      softwareFeatures: {
        title: 'Software dengan Fitur',
        subtitle: 'Manajemen Proyek dan Mudah Digunakan',
        description: 'KelolaAja dirancang khusus untuk kemudahan penggunaan, bahkan bagi mereka yang tidak memiliki latar belakang manajemen proyek. Interface yang intuitif dan user-friendly memastikan Anda dapat mengelola proyek bisnis dengan mudah dan efisien.',
      },
      mainTitle: 'Manajemen Proyek',
      mainDescription: 'Dapatkan kontrol penuh atas manajemen proyek Anda dengan sistem yang lengkap dan terintegrasi. Dari tracking progress hingga laporan proyek real-time, semua tersedia dalam satu platform.',
      features: [
        {
          title: 'KelolaAja Proyek Menjadi Simpel',
          description: 'Lihat profitabilitas setiap proyek dengan laporan budget dan realisasi anggaran. Pantau berapa pengeluaran, margin profit, dan budget tersisa setiap saat. Fitur approval bertingkat dan bisa disetting sesuai kebutuhan. Cek setiap pengeluaran lengkap dengan history.',
        },
        {
          title: 'Pantau Approval Secara Real Time',
          description: 'Manajemen berbagai proyek dalam satu waktu secara real time. Pantau dan beri approval untuk pembelian barang dari mana saja, pantau budget dan profitabilitas lewat laporan laba rugi per proyek dan pantau progres dengan Task Management Dashboard.',
        },
        {
          title: 'Laporan Keuangan Otomatis',
          description: 'Pantau berapa pengeluaran, margin profit, dan budget tersisa setiap saat. Fitur approval bertingkat dan bisa disetting sesuai kebutuhan. Cek setiap pengeluaran lengkap dengan history. Pengeluaran dan pemasukan di lapangan saat operasional berjalan dengan otomatis dan semua invoice dan payment terdokumentasi di satu modul. Laporan pengeluaran terintegrasi dengan modul keuangan dan akuntansi dan terdokumentasi lengkap untuk pembelian barang, penggunaan bahan baku.',
        },
        {
          title: 'Analisis Laba Rugi',
          description: 'Dapatkan gambaran kesehatan keuangan semua proyek dalam satu dashboard. Laporan Laba Rugi lengkap dengan visualisasi. Cari tahu keuntungan dari setiap jenis kategori proyek. Ketahui proyek-proyek dengan performa terbaik. Ekspor data ke format Excel, CSV dan PDF kapanpun dibutuhkan.',
        },
      ],
      cta: {
        mainText1: 'Lupakan pencatatan manual yang rumit. Dengan KelolaAja, laporan keuangan real-time, mulai dari transaksi hingga inventori, semuanya terpusat dalam satu platform yang praktis.',
        mainText2: 'Pantau arus kas, kirim invoice, dan KelolaAja pembelian dengan mudah, sehingga saat ini Anda bisa lebih fokus mengembangkan bisnis daripada mengurusi administrasi.',
        highlights: ['Laporan Real-Time', 'Pantau Arus Kas', 'Invoice Otomatis', 'Platform Terpusat'],
        tryFreeButton: 'Coba Gratis Sekarang',
        consultButton: 'Konsultasi Gratis Sekarang',
        optimizeTitle: 'Siap Mengoptimalkan Manajemen Proyek Anda?',
        optimizeDescription: 'KelolaAja menyediakan sistem manajemen proyek terintegrasi untuk track progress dan monitor timeline dengan mudah.',
      },
      about: {
        title: 'Apa Itu KelolaAja?',
        subtitle: 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia',
        description1: 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.',
        description2: 'KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.',
      },
    },
    salesPage: {
      hero: {
        title: 'Pembelian dan Penjualan',
        description: 'Proses pembelian dan penjualan dari quotation hingga invoice. Proses jual-beli yang lebih fleksibel, bisa pilih jual putus atau konsinyasi dengan fitur DP dan diskon bertingkat.',
        ctaButton: 'Hubungi Kami',
      },
      softwareFeatures: {
        title: 'Software dengan Fitur',
        subtitle: 'Pembelian dan Penjualan Mudah Digunakan',
        description: 'KelolaAja dirancang khusus untuk kemudahan penggunaan, bahkan bagi mereka yang tidak memiliki latar belakang penjualan. Interface yang intuitif dan user-friendly memastikan Anda dapat mengelola proses pembelian dan penjualan dengan mudah dan efisien.',
      },
      mainTitle: 'Pembelian dan Penjualan',
      mainDescription: 'Dapatkan kontrol penuh atas proses pembelian dan penjualan Anda dengan sistem yang lengkap dan terintegrasi. Dari quotation hingga invoice, semua tersedia dalam satu platform.',
      features: [
        {
          title: 'Catat Semua Detail Order',
          description: 'Lacak semua purchase order dan pembelian hingga ke semua detailnya, berapa harga yang disepakati dan semua dokumen pendukungnya.',
        },
        {
          title: 'Perhitungan Pajak Otomatis',
          description: 'Semua pajak pembelian akan terrekap menjadi laporan pajak secara otomatis. Kamu bisa mengkustomisasi apapun jenis pajak yang ingin terapkan di bisnismu, termasuk pajak pemotongan.',
        },
        {
          title: 'Stok dan Gudang Tercatat Otomatis',
          description: 'Stok produk akan tercatat secara otomatis di gudang yang kamu tentukan. Tak perlu lagi double input untuk urusan inventori!',
        },
        {
          title: 'Lampirkan Foto atau Scan Dokumen',
          description: 'Kurangi tumpukan kertas, lampirkan semua dokumen kertas mu ke purchase order dan fakturmu.',
        },
        {
          title: 'Dapatkan Informasi dan Statistik Pembelian',
          description: 'Ketahui dengan pasti apa saja barang penjualan terbaik, berapa hutang & piutang berapa, purchase order, dan kapan jatuh temponya.',
        },
        {
          title: 'Lakukan Pembayaran Bertahap',
          description: 'Kamu bisa membayar pembelian secara bertahap, dan sangat bisa mencatatnya dengan rapi dan benar.',
        },
        {
          title: 'Buat Faktur Pembelian dari Purchase Order dengan Sekali Klik',
          description: 'Saat sudah deal dengan vendor, kamu bisa membuat faktur pembelian dari purchase order hanya dengan satu klik.',
        },
      ],
      cta: {
        mainText1: 'Lupakan pencatatan manual yang rumit. Dengan KelolaAja, laporan keuangan real-time, mulai dari transaksi hingga inventori, semuanya terpusat dalam satu platform yang praktis.',
        mainText2: 'Pantau arus kas, kirim invoice, dan KelolaAja pembelian dengan mudah, sehingga saat ini Anda bisa lebih fokus mengembangkan bisnis daripada mengurusi administrasi.',
        highlights: ['Laporan Real-Time', 'Pantau Arus Kas', 'Invoice Otomatis', 'Platform Terpusat'],
        tryFreeButton: 'Coba Gratis Sekarang',
        consultButton: 'Konsultasi Gratis Sekarang',
        optimizeTitle: 'Siap Mengoptimalkan Proses Pembelian & Penjualan Anda?',
        optimizeDescription: 'KelolaAja menyediakan sistem pembelian dan penjualan terintegrasi dari quotation hingga invoice dengan mudah dan efisien.',
      },
      about: {
        title: 'Apa Itu KelolaAja?',
        subtitle: 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia',
        description1: 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.',
        description2: 'KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.',
      },
    },
    industriesPage: {
      hero: {
        badge: 'Solusi ERP untuk Semua Industri',
        title: 'Industri yang Kami Layani',
        subtitle: 'KelolaAja hadir dengan solusi ERP yang disesuaikan untuk berbagai industri. Dari restoran hingga manufaktur, kami membantu bisnis Anda tumbuh lebih efisien dan profesional.',
      },
      learnMore: 'Pelajari Selengkapnya',
    },
    industryPages: {
      fnb: {
        heroTitle: 'Food & Beverage',
        introText: 'Setiap aspek pengelolaan keuangan restoran Anda tercatat dan terpantau dengan akurat. Fokus pada menyajikan hidangan lezat, biarkan KelolaAja yang mengurus pembukuan dan laporan keuangan Anda secara otomatis dan efisien.',
        title: 'Masalah Bisnis Restoran dan Cafe Anda Kewalahan?',
        description: 'Setiap bahan baku dari menu yang Anda sajikan perlu dicatat dan dihitung dengan teliti untuk menjaga profitabilitas restoran. Namun, banyak pemilik restoran di Indonesia yang belum memiliki sistem akuntansi yang efektif.',
        problems: [
          {
            title: 'Pencatatan bahan baku tidak optimal',
            description: 'Manajemen bahan baku merupakan hal penting agar setiap menu yang Anda sajikan bisa terpenuhi sesuai dengan permintaan pelanggan di restoran Anda.',
          },
          {
            title: 'Sulit Melacak Laba Rugi per Cabang',
            description: 'Biaya impor dan biaya lainnya yang tidak tercatat dalam HPP dapat mengganggu akurasi laporan laba rugi, membuat analisis keuangan menjadi tidak lengkap dan membingungkan.',
          },
          {
            title: 'Laporan keuangan tidak sesuai standar',
            description: 'Laporan keuangan adalah kunci pengambilan keputusan yang tepat dalam bisnis apa pun. Sayangnya, banyak pemilik restoran yang masih mengabaikan pentingnya hal ini.',
          },
          {
            title: 'Harga Beli Barang Naik Turun',
            description: 'Fluktuasi HPP (COGS) yang tidak konsisten membuat perhitungan profit menjadi sulit dan tidak akurat.',
          },
          {
            title: 'Pemakaian Satu Jenis Stok dengan Unit Berbeda-beda',
            description: 'Penggunaan stok dengan berbagai unit untuk setiap menu membuat pencatatan stok menjadi lebih kompleks dan membingungkan.',
          },
          {
            title: 'Stock Opname',
            description: 'Proses stock opname yang masih dilakukan secara manual memakan waktu lama, menghambat efisiensi, dan meningkatkan potensi kesalahan dalam pencatatan stok.',
          },
        ],
        solutionsTitle: 'Bagaimana KelolaAja Membuat Bisnis Restoran Anda Menjadi Lebih Baik?',
        solutions: [
          {
            title: 'Mudah digunakan',
            description: 'Sekalipun Anda awam akuntansi, Anda akan mudah menggunakan KelolaAja. Jika merasa tetap kesulitan, kami menjanjikan training gratis.',
          },
          {
            title: 'Support Barcode Scanner',
            description: 'Tingkatkan kecepatan dalam proses pencatatan penjualan dan stok opname pada bisnis dengan bantuan barcode scanner yang juga didukung di sistem KelolaAja.',
          },
          {
            title: 'Real-time, di mana saja dan kapan saja',
            description: 'Tidak ada lagi pemborosan yang terjadi dalam usaha restoran Anda, karena Anda bisa dengan mudah memantau setiap pos pengeluaran dan mendapatkan laporan pengeluaran dengan detail.',
          },
          {
            title: 'Multi cabang & multi gudang',
            description: 'Pantau dan buat laporan keuangan dengan praktis dan buat keputusan bisnis lebih cepat dalam satu klik. Anda juga akan mendapatkan grafik dari operasional dalam bisnis dengan tampilan yang mudah dipahami.',
          },
          {
            title: 'KelolaAja Purchasing Anti Ribet',
            description: 'Dari pencatatan detail pembelian hingga pembuatan faktur otomatis, ditambah dengan akses mudah ke informasi dan statistik pembelian, KelolaAja menyederhanakan seluruh proses purchasing Anda dengan lebih efisien.',
          },
          {
            title: 'Laporan diakses hitungan detik',
            description: 'Pantau dan buat laporan keuangan dengan mudah, hanya dalam satu klik, untuk mengambil keputusan bisnis lebih cepat. Dapatkan juga grafik operasional bisnis yang jelas dan mudah dipahami, membantu Anda menganalisis kinerja secara efektif.',
          },
        ],
        cta: {
          title: 'Siap Mengatasi Masalah Bisnis Restoran Anda?',
          description: 'KelolaAja hadir dengan solusi lengkap untuk mengelola keuangan, inventory, dan operasional restoran Anda secara otomatis dan efisien.',
          buttonText: 'Konsultasi Gratis Sekarang',
        },
        about: {
          title: 'Apa Itu KelolaAja?',
          subtitle: 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia',
          description1: 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.',
          description2: 'KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.',
          buttonText: 'Coba Gratis Sekarang',
        },
        faq: [
          {
            question: 'Apakah KelolaAja cocok untuk bisnis F&B?',
            answer: 'Ya, KelolaAja memiliki fitur khusus untuk inventory bahan baku, resep, dan manajemen outlet yang sangat cocok untuk bisnis F&B.',
          }
        ],
      },
      manufacturing: {
        heroTitle: 'Manufaktur',
        introText: 'Setiap tahapan mulai dari perencanaan hingga penyelesaian produksi dapat dilakukan secara lebih efisien. Proses pengambilan keputusan menjadi lebih cepat, memungkinkan Anda untuk merespons tantangan dengan lebih sigap, sekaligus meningkatkan produktivitas dan kualitas di setiap langkah produksi bisnis Anda.',
        title: 'Ingin tahu bagaimana software KelolaAja bisa menyederhanakan seluruh proses bisnis manufaktur Anda?',
        description: 'Seringkali, volume produksi yang Anda jalankan tidak sebanding dengan margin keuntungan yang dihasilkan. Hal ini bisa terjadi jika sistem pengelolaan biaya dan pencatatan akuntansi di pabrik Anda kurang terstruktur atau tidak mengikuti standar yang tepat, mengakibatkan pemborosan dan inefisiensi dalam proses produksi.',
        problems: [
          {
            title: 'Proses konversi bahan baku menjadi produk akhir.',
            description: 'Proses produksi membutuhkan sistem pencatatan yang akurat untuk mengubah bahan baku menjadi produk jadi. Tanpa pencatatan dan perhitungan yang tepat, Anda akan kesulitan menghitung Harga Pokok Produksi (HPP) secara efektif.',
          },
          {
            title: 'Perhitungan penyusutan aset.',
            description: 'Bisnis manufaktur umumnya memiliki berbagai aset yang perlu dihitung penyusutannya dengan teliti, karena hal ini berdampak langsung pada akurasi laporan keuangan perusahaan.',
          },
          {
            title: 'Pengelolaan biaya overhead yang kompleks.',
            description: 'Biaya overhead pabrik dalam industri manufaktur memiliki dampak signifikan terhadap keputusan bisnis yang diambil pemilik perusahaan. Oleh karena itu, pencatatan biaya ini sangat krusial untuk memastikan keakuratan analisis dan pengambilan keputusan yang tepat.',
          },
        ],
        solutionsTitle: 'Bagaimana KelolaAja Mendukung Bisnis Manufaktur Anda?',
        solutions: [
          {
            title: 'KelolaAja aja multi proyek dengan satu Klik',
            description: 'Bisnis manufaktur membutuhkan pengelolaan proyek yang efisien. Dengan KelolaAja, Anda dapat dengan mudah mengelola banyak proyek sekaligus, memantau anggaran, dan menjadikan manajemen proyek Anda lebih terstruktur dan terorganisir.',
          },
          {
            title: 'Perhitungan aset tetap otomatis dan akurat',
            description: 'Berhenti menghitung nilai aset tetap secara manual. Dengan KelolaAja, penyusutan setiap aset dihitung otomatis dan jurnal penyesuaian tersedia setiap bulan tanpa perlu usaha tambahan.',
          },
          {
            title: 'Catat seluruh biaya operasional dengan mudah',
            description: 'Dengan KelolaAja, Anda dapat dengan mudah mencatat dan mengelola biaya kapan saja dan di mana saja, memastikan efisiensi yang lebih baik, mengurangi pemborosan, dan meningkatkan profitabilitas proyek Anda.',
          },
          {
            title: 'Real-time, di mana saja dan kapan saja',
            description: 'Tidak ada lagi pemborosan yang terjadi dalam usaha manufaktur Anda, karena Anda bisa dengan mudah memantau setiap pos pengeluaran dan mendapatkan laporan dengan detail.',
          },
          {
            title: 'KelolaAja Purchasing Anti Ribet',
            description: 'Dari pencatatan detail pembelian hingga pembuatan faktur otomatis, ditambah dengan akses mudah ke informasi dan statistik pembelian, KelolaAja menyederhanakan seluruh proses purchasing Anda dengan lebih efisien.',
          },
          {
            title: 'Laporan diakses hitungan detik',
            description: 'Pantau dan buat laporan keuangan dengan mudah, hanya dalam satu klik, untuk mengambil keputusan bisnis lebih cepat. Dapatkan juga grafik operasional bisnis yang jelas dan mudah dipahami, membantu Anda menganalisis kinerja secara efektif.',
          },
        ],
        cta: {
          title: 'Siap Mengatasi Masalah Bisnis Manufaktur Anda?',
          description: 'KelolaAja hadir dengan solusi lengkap untuk mengelola keuangan, inventory, dan operasional bisnis manufaktur Anda secara otomatis dan efisien.',
          buttonText: 'Konsultasi Gratis Sekarang',
        },
        about: {
          title: 'Apa Itu KelolaAja?',
          subtitle: 'Software ERP Akuntansi Terdepan untuk Bisnis Indonesia',
          description1: 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.',
          description2: 'KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.',
          buttonText: 'Coba Gratis Sekarang',
        },
        faq: [
          {
            question: 'Apakah KelolaAja bisa menghitung HPP Produksi?',
            answer: 'Tentu, KelolaAja dapat menghitung HPP secara otomatis berdasarkan biaya bahan baku, biaya tenaga kerja, dan overhead pabrik.',
          }
        ],
      },
      contractor: {
        heroTitle: 'Kontraktor',
        introText: 'KelolaAja setiap proyek dengan lebih efisien dan optimalkan keuntungan bisnis Anda menggunakan software ERP KelolaAja. Dirancang khusus untuk memenuhi kebutuhan semua jenis usaha kontraktor di Indonesia, KelolaAja memudahkan pengelolaan keuangan dan operasional Proyek Anda.',
        title: 'Apakah Masalah Ini Sering Menghambat Bisnis Kontraktor Anda?',
        description: 'Seringkali, jumlah proyek yang Anda tangani tidak berbanding lurus dengan keuntungan yang diperoleh. Ini terutama terjadi jika sistem pencatatan akuntansi untuk kontraktor Anda tidak terstruktur dengan baik atau tidak sesuai dengan standar yang seharusnya.',
        problems: [
          {
            title: 'Kesalahan penghitungan aset tetap dapat merusak akurasi.',
            description: 'Dalam bisnis konstruksi, terdapat banyak aset tetap yang harus di KelolaAja. Jika penyusutan dari setiap aset ini tidak dihitung dengan tepat, data keuangan Anda akan menjadi tidak akurat dan mengganggu perencanaan serta pengambilan keputusan bisnis.',
          },
          {
            title: 'Biaya operasional dapat mengganggu kesehatan keuangan bisnis.',
            description: 'Biaya operasional dalam bisnis kontraktor merupakan pengeluaran penting yang perlu Anda pantau dengan cermat, karena dapat langsung mempengaruhi keuntungan perusahaan.',
          },
          {
            title: 'Kesulitan menghitung laba per proyek menghambat analisis keuangan.',
            description: 'Apakah Anda yakin setiap proyek yang Anda KelolaAja menguntungkan? Tanpa data keuangan yang akurat, bisnis Anda berjalan hanya berdasarkan perkiraan.',
          },
        ],
        solutionsTitle: 'Bagaimana KelolaAja Mendukung Bisnis Kontraktor Anda?',
        solutions: [
          {
            title: 'KelolaAja aja multi proyek dengan satu Klik',
            description: 'Bisnis kontraktor membutuhkan pengelolaan proyek yang efisien. Dengan KelolaAja, Anda dapat dengan mudah mengelola banyak proyek sekaligus, memantau anggaran, dan menjadikan manajemen proyek Anda lebih terstruktur dan terorganisir.',
          },
          {
            title: 'Perhitungan aset tetap otomatis dan akurat',
            description: 'Berhenti menghitung nilai aset tetap secara manual. Dengan KelolaAja, penyusutan setiap aset dihitung otomatis dan jurnal penyesuaian tersedia setiap bulan tanpa perlu usaha tambahan.',
          },
          {
            title: 'Catat seluruh biaya operasional dengan mudah',
            description: 'Dengan KelolaAja, Anda dapat dengan mudah mencatat dan mengelola biaya kapan saja dan di mana saja, memastikan efisiensi yang lebih baik, mengurangi pemborosan, dan meningkatkan profitabilitas proyek Anda.',
          },
          {
            title: 'Real-time, di mana saja dan kapan saja',
            description: 'Tidak ada lagi pemborosan yang terjadi dalam usaha kontraktor Anda, karena Anda bisa dengan mudah memantau setiap pos pengeluaran dan mendapatkan laporan dengan detail.',
          },
        ],
        cta: {
          title: 'Siap Mengatasi Masalah Bisnis Kontraktor Anda?',
          description: 'KelolaAja hadir dengan solusi lengkap untuk mengelola keuangan, inventory, dan operasional bisnis kontraktor Anda secara otomatis dan efisien.',
          buttonText: 'Konsultasi Gratis Sekarang',
        },
        about: {
          title: 'Apa Itu KelolaAja?',
          description1: 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri.',
          description2: 'Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia. KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.',
          buttonText: 'Coba Gratis Sekarang',
        },
        faq: [
          {
            question: 'Apakah saya bisa mencoba gratis?',
            answer: 'Tentu saja! Kami menyediakan masa percobaan gratis agar Anda dapat mengeksplorasi fitur-fitur unggulan kami sebelum berlangganan.'
          },
          {
            question: 'Apakah data saya aman?',
            answer: 'Keamanan data Anda adalah prioritas kami. KelolaAja menggunakan enkripsi tingkat tinggi untuk memastikan data bisnis Anda tetap aman dan rahasia.'
          },
          {
            question: 'Bagaimana jika saya butuh bantuan?',
            answer: 'Tim support kami siap membantu Anda kapan saja melalui live chat, email, atau WhatsApp untuk memastikan bisnis Anda berjalan lancar.'
          }
        ]
      },
      retail: {
        heroTitle: 'Retail',
        introText: 'Optimalkan setiap aspek operasional ritel Anda. Dari manajemen stok hingga laporan penjualan, ambil keputusan lebih cepat dan tingkatkan keuntungan bisnis Anda.',
        title: 'Masalah Bisnis Retail Anda Kewalahan?',
        description: 'Akuntansi merupakan bagian yang vital bagi kelangsungan bisnis ritel Anda. Tanpa pencatatan yang tepat, Anda akan kesulitan untuk mengevaluasi kemajuan dan mengambil keputusan yang mendukung pertumbuhan bisnis secara maksimal.',
        problems: [
          {
            title: 'Manajemen stok berantakan',
            description: 'Banyak bisnis ritel yang belum memiliki sistem pengelolaan stok yang terstandarisasi, sehingga berisiko menghadapi masalah seperti produk yang tidak terjual, menumpuk di gudang, atau bahkan kedaluwarsa. Tanpa sistem yang tepat, stok bisa tidak terkontrol, merugikan bisnis, dan mengurangi keuntungan yang seharusnya dapat diperoleh.',
          },
          {
            title: 'Pencatatan manual yang memakan waktu',
            description: 'Pencatatan manual yang kompleks memakan banyak waktu berharga tim keuangan, dan kesalahan dalam pencatatan dapat berisiko menyebabkan kerugian yang tidak diinginkan bagi perusahaan.',
          },
          {
            title: 'Informasi keuangan tidak transparan',
            description: 'Banyak pemilik bisnis ritel menghadapi kesulitan dalam membuat keputusan strategis karena kurangnya akses ke data keuangan yang akurat dan mendetail.',
          },
        ],
        solutionsTitle: 'Bagaimana KelolaAja Membuat Bisnis Retail Anda Menjadi Lebih Baik?',
        solutions: [
          {
            title: 'Mudah digunakan',
            description: 'Sekalipun Anda awam akuntansi, Anda akan mudah menggunakan KelolaAja. Jika merasa tetap kesulitan, kami menjanjikan training gratis.',
          },
          {
            title: 'Laporan diakses hitungan detik',
            description: 'Pantau dan buat laporan keuangan dengan mudah, hanya dalam satu klik, untuk mengambil keputusan bisnis lebih cepat. Dapatkan juga grafik operasional bisnis yang jelas dan mudah dipahami, membantu Anda menganalisis kinerja secara efektif.',
          },
          {
            title: 'Real-time, di mana saja dan kapan saja',
            description: 'Tidak ada lagi pemborosan yang terjadi dalam usaha retail Anda, karena Anda bisa dengan mudah memantau setiap pos pengeluaran dan mendapatkan laporan pengeluaran dengan detail.',
          },
          {
            title: 'Multi cabang & multi gudang',
            description: 'Pantau dan buat laporan keuangan dengan praktis dan buat keputusan bisnis lebih cepat dalam satu klik. Anda juga akan mendapatkan grafik dari operasional dalam bisnis dengan tampilan yang mudah dipahami.',
          },
          {
            title: 'Support Barcode Scanner',
            description: 'Tingkatkan kecepatan dalam proses pencatatan penjualan dan stok opname pada bisnis dengan bantuan barcode scanner yang juga didukung di sistem KelolaAja.',
          },
          {
            title: 'KelolaAja Purchasing Anti Ribet',
            description: 'Dari pencatatan detail pembelian hingga pembuatan faktur otomatis, ditambah dengan akses mudah ke informasi dan statistik pembelian, KelolaAja menyederhanakan seluruh proses purchasing Anda dengan lebih efisien.',
          },
        ],
        cta: {
          title: 'Siap Mengatasi Masalah Bisnis Retail Anda?',
          description: 'KelolaAja hadir dengan solusi lengkap untuk mengelola keuangan, inventory, dan operasional bisnis retail Anda secara otomatis dan efisien.',
          buttonText: 'Konsultasi Gratis Sekarang',
        },
        about: {
          title: 'Apa Itu KelolaAja?',
          description1: 'KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri.',
          description2: 'Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia. KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.',
          buttonText: 'Coba Gratis Sekarang',
        },
        faq: [
          {
            question: 'Apakah saya bisa mencoba gratis?',
            answer: 'Tentu saja! Kami menyediakan masa percobaan gratis agar Anda dapat mengeksplorasi fitur-fitur unggulan kami sebelum berlangganan.'
          },
          {
            question: 'Apakah data saya aman?',
            answer: 'Keamanan data Anda adalah prioritas kami. KelolaAja menggunakan enkripsi tingkat tinggi untuk memastikan data bisnis Anda tetap aman dan rahasia.'
          },
          {
            question: 'Bagaimana jika saya butuh bantuan?',
            answer: 'Tim support kami siap membantu Anda kapan saja melalui live chat, email, atau WhatsApp untuk memastikan bisnis Anda berjalan lancar.'
          }
        ]
      },
    },
    companyProfile: {
      hero: {
        badge: 'Tentang Kami',
        title: 'Profil',
        titleHighlight: 'Perusahaan',
      },
      about: {
        title: 'Sekilas Tentang Kami',
        description1: 'KelolaAja merupakan langkah transformasi digital Dawang Group dalam menghadirkan solusi teknologi untuk dunia usaha. Sejak 1999, Dawang Group telah berkiprah selama lebih dari 26 tahun sebagai pemain utama di industri telekomunikasi nasional.',
        description2: 'Memasuki 2024, Dawang Group melalui entitas PT Tiga Inspirasi Bersama memulai pengembangan KelolaAja, sebuah software ERP terintegrasi yang dirancang untuk menjawab kebutuhan bisnis modern. Diluncurkan secara resmi pada akhir tahun 2025, KelolaAja hadir sebagai solusi lokal yang menjembatani kesenjangan antara sistem ERP konvensional yang terlalu kompleks dan mahal, serta kebutuhan bisnis yang menuntut kecepatan, kesederhanaan, dan kepatuhan terhadap regulasi nasional.',
        description3: 'Inisiatif ini menjadi bagian dari komitmen kami untuk terus berinovasi dan menciptakan nilai tambah bagi ekosistem usaha di Indonesia melalui solusi digital yang relevan, scalable, dan terjangkau. Dengan KelolaAja, Dawang Group tidak hanya berekspansi ke sektor teknologi digital, tetapi juga menetapkan fondasi jangka panjang untuk menjadi pemain utama dalam digitalisasi operasional bisnis di Indonesia.',
      },
      vision: {
        badge: 'VISI KAMI',
        title: 'VISI',
        description: 'Terwujudnya keberkahan dan kesejahteraan pada umat manusia melalui solusi digital',
      },
      mission: {
        badge: 'MISI KAMI',
        title: 'MISI',
        items: [
          'Menyediakan solusi digital yang memudahkan pengelolaan bisnis',
          'Membantu usaha tumbuh dengan produktif, efisien, dan berkelanjutan',
          'Menghadirkan teknologi yang terjangkau untuk semua skala usaha',
          'Menjaga nilai keberkahan dalam setiap inovasi dan layanan',
        ],
      },
      agileValues: {
        badge: 'Core Values',
        title: 'AGILE',
        subtitle: '(Lincah; Tangkas; Gesit; Cekatan)',
        values: {
          A: {
            title: 'Add Value',
            subtitle: 'Menciptakan Nilai Tambah',
            description: 'Kami selalu memberikan nilai tambah bagi para mitra bisnis, lingkungan sekitar dan masyarakat',
          },
          G: {
            title: 'Grateful & Prosperous',
            subtitle: 'Bersyukur & Sejahtera',
            description: 'Kami selalu bersyukur atas segala hal yang kami terima, Segala usaha kami lakukan untuk menciptakan berbagai keberlimpahan dan kesejahteraan yang seimbang antara materi, kemampuan, etika, dan spiritual',
          },
          I: {
            title: 'Integrity & Commitment',
            subtitle: 'Amanah & Berkomitmen',
            description: 'Kami adalah pribadi-pribadi yang amanah, bertanggung jawab dan berdisiplin tinggi. Kami selalu siap memberikan komitmen dan hasil yang terbaik',
          },
          L: {
            title: 'Learn, Growth & Fun',
            subtitle: 'Senantiasa Belajar, Mengembangkan Diri & Menuntaskan Tugas dengan Riang Gembira',
            description: 'Segala kejadian yang kami alami adalah pelajaran bagi kami untuk menjadi pribadi yang senantiasa melakukan perbaikan',
          },
          E: {
            title: 'Enthusiast & High Performance',
            subtitle: 'Bersemangat & Kinerja Tinggi',
            description: 'Kami selalu bersemangat dan aktif memancarkan energi positif dalam setiap kesempatan. Meraih hasil yang telah direncanakan dengan efektivitas dan efisiensi tinggi',
          },
        },
      },
      coreValues: {
        badge: 'Our Philosophy',
        title: 'IMPACT',
        impact: 'IMPACT',
        fromImpact: 'dari Impact',
        values: {
          I: {
            title: 'Innovation',
            subtitle: 'Inovasi Berkelanjutan',
            description: 'Kami terus mengembangkan KelolaAja agar selalu relevan, modern, dan mampu menjawab kebutuhan bisnis yang terus berubah. Setiap pembaruan dilakukan untuk meningkatkan efektivitas dan menyederhanakan operasional.',
          },
          M: {
            title: 'Measurable Value',
            subtitle: 'Nilai yang Dapat Diukur',
            description: 'Setiap fitur yang kami bangun harus memberikan dampak nyata bagi pengguna. Kami fokus pada hasil yang terukur, bukan hanya tampilan atau fitur yang tidak memberikan manfaat langsung.',
          },
          P: {
            title: 'Practical & Simple',
            subtitle: 'Praktis dan Sederhana',
            description: 'KelolaAja dirancang agar mudah digunakan oleh siapa pun, tanpa perlu pengalaman teknis ERP. Kami menyederhanakan proses yang kompleks agar bisnis dapat berjalan lebih cepat dan efisien.',
          },
          A: {
            title: 'Accountability & Accuracy',
            subtitle: 'Akuntabilitas dan Akurasi Data',
            description: 'Kami menjaga integritas data sebagai prioritas utama. Setiap proses dalam KelolaAja dibangun untuk menjaga kejujuran, ketepatan, dan transparansi data karena keputusan bisnis yang baik selalu dimulai dari informasi yang benar.',
          },
          C: {
            title: 'Customer-Centric',
            subtitle: 'Berfokus pada Pengguna',
            description: 'Seluruh pengembangan KelolaAja didesain berdasarkan kebutuhan nyata bisnis di Indonesia. Kami menyediakan pendampingan penuh mulai dari implementasi hingga monitoring, memastikan setiap pengguna memperoleh hasil terbaik dari sistem.',
          },
          T: {
            title: 'Trust & Security',
            subtitle: 'Kepercayaan dan Keamanan',
            description: 'Kami membangun KelolaAja dengan standar keamanan modern untuk melindungi data pengguna. Keandalan sistem menjadi komitmen kami agar bisnis dapat berjalan tanpa gangguan.',
          },
        },
      },
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
    comingSoon: {
      title: 'Coming Soon',
      message: 'The HR & Payroll module is currently under development. Stay tuned for future updates on our comprehensive HR management features.',
      close: 'Close'
    },
    navDropdown: {
      features: {
        finance: 'Finance & Accounting',
        project: 'Project Management',
        manufacturing: 'Manufacturing Features',
        sales: 'Purchasing & Sales',
        inventory: 'Products & Inventory',
        hr: 'HR & Payroll',
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
        sales: {
          title: 'Sales',
          description: 'Manage the entire sales process in an integrated manner, from quotations, customer orders, delivery, to invoicing and payment receipt. With clear flow and neatly recorded data, KelolaAja helps improve sales control, speed up billing cycles, and ensure every transaction is accurately recorded and easy to monitor.',
        },
        multiWarehouse: {
          title: 'Multi Warehouse',
          description: 'Manage stock and goods movement across various warehouse locations centrally and in real-time. KelolaAja helps ensure more accurate stock control, minimize inventory discrepancies, and support more efficient distribution operations in each warehouse.',
        },
        darkMode: {
          title: 'Dark Mode',
          description: 'Enjoy a more comfortable interface display for long-term use, especially when working at night or in low-light environments.',
        },
        multiExportInvoice: {
          title: 'Multi Export Invoice',
          description: 'Export sales invoices to various formats according to business needs, such as A4 PDF, receipts, or thermal format. KelolaAja makes it easy to customize billing documents for administrative needs, printing, and sending to customers, without complicated additional processes.',
        },
        documentApproval: {
          title: 'Document Approval',
          description: 'Manage document approval processes in a controlled manner before transactions are processed further. KelolaAja helps ensure every invoice and important document has gone through the appropriate verification stages, reducing the risk of errors, and maintaining compliance and data accuracy in business operations.',
        },
        purchasePriceMovement: {
          title: 'Purchase Price Movement',
          description: 'Monitor the history and changes in purchase prices of goods in detail based on transactions, time, and document type. KelolaAja helps provide full visibility into purchasing price trends, so businesses can make more appropriate purchasing decisions, control costs, and maintain margin consistency.',
        },
        stockMovementRealtime: {
          title: 'Stock Movement Real Time',
          description: 'Monitor every stock movement in and out in real-time based on transactions, warehouses, and specific periods. KelolaAja provides full visibility over inventory balances, helps prevent stock discrepancies, and ensures faster and more accurate operational decision-making.',
        },
        stockRealtime: {
          title: 'Stock Real Time',
          description: 'Monitor stock availability in real-time in every warehouse and goods category. KelolaAja helps ensure inventory information is always accurate, facilitates operational planning, and prevents stock shortages or excess that can disrupt business smoothness.',
        },
        stockTransfer: {
          title: 'Stock Transfer',
          description: 'Manage stock transfers between warehouses in a controlled and documented manner. KelolaAja ensures every goods transfer is clearly recorded, maintains inventory balance accuracy at each location, and supports smooth distribution without the risk of stock discrepancies.',
        },
        vendorPayables: {
          title: 'Vendor Payables',
          description: 'Monitor and manage payment obligations to vendors in a structured and transparent manner. KelolaAja helps monitor due dates, aging of payables, and payment status of each transaction, so cash flow is more controlled and the risk of late payment can be minimized.',
        },
        customerReceivables: {
          title: 'Customer Receivables',
          description: 'Manage customer receivables in a structured and real-time manner. KelolaAja helps monitor due dates, aging of receivables, and payment status of each sales transaction, so cash flow is better maintained and the risk of bad debts can be minimized.',
        },
        authorizationGroup: {
          title: 'Authorization Group',
          description: 'Set user access rights and authorities according to their respective roles and responsibilities. KelolaAja helps ensure every transaction and feature can only be accessed by authorized parties, so internal control is better maintained, the risk of errors is reduced, and operational security remains guaranteed.',
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
      title: 'Manage Your Business Finances Easily!!!',
      tryFree: 'Try For Free Now',
      scheduleDemo: 'Schedule Demo',
    },
    aboutKelolaAja: {
      title: 'What is KelolaAja?',
      subtitle: '',
      description: 'KelolaAja is an integrated ERP software developed specifically to meet the needs of small to growing businesses in Indonesia. Designed to simplify financial management, bookkeeping, reporting, and other business operations comprehensively, KelolaAja enables companies to manage and monitor business activities in real-time, from anywhere, with high efficiency and consistent accuracy.',
      highlight: 'Although optimized for growing businesses, KelolaAja is built with enterprise-class standards and capabilities. This ensures that even large-scale companies can rely on KelolaAja to meet their internal complexity needs.',
      question: 'Have questions?',
      contactVia: 'Contact us via WhatsApp',
      ctaText: 'Try Free Now',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about KelolaAja',
      showAll: 'Show All FAQs',
      showLess: 'Show Less',
      items: [
        {
          question: 'What distinguishes KelolaAja from other ERP software in the market?',
          answer: 'KelolaAja brings a balance between system quality, feature depth, and cost affordability. Compared to local or global ERPs, KelolaAja offers comprehensive and cost-efficient solutions without sacrificing core functionality.',
        },
        {
          question: 'Do users need technical experience to use KelolaAja?',
          answer: 'No. KelolaAja is designed with an intuitive interface and simplified workflow based on direct research on business user needs at various levels. This system can be used without prior technical experience.',
        },
        {
          question: 'How long does the KelolaAja implementation process take?',
          answer: 'The KelolaAja implementation process generally takes between 1 to 3 months, depending on business structure complexity, number of modules used, and internal company data readiness. This timeframe covers all important stages such as needs analysis, system configuration, data migration, user training, to support during go-live.',
        },
        {
          question: 'Can KelolaAja be customized to my business needs?',
          answer: 'KelolaAja has been designed to directly support common business processes without the need for customization. If there are very specific needs, customization is possible at an additional cost according to complexity. However, we do not recommend customization unless absolutely necessary, to keep the system efficient, stable, and scalable.',
        },
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
        image: '/images/common/ayu.png',
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
      errors: {
        fullNameRequired: 'Full name is required',
        companyNameRequired: 'Company name is required',
        demoDateRequired: 'Demo date is required',
        demoSessionRequired: 'Demo session is required',
        companyEmailRequired: 'Company email is required',
        companyEmailInvalid: 'Invalid email format',
        companyPhoneRequired: 'Company phone is required',
        messageRequired: 'Message is required',
      },
      notes: [
        'Please complete your personal data correctly to facilitate communication and confirmation with the KelolaAja team',
        'After you schedule a demo session and free consultation, we will immediately confirm via WhatsApp or email.',
        'Make sure you choose a suitable time so that the demo session runs smoothly and you can get the necessary information.',
        'You can follow the demo or consultation session via smartphone, laptop, or PC, make sure your internet connection is stable.',
      ],
    },
    financePage: {
      hero: {
        title: 'Finance and Accounting',
        description: 'Complete financial system for cash flow, bookkeeping, and reports. KelolaAja provides integrated solutions to manage all aspects of your business finances easily and efficiently.',
        ctaButton: 'Contact Us',
      },
      softwareFeatures: {
        title: 'Software with Features',
        subtitle: 'Bookkeeping Made Easy',
        description: 'KelolaAja is specifically designed for ease of use, even for those without an accounting background. The intuitive and user-friendly interface ensures you can manage business bookkeeping easily and efficiently.',
      },
      mainTitle: 'Finance and Accounting',
      mainDescription: 'Get full control over your business finances with a complete and integrated accounting system. From transaction recording to real-time financial reports, everything is available in one platform.',
      features: [
        {
          title: 'Easy for Beginners',
          description: 'KelolaAja is designed for all types & scales of businesses. Even if you don\'t understand it deeply, you will easily adapt to KelolaAja. In addition, the KelolaAja team will always help until you can.',
        },
        {
          title: 'Easier Data Recording',
          description: 'All business flows become easier to monitor. From purchasing processes, sales, accounts payable and receivable, to asset depreciation calculations can be done easily in KelolaAja.',
        },
        {
          title: 'Consolidation Reporting',
          description: 'Have many businesses but want financial data in 1 centralized database? With KelolaAja you can! The consolidation feature will automatically compile reports from each company into one consolidated report.',
        },
        {
          title: 'Real-time Reports',
          description: 'With KelolaAja you will get more than 35 financial reports that you can generate instantly in 1 click. Now there is no more financial information that you miss and makes it easier for you to make better decisions.',
        },
      ],
      cta: {
        mainText1: 'Forget complicated manual recording. With KelolaAja, real-time financial reports, from transactions to inventory, everything is centralized in one practical platform.',
        mainText2: 'Monitor cash flow, send invoices, and manage purchases easily, so now you can focus more on growing your business than dealing with administration.',
        highlights: ['Real-Time Reports', 'Monitor Cash Flow', 'Automatic Invoices', 'Centralized Platform'],
        tryFreeButton: 'Try Free Now',
        consultButton: 'Free Consultation Now',
        optimizeTitle: 'Ready to Optimize Your Business Finances?',
        optimizeDescription: 'KelolaAja provides a complete financial system to manage cash flow, bookkeeping, and reports easily and efficiently.',
      },
      about: {
        title: 'What is KelolaAja?',
        subtitle: 'Leading ERP Accounting Software for Indonesian Businesses',
        description1: 'KelolaAja ERP Accounting software, founded in 2024 to answer the challenges of companies in managing management systems efficiently. With KelolaAja business software solutions present to meet the needs of various industries. Specifically designed for ease of use and adapted to the needs of Indonesian companies.',
        description2: 'KelolaAja is the first ERP software that offers the advantage of financial report assistance up to tax reports.',
      },
    },
    manufacturingPage: {
      hero: {
        title: 'Manufacturing Features',
        description: 'Integrated manufacturing system for production and supply chain. Manage manufacturing processes easily, calculate Cost of Goods Sold automatically and optimize production efficiency.',
        ctaButton: 'Contact Us',
      },
      softwareFeatures: {
        title: 'Software with Features',
        subtitle: 'Manufacturing Made Easy',
        description: 'KelolaAja is specifically designed for ease of use, even for those without a manufacturing background. The intuitive and user-friendly interface ensures you can manage manufacturing processes easily and efficiently.',
      },
      mainTitle: 'Manufacturing Features',
      mainDescription: 'Get full control over your manufacturing process with a complete and integrated system. From production planning to real-time manufacturing reports, everything is available in one platform.',
      features: [
        {
          title: 'Simplify Project Management',
          description: 'View the profitability of each project with budget reports and budget realization. Monitor expenses, profit margins, and remaining budget at any time. Multi-level approval features can be set according to needs. Check each expense complete with history.',
        },
        {
          title: 'Monitor Approvals in Real Time',
          description: 'Manage multiple projects at once in real time. Monitor and approve purchases from anywhere, monitor budget and profitability through profit and loss reports per project and monitor progress with the Task Management Dashboard.',
        },
        {
          title: 'Automatic Financial Reports',
          description: 'Monitor expenses, profit margins, and remaining budget at any time. Multi-level approval features can be set according to needs. Check each expense complete with history. Expenses and income in the field during operations run automatically and all invoices and payments are documented in one module. Expense reports are integrated with the financial and accounting module and fully documented for goods purchases, raw material usage.',
        },
        {
          title: 'Profit and Loss Analysis',
          description: 'Get an overview of the financial health of all projects in one dashboard. Complete Profit and Loss reports with visualization. Find out the profit from each type of project category. Know the projects with the best performance. Export data to Excel, CSV and PDF formats whenever needed.',
        },
      ],
      cta: {
        mainText1: 'Forget complicated manual recording. With KelolaAja, real-time financial reports, from transactions to inventory, everything is centralized in one practical platform.',
        mainText2: 'Monitor cash flow, send invoices, and manage purchases easily, so now you can focus more on growing your business than dealing with administration.',
        highlights: ['Real-Time Reports', 'Monitor Cash Flow', 'Automatic Invoices', 'Centralized Platform'],
        tryFreeButton: 'Try Free Now',
        consultButton: 'Free Consultation Now',
        optimizeTitle: 'Ready to Optimize Your Manufacturing Process?',
        optimizeDescription: 'KelolaAja provides an integrated manufacturing system for production and supply chain easily and efficiently.',
      },
      about: {
        title: 'What is KelolaAja?',
        subtitle: 'Leading ERP Accounting Software for Indonesian Businesses',
        description1: 'KelolaAja ERP Accounting software, founded in 2024 to answer the challenges of companies in managing management systems efficiently. With KelolaAja business software solutions present to meet the needs of various industries. Specifically designed for ease of use and adapted to the needs of Indonesian companies.',
        description2: 'KelolaAja is the first ERP software that offers the advantage of financial report assistance up to tax reports.',
      },
    },
    inventoryPage: {
      hero: {
        title: 'Products and Inventory',
        description: 'Inventory management with real-time tracking. Manage products and inventory efficiently, from procurement to delivery with optimized distribution flow.',
        ctaButton: 'Contact Us',
      },
      softwareFeatures: {
        title: 'Software with Features',
        subtitle: 'Products and Inventory Made Easy',
        description: 'KelolaAja is specifically designed for ease of use, even for those without an inventory background. The intuitive and user-friendly interface ensures you can manage products and inventory easily and efficiently.',
      },
      mainTitle: 'Products and Inventory',
      mainDescription: 'Get full control over your inventory management with a complete and integrated system. From stock tracking to real-time inventory reports, everything is available in one platform.',
      features: [
        {
          title: 'Track Best-Selling Products',
          description: 'Get real-time updates on best-selling product reports, total profit generated, and out-of-stock products. Use this data to make better decisions in reordering and setting your product prices.',
        },
        {
          title: 'Import from Excel',
          description: 'No need to bother entering product and stock data manually, just type in Excel and upload. All information will be automatically integrated into the KelolaAja system.',
        },
        {
          title: 'Multi Warehouse',
          description: 'Manage your product stock in many places easily and monitor stock per warehouse in real-time.',
        },
        {
          title: 'Real-time Reports',
          description: 'Access detailed and real-time stock reports in each warehouse, without having to wait until the end of the month. Monitor stock movements directly and ensure goods are always monitored properly.',
        },
        {
          title: 'Stock Opname',
          description: 'Stock opname process becomes more practical! Download the latest stock report in Excel format, update the stock quantity, and upload directly to KelolaAja. Fast and easy!',
        },
        {
          title: 'Warehouse Transfer',
          description: 'Move goods between warehouses simply. Enjoy neat and orderly stock recording without hassle.',
        },
        {
          title: 'Monitor Anytime and Anywhere',
          description: 'Monitor stock anytime, without having to go to the office or warehouse. Just open the report from your phone or laptop, wherever you are.',
        },
      ],
      cta: {
        mainText1: 'Forget complicated manual recording. With KelolaAja, real-time financial reports, from transactions to inventory, everything is centralized in one practical platform.',
        mainText2: 'Monitor cash flow, send invoices, and manage purchases easily, so now you can focus more on growing your business than dealing with administration.',
        highlights: ['Real-Time Reports', 'Monitor Cash Flow', 'Automatic Invoices', 'Centralized Platform'],
        tryFreeButton: 'Try Free Now',
        consultButton: 'Free Consultation Now',
        optimizeTitle: 'Ready to Optimize Your Inventory Management?',
        optimizeDescription: 'KelolaAja provides an inventory system with real-time tracking to manage products from procurement to delivery.',
      },
      about: {
        title: 'What is KelolaAja?',
        subtitle: 'Leading ERP Accounting Software for Indonesian Businesses',
        description1: 'KelolaAja ERP Accounting software, founded in 2024 to answer the challenges of companies in managing management systems efficiently. With KelolaAja business software solutions present to meet the needs of various industries. Specifically designed for ease of use and adapted to the needs of Indonesian companies.',
        description2: 'KelolaAja is the first ERP software that offers the advantage of financial report assistance up to tax reports.',
      },
    },
    featuresPage: {
      hero: {
        title: 'KelolaAja Features',
        subtitle: 'Complete ERP solution to manage all aspects of your business in one integrated platform',
      },
      features: [
        {
          title: 'Finance & Accounting',
          description: 'Create financial reports such as profit and loss, balance sheet, and cash flow in real-time. Monitoring general ledger, as well as receivables and payables, becomes simpler. Get up-to-date and comprehensive company performance reports.',
          shortDesc: 'Complete financial system for cash flow, bookkeeping, and reports',
        },
        {
          title: 'Manufacturing',
          description: 'Manage the manufacturing process easily, automatically calculate the Cost of Goods Sold for products. Plan production, Bill of Material, and automatically calculate raw material costs and factory production overhead with the manufacturing module.',
          shortDesc: 'Integrated manufacturing system for production and supply chain',
        },
        {
          title: 'Project Management',
          description: 'KelolaAja is designed for all types & scales of business. Even if you do not understand in depth, you will easily adapt to KelolaAja. In addition, the KelolaAja team will always help until you can.',
          shortDesc: 'Manage projects, track progress, and monitor timeline',
        },
        {
          title: 'Purchasing & Sales',
          description: 'More flexible buying and selling processes, you can choose cash sales or consignment. Equipped with DP features and tiered discounts. Monitor goods delivery, create invoices, all easily in one software.',
          shortDesc: 'Purchase and sales process from quotation to invoice',
        },
        {
          title: 'Products & Inventory',
          description: 'Manage products and inventory efficiently, from procurement to delivery. Monitor stock in real-time, set prices, and optimize distribution flow using one platform.',
          shortDesc: 'Inventory management with real-time tracking',
        },
        {
          title: 'HR & Payroll',
          description: 'Manage HR and payroll easily, from employee data management, attendance, to salary calculation. All processes are automatic, accurate, and accessible anytime, making HR management in your company easier.',
          shortDesc: 'Manage HR and payroll easily, from employee data to salary calculation',
        },
      ],
      cta: {
        title: 'Ready to Optimize Your Business?',
        description: 'Find the right ERP solution for your business needs. Contact us for a free consultation.',
        buttonText: 'Free Consultation Now',
      },
      about: {
        title: 'What is KelolaAja?',
        subtitle: 'Leading ERP Accounting Software for Indonesian Business',
        description1: 'KelolaAja ERP Accounting software, founded in 2024 to answer the challenges of companies in managing management systems efficiently. With KelolaAja business software solutions present to meet the needs of various industries. Designed specifically for ease of use and adapted to the needs of Indonesian companies.',
        description2: 'KelolaAja is the first ERP software that offers the advantage of financial reporting guidance up to tax reporting.',
        buttonText: 'Try Free Now',
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Find answers to common questions about KelolaAja',
        showAll: 'View All FAQ',
        showLess: 'Show Less',
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
      learnMore: 'Learn More',
    },
    projectPage: {
      hero: {
        title: 'Project Management',
        description: 'Manage projects, track progress, and monitor timelines easily. Integrated project management system to ensure every project runs according to plan and budget.',
        ctaButton: 'Contact Us',
      },
      softwareFeatures: {
        title: 'Software with Features',
        subtitle: 'Project Management and Easy to Use',
        description: 'KelolaAja is designed specifically for ease of use, even for those without a project management background. An intuitive and user-friendly interface ensures you can manage business projects easily and efficiently.',
      },
      mainTitle: 'Project Management',
      mainDescription: 'Get full control over your project management with a complete and integrated system. From progress tracking to real-time project reports, everything is available in one platform.',
      features: [
        {
          title: 'KelolaAja Makes Projects Simple',
          description: 'View profitability of every project with budget reports and realization. Monitor expenses, profit margins, and remaining budget at any time. Multi-level approval features configurable as needed. Check every expense complete with history.',
        },
        {
          title: 'Monitor Approvals in Real Time',
          description: 'Manage multiple projects simultaneously in real time. Monitor and approve purchases from anywhere, monitor budget and profitability via profit and loss reports per project and monitor progress with Task Management Dashboard.',
        },
        {
          title: 'Automatic Financial Reports',
          description: 'Monitor expenses, profit margins, and remaining budget at any time. Multi-level approval features configurable as needed. Check every expense complete with history. Expenses and income in the field during operations run automatically and all invoices and payments are documented in one module. Expense reports integrated with finance and accounting modules and fully documented for goods purchasing, raw material usage.',
        },
        {
          title: 'Profit and Loss Analysis',
          description: 'Get a picture of financial health of all projects in one dashboard. Complete Profit and Loss Report with visualization. Find out profits from each project category type. Know best performing projects. Export data to Excel, CSV and PDF formats whenever needed.',
        },
      ],
      cta: {
        mainText1: 'Forget complicated manual recording. With KelolaAja, real-time financial reports, from transactions to inventory, are all centralized in one practical platform.',
        mainText2: 'Monitor cash flow, send invoices, and Manage purchases easily, so now you can focus more on growing business rather than dealing with administration.',
        highlights: ['Real-Time Reports', 'Monitor Cash Flow', 'Automatic Invoices', 'Centralized Platform'],
        tryFreeButton: 'Try Free Now',
        consultButton: 'Free Consultation Now',
        optimizeTitle: 'Ready to Optimize Your Project Management?',
        optimizeDescription: 'KelolaAja provides an integrated project management system to track progress and monitor timelines easily.',
      },
      about: {
        title: 'What is KelolaAja?',
        subtitle: 'Leading Accounting ERP Software for Indonesian Businesses',
        description1: 'KelolaAja Accounting ERP software, established in 2024 to answer company challenges in managing management systems efficiently. With KelolaAja business software solutions present to meet the needs of various industries. Designed specifically for ease of use and tailored to the needs of Indonesian companies.',
        description2: 'KelolaAja is the first ERP software offering the advantage of financial report assistance up to tax reporting.',
      },
    },
    salesPage: {
      hero: {
        title: 'Purchasing and Sales',
        description: 'Purchasing and sales processes from quotation to invoice. More flexible trading process, choose outright sale or consignment with down payment features and tiered discounts.',
        ctaButton: 'Contact Us',
      },
      softwareFeatures: {
        title: 'Software with Features',
        subtitle: 'Purchasing and Sales Easy to Use',
        description: 'KelolaAja is designed specifically for ease of use, even for those without a sales background. An intuitive and user-friendly interface ensures you can manage purchasing and sales processes easily and efficiently.',
      },
      mainTitle: 'Purchasing and Sales',
      mainDescription: 'Get full control over your purchasing and sales processes with a complete and integrated system. From quotation to invoice, everything is available in one platform.',
      features: [
        {
          title: 'Record All Order Details',
          description: 'Track all purchase orders and purchases down to every detail, agreed prices and all supporting documents.',
        },
        {
          title: 'Automatic Tax Calculation',
          description: 'All purchase taxes will be automatically recapitalized into tax reports. You can customize any type of tax you want to apply to your business, including withholding tax.',
        },
        {
          title: 'Stock and Warehouse Automatically Recorded',
          description: 'Product stock will be automatically recorded in the warehouse you specify. No need for double input for inventory matters!',
        },
        {
          title: 'Attach Photos or Scan Documents',
          description: 'Reduce paper piles, attach all your paper documents to purchase orders and invoices.',
        },
        {
          title: 'Get Purchasing Information and Statistics',
          description: 'Know for sure what are the best-selling items, how much debt & receivables, purchase orders, and when they are due.',
        },
        {
          title: 'Make Staggered Payments',
          description: 'You can pay for purchases in installments, and can record them neatly and correctly.',
        },
        {
          title: 'Create Purchase Invoice from Purchase Order with One Click',
          description: 'When already dealt with vendor, you can create purchase invoice from purchase order with just one click.',
        },
      ],
      cta: {
        mainText1: 'Forget complicated manual recording. With KelolaAja, real-time financial reports, from transactions to inventory, are all centralized in one practical platform.',
        mainText2: 'Monitor cash flow, send invoices, and Manage purchases easily, so now you can focus more on growing business rather than dealing with administration.',
        highlights: ['Real-Time Reports', 'Monitor Cash Flow', 'Automatic Invoices', 'Centralized Platform'],
        tryFreeButton: 'Try Free Now',
        consultButton: 'Free Consultation Now',
        optimizeTitle: 'Ready to Optimize Your Purchasing & Sales Process?',
        optimizeDescription: 'KelolaAja provides an integrated purchasing and sales system from quotation to invoice easy and efficient.',
      },
      about: {
        title: 'What is KelolaAja?',
        subtitle: 'Leading Accounting ERP Software for Indonesian Businesses',
        description1: 'KelolaAja Accounting ERP software, established in 2024 to answer company challenges in managing management systems efficiently. With KelolaAja business software solutions present to meet the needs of various industries. Designed specifically for ease of use and tailored to the needs of Indonesian companies.',
        description2: 'KelolaAja is the first ERP software offering the advantage of financial report assistance up to tax reporting.',
      },
    },
    industriesPage: {
      hero: {
        badge: 'ERP Solutions for All Industries',
        title: 'Industries We Serve',
        subtitle: 'KelolaAja comes with ERP solutions tailored for various industries. From restaurants to manufacturing, we help your business grow more efficiently and professionally.',
      },
      learnMore: 'Learn More',
    },
    industryPages: {
      fnb: {
        heroTitle: 'Food & Beverage',
        introText: 'Every aspect of your restaurants financial management is recorded and monitored accurately. Focus on serving delicious dishes, let KelolaAja take care of your bookkeeping and financial reports automatically and efficiently.',
        title: 'Is Your Restaurant and Cafe Business Overwhelmed?',
        description: 'Every raw material from the menu you serve needs to be recorded and calculated carefully to maintain restaurant profitability. However, many restaurant owners in Indonesia do not yet have an effective accounting system.',
        problems: [
          {
            title: 'Raw material recording is not optimal',
            description: 'Raw material management is important so that every menu you serve can be fulfilled according to customer demand in your restaurant.',
          },
          {
            title: 'Difficult to Track Profit and Loss per Branch',
            description: 'Import costs and other costs not recorded in COGS can disrupt the accuracy of the income statement, making financial analysis incomplete and confusing.',
          },
          {
            title: 'Financial reports do not meet standards',
            description: 'Financial reports are key to making the right decisions in any business. Unfortunately, many restaurant owners still ignore the importance of this.',
          },
          {
            title: 'Fluctuating Purchase Prices',
            description: 'Inconsistent COGS fluctuations make profit calculation difficult and inaccurate.',
          },
          {
            title: 'Use of One Type of Stock with Different Units',
            description: 'Using stock with various units for each menu makes stock recording more complex and confusing.',
          },
          {
            title: 'Stock Opname',
            description: 'The stock taking process which is still done manually takes a long time, hinders efficiency, and increases the potential for errors in stock recording.',
          },
        ],
        solutionsTitle: 'How KelolaAja Makes Your Restaurant Business Better?',
        solutions: [
          {
            title: 'Easy to use',
            description: 'Even if you are a layman in accounting, you will easily use KelolaAja. If you still find it difficult, we promise free training.',
          },
          {
            title: 'Support Barcode Scanner',
            description: 'Increase speed in the sales recording process and stock taking in business with the help of barcode scanners which are also supported in the KelolaAja system.',
          },
          {
            title: 'Real-time, anywhere and anytime',
            description: 'There is no more waste in your restaurant business, because you can easily monitor every expenditure item and get detailed expenditure reports.',
          },
          {
            title: 'Multi branch & multi warehouse',
            description: 'Monitor and create financial reports practically and make business decisions faster in one click. You will also get graphs of business operations with an easy-to-understand display.',
          },
          {
            title: 'KelolaAja Purchasing Anti-Complicated',
            description: 'From detailed purchase recording to automatic invoice creation, coupled with easy access to purchasing information and statistics, KelolaAja simplifies your entire purchasing process more efficiently.',
          },
          {
            title: 'Reports accessed in seconds',
            description: 'Monitor and create financial reports easily, in just one click, to make business decisions faster. Also get clear and easy-to-understand business operational charts, helping you analyze performance effectively.',
          },
        ],
        cta: {
          title: 'Ready to Overcome Your Restaurant Business Problems?',
          description: 'KelolaAja comes with a complete solution to manage your restaurants finances, inventory, and operations automatically and efficiently.',
          buttonText: 'Free Consultation Now',
        },
        about: {
          title: 'What is KelolaAja?',
          subtitle: 'Leading Accounting ERP Software for Indonesian Businesses',
          description1: 'KelolaAja Accounting ERP software, established in 2024 to answer the challenge of companies in managing management systems efficiently. With business software solutions KelolaAja is here to meet the needs of various industries. Designed specifically for ease of use and tailored to the needs of Indonesian companies.',
          description2: 'KelolaAja is the first ERP software that offers the advantage of financial report assistance up to tax reports.',
          buttonText: 'Try Free Now',
        },
        faq: [
          {
            question: 'Is KelolaAja suitable for F&B business?',
            answer: 'Yes, KelolaAja has specific features for raw material inventory, recipes, and outlet management that are very suitable for F&B businesses.',
          }
        ],
      },
      manufacturing: {
        heroTitle: 'Manufacturing',
        introText: 'Every stage from planning to production completion can be done more efficiently. The decision-making process becomes faster, allowing you to respond to challenges more alertly, while increasing productivity and quality in every step of your business production.',
        title: 'Want to know how KelolaAja software can simplify your entire manufacturing business process?',
        description: 'Often, the volume of production you run is not proportional to the profit margin generated. This can happen if the cost management and accounting recording system in your factory is less structured or does not follow proper standards, resulting in waste and inefficiency in the production process.',
        problems: [
          {
            title: 'Process of converting raw materials into final products.',
            description: 'The production process requires an accurate recording system to convert raw materials into finished products. Without proper recording and calculation, you will find it difficult to calculate Cost of Goods Manufactured (COGM) effectively.',
          },
          {
            title: 'Asset depreciation calculation.',
            description: 'Manufacturing businesses generally have various assets whose depreciation needs to be calculated carefully, because this has a direct impact on the accuracy of the companys financial statements.',
          },
          {
            title: 'Complex overhead cost management.',
            description: 'Factory overhead costs in the manufacturing industry have a significant impact on business decisions made by company owners. Therefore, recording these costs is crucial to ensure accurate analysis and proper decision making.',
          },
        ],
        solutionsTitle: 'How KelolaAja Supports Your Manufacturing Business?',
        solutions: [
          {
            title: 'Manage multi projects with one Click',
            description: 'Manufacturing businesses require efficient project management. With KelolaAja, you can easily manage many projects at once, monitor budgets, and make your project management more structured and organized.',
          },
          {
            title: 'Automatic and accurate fixed asset calculation',
            description: 'Stop calculating fixed asset values manually. With KelolaAja, depreciation of each asset is calculated automatically and adjustment journals are available periodically without extra effort.',
          },
          {
            title: 'Record all operational costs easily',
            description: 'With KelolaAja, you can easily record and manage costs anytime and anywhere, ensuring better efficiency, reducing waste, and increasing your project profitability.',
          },
          {
            title: 'Real-time, anywhere and anytime',
            description: 'There is no more waste in your manufacturing business, because you can easily monitor every expenditure item and get detailed expenditure reports.',
          },
          {
            title: 'KelolaAja Purchasing Anti-Complicated',
            description: 'From detailed purchase recording to automatic invoice creation, coupled with easy access to purchasing information and statistics, KelolaAja simplifies your entire purchasing process more efficiently.',
          },
          {
            title: 'Reports accessed in seconds',
            description: 'Monitor and create financial reports easily, in just one click, to make business decisions faster. Also get clear and easy-to-understand business operational charts, helping you analyze performance effectively.',
          },
        ],
        cta: {
          title: 'Ready to Ovecrome Your Manufacturing Business Problems?',
          description: 'KelolaAja comes with a complete solution to manage your manufacturing business finances, inventory, and operations automatically and efficiently.',
          buttonText: 'Free Consultation Now',
        },
        about: {
          title: 'What is KelolaAja?',
          subtitle: 'Leading Accounting ERP Software for Indonesian Businesses',
          description1: 'KelolaAja Accounting ERP software, established in 2024 to answer the challenge of companies in managing management systems efficiently. With business software solutions KelolaAja is here to meet the needs of various industries. Designed specifically for ease of use and tailored to the needs of Indonesian companies.',
          description2: 'KelolaAja is the first ERP software that offers the advantage of financial report assistance up to tax reports.',
          buttonText: 'Try Free Now',
        },
        faq: [
          {
            question: 'Can KelolaAja calculate Production COGS?',
            answer: 'Sure, KelolaAja can calculate COGS automatically based on raw material costs, labor costs, and factory overhead.',
          }
        ],
      },
      contractor: {
        heroTitle: 'Contractor',
        introText: 'Manage every project more efficiently and optimize your business profits using KelolaAja ERP software. Designed specifically to meet the needs of all types of contractor businesses in Indonesia, KelolaAja makes it easy to manage your project finances and operations.',
        title: 'Is This Problem Often Hindering Your Contractor Business?',
        description: 'Often, the number of projects you handle is not directly proportional to the profit obtained. This is especially true if your contractor accounting recording system is not well structured or does not comply with the standards it should.',
        problems: [
          {
            title: 'Fixed asset calculation errors can damage accuracy.',
            description: 'In the construction business, there are many fixed assets that must be managed. If the depreciation of each of these assets is not calculated properly, your financial data will become inaccurate and disrupt business planning and decision making.',
          },
          {
            title: 'Operational costs can disrupt business financial health.',
            description: 'Operational costs in the contractor business are important expenses that you need to monitor carefully, because they can directly affect company profits.',
          },
          {
            title: 'Difficulty calculating profit per project hinders financial analysis.',
            description: 'Are you sure every project you manage is profitable? Without accurate financial data, your business runs only on estimates.',
          },
        ],
        solutionsTitle: 'How KelolaAja Supports Your Contractor Business?',
        solutions: [
          {
            title: 'Manage multi-projects with one Click',
            description: 'Contractor businesses need efficient project management. With KelolaAja, you can easily manage multiple projects at once, monitor budgets, and make your project management more structured and organized.',
          },
          {
            title: 'Automatic and accurate fixed asset calculation',
            description: 'Stop calculating fixed asset values manually. With KelolaAja, depreciation of each asset is calculated automatically and adjustment journals are available every month without extra effort.',
          },
          {
            title: 'Record all operational costs easily',
            description: 'With KelolaAja, you can easily record and manage costs anytime and anywhere, ensuring better efficiency, reducing waste, and increasing profitability of your projects.',
          },
          {
            title: 'Real-time, anywhere and anytime',
            description: 'No more waste happening in your contractor business, because you can easily monitor every expense item and get detailed reports.',
          },
        ],
        cta: {
          title: 'Ready to Overcome Your Contractor Business Problems?',
          description: 'KelolaAja comes with a complete solution to manage your contractor business finances, inventory, and operations automatically and efficiently.',
          buttonText: 'Free Consultation Now',
        },
        about: {
          title: 'What is KelolaAja?',
          description1: 'KelolaAja Accounting ERP software, established in 2024 to answer company challenges in managing management systems efficiently. With business software solutions KelolaAja is here to meet the needs of various industries.',
          description2: 'Designed specifically for ease of use and adapted to the needs of Indonesian companies. KelolaAja is the first ERP software that offers the advantage of assistance from financial reports to tax reports.',
          buttonText: 'Try Free Now',
        },
        faq: [
          {
            question: 'Can I try for free?',
            answer: 'Of course! We provide a free trial period so you can explore our premium features before subscribing.'
          },
          {
            question: 'Is my data safe?',
            answer: 'Your data security is our priority. KelolaAja uses high-level encryption to ensure your business data remains safe and confidential.'
          },
          {
            question: 'What if I need help?',
            answer: 'Our support team is ready to help you anytime via live chat, email, or WhatsApp to ensure your business runs smoothly.'
          }
        ]
      },
      retail: {
        heroTitle: 'Retail',
        introText: 'Optimize every aspect of your retail operations. From stock management to sales reports, make decisions faster and increase your business profits.',
        title: 'Is Your Retail Business Problem Overwhelming?',
        description: 'Accounting is a vital part of your retail business continuity. Without proper recording, you will find it difficult to evaluate progress and make decisions that support maximum business growth.',
        problems: [
          {
            title: 'Messy stock management',
            description: 'Many retail businesses do not yet have a standardized stock management system, risking problems such as unsold products, piling up in warehouses, or even expiring. Without the right system, stock can be uncontrolled, harming business, and reducing profits that should be obtained.',
          },
          {
            title: 'Time-consuming manual recording',
            description: 'Complex manual recording takes up a lot of valuable time for the finance team, and errors in recording can risk causing unwanted losses for the company.',
          },
          {
            title: 'Financial information is not transparent',
            description: 'Many retail business owners face difficulties in making strategic decisions due to lack of access to accurate and detailed financial data.',
          },
        ],
        solutionsTitle: 'How KelolaAja Makes Your Retail Business Better?',
        solutions: [
          {
            title: 'Easy to use',
            description: 'Even if you are new to accounting, you will find it easy to use KelolaAja. If you still find it difficult, we promise free training.',
          },
          {
            title: 'Reports accessed in seconds',
            description: 'Monitor and create financial reports easily, in just one click, to make business decisions faster. Also get clear and easy-to-understand business operational graphs, helping you analyze performance effectively.',
          },
          {
            title: 'Real-time, anywhere and anytime',
            description: 'No more waste happening in your retail business, because you can easily monitor every expense item and get detailed expense reports.',
          },
          {
            title: 'Multi-branch & multi-warehouse',
            description: 'Monitor and create financial reports practically and make business decisions faster in one click. You will also get graphs of business operations with an easy-to-understand display.',
          },
          {
            title: 'Barcode Scanner Support',
            description: 'Increase speed in the sales recording process and stock opname in business with the help of barcode scanners which are also supported in the KelolaAja system.',
          },
          {
            title: 'Hassle-free Purchasing Management',
            description: 'From detailed purchase recording to automatic invoice creation, plus easy access to purchasing information and statistics, KelolaAja simplifies your entire purchasing process more efficiently.',
          },
        ],
        cta: {
          title: 'Ready to Overcome Your Retail Business Problems?',
          description: 'KelolaAja comes with a complete solution to manage your retail business finances, inventory, and operations automatically and efficiently.',
          buttonText: 'Free Consultation Now',
        },
        about: {
          title: 'What is KelolaAja?',
          description1: 'KelolaAja Accounting ERP software, established in 2024 to answer company challenges in managing management systems efficiently. With business software solutions KelolaAja is here to meet the needs of various industries.',
          description2: 'Designed specifically for ease of use and adapted to the needs of Indonesian companies. KelolaAja is the first ERP software that offers the advantage of assistance from financial reports to tax reports.',
          buttonText: 'Try Free Now',
        },
        faq: [
          {
            question: 'Can I try for free?',
            answer: 'Of course! We provide a free trial period so you can explore our premium features before subscribing.'
          },
          {
            question: 'Is my data safe?',
            answer: 'Your data security is our priority. KelolaAja uses high-level encryption to ensure your business data remains safe and confidential.'
          },
          {
            question: 'What if I need help?',
            answer: 'Our support team is ready to help you anytime via live chat, email, or WhatsApp to ensure your business runs smoothly.'
          }
        ]
      },
    },
    companyProfile: {
      hero: {
        badge: 'About Us',
        title: 'Company',
        titleHighlight: 'Profile',
      },
      about: {
        title: 'About Us at a Glance',
        description1: 'KelolaAja is a digital transformation step by Dawang Group in bringing technology solutions to the business world. Since 1999, Dawang Group has been operating for more than 26 years as a major player in the national telecommunications industry.',
        description2: 'Entering 2024, Dawang Group through the entity PT Tiga Inspirasi Bersama began developing KelolaAja, an integrated ERP software designed to meet modern business needs. Officially launched at the end of 2025, KelolaAja comes as a local solution that bridges the gap between conventional ERP systems that are too complex and expensive, and business needs that demand speed, simplicity, and compliance with national regulations.',
        description3: 'This initiative is part of our commitment to continue innovating and creating added value for the business ecosystem in Indonesia through relevant, scalable, and affordable digital solutions. With KelolaAja, Dawang Group not only expands into the digital technology sector, but also establishes a long-term foundation to become a major player in the digitalization of business operations in Indonesia.',
      },
      vision: {
        badge: 'OUR VISION',
        title: 'VISION',
        description: 'Realizing blessings and prosperity for humanity through digital solutions',
      },
      mission: {
        badge: 'OUR MISSION',
        title: 'MISSION',
        items: [
          'Provide digital solutions that facilitate business management',
          'Help businesses grow productively, efficiently, and sustainably',
          'Bring affordable technology for all business scales',
          'Maintain the value of blessings in every innovation and service',
        ],
      },
      agileValues: {
        badge: 'Core Values',
        title: 'AGILE',
        subtitle: '(Agile; Quick; Swift; Prompt)',
        values: {
          A: {
            title: 'Add Value',
            subtitle: 'Creating Added Value',
            description: 'We always provide added value for business partners, the surrounding environment, and society',
          },
          G: {
            title: 'Grateful & Prosperous',
            subtitle: 'Grateful & Prosperous',
            description: 'We are always grateful for everything we receive. We make every effort to create abundance and well-being that is balanced between material, ability, ethics, and spiritual',
          },
          I: {
            title: 'Integrity & Commitment',
            subtitle: 'Trustworthy & Committed',
            description: 'We are trustworthy, responsible, and highly disciplined individuals. We are always ready to provide commitment and the best results',
          },
          L: {
            title: 'Learn, Growth & Fun',
            subtitle: 'Always Learning, Developing Self & Completing Tasks with Joy',
            description: 'All experiences we encounter are lessons for us to continuously improve ourselves',
          },
          E: {
            title: 'Enthusiast & High Performance',
            subtitle: 'Enthusiastic & High Performance',
            description: 'We are always enthusiastic and actively radiate positive energy in every opportunity. Achieving planned results with high effectiveness and efficiency',
          },
        },
      },
      coreValues: {
        badge: 'Our IMPACT',
        title: 'IMPACT',
        impact: 'IMPACT',
        fromImpact: 'from Our IMPACT',
        values: {
          I: {
            title: 'Innovation',
            subtitle: 'Continuous Innovation',
            description: 'We continuously develop KelolaAja to always be relevant, modern, and able to meet constantly changing business needs. Every update is made to increase effectiveness and simplify operations.',
          },
          M: {
            title: 'Measurable Value',
            subtitle: 'Measurable Value',
            description: 'Every feature we build must provide real impact for users. We focus on measurable results, not just appearance or features that do not provide direct benefits.',
          },
          P: {
            title: 'Practical & Simple',
            subtitle: 'Practical and Simple',
            description: 'KelolaAja is designed to be easy to use by anyone, without the need for ERP technical experience. We simplify complex processes so that business can run faster and more efficiently.',
          },
          A: {
            title: 'Accountability & Accuracy',
            subtitle: 'Data Accountability and Accuracy',
            description: 'We maintain data integrity as our top priority. Every process in KelolaAja is built to maintain honesty, accuracy, and data transparency because good business decisions always start from correct information.',
          },
          C: {
            title: 'Customer-Centric',
            subtitle: 'User-Focused',
            description: 'All KelolaAja development is designed based on real business needs in Indonesia. We provide full support from implementation to monitoring, ensuring every user gets the best results from the system.',
          },
          T: {
            title: 'Trust & Security',
            subtitle: 'Trust and Security',
            description: 'We build KelolaAja with modern security standards to protect user data. System reliability is our commitment so that business can run without interruption.',
          },
        },
      },
    },
  },
}

