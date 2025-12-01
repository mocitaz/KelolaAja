/**
 * Script to add new FAQs to the database
 * 
 * Usage:
 * 1. Make sure backend is running at http://localhost:8080
 * 2. Get your admin access token from localStorage after logging in
 * 3. Run: ACCESS_TOKEN=your_token node scripts/add-faqs.js
 * 
 * Or use the admin panel at /admin/faqs to add FAQs manually
 */

const readline = require('readline');
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

// FAQ data to add
const newFAQs = [
  {
    question: 'Apa itu KelolaAja?',
    answer: 'KelolaAja adalah software ERP terintegrasi yang dikembangkan khusus untuk menjawab kebutuhan small to growing businesses di Indonesia. Dirancang untuk menyederhanakan proses manajemen keuangan, pembukuan, pelaporan, hingga operasional bisnis lainnya secara menyeluruh, KelolaAja memungkinkan perusahaan untuk mengelola dan memantau aktivitas bisnis secara real-time, dari mana saja, dengan efisiensi tinggi dan akurasi yang konsisten.\n\nMeski dioptimalkan untuk bisnis yang sedang tumbuh, KelolaAja dibangun dengan standar dan kapabilitas enterprise-class. Ini memastikan bahwa perusahaan skala besar sekalipun tetap dapat mengandalkan KelolaAja dalam memenuhi kompleksitas kebutuhan internal mereka.',
    categoryName: 'general', // Will be resolved to categoryId
    displayOrder: 1,
    isActive: true
  },
  {
    question: 'Apa yang membedakan KelolaAja dari software ERP lain di pasaran?',
    answer: 'KelolaAja menghadirkan keseimbangan antara kualitas sistem, kedalaman fitur, dan keterjangkauan biaya. Dibanding ERP lokal maupun global, KelolaAja menawarkan solusi yang komprehensif dan efisien secara biaya, tanpa mengorbankan fungsionalitas inti.',
    categoryName: 'general',
    displayOrder: 2,
    isActive: true
  },
  {
    question: 'Apakah pengguna perlu memiliki pengalaman teknis untuk menggunakan KelolaAja?',
    answer: 'Tidak. KelolaAja dirancang dengan antarmuka yang intuitif dan alur kerja yang disederhanakan berdasarkan riset langsung terhadap kebutuhan pengguna bisnis di berbagai level. Sistem ini dapat digunakan tanpa pengalaman teknis sebelumnya.',
    categoryName: 'general',
    displayOrder: 3,
    isActive: true
  },
  {
    question: 'Berapa lama proses implementasi KelolaAja?',
    answer: 'Proses implementasi KelolaAja umumnya memakan waktu antara 1 hingga 3 bulan, tergantung pada kompleksitas struktur bisnis, jumlah modul yang digunakan, dan kesiapan data internal perusahaan. Rentang waktu ini mencakup seluruh tahapan penting seperti analisis kebutuhan, konfigurasi sistem, migrasi data, pelatihan pengguna, hingga pendampingan saat go-live.',
    categoryName: 'general',
    displayOrder: 4,
    isActive: true
  },
  {
    question: 'Apakah KelolaAja bisa disesuaikan dengan kebutuhan bisnis saya?',
    answer: 'KelolaAja telah dirancang untuk langsung mendukung proses bisnis umum tanpa perlu kustomisasi. Jika ada kebutuhan sangat spesifik, kustomisasi dimungkinkan dengan biaya tambahan sesuai kompleksitas. Namun, kami tidak merekomendasikan kustomisasi kecuali benar-benar diperlukan, agar sistem tetap efisien, stabil, dan scalable.',
    categoryName: 'general',
    displayOrder: 5,
    isActive: true
  }
];

/**
 * Get FAQ categories and find category ID by name
 */
