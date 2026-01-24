import { useStore } from '../../hooks/useStore';
import HeroCarousel from '../../components/common/HeroCarousel';
import { Shield, Zap, Clock, Sparkles, ArrowRight, TrendingUp, Award, Users, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const HomePage = () => {
  const { setPage } = useStore();
  const navigate = useNavigate();

  const Counter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    const startCounting = () => {
      let start = 0;
      const increment = end / (duration / 20);
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setCount(Math.floor(start));
      }, 20);
    };

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startCounting();
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) observer.observe(ref.current);

      return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
  };

  const marqueeItems = [
    { icon: TrendingUp, text: '10,000+ Patents Protected', color: '#C9A94D' },
    { icon: Award, text: '99.9% Success Rate', color: '#191970' },
    { icon: Users, text: '5,000+ Satisfied Clients', color: '#C9A94D' },
    { icon: Globe, text: 'Operating in 50+ Countries', color: '#191970' },
    { icon: Shield, text: 'Military-Grade Security', color: '#C9A94D' },
    { icon: Zap, text: 'AI-Powered Analysis', color: '#191970' },
  ];

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
      
      <div className="max-w-350 mx-auto px-4 py-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#191970] mb-4">
            Experience the Future of Patent Protection
          </h2>
          <p className="text-xl text-[#555] max-w-2xl mx-auto">
            Cutting-edge AI technology meets expert legal guidance
          </p>
        </div>

        {/* Marquee Section */}
        <div className="mb-20 overflow-hidden relative -mx-4 md:-mx-8 lg:-mx-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-10 -translate-y-1/2 w-32 h-32 bg-[#191970]/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 right-10 -translate-y-1/2 w-40 h-40 bg-[#C9A94D]/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-28 h-28 bg-[#2e3a8c]/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-36 h-36 bg-[#191970]/5 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative bg-transparent border-y-2 border-[#191970]/10 py-8 backdrop-blur-sm">
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-linear-to-r from-[#EDEADC] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-linear-to-l from-[#EDEADC] to-transparent z-10"></div>
            
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .marquee-content {
                animation: marquee 15s linear infinite;
              }
              .marquee-content:hover {
                animation-play-state: paused;
              }
            `}</style>
            
            <div className="flex marquee-content">
              {marqueeItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`first-${index}`}
                    className="flex items-center gap-3 px-8 whitespace-nowrap"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/40 backdrop-blur-sm shadow-sm"
                      style={{ borderColor: item.color, borderWidth: '2px' }}
                    >
                      <Icon className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                    <span className="text-[#191970] font-semibold text-lg">
                      {item.text}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A94D] mx-4"></div>
                  </div>
                );
              })}
              
              {marqueeItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={`second-${index}`}
                    className="flex items-center gap-3 px-8 whitespace-nowrap"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/40 backdrop-blur-sm shadow-sm"
                      style={{ borderColor: item.color, borderWidth: '2px' }}
                    >
                      <Icon className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                    <span className="text-[#191970] font-semibold text-lg">
                      {item.text}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A94D] mx-4"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PATENT AI SECTION */}
        <section className="max-w-350 mx-auto px-4 py-24 mb-20">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2 md:ml-auto md:pr-8">
              <div className="inline-flex items-center gap-2 bg-[#191970]/10 text-[#191970] px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-[#C9A94D]" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Patent Intelligence
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-[#191970] mb-6 leading-tight">
                Built with <span className="text-[#C9A94D]">AI at the Core</span>
              </h2>

              <p className="text-lg text-[#555] mb-8 leading-relaxed">
                Patent Gap AI combines artificial intelligence, legal expertise, and
                real-time monitoring to help innovators protect what matters most —
                faster, smarter, and with confidence.
              </p>

              <style>{`
                @keyframes slide-in-right {
                  from {
                    opacity: 0;
                    transform: translateX(-20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
                @keyframes icon-float {
                  0%, 100% {
                    transform: translateY(0px);
                  }
                  50% {
                    transform: translateY(-5px);
                  }
                }
                @keyframes icon-pulse {
                  0%, 100% {
                    box-shadow: 0 0 0 0 rgba(201, 169, 77, 0.4);
                  }
                  50% {
                    box-shadow: 0 0 0 10px rgba(201, 169, 77, 0);
                  }
                }
                .feature-item {
                  animation: slide-in-right 0.6s ease-out forwards;
                  opacity: 0;
                }
                .feature-item:nth-child(1) { animation-delay: 0.1s; }
                .feature-item:nth-child(2) { animation-delay: 0.2s; }
                .feature-item:nth-child(3) { animation-delay: 0.3s; }
                .feature-item:nth-child(4) { animation-delay: 0.4s; }
                .feature-item:hover .feature-icon {
                  animation: icon-float 1s ease-in-out infinite;
                }
                .feature-icon {
                  transition: all 0.3s ease;
                }
                .feature-item:hover .feature-icon {
                  transform: scale(1.1);
                }
              `}</style>

              <ul className="space-y-5 mb-8">
                <li className="feature-item group flex items-start gap-4 bg-white/30 backdrop-blur-sm p-5 rounded-xl border border-[#191970]/10 hover:bg-white/50 hover:border-[#C9A94D]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="feature-icon w-12 h-12 rounded-full bg-linear-to-br from-[#C9A94D]/20 to-[#C9A94D]/5 flex items-center justify-center shrink-0 mt-0.5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-[#C9A94D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Shield className="h-6 w-6 text-[#C9A94D] relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#191970] mb-1 group-hover:text-[#C9A94D] transition-colors duration-300">Automated Prior-Art Analysis</div>
                    <div className="text-sm text-[#555] group-hover:text-[#333] transition-colors duration-300">AI scans millions of patents to identify potential conflicts and strengthen your application</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#C9A94D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
                </li>
                <li className="feature-item group flex items-start gap-4 bg-white/30 backdrop-blur-sm p-5 rounded-xl border border-[#191970]/10 hover:bg-white/50 hover:border-[#191970]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="feature-icon w-12 h-12 rounded-full bg-linear-to-br from-[#191970]/20 to-[#191970]/5 flex items-center justify-center shrink-0 mt-0.5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-[#191970]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Zap className="h-6 w-6 text-[#191970] relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#191970] mb-1 group-hover:text-[#191970] transition-colors duration-300">Intelligent Drafting Assistant</div>
                    <div className="text-sm text-[#555] group-hover:text-[#333] transition-colors duration-300">Natural language processing helps create comprehensive, legally sound patent claims</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#191970] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
                </li>
                <li className="feature-item group flex items-start gap-4 bg-white/30 backdrop-blur-sm p-5 rounded-xl border border-[#191970]/10 hover:bg-white/50 hover:border-[#C9A94D]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="feature-icon w-12 h-12 rounded-full bg-linear-to-br from-[#C9A94D]/20 to-[#C9A94D]/5 flex items-center justify-center shrink-0 mt-0.5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-[#C9A94D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Clock className="h-6 w-6 text-[#C9A94D] relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#191970] mb-1 group-hover:text-[#C9A94D] transition-colors duration-300">24/7 Portfolio Monitoring</div>
                    <div className="text-sm text-[#555] group-hover:text-[#333] transition-colors duration-300">Continuous surveillance with instant alerts on potential infringements and market changes</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#C9A94D] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
                </li>
                <li className="feature-item group flex items-start gap-4 bg-white/30 backdrop-blur-sm p-5 rounded-xl border border-[#191970]/10 hover:bg-white/50 hover:border-[#191970]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="feature-icon w-12 h-12 rounded-full bg-linear-to-br from-[#191970]/20 to-[#191970]/5 flex items-center justify-center shrink-0 mt-0.5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-[#191970]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Globe className="h-6 w-6 text-[#191970] relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[#191970] mb-1 group-hover:text-[#191970] transition-colors duration-300">Global Patent Intelligence</div>
                    <div className="text-sm text-[#555] group-hover:text-[#333] transition-colors duration-300">Track international filings and competitive landscapes across 50+ countries</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#191970] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 shrink-0 mt-1" />
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/services')}
                  className="inline-flex items-center justify-center gap-3 bg-[#191970] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all"
                >
                  Learn How It Works
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate('/demo')}
                  className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-[#191970] text-[#191970] px-8 py-4 rounded-xl font-bold hover:bg-[#191970] hover:text-white transition-all"
                >
                  Try It Free
                  <Sparkles className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative md:col-span-3 md:pl-8">
              <div className="absolute inset-0 bg-[#191970]/20 rounded-3xl blur-3xl animate-pulse" />

              <div className="relative bg-white/50 backdrop-blur border border-[#dcdab4]/50 rounded-3xl p-10 shadow-xl">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="origin-center animate-[spin_18s_linear_infinite]">
                    <circle
                      cx="200"
                      cy="200"
                      r="160"
                      fill="none"
                      stroke="#191970"
                      strokeWidth="2"
                      strokeDasharray="10 10"
                    />
                  </g>

                  <circle
                    cx="200"
                    cy="200"
                    r="120"
                    fill="none"
                    stroke="#C9A94D"
                    strokeWidth="2"
                    opacity="0.3"
                  >
                    <animate
                      attributeName="r"
                      values="115;125;115"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.15;0.35;0.15"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {[
                    [200, 120],
                    [120, 200],
                    [280, 200],
                    [200, 280],
                  ].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="8" fill="#C9A94D">
                      <animate
                        attributeName="r"
                        values="6;10;6"
                        dur="2.5s"
                        begin={`${i * 0.4}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}

                  {[
                    [200, 120],
                    [120, 200],
                    [280, 200],
                    [200, 280],
                  ].map(([x, y], i) => (
                    <line
                      key={i}
                      x1={x}
                      y1={y}
                      x2="200"
                      y2="200"
                      stroke="#191970"
                      strokeWidth="2"
                      strokeDasharray="4 6"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;20"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </line>
                  ))}

                  <g>
                    <path
                      d="M200 160 L245 180 V220 C245 255 200 280 200 280 C200 280 155 255 155 220 V180 Z"
                      fill="#C9A94D"
                      stroke="#191970"
                      strokeWidth="2"
                    />
                    <text
                      x="200"
                      y="220"
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="bold"
                      fill="#191970"
                    >
                      AI PATENT
                    </text>
                  </g>

                  <circle cx="200" cy="200" r="60" fill="#191970" opacity="0.04">
                    <animate
                      attributeName="opacity"
                      values="0.02;0.06;0.02"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* INTELLIGENT PATENT PROTECTION SECTION */}
        <section className="max-w-350 mx-auto px-4 py-24 mb-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1 md:pr-8">
              <div className="absolute inset-0 bg-[#191970]/15 rounded-3xl blur-3xl animate-pulse" />

              <div className="relative bg-linear-to-br from-[#070738] via-[#191970] to-[#2e3a8c] rounded-3xl p-10 shadow-2xl border border-white/10">
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                        opacity: 0.6
                      }}
                    />
                  ))}
                </div>

                <style>{`
                  @keyframes float-card {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-8px) translateX(4px); }
                    66% { transform: translateY(-4px) translateX(-4px); }
                  }
                  @keyframes twinkle {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 1; }
                  }
                `}</style>

                <svg
                  viewBox="0 0 400 500"
                  className="w-full h-auto relative z-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text x="200" y="40" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#C9A94D">
                    Patent Analysis System
                  </text>

                  <rect x="50" y="60" width="300" height="380" rx="12" fill="#1e293b" opacity="0.4" />
                  <rect x="50" y="60" width="300" height="380" rx="12" fill="none" stroke="#C9A94D" strokeWidth="2" opacity="0.6" />

                  <g>
                    <text x="80" y="95" fontSize="11" fill="#94a3b8" fontWeight="600">Last Scan</text>
                    <text x="80" y="112" fontSize="9" fill="#cbd5e1">2 mins ago</text>
                    
                    <rect x="200" y="85" width="130" height="30" rx="8" fill="#0f172a" opacity="0.6" />
                    <text x="265" y="100" textAnchor="middle" fontSize="10" fill="#10b981" fontWeight="bold">Match</text>
                    <rect x="210" y="107" width="110" height="4" rx="2" fill="#1e293b" />
                    <rect x="210" y="107" width="85" height="4" rx="2" fill="#10b981">
                      <animate attributeName="width" values="0;85;85" dur="2s" repeatCount="indefinite" />
                    </rect>
                  </g>

                  <text x="70" y="145" fontSize="12" fill="#e2e8f0" fontWeight="600">Key Overlapping Patents</text>
                  
                  <g style={{ animation: 'float-card 4s ease-in-out infinite' }}>
                    <rect x="70" y="160" width="260" height="50" rx="8" fill="#334155" opacity="0.7" />
                    <rect x="70" y="160" width="260" height="50" rx="8" fill="none" stroke="#64748b" strokeWidth="1" />
                    <circle cx="85" cy="185" r="8" fill="#ef4444" />
                    <text x="105" y="180" fontSize="10" fill="#f1f5f9" fontWeight="600">US 10,234,567</text>
                    <text x="105" y="195" fontSize="8" fill="#94a3b8">Machine Learning Classification</text>
                  </g>

                  <g style={{ animation: 'float-card 4s ease-in-out infinite', animationDelay: '0.5s' }}>
                    <rect x="70" y="220" width="260" height="50" rx="8" fill="#334155" opacity="0.7" />
                    <rect x="70" y="220" width="260" height="50" rx="8" fill="none" stroke="#64748b" strokeWidth="1" />
                    <circle cx="85" cy="245" r="8" fill="#f59e0b" />
                    <text x="105" y="240" fontSize="10" fill="#f1f5f9" fontWeight="600">US 10,876,543</text>
                    <text x="105" y="255" fontSize="8" fill="#94a3b8">Neural Network Architecture</text>
                  </g>

                  <g style={{ animation: 'float-card 4s ease-in-out infinite', animationDelay: '1s' }}>
                    <rect x="70" y="280" width="260" height="50" rx="8" fill="#334155" opacity="0.7" />
                    <rect x="70" y="280" width="260" height="50" rx="8" fill="none" stroke="#64748b" strokeWidth="1" />
                    <circle cx="85" cy="305" r="8" fill="#10b981" />
                    <text x="105" y="300" fontSize="10" fill="#f1f5f9" fontWeight="600">US 11,456,789</text>
                    <text x="105" y="315" fontSize="8" fill="#94a3b8">AI Training Methods</text>
                  </g>

                  <g style={{ animation: 'float-card 3s ease-in-out infinite', animationDelay: '0.3s' }}>
                    <rect x="70" y="350" width="260" height="40" rx="8" fill="#10b981" opacity="0.9" />
                    <text x="200" y="375" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="bold">
                      → View Claim Chart
                    </text>
                  </g>

                  <g opacity="0.8">
                    <circle cx="90" cy="415" r="12" fill="#0f172a" />
                    <text x="90" y="420" textAnchor="middle" fontSize="14" fill="#10b981">✓</text>
                    <text x="110" y="420" fontSize="9" fill="#94a3b8">Analyzed</text>

                    <circle cx="190" cy="415" r="12" fill="#0f172a" />
                    <circle cx="190" cy="415" r="6" fill="#f59e0b">
                      <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="210" y="420" fontSize="9" fill="#94a3b8">Processing</text>

                    <circle cx="290" cy="415" r="12" fill="#0f172a" />
                    <text x="290" y="420" textAnchor="middle" fontSize="14" fill="#64748b">⏰</text>
                    <text x="310" y="420" fontSize="9" fill="#94a3b8">Queued</text>
                  </g>

                  <circle cx="340" cy="75" r="4" fill="#10b981" opacity="0.8">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="340" cy="425" r="4" fill="#C9A94D" opacity="0.8">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </div>

            <div className="order-1 md:order-2 md:pl-8">
              <div className="inline-flex items-center gap-2 bg-[#C9A94D]/10 text-[#C9A94D] px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Advanced Technology
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-[#191970] mb-6 leading-tight">
                Intelligent Patent Protection <span className="text-[#C9A94D]">Powered by Advanced AI</span>
              </h2>

              <p className="text-lg text-[#555] mb-8 leading-relaxed">
                Our cutting-edge artificial intelligence platform analyzes millions of patents in seconds, 
                ensuring your innovation receives the strongest possible protection.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/50 backdrop-blur-sm border border-[#191970]/10 rounded-xl p-4 text-center shadow-sm">
                  <div className="text-3xl font-bold text-[#191970] mb-1">
                    <Counter end={50000} />
                  </div>
                  <div className="text-xs text-[#555] uppercase tracking-wide">Patents Filed</div>
                </div>

                <div className="bg-white/50 backdrop-blur-sm border border-[#191970]/10 rounded-xl p-4 text-center shadow-sm">
                  <div className="text-3xl font-bold text-[#C9A94D] mb-1">
                    <Counter end={98} suffix="%" />
                  </div>
                  <div className="text-xs text-[#555] uppercase tracking-wide">Success Rate</div>
                </div>

                <div className="bg-white/50 backdrop-blur-sm border border-[#191970]/10 rounded-xl p-4 text-center shadow-sm">
                  <div className="text-3xl font-bold text-[#191970] mb-1">
                    <Counter end={24} suffix="h" />
                  </div>
                  <div className="text-xs text-[#555] uppercase tracking-wide">Hour Processing</div>
                </div>
              </div>

              <style>{`
                @keyframes slide-in-left {
                  from {
                    opacity: 0;
                    transform: translateX(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
                @keyframes icon-bounce {
                  0%, 100% {
                    transform: translateY(0px);
                  }
                  50% {
                    transform: translateY(-8px);
                  }
                }
                @keyframes glow-pulse {
                  0%, 100% {
                    box-shadow: 0 0 5px rgba(201, 169, 77, 0.3);
                  }
                  50% {
                    box-shadow: 0 0 20px rgba(201, 169, 77, 0.6);
                  }
                }
                .tech-feature-item {
                  animation: slide-in-left 0.6s ease-out forwards;
                  opacity: 0;
                }
                .tech-feature-item:nth-child(1) { animation-delay: 0.1s; }
                .tech-feature-item:nth-child(2) { animation-delay: 0.2s; }
                .tech-feature-item:nth-child(3) { animation-delay: 0.3s; }
                .tech-feature-item:hover .tech-icon-wrapper {
                  animation: icon-bounce 0.6s ease-in-out;
                }
              `}</style>

              <ul className="space-y-4 mb-10">
                <li className="tech-feature-item group flex items-start gap-4 bg-white/30 backdrop-blur-sm p-4 rounded-xl border border-[#191970]/10 hover:bg-linear-to-r hover:from-white/60 hover:to-white/40 hover:border-[#C9A94D]/40 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#C9A94D]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="tech-icon-wrapper w-10 h-10 rounded-full bg-[#C9A94D]/10 flex items-center justify-center shrink-0 relative z-10 group-hover:bg-linear-to-br group-hover:from-[#C9A94D]/30 group-hover:to-[#FFD700]/20 transition-all duration-300">
                    <Shield className="h-5 w-5 text-[#C9A94D] group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <div className="font-bold text-[#191970] mb-1 group-hover:text-[#C9A94D] transition-colors duration-300 flex items-center gap-2">
                      AI-Powered Prior Art Search
                      <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="text-sm text-[#555] group-hover:text-[#333] transition-colors duration-300">Comprehensive patent database analysis using neural networks</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#C9A94D] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 shrink-0 mt-2 relative z-10" />
                </li>
                <li className="tech-feature-item group flex items-start gap-4 bg-white/30 backdrop-blur-sm p-4 rounded-xl border border-[#191970]/10 hover:bg-linear-to-r hover:from-white/60 hover:to-white/40 hover:border-[#191970]/40 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#191970]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="tech-icon-wrapper w-10 h-10 rounded-full bg-[#191970]/10 flex items-center justify-center shrink-0 relative z-10 group-hover:bg-linear-to-br group-hover:from-[#191970]/30 group-hover:to-[#4a5fa8]/20 transition-all duration-300">
                    <Zap className="h-5 w-5 text-[#191970] group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <div className="font-bold text-[#191970] mb-1 transition-colors duration-300 flex items-center gap-2">
                      Automated Claim Generation
                      <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="text-sm text-[#555] group-hover:text-[#333] transition-colors duration-300">Natural language processing creates optimized patent claims</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#191970] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 shrink-0 mt-2 relative z-10" />
                </li>
                <li className="tech-feature-item group flex items-start gap-4 bg-white/30 backdrop-blur-sm p-4 rounded-xl border border-[#191970]/10 hover:bg-linear-to-r hover:from-white/60 hover:to-white/40 hover:border-[#C9A94D]/40 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#C9A94D]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="tech-icon-wrapper w-10 h-10 rounded-full bg-[#C9A94D]/10 flex items-center justify-center shrink-0 relative z-10 group-hover:bg-linear-to-br group-hover:from-[#C9A94D]/30 group-hover:to-[#FFD700]/20 transition-all duration-300">
                    <Clock className="h-5 w-5 text-[#C9A94D] group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <div className="font-bold text-[#191970] mb-1 group-hover:text-[#C9A94D] transition-colors duration-300 flex items-center gap-2">
                      Real-Time Monitoring
                      <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="text-sm text-[#555] group-hover:text-[#333] transition-colors duration-300">24/7 AI surveillance of patent landscapes and competitors</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#C9A94D] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 shrink-0 mt-2 relative z-10" />
                </li>
              </ul>

              <button
                onClick={() => navigate('/services')}
                className="inline-flex items-center gap-3 bg-[#191970] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all"
              >
                Explore Our Technology
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="max-w-350 mx-auto px-4 py-24 mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#C9A94D]/10 text-[#C9A94D] px-6 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase tracking-wide">Client Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#191970] mb-4">
              Trusted by Innovators Worldwide
            </h2>
            <p className="text-xl text-[#555] max-w-2xl mx-auto">
              See how we've helped protect groundbreaking innovations
            </p>
          </div>

          <style>{`
            @keyframes slide-up {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes shine {
              0% { background-position: -200% center; }
              100% { background-position: 200% center; }
            }
            .testimonial-card {
              animation: slide-up 0.6s ease-out forwards;
              opacity: 0;
            }
            .testimonial-card:nth-child(1) { animation-delay: 0.1s; }
            .testimonial-card:nth-child(2) { animation-delay: 0.2s; }
            .testimonial-card:nth-child(3) { animation-delay: 0.3s; }
            .quote-mark {
              font-family: Georgia, serif;
              font-size: 4rem;
              line-height: 1;
              opacity: 0.1;
            }
          `}</style>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "CTO, TechVision AI",
                company: "Silicon Valley",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
                quote: "Patent Gap AI transformed our IP strategy. Their AI-powered analysis identified protection gaps we never knew existed, saving us millions in potential litigation.",
                rating: 5,
                gradient: "from-[#C9A94D] to-[#FFD700]"
              },
              {
                name: "Michael Rodriguez",
                role: "Founder & CEO",
                company: "NanoMed Solutions",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
                quote: "The speed and accuracy of their patent monitoring is unmatched. We received real-time alerts on potential infringements, allowing us to act immediately.",
                rating: 5,
                gradient: "from-[#191970] to-[#4a5fa8]"
              },
              {
                name: "Emily Watson",
                role: "IP Director",
                company: "BioInnovate Labs",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
                quote: "Working with Patent Gap AI has been game-changing. Their team's expertise combined with cutting-edge technology gives us confidence in our patent portfolio.",
                rating: 5,
                gradient: "from-[#C9A94D] to-[#B2923E]"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card group relative bg-white/60 backdrop-blur-sm border-2 border-[#dcdab4]/40 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(120deg, transparent 0%, rgba(201, 169, 77, 0.1) 50%, transparent 100%)`,
                    backgroundSize: '200% 100%',
                    animation: 'shine 2s ease-in-out infinite'
                  }}
                />

                <div 
                  className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${testimonial.gradient} opacity-5 rounded-bl-full`}
                />

                <div className="quote-mark text-[#191970] absolute top-4 left-4">"</div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md group-hover:scale-110 transition-transform duration-300"
                      />
                      <div 
                        className={`absolute -bottom-1 -right-1 w-6 h-6 bg-linear-to-br ${testimonial.gradient} rounded-full flex items-center justify-center shadow-md`}
                      >
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#191970] text-lg group-hover:text-[#C9A94D] transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-[#555]">{testimonial.role}</p>
                      <p className="text-xs text-[#777]">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-[#C9A94D] group-hover:scale-110 transition-transform duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-[#333] leading-relaxed italic text-base group-hover:text-[#191970] transition-colors duration-300">
                    "{testimonial.quote}"
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[#C9A94D] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-semibold">Read Full Story</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl border-2 border-[#C9A94D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#555] mb-4">Join hundreds of satisfied clients protecting their innovations</p>
            <button
              onClick={() => navigate('/testimonials')}
              className="inline-flex items-center gap-2 bg-transparent border-2 border-[#191970] text-[#191970] px-8 py-3 rounded-full font-semibold hover:bg-[#191970] hover:text-white transition-all duration-300 hover:scale-105"
            >
              View All Success Stories
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
        
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-[20px] bg-white/40 border-[1.5px] border-[#dcdab4]/45 shadow-[0_8px_24px_0_rgba(25,25,112,0.09),0_1.5px_6px_0_rgba(25,25,112,0.12),inset_0_0.5px_0.5px_0_rgba(255,255,255,0.40)] backdrop-blur-sm backdrop-saturate-120 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(0,0,0,0.20),0_12px_25px_rgba(0,0,0,0.1)] cursor-pointer"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <img 
                    src={feature.bgImage} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-90`}></div>
                </div>

                <div className="relative z-10 p-8 text-center">
                  <div className="mb-6 relative">
                    <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                    <div className="relative bg-white/80 group-hover:bg-white w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                      <Icon 
                        className={`h-10 w-10 ${feature.iconColor} group-hover:scale-110 transition-transform duration-500`}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-[#0A1F14] group-hover:text-white transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-[#555] group-hover:text-white/90 transition-colors duration-500 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="inline-flex items-center gap-2 text-white font-semibold">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${feature.gradient} opacity-10 rounded-bl-full`}></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <div className="relative overflow-hidden bg-linear-to-br from-[#070738] via-[#191970] to-[#2e3a8c] p-12 rounded-3xl text-center shadow-[0_20px_60px_rgba(25,25,112,0.4)] border border-white/10">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-[#C9A94D] rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#4a5fa8] rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

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
            
            {[...Array(30)].map((_, i) => (
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
              
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

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