'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollAnimation from '@/components/ScrollAnimation'
import { createWhatsAppLink } from '@/lib/whatsapp'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
              Syarat & Ketentuan
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ketentuan ini berlaku dan mengikat Anda setelah Anda mulai menggunakan layanan apa pun dari KelolaAja.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg prose-gray max-w-none">
            
            {/* Introduction */}
            <div className="mb-8 text-gray-700 leading-relaxed">
              <p>
                Layanan KelolaAja dapat mengalami perubahan dari waktu ke waktu sesuai dengan kebijakan internal KelolaAja, peraturan pemerintah yang berlaku, umpan balik dari pengguna, serta pembaruan teknis pada sistem yang digunakan. Syarat dan Ketentuan ini tidak dimaksudkan untuk mencakup semua kemungkinan pertanyaan atau permasalahan yang mungkin timbul akibat penggunaan layanan KelolaAja.
              </p>
              <p>
                KelolaAja berhak untuk mengubah, memperbarui, atau merevisi Syarat dan Ketentuan ini kapan saja tanpa pemberitahuan terlebih dahulu, dan perubahan tersebut akan efektif segera setelah diposting di situs web resmi KelolaAja. KelolaAja akan berusaha untuk menginformasikan perubahan-perubahan ini kepada pengguna melalui email atau pemberitahuan di situs web.
              </p>
              <p>
                Mengingat bahwa Syarat dan Ketentuan ini mungkin mengalami perubahan secara berkala, adalah tanggung jawab Anda untuk selalu memeriksa, membaca, dan memastikan bahwa Anda memahami dan menyetujui versi terbaru dari Syarat dan Ketentuan yang tersedia di situs web KelolaAja.
              </p>
              <p>
                Dengan mendaftar dan mengakses layanan KelolaAja, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui Syarat dan Ketentuan ini, serta diakui memiliki wewenang untuk bertindak atas nama pihak yang terdaftar menggunakan layanan KelolaAja.
              </p>
            </div>

            {/* Definitions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-10">Syarat & Ketentuan KelolaAja</h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <strong className="text-gray-900">Perjanjian</strong> – berarti Syarat & Ketentuan ini;
                </div>
                <div>
                  <strong className="text-gray-900">Biaya Akses</strong> – merujuk pada biaya bulanan yang harus Anda bayar sesuai dengan daftar biaya yang tercantum di Website KelolaAja, yang dapat diubah oleh KelolaAja dari waktu ke waktu dengan pemberitahuan kepada Anda;
                </div>
                <div>
                  <strong className="text-gray-900">Informasi Rahasia</strong> – mencakup semua informasi yang dipertukarkan antara para pihak dalam Perjanjian ini, baik dalam bentuk tertulis, elektronik, atau lisan, termasuk Layanan ini, kecuali informasi yang sudah tersedia atau akan tersedia untuk publik, serta informasi yang diungkapkan tanpa hak atau oleh pihak pengguna atau pihak lain secara tidak sah;
                </div>
                <div>
                  <strong className="text-gray-900">Data</strong> – merujuk pada data apapun yang Anda masukkan atau diberikan izin untuk dimasukkan ke dalam Website;
                </div>
                <div>
                  <strong className="text-gray-900">Hak Kekayaan Intelektual</strong> – mencakup paten, merek dagang, merek jasa, hak cipta, desain, pengetahuan, atau hak kekayaan intelektual atau industri lainnya, baik yang terdaftar maupun tidak terdaftar;
                </div>
                <div>
                  <strong className="text-gray-900">Layanan</strong> – merujuk pada layanan pengelolaan akuntansi, keuangan, dan operasional yang disediakan oleh KelolaAja (dan dapat diubah atau diperbarui dari waktu ke waktu) melalui Website;
                </div>
                <div>
                  <strong className="text-gray-900">Website</strong> – merujuk pada situs internet yang dikelola oleh KelolaAja dengan domain kelolaaja.id atau situs lainnya yang dikelola oleh KelolaAja;
                </div>
                <div>
                  <strong className="text-gray-900">KelolaAja</strong> – merujuk pada PT Tiga Inspirasi Bersama yang terdaftar di Indonesia;
                </div>
                <div>
                  <strong className="text-gray-900">Pengguna Diundang</strong> – merujuk pada setiap individu atau entitas, selain Pelanggan, yang menggunakan Layanan dengan izin dari Pelanggan;
                </div>
                <div>
                  <strong className="text-gray-900">Pelanggan</strong> – merujuk pada individu, organisasi, atau entitas lainnya yang mendaftar untuk menggunakan Layanan;
                </div>
                <div>
                  <strong className="text-gray-900">Anda</strong> – merujuk pada Pelanggan, Pengguna, atau Pengguna Diundang.
                </div>
              </div>
            </div>

            {/* Software Usage */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-10">Penggunaan Software</h2>
              <div className="text-gray-700 space-y-4 leading-relaxed">
                <p>
                  KelolaAja memberikan Anda hak untuk mengakses dan menggunakan Layanan KelolaAja melalui Website kami, dengan peran dan hak penggunaan yang telah ditentukan sesuai dengan jenis layanan yang Anda pilih. Hak ini bersifat non-eksklusif, tidak dapat dipindahtangankan, dan terbatas pada perjanjian ini.
                </p>
                <p>
                  Anda mengakui dan setuju, tergantung pada perjanjian tertulis yang berlaku antara Pelanggan dan Pengguna Diundang, serta hukum yang berlaku, bahwa:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Pelanggan bertanggung jawab untuk menentukan siapa yang berhak mengakses sebagai Pengguna Diundang serta menetapkan peran dan hak akses mereka terhadap data yang Anda miliki;</li>
                  <li>Pelanggan bertanggung jawab atas segala penggunaan Layanan oleh Pengguna Diundang;</li>
                  <li>Pelanggan bertanggung jawab untuk mengontrol setiap tingkat akses yang diberikan kepada Pengguna Diundang terhadap organisasi dan Layanan yang relevan, serta dapat mencabut atau mengubah akses atau tingkat akses Pengguna Diundang kapan saja, dengan alasan apapun;</li>
                  <li>Jika terjadi perselisihan antara Pelanggan dan Pengguna Diundang terkait akses ke organisasi atau Layanan tertentu, Pelanggan harus membuat keputusan dan mengatur akses atau tingkat akses yang akan diberikan kepada Pengguna Diundang atas Data atau Layanan yang relevan.</li>
                </ul>
              </div>
            </div>

            {/* Service Availability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-10">Ketersediaan Pelayanan Kami</h2>
              <div className="text-gray-700 space-y-6 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Layanan:</h3>
                  <p>
                    Kami menjamin layanan kami memiliki minimal 90% uptime setiap bulan. Jika uptime layanan kami turun di bawah 90%, pelanggan berhak untuk mengajukan laporan dan menerima kompensasi, dengan jumlah kompensasi maksimum setara dengan biaya berlangganan paket KelolaAja Anda selama 1 tahun.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Dukungan Produk:</h3>
                  <p className="mb-3">Layanan Dukungan Produk kami tersedia melalui tiga saluran komunikasi berikut:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Chat:</strong> 09.00 – 18.00, Senin – Sabtu. Chat yang diterima di luar jam kerja akan dibalas melalui email dalam waktu 24 jam.</li>
                    <li><strong>Telepon:</strong> 09.00 – 18.00, Senin – Sabtu.</li>
                    <li><strong>Email:</strong> 09.00 – 18.00, Senin – Sabtu. Email yang diterima di luar jam kerja akan dijawab dalam waktu 24 jam.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Confidentiality and Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-10">Kerahasiaan dan Privasi</h2>
              <div className="text-gray-700 space-y-6 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Kerahasiaan:</h3>
                  <p className="mb-3">
                    Setiap pihak sepakat untuk menjaga kerahasiaan segala informasi yang dianggap sebagai Informasi Rahasia milik pihak lainnya terkait dengan perjanjian ini. Tidak ada pihak yang akan mengungkapkan atau menggunakan Informasi Rahasia untuk kepentingan pribadi tanpa persetujuan tertulis dari pihak yang memberikan informasi, kecuali untuk keperluan yang dijelaskan dalam ketentuan ini.
                  </p>
                  <p className="mb-3">
                    Kewajiban untuk menjaga kerahasiaan ini akan tetap berlaku meskipun perjanjian ini telah berakhir. Ketentuan ini tidak berlaku untuk informasi yang:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Telah menjadi pengetahuan umum tanpa adanya pelanggaran terhadap perjanjian ini;</li>
                    <li>Diterima dari pihak ketiga yang secara sah memperoleh informasi tersebut dan tidak memiliki kewajiban untuk menjaga kerahasiaannya;</li>
                    <li>Dikembangkan secara mandiri tanpa menggunakan Informasi Rahasia yang diterima.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Privasi:</h3>
                  <p>
                    KelolaAja memiliki kebijakan privasi yang mengatur bagaimana kami mengelola dan melindungi informasi pribadi Anda. Kami menganjurkan Anda untuk membaca kebijakan privasi kami yang terdapat di <a href="/privacy" className="text-primary-600 hover:text-primary-700 underline">kelolaaja.id/kebijakan-privasi/</a>, dan dengan menyetujui ketentuan ini, Anda dianggap telah menyetujui kebijakan tersebut.
                  </p>
                </div>
              </div>
            </div>

            {/* Liability Limitations */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-10">Batasan Kewajiban</h2>
              <div className="text-gray-700 space-y-4 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Batas Tanggung Jawab:</h3>
                  <p>
                    Sejauh yang diizinkan oleh hukum yang berlaku, KelolaAja tidak bertanggung jawab atas kerugian atau kerusakan apapun (termasuk namun tidak terbatas pada kehilangan informasi, data, keuntungan, atau tabungan) yang timbul, baik secara langsung maupun tidak langsung, akibat penggunaan atau ketergantungan terhadap Layanan atau Website.
                  </p>
                  <p>
                    Jika Anda mengalami kerugian atau kerusakan akibat kelalaian atau kegagalan KelolaAja untuk memenuhi kewajibannya, klaim yang diajukan oleh Anda terhadap KelolaAja akan dibatasi pada jumlah biaya akses yang telah Anda bayar dalam 12 bulan sebelumnya, terkait dengan kejadian tunggal atau serangkaian kejadian yang saling berhubungan.
                  </p>
                  <p>
                    Jika Anda tidak puas dengan Layanan, satu-satunya jalur penyelesaian adalah dengan menghentikan perjanjian ini sesuai dengan ketentuan yang berlaku.
                  </p>
                </div>
              </div>
            </div>

            {/* Contract Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-10">Pemutusan Kontrak</h2>
              <div className="text-gray-700 space-y-6 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Kebijakan Masa Percobaan:</h3>
                  <p className="mb-3">
                    Ketika Anda pertama kali mendaftar untuk mengakses Layanan, Anda akan diberikan kesempatan untuk mengevaluasi Layanan tersebut sesuai dengan masa percobaan yang telah ditentukan, tanpa kewajiban untuk melanjutkan penggunaannya. Jika Anda memutuskan untuk terus menggunakan Layanan setelah masa percobaan berakhir, Anda akan mulai dikenakan biaya mulai dari tanggal Anda memasukkan informasi penagihan Anda. Jika Anda memutuskan untuk berhenti menggunakan Layanan, Anda dapat menghapus organisasi Anda kapan saja.
                  </p>
                  <p className="mb-3">
                    KelolaAja tidak memberikan pengembalian dana untuk sisa periode prabayar pada langganan Biaya Akses Anda.
                  </p>
                  <p className="mb-3">
                    Ketentuan ini akan berlaku untuk periode yang tercakup oleh Biaya Akses yang telah atau dapat dibayar sesuai ketentuan yang berlaku. Pada akhir setiap periode penagihan, Ketentuan ini akan diperpanjang secara otomatis untuk periode berikutnya dengan durasi yang sama, selama Anda terus membayar Biaya Akses yang telah ditentukan pada waktunya, kecuali salah satu pihak mengakhiri Ketentuan ini dengan memberikan pemberitahuan kepada pihak lainnya setidaknya 30 hari sebelum akhir periode pembayaran yang berlaku.
                  </p>
                  <p className="mb-3">
                    Pembayaran akan dilakukan secara otomatis dan mengikat sesuai dengan ketentuan yang berlaku. Jika Anda memutuskan untuk tidak melakukan pembayaran pada waktu yang telah ditentukan, dengan alasan apapun, kami akan menganggap Anda telah berhenti menggunakan layanan kami. Jika Anda ingin melanjutkan langganan di masa depan dan mengakses data yang telah ada, Anda harus melakukan pembayaran untuk periode yang terhitung sejak bulan Anda berhenti menggunakan layanan kami hingga bulan Anda memulai kembali layanan tersebut.
                  </p>
                </div>
                <div>
                  <p className="mb-3">KelolaAja berhak untuk mengambil salah satu atau semua tindakan berikut jika:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Anda melanggar ketentuan apapun dalam perjanjian ini (termasuk, namun tidak terbatas pada, tidak membayar Biaya Akses yang terutang) dan tidak menyelesaikan masalah pelanggaran dalam waktu 14 hari setelah menerima pemberitahuan, jika masalah tersebut dapat diselesaikan;</li>
                    <li>Anda melanggar ketentuan apapun dan pelanggaran tersebut tidak dapat diselesaikan (termasuk, namun tidak terbatas pada, pelanggaran terkait kegagalan membayar Biaya Akses yang telah melewati tenggat waktu lebih dari 30 hari);</li>
                    <li>Anda atau bisnis Anda mengalami kebangkrutan, atau sedang dalam proses penghentian keberadaan organisasi.</li>
                  </ul>
                  <p className="mb-3">Tindakan yang dapat diambil KelolaAja:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Mengakhiri perjanjian ini dan mengakhiri akses Anda ke Layanan serta Website kami;</li>
                    <li>Menangguhkan akses Anda ke Layanan dan Website KelolaAja untuk periode yang tidak ditentukan;</li>
                    <li>Menangguhkan atau mengakhiri akses ke semua Data Anda.</li>
                  </ul>
                  <p className="mt-4">
                    Pemutusan perjanjian ini tidak mengurangi hak dan kewajiban yang masih harus dipenuhi hingga tanggal pengakhiran. Setelah perjanjian ini berakhir, Anda tetap bertanggung jawab atas biaya yang belum dibayar dan jumlah yang harus dibayar sebelum atau setelah pengakhiran, serta wajib segera berhenti menggunakan Layanan dan Website kami.
                  </p>
                </div>
              </div>
            </div>

            {/* General Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-10">Ketentuan Umum Lainnya</h2>
              <div className="text-gray-700 space-y-4 leading-relaxed">
                <p>
                  Syarat dan Ketentuan ini, bersama dengan Kebijakan Privasi KelolaAja dan ketentuan dari pemberitahuan atau instruksi yang diberikan kepada Anda dibawah Syarat dan Ketentuan ini menggantikan dan menghapus semua perjanjian sebelumnya, representasi (baik lisan maupun tulisan), dan pemahaman, dan merupakan keseluruhan perjanjian antara Anda dan KelolaAja yang berhubungan dengan Layanan dan hal lainnya yang dibahas dalam Ketentuan ini.
                </p>
                <p>
                  Jika salah satu pihak melepaskan tuntutan dari pelanggaran apapun pada Ketentuan ini, ini tidak akan melepaskan mereka dari tuntutan pelanggaran lainnya. Pelepasan dari tuntutan tidak efektif kecuali dibuat secara tulisan.
                </p>
                <p>
                  Para pihak tidak harus bertanggung jawab atas keterlambatan atau kegagalan dalam untuk menyelesaikan kewajibannya dibawah Ketentuan ini jika keterlambatan atau kegagalannya adalah karena sebab apapun yang di luar kendali. Ayat ini tidak berlaku untuk kewajiban pembayaran uang apapun.
                </p>
                <p>
                  Anda tidak dapat mengalihkan atau mentransfer hak kepada orang lain tanpa persetujuan tertulis dari KelolaAja.
                </p>
                <p>
                  Apabila terjadi perselisihan antara kedua belah pihak, akan coba diselesaikan secara musyawarah terlebih dahulu untuk mencapai mufakat. Apabila dengan cara tersebut tidak tercapai kata sepakat, maka kedua belah pihak sepakat untuk menyelesaikan permasalahan tersebut dilakukan melalui prosedur hukum dengan memilih kedudukan hukum Republik Indonesia.
                </p>
                <p>
                  Setiap pemberitahuan yang diberikan berdasarkan Persyaratan ini oleh satu pihak ke yang lain harus dilakukan secara tertulis melalui email dan akan dianggap telah diberikan pada saat transmisi dilakukan. Pemberitahuan kepada KelolaAja harus dikirim ke <a href="mailto:info@kelolaaja.id" className="text-primary-600 hover:text-primary-700 underline">info@kelolaaja.id</a> atau ke alamat email lainnya yang diberitahukan kepada Anda oleh KelolaAja. Pemberitahuan kepada Anda akan dikirim ke alamat email yang Anda berikan saat membuat akses Anda pada Layanan kami.
                </p>
                <p>
                  Subscription adalah pembayaran berulang yang dibayar di muka untuk mengkonsumsi jasa aplikasi akuntansi yang disediakan kelolaaja.id. Setelah subscription telah dibeli, anda bisa membatalkan setiap saat tanpa biaya tambahan kecuali yang sudah dibayarkan. Pembatalan membutuhkan paling lama 31 hari sebelum efektif.
                </p>
                <p>
                  Dengan berlangganan KelolaAja, pengguna menjamin bahwa profil perusahaan, logo, dan informasi lainnya yang tertera di akun KelolaAja adalah benar adanya, dan pengguna merupakan bagian dari perusahaan yang memiliki hak dan kewenangan untuk mewakili perusahaan tersebut.
                </p>
                <p>
                  Dengan berlangganan KelolaAja, pengguna mengizinkan KelolaAja untuk menampilkan nama perusahaan dan logo perusahaan di media promosi KelolaAja kecuali ada permintaan tertulis dari pengguna untuk tidak menampilkan informasi dalam bentuk apapun.
                </p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation direction="up" delay={0} duration={600}>
              <div className="text-center">
                <div className="inline-block bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 lg:p-10 border-2 border-primary-200">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    Siap Mengoptimalkan Keuangan Bisnis Anda?
                  </h2>
                  <p className="text-base lg:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    KelolaAja menyediakan sistem keuangan lengkap untuk mengelola arus kas, pembukuan, dan laporan dengan mudah dan efisien.
                  </p>
                  <a
                    href={createWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
                  >
                    <span>Konsultasi Gratis Sekarang</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* About and FAQ Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Left: About KelolaAja */}
            <div>
              <ScrollAnimation direction="right" delay={0} duration={600}>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-2">
                    Apa Itu KelolaAja?
                  </h2>
                  <p className="text-base lg:text-lg text-gray-600 mb-4">
                    Software ERP Akuntansi Terdepan untuk Bisnis Indonesia
                  </p>
                  <div className="space-y-3 text-sm lg:text-base text-gray-700 leading-relaxed text-justify">
                    <p>
                      KelolaAja software ERP Akuntansi, didirikan pada 2024 untuk menjawab tantangan perusahaan dalam mengelola sistem manajemen secara efisien. Dengan solusi software bisnis KelolaAja hadir untuk memenuhi kebutuhan berbagai industri. Dirancang khusus untuk kemudahan penggunaannya dan disesuaikan dengan kebutuhan perusahaan Indonesia.
                    </p>
                    <p>
                      KelolaAja merupakan software ERP pertama yang menawarkan keunggulan pendampingan laporan keuangan sampai dengan laporan perpajakan.
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6">
                    <a
                      href={createWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105"
                    >
                      <span>Coba Gratis Sekarang</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
            
            {/* Right: FAQ Section */}
            <div>
              <ScrollAnimation direction="left" delay={200} duration={600}>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-4">
                    Pertanyaan Umum
                  </h2>
                  <p className="text-sm lg:text-base text-gray-600 mb-4">
                    Temukan jawaban atas pertanyaan umum tentang KelolaAja
                  </p>
                  <div className="space-y-3">
                    {[
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
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <details className="group">
                          <summary className="px-4 py-3 cursor-pointer list-none flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200">
                            <span className="font-semibold text-sm text-gray-900 pr-4">
                              {index + 1}. {item.question}
                            </span>
                            <svg
                              className="w-4 h-4 text-gray-500 flex-shrink-0 transform transition-transform duration-200 group-open:rotate-180"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                            <p className="text-xs text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </details>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

