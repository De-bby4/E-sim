
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Wifi,
  Plane,
  Check,
  Sparkles,
  MapPin,
  Zap,
  Wallet,
  QrCode,
  Cpu,
} from "lucide-react";

/* ---------- Center illustrations (drawn, one per slide) ---------- */

// Slide 1: wireframe globe that slowly "turns", pins pop in one by one
function GlobeVisual() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="globeFill" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ddd6fe" stopOpacity="0.55" />
          <stop offset="1" stopColor="#4c1d95" stopOpacity="0.1" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="64" fill="url(#globeFill)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" />

      <g fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1.2">
        {/* the two meridians squeeze in and out, so the globe looks like it is turning */}
        <ellipse className="onboard-meridian-a" cx="100" cy="100" rx="27" ry="64" />
        <ellipse className="onboard-meridian-b" cx="100" cy="100" rx="49" ry="64" />
        <line x1="100" y1="36" x2="100" y2="164" />
        <line x1="36" y1="100" x2="164" y2="100" />
        <path d="M46 72 Q100 90 154 72" />
        <path d="M46 128 Q100 110 154 128" />
      </g>

      {/* connection arcs fade in after the pins */}
      <g className="onboard-fade-svg" style={{ animationDelay: "1s" }}>
        <path d="M72 84 Q104 34 138 70" fill="none" stroke="#e9d5ff" strokeWidth="1.8" strokeDasharray="4 4" strokeLinecap="round" />
        <path d="M138 70 Q150 112 116 128" fill="none" stroke="#e9d5ff" strokeWidth="1.8" strokeDasharray="4 4" strokeLinecap="round" />
      </g>

      {/* pins */}
      <circle className="onboard-ping" style={{ animationDelay: "1.1s" }} cx="72" cy="84" r="5" fill="#e9d5ff" />
      <circle className="onboard-ping" style={{ animationDelay: "1.8s" }} cx="138" cy="70" r="5" fill="#e9d5ff" />
      <circle className="onboard-ping" style={{ animationDelay: "2.5s" }} cx="116" cy="128" r="5" fill="#e9d5ff" />

      <circle className="onboard-svg-pop" style={{ animationDelay: "0.45s" }} cx="72" cy="84" r="4.5" fill="#fff" />
      <circle className="onboard-svg-pop" style={{ animationDelay: "0.65s" }} cx="138" cy="70" r="4.5" fill="#fff" />
      <circle className="onboard-svg-pop" style={{ animationDelay: "0.85s" }} cx="116" cy="128" r="4.5" fill="#fff" />
    </svg>
  );
}

// Slide 2: plane flies in, clouds drift, destination pin pops
function PlaneVisual() {
  return (
    <>
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" aria-hidden="true">
        {/* drifting clouds */}
        <g className="onboard-drift" fill="rgba(255,255,255,0.14)">
          <circle cx="52" cy="150" r="11" />
          <circle cx="66" cy="146" r="14" />
          <circle cx="82" cy="152" r="10" />
          <rect x="44" y="150" width="46" height="12" rx="6" />
        </g>
        <g className="onboard-drift-alt" fill="rgba(255,255,255,0.14)">
          <circle cx="132" cy="140" r="9" />
          <circle cx="145" cy="137" r="12" />
          <circle cx="158" cy="142" r="8" />
          <rect x="125" y="140" width="40" height="10" rx="5" />
        </g>

        {/* dotted flight route */}
        <path
          className="onboard-fade-svg"
          style={{ animationDelay: "0.4s" }}
          d="M40 148 C 62 112, 80 104, 100 100 S 148 72, 160 48"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="2"
          strokeDasharray="1 7"
          strokeLinecap="round"
        />

        {/* start and destination */}
        <circle className="onboard-svg-pop" style={{ animationDelay: "0.3s" }} cx="40" cy="148" r="4" fill="rgba(255,255,255,0.7)" />
        <circle className="onboard-ping" style={{ animationDelay: "1.3s" }} cx="160" cy="48" r="6" fill="#e9d5ff" />
        <circle className="onboard-svg-pop" style={{ animationDelay: "0.9s" }} cx="160" cy="48" r="5" fill="#fff" />
      </svg>

      {/* outer div flies in, inner div keeps floating */}
      <div className="onboard-fly-in absolute inset-0 flex items-center justify-center">
        <div className="onboard-float w-[42%] h-[42%]">
          <Plane
            className="w-full h-full text-white drop-shadow-[0_8px_14px_rgba(0,0,0,0.4)]"
            strokeWidth={1.4}
            fill="rgba(255,255,255,0.22)"
          />
        </div>
      </div>
    </>
  );
}

