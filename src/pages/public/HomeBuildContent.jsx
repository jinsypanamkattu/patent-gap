import React, { useState, useEffect } from 'react';
import { Sparkles, Shield, Zap, Clock, ArrowRight, Brain, Network, Lock, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeBuildContent = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'Automated Prior-Art Analysis',
      description: 'AI scans millions of patents to identify potential conflicts and strengthen your application',
      color: '#10b981',
      stat: '10M+',
      statLabel: 'Patents Analyzed'
    },
    {
      icon: Zap,
      title: 'Intelligent Drafting Assistant',
      description: 'Natural language processing helps create comprehensive, legally sound patent claims',
      color: '#34d399',
      stat: '99.8%',
      statLabel: 'Accuracy Rate'
    },
    {
      icon: Clock,
      title: '24/7 Portfolio Monitoring',
      description: 'Continuous surveillance with instant alerts on potential infringements and market changes',
      color: '#10b981',
      stat: '24/7',
      statLabel: 'Live Monitoring'
    },
    {
    icon: Shield,
    title: 'Patent Protection Strategy',
    description: 'Strategic guidance to build a robust IP portfolio and defend against potential challenges',
    color: '#34d399',
    stat: '95%',
    statLabel: 'Success Rate'
  }
  ];

  return (
    <section className="w-screen -ml-[50vw] left-[50%] relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-0 left-0 w-200 h-200 bg-gradient-radial from-emerald-500/30 via-emerald-500/10 to-transparent blur-3xl"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-150 h-150 bg-gradient-radial from-emerald-400/20 via-emerald-600/10 to-transparent blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-40 h-40 border border-emerald-500/20 rounded-full animate-float-slow" />
        <div className="absolute top-40 right-[15%] w-32 h-32 border border-emerald-400/20 rotate-45 animate-float-slower" />
        <div className="absolute bottom-32 left-[20%] w-24 h-24 border border-emerald-500/20 rounded-full animate-float-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-400 mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-10 relative">
        <div className="space-y-6">
          {/* Heading - Full Width Above Everything */}
          <div className="text-center space-y-6 pb-0">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight whitespace-nowrap">
              <span className="text-white">Built with </span>
              <span className="relative inline-block">
                <span className="absolute -inset-2 bg-linear-to-r from-emerald-500 via-emerald-400 to-emerald-500 opacity-30 blur-2xl" />
                <span className="relative bg-linear-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                  AI at the Core
                </span>
              </span>
            </h2>

            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Patent Gap AI combines artificial intelligence, legal expertise, and
              real-time monitoring to help innovators protect what matters most.
            </p>
          </div>

          {/* Two Column Grid Below */}
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Left Content - 2 columns */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Features cards - stacked vertically */}
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  const isActive = activeFeature === index;
                  
                  return (
                    <div
                      key={index}
                      onMouseEnter={() => setActiveFeature(index)}
                      onMouseLeave={() => setActiveFeature(null)}
                      className="group relative"
                      style={{ 
                        animation: 'fadeInUp 0.6s ease-out forwards',
                        animationDelay: `${index * 0.15}s`,
                        opacity: 0
                      }}
                    >
                      {/* Card */}
                      <div className="relative bg-gray-900/70 backdrop-blur-xl border-2 border-gray-800 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 cursor-pointer overflow-hidden">
                        {/* Animated gradient border effect */}
                        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                        
                        {/* Shimmer sweep */}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <div className="flex items-start gap-5 relative z-10">
                          {/* Icon with stat badge */}
                          <div className="relative shrink-0">
                            <div 
                              className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden"
                              style={{
                                background: `linear-gradient(135deg, ${feature.color}20 0%, ${feature.color}05 100%)`,
                                border: `2px solid ${isActive ? feature.color : 'transparent'}`
                              }}
                            >
                              <Icon 
                                className="h-8 w-8 transition-all duration-500"
                                style={{ color: feature.color }}
                              />
                              
                              {/* Pulse ring on hover */}
                              {isActive && (
                                <div 
                                  className="absolute inset-0 rounded-2xl animate-ping"
                                  style={{ backgroundColor: feature.color, opacity: 0.15 }}
                                />
                              )}
                            </div>
                            
                            {/* Floating stat badge */}
                            <div className="absolute -bottom-2 -right-2 px-2 py-1 rounded-lg text-xs font-bold text-black shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-90"
                              style={{ backgroundColor: feature.color }}
                            >
                              {feature.stat}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-white mb-2 transition-all duration-300 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-emerald-400 group-hover:to-emerald-300 group-hover:bg-clip-text">
                              {feature.title}
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                              {feature.description}
                            </p>
                          </div>

                          {/* Arrow indicator */}
                          <ArrowRight 
                            className="h-5 w-5 text-emerald-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 shrink-0 mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                <button
                  onClick={() => navigate('/services')}
                  className="group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    Learn How It Works
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button
                  onClick={() => navigate('/demo')}
                  className="group relative px-8 py-4 rounded-xl font-bold border-2 border-emerald-500 text-emerald-400 hover:text-black overflow-hidden transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-emerald-500 -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">
                    Try It Free
                    <Sparkles className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                  </span>
                </button>
              </div>
            </div>

            {/* Right Visual - 3 columns - Much Larger */}
            <div className="lg:col-span-3 relative flex items-center justify-center">
              {/* Massive glowing orb background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-200 h-200 bg-gradient-radial from-emerald-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl animate-pulse-slow" />
              </div>

              {/* Main visual container */}
              <div className="relative w-full max-w-225 aspect-square">
                {/* Rotating outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/20 animate-spin-slow" />
                
                {/* Counter-rotating middle ring */}
                <div className="absolute inset-12 rounded-full border-2 border-dashed border-emerald-400/30 animate-spin-reverse" />

                {/* Central visual platform */}
                <div className="absolute inset-24 bg-gray-900/90 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-emerald-500/10 border border-emerald-500/20 overflow-hidden">
                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 opacity-5">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                      }}
                    />
                  </div>

                  {/* Scanning line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-500 to-transparent animate-scan-line" />

                  {/* 3D Network Visualization */}
                  <svg
                    viewBox="0 0 600 600"
                    className="w-full h-full relative z-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                      <linearGradient id="emeraldLightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#6ee7b7" />
                      </linearGradient>
                      <radialGradient id="glowGradient">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </radialGradient>
                      
                      {/* Filter for glow effect */}
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Outer orbital ring */}
                    <g className="origin-center" style={{ transformBox: 'fill-box', animation: 'rotate-slow 30s linear infinite' }}>
                      <circle
                        cx="300"
                        cy="300"
                        r="240"
                        fill="none"
                        stroke="url(#emeraldGradient)"
                        strokeWidth="3"
                        strokeDasharray="15 15"
                        opacity="0.4"
                      />
                      
                      {/* Orbital nodes */}
                      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                        const radian = (angle * Math.PI) / 180;
                        const x = 300 + 240 * Math.cos(radian);
                        const y = 300 + 240 * Math.sin(radian);
                        return (
                          <g key={i}>
                            {/* Glow */}
                            <circle cx={x} cy={y} r="20" fill="url(#glowGradient)" opacity="0.6">
                              <animate
                                attributeName="r"
                                values="15;25;15"
                                dur="3s"
                                begin={`${i * 0.3}s`}
                                repeatCount="indefinite"
                              />
                            </circle>
                            
                            {/* Node */}
                            <circle cx={x} cy={y} r="12" fill="url(#emeraldGradient)" filter="url(#glow)">
                              <animate
                                attributeName="r"
                                values="10;14;10"
                                dur="3s"
                                begin={`${i * 0.3}s`}
                                repeatCount="indefinite"
                              />
                            </circle>
                          </g>
                        );
                      })}
                    </g>

                    {/* Middle pulsing network */}
                    <g>
                      {/* Connection web */}
                      {[
                        [300, 180, 180, 300],
                        [300, 180, 420, 300],
                        [300, 180, 300, 420],
                        [180, 300, 420, 300],
                        [180, 300, 300, 420],
                        [420, 300, 300, 420],
                      ].map((coords, i) => (
                        <line
                          key={i}
                          x1={coords[0]}
                          y1={coords[1]}
                          x2={coords[2]}
                          y2={coords[3]}
                          stroke="url(#emeraldGradient)"
                          strokeWidth="2"
                          strokeDasharray="8 8"
                          opacity="0.3"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            values="0;16"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.2;0.5;0.2"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </line>
                      ))}

                      {/* Cardinal nodes */}
                      {[
                        { x: 300, y: 180, icon: 'shield' },
                        { x: 180, y: 300, icon: 'lock' },
                        { x: 420, y: 300, icon: 'network' },
                        { x: 300, y: 420, icon: 'layers' }
                      ].map((node, i) => (
                        <g key={i}>
                          {/* Outer pulse ring */}
                          <circle cx={node.x} cy={node.y} r="25" fill="none" stroke="#10b981" strokeWidth="2" opacity="0">
                            <animate
                              attributeName="r"
                              values="20;35;20"
                              dur="3s"
                              begin={`${i * 0.5}s`}
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              values="0.6;0;0.6"
                              dur="3s"
                              begin={`${i * 0.5}s`}
                              repeatCount="indefinite"
                            />
                          </circle>

                          {/* Node background */}
                          <circle cx={node.x} cy={node.y} r="20" fill="#1f2937" stroke="url(#emeraldGradient)" strokeWidth="3" />
                          
                          {/* Icon placeholder (simplified geometric shapes) */}
                          {node.icon === 'shield' && (
                            <path
                              d={`M ${node.x} ${node.y - 8} L ${node.x + 8} ${node.y - 3} V ${node.y + 5} C ${node.x + 8} ${node.y + 10} ${node.x} ${node.y + 13} ${node.x} ${node.y + 13} C ${node.x} ${node.y + 13} ${node.x - 8} ${node.y + 10} ${node.x - 8} ${node.y + 5} V ${node.y - 3} Z`}
                              fill="url(#emeraldGradient)"
                            />
                          )}
                          {node.icon === 'lock' && (
                            <g>
                              <rect x={node.x - 6} y={node.y} width="12" height="8" fill="url(#emeraldGradient)" rx="1" />
                              <path d={`M ${node.x - 4} ${node.y} V ${node.y - 3} Q ${node.x - 4} ${node.y - 6} ${node.x} ${node.y - 6} Q ${node.x + 4} ${node.y - 6} ${node.x + 4} ${node.y - 3} V ${node.y}`} fill="none" stroke="url(#emeraldGradient)" strokeWidth="2" />
                            </g>
                          )}
                          {node.icon === 'network' && (
                            <g>
                              <circle cx={node.x} cy={node.y - 4} r="2" fill="url(#emeraldGradient)" />
                              <circle cx={node.x - 5} cy={node.y + 3} r="2" fill="url(#emeraldGradient)" />
                              <circle cx={node.x + 5} cy={node.y + 3} r="2" fill="url(#emeraldGradient)" />
                              <line x1={node.x} y1={node.y - 4} x2={node.x - 5} y2={node.y + 3} stroke="url(#emeraldGradient)" strokeWidth="1.5" />
                              <line x1={node.x} y1={node.y - 4} x2={node.x + 5} y2={node.y + 3} stroke="url(#emeraldGradient)" strokeWidth="1.5" />
                            </g>
                          )}
                          {node.icon === 'layers' && (
                            <g>
                              <rect x={node.x - 7} y={node.y - 6} width="14" height="3" fill="url(#emeraldGradient)" rx="1" />
                              <rect x={node.x - 7} y={node.y - 1} width="14" height="3" fill="url(#emeraldGradient)" rx="1" opacity="0.7" />
                              <rect x={node.x - 7} y={node.y + 4} width="14" height="3" fill="url(#emeraldGradient)" rx="1" opacity="0.4" />
                            </g>
                          )}
                        </g>
                      ))}
                    </g>

                    {/* Central AI core */}
                    <g>
                      {/* Outer glow */}
                      <circle cx="300" cy="300" r="90" fill="url(#glowGradient)" opacity="0.4">
                        <animate
                          attributeName="r"
                          values="85;95;85"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.3;0.5;0.3"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* Main shield */}
                      <path
                        d="M300 240 L345 260 V310 C345 350 300 380 300 380 C300 380 255 350 255 310 V260 Z"
                        fill="url(#emeraldGradient)"
                        stroke="#34d399"
                        strokeWidth="4"
                        filter="url(#glow)"
                      />
                      
                      {/* Inner highlight */}
                      <path
                        d="M300 250 L335 265 V305 C335 340 300 365 300 365 C300 365 265 340 265 305 V265 Z"
                        fill="white"
                        opacity="0.2"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.15;0.3;0.15"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </path>

                      {/* AI Circuit pattern */}
                      <g opacity="0.9">
                        <rect x="285" y="290" width="30" height="30" fill="none" stroke="#34d399" strokeWidth="2" rx="3" />
                        <line x1="290" y1="295" x2="290" y2="315" stroke="#1f2937" strokeWidth="2" />
                        <line x1="295" y1="295" x2="295" y2="315" stroke="#1f2937" strokeWidth="2" />
                        <line x1="300" y1="295" x2="300" y2="315" stroke="#1f2937" strokeWidth="2" />
                        <line x1="305" y1="295" x2="305" y2="315" stroke="#1f2937" strokeWidth="2" />
                        <line x1="310" y1="295" x2="310" y2="315" stroke="#1f2937" strokeWidth="2" />
                      </g>

                      {/* Text label */}
                      <text
                        x="300"
                        y="235"
                        textAnchor="middle"
                        fontSize="20"
                        fontWeight="bold"
                        fill="white"
                        opacity="0.95"
                        letterSpacing="2"
                      >
                        AI CORE
                      </text>
                      <text
                        x="300"
                        y="462"
                        textAnchor="middle"
                        fontSize="12"
                        fill="#34d399"
                        opacity="0.9"
                      >
                        POWERED INTELLIGENCE
                      </text>
                    </g>

                    {/* Data particles floating */}
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 30) * Math.PI / 180;
                      const radius = 140 + (i % 3) * 30;
                      const x = 300 + radius * Math.cos(angle);
                      const y = 300 + radius * Math.sin(angle);
                      
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="3"
                          fill="#10b981"
                          opacity="0.7"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from={`0 300 300`}
                            to={`360 300 300`}
                            dur={`${20 + i * 2}s`}
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.4;0.9;0.4"
                            dur="3s"
                            begin={`${i * 0.2}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      );
                    })}
                  </svg>

                  {/* Corner decorations */}
                  <div className="absolute top-6 left-6 w-12 h-12 border-l-3 border-t-3 border-emerald-500 rounded-tl-2xl" />
                  <div className="absolute top-6 right-6 w-12 h-12 border-r-3 border-t-3 border-emerald-500 rounded-tr-2xl" />
                  <div className="absolute bottom-6 left-6 w-12 h-12 border-l-3 border-b-3 border-emerald-500 rounded-bl-2xl" />
                  <div className="absolute bottom-6 right-6 w-12 h-12 border-r-3 border-b-3 border-emerald-500 rounded-br-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-slower {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 35s linear infinite;
        }

        .animate-scan-line {
          animation: scan-line 4s linear infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .border-l-3,
        .border-r-3,
        .border-t-3,
        .border-b-3 {
          border-width: 3px;
        }
      `}</style>
    </section>
  );
};

export default HomeBuildContent;