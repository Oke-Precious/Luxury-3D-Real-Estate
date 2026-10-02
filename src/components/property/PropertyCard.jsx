import React from 'react';
import { Bookmark, ArrowUpRight, Check, Eye, Compass } from 'lucide-react';
import { formatPrice } from '../../utils/formatCurrency';
import { audioSystem } from '../../utils/audioSystem';

export default function PropertyCard({
  property,
  layoutVariant = 'editorial-wide', // 'editorial-wide' | 'editorial-tall' | 'standard'
  currency = 'NGN',
  isSaved = false,
  isCompared = false,
  onToggleSave = () => {},
  onToggleCompare = () => {},
  onSelect = () => {},
  onRequestViewing = () => {}
}) {
  const isWide = layoutVariant === 'editorial-wide';
  const isTall = layoutVariant === 'editorial-tall';

  return (
    <article 
      data-cursor="view"
      className={`group relative overflow-hidden border border-white/10 bg-[#121314] transition-all duration-700 ease-out hover:border-[#C5A880]/50 ${
        isWide ? 'col-span-1 lg:col-span-12' : isTall ? 'col-span-1 lg:col-span-6' : 'col-span-1 lg:col-span-4'
      }`}
    >
      <div className={`flex flex-col ${isWide ? 'lg:flex-row' : ''} h-full`}>
        {/* Visual Image Section */}
        <div 
          onClick={() => {
            audioSystem.playTransition();
            onSelect(property);
          }}
          className={`relative overflow-hidden cursor-pointer ${
            isWide ? 'lg:w-7/12 min-h-[420px] lg:min-h-[560px]' : isTall ? 'min-h-[420px]' : 'min-h-[300px]'
          }`}
        >
          <img
            src={property.heroImage}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0F] via-transparent to-transparent opacity-60" />

          {/* Top Badges: Typology & Status */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-[#0E0F0F]/85 backdrop-blur-md text-[10px] font-mono tracking-widest text-[#C5A880] uppercase border border-white/10">
              {property.type}
            </span>
            {property.spatialAvailable && (
              <span className="px-2.5 py-1 bg-[#14181B]/95 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/50 text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 shadow-lg">
                <Compass size={11} className="text-[#C5A880]" />
                3D SPATIAL EXPLORATION
              </span>
            )}
            {property.featured && !property.spatialAvailable && (
              <span className="px-2.5 py-1 bg-[#C5A880] text-[#0E0F0F] text-[10px] font-mono tracking-widest font-semibold uppercase">
                Featured
              </span>
            )}
          </div>

          {/* Quick Floating Action: Save & Compare */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property.id);
              }}
              className={`p-2 backdrop-blur-md border transition-all text-xs font-mono uppercase tracking-wider ${
                isCompared 
                  ? 'bg-[#C5A880] text-[#0E0F0F] border-[#C5A880]' 
                  : 'bg-[#0E0F0F]/70 text-[#A0A09B] border-white/15 hover:text-white hover:border-white'
              }`}
              title={isCompared ? "Remove from comparison" : "Add to comparison"}
            >
              {isCompared ? 'Compared' : 'Compare'}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(property.id);
              }}
              className={`p-2 backdrop-blur-md border transition-all ${
                isSaved 
                  ? 'bg-[#C5A880] text-[#0E0F0F] border-[#C5A880]' 
                  : 'bg-[#0E0F0F]/70 text-[#A0A09B] border-white/15 hover:text-white hover:border-white'
              }`}
              title={isSaved ? "Remove from saved" : "Save residence"}
            >
              <Bookmark size={15} />
            </button>
          </div>

          {/* Hover Overlay Hint */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-3 py-1.5 bg-[#0E0F0F]/90 backdrop-blur-md text-xs font-mono tracking-widest uppercase text-[#C5A880] border border-white/10 flex items-center gap-2">
              <Eye size={13} />
              ENTER THE RESIDENCE
            </span>
            <span className="text-xs font-mono text-[#F4F1EA] bg-[#0E0F0F]/90 px-3 py-1.5 border border-white/10">
              {property.chapters ? `${property.chapters.length} Chapters` : 'Walkthrough'}
            </span>
          </div>
        </div>

        {/* Editorial Information Section */}
        <div className={`p-8 md:p-10 flex flex-col justify-between ${isWide ? 'lg:w-5/12' : ''}`}>
          <div>
            {/* Location & District */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#A0A09B] tracking-[0.2em] uppercase mb-2">
              <span>{property.location}</span>
              <span>·</span>
              <span>{property.city}</span>
            </div>

            {/* Title */}
            <h3 
              onClick={() => {
                audioSystem.playTransition();
                onSelect(property);
              }}
              className="text-2xl md:text-3xl lg:text-4xl font-serif text-white tracking-tight leading-tight hover:text-[#C5A880] transition-colors cursor-pointer mb-3"
            >
              {property.title}
            </h3>

            {/* Subtitle / Tagline */}
            <p className="text-xs md:text-sm text-[#A0A09B] font-sans-ui leading-relaxed mb-6">
              {property.subtitle}
            </p>

            {/* Architectural Specifications Grid */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/10 text-xs font-mono mb-6">
              <div>
                <span className="text-[10px] text-[#6B6B67] uppercase block">BEDROOMS</span>
                <span className="text-white font-medium text-sm">{property.bedrooms} Suites</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B6B67] uppercase block">BATHROOMS</span>
                <span className="text-white font-medium text-sm">{property.bathrooms} Baths</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6B6B67] uppercase block">INTERNAL AREA</span>
                <span className="text-white font-medium text-sm">{property.internalArea} m²</span>
              </div>
            </div>

            {/* Key Amenities preview */}
            {isWide && property.amenities && (
              <div className="space-y-1.5 mb-6 hidden md:block">
                <span className="text-[10px] font-mono text-[#6B6B67] uppercase tracking-wider block mb-1">
                  ARCHITECTURAL FEATURES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.slice(0, 3).map((amenity, idx) => (
                    <span 
                      key={idx}
                      className="text-xs text-[#A0A09B] bg-white/5 border border-white/5 px-2.5 py-1"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Price & Action CTA */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#6B6B67] uppercase tracking-wider block">
                VALUATION
              </span>
              <div className="text-xl md:text-2xl font-serif text-[#C5A880]">
                {formatPrice(property.price, currency)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  audioSystem.playTransition();
                  onSelect(property);
                }}
                className="px-5 py-2.5 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors flex items-center gap-2"
              >
                <span>Enter Residence</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
