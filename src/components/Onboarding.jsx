
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Wifi,
  Smartphone,
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

  useEffect(() => {
    if (localStorage.getItem("onboardingCompleted") === "true") {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);

  const finishOnboarding = () => {
    localStorage.setItem("onboardingCompleted", "true");
    navigate("/auth");
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      finishOnboarding();
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col overflow-hidden relative">

      {/* Background glow */}
      <div className="absolute top-[-150px] left-[-100px] w-[350px] h-[350px] bg-purple-700/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-16 py-7">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
            <Wifi size={23} />
          </div>

          <span className="text-2xl font-bold tracking-tight">
            eSIM<span className="text-purple-400">ly</span>
          </span>
        </div>

        <button
          onClick={finishOnboarding}
          className="text-sm text-gray-400 hover:text-white transition"
        >
          Skip intro
        </button>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">

          {/* Illustration */}
          <div className="relative flex items-center justify-center order-1 md:order-2">
            <div className="relative w-full max-w-[420px] aspect-square rounded-full bg-gradient-to-br from-purple-600/20 via-purple-900/10 to-transparent border border-purple-500/20 flex items-center justify-center">

              <div className="absolute inset-8 rounded-full border border-purple-400/20" />
              <div className="absolute inset-16 rounded-full border border-purple-400/10" />

              <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-600 to-purple-950 shadow-[0_0_100px_rgba(168,85,247,0.35)] flex flex-col items-center justify-center">

                <span className="text-7xl md:text-8xl">
                  {slide.visual}
                </span>

                <div className="absolute -right-5 top-8 bg-[#17141F] border border-purple-400/30 rounded-2xl p-3 shadow-xl">
                  <Wifi className="text-purple-400" size={25} />
                </div>

                <div className="absolute -left-7 bottom-8 bg-[#17141F] border border-purple-400/30 rounded-2xl p-3 shadow-xl">
                  <Check className="text-purple-400" size={25} />
                </div>
              </div>

              <div className="absolute top-10 right-12 text-purple-300">
                <Sparkles size={25} />
              </div>

              <div className="absolute bottom-12 left-10 text-purple-400">
                <Plane size={24} />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="order-2 md:order-1 max-w-xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-widest mb-7">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              {slide.tag}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
              {slide.title}
            </h1>

            <p className="text-gray-400 text-base md:text-lg leading-8 max-w-lg mb-9">
              {slide.description}
            </p>

            {/* Progress indicators */}
            <div className="flex items-center gap-2 mb-9">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-10 bg-purple-500"
                      : "w-2 bg-gray-700 hover:bg-purple-400"
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-4">
              {currentSlide > 0 && (
                <button
                  onClick={previousSlide}
                  className="w-14 h-14 rounded-xl border border-gray-700 flex items-center justify-center hover:bg-white/5 transition"
                  aria-label="Previous slide"
                >
                  <ArrowLeft size={21} />
                </button>
              )}

              <button
                onClick={nextSlide}
                className="flex-1 max-w-[240px] h-14 rounded-xl bg-purple-600 hover:bg-purple-500 flex items-center justify-center gap-3 font-semibold transition-all duration-300 shadow-lg shadow-purple-600/20"
              >
                {currentSlide === slides.length - 1
                  ? "Get Started"
                  : "Continue"}

                <ArrowRight size={20} />
              </button>
            </div>

            {/* <p className="text-gray-500 text-sm mt-7">
              Already have an account?{" "}
              <button
                onClick={finishOnboarding}
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Log in
              </button>
            </p> */}

          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="relative z-10 px-6 md:px-16 py-6 border-t border-white/5 flex justify-between items-center text-xs text-gray-600">
        <p>© 2026 eSIMly. All rights reserved.</p>
        <p>Stay connected. Go further.</p>
      </footer> */}

    </div>
  );
}
