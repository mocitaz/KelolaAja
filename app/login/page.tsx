"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon, ChartBarIcon, ShieldCheckIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        router.push("/admin");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error: any) {
      if (error.message?.includes("JSON") || error.message?.includes("Unexpected")) {
        setError("Server unavailable. Check connection.");
      } else {
        setError(error.message || "Network error. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans text-slate-800">
      {/* Left Side - Gradient Background with Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#039edb] via-[#0280af] to-[#71bf44] relative overflow-hidden flex-col justify-center px-16 text-white">

        {/* Animated Background Circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-inner border border-white/20">
              <Image
                src="/images/common/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-7 h-auto brightness-0 invert opacity-90"
              />
            </div>
            <span className="font-bold text-3xl tracking-tight">KelolaAja</span>
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6 text-white text-shadow-sm">
            Master Your <br /> Business Logic.
          </h1>
          <p className="text-white/90 text-lg leading-relaxed max-w-lg mb-12">
            Experience the next evolution of business management. Centralized, real-time, and effortlessly intuitive.
          </p>

          <div className="space-y-6 max-w-md">
            <FeatureItem
              icon={<ShieldCheckIcon className="w-6 h-6" />}
              title="Secure Core"
              desc="Enterprise-grade security"
            />
            <FeatureItem
              icon={<ChartBarIcon className="w-6 h-6" />}
              title="Real-time Analytics"
              desc="Live data visualization"
            />
            <FeatureItem
              icon={<UserGroupIcon className="w-6 h-6" />}
              title="Team Sync"
              desc="Seamless collaboration"
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-16 text-sm text-white/60">
          © 2024 KelolaAja. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white relative">
        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Image
              src="/images/common/logo.png"
              alt="KelolaAja"
              width={140}
              height={40}
              className="h-10 w-auto mx-auto"
              priority
            />
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Sign in to your admin account to continue.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center gap-3 animate-shake shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">Email Address</label>
              <div className={`relative transition-all duration-300 ${focusedInput === 'email' ? 'ring-2 ring-[#039edb]/20 scale-[1.01]' : ''}`}>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#039edb] focus:bg-white transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-sm font-medium text-[#039edb] hover:text-[#0284b8] hover:underline">Forgot password?</a>
              </div>
              <div className={`relative transition-all duration-300 ${focusedInput === 'password' ? 'ring-2 ring-[#039edb]/20 scale-[1.01]' : ''}`}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#039edb] focus:bg-white transition-all duration-200 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#039edb] to-[#71bf44] text-white text-lg font-bold rounded-xl shadow-lg hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-[#039edb]/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Decor Elements for Right Side */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#71bf44]/10 to-transparent rounded-bl-[100px]" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#039edb]/10 to-transparent rounded-tr-[80px]" />
      </div>
    </div>
  );
}

const FeatureItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
    <div className="text-sky-300">{icon}</div>
    <div>
      <h3 className="font-semibold text-sm text-slate-100">{title}</h3>
      <p className="text-[10px] text-slate-400">{desc}</p>
    </div>
  </div>
);
