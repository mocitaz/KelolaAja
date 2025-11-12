// Static content management using JSON
// This file handles loading and managing static content

export interface LandingPageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    image?: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  about: {
    title: string;
    description: string;
    image?: string;
  };
  testimonials?: Array<{
    name: string;
    role: string;
    content: string;
    avatar?: string;
  }>;
  footer: {
    copyright: string;
    links?: Array<{
      label: string;
      url: string;
    }>;
  };
}

// Default content - can be overridden by JSON file or database
export const defaultContent: LandingPageContent = {
  hero: {
    title: 'Kelola Usahamu,',
    subtitle: 'Gak Pake Ribet',
    description: 'Tinggalkan cara manual, beralihlah ke KelolaAja software ERP Akuntansi untuk mengelola faktur, pembelian, laporan, hingga analisis bisnis dengan lebih mudah dan gak pake ribet. Semua bisa diakses kapan saja dan di mana saja, membuat pengelolaan bisnis jadi lebih efisien!',
    ctaText: 'Coba Gratis Sekarang',
    image: '/images/home/hero-image.jpg',
  },
  features: [
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
  about: {
    title: 'Tentang Kami',
    description: 'Kami adalah tim profesional yang berdedikasi untuk memberikan solusi terbaik bagi bisnis Anda. Dengan pengalaman bertahun-tahun, kami siap membantu Anda mencapai tujuan bisnis.',
    image: '/images/home/about-image.jpg',
  },
  footer: {
    copyright: '© 2024 KelolaAja. All rights reserved.',
    links: [
      { label: 'Tentang', url: '#about' },
      { label: 'Fitur', url: '#features' },
      { label: 'Kontak', url: '#contact' },
    ],
  },
};

// Load content from JSON file (if exists)
// Note: In production, you can load from database or API endpoint
// For now, we use defaultContent but you can easily switch to JSON or database
export async function loadContent(): Promise<LandingPageContent> {
  try {
    // Option 1: Load from JSON file (for static content)
    // You can uncomment this if you want to use content.json file
    /*
    const contentJson = await import('@/content/content.json');
    return {
      ...defaultContent,
      ...contentJson.default,
      hero: {
        ...defaultContent.hero,
        ...contentJson.default.hero,
      },
      features: contentJson.default.features || defaultContent.features,
      footer: {
        ...defaultContent.footer,
        ...contentJson.default.footer,
      },
    };
    */
    
    // Option 2: Load from database (for dynamic content from admin panel)
    // You can create an API endpoint like /api/content and fetch from there
    /*
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/content`);
    if (response.ok) {
      const dbContent = await response.json();
      return {
        ...defaultContent,
        ...dbContent,
      };
    }
    */
    
    // For now, return defaultContent (which is already updated with new content)
    return defaultContent;
  } catch (error) {
    console.error('Error loading content:', error);
    return defaultContent;
  }
}

