import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Compass } from 'lucide-react';
import { LOCATIONS } from '../data/locations';
import { PROPERTIES } from '../data/properties';
import PropertyMap from '../components/property/PropertyMap';
import { audioSystem } from '../utils/audioSystem';

export default function Locations({ onSelectProperty = () => {}, onRequestViewing = () => {} }) {
  const [activeLocationId, setActiveLocationId] = useState(LOCATIONS[0].id);
  const [showMap, setShowMap] = useState(false);

  const activeLocation = LOCATIONS.find((l) => l.id === activeLocationId) || LOCATIONS[0];
  const locationProperties = PROPERTIES.filter((p) => p.location.toLowerCase() === activeLocation.name.toLowerCase());

  return (
    <div className="pt-32 pb-28 px-6 md:px-16 max-w-7xl mx-auto select-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
            TERRITORIAL ENCLAVES
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Prime Enclaves
          </h1>
        </div>

        <button
          onClick={() => {
            audioSystem.playClick();
            setShowMap(!showMap);
          }}
          className={`px-4 py-2 border text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 ${
            showMap 
              ? 'border-[#C5A880] text-[#C5A880] bg-[#C5A880]/10' 
              : 'border-white/15 text-[#A0A09B] hover:text-white hover:border-white'
          }`}
        >
          <Compass size={14} />
          <span>{showMap ? 'Hide Cartography Map' : 'View Cartography Map'}</span>
        </button>
      </div>

      {showMap && (
        <div className="mb-16 animate-in fade-in duration-300">
          <PropertyMap
            properties={PROPERTIES}
            onSelectProperty={onSelectProperty}
            onRequestViewing={onRequestViewing}
          />
        </div>
      )}

      {/* Interactive Location Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Enclave Selector Tabs (Left) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#6B6B67] uppercase block mb-4">
            SELECT AN ENCLAVE:
          </span>
          {LOCATIONS.map((loc) => {
            const isActive = loc.id === activeLocationId;
            return (
              <div
                key={loc.id}
                onClick={() => {
                  audioSystem.playClick();
                  setActiveLocationId(loc.id);
                }}
                className={`p-6 border transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#C5A880] bg-white/5 text-white pl-8'
                    : 'border-white/10 hover:border-white/30 text-[#A0A09B] hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-2xl font-serif tracking-tight">
                    {loc.name}
                  </h3>
                  <span className="text-xs font-mono text-[#C5A880]">
                    {loc.propertyCount} Residences
                  </span>
                </div>
                <p className="text-xs text-[#6B6B67] font-mono truncate">
                  {loc.city}, {loc.country} · {loc.averagePricePerSqm}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Enclave Editorial Feature (Right) */}
        <div className="lg:col-span-7 border border-white/10 bg-[#121314] p-8 md:p-12 animate-in fade-in duration-400 key={activeLocation.id}">
          <div className="relative h-72 overflow-hidden mb-8">
            <img
              src={activeLocation.image}
              alt={activeLocation.name}
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#0E0F0F]/85 text-[10px] font-mono text-[#C5A880] border border-white/10">
              {activeLocation.propertyCount} Curated Residences Available
            </div>
          </div>

          <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block mb-2">
            ENCLAVE PROFILE
          </span>
          <h2 className="text-3xl font-serif text-white mb-2">
            {activeLocation.headline}
          </h2>
          <p className="text-sm text-[#A0A09B] font-sans-ui leading-relaxed mb-6">
            {activeLocation.editorial}
          </p>

          {/* Lifestyle tags */}
          <div className="mb-8">
            <span className="text-[10px] font-mono text-[#6B6B67] uppercase tracking-wider block mb-2">
              LIFESTYLE CHARACTERISTICS:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeLocation.lifestyle.map((char, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-xs text-[#D0CAC0] font-mono">
                  {char}
                </span>
              ))}
            </div>
          </div>

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
          >
            <span>View Residences in {activeLocation.name}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