async function getCategoryId(accessToken, categoryName = 'general') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/faq-categories`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    const data = await response.json();

    if (response.ok && data.success && Array.isArray(data.data)) {
      const category = data.data.find(cat => 
        cat.categoryName?.toLowerCase() === categoryName.toLowerCase() ||
        cat.translations?.some(t => t.name?.toLowerCase().includes('umum') || t.name?.toLowerCase().includes('general'))
      );
      
      if (category) {
        return category.categoryId;
      }
      
      // If not found, return first category ID
      if (data.data.length > 0) {
        console.log(`⚠️  Category "${categoryName}" not found, using first category: ${data.data[0].categoryName}`);
        return data.data[0].categoryId;
      }
    }
    
    console.error('❌ Failed to get categories, using default categoryId: 1');
    return 1; // Default fallback
  } catch (error) {
    console.error('❌ Error getting categories:', error.message);
    return 1; // Default fallback
  }
}

/**
 * Add FAQs using the admin API
 * Note: This requires authentication token
 */
async function addFAQs(accessToken) {
  console.log('🚀 Starting to add FAQs...\n');

  // Get category ID
  console.log('📋 Getting FAQ category...');
  const categoryId = await getCategoryId(accessToken, 'general');
  console.log(`✅ Using category ID: ${categoryId}\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < newFAQs.length; i++) {
    const faq = newFAQs[i];
    
    try {
      // Format according to API documentation
      const requestBody = {
        categoryId: categoryId,
        displayOrder: faq.displayOrder,
        isActive: faq.isActive,
        translations: [
          {
            locale: 'id',
            question: faq.question,
            answer: faq.answer
          }
        ]
      };

      const response = await fetch(`${API_BASE_URL}/api/v1/admin/faqs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log(`✅ [${i + 1}/${newFAQs.length}] FAQ added: "${faq.question.substring(0, 60)}..."`);
        successCount++;
      } else {
        console.error(`❌ [${i + 1}/${newFAQs.length}] Failed: ${data.message || 'Unknown error'}`);
        failCount++;
      }
    } catch (error) {
      console.error(`❌ [${i + 1}/${newFAQs.length}] Error: ${error.message}`);
      failCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✨ Done! Success: ${successCount}, Failed: ${failCount}`);
  console.log('='.repeat(50));
}

/**
 * Login to get access token
 */
async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok && data.success && data.data?.accessToken) {
      return data.data.accessToken;
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    throw new Error(`Login error: ${error.message}`);
  }
}

/**
 * Prompt for user input
 */
function promptInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Main execution
if (require.main === module) {
  (async () => {
    let accessToken = process.env.ACCESS_TOKEN;

    // If no token provided, try to login
    if (!accessToken) {
      console.log('🔐 No access token provided. You can either:');
      console.log('1. Provide token: ACCESS_TOKEN=your_token node scripts/add-faqs.js');
      console.log('2. Login with credentials\n');
      
      const useLogin = await promptInput('Do you want to login? (y/n): ');
      
      if (useLogin.toLowerCase() === 'y' || useLogin.toLowerCase() === 'yes') {
        try {
          const username = await promptInput('Username: ');
          const password = await promptInput('Password: ');
          console.log('\n🔐 Logging in...');
          accessToken = await login(username, password);
          console.log('✅ Login successful!\n');
        } catch (error) {
          console.error('❌ Login failed:', error.message);
          console.log('\nPlease get your access token manually:');
          console.log('1. Log in to http://localhost:3000/login');
          console.log('2. Open browser console (F12)');
          console.log('3. Run: localStorage.getItem("accessToken")');
          process.exit(1);
        }
      } else {
        console.log('\nPlease provide access token:');
        console.log('ACCESS_TOKEN=your_token node scripts/add-faqs.js');
        process.exit(1);
      }
    }

    // Check if backend is accessible
    try {
      const healthCheck = await fetch(`${API_BASE_URL}/api/v1/faqs/categories`);
      if (!healthCheck.ok) {
        throw new Error('Backend not accessible');
      }
    } catch (error) {
      console.error(`❌ Cannot connect to backend at ${API_BASE_URL}`);
      console.error('Please make sure the backend is running.');
      process.exit(1);
    }

    await addFAQs(accessToken);
  })().catch(console.error);
}

module.exports = { addFAQs, newFAQs, getCategoryId, login };

