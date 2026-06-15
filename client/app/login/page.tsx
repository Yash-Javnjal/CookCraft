"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login, register, signInWithGoogle, sendPasswordReset } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");

  // Background Parallax displacement refs
  const [displace, setDisplace] = useState({ x: 0, y: 0, rot: 0 });
  const [cardRotation, setCardRotation] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const wWidth = window.innerWidth;
      const wHeight = window.innerHeight;

      // Mouse position from -1 to 1
      const mx = (e.clientX / wWidth) * 2 - 1;
      const my = (e.clientY / wHeight) * 2 - 1;

      setDisplace({
        x: mx * -25,
        y: my * -15,
        rot: mx * 1.5,
      });

      // Card tilt effect
      const cx = (e.clientX / wWidth - 0.5) * 5;
      const cy = (e.clientY / wHeight - 0.5) * 5;
      setCardRotation({
        rx: -cy,
        ry: cx,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleToggleState = () => {
    setIsRegister(!isRegister);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    setSuccessMsg("");
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isRegister && !name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isRegister) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (isRegister) {
        register(email, name);
        setSuccessMsg("Account prepared successfully! Welcoming you in...");
      } else {
        login(email);
        setSuccessMsg("Sign in verified! Redirecting to kitchen log...");
      }
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center noise-bg antialiased relative overflow-hidden w-full">
      {/* Cinematic background image */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <img
          alt="Chef's workbench background"
          id="bg-image"
          className="w-full h-full object-cover opacity-60 mix-blend-multiply transition-transform duration-300 ease-out"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6PdPN0ZlL_YlCOCVrwlXWHCfCHggbwRnZwHk4FLfQ1lVLc0laS2uKZ9X4BcDSCLftVTImljFEaDLCZW2ESWFS0WOJzyyQR0hGkNHNlFbIkJHpAWeYabL9yXkjG0xqFUpVrgz4WqFYYrQfk7PnE-YTQZRzBsLDwNQ1S7bjeeJhMBOHepH3dat6kDv4gCJ4F-0BPtLM7denuoBHB-gf9fYAmaU8xOtmKxTp9DarkUQ6xT8xD2ZJ7M3WvcWXeEh3RiBfTOZjslZzf7ym"
          style={{
            transform: `translate(${displace.x}px, ${displace.y}px) rotate(${displace.rot}deg) scale(1.1)`,
            transformOrigin: "center center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-surface/20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
      </div>

      {/* Login Card: The Journal Cover */}
      <main className="w-full max-w-lg mx-margin-mobile md:mx-auto relative z-10 pb-8 text-center">
        <div
          className="bg-surface-bright paper-texture torn-edge shadow-[0_15px_40px_-5px_rgba(29,46,0,0.4)] overflow-hidden border-t-2 border-l border-r border-outline-variant/30 glow-effect transform transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${cardRotation.rx}deg) rotateY(${cardRotation.ry}deg) scale3d(1.01, 1.01, 1.01)`,
          }}
        >
          {/* Decorative Herb Sketch */}
          <div className="absolute top-8 right-8 opacity-20 pointer-events-none rotate-12">
            <svg className="text-tertiary" fill="none" height="60" stroke="currentColor" viewBox="0 0 40 60" width="40">
              <path d="M20 60 C20 40, 10 30, 10 20 C10 10, 20 0, 20 0" strokeLinecap="round" strokeWidth="1.5"></path>
              <path d="M20 45 C25 40, 30 35, 28 25 C26 15, 20 20, 20 20" strokeLinecap="round" strokeWidth="1.5"></path>
              <path d="M15 35 C5 30, 2 20, 8 15 C14 10, 20 18, 20 18" strokeLinecap="round" strokeWidth="1.5"></path>
            </svg>
          </div>

          <div className="px-8 py-12 md:p-16 flex flex-col items-center">
            {/* Brand Title */}
            <h1 className="text-primary font-headline-lg text-headline-lg-mobile md:text-headline-lg italic mb-6 select-none z-20 relative">
              CookCraft
            </h1>

            {/* Handwritten Note */}
            <div className="mb-10 relative w-full flex justify-center">
              <div className="max-w-[95%] rotate-[-3deg] transform hover:rotate-0 transition-transform duration-500">
                <p className="font-handwritten text-3xl text-on-secondary-fixed-variant leading-relaxed">
                  {isRegister ? '"Let\'s start your culinary log, Chef."' : '"Welcome back to the kitchen, Chef."'}
                </p>
              </div>
            </div>

            {/* Success Notification */}
            {successMsg && (
              <div className="w-full sm:w-4/5 mb-6 p-3 bg-tertiary-container text-on-tertiary-container rounded border border-[#9ab36f]/30 font-body-md text-sm">
                {successMsg}
              </div>
            )}

            {/* Action Area */}
            <div className="w-full space-y-6 flex flex-col items-center mt-2">
              {/* Google login placeholder */}
              <button
                type="button"
                onClick={async () => {
                  await signInWithGoogle();
                }}
                className="w-full sm:w-4/5 flex items-center justify-center gap-3 bg-primary-container text-on-primary py-4 px-6 rounded shadow-sm border border-primary-fixed/20 hover:bg-primary transition-colors duration-300"
              >
                <span className="material-symbols-outlined text-[20px]">login</span>
                <span className="font-body-md text-body-md font-medium tracking-wide">
                  Continue with Google
                </span>
              </button>

              {/* Forgot password quick action */}
              <div className="w-full sm:w-4/5 text-right mt-2">
                <button
                  type="button"
                  onClick={async () => {
                    if (!email) {
                      setErrors({ email: "Enter your email to reset password" });
                      return;
                    }
                    const { error } = await sendPasswordReset(email);
                    if (error) setErrors({ email: error.message });
                    else setSuccessMsg("If that email exists, a reset link was sent.");
                  }}
                  className="text-sm text-secondary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-4/5">
                <div className="h-px bg-outline-variant flex-1"></div>
                <span className="text-on-surface-variant font-label-caps text-label-caps opacity-60">OR</span>
                <div className="h-px bg-outline-variant flex-1"></div>
              </div>

              {/* Form Validation inputs */}
              <form onSubmit={handleSubmit} className="w-full sm:w-4/5 space-y-4">
                {isRegister && (
                  <div className="relative text-left">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-outline-variant text-on-surface font-body-md text-body-md focus:ring-0 focus:border-secondary transition-colors px-0 py-2 placeholder:text-on-surface-variant/50 placeholder:font-serif italic outline-none"
                      placeholder="Enter your name..."
                    />
                    {errors.name && (
                      <span className="text-xs text-error font-body-md mt-1 block">{errors.name}</span>
                    )}
                  </div>
                )}

                <div className="relative text-left">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant text-on-surface font-body-md text-body-md focus:ring-0 focus:border-secondary transition-colors px-0 py-2 placeholder:text-on-surface-variant/50 placeholder:font-serif italic outline-none"
                    placeholder="Enter your email address..."
                  />
                  {errors.email && (
                    <span className="text-xs text-error font-body-md mt-1 block">{errors.email}</span>
                  )}
                </div>

                <div className="relative text-left">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant text-on-surface font-body-md text-body-md focus:ring-0 focus:border-secondary transition-colors px-0 py-2 placeholder:text-on-surface-variant/50 placeholder:font-serif italic outline-none"
                    placeholder="Enter password..."
                  />
                  {errors.password && (
                    <span className="text-xs text-error font-body-md mt-1 block">{errors.password}</span>
                  )}
                </div>

                {isRegister && (
                  <div className="relative text-left">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-outline-variant text-on-surface font-body-md text-body-md focus:ring-0 focus:border-secondary transition-colors px-0 py-2 placeholder:text-on-surface-variant/50 placeholder:font-serif italic outline-none"
                      placeholder="Confirm password..."
                    />
                    {errors.confirmPassword && (
                      <span className="text-xs text-error font-body-md mt-1 block">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-surface-container-low text-secondary py-3 px-6 rounded border border-secondary/20 hover:bg-secondary hover:text-on-secondary hover:shadow-md transition-all duration-300 mt-6"
                >
                  <span className="font-body-md text-body-md font-medium">
                    {isRegister ? "Register Account" : "Continue with Email"}
                  </span>
                </button>
              </form>

              {/* State switcher toggle */}
              <div className="pt-4 text-xs font-body-md text-on-surface-variant">
                {isRegister ? (
                  <span>
                    Already have an account?{" "}
                    <button onClick={handleToggleState} className="text-secondary hover:underline font-bold">
                      Sign In
                    </button>
                  </span>
                ) : (
                  <span>
                    Don't have an account?{" "}
                    <button onClick={handleToggleState} className="text-secondary hover:underline font-bold">
                      Register
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-12 w-full flex justify-center gap-8 relative">
              <div className="absolute -top-6 left-1/4 right-1/4 h-px bg-outline-variant/30"></div>
              <div className="flex flex-col items-center space-y-2">
                <a className="font-label-caps text-[10px] text-on-surface-variant/70 hover:text-secondary transition-colors" href="/about">
                  1. The Story
                </a>
                <a className="font-label-caps text-[10px] text-on-surface-variant/70 hover:text-secondary transition-colors" href="/about">
                  2. Terms of Art
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
