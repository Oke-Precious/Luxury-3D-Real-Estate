import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Instagram, Linkedin, Globe, Phone, Mail } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/config';
import { audioSystem } from '../../utils/audioSystem';

export default function FullScreenMenu({ isOpen, onClose }) {
  const [hoveredImage, setHoveredImage] = useState(null);

  const menuItems = [
    {
      number: "01",
      label: "Properties",
      href: "/properties",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      description: "Curated private portfolio of villas, penthouses, and waterfront sanctuaries."
    },
    {
      number: "02",
      label: "Developments",
      href: "/developments",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      description: "Visionary architectural masterplans shaping future skylines."
    },
    {
      number: "03",
      label: "Locations",
      href: "/locations",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      description: "The heritage of Ikoyi, sovereign Banana Island, and coastal enclaves."
    },
    {
      number: "04",
      label: "About Atelier",
      href: "/about",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
      description: "Our philosophy of architectural curation and discreet patronage."
    },
    {
      number: "05",
      label: "Journal",
      href: "/journal",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      description: "Selected architectural essays, engineering monographs, and material studies."
    },
    {
      number: "06",
      label: "Contact & Advisory",
      href: "/contact",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      description: "Direct connection with our private client advisory gallery."
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-[#0E0F0F] text-[#F4F1EA] flex flex-col justify-between overflow-hidden animate-in fade-in duration-500 select-none">
      {/* Dynamic Background on Hover */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-out">
        {hoveredImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-20 scale-105"
            style={{ backgroundImage: `url(${hoveredImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0F0F] via-[#0E0F0F]/80 to-[#0E0F0F]/90" />
      </div>

      {/* Top Header inside Menu */}
      <div className="relative z-10 w-full px-8 md:px-16 py-8 flex items-center justify-between border-b border-white/10">
        <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A880]">
          {BRAND_CONFIG.name} — CURATED DIRECTORY
        </span>
        <button
          onClick={() => {
            audioSystem.playClick();
            onClose();
          }}
          className="p-2 border border-white/20 hover:border-[#C5A880] text-white hover:text-[#C5A880] transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-mono"
        >
          <X size={16} />
          <span>Close</span>
        </button>
      </div>

      {/* Center Links with Oversized Editorial Typography */}
      <div className="relative z-10 w-full px-8 md:px-16 py-6 flex-1 flex flex-col justify-center max-w-6xl mx-auto">
        <nav className="space-y-3 md:space-y-4">
          {menuItems.map((item) => (
            <div
              key={item.number}
              onMouseEnter={() => {
                audioSystem.playClick();
                setHoveredImage(item.image);
              }}
              onMouseLeave={() => setHoveredImage(null)}
              className="group flex flex-col md:flex-row md:items-baseline justify-between border-b border-white/5 pb-2 md:pb-3 transition-colors hover:border-[#C5A880]/40"
            >
              <Link
                to={item.href}
                onClick={() => {
                  audioSystem.playTransition();
                  onClose();
                }}
                className="flex items-baseline gap-4 md:gap-8"
              >
                <span className="text-xs md:text-sm font-mono text-[#6B6B67] group-hover:text-[#C5A880] transition-colors">
                  {item.number}
                </span>
                <span className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#F4F1EA] group-hover:text-[#C5A880] group-hover:translate-x-3 transition-all duration-300">
                  {item.label}
                </span>
              </Link>
              <span className="text-xs text-[#A0A09B] font-sans-ui max-w-sm hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                {item.description}
              </span>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Footer Details */}
      <div className="relative z-10 w-full px-8 md:px-16 py-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-[#6B6B67]">
        <div className="flex items-center gap-6">
          <span>LAGOS: {BRAND_CONFIG.contact.phoneDisplay}</span>
          <span>EMAIL: {BRAND_CONFIG.contact.conciergeEmail}</span>
        </div>

        <div className="flex items-center gap-6">
          {BRAND_CONFIG.socials.map((soc) => (
            <a 
              key={soc.label} 
              href={soc.url} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#C5A880] transition-colors"
            >
              {soc.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