// Slide 3: phone slides up, signal bars fill in, eSIM turns active
function PhoneVisual() {
  return (
    <div className="onboard-slide-up absolute inset-0 flex items-center justify-center">
      <div className="onboard-float relative w-[40%] aspect-[9/17] rounded-[1.1rem] border-2 border-white/45 bg-gradient-to-b from-[#1d1236] to-[#33196a] shadow-[0_12px_30px_rgba(0,0,0,0.45)] flex flex-col items-center justify-center gap-2.5">
        {/* notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full bg-white/30" />

        {/* eSIM chip (glows softly) */}
        <div className="onboard-chip w-9 h-9 rounded-xl bg-purple-400/30 border border-purple-200/40 flex items-center justify-center">
          <Cpu size={20} className="text-purple-100" />
        </div>

        {/* signal bars grow one after the other */}
        <div className="flex items-end gap-[3px] h-4">
          {[6, 10, 12, 16].map((h, i) => (
            <span
              key={h}
              className="onboard-bar w-[3px] rounded-sm bg-white/90"
              style={{ height: `${h}px`, animationDelay: `${0.7 + i * 0.12}s` }}
            />
          ))}
        </div>

        {/* active tick pops in last */}
        <div
          className="onboard-pop-in w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center shadow-[0_0_12px_rgba(52,211,153,0.7)]"
          style={{ animationDelay: "1.3s" }}
        >
          <Check size={13} className="text-[#0B0B0F]" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Slides ---------- */

const slides = [
  {
    tag: "Welcome to eSIMly",
    title: "The world is yours to explore.",
    description:
      "Stay connected wherever you go. Enjoy seamless internet access across the world without the hassle of physical SIM cards.",
    Visual: GlobeVisual,
    badges: [Wifi, MapPin],
  },
  {
    tag: "Travel without limits",
    title: "Stay connected, everywhere.",
    description:
      "Travel to your favourite destinations and enjoy reliable mobile data without expensive roaming charges.",
    Visual: PlaneVisual,
    badges: [Zap, Wallet],
  },
  {
    tag: "Simple. Fast. Connected.",
    title: "Your connection is just a tap away.",
    description:
      "Choose your destination, pick a data plan and activate your eSIM in minutes. It's that simple!",
    Visual: PhoneVisual,
    badges: [QrCode, Check],
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const touchStartX = useRef(null);

  const isLast = currentSlide === slides.length - 1;
  const slide = slides[currentSlide];
  const Visual = slide.Visual;
  const [BadgeA, BadgeB] = slide.badges;

  const finishOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true");
    navigate("/auth");
  };

  const nextSlide = () => {
    if (isLast) {
      finishOnboarding();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // swipe left / right to change slides (swiping past the last slide does nothing)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (diff < -50 && !isLast) setCurrentSlide((prev) => prev + 1);
    if (diff > 50) previousSlide();
  };

  return (
    <div
      className="h-dvh w-full bg-[#0B0B0F] text-white flex flex-col items-center overflow-hidden relative text-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Animations.
          Every slide uses the same motion language: pieces pop / rise in one after the other
          (same spring easing), then idle with a gentle float, so the pages rhyme. */}
      <style>{`
        @keyframes onboardFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes onboardRise {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes onboardPopIn {
          from { opacity: 0; transform: scale(0.4) rotate(-12deg); }
          to { opacity: 1; transform: scale(1) rotate(0); }
        }
        @keyframes onboardScaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes onboardFlyIn {
          from { opacity: 0; transform: translate(-45%, 45%) scale(0.7) rotate(-8deg); }
          to { opacity: 1; transform: translate(0, 0) scale(1) rotate(0); }
        }
        @keyframes onboardSlideUp {
          from { opacity: 0; transform: translateY(44px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes onboardBar {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes onboardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        @keyframes onboardSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes onboardGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.06); }
        }
        @keyframes onboardPing {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        @keyframes onboardTwinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes onboardMeridianA {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.45); }
        }
        @keyframes onboardMeridianB {
          0%, 100% { transform: scaleX(0.45); }
          50% { transform: scaleX(1); }
        }
        @keyframes onboardDrift {
          0%, 100% { transform: translateX(-5px); }
          50% { transform: translateX(6px); }
        }
        @keyframes onboardChip {
          0%, 100% { box-shadow: 0 0 0 rgba(196, 181, 253, 0); }
          50% { box-shadow: 0 0 16px rgba(196, 181, 253, 0.75); }
        }

        .onboard-fade { animation: onboardFade 0.4s ease both; }
        .onboard-rise { animation: onboardRise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .onboard-pop-in { animation: onboardPopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .onboard-scale-in { animation: onboardScaleIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .onboard-fly-in { animation: onboardFlyIn 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both; }
        .onboard-slide-up { animation: onboardSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both; }
        .onboard-bar { transform-origin: bottom; animation: onboardBar 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .onboard-fade-svg { animation: onboardFade 0.6s ease both; }
        .onboard-svg-pop {
          transform-box: fill-box;
          transform-origin: center;
          animation: onboardPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }

        .onboard-float { animation: onboardFloat 5s ease-in-out infinite; }
        .onboard-float-alt { animation: onboardFloat 6s ease-in-out infinite reverse; }
        .onboard-spin { animation: onboardSpin 60s linear infinite; }
        .onboard-orbit { animation: onboardSpin 16s linear infinite; }
        .onboard-glow { animation: onboardGlow 5s ease-in-out infinite; }
        .onboard-twinkle { animation: onboardTwinkle 2.8s ease-in-out infinite; }
        .onboard-ping {
          transform-box: fill-box;
          transform-origin: center;
          animation: onboardPing 2.2s ease-out infinite;
        }
        .onboard-meridian-a,
        .onboard-meridian-b {
          transform-box: fill-box;
          transform-origin: center;
          animation-duration: 7s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .onboard-meridian-a { animation-name: onboardMeridianA; }
        .onboard-meridian-b { animation-name: onboardMeridianB; }
        .onboard-drift { animation: onboardDrift 9s ease-in-out infinite; }
        .onboard-drift-alt { animation: onboardDrift 11s ease-in-out infinite reverse; }
        .onboard-chip { animation: onboardChip 2.4s ease-in-out 1.4s infinite; }

        @media (prefers-reduced-motion: reduce) {
          .onboard-fade, .onboard-rise, .onboard-pop-in, .onboard-scale-in, .onboard-fly-in,
          .onboard-slide-up, .onboard-bar, .onboard-fade-svg, .onboard-svg-pop,
          .onboard-float, .onboard-float-alt, .onboard-spin, .onboard-orbit, .onboard-glow,
          .onboard-twinkle, .onboard-ping, .onboard-meridian-a, .onboard-meridian-b,
          .onboard-drift, .onboard-drift-alt, .onboard-chip { animation: none; }
        }
      `}</style>

      {/* Subtle dotted grid, faded out toward the edges */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 38%, black 20%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 38%, black 20%, transparent 75%)",
        }}
      />

      {/* Background glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-purple-700/30 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[460px] h-[460px] bg-purple-500/15 blur-[130px] rounded-full pointer-events-none" />

      {/* Top bar */}
      <header className="relative z-10 w-full max-w-md shrink-0 flex items-center justify-between gap-2 px-4 sm:px-6 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-600/30 ring-1 ring-white/10">
            <Wifi size={19} />
          </div>

          <span className="text-xl font-bold tracking-tight">
            eSIM<span className="text-purple-400">ly</span>
          </span>
        </div>

        <div className="flex items-center gap-1 -mr-2 sm:-mr-3">
          {!isLast ? (
            <button
              onClick={finishOnboarding}
              className="text-sm font-medium text-gray-300 hover:text-white transition px-3 py-2"
            >
              Skip
            </button>
          ) : (
            <span className="w-10" />
          )}
        </div>
      </header>

      {/* Content */}
      <main
        key={currentSlide}
        className="onboard-fade relative z-10 flex-1 min-h-0 w-full max-w-md px-4 sm:px-6 flex flex-col"
      >
        {/* Illustration area */}
        <div className="flex-1 min-h-0 flex items-center justify-center py-1">
          <div className="relative shrink-0 w-[min(76vw,32dvh,300px)] max-h-full aspect-square flex items-center justify-center">
            {/* soft pulsing glow behind everything */}
            <div className="onboard-glow absolute inset-[4%] rounded-full bg-purple-600/40 blur-3xl" />

            {/* rings */}
            <div className="onboard-scale-in absolute inset-0 rounded-full border border-white/10 bg-gradient-to-br from-purple-500/[0.18] via-transparent to-transparent" />
            <div className="onboard-scale-in absolute inset-[8%] rounded-full border border-purple-300/20" style={{ animationDelay: "80ms" }} />
            <div className="onboard-spin absolute inset-[17%] rounded-full border border-dashed border-purple-200/25" />

            {/* a small light travelling around the outer ring */}
            <div className="onboard-orbit absolute inset-[8%]">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-purple-200 shadow-[0_0_14px_3px_rgba(216,180,254,0.8)]" />
            </div>

            {/* core stage with this slide's illustration */}
            <div
              className="onboard-scale-in relative w-[64%] aspect-square rounded-full bg-gradient-to-br from-purple-400 via-purple-600 to-[#2a0f55] shadow-[0_0_100px_rgba(168,85,247,0.5)] ring-1 ring-white/20 overflow-hidden"
              style={{ animationDelay: "120ms" }}
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
              <Visual />
            </div>

            {/* glass badges */}
            <div
              className="onboard-pop-in absolute top-[6%] right-[0%]"
              style={{ animationDelay: "350ms" }}
            >
              <div className="onboard-float bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2.5 sm:p-3 shadow-xl shadow-black/30">
                <BadgeA className="text-purple-200" size={20} />
              </div>
            </div>

            <div
              className="onboard-pop-in absolute bottom-[6%] left-[0%]"
              style={{ animationDelay: "500ms" }}
            >
              <div className="onboard-float-alt bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-2.5 sm:p-3 shadow-xl shadow-black/30">
                <BadgeB className="text-purple-200" size={20} />
              </div>
            </div>

            {/* twinkling sparkles */}
            <div className="onboard-twinkle absolute top-[10%] left-[8%] text-purple-200/80">
              <Sparkles size={18} />
            </div>

            <div
              className="onboard-twinkle absolute bottom-[10%] right-[8%] text-purple-200/70"
              style={{ animationDelay: "1.2s" }}
            >
              <Sparkles size={13} />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="shrink-0 flex flex-col items-center pt-2 pb-2">
          <p
            className="onboard-rise text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-purple-300 mb-2 sm:mb-3"
            style={{ animationDelay: "200ms" }}
          >
            {slide.tag}
          </p>

          <h1
            className="onboard-rise text-[clamp(1.65rem,5.5vw,2.5rem)] font-bold leading-[1.12] tracking-tight mb-2 sm:mb-3 text-balance"
            style={{ animationDelay: "280ms" }}
          >
            {slide.title}
          </h1>

          <p
            className="onboard-rise text-gray-300/80 text-[clamp(0.8rem,2.5vw,0.95rem)] leading-relaxed max-w-sm text-balance"
            style={{ animationDelay: "360ms" }}
          >
            {slide.description}
          </p>
        </div>
      </main>

      {/* Bottom controls */}
      <footer className="relative z-10 w-full max-w-md shrink-0 px-4 sm:px-6 pt-3 sm:pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-4">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === index
                  ? "w-9 bg-gradient-to-r from-purple-300 to-purple-500"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="w-full flex items-center gap-3">
          {currentSlide > 0 && (
            <button
              onClick={previousSlide}
              className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-white/[0.1] active:scale-95 transition"
              aria-label="Previous slide"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          <button
            onClick={nextSlide}
            className="group flex-1 h-12 sm:h-14 rounded-2xl bg-gradient-to-b from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 ring-1 ring-white/15 flex items-center justify-center gap-2.5 font-semibold active:scale-[0.98] transition-all duration-300 shadow-lg shadow-purple-600/40"
          >
            {isLast ? "Get Started" : "Continue"}
            <ArrowRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </footer>
    </div>
  );
}
