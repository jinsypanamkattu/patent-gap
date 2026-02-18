import HeroCarousel from '../../components/common/HeroCarousel';
import { Shield, Brain, Target } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="bg-[#EDEADC] min-h-screen">
      <HeroCarousel />
    
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-16 text-[#191970]">About Us</h1>
          
          {/* Main Content - Text Left, Image Right */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              <div className="bg-white/40 border-[1.5px] border-[#dcdab4]/45 rounded-[15px] p-8 shadow-[0_8px_24px_0_rgba(25,25,112,0.09),0_1.5px_6px_0_rgba(25,25,112,0.12),inset_0_0.5px_0.5px_0_rgba(255,255,255,0.40)] backdrop-blur-sm backdrop-saturate-120">
                <h2 className="text-2xl font-bold mb-4 text-[#0A1F14] flex items-center">
                  <Brain className="h-6 w-6 mr-3 text-[#C9A94D]" />
                  Our Mission
                </h2>
                <p className="text-[#555] leading-relaxed mb-4">
                  Patent Gap AI combines cutting-edge artificial intelligence with deep legal expertise to provide comprehensive patent protection and infringement monitoring solutions. Our platform empowers attorneys and innovators with the tools they need to safeguard their intellectual property.
                </p>
                <p className="text-[#555] leading-relaxed">
                  We leverage advanced AI algorithms to analyze patent landscapes, identify potential risks, and deliver actionable insights that help you make informed decisions about your intellectual property strategy.
                </p>
              </div>

              <div className="bg-white/40 border-[1.5px] border-[#dcdab4]/45 rounded-[15px] p-8 shadow-[0_8px_24px_0_rgba(25,25,112,0.09),0_1.5px_6px_0_rgba(25,25,112,0.12),inset_0_0.5px_0.5px_0_rgba(255,255,255,0.40)] backdrop-blur-sm backdrop-saturate-120">
                <h2 className="text-2xl font-bold mb-4 text-[#0A1F14] flex items-center">
                  <Target className="h-6 w-6 mr-3 text-[#191970]" />
                  Our Vision
                </h2>
                <p className="text-[#555] leading-relaxed">
                  At Smarter Patent Protection, we're dedicated to revolutionizing patent management through cutting-edge technology and expert guidance. Our mission is to make patent protection accessible, efficient, and effective for innovators worldwide.
                </p>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              <div className="bg-white/40 border-[1.5px] border-[#dcdab4]/45 rounded-[15px] p-4 shadow-[0_8px_24px_0_rgba(25,25,112,0.09),0_1.5px_6px_0_rgba(25,25,112,0.12),inset_0_0.5px_0.5px_0_rgba(255,255,255,0.40)] backdrop-blur-sm backdrop-saturate-120 overflow-hidden">
                {/* Replace this div with your actual image */}
                <div className="relative h-125 bg-linear-to-br from-[#191970] via-[#2e3a8c] to-[#4a5fa8] rounded-lg flex items-center justify-center overflow-hidden">
                  {/* Placeholder for actual image */}
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop" 
                    alt="Patent Protection Team" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {/* Overlay for image placeholder effect */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#191970]/60 to-transparent flex items-end p-8">
                    <div className="text-white">
                      <Shield className="h-12 w-12 mb-3 text-[#C9A94D]" />
                      <h3 className="text-2xl font-bold">Protecting Innovation</h3>
                      <p className="text-[#EDEADC] mt-2">Since 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats or Additional Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center bg-white/40 border-[1.5px] border-[#dcdab4]/45 rounded-[15px] p-8 shadow-[0_8px_24px_0_rgba(25,25,112,0.09),0_1.5px_6px_0_rgba(25,25,112,0.12),inset_0_0.5px_0.5px_0_rgba(255,255,255,0.40)] backdrop-blur-sm backdrop-saturate-120 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold text-[#C9A94D] mb-2">10K+</div>
              <div className="text-[#0A1F14] font-semibold mb-1">Patents Monitored</div>
              <div className="text-[#555] text-sm">Across multiple industries</div>
            </div>

            <div className="text-center bg-white/40 border-[1.5px] border-[#dcdab4]/45 rounded-[15px] p-8 shadow-[0_8px_24px_0_rgba(25,25,112,0.09),0_1.5px_6px_0_rgba(25,25,112,0.12),inset_0_0.5px_0.5px_0_rgba(255,255,255,0.40)] backdrop-blur-sm backdrop-saturate-120 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold text-[#191970] mb-2">500+</div>
              <div className="text-[#0A1F14] font-semibold mb-1">Active Clients</div>
              <div className="text-[#555] text-sm">Trusted by innovators worldwide</div>
            </div>

            <div className="text-center bg-white/40 border-[1.5px] border-[#dcdab4]/45 rounded-[15px] p-8 shadow-[0_8px_24px_0_rgba(25,25,112,0.09),0_1.5px_6px_0_rgba(25,25,112,0.12),inset_0_0.5px_0.5px_0_rgba(255,255,255,0.40)] backdrop-blur-sm backdrop-saturate-120 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold text-[#C9A94D] mb-2">98%</div>
              <div className="text-[#0A1F14] font-semibold mb-1">Success Rate</div>
              <div className="text-[#555] text-sm">In patent protection cases</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;