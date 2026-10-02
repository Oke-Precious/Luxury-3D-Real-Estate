import React, { useState } from 'react';
import { MapPin, Navigation, ArrowRight, ExternalLink } from 'lucide-react';
import { PROPERTIES } from '../../data/properties';
import { LOCATIONS } from '../../data/locations';
import { formatPrice } from '../../utils/formatCurrency';
import { audioSystem } from '../../utils/audioSystem';

export default function PropertyMap({
  properties = PROPERTIES,
  currency = 'NGN',
  onSelectProperty = () => {},
  onRequestViewing = () => {}
}) {
  const [selectedPropertyId, setSelectedPropertyId] = useState('azure-residence');

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  // Specific custom coordinates on our stylized architectural lagoon map
  const mapCoordinates = {
    'azure-residence': { x: 380, y: 240, label: 'Ikoyi Waterfront' },
    'ocean-house': { x: 520, y: 190, label: 'Banana Island Point' },
    'meridian-penthouse': { x: 420, y: 360, label: 'Victoria Island Shore' },
    'the-monolith': { x: 460, y: 440, label: 'Eko Atlantic Marina' },
    'lumina-villa': { x: 670, y: 280, label: 'Lekki Coastal' },
    'solaris-crest': { x: 550, y: 160, label: 'Banana Island Crest' }
  };

  return (
    <div className="relative w-full h-[600px] bg-[#0A0B0C] border border-white/10 overflow-hidden select-none">
      {/* 1. ARCHITECTURAL VECTOR STYLIZED MAP (Lagos Lagoon & Prime Enclaves) */}
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-cover opacity-85"
      >
        <defs>
          {/* Water Lagoon Gradient */}
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B131A" />
            <stop offset="100%" stopColor="#070D12" />
          </linearGradient>

          {/* Land Mass Pattern */}
          <pattern id="archGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(244, 241, 234, 0.03)" strokeWidth="0.5" />
          </pattern>
        </defs>

        {/* Ocean Background */}
        <rect width="800" height="500" fill="url(#waterGrad)" />
        <rect width="800" height="500" fill="url(#archGrid)" />

        {/* Mainland Shoreline / Ikoyi Landmass */}
        <path
          d="M 120 0 L 480 0 C 470 120 460 210 390 280 C 330 330 240 310 210 260 C 180 200 120 180 100 120 Z"
          fill="#141618"
          stroke="rgba(244, 241, 234, 0.12)"
          strokeWidth="1.2"
        />

        {/* Banana Island Gated Enclave */}
        <path
          d="M 480 150 C 560 130 610 180 580 240 C 530 260 480 220 480 150 Z"
          fill="#181A1C"
          stroke="rgba(197, 168, 128, 0.4)"
          strokeWidth="1.5"
        />

        {/* Victoria Island Landmass */}
        <path
          d="M 220 330 C 350 330 480 320 540 380 C 510 430 380 470 240 450 C 180 430 180 370 220 330 Z"
          fill="#131517"
          stroke="rgba(244, 241, 234, 0.1)"
          strokeWidth="1"
        />

        {/* Eko Atlantic Peninsula */}
        <path
          d="M 380 430 C 490 410 560 440 520 490 C 420 500 370 480 380 430 Z"
          fill="#191C1E"
          stroke="rgba(197, 168, 128, 0.3)"
          strokeWidth="1"
        />

        {/* Lekki Corridor */}
        <path
          d="M 580 250 C 680 210 790 240 800 310 C 760 360 670 340 580 300 Z"
          fill="#151719"
          stroke="rgba(244, 241, 234, 0.08)"
          strokeWidth="1"
        />

        {/* Map District Typography */}
        <text x="320" y="210" fill="#6B6B67" fontSize="11" letterSpacing="4" fontFamily="monospace">
          IKOYI ENCLAVE
        </text>
        <text x="510" y="140" fill="#C5A880" fontSize="10" letterSpacing="3" fontFamily="monospace">
          BANANA ISLAND
        </text>
        <text x="330" y="380" fill="#6B6B67" fontSize="11" letterSpacing="4" fontFamily="monospace">
          VICTORIA ISLAND
        </text>
        <text x="440" y="475" fill="#6B6B67" fontSize="9" letterSpacing="3" fontFamily="monospace">
          EKO ATLANTIC MARINA
        </text>
        <text x="680" y="290" fill="#6B6B67" fontSize="10" letterSpacing="3" fontFamily="monospace">
          LEKKI PHASE 1
        </text>
        <text x="140" y="480" fill="#3D4044" fontSize="12" letterSpacing="6" fontFamily="serif">
          ATLANTIC OCEAN
        </text>

        {/* Interactive Property Pins */}
        {properties.map((p) => {
          const coords = mapCoordinates[p.id] || { x: 400, y: 250 };
          const isSelected = selectedPropertyId === p.id;

          return (
            <g
              key={p.id}
              className="cursor-pointer transition-transform duration-300"
              onClick={() => {
                audioSystem.playClick();
                setSelectedPropertyId(p.id);
              }}
            >
              {/* Radar pulse ring if selected */}
              {isSelected && (
                <circle
                  cx={coords.x}
                  cy={coords.y}
                  r="24"
                  fill="none"
                  stroke="#C5A880"
                  strokeWidth="1"
                  opacity="0.6"
                  className="animate-ping origin-center"
                />
              )}

              {/* Pin outer marker */}
              <circle
                cx={coords.x}
                cy={coords.y}
                r={isSelected ? "9" : "6"}
                fill={isSelected ? "#C5A880" : "#1F2124"}
                stroke={isSelected ? "#FFFFFF" : "#C5A880"}
                strokeWidth="2"
              />

              {/* Center point */}
              <circle
                cx={coords.x}
                cy={coords.y}
                r="3"
                fill={isSelected ? "#0E0F0F" : "#C5A880"}
              />

              {/* Pin Label */}
              <text
                x={coords.x + 12}
                y={coords.y + 4}
                fill={isSelected ? "#FFFFFF" : "#A0A09B"}
                fontSize="10"
                fontFamily="sans-serif"
                fontWeight={isSelected ? "600" : "400"}
              >
                {p.title}
              </text>
            </g>
          );
        })}
      </svg>

      {/* 2. TOP CORNER OVERLAY: Geographic Protocol Badge */}
      <div className="absolute top-6 left-6 z-10 glass-panel px-4 py-3 border-l-2 border-[#C5A880]">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
          <Navigation size={12} className="rotate-45" />
          <span>LAGUNA ARCHITECTURAL CARTOGRAPHY</span>
        </div>
        <p className="text-xs text-[#A0A09B] mt-0.5 font-sans-ui">
          Click any geographical marker to inspect the waterfront residence.
        </p>
      </div>

      {/* 3. BOTTOM PREVIEW DRAWER (When a property is selected) */}
      {selectedProperty && (
        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-96 z-10 glass-panel p-5 border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex gap-4 items-center">
            <img 
              src={selectedProperty.heroImage} 
              alt={selectedProperty.title}
              className="w-20 h-20 object-cover border border-white/10 shrink-0" 
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block">
                {selectedProperty.district}
              </span>
              <h4 className="text-base font-serif text-white truncate">
                {selectedProperty.title}
              </h4>
              <p className="text-xs text-[#A0A09B] font-mono mb-2">
                {formatPrice(selectedProperty.price, currency)}
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectProperty(selectedProperty)}
                  className="text-xs text-[#C5A880] hover:text-white uppercase tracking-wider underline underline-offset-4 font-mono"
                >
                  Enter Residence →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
