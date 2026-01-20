import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  
  const slides = [
    {
      title: 'Protect Your Innovation',
      subtitle: 'Advanced Patent Protection Solutions',
      description: 'Safeguard your intellectual property with cutting-edge patent analysis and monitoring.'
    },
    {
      title: 'AI-Powered Patent Analysis',
      subtitle: 'Smart Technology for Patent Management',
      description: 'Leverage artificial intelligence to streamline your patent portfolio management.'
    },
    {
      title: 'Secure Your Intellectual Property',
      subtitle: 'Comprehensive Patent Monitoring & Protection',
      description: 'Stay ahead with real-time alerts and comprehensive IP protection strategies.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="relative w-full h-125 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #051146 0%, #4f62a5 45%, #0a1b5c 100%)'
      }}
    >
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center p-8 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, #051146 0%, #0c1535 45%, #0a1b5c 100%)'
            }}
          >
            {/* Slide Content */}
            <div className="text-center max-w-200 px-8">
              <h1 className="text-white text-5xl font-bold mb-4 leading-tight" 
                  style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
                {slide.title}
              </h1>
              <p className="text-[#EDEADC] text-2xl font-semibold mb-4 opacity-95" 
                 style={{ textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' }}>
                {slide.subtitle}
              </p>
              <p className="text-[#E0E0E0] text-lg mb-8 leading-relaxed">
                {slide.description}
              </p>
              
              {/* Buttons */}
              <div className="flex gap-4 justify-center items-center flex-wrap">
                <button 
                  className="relative bg-[#C9A94D] text-[#0A1F14] px-8 py-3.5 rounded-lg font-semibold uppercase tracking-wide text-sm border-none outline-none cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:border-2 hover:border-white hover:bg-[#E6C968] active:scale-95"
                  style={{
                    backgroundImage: 'linear-gradient(180deg, #FFF8E2 0%, #C9A94D 38%, #B2923E 100%)',
                    boxShadow: '0 4px 18px 2px rgba(25, 25, 112, 0.16), 0 2px 12px 2px rgba(201, 169, 77, 0.17), inset 0 0.5px 0.5px 0 rgba(255,255,220,0.19)',
                    letterSpacing: '0.03em'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 24px 3px rgba(255, 255, 255, 0.2), 0 3px 16px 3px rgba(201, 169, 77, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 18px 2px rgba(25, 25, 112, 0.16), 0 2px 12px 2px rgba(201, 169, 77, 0.17), inset 0 0.5px 0.5px 0 rgba(255,255,220,0.19)';
                  }}
                >
                  {/* Gloss effect */}
                  <span 
                    className="absolute top-1 left-1 right-1 h-[36%] rounded-t-md pointer-events-none z-10"
                    style={{
                      background: 'linear-gradient(110deg, rgba(255,255,255,0.35) 30%, rgba(255,255,255,0.09) 100%)',
                      borderRadius: '6px 6px 50% 50% / 60% 60% 40% 40%',
                      mixBlendMode: 'lighten'
                    }}
                  ></span>
                  <span className="relative z-10">Get Started</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/20 text-white border-2 border-white/30 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 z-10 hover:bg-white/40 hover:border-white/60 hover:scale-110"
        style={{ backdropFilter: 'blur(10px)' }}
        aria-label="Previous slide"
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <ChevronLeft size={28} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 text-white border-2 border-white/30 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 z-10 hover:bg-white/40 hover:border-white/60 hover:scale-110"
        style={{ backdropFilter: 'blur(10px)' }}
        aria-label="Next slide"
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <ChevronRight size={28} />
      </button>

      {/* Carousel Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${
              index === current 
                ? 'bg-[#C9A94D] scale-[1.3]' 
                : 'bg-white/40 hover:bg-white/60 hover:scale-110'
            }`}
            style={index === current ? { boxShadow: '0 0 8px rgba(201, 169, 77, 0.6)' } : {}}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;