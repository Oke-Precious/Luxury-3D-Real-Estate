import React, { useState, useEffect } from 'react';
import { BRAND_CONFIG } from '../../data/config';

export default function Loader({ onComplete }) {
  const [percent, setPercent] = useState(1);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check if user already visited in this session
    const hasVisited = sessionStorage.getItem('atelier_loaded');
    if (hasVisited) {
      onComplete();
      return;
    }

    const steps = [1, 18, 37, 61, 84, 100];
    let stepIndex = 0;

    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setPercent(steps[stepIndex]);
      } else {
        clearInterval(interval);
        sessionStorage.setItem('atelier_loaded', 'true');
        setIsFading(true);
        setTimeout(() => {
          onComplete();
        }, 700);
      }
    }, 280);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0E0F0F] flex flex-col items-center justify-between p-12 transition-opacity duration-700 ease-in-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Protocol Status */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-[0.3em] uppercase text-[#6B6B67]">
        <span>ATELIER ARCHITECTURAL SYSTEMS</span>
        <span>INITIALIZING GEOMETRIES</span>
      </div>

      {/* Center Architectural Wireframe Construction Graphic */}
      <div className="flex flex-col items-center my-auto">
        {/* Architectural Wireframe SVG Isometric Cube / Cantilever */}
        <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#C5A880] fill-none stroke-[0.75]">
            {/* Ground footprint */}
            <polygon points="50,15 85,35 50,55 15,35" strokeDasharray="150" strokeDashoffset={150 - (percent * 1.5)} />
            {/* Vertical concrete pillars */}
            <line x1="15" y1="35" x2="15" y2="70" strokeDasharray="40" strokeDashoffset={40 - (percent * 0.4)} />
            <line x1="85" y1="35" x2="85" y2="70" strokeDasharray="40" strokeDashoffset={40 - (percent * 0.4)} />
            <line x1="50" y1="55" x2="50" y2="90" strokeDasharray="40" strokeDashoffset={40 - (percent * 0.4)} />
            {/* Cantilever roof slab */}
            <polygon points="50,50 85,70 50,90 15,70" strokeDasharray="150" strokeDashoffset={150 - (percent * 1.5)} />
            {/* Interior focal crosshairs */}
            <line x1="50" y1="30" x2="50" y2="75" stroke="#F4F1EA" strokeWidth="0.5" strokeOpacity="0.4" />
          </svg>
        </div>

        {/* Brand Name */}
        <h1 className="text-xl md:text-2xl font-serif tracking-[0.25em] text-[#F4F1EA] mb-2 uppercase">
          {BRAND_CONFIG.name}
        </h1>

        {/* Text statement */}
        <p className="text-[11px] font-mono tracking-[0.25em] text-[#A0A09B] uppercase">
          PREPARING YOUR EXPERIENCE
        </p>
      </div>

      {/* Bottom Percentage Numerals & Progress Bar */}
      <div className="w-full max-w-xs flex flex-col items-center gap-3">
        <div className="w-full flex justify-between text-xs font-mono text-[#C5A880]">
          <span>INDEX</span>
          <span className="font-semibold">{percent.toString().padStart(2, '0')}%</span>
        </div>
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#C5A880] transition-all duration-300 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
