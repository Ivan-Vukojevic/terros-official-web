"use client";

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { siteContent } from '@/app/content/siteContent';

const logo = '/logo.png';
const navItems = siteContent.navigation;

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
              <Image
                src={logo}
                alt="Terros d.o.o. logo"
                width={48}
                height={48}
                priority
                fetchPriority="high"
                sizes="(min-width: 640px) 48px, 40px"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-300 hover:text-[#C4976A] transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Izbornik" className="md:hidden text-white p-3 -mr-3"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden" style={{ top: '64px' }}>
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white text-2xl hover:text-[#C4976A] transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
