import { Bell, Lightbulb, BarChart3, FolderOpen, ArrowRight, Sparkles } from 'lucide-react';
import HeroCarousel from '../../components/common/HeroCarousel';

const ServicesPage = () => {
  const services = [
    { 
      title: 'Alerts', 
      description: 'Receive AI-powered alerts on patent infringements and updates in real-time.', 
      icon: Bell,
      isGold: true,
      gradient: 'from-[#C9A94D] via-[#E6C968] to-[#FFD700]',
      bgImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop',
      features: ['Real-time notifications', 'Custom filters', 'Smart alerts']
    },
    { 
      title: 'Lead Generation', 
      description: 'Discover potential clients and opportunities with AI-powered insights.', 
      icon: Lightbulb,
      isGold: false,
      gradient: 'from-[#191970] via-[#2e3a8c] to-[#4a5fa8]',
      bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      features: ['AI-powered matching', 'Market analysis', 'Lead scoring']
    },
    { 
      title: 'Attorney Dashboard', 
      description: 'Manage cases efficiently with an AI-enhanced comprehensive interface.', 
      icon: BarChart3,
      isGold: true,
      gradient: 'from-[#C9A94D] via-[#B2923E] to-[#8B7355]',
      bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      features: ['Case management', 'Analytics dashboard', 'Team collaboration']
    },
    { 
      title: 'Case Packs', 
      description: 'Comprehensive case documentation and analytics delivered quickly and efficiently.', 
      icon: FolderOpen,
      isGold: false,
      gradient: 'from-[#191970] via-[#4a5fa8] to-[#6b7fc1]',
      bgImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
      features: ['Automated reports', 'Document generation', 'Quick delivery']
    }
  ];

  return (
    <div className="bg-[#EDEADC] min-h-screen">
      <HeroCarousel />
    
      <section className="py-20 px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-[#191970] to-[#4a5fa8] text-white px-6 py-2 rounded-full mb-4 shadow-lg">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold uppercase tracking-wide">Our Services</span>
          </div>
          <h2 className="text-5xl font-bold text-[#191970] mb-4">
            Comprehensive AI-Powered Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your patent protection strategy with cutting-edge technology and expert guidance
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="group relative overflow-hidden bg-white/40 border-[1.5px] border-[#dcdab4]/45 rounded-[20px] p-6 text-center shadow-[0_8px_24px_0_rgba(25,25,112,0.09),0_1.5px_6px_0_rgba(25,25,112,0.12),inset_0_0.5px_0.5px_0_rgba(255,255,255,0.40)] backdrop-blur-sm backdrop-saturate-120 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,0,0,0.20),0_12px_25px_rgba(0,0,0,0.1)] cursor-pointer"
              >
                {/* Background Image with Overlay - Appears on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px] overflow-hidden">
                  <img 
                    src={service.bgImage} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-90`}></div>
                </div>

                {/* Decorative Corner Gradient */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${service.gradient} opacity-10 rounded-bl-full transition-all duration-500 group-hover:opacity-20`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container with Glow */}
                  <div className="mb-4 relative">
                    <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
                    <div className="relative bg-white/90 group-hover:bg-white w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                      <Icon 
                        className={`h-8 w-8 ${
                          service.isGold ? 'text-[#C9A94D]' : 'text-[#191970]'
                        } group-hover:scale-110 transition-transform duration-500`} 
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#0A1F14] group-hover:text-white mb-3 transition-colors duration-500">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#555] group-hover:text-white/90 text-sm leading-relaxed mb-4 transition-colors duration-500">
                    {service.description}
                  </p>

                  {/* Features List - Shows on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 mb-4">
                    <ul className="text-white text-xs space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center justify-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-[#C9A94D]"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn More Button - Shows on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="inline-flex items-center gap-2 text-white font-semibold text-sm">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white/60 backdrop-blur-md border-[1.5px] border-[#dcdab4]/45 rounded-[20px] p-10 shadow-[0_12px_40px_rgba(25,25,112,0.15)]">
            <h3 className="text-3xl font-bold text-[#191970] mb-3">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Our team can create tailored patent protection strategies to meet your specific needs
            </p>
            <button className="group inline-flex items-center gap-3 bg-linear-to-r from-[#191970] to-[#4a5fa8] text-white px-8 py-3 rounded-xl font-semibold uppercase tracking-wide text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span>Contact Us</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;