import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ArrowUpRight, Compass, Eye, ShieldCheck, 
  Sparkles, Layers, SlidersHorizontal, MapPin, Check, Play 
} from 'lucide-react';
import HeroCanvas from '../components/three/HeroCanvas';
import PropertyCard from '../components/property/PropertyCard';
import PropertyMap from '../components/property/PropertyMap';
import { PROPERTIES, LIFESTYLE_CATEGORIES } from '../data/properties';
import { DEVELOPMENTS } from '../data/developments';
import { LOCATIONS } from '../data/locations';
import { JOURNAL_ARTICLES } from '../data/journal';
import { BRAND_CONFIG } from '../data/config';
import { formatPrice } from '../utils/formatCurrency';
import { audioSystem } from '../utils/audioSystem';

export default function Home({
  currency = 'NGN',
  isSaved = () => false,
  isCompared = () => false,
  onToggleSave = () => {},
  onToggleCompare = () => {},
  onSelectProperty = () => {},
  onRequestViewing = () => {}
}) {
  const [heroMood, setHeroMood] = useState('golden');
  const [heroXRay, setHeroXRay] = useState(false);
  const [heroLevel, setHeroLevel] = useState('all');
  const [heroAutoTour, setHeroAutoTour] = useState(false);

  // Discovery Mode state: 'editorial' | 'discovery' | 'map'
  const [viewMode, setViewMode] = useState('editorial');
  const [activeLocationFilter, setActiveLocationFilter] = useState('All');
  const [activeTypeFilter, setActiveTypeFilter] = useState('All');

  // Featured flagship property (The Aurelia Residence - Demonstration Architectural Digital Twin)
  const aureliaProperty = PROPERTIES.find((p) => p.id === 'aurelia-residence' || p.id === 'azure-residence') || PROPERTIES[0];
  const oceanHouse = PROPERTIES.find((p) => p.id === 'ocean-house') || PROPERTIES[1];

  // Discovery Filtered items
  const filteredProperties = PROPERTIES.filter((p) => {
    if (activeLocationFilter !== 'All' && p.location !== activeLocationFilter) return false;
    if (activeTypeFilter !== 'All' && p.type !== activeTypeFilter) return false;
    return true;
  });

  return (
    <div className="relative bg-[#0E0F0F] text-[#F4F1EA] overflow-hidden select-none">
      {/* ========================================================
          SECTION 1: 3D CINEMATIC HERO
         ======================================================== */}
      <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-between">
        {/* 3D Scene Layer */}
        <div className="absolute inset-0 z-0" data-cursor="explore">
          <HeroCanvas
            mood={heroMood}
            onMoodChange={setHeroMood}
            xRayMode={heroXRay}
            onToggleXRay={() => setHeroXRay(!heroXRay)}
            activeLevel={heroLevel}
            onChangeLevel={setHeroLevel}
            autoTour={heroAutoTour}
            onToggleAutoTour={() => setHeroAutoTour(!heroAutoTour)}
          />
        </div>

        {/* Minimal Editorial Text Overlay */}
        <div className="relative z-10 pt-32 md:pt-40 px-6 md:px-16 pointer-events-none max-w-4xl">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-[#0E0F0F]/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] mb-4 pointer-events-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            LAGOS WATERFRONT RESIDENCES & SKY PENTHOUSES
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-[#F4F1EA] tracking-tight leading-[0.92] mb-6">
            LIVE<br />
            <span className="italic text-[#C5A880]">EXCEPTIONALLY.</span>
          </h1>

          <p className="text-sm md:text-base text-[#D0CAC0] font-sans-ui max-w-lg leading-relaxed mb-8 pointer-events-auto">
            {BRAND_CONFIG.tagline} Visionary modern residences engineered with monolithic honesty, infinite water margins, and architectural stillness.
          </p>

          <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
            <button
              onClick={() => {
                audioSystem.playTransition();
                onSelectProperty(aureliaProperty);
              }}
              className="px-6 py-3.5 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors flex items-center gap-3 shadow-xl"
            >
              <Eye size={15} />
              <span>Enter The Residence</span>
            </button>

            <button
              onClick={() => {
                audioSystem.playClick();
                setHeroAutoTour(!heroAutoTour);
              }}
              className="px-5 py-3.5 border border-white/20 hover:border-white text-white text-xs uppercase tracking-widest transition-colors flex items-center gap-2 bg-[#0E0F0F]/40 backdrop-blur-md"
            >
              <Play size={13} />
              <span>{heroAutoTour ? 'Pause Film' : 'Watch 3D Film'}</span>
            </button>

            <Link
              to="/properties"
              className="text-xs uppercase tracking-widest text-[#A0A09B] hover:text-white underline underline-offset-8 font-mono ml-2"
            >
              Browse Portfolio ({PROPERTIES.length})
            </Link>
          </div>
        </div>

        {/* Hero Bottom Bar: Scroll Indicator */}
        <div className="relative z-10 px-6 md:px-16 pb-8 flex items-center justify-between text-xs font-mono text-[#6B6B67] pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
            <span className="text-[11px] tracking-widest uppercase text-[#A0A09B]">
              3D INTERACTIVE ARCHITECTURAL CANVAS · DRAG TO ROTATE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#A0A09B]">
              SCROLL TO DISCOVER
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: BRAND MANIFESTO
         ======================================================== */}
      <section className="relative py-28 md:py-36 px-6 md:px-16 border-t border-white/10 bg-[#0E0F0F]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Big Typography */}
            <div className="lg:col-span-8 space-y-6">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block">
                ATELIER CONSTITUTION
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.08]">
                WE DON'T SIMPLY<br />
                <span className="text-[#6B6B67]">LIST PROPERTY.</span><br />
                WE CURATE PLACES<br />
                <span className="italic text-[#C5A880]">WORTH LIVING IN.</span>
              </h2>
              <p className="text-sm md:text-base text-[#A0A09B] font-sans-ui max-w-xl leading-relaxed pt-4">
                {BRAND_CONFIG.subManifesto} We bypass the conventional volume market to curate only residences that elevate the human spirit through material permanence, acoustic quiet, and sculptural clarity.
              </p>
            </div>

            {/* Right Architectural Mask Vignette */}
            <div className="lg:col-span-4 relative group">
              <div className="relative overflow-hidden border border-white/15 bg-white/5 p-2">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                  alt="Architectural Materiality"
                  className="w-full h-80 object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="p-4 bg-[#121314]">
                  <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block">
                    MATERIAL PURITY
                  </span>
                  <p className="text-xs text-[#A0A09B] mt-1 font-sans-ui">
                    Board-formed post-tensioned concrete, Roman travertine, and patinated bronze.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: FEATURED RESIDENCES (Editorial Asymmetrical)
         ======================================================== */}
      <section className="relative py-28 md:py-36 px-6 md:px-16 border-t border-white/10 bg-[#101112]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
                CURATED ACQUISITIONS
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                Featured Residences
              </h2>
            </div>
            <p className="text-xs md:text-sm text-[#A0A09B] max-w-sm font-sans-ui leading-relaxed">
              Every residence is presented as a complete architectural monograph with engineering blueprints and multi-chapter journeys.
            </p>
          </div>

          {/* Asymmetrical Editorial Collection */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-16">
            {/* 1. Large-format Featured Residence (Wide full-viewport rhythm) */}
            <PropertyCard
              property={aureliaProperty}
              layoutVariant="editorial-wide"
              currency={currency}
              isSaved={isSaved(aureliaProperty.id)}
              isCompared={isCompared(aureliaProperty.id)}
              onToggleSave={onToggleSave}
              onToggleCompare={onToggleCompare}
              onSelect={onSelectProperty}
              onRequestViewing={onRequestViewing}
            />

            {/* 2. Offset Secondary Residence (Ocean House) */}
            <PropertyCard
              property={oceanHouse}
              layoutVariant="editorial-tall"
              currency={currency}
              isSaved={isSaved(oceanHouse.id)}
              isCompared={isCompared(oceanHouse.id)}
              onToggleSave={onToggleSave}
              onToggleCompare={onToggleCompare}
              onSelect={onSelectProperty}
              onRequestViewing={onRequestViewing}
            />

            {/* 3. The Meridian Penthouse (Offset alongside Ocean House) */}
            <PropertyCard
              property={PROPERTIES.find((p) => p.id === 'meridian-penthouse')}
              layoutVariant="editorial-tall"
              currency={currency}
              isSaved={isSaved('meridian-penthouse')}
              isCompared={isCompared('meridian-penthouse')}
              onToggleSave={onToggleSave}
              onToggleCompare={onToggleCompare}
              onSelect={onSelectProperty}
              onRequestViewing={onRequestViewing}
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: IMMERSIVE FEATURED PROPERTY (Scroll Showcase)
         ======================================================== */}
      <section className="relative py-28 md:py-36 px-6 md:px-16 border-t border-white/10 bg-[#0E0F0F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Big Photographic Composition */}
            <div className="lg:col-span-7 relative group">
              <div className="relative overflow-hidden border border-white/15 min-h-[480px] lg:min-h-[600px]">
                <img
                  src={oceanHouse.heroImage}
                  alt={oceanHouse.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0F] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest block mb-1">
                      IMMERSIVE SPOTLIGHT
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white">
                      {oceanHouse.title}
                    </h3>
                    <p className="text-xs font-mono text-[#A0A09B]">
                      {oceanHouse.district}, {oceanHouse.city}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      audioSystem.playTransition();
                      onSelectProperty(oceanHouse);
                    }}
                    className="px-4 py-2.5 bg-[#F4F1EA] text-[#0E0F0F] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#C5A880] transition-colors"
                  >
                    Enter Residence →
                  </button>
                </div>
              </div>
            </div>

            {/* Right Information & Chapters */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block">
                WATERFRONT ARCHITECTURE
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
                Sculpted for Ocean Margins.
              </h2>
              <p className="text-sm text-[#A0A09B] font-sans-ui leading-relaxed">
                {oceanHouse.editorialStory}
              </p>

              {/* Architectural Metrics */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 font-mono text-xs">
                <div>
                  <span className="text-[#6B6B67] text-[10px] uppercase block">VALUATION</span>
                  <span className="text-[#C5A880] font-serif text-lg">{formatPrice(oceanHouse.price, currency)}</span>
                </div>
                <div>
                  <span className="text-[#6B6B67] text-[10px] uppercase block">LAND & WATER MARGIN</span>
                  <span className="text-white text-sm">1,150 m² Internal</span>
                </div>
                <div>
                  <span className="text-[#6B6B67] text-[10px] uppercase block">ACCOMMODATION</span>
                  <span className="text-white text-sm">6 Suites · 7 Baths</span>
                </div>
                <div>
                  <span className="text-[#6B6B67] text-[10px] uppercase block">YACHT BERTH</span>
                  <span className="text-white text-sm">Deep-water Slipway</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => {
                    audioSystem.playClick();
                    onRequestViewing(oceanHouse);
                  }}
                  className="px-6 py-3 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
                >
                  Request Private Viewing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: PROPERTY DISCOVERY (Dual Mode: Editorial vs Discovery vs Map)
         ======================================================== */}
      <section className="relative py-28 md:py-36 px-6 md:px-16 border-t border-white/10 bg-[#121314]">
        <div className="max-w-7xl mx-auto">
          {/* Header & Mode Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
                PORTFOLIO DIRECTORY
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                Find Your Place
              </h2>
            </div>

            {/* DUAL MODE CONTROLS: Editorial Mode vs Discovery Mode vs Map Mode */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono text-[#6B6B67] uppercase tracking-widest">
                VIEW MODE:
              </span>
              <div className="flex border border-white/15 p-1 bg-white/5">
                {[
                  { id: 'editorial', label: 'Editorial Mode' },
                  { id: 'discovery', label: 'Discovery Grid' },
                  { id: 'map', label: 'Cartography Map' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      audioSystem.playClick();
                      setViewMode(mode.id);
                    }}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider font-mono transition-colors ${
                      viewMode === mode.id
                        ? 'bg-[#C5A880] text-[#0E0F0F] font-semibold'
                        : 'text-[#A0A09B] hover:text-white'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Filter Bar */}
          <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 text-xs font-mono">
            {/* Location Enclave Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#6B6B67] uppercase mr-1">ENCLAVE:</span>
              {['All', 'Ikoyi', 'Banana Island', 'Victoria Island', 'Eko Atlantic', 'Lekki'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    audioSystem.playClick();
                    setActiveLocationFilter(loc);
                  }}
                  className={`px-2.5 py-1 border transition-colors ${
                    activeLocationFilter === loc
                      ? 'border-[#C5A880] text-[#C5A880] bg-[#C5A880]/10'
                      : 'border-white/10 text-[#A0A09B] hover:border-white/30'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            {/* Dynamic Count */}
            <div className="text-[#C5A880]">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'RESIDENCE AVAILABLE' : 'RESIDENCES AVAILABLE'}
            </div>
          </div>

          {/* Display according to View Mode */}
          <div className="pt-12">
            {viewMode === 'map' ? (
              <PropertyMap
                properties={filteredProperties}
                currency={currency}
                onSelectProperty={onSelectProperty}
                onRequestViewing={onRequestViewing}
              />
            ) : viewMode === 'discovery' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map((p) => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    layoutVariant="standard"
                    currency={currency}
                    isSaved={isSaved(p.id)}
                    isCompared={isCompared(p.id)}
                    onToggleSave={onToggleSave}
                    onToggleCompare={onToggleCompare}
                    onSelect={onSelectProperty}
                    onRequestViewing={onRequestViewing}
                  />
                ))}
              </div>
            ) : (
              /* Editorial View Mode (Asymmetrical & spacious) */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {filteredProperties.map((p, idx) => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    layoutVariant={idx % 3 === 0 ? 'editorial-wide' : 'editorial-tall'}
                    currency={currency}
                    isSaved={isSaved(p.id)}
                    isCompared={isCompared(p.id)}
                    onToggleSave={onToggleSave}
                    onToggleCompare={onToggleCompare}
                    onSelect={onSelectProperty}
                    onRequestViewing={onRequestViewing}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: EXPLORE BY LIFESTYLE
         ======================================================== */}
      <section className="relative py-28 md:py-36 px-6 md:px-16 border-t border-white/10 bg-[#0E0F0F]">
        <div className="max-w-7xl mx-auto">
          <div className="pb-16 text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
              EMOTIONAL DISCOVERY
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
              How Do You Want to Live?
            </h2>
            <p className="text-xs md:text-sm text-[#A0A09B] font-sans-ui mt-3">
              Filter by the sensorial atmosphere and architectural relationship with the environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LIFESTYLE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => audioSystem.playClick()}
                className="group relative h-96 overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0F] via-[#0E0F0F]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block mb-1">
                    {cat.count} Residences
                  </span>
                  <h3 className="text-xl font-serif text-white group-hover:text-[#C5A880] transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#A0A09B] font-sans-ui line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: DESTINATIONS & PRIME LOCATIONS
         ======================================================== */}
      <section className="relative py-28 md:py-36 px-6 md:px-16 border-t border-white/10 bg-[#101112]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
                TERRITORIAL ENCLAVES
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                Prime Enclaves
              </h2>
            </div>
            <Link
              to="/locations"
              className="text-xs font-mono uppercase tracking-widest text-[#C5A880] hover:text-white underline underline-offset-4"
            >
              Explore All Enclaves →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {LOCATIONS.slice(0, 3).map((loc) => (
              <div 
                key={loc.id}
                className="group border border-white/10 bg-[#141516] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden mb-6">
                    <img 
                      src={loc.image} 
                      alt={loc.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-[#0E0F0F]/80 text-[10px] font-mono text-[#C5A880]">
                      {loc.propertyCount} Residences
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#6B6B67] uppercase tracking-wider block mb-1">
                    {loc.city}, {loc.country}
                  </span>
                  <h3 className="text-2xl font-serif text-white mb-2">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-[#A0A09B] font-sans-ui leading-relaxed line-clamp-3 mb-6">
                    {loc.editorial}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#C5A880]">
                  <span>Average: {loc.averagePricePerSqm}</span>
                  <Link to="/locations" className="hover:text-white flex items-center gap-1">
                    Inspect Enclave →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8: SIGNATURE DEVELOPMENTS
         ======================================================== */}
      <section className="relative py-28 md:py-36 px-6 md:px-16 border-t border-white/10 bg-[#0E0F0F]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
                VISIONARY MASTERPLANS
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                Signature Developments
              </h2>
            </div>
            <Link
              to="/developments"
              className="text-xs font-mono uppercase tracking-widest text-[#C5A880] hover:text-white underline underline-offset-4"
            >
              Inspect Developments Portfolio →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-12">
            {DEVELOPMENTS.slice(0, 2).map((dev) => (
              <div 
                key={dev.id}
                className="group border border-white/10 bg-[#121314] overflow-hidden flex flex-col justify-between"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={dev.heroImage}
                    alt={dev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#0E0F0F]/85 text-[10px] font-mono text-[#C5A880] border border-white/10">
                    {dev.status}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between text-xs font-mono text-[#A0A09B] mb-2">
                    <span>{dev.location} · {dev.city}</span>
                    <span>Completion: {dev.completion}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                    {dev.title}
                  </h3>
                  <p className="text-xs text-[#A0A09B] font-sans-ui leading-relaxed mb-6">
                    {dev.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono border-t border-white/10 pt-4 mb-6">
                    <div>
                      <span className="text-[#6B6B67] text-[10px] block">TIER</span>
                      <span className="text-white">{dev.startingPriceLabel}</span>
                    </div>
                    <div>
                      <span className="text-[#6B6B67] text-[10px] block">DEVELOPER</span>
                      <span className="text-white truncate block">{dev.developer}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      audioSystem.playClick();
                      onRequestViewing();
                    }}
                    className="w-full py-3 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
                  >
                    Register Interest & Download Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 9: ARCHITECTURAL JOURNAL / SELECTED INSIGHTS
         ======================================================== */}
      <section className="relative py-28 md:py-36 px-6 md:px-16 border-t border-white/10 bg-[#101112]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
                EDITORIAL MONOGRAPHS
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
                Selected Insights
              </h2>
            </div>
            <Link
              to="/journal"
              className="text-xs font-mono uppercase tracking-widest text-[#C5A880] hover:text-white underline underline-offset-4"
            >
              Read Full Journal →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {JOURNAL_ARTICLES.map((article) => (
              <article 
                key={article.id}
                className="group border border-white/10 bg-[#141516] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden mb-6">
                    <img 
                      src={article.heroImage} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-[#0E0F0F]/80 text-[10px] font-mono text-[#C5A880]">
                      {article.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] font-mono text-[#6B6B67] mb-2">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-xl font-serif text-white group-hover:text-[#C5A880] transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#A0A09B] font-sans-ui line-clamp-3 leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <Link
                  to="/journal"
                  className="text-xs font-mono text-[#C5A880] hover:text-white uppercase tracking-wider flex items-center gap-2 pt-4 border-t border-white/10"
                >
                  <span>Read Monograph</span>
                  <ArrowRight size={12} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 10: PRIVATE CLIENT CTA & ADVISORY
         ======================================================== */}
      <section className="relative py-28 md:py-36 px-6 md:px-16 border-t border-white/10 bg-[#0E0F0F]">
        <div className="max-w-5xl mx-auto border border-white/15 bg-white/5 p-8 md:p-16 text-center space-y-6">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block">
            PRIVATE CLIENT ADVISORY
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
            Schedule a Confidential Viewing Consultation
          </h2>
          <p className="text-sm text-[#A0A09B] font-sans-ui max-w-xl mx-auto leading-relaxed">
            Our Senior Advisory partners provide bespoke counsel on prime waterfront acquisitions, off-market estate holdings, and architectural commissions.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                audioSystem.playClick();
                onRequestViewing();
              }}
              className="px-8 py-4 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
            >
              Request Private Access
            </button>
            <a
              href={BRAND_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 border border-white/20 hover:border-white text-white text-xs uppercase tracking-widest transition-colors font-mono"
            >
              Direct WhatsApp Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
