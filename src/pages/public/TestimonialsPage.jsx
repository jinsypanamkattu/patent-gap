import { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "NeuralTech Labs",
    avatar: "SC",
    rating: 5,
    text: "The AI-powered prior art search completely transformed our patent strategy. What used to take our legal team weeks now happens in seconds. We've filed 3x more patents this year alone.",
    stat: "3x",
    statLabel: "More Patents Filed",
    tag: "AI Search",
    color: "#34d399",
  },
  {
    id: 2,
    name: "Marcus Rivera",
    role: "Head of IP",
    company: "QuantumEdge Inc.",
    avatar: "MR",
    rating: 5,
    text: "The real-time infringement monitoring gave us a critical edge. We caught a competitor infringing on our core patent within 48 hours — saved us millions in potential lost revenue.",
    stat: "$4.2M",
    statLabel: "Revenue Protected",
    tag: "Monitoring",
    color: "#10b981",
  },
  {
    id: 3,
    name: "Dr. Aisha Patel",
    role: "Director of Innovation",
    company: "BioSynth Corp",
    avatar: "AP",
    rating: 5,
    text: "Claim generation accuracy is extraordinary. Our attorneys reviewed the AI-drafted claims and were stunned — 96% needed zero revisions. It's like having a senior patent attorney on call 24/7.",
    stat: "96%",
    statLabel: "Claims Accepted",
    tag: "Claim Generation",
    color: "#6ee7b7",
  },
];

