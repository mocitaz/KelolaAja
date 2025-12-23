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
      introText: string
      title: string
      description: string
      problems: Array<{
        title: string
        description: string
      }>
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
        subtitle: string
        description1: string
        description2: string
        buttonText: string
      }
      faq: {
        question: string
        answer: string
      }
    }
    contractor?: {
      introText: string
      title: string
      description: string
      problems: Array<{
        title: string
        description: string
      }>
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
        subtitle: string
        description1: string
        description2: string
        buttonText: string
      }
      faq: {
        question: string
        answer: string
      }
    }
    retail?: {
      introText: string
      title: string
      description: string
      problems: Array<{
        title: string
        description: string
      }>
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
        subtitle: string
        description1: string
        description2: string
        buttonText: string
      }
      faq: {
        question: string
        answer: string
      }
    }
    manufacturing?: {
      introText: string
      title: string
      description: string
      problems: Array<{
        title: string
        description: string
      }>
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
        subtitle: string
        description1: string
        description2: string
        buttonText: string
      }
      faq: {
        question: string
        answer: string
      }
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
    industriesPage: {
      hero: {
        badge: 'Solusi ERP untuk Semua Industri',
        title: 'Industri yang Kami Layani',
        subtitle: 'KelolaAja hadir dengan solusi ERP yang disesuaikan untuk berbagai industri. Dari restoran hingga manufaktur, kami membantu bisnis Anda tumbuh lebih efisien dan profesional.',
      },
      learnMore: 'Pelajari Selengkapnya',
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
        fromImpact: 'dari Our Philosophy',
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
    industriesPage: {
      hero: {
        badge: 'ERP Solutions for All Industries',
        title: 'Industries We Serve',
        subtitle: 'KelolaAja comes with ERP solutions tailored for various industries. From restaurants to manufacturing, we help your business grow more efficiently and professionally.',
      },
      learnMore: 'Learn More',
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
        badge: 'Our Philosophy',
        title: 'IMPACT',
        impact: 'IMPACT',
        fromImpact: 'from Our Philosophy',
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

