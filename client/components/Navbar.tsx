"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);

  const triggerFlour = () => {
    if (!brandRef.current) return;
    const rect = brandRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.bottom;

    const numParticles = 25;
    const container = document.body;

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div");
      particle.className = "flour-particle";

      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const offsetX = (Math.random() - 0.5) * 80;
      particle.style.left = `${x + offsetX}px`;
      particle.style.top = `${y}px`;

      const drift = (Math.random() - 0.5) * 120;
      particle.style.setProperty("--drift", `${drift}px`);

      const duration = Math.random() * 1 + 0.8;
      
      // Inject inline animation directly using keyframes logic from CSS
      particle.style.animation = `flour-fall ${duration}s ease-in forwards`;
      
      // Let's ensure standard style for fallback
      particle.style.position = "fixed";
      particle.style.backgroundColor = "#ffffff";
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "10000";
      particle.style.filter = "blur(1px)";

      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/discover" },
    { name: "Cuisines", href: "/cuisines" },
    { name: "Journal", href: "/journal" },
    { name: "About", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="w-full sticky top-0 z-50 bg-surface/90 shadow-sm backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4">
          <div className="flex items-center gap-12">
            <div
              ref={brandRef}
              onClick={triggerFlour}
              className="flour-logo relative group cursor-pointer select-none"
            >
              <Link href="/">
                <span className="font-headline-md text-headline-md font-bold text-primary italic">
                  CookCraft
                </span>
              </Link>
              <div className="absolute -bottom-2 left-0 w-full flex justify-around pointer-events-none">
                <span className="flour-particle opacity-0 w-1 h-1 bg-on-surface-variant rounded-full"></span>
                <span
                  className="flour-particle opacity-0 w-1 h-1 bg-on-surface-variant rounded-full"
                  style={{ animationDelay: "0.1s" }}
                ></span>
                <span
                  className="flour-particle opacity-0 w-1 h-1 bg-on-surface-variant rounded-full"
                  style={{ animationDelay: "0.2s" }}
                ></span>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex gap-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-body-md transition-all duration-300 ${
                    isActive(link.href)
                      ? "text-secondary border-b-2 border-secondary pb-1 font-bold"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center gap-4 text-headline-md">
              <Link href="/journal" className="hover:text-secondary transition-colors duration-300">
                <span className="material-symbols-outlined flex items-center">menu_book</span>
              </Link>
              <Link href="/discover" className="hover:text-secondary transition-colors duration-300">
                <span className="material-symbols-outlined flex items-center">bookmark</span>
              </Link>
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-highest border border-outline-variant/30 rounded-full transition-all active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-secondary text-[20px]">account_circle</span>
                  <span className="font-label-caps tracking-wider text-sm font-semibold text-primary">
                    {user.name}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                    {profileOpen ? "arrow_drop_up" : "arrow_drop_down"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-3 w-64 bg-[#FFFFF0] rounded-xl border border-outline-variant/40 shadow-xl py-6 px-4 flex flex-col items-center text-center z-20 animate-fade-in-up">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-secondary text-3xl">chef_hat</span>
                      </div>
                      <p className="font-headline-md text-primary font-bold text-lg leading-tight mb-1">
                        {user.name}
                      </p>
                      <p className="font-body-md text-on-surface-variant text-xs mb-4">
                        {user.email}
                      </p>

                      <div className="w-full border-t border-outline-variant/30 pt-3 flex flex-col gap-2">
                        <Link
                          href="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="w-full py-2 hover:bg-surface-container rounded text-left px-3 text-sm font-body-md text-primary flex items-center gap-2 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">menu_book</span>
                          <span>My Culinary Archive</span>
                        </Link>
                        <Link
                          href="/discover"
                          onClick={() => setProfileOpen(false)}
                          className="w-full py-2 hover:bg-surface-container rounded text-left px-3 text-sm font-body-md text-primary flex items-center gap-2 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">bookmark</span>
                          <span>My Saved Recipes</span>
                        </Link>
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            logout();
                          }}
                          className="w-full py-2 bg-error-container text-on-error text-center hover:bg-error/10 border border-error/20 transition-all flex items-center justify-center gap-2 mt-2"
                        >
                          <span className="material-symbols-outlined text-sm">logout</span>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login">
                <button className="px-6 py-2 bg-primary text-on-primary font-label-caps tracking-widest text-label-caps rounded-full hover:bg-primary-container transition-all active:scale-95 border-t border-on-tertiary-container/20">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-primary hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-surface border-t border-outline-variant/20 px-margin-mobile py-4 flex flex-col gap-4 shadow-lg absolute w-full left-0">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-body-md py-2 border-b border-outline-variant/10 ${
                  isActive(link.href)
                    ? "text-secondary font-bold"
                    : "text-on-surface-variant"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-4 py-2 border-b border-outline-variant/10">
              <Link href="/journal" onClick={() => setMobileMenuOpen(false)} className="text-on-surface-variant hover:text-secondary flex gap-2 items-center">
                <span className="material-symbols-outlined">menu_book</span>
                <span>Journal</span>
              </Link>
              <Link href="/discover" onClick={() => setMobileMenuOpen(false)} className="text-on-surface-variant hover:text-secondary flex gap-2 items-center">
                <span className="material-symbols-outlined">bookmark</span>
                <span>Saved</span>
              </Link>
            </div>
            
            {/* Mobile Auth Status */}
            {user ? (
              <div className="pt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 px-1 mb-2">
                  <span className="material-symbols-outlined text-secondary">account_circle</span>
                  <span className="font-body-md text-primary font-bold">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-3 bg-error-container text-on-error rounded text-center text-sm font-label-caps tracking-widest border border-error/20 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-3 bg-primary text-on-primary font-label-caps tracking-widest text-label-caps rounded-full">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Global CSS Flour-fall Keyframes injection */}
      <style jsx global>{`
        @keyframes flour-fall {
          0% {
            transform: translateY(-10px) translateX(0) scale(0.5);
            opacity: 0.9;
          }
          100% {
            transform: translateY(180px) translateX(var(--drift)) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
