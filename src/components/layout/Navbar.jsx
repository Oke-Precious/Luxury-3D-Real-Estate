import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bookmark, Menu, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/config';
import { audioSystem } from '../../utils/audioSystem';
import FullScreenMenu from './FullScreenMenu';

export default function Navbar({
  savedCount = 0,
  onOpenSaved = () => {},
  onOpenSearch = () => {},
  onRequestViewing = () => {},
  currency = 'NGN',
  onToggleCurrency = () => {}
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return audioSystem.subscribe((active) => setIsSoundActive(active));
  }, []);

  const navLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Developments", href: "/developments" },
    { label: "Locations", href: "/locations" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out select-none ${
          isScrolled
            ? 'py-3.5 px-6 md:px-12 bg-[#0E0F0F]/85 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'py-6 px-6 md:px-12 bg-gradient-to-b from-[#0E0F0F]/90 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 1. BRAND LOGO */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              onClick={() => audioSystem.playClick()}
              className="group flex flex-col"
            >
              <span className="font-serif text-lg md:text-xl font-bold tracking-[0.2em] text-[#F4F1EA] group-hover:text-[#C5A880] transition-colors uppercase">
                {BRAND_CONFIG.name}
              </span>
              <span className="text-[8px] font-mono tracking-[0.3em] text-[#A0A09B] uppercase hidden sm:block">
                ARCHITECTURAL PORTFOLIO
              </span>
            </Link>
          </div>

          {/* 2. DESKTOP MAIN NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => audioSystem.playClick()}
                  className={`text-xs uppercase tracking-widest font-sans-ui transition-colors relative py-1 ${
                    isActive ? 'text-[#C5A880] font-semibold' : 'text-[#A0A09B] hover:text-[#F4F1EA]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A880]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT UTILITIES: Sound, Currency, Search, Saved, Enquire, Menu */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Currency Switcher */}
            <button
              onClick={() => {
                audioSystem.playClick();
                onToggleCurrency();
              }}
              className="text-[10px] font-mono border border-white/15 px-2 py-1 text-[#A0A09B] hover:text-white hover:border-white/30 uppercase tracking-wider"
              title="Toggle Currency (NGN / USD)"
            >
              {currency}
            </button>

            {/* Ambient Sound Toggle with subtle wave effect */}
            <button
              onClick={() => audioSystem.toggleSound()}
              className={`p-2 border transition-all ${
                isSoundActive 
                  ? 'border-[#C5A880] text-[#C5A880] bg-[#C5A880]/10' 
                  : 'border-white/10 text-[#6B6B67] hover:text-[#F4F1EA]'
              }`}
              title={isSoundActive ? "Mute Ambient Sound" : "Experience with Sound"}
            >
              {isSoundActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => {
                audioSystem.playClick();
                onOpenSearch();
              }}
              className="p-2 border border-white/10 text-[#A0A09B] hover:text-[#F4F1EA] hover:border-white/30 transition-colors"
              title="Search Residences"
            >
              <Search size={15} />
            </button>

            {/* Saved Residences Badge */}
            <button
              onClick={() => {
                audioSystem.playClick();
                onOpenSaved();
              }}
              className="relative p-2 border border-white/10 text-[#A0A09B] hover:text-[#F4F1EA] hover:border-white/30 transition-colors"
              title="Saved Residences"
            >
              <Bookmark size={15} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A880] text-[#0E0F0F] text-[9px] font-mono font-bold flex items-center justify-center rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Enquire / Request Viewing CTA */}
            <button
              onClick={() => {
                audioSystem.playClick();
                onRequestViewing();
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#F4F1EA] text-[#0E0F0F] text-xs font-semibold uppercase tracking-widest hover:bg-[#C5A880] transition-colors"
            >
              <span>Enquire</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Fullscreen Menu Trigger */}
            <button
              onClick={() => {
                audioSystem.playClick();
                setIsMenuOpen(true);
              }}
              className="p-2 border border-white/15 text-[#F4F1EA] hover:border-[#C5A880] hover:text-[#C5A880] transition-colors"
              title="Open Directory Menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Cinematic Navigation Menu */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
