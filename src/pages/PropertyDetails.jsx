import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Eye, Bookmark, Share2, Compass, Check, Calendar, 
  MapPin, Shield, Layers, ArrowUpRight 
} from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import { formatPrice } from '../utils/formatCurrency';
import { audioSystem } from '../utils/audioSystem';

export default function PropertyDetails({
  currency = 'NGN',
  isSaved = () => false,
  isCompared = () => false,
  onToggleSave = () => {},
  onToggleCompare = () => {},
  onEnterExperience = () => {},
  onRequestViewing = () => {}
}) {
  const { id } = useParams();
  const property = PROPERTIES.find((p) => p.id === id || p.slug === id) || PROPERTIES[0];

  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const floorPlans = property.floorPlans || [];
  const currentFloor = floorPlans[activeFloorIndex] || floorPlans[0];

  return (
    <div className="bg-[#0E0F0F] text-[#F4F1EA] select-none">
      {/* 1. EDITORIAL FULL-SCREEN HERO */}
      <section className="relative h-screen min-h-[640px] flex flex-col justify-between p-6 md:p-16 overflow-hidden">
        {/* Full-bleed background */}
        <div className="absolute inset-0 z-0">
          <img
            src={property.heroImage}
            alt={property.title}
            className="w-full h-full object-cover brightness-75 scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0F] via-transparent to-[#0E0F0F]/60" />
        </div>

        {/* Top Back bar */}
        <div className="relative z-10 pt-20 flex items-center justify-between">
          <Link
            to="/properties"
            onClick={() => audioSystem.playClick()}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#D0CAC0] hover:text-[#C5A880] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleCompare(property.id)}
              className={`px-3 py-1.5 backdrop-blur-md border text-xs font-mono uppercase tracking-wider transition-colors ${
                isCompared(property.id)
                  ? 'bg-[#C5A880] text-[#0E0F0F] border-[#C5A880]'
                  : 'bg-[#0E0F0F]/70 text-[#A0A09B] border-white/15 hover:text-white'
              }`}
            >
              {isCompared(property.id) ? 'Compared' : 'Compare'}
            </button>
            <button
              onClick={() => onToggleSave(property.id)}
              className={`p-2 backdrop-blur-md border transition-colors ${
                isSaved(property.id)
                  ? 'bg-[#C5A880] text-[#0E0F0F] border-[#C5A880]'
                  : 'bg-[#0E0F0F]/70 text-[#A0A09B] border-white/15 hover:text-white'
              }`}
            >
              <Bookmark size={15} />
            </button>
          </div>
        </div>

        {/* Hero Editorial Titles */}
        <div className="relative z-10 max-w-4xl">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
            {property.district} · {property.city}
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[0.95] mb-4">
            {property.title}
          </h1>
          <p className="text-sm md:text-base text-[#D0CAC0] font-sans-ui max-w-xl leading-relaxed mb-6">
            {property.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                audioSystem.playTransition();
                onEnterExperience(property);
              }}
              className="px-6 py-3.5 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors flex items-center gap-3"
            >
              <Eye size={15} />
              <span>Enter The Residence</span>
            </button>

            <button
              onClick={() => {
                audioSystem.playClick();
                onRequestViewing(property);
              }}
              className="px-6 py-3.5 border border-white/20 hover:border-white text-white text-xs uppercase tracking-widest transition-colors"
            >
              Request Private Viewing
            </button>

            <div className="text-sm font-mono text-[#C5A880] ml-2">
              Valuation: <span className="font-serif text-lg text-white">{formatPrice(property.price, currency)}</span>
            </div>
          </div>
        </div>

        {/* Hero Bottom indicator */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#A0A09B]">
          <span>ARCHITECT: {property.architect}</span>
          <span className="uppercase tracking-widest">SCROLL TO EXPERIENCE MONOGRAPH ↓</span>
        </div>
      </section>

      {/* 2. ARCHITECTURAL STORY & SPECIFICATIONS */}
      <section className="py-24 px-6 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Editorial Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block">
              ARCHITECTURAL MONOGRAPH
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-white leading-snug">
              Material Permanence & Spatial Rhythm
            </h2>
            <div className="text-sm text-[#A0A09B] font-sans-ui leading-relaxed space-y-4">
              {property.editorialStory.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Amenities Checklist */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block mb-4">
                CURATED AMENITIES & SYSTEMS:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#D0CAC0]">
                {property.amenities.map((am, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check size={14} className="text-[#C5A880] shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Architectural Information Layout (Refined, no ugly cards) */}
          <div className="lg:col-span-5 border-l border-white/10 pl-0 lg:pl-10 space-y-6 font-mono text-xs">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A880] block">
              SCHEDULE OF AREAS & METRICS
            </span>

            <div className="divide-y divide-white/10">
              <div className="py-3 flex justify-between">
                <span className="text-[#6B6B67]">INTERNAL AREA</span>
                <span className="text-white font-medium">{property.internalArea} m²</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-[#6B6B67]">EXTERNAL WATER/TERRACE</span>
                <span className="text-white font-medium">{property.externalArea} m²</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-[#6B6B67]">BEDROOM SUITES</span>
                <span className="text-white font-medium">{property.bedrooms} Suites</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-[#6B6B67]">BATHROOMS</span>
                <span className="text-white font-medium">{property.bathrooms} Marble Baths</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-[#6B6B67]">VEHICLE GALLERY</span>
                <span className="text-white font-medium">{property.parking} Bays</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-[#6B6B67]">YEAR OF COMPLETION</span>
                <span className="text-white font-medium">{property.yearBuilt}</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="text-[#6B6B67]">STATUS</span>
                <span className="text-[#C5A880] font-medium">{property.status}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  audioSystem.playClick();
                  onRequestViewing(property);
                }}
                className="w-full py-3.5 bg-[#C5A880] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
              >
                Inquire About Acquisition
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IMMERSIVE PROPERTY GALLERY CHAPTERS */}
      {property.gallery && property.gallery.length > 0 && (
        <section className="py-24 border-t border-white/10 bg-[#121314]">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="pb-12">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
                VISUAL MONOGRAPH
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                Architectural Chapters
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {property.gallery.map((img, idx) => (
                <div key={idx} className="group relative overflow-hidden border border-white/10 bg-black">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-4 bg-[#141516] flex justify-between items-center text-xs font-mono">
                    <span className="text-[#A0A09B] font-sans-ui">{img.caption}</span>
                    <span className="text-[#C5A880]">0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. INTERACTIVE FLOOR PLAN SCHEMATIC */}
      {floorPlans.length > 0 && (
        <section className="py-24 border-t border-white/10 bg-[#0E0F0F]">
          <div className="max-w-6xl mx-auto px-6 md:px-16">
            <div className="pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
                  BLUEPRINT SCHEMATICS
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                  Interactive Floor Plans
                </h2>
              </div>

              {/* Level switch */}
              <div className="flex border border-white/15 p-1 bg-white/5">
                {floorPlans.map((fp, idx) => (
                  <button
                    key={fp.levelCode}
                    onClick={() => {
                      audioSystem.playClick();
                      setActiveFloorIndex(idx);
                      setSelectedRoom(null);
                    }}
                    className={`px-3 py-1.5 text-xs uppercase font-mono transition-colors ${
                      activeFloorIndex === idx
                        ? 'bg-[#C5A880] text-[#0E0F0F] font-semibold'
                        : 'text-[#A0A09B] hover:text-white'
                    }`}
                  >
                    {fp.levelCode}
                  </button>
                ))}
              </div>
            </div>

            {/* CAD Layout Display */}
            <div className="border border-white/10 bg-[#121314] p-6 md:p-10">
              <div className="flex justify-between items-center text-xs font-mono text-[#C5A880] pb-6 border-b border-white/10 mb-8">
                <span>{currentFloor.level}</span>
                <span>{currentFloor.description}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {currentFloor.rooms.map((room) => {
                  const isActive = selectedRoom?.id === room.id;
                  return (
                    <div
                      key={room.id}
                      onClick={() => {
                        audioSystem.playClick();
                        setSelectedRoom(room);
                      }}
                      className={`p-4 border text-left cursor-pointer transition-all ${
                        isActive
                          ? 'border-[#C5A880] bg-[#C5A880]/15 text-white'
                          : 'border-white/10 bg-white/5 hover:border-white/30 text-[#A0A09B]'
                      }`}
                    >
                      <span className="text-xs font-sans-ui font-semibold text-white block mb-1">
                        {room.name}
                      </span>
                      <span className="text-[11px] font-mono text-[#C5A880] block mb-2">
                        {room.area}
                      </span>
                      <p className="text-[11px] text-[#A0A09B] line-clamp-2">
                        {room.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Selected Room Focus Box */}
              {selectedRoom && (
                <div className="p-6 border border-[#C5A880]/40 bg-[#C5A880]/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block">
                      ZONE SPECIFICATION
                    </span>
                    <h4 className="text-lg font-serif text-white">
                      {selectedRoom.name} · {selectedRoom.area}
                    </h4>
                    <p className="text-xs text-[#A0A09B]">{selectedRoom.desc}</p>
                  </div>
                  <button
                    onClick={() => onEnterExperience(property)}
                    className="px-4 py-2 bg-[#F4F1EA] text-[#0E0F0F] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#C5A880] transition-colors"
                  >
                    View in 3D Walkthrough →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. PRIVATE VIEWING CTA FOOTER */}
      <section className="py-24 border-t border-white/10 bg-[#0A0B0B] text-center px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block">
            PRIVATE ACCESS
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
            Experience {property.title} in Person
          </h2>
          <p className="text-xs md:text-sm text-[#A0A09B] leading-relaxed">
            Private viewings are conducted with principal discretion. Chauffeur transfers or marine boat arrivals can be arranged upon request.
          </p>
          <button
            onClick={() => {
              audioSystem.playClick();
              onRequestViewing(property);
            }}
            className="px-8 py-4 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
          >
            Arrange Confidential Viewing
          </button>
        </div>
      </section>
    </div>
  );
}
