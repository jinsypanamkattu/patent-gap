import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [particles, setParticles] = useState([]);

  const slides = [
    {
      title: 'Protect Your Innovation',
      subtitle: 'with AI-Powered Patents',
      description:
        'Advanced machine learning technology to secure and manage your intellectual property',
    },
    {
      title: 'AI-Powered Patent Analysis',
      subtitle: 'Smart Technology for Patent Management',
      description:
        'Leverage artificial intelligence to streamline your patent portfolio management',
    },
    {
      title: 'Secure Your Intellectual Property',
      subtitle: 'Comprehensive Patent Monitoring',
      description:
        'Stay ahead with real-time alerts and comprehensive IP protection strategies',
    },
  ];

  useEffect(() => {
    setParticles(
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 4 + 3,
      }))
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: '600px',
        background: '#051146',
      }}
    >
      {/* PARTICLES */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: '#38bdf8',
              animation: `twinkle ${p.duration}s ease-in-out infinite`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* KEYFRAMES */}
      <style>{`
        @keyframes twinkle {
          0%,100% { opacity:.3; }
          50% { opacity:.9; }
        }
        @keyframes scan {
          0% { top: -20%; }
          100% { top: 120%; }
        }
        @keyframes floatCard {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes glow {
          0%,100% { opacity:.3; }
          50% { opacity:.6; }
        }
      `}</style>

      {/* SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-7xl mx-auto px-8 h-full flex items-center">
            <div className="grid md:grid-cols-2 gap-12 w-full items-center">

              {/* LEFT CONTENT */}
              <div>
                <h1 className="text-white text-6xl font-bold mb-4">
                  {slide.title}
                </h1>

                <p
                  className="text-4xl font-bold mb-6"
                  style={{
                    background:
                      'linear-gradient(135deg, #38bdf8 0%, #22d3ee 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {slide.subtitle}
                </p>

                <p className="text-slate-300 text-lg max-w-xl">
                  {slide.description}
                </p>
              </div>

              {/* RIGHT ANIMATION – PATENT SCAN */}
              <div className="relative hidden md:flex items-center justify-center h-90">

                {/* Protection Grid */}
                <div
                  className="absolute inset-0 rounded-2xl border border-sky-400/20"
                  style={{
                    background:
                      'linear-gradient(transparent 95%, rgba(56,189,248,.15) 100%), linear-gradient(90deg, transparent 95%, rgba(56,189,248,.15) 100%)',
                    backgroundSize: '30px 30px',
                    animation: 'glow 4s ease-in-out infinite',
                  }}
                />

                {/* Scanning Beam */}
                <div
                  className="absolute left-0 right-0 h-24"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgba(56,189,248,.35), transparent)',
                    animation: 'scan 3.5s linear infinite',
                  }}
                />

                {/* Floating Patent Cards */}
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute w-28 h-36 rounded-xl flex flex-col items-center justify-center"
                    style={{
                      left: `${20 + i * 20}%`,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(56,189,248,.3)',
                      backdropFilter: 'blur(6px)',
                      animation: `floatCard ${4 + i}s ease-in-out infinite`,
                    }}
                  >
                    <FileText className="text-sky-400 mb-2" />
                    <span className="text-xs text-sky-200">
                      Patent #{i + 1}
                    </span>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      ))}

      {/* NAV */}
      <button
        onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white hover:scale-110"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => setCurrent((p) => (p + 1) % slides.length)}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white hover:scale-110"
      >
        <ChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? 'bg-sky-400 scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