/* ── Tilt + magnetic glow card ── */
const TestimonialCard = ({ testimonial, isActive, onClick }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [scanPos, setScanPos] = useState(-100);
  const scanRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -10;
    const rotY = ((x - cx) / cx) * 10;
    card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(220px circle at ${x}px ${y}px, ${testimonial.color}22, transparent 70%)`;
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
    setScanPos(-100);
    let pos = -100;
    clearInterval(scanRef.current);
    scanRef.current = setInterval(() => {
      pos += 6;
      setScanPos(pos);
      if (pos > 110) clearInterval(scanRef.current);
    }, 10);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
    if (glowRef.current) glowRef.current.style.background = "transparent";
    clearInterval(scanRef.current);
  };

  useEffect(() => () => clearInterval(scanRef.current), []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer rounded-2xl border overflow-hidden"
      style={{
        transition: hovered ? "transform 0.08s ease" : "transform 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease",
        borderColor: isActive ? `${testimonial.color}99` : hovered ? `${testimonial.color}55` : "rgba(16,185,129,0.1)",
        background: isActive ? "rgba(17,24,39,0.92)" : "rgba(3,7,18,0.6)",
        boxShadow: hovered
          ? `0 0 40px ${testimonial.color}22, 0 0 80px ${testimonial.color}10, inset 0 0 30px ${testimonial.color}08`
          : isActive
          ? `0 0 30px ${testimonial.color}18`
          : "none",
      }}
    >
      {/* Magnetic spotlight layer */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-0 transition-all duration-75 rounded-2xl" />

      {/* Scan line sweep on hover */}
      <div
        className="absolute left-0 right-0 h-0.5 pointer-events-none z-20"
        style={{
          top: `${scanPos}%`,
          background: `linear-gradient(90deg, transparent, ${testimonial.color}cc, transparent)`,
          opacity: hovered ? 0.9 : 0,
          filter: `blur(1px) drop-shadow(0 0 6px ${testimonial.color})`,
          transition: "opacity 0.2s",
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 z-10"
        style={{
          background: isActive || hovered
            ? `linear-gradient(90deg, transparent, ${testimonial.color}, transparent)`
            : "transparent",
          transition: "background 0.4s",
        }}
      />

      {/* Corner circuit lines */}
      {hovered && (
        <>
          <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10"
            style={{ borderTop: `1.5px solid ${testimonial.color}99`, borderLeft: `1.5px solid ${testimonial.color}99`, borderRadius: "12px 0 0 0" }} />
          <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-10"
            style={{ borderBottom: `1.5px solid ${testimonial.color}99`, borderRight: `1.5px solid ${testimonial.color}99`, borderRadius: "0 0 12px 0" }} />
        </>
      )}

      <div className="relative z-10 p-6">
        {/* Tag + Rating */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full border transition-all duration-300"
            style={{
              color: testimonial.color,
              borderColor: `${testimonial.color}${hovered ? "80" : "40"}`,
              background: `${testimonial.color}${hovered ? "18" : "10"}`,
              boxShadow: hovered ? `0 0 12px ${testimonial.color}30` : "none",
            }}
          >
            {testimonial.tag}
          </span>
          <div className="flex gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400 transition-all duration-200"
                style={{
                  filter: hovered ? `drop-shadow(0 0 4px #34d399)` : "none",
                  transitionDelay: `${i * 40}ms`,
                  transform: hovered ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Quote icon */}
        <Quote
          className="h-6 w-6 mb-3 transition-all duration-300"
          style={{
            color: hovered ? testimonial.color : "rgba(16,185,129,0.3)",
            filter: hovered ? `drop-shadow(0 0 8px ${testimonial.color})` : "none",
            transform: hovered ? "scale(1.1)" : "scale(1)",
          }}
        />

        {/* Text */}
        <p
          className="text-sm leading-relaxed mb-5 line-clamp-4 transition-colors duration-300"
          style={{ color: hovered ? "#e5e7eb" : "#d1d5db" }}
        >
          {testimonial.text}
        </p>

        {/* Stat */}
        <div
          className="inline-flex flex-col mb-5 px-4 py-2 rounded-xl border transition-all duration-300"
          style={{
            borderColor: `${testimonial.color}${hovered ? "60" : "30"}`,
            background: `${testimonial.color}${hovered ? "15" : "08"}`,
            boxShadow: hovered ? `0 0 20px ${testimonial.color}20` : "none",
          }}
        >
          <span
            className="text-2xl font-black transition-all duration-300"
            style={{
              color: testimonial.color,
              textShadow: hovered ? `0 0 20px ${testimonial.color}` : "none",
            }}
          >
            {testimonial.stat}
          </span>
          <span className="text-xs text-gray-400 font-medium">{testimonial.statLabel}</span>
        </div>

        {/* Author */}
        <div
          className="flex items-center gap-3 pt-4 border-t transition-colors duration-300"
          style={{ borderColor: hovered ? `${testimonial.color}25` : "rgba(16,185,129,0.1)" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-black shrink-0 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}99)`,
              boxShadow: hovered ? `0 0 0 2px ${testimonial.color}60, 0 0 20px ${testimonial.color}40` : "none",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          >
            {testimonial.avatar}
          </div>
          <div>
            <div className="text-sm font-bold transition-colors duration-300"
              style={{ color: hovered ? "#fff" : "#f9fafb" }}>
              {testimonial.name}
            </div>
            <div className="text-xs text-gray-400">{testimonial.role} · {testimonial.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Section ── */
const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const spotlightRef = useRef(null);
  const [spotHovered, setSpotHovered] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const prev = () => { setIsPaused(true); setActiveIndex((p) => (p - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setIsPaused(true); setActiveIndex((p) => (p + 1) % testimonials.length); };
  const active = testimonials[activeIndex];

  const handleSpotMove = (e) => {
    const el = spotlightRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -5;
    const rotY = ((x - cx) / cx) * 5;
    el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const handleSpotLeave = () => {
    setSpotHovered(false);
    if (spotlightRef.current)
      spotlightRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section className="relative w-full overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">

      {/* FIXED: max-w-350 → max-w-6xl (standard Tailwind) */}
      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4 whitespace-nowrap">
            Trusted by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500">
              Innovators
            </span>{" "}
            Worldwide
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From fast-growing startups to global enterprises — see how teams protect their most valuable assets with AI-driven patent intelligence.
          </p>
        </div>

        {/* ── Spotlight card ── */}
        <div className="relative mb-10">
          <div
            className="absolute -inset-4 rounded-3xl blur-2xl transition-all duration-500"
            style={{
              background: spotHovered
                ? `linear-gradient(135deg, ${active.color}25, transparent, ${active.color}15)`
                : "linear-gradient(135deg, rgba(16,185,129,0.1), transparent, rgba(16,185,129,0.08))",
            }}
          />
          <div
            ref={spotlightRef}
            onMouseMove={handleSpotMove}
            onMouseEnter={() => setSpotHovered(true)}
            onMouseLeave={handleSpotLeave}
            className="relative bg-gray-900/80 backdrop-blur-xl border rounded-3xl p-8 md:p-12 overflow-hidden"
            key={active.id}
            style={{
              borderColor: spotHovered ? `${active.color}50` : "rgba(16,185,129,0.3)",
              transition: spotHovered
                ? "transform 0.08s ease, border-color 0.3s, box-shadow 0.3s"
                : "transform 0.5s ease, border-color 0.3s, box-shadow 0.3s",
              boxShadow: spotHovered
                ? `0 0 60px ${active.color}15, inset 0 0 40px ${active.color}05`
                : "none",
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg, transparent, ${active.color}, transparent)` }}
            />

            {/* Animated corner brackets on hover */}
            {spotHovered && (
              <>
                <div className="absolute top-3 left-3 w-10 h-10 pointer-events-none animate-corner-draw"
                  style={{ borderTop: `2px solid ${active.color}`, borderLeft: `2px solid ${active.color}`, borderRadius: "8px 0 0 0" }} />
                <div className="absolute bottom-3 right-3 w-10 h-10 pointer-events-none animate-corner-draw"
                  style={{ borderBottom: `2px solid ${active.color}`, borderRight: `2px solid ${active.color}`, borderRadius: "0 0 8px 0" }} />
                <div className="absolute top-3 right-3 w-10 h-10 pointer-events-none animate-corner-draw"
                  style={{ borderTop: `2px solid ${active.color}80`, borderRight: `2px solid ${active.color}80`, borderRadius: "0 8px 0 0" }} />
                <div className="absolute bottom-3 left-3 w-10 h-10 pointer-events-none animate-corner-draw"
                  style={{ borderBottom: `2px solid ${active.color}80`, borderLeft: `2px solid ${active.color}80`, borderRadius: "0 0 0 8px" }} />
              </>
            )}

            {/* Corner glow blob */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-bl-full transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle, ${active.color}, transparent 70%)`,
                opacity: spotHovered ? 0.18 : 0.08,
              }}
            />

            <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                {/* Tag + Stars */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span
                    className="text-xs font-bold px-4 py-1.5 rounded-full border transition-all duration-300"
                    style={{
                      color: active.color,
                      borderColor: `${active.color}${spotHovered ? "80" : "40"}`,
                      background: `${active.color}${spotHovered ? "18" : "10"}`,
                      boxShadow: spotHovered ? `0 0 16px ${active.color}40` : "none",
                    }}
                  >
                    {active.tag}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(active.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-emerald-400 text-emerald-400"
                        style={{
                          filter: spotHovered ? "drop-shadow(0 0 5px #34d399)" : "none",
                          transition: `all 0.2s ${i * 50}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <Quote
                  className="h-10 w-10 mb-4 transition-all duration-300"
                  style={{
                    color: active.color,
                    opacity: spotHovered ? 0.5 : 0.2,
                    filter: spotHovered ? `drop-shadow(0 0 10px ${active.color})` : "none",
                  }}
                />

                <blockquote
                  className="text-base md:text-lg font-medium leading-relaxed mb-6 transition-colors duration-300"
                  style={{ color: spotHovered ? "#fff" : "#f3f4f6" }}
                >
                  "{active.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-base font-black text-black shadow-lg transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${active.color}, ${active.color}80)`,
                      boxShadow: spotHovered
                        ? `0 0 0 3px ${active.color}50, 0 0 30px ${active.color}40`
                        : "none",
                    }}
                  >
                    {active.avatar}
                  </div>
                  <div>
                    <div className="text-base font-black text-white">{active.name}</div>
                    <div className="text-sm text-gray-400">{active.role} · {active.company}</div>
                  </div>
                </div>
              </div>

              {/* Stat block — FIXED: max-w-30 → inline style max-width */}
              <div
                className="text-center px-8 py-6 rounded-2xl border shrink-0 transition-all duration-300"
                style={{
                  borderColor: `${active.color}${spotHovered ? "60" : "30"}`,
                  background: `${active.color}${spotHovered ? "12" : "08"}`,
                  boxShadow: spotHovered
                    ? `0 0 30px ${active.color}20, inset 0 0 20px ${active.color}08`
                    : "none",
                }}
              >
                <div
                  className="text-4xl font-black mb-2 transition-all duration-300"
                  style={{
                    color: active.color,
                    textShadow: spotHovered ? `0 0 30px ${active.color}` : "none",
                  }}
                >
                  {active.stat}
                </div>
                {/* FIXED: max-w-30 → inline style */}
                <div className="text-sm text-gray-400 font-semibold" style={{ maxWidth: "7.5rem" }}>
                  {active.statLabel}
                </div>
              </div>
            </div>

            {/* Dots + arrows */}
            <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-emerald-500/10">
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setIsPaused(true); setActiveIndex(i); }}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === activeIndex ? "28px" : "8px",
                      height: "8px",
                      background: i === activeIndex ? active.color : "#374151",
                      boxShadow: i === activeIndex ? `0 0 8px ${active.color}` : "none",
                    }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {[{ Icon: ChevronLeft, fn: prev }, { Icon: ChevronRight, fn: next }].map(({ Icon, fn }, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    className="w-10 h-10 rounded-full border border-emerald-500/25 text-emerald-400 flex items-center justify-center transition-all duration-200 hover:border-emerald-400 hover:text-white"
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${active.color}18`;
                      e.currentTarget.style.boxShadow = `0 0 16px ${active.color}30`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              isActive={i === activeIndex}
              onClick={() => { setIsPaused(true); setActiveIndex(i); }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(30px,-40px) scale(1.08); }
          66%       { transform: translate(-20px,20px) scale(0.94); }
        }
        @keyframes corner-draw {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-blob        { animation: blob 8s infinite ease-in-out; }
        .animate-corner-draw { animation: corner-draw 0.25s ease-out forwards; }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
