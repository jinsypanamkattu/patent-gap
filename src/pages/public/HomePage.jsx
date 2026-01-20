import { useStore } from '../../hooks/useStore';
import HeroCarousel from '../../components/common/HeroCarousel';
import { Shield, Zap, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const { setPage } = useStore();
  const navigate = useNavigate();


  const features = [
    {
      title: 'Secure Protection',
      description: 'Advanced security measures to protect your intellectual property with military-grade encryption',
      icon: Shield,
      gradient: 'from-[#C9A94D] via-[#E6C968] to-[#FFD700]',
      bgImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
      iconColor: 'text-[#C9A94D]'
    },
    {
      title: 'Fast Processing',
      description: 'Lightning-quick turnaround times for patent filing and management with AI assistance',
      icon: Zap,
      gradient: 'from-[#191970] via-[#2e3a8c] to-[#4a5fa8]',
      bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      iconColor: 'text-[#191970]'
    },
    {
      title: '24/7 Monitoring',
      description: 'Round-the-clock monitoring of your patent portfolio with real-time alerts and updates',
      icon: Clock,
      gradient: 'from-[#C9A94D] via-[#B2923E] to-[#8B7355]',
      bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      iconColor: 'text-[#C9A94D]'
    }
  ];

  return (
    <div className="bg-[#EDEADC] min-h-screen">
      <HeroCarousel />
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-[#191970] to-[#4a5fa8] text-white px-6 py-2 rounded-full mb-4 shadow-lg">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold uppercase tracking-wide">Why Choose Us</span>
          </div>
          <h2 className="text-5xl font-bold text-[#191970] mb-4">
            Experience the Future of Patent Protection
          </h2>
          <p className="text-xl text-[#555] max-w-2xl mx-auto">
            Cutting-edge AI technology meets expert legal guidance
          </p>
        </div>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-[20px] bg-white/40 border-[1.5px] border-[#dcdab4]/45 shadow-[0_8px_24px_0_rgba(25,25,112,0.09),0_1.5px_6px_0_rgba(25,25,112,0.12),inset_0_0.5px_0.5px_0_rgba(255,255,255,0.40)] backdrop-blur-sm backdrop-saturate-120 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,0,0,0.20),0_12px_25px_rgba(0,0,0,0.1)] cursor-pointer"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <img 
                    src={feature.bgImage} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-90`}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 text-center">
                  {/* Animated Icon Container */}
                  <div className="mb-6 relative">
                    <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                    <div className="relative bg-white/80 group-hover:bg-white w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                      <Icon 
                        className={`h-10 w-10 ${feature.iconColor} group-hover:scale-110 transition-transform duration-500`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-2xl font-bold mb-3 text-[#0A1F14] group-hover:text-white transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-[#555] group-hover:text-white/90 transition-colors duration-500 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="inline-flex items-center gap-2 text-white font-semibold">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${feature.gradient} opacity-10 rounded-bl-full`}></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <div className="relative overflow-hidden bg-linear-to-br from-[#070738] via-[#191970] to-[#2e3a8c] p-12 rounded-3xl text-center shadow-[0_20px_60px_rgba(25,25,112,0.4)] border border-white/10">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#C9A94D] rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#4a5fa8] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-[#C9A94D]" />
              <span className="text-sm font-semibold uppercase tracking-wide">Get Started Today</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Ready to Protect Your Innovation?
            </h3>
            <p className="text-lg md:text-xl text-[#EDEADC] mb-10 max-w-2xl mx-auto leading-relaxed">
              Request a demo to see how we can help secure your patents with AI-powered solutions and expert guidance
            </p>
            
            <button 
              onClick={() => navigate('/demo')}
              className="group relative inline-flex items-center gap-3 bg-[#C9A94D] text-[#0A1F14] px-10 py-4 rounded-xl font-bold uppercase tracking-wide text-sm shadow-[0_4px_18px_2px_rgba(201,169,77,0.4),0_2px_12px_2px_rgba(201,169,77,0.3),inset_0_0.5px_0.5px_0_rgba(255,255,220,0.19)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_4px_rgba(201,169,77,0.5),0_4px_20px_4px_rgba(201,169,77,0.4)] active:scale-95 overflow-hidden"
              style={{
                backgroundImage: 'linear-gradient(180deg, #FFF8E2 0%, #C9A94D 38%, #B2923E 100%)'
              }}
            >
              <span className="relative z-10">Request a Demo</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#C9A94D]" />
                <span className="text-sm">Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#C9A94D]" />
                <span className="text-sm">Instant Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#C9A94D]" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;