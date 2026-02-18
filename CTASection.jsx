import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Zap, Clock } from 'lucide-react';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 lg:px-8 xl:px-12 py-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#070738] via-[#191970] to-[#2e3a8c] p-16 lg:p-20 xl:p-24 rounded-3xl text-center shadow-[0_20px_60px_rgba(25,25,112,0.4)] border border-white/10">
          
          {/* Animated background blobs */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#C9A94D] rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#4a5fa8] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FFD700] rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          {/* Floating dots animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <style>{`
              @keyframes float-dots {
                0%, 100% { 
                  transform: translateY(0px) translateX(0px);
                  opacity: 0.3;
                }
                25% { 
                  transform: translateY(-20px) translateX(10px);
                  opacity: 0.6;
                }
                50% { 
                  transform: translateY(-10px) translateX(-10px);
                  opacity: 0.8;
                }
                75% { 
                  transform: translateY(-30px) translateX(5px);
                  opacity: 0.5;
                }
              }
              @keyframes pulse-dot {
                0%, 100% { 
                  transform: scale(1);
                  opacity: 0.4;
                }
                50% { 
                  transform: scale(1.5);
                  opacity: 0.8;
                }
              }
            `}</style>
            
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: i % 3 === 0 ? '#C9A94D' : i % 3 === 1 ? '#FFD700' : '#4a5fa8',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float-dots ${4 + Math.random() * 4}s ease-in-out infinite, pulse-dot ${2 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s, ${Math.random() * 2}s`,
                  opacity: 0.3
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-8">
              <Sparkles className="h-5 w-5 text-[#C9A94D]" />
              <span className="text-sm font-semibold uppercase tracking-wide">Get Started Today</span>
            </div>
            
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Ready to Protect Your Innovation?
            </h3>
            
            <p className="text-xl md:text-2xl text-[#EDEADC] mb-12 max-w-3xl mx-auto leading-relaxed">
              Request a demo to see how we can help secure your patents with AI-powered solutions and expert guidance
            </p>
            
            <button 
              onClick={() => navigate('/demo')}
              className="group relative inline-flex items-center gap-3 bg-[#C9A94D] text-[#0A1F14] px-12 py-5 rounded-xl font-bold uppercase tracking-wide text-base shadow-[0_4px_18px_2px_rgba(201,169,77,0.4),0_2px_12px_2px_rgba(201,169,77,0.3),inset_0_0.5px_0.5px_0_rgba(255,255,220,0.19)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_4px_rgba(201,169,77,0.5),0_4px_20px_4px_rgba(201,169,77,0.4)] active:scale-95 overflow-hidden"
              style={{
                backgroundImage: 'linear-gradient(180deg, #FFF8E2 0%, #C9A94D 38%, #B2923E 100%)'
              }}
            >
              <span className="relative z-10">Request a Demo</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 lg:gap-12 text-white/80">
              <div className="flex items-center gap-3 group">
                <Shield className="h-6 w-6 text-[#C9A94D] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-base font-medium">Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-3 group">
                <Zap className="h-6 w-6 text-[#C9A94D] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-base font-medium">Instant Setup</span>
              </div>
              <div className="flex items-center gap-3 group">
                <Clock className="h-6 w-6 text-[#C9A94D] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-base font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
