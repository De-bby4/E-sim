import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Wifi,
  Plane,
  Check,
  Sparkles,
} from "lucide-react";

const slides = [
  {
    tag: "WELCOME TO ESIMLY",
    title: "The world is yours to explore.",
    description:
      "Stay connected wherever you go. Enjoy seamless internet access across the world without the hassle of physical SIM cards.",
    visual: "🌍",
  },
  {
    tag: "TRAVEL WITHOUT LIMITS",
    title: "Stay connected, everywhere.",
    description:
      "Travel to your favourite destinations and enjoy reliable mobile data without expensive roaming charges.",
    visual: "✈️",
  },
  {
    tag: "SIMPLE. FAST. CONNECTED.",
    title: "Your connection is just a tap away.",
    description:
      "Choose your destination, pick a data plan and activate your eSIM in minutes. It's that simple!",
    visual: "📱",
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const touchStartX = useRef(null);

  const isLast = currentSlide === slides.length - 1;
  const slide = slides[currentSlide];

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
      {/* Slide fade-in animation */}
      <style>{`
        @keyframes onboardFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .onboard-fade { animation: onboardFade 0.45s ease both; }
      `}</style>

      {/* Background glow */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-purple-700/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top bar */}
      <header className="relative z-10 w-full max-w-md shrink-0 flex items-center justify-between px-6 pt-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center">
            <Wifi size={20} />
          </div>

          <span className="text-xl font-bold tracking-tight">
            eSIM<span className="text-purple-400">ly</span>
          </span>
        </div>

        {!isLast ? (
          <button
            onClick={finishOnboarding}
            className="text-sm text-gray-400 hover:text-white transition px-3 py-2 -mr-3"
          >
            Skip
          </button>
        ) : (
          <span className="w-12" />
        )}
      </header>

      {/* Content (key remounts it on every slide so the animation replays) */}
      <main
        key={currentSlide}
        className="onboard-fade relative z-10 flex-1 min-h-0 w-full max-w-md px-6 flex flex-col items-center justify-center gap-6"
      >
        {/* Illustration */}
        <div className="relative shrink-0 w-[min(34vh,300px)] aspect-square rounded-full bg-gradient-to-br from-purple-600/20 via-purple-900/10 to-transparent border border-purple-500/20 flex items-center justify-center">
          <div className="absolute inset-[8%] rounded-full border border-purple-400/20" />
          <div className="absolute inset-[16%] rounded-full border border-purple-400/10" />

          <div className="relative w-[62%] aspect-square rounded-full bg-gradient-to-br from-purple-600 to-purple-950 shadow-[0_0_80px_rgba(168,85,247,0.35)] flex items-center justify-center">
            <span style={{ fontSize: "clamp(3rem, 11vh, 5.5rem)", lineHeight: 1 }}>
              {slide.visual}
            </span>
          </div>

          {/* Floating badges, placed symmetrically around the circle */}
          <div className="absolute top-[6%] right-[2%] bg-[#17141F] border border-purple-400/30 rounded-2xl p-2.5 shadow-xl">
            <Wifi className="text-purple-400" size={22} />
          </div>

          <div className="absolute bottom-[6%] left-[2%] bg-[#17141F] border border-purple-400/30 rounded-2xl p-2.5 shadow-xl">
            <Check className="text-purple-400" size={22} />
          </div>

          <div className="absolute top-[10%] left-[10%] text-purple-300">
            <Sparkles size={22} />
          </div>

          <div className="absolute bottom-[10%] right-[10%] text-purple-400">
            <Plane size={22} />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-semibold tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {slide.tag}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-3 text-balance">
            {slide.title}
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm text-balance">
            {slide.description}
          </p>
        </div>
      </main>

      {/* Bottom controls */}
      <footer className="relative z-10 w-full max-w-md shrink-0 px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-5">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-8 bg-purple-500"
                  : "w-2 bg-gray-700 hover:bg-purple-400"
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="w-full flex items-center gap-3">
          {currentSlide > 0 && (
            <button
              onClick={previousSlide}
              className="w-14 h-14 shrink-0 rounded-xl border border-gray-700 flex items-center justify-center hover:bg-white/5 transition"
              aria-label="Previous slide"
            >
              <ArrowLeft size={21} />
            </button>
          )}

          <button
            onClick={nextSlide}
            className="flex-1 h-14 rounded-xl bg-purple-600 hover:bg-purple-500 flex items-center justify-center gap-3 font-semibold transition-all duration-300 shadow-lg shadow-purple-600/20"
          >
            {isLast ? "Get Started" : "Continue"}
            <ArrowRight size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}