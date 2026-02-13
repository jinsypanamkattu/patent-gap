import React, { useState, useEffect } from 'react';
import { Shield, Zap, Brain, Sparkles, Globe, Lock, Cpu, Database, Eye, Search, TrendingUp, FileCheck } from 'lucide-react';

const NextGenMarquee = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate dynamic particles
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      }))
    );
  }, []);

  const marqueeItems = [
    { icon: Shield, text: 'Patent Protection', color: '#10b981' },
    { icon: Brain, text: 'AI-Powered Analysis', color: '#34d399' },
    { icon: Eye, text: 'Real-Time Monitoring', color: '#6ee7b7' },
    { icon: Globe, text: 'Global Coverage', color: '#10b981' },
    { icon: Search, text: 'Intelligent Detection', color: '#34d399' },
    { icon: Cpu, text: 'Neural Networks', color: '#6ee7b7' },
    { icon: Database, text: 'Comprehensive Database', color: '#10b981' },
    { icon: TrendingUp, text: 'Predictive Analytics', color: '#34d399' },
    { icon: FileCheck, text: 'Automated Verification', color: '#6ee7b7' },
    { icon: Lock, text: 'Secure Platform', color: '#10b981' },
    { icon: Zap, text: 'Instant Results', color: '#34d399' },
    { icon: Sparkles, text: 'Innovation First', color: '#6ee7b7' }
  ];

  return (
   <div className="w-full overflow-x-hidden mb-20 relative">


      {/* Animated circuit board background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15">
        <svg className="w-full h-full">
          <defs>
            <pattern id="marqueeCircuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#10b981" opacity="0.6"/>
              <line x1="50" y1="50" x2="100" y2="50" stroke="#10b981" strokeWidth="0.5" opacity="0.4"/>
              <line x1="50" y1="50" x2="50" y2="0" stroke="#34d399" strokeWidth="0.5" opacity="0.4"/>
              <circle cx="20" cy="20" r="1.5" fill="#6ee7b7" opacity="0.5"/>
              <circle cx="80" cy="80" r="1.5" fill="#34d399" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#marqueeCircuit)" 
                style={{ animation: 'circuitScroll 40s linear infinite' }}/>
        </svg>
      </div>

      {/* Neural network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <defs>
          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: '#34d399', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#6ee7b7', stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
        
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1={`${i * 12.5}%`}
            y1="0%"
            x2={`${(i + 1) * 12.5}%`}
            y2="100%"
            stroke="url(#neuralGrad)"
            strokeWidth="2"
            opacity="0.5"
            style={{
              animation: `neuralPulse ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </svg>

      {/* Floating orbs with green theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-[5%] -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-float-1"></div>
        <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-72 h-72 bg-green-400/8 rounded-full blur-3xl animate-float-2"></div>
        <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-56 h-56 bg-teal-400/10 rounded-full blur-3xl animate-float-3"></div>
        <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-60 h-60 bg-emerald-400/12 rounded-full blur-3xl animate-float-4"></div>
      </div>

      {/* Dynamic particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animation: `particleFloat ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.8)',
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 flex flex-col gap-2"
            style={{
              left: `${i * 8.5}%`,
              animation: `matrixFall ${4 + (i % 3)}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {[...Array(8)].map((_, j) => (
              <span
                key={j}
                className="text-xs font-mono text-emerald-400"
                style={{
                  opacity: 1 - (j * 0.12),
                  textShadow: '0 0 8px rgba(16, 185, 129, 0.8)',
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </span>
            ))}
          </div>
        ))}
      </div>
      
      {/* Main marquee container */}
      <div className="relative py-16 overflow-hidden">
        {/* Animated gradient borders - Green theme */}
        <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
          <div 
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #10b981 25%, #34d399 50%, #6ee7b7 75%, transparent 100%)',
              height: '100%',
              animation: 'borderFlow 4s linear infinite',
            }}
          ></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden">
          <div 
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #6ee7b7 25%, #34d399 50%, #10b981 75%, transparent 100%)',
              height: '100%',
              animation: 'borderFlowReverse 4s linear infinite',
            }}
          ></div>
        </div>
        
        {/* Scanning beam effects */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 w-1 h-full"
            style={{
              left: `${i * 25}%`,
              background: 'linear-gradient(to bottom, transparent, rgba(16,185,129,0.6), rgba(52,211,153,0.5), transparent)',
              animation: `scanBeam ${5 + i}s linear infinite`,
              animationDelay: `${i * 1.2}s`,
              boxShadow: '0 0 20px rgba(16,185,129,0.8)',
              opacity: 0.3,
            }}
          />
        ))}
        
        {/* Holographic shine overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.1), transparent)',
            animation: 'holographicShine 8s ease-in-out infinite',
          }}
        ></div>
        
        {/* Gradient fade edges */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #001a14 0%, #001a14 20%, transparent 100%)',
          }}
        ></div>
        <div 
          className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #001a14 0%, #001a14 20%, transparent 100%)',
          }}
        ></div>
        
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }

          @keyframes circuitScroll {
            0% { transform: translate(0, 0); }
            100% { transform: translate(100px, 100px); }
          }

          @keyframes float-1 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            33% { transform: translate(-40%, -60%) scale(1.2); }
            66% { transform: translate(-60%, -40%) scale(1.1); }
          }

          @keyframes float-2 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            33% { transform: translate(-60%, -40%) scale(1.15); }
            66% { transform: translate(-40%, -60%) scale(1.25); }
          }

          @keyframes float-3 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-45%, -55%) scale(1.1); }
          }

          @keyframes float-4 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-55%, -45%) scale(1.2); }
          }

          @keyframes particleFloat {
            0%, 100% { 
              transform: translate(0, 0) scale(1);
              opacity: 0.4;
            }
            25% { 
              transform: translate(30px, -30px) scale(1.5);
              opacity: 0.8;
            }
            50% { 
              transform: translate(-20px, -60px) scale(1);
              opacity: 0.6;
            }
            75% { 
              transform: translate(40px, -40px) scale(1.3);
              opacity: 0.7;
            }
          }

          @keyframes matrixFall {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }

          @keyframes borderFlow {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @keyframes borderFlowReverse {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          @keyframes scanBeam {
            0% { transform: translateX(0); opacity: 0; }
            50% { opacity: 0.3; }
            100% { transform: translateX(100%); opacity: 0; }
          }

          @keyframes holographicShine {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(200%) skewX(-15deg); }
          }

          @keyframes glowPulse {
            0%, 100% { 
              box-shadow: 0 0 15px var(--glow-color), 0 0 30px var(--glow-color), 0 0 45px var(--glow-color);
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 0 25px var(--glow-color), 0 0 50px var(--glow-color), 0 0 75px var(--glow-color);
              transform: scale(1.05);
            }
          }

          @keyframes iconRotate {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.2); }
            100% { transform: rotate(360deg) scale(1); }
          }

          @keyframes orbitRotate {
            0% { transform: rotate(0deg) translate(25px) rotate(0deg); }
            100% { transform: rotate(360deg) translate(25px) rotate(-360deg); }
          }

          @keyframes neuralPulse {
            0%, 100% { opacity: 0.3; stroke-width: 2; }
            50% { opacity: 0.8; stroke-width: 3; }
          }

          .marquee-content {
            animation: marquee 35s linear infinite;
          }

          .marquee-content:hover {
            animation-play-state: paused;
          }

          .animate-float-1 { animation: float-1 10s ease-in-out infinite; }
          .animate-float-2 { animation: float-2 12s ease-in-out infinite; }
          .animate-float-3 { animation: float-3 9s ease-in-out infinite; }
          .animate-float-4 { animation: float-4 11s ease-in-out infinite; }
        `}</style>
        
        {/* Marquee content */}
        <div className="flex marquee-content">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div
                key={index}
                className="flex items-center gap-5 px-12 whitespace-nowrap group"
              >
                {/* Icon container with advanced effects */}
                <div className="relative">
                  {/* Outer glow ring - pulsing */}
                  <div 
                    className="absolute inset-0 rounded-full transition-all duration-700 group-hover:scale-150"
                    style={{ 
                      background: `radial-gradient(circle, ${item.color}60 0%, transparent 70%)`,
                      animation: 'glowPulse 3s ease-in-out infinite',
                      '--glow-color': item.color,
                    }}
                  ></div>
                  
                  {/* Middle ring - rotating */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 opacity-30 group-hover:opacity-60 transition-all duration-500"
                    style={{ 
                      borderColor: item.color,
                      animation: 'iconRotate 4s linear infinite',
                    }}
                  ></div>
                  
                  {/* Icon circle with glassmorphism */}
                  <div 
                    className="relative w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl shadow-2xl transition-all duration-500 border-2 group-hover:scale-110 group-hover:rotate-12"
                    style={{ 
                      borderColor: item.color,
                      background: `linear-gradient(135deg, ${item.color}40 0%, ${item.color}20 50%, ${item.color}30 100%)`,
                      boxShadow: `0 0 30px ${item.color}60, inset 0 0 20px ${item.color}20`,
                    }}
                  >
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Icon */}
                    <Icon 
                      className="h-7 w-7 relative z-10 transition-all duration-500 group-hover:scale-125"
                      style={{ 
                        color: item.color,
                        filter: `drop-shadow(0 0 8px ${item.color})`,
                      }} 
                    />
                  </div>
                  
                  {/* Orbiting particles */}
                  <div 
                    className="absolute top-1/2 left-1/2"
                    style={{ animation: 'orbitRotate 3s linear infinite' }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}`,
                      }}
                    ></div>
                  </div>
                  
                  {/* Corner accent */}
                  <div 
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full group-hover:scale-150 transition-all duration-500"
                    style={{ 
                      backgroundColor: item.color,
                      boxShadow: `0 0 15px ${item.color}`,
                    }}
                  ></div>
                </div>
                
                {/* Text with gradient and glow */}
                <span 
                  className="text-xl font-bold transition-all duration-500 relative group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${item.color} 0%, #6ee7b7 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: `drop-shadow(0 0 10px ${item.color}80)`,
                  }}
                >
                  {item.text}
                </span>
                
                {/* Animated separator */}
                <div className="relative mx-8 group-hover:scale-125 transition-all duration-500">
                  {/* Center dot */}
                  <div 
                    className="w-3 h-3 rounded-full relative z-10"
                    style={{ 
                      backgroundColor: item.color,
                      boxShadow: `0 0 20px ${item.color}`,
                    }}
                  ></div>
                  
                  {/* Expanding rings */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 opacity-40"
                    style={{ 
                      borderColor: item.color,
                      animation: 'glowPulse 2s ease-in-out infinite',
                      '--glow-color': item.color,
                    }}
                  ></div>
                  
                  {/* Lines extending from dot */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-8 h-0.5 -translate-y-1/2"
                    style={{ 
                      background: `linear-gradient(to right, ${item.color}, transparent)`,
                      left: '100%',
                    }}
                  ></div>
                  <div 
                    className="absolute top-1/2 right-1/2 w-8 h-0.5 -translate-y-1/2"
                    style={{ 
                      background: `linear-gradient(to left, ${item.color}, transparent)`,
                      right: '100%',
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NextGenMarquee;