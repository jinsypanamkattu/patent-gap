import { useState, useEffect, useRef } from "react";
import { Sparkles, Shield, Zap, Clock, ArrowRight, Brain, Activity, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Counter = ({ end, suffix = "", duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let timer;

    const startCounting = () => {
      let current = 0;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = end / steps;

      clearInterval(timer);

      timer = setInterval(() => {
        current += increment;

        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount(0);
          startCounting();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const HomePatentSection = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Prior Art Search',
      description: 'Deep learning algorithms scan 100M+ patents instantly',
      color: '#34d399',
      stat: '100M+',
      statLabel: 'Patents'
    },
    {
      icon: Zap,
      title: 'Automated Claim Generation',
      description: 'GPT-powered claim drafting with legal precision',
      color: '#6ee7b7',
      stat: '99.8%',
      statLabel: 'Accuracy'
    },
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      description: 'AI agents watch 24/7 for infringement threats',
      color: '#10b981',
      stat: '24/7',
      statLabel: 'Active'
    }
  ];

  const patents = [
    { id: 'US 10,234,567', title: 'ML Classification',    risk: 'high',   color: '#ef4444', match: 92 },
    { id: 'US 10,876,543', title: 'Neural Architecture',  risk: 'medium', color: '#f59e0b', match: 76 },
    { id: 'US 11,456,789', title: 'AI Training Methods',  risk: 'low',    color: '#34d399', match: 45 },
    { id: 'EP 3,456,123',  title: 'Deep Learning Sys',    risk: 'medium', color: '#f59e0b', match: 68 }
  ];

  return (
    <section className="w-screen -ml-[50vw] left-[50%] relative overflow-hiddenpy-12 md:py-8">

      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #34d399 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Animated emerald gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 -right-40 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-emerald-400/8 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-400 mx-auto px-6 md:px-12 lg:px-20 relative pb-8">

        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Intelligent{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-600">
              Patent Protection
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Our cutting-edge AI platform analyzes millions of patents in seconds,
            ensuring your innovation receives the strongest possible protection.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">

          {/* ── Left — Dashboard ── */}
          <div className="relative py-6 lg:py-8">
            {/* Glow ring */}
            <div className="absolute -inset-4 bg-linear-to-r from-emerald-500/20 via-emerald-700/10 to-emerald-500/20 rounded-3xl blur-xl" />

            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-500/20 overflow-hidden">

              {/* Header bar */}
              <div className="bg-linear-to-r from-emerald-900/80 to-black px-8 py-6 border-b border-emerald-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Patent Analysis Dashboard</h3>
                    <p className="text-sm text-emerald-400/70">Real-time AI monitoring</p>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm px-4 py-2 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="p-8">

                {/* Stats bar */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/20">
                    <div className="text-3xl font-black text-emerald-400 mb-1">
                      <Counter end={247} />
                    </div>
                    <div className="text-xs text-gray-400 font-semibold uppercase">Scanned</div>
                  </div>
                  <div className="bg-emerald-700/10 rounded-2xl p-4 border border-emerald-700/20">
                    <div className="text-3xl font-black text-emerald-300 mb-1">
                      <Counter end={4} />
                    </div>
                    <div className="text-xs text-gray-400 font-semibold uppercase">Conflicts</div>
                  </div>
                  <div className="bg-emerald-600/10 rounded-2xl p-4 border border-emerald-600/20">
                    <div className="text-3xl font-black text-emerald-400 mb-1">
                      <Counter end={98} suffix="%" />
                    </div>
                    <div className="text-xs text-gray-400 font-semibold uppercase">Match</div>
                  </div>
                </div>

                {/* Analysis progress */}
                <div className="mb-8 bg-emerald-950/40 rounded-2xl p-6 border border-emerald-500/15">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-white">Deep Analysis Progress</span>
                    <span className="text-sm font-black text-emerald-400">87%</span>
                  </div>
                  <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-linear-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000"
                      style={{ width: '87%' }}
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>

                {/* Patent matches */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-emerald-400" />
                    Overlapping Patents Detected
                  </h4>

                  {patents.map((patent, index) => (
                    <div
                      key={index}
                      className="group relative bg-gray-900/60 backdrop-blur-sm border-2 rounded-xl p-4 hover:shadow-xl hover:shadow-emerald-900/30 hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden"
                      style={{
                        borderColor: `${patent.color}40`,
                        animation: 'slideInLeft 0.6s ease-out forwards',
                        animationDelay: `${index * 0.1}s`,
                        opacity: 0
                      }}
                    >
                      {/* Glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                        style={{ background: `${patent.color}15` }}
                      />

                      <div className="relative z-10 flex items-center gap-4">
                        {/* Risk indicator */}
                        <div className="relative">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${patent.color}25, ${patent.color}08)`,
                              border: `2px solid ${patent.color}`
                            }}
                          >
                            <span className="text-lg font-black" style={{ color: patent.color }}>
                              {patent.match}
                            </span>
                          </div>
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping" style={{ background: patent.color, opacity: 0.4 }} />
                        </div>

                        {/* Patent info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white mb-1 text-sm">{patent.id}</div>
                          <div className="text-xs text-gray-400">{patent.title}</div>
                        </div>

                        {/* Risk badge */}
                        <div
                          className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                          style={{
                            background: `${patent.color}20`,
                            color: patent.color
                          }}
                        >
                          {patent.risk}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action button */}
                <button className="w-full mt-6 bg-linear-to-r from-emerald-600 to-emerald-500 text-black font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/40 hover:shadow-emerald-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                  <span className="flex items-center justify-center gap-2">
                    Generate Full Report
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-emerald-500/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-linear-to-tr from-emerald-700/10 to-transparent rounded-tr-full" />
            </div>

            {/* Floating info cards */}
            <div className="absolute -top-8 -right-8 bg-linear-to-br from-emerald-500 to-emerald-700 text-black px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-900/50 border border-emerald-400/30 animate-float-slow hidden lg:block z-10">
              <div className="text-3xl font-black mb-1">2.4s</div>
              <div className="text-xs font-semibold opacity-80">Avg Analysis</div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-black border border-emerald-500/40 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-emerald-900/30 animate-float-slow hidden lg:block z-10" style={{ animationDelay: '1s' }}>
              <div className="text-3xl font-black text-emerald-400 mb-1">99.8%</div>
              <div className="text-xs text-gray-400 font-semibold">AI Accuracy</div>
            </div>
          </div>

          {/* ── Right — Features & Content ── */}
          <div className="space-y-8 lg:pl-8">

            {/* Main stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 50000, suffix: '+', label: 'Patents Filed',  icon: Shield,    color: '#34d399' },
                { value: 98,    suffix: '%', label: 'Success Rate',   icon: TrendingUp, color: '#10b981' },
                { value: 24,    suffix: '/7', label: 'Monitoring',    icon: Clock,     color: '#6ee7b7' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="relative group bg-gray-900/60 backdrop-blur-sm border border-emerald-500/15 rounded-2xl p-5 hover:bg-gray-900/80 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-900/30 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
                  style={{
                    animation: 'fadeInUp 0.6s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  {/* Shimmer */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  <div className="relative z-10">
                    <stat.icon
                      className="h-6 w-6 mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                      style={{ color: stat.color }}
                    />
                    <div className="text-4xl font-black mb-2" style={{ color: stat.color }}>
                      <Counter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature tabs */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-emerald-500/15 rounded-2xl overflow-hidden shadow-lg">
              {/* Tab headers */}
              <div className="flex border-b border-emerald-500/15">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`flex-1 px-6 py-4 font-bold text-sm transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-linear-to-r from-emerald-700/60 to-emerald-900/60 text-emerald-300 border-b-2 border-emerald-400'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                    }`}
                  >
                    {feature.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className={`transition-all duration-500 ${
                        activeFeature === index ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
                      }`}
                    >
                      <div className="flex items-start gap-6">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-emerald-500/20"
                          style={{
                            background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}05)`
                          }}
                        >
                          <Icon className="h-8 w-8" style={{ color: feature.color }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-black text-white mb-3">
                            {feature.title}
                          </h3>
                          <p className="text-gray-400 leading-relaxed mb-4">
                            {feature.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="bg-emerald-950/60 rounded-xl px-5 py-3 border border-emerald-500/20">
                              <div className="text-2xl font-black mb-1" style={{ color: feature.color }}>
                                {feature.stat}
                              </div>
                              <div className="text-xs text-gray-400 uppercase font-semibold">
                                {feature.statLabel}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key benefits */}
            <div className="space-y-3">
              {[
                'Instant prior art detection across 100M+ patents',
                'AI-generated claims with 99.8% legal accuracy',
                'Real-time infringement monitoring & alerts'
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-900/40 backdrop-blur-sm border border-emerald-500/15 rounded-xl p-4 hover:bg-gray-900/70 hover:border-emerald-500/40 transition-all duration-300"
                  style={{
                    animation: 'slideInRight 0.6s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0
                  }}
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  <span className="text-sm font-semibold text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/services')}
                className="flex-1 group relative px-8 py-5 rounded-xl font-bold text-black overflow-hidden shadow-xl shadow-emerald-900/40 hover:shadow-emerald-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-linear-to-r from-emerald-500 to-emerald-600"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  Explore Technology
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => navigate('/demo')}
                className="group relative px-8 py-5 rounded-xl font-bold border-2 border-emerald-500/60 text-emerald-400 hover:text-black overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-emerald-600 -translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Try Free
                  <Sparkles className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-15px); }
        }

        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .animate-blob           { animation: blob 7s infinite; }
        .animation-delay-2000   { animation-delay: 2s; }
        .animation-delay-4000   { animation-delay: 4s; }
        .animate-float-slow     { animation: float-slow 3s ease-in-out infinite; }
        .animate-shimmer        { animation: shimmer 2s linear infinite; }
      `}</style>
    </section>
  );
};

export default HomePatentSection;
