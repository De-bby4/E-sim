
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wifi,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Globe2,
} from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden">

      {/* Background effects */}
      <div className="absolute top-[-150px] left-[-100px] w-[350px] h-[350px] bg-purple-700/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-8 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center">
          <Wifi size={23} />
        </div>

        <span className="text-2xl font-bold">
          eSIM<span className="text-purple-400">ly</span>
        </span>
      </Link>

      {/* Authentication card */}
      <div className="relative z-10 w-full max-w-md bg-[#17141F] border border-white/10 rounded-3xl p-6 sm:p-9 shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/10 flex items-center justify-center mb-5">
            <Globe2 size={28} className="text-purple-400" />
          </div>

          <h1 className="text-3xl font-bold mb-3">
            {isLogin ? "Welcome Back!" : "Create an Account"}
          </h1>

          <p className="text-gray-400 text-sm">
            {isLogin
              ? "Log in to continue your journey with eSIMly."
              : "Join eSIMly and stay connected wherever you go."}
          </p>
        </div>

        {/* Login / Signup toggle */}
        <div className="flex bg-[#0B0B0F] rounded-xl p-1 mb-7">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setShowPassword(false);
            }}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              isLogin
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Log In
          </button>

          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setShowPassword(false);
            }}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              !isLogin
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full name */}
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm outline-none focus:border-purple-500 transition placeholder:text-gray-600"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                placeholder="you@example.com"
                required
                className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm outline-none focus:border-purple-500 transition placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-300">
                Password
              </label>

              {isLogin && (
                <button
                  type="button"
                  className="text-xs text-purple-400 hover:text-purple-300"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-sm outline-none focus:border-purple-500 transition placeholder:text-gray-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {/* Remember me */}
          {isLogin && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="accent-purple-500 w-4 h-4"
              />

              <label
                htmlFor="remember"
                className="text-sm text-gray-400"
              >
                Remember me
              </label>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 rounded-xl py-4 font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/20"
          >
            {isLogin ? "Log In" : "Create Account"}
            <ArrowRight size={19} />
          </button>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-gray-500">
            OR CONTINUE WITH
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="border border-white/10 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white/5 transition text-sm"
          >
            <span className="font-bold text-lg">G</span>
            Google
          </button>

          <button
            type="button"
            className="border border-white/10 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white/5 transition text-sm"
          >
            <span className="font-bold text-lg"></span>
            Apple
          </button>
        </div>

        {/* Bottom text */}
        <p className="text-center text-sm text-gray-400 pt-8">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setShowPassword(false);
            }}
            className="text-purple-400 font-semibold ml-1 hover:text-purple-300"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>

      </div>

      {/* Footer */}
      {/* <p className="relative z-10 text-gray-600 text-xs mt-8 text-center">
        © 2026 eSIMly. All rights reserved.
      </p> */}

    </div>
  );
}
