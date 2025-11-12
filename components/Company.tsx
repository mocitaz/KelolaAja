'use client'

import Image from 'next/image'

interface CompanyInfo {
  about?: {
    title: string
    description: string
    image?: string
  }
  mission?: {
    title: string
    description: string
  }
  values?: Array<{
    title: string
    description: string
    icon?: string
  }>
  team?: Array<{
    name: string
    role: string
    image?: string
  }>
}

interface CompanyProps {
  content?: CompanyInfo
}

const defaultContent: CompanyInfo = {
  about: {
    title: 'Tentang Perusahaan',
    description:
      'Kami adalah perusahaan teknologi yang berdedikasi untuk memberikan solusi terbaik bagi bisnis Anda. Dengan pengalaman bertahun-tahun di industri, kami telah membantu ratusan perusahaan mengoptimalkan operasional mereka.',
  },
  mission: {
    title: 'Misi Kami',
    description:
      'Memberikan solusi teknologi yang inovatif, mudah digunakan, dan dapat diandalkan untuk membantu bisnis mencapai kesuksesan. Kami percaya bahwa teknologi yang tepat dapat mengubah cara bisnis beroperasi dan membawa dampak positif yang signifikan.',
  },
  values: [
    {
      title: 'Inovasi',
      description: 'Kami selalu mencari cara baru untuk meningkatkan solusi kami.',
      icon: '💡',
    },
    {
      title: 'Keandalan',
      description: 'Komitmen kami untuk memberikan layanan yang konsisten dan dapat diandalkan.',
      icon: '🛡️',
    },
    {
      title: 'Kepuasan Pelanggan',
      description: 'Kepuasan dan kesuksesan pelanggan adalah prioritas utama kami.',
      icon: '❤️',
    },
    {
      title: 'Integritas',
      description: 'Kami menjunjung tinggi integritas dalam setiap aspek bisnis kami.',
      icon: '✨',
    },
  ],
  team: [
    {
      name: 'John Doe',
      role: 'CEO & Founder',
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
    },
    {
      name: 'Mike Johnson',
      role: 'Head of Product',
    },
  ],
}

export default function Company({ content = defaultContent }: CompanyProps) {
  return (
    <section id="company" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        {content.about && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                {content.about.title}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {content.about.description}
              </p>
            </div>
            
            {/* Image Section - 16:9 Aspect Ratio */}
            <div className="max-w-6xl mx-auto mb-12">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/home/company.jpg"
                  alt={content.about.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    if (target.parentElement) {
                      target.parentElement.className += ' bg-gradient-to-br from-primary-100 to-secondary-100'
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"></div>
              </div>
            </div>
          </div>
        )}

        {/* Mission Section */}
        {content.mission && (
          <div className="mb-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8 md:p-12 border border-primary-200">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-4 text-center">
              {content.mission.title}
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
              {content.mission.description}
            </p>
          </div>
        )}

        {/* Values Section */}
        {content.values && content.values.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-8 text-center">
              Nilai-Nilai Kami
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  <div className="text-4xl mb-4">{value.icon || '⭐'}</div>
                  <h4 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Section */}
        {content.team && content.team.length > 0 && (
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 mb-8 text-center">
              Tim Kami
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {content.team.map((member, index) => (
                <div
                  key={index}
                  className="text-center bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-white shadow-lg">
                    {member.name.charAt(0)}
                  </div>
                  <h4 className="text-xl font-display font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

