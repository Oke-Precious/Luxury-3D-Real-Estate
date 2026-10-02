import React, { useState } from 'react';
import PropertyCard from '../components/property/PropertyCard';
import PropertyMap from '../components/property/PropertyMap';
import { PROPERTIES } from '../data/properties';
import { audioSystem } from '../utils/audioSystem';

export default function Properties({
  currency = 'NGN',
  isSaved = () => false,
  isCompared = () => false,
  onToggleSave = () => {},
  onToggleCompare = () => {},
  onSelectProperty = () => {},
  onRequestViewing = () => {}
}) {
  const [viewMode, setViewMode] = useState('editorial'); // 'editorial' | 'discovery' | 'map'
  const [listingType, setListingType] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [bedroomFilter, setBedroomFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = PROPERTIES.filter((p) => {
    if (listingType !== 'All' && p.listingType !== listingType) return false;
    if (locationFilter !== 'All' && p.location !== locationFilter) return false;
    if (typeFilter !== 'All' && p.type !== typeFilter) return false;
    if (bedroomFilter !== 'All' && p.bedrooms < parseInt(bedroomFilter, 10)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = p.title.toLowerCase().includes(q) || p.district.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleClearFilters = () => {
    audioSystem.playClick();
    setListingType('All');
    setLocationFilter('All');
    setTypeFilter('All');
    setBedroomFilter('All');
    setSearchQuery('');
  };

  return (
    <div className="pt-32 pb-28 px-6 md:px-16 max-w-7xl mx-auto select-none">
      {/* Editorial Page Header */}
      <div className="border-b border-white/10 pb-12 mb-12">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
          CURATED PORTFOLIO
        </span>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Residences & Penthouses
          </h1>
          <p className="text-xs md:text-sm text-[#A0A09B] max-w-md font-sans-ui leading-relaxed">
            A selective registry of exceptional private estates, cantilevered lagoon villas, and sky duplexes.
          </p>
        </div>
      </div>

      {/* Filter Toolbar & View Mode Switcher */}
      <div className="border border-white/10 bg-[#121314] p-6 mb-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          {/* Category Tabs: All / Sale / Rent */}
          <div className="flex border border-white/15 p-1 bg-white/5 w-fit">
            {['All', 'Sale', 'Rent'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  audioSystem.playClick();
                  setListingType(tab);
                }}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                  listingType === tab
                    ? 'bg-[#C5A880] text-[#0E0F0F] font-semibold'
                    : 'text-[#A0A09B] hover:text-white'
                }`}
              >
                {tab === 'All' ? 'All Portfolio' : `For ${tab}`}
              </button>
            ))}
          </div>

          {/* View Mode: Editorial vs Discovery Grid vs Map */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#6B6B67] uppercase mr-1">MODE:</span>
            <div className="flex border border-white/15 p-1 bg-white/5">
              {[
                { id: 'editorial', label: 'Editorial' },
                { id: 'discovery', label: 'Grid' },
                { id: 'map', label: 'Cartography' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    audioSystem.playClick();
                    setViewMode(m.id);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                    viewMode === m.id
                      ? 'bg-[#C5A880] text-[#0E0F0F] font-semibold'
                      : 'text-[#A0A09B] hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-[10px] font-mono text-[#6B6B67] uppercase mb-1">
              Enclave Location
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full bg-[#18191A] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#C5A880]"
            >
              {['All', 'Ikoyi', 'Banana Island', 'Victoria Island', 'Eko Atlantic', 'Lekki'].map((l) => (
                <option key={l} value={l}>{l === 'All' ? 'All Enclaves' : l}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-[#6B6B67] uppercase mb-1">
              Typology
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-[#18191A] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#C5A880]"
            >
              {['All', 'Villa', 'Penthouse', 'Waterfront Estate', 'Architectural Residence'].map((t) => (
                <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-[#6B6B67] uppercase mb-1">
              Min Bedrooms
            </label>
            <select
              value={bedroomFilter}
              onChange={(e) => setBedroomFilter(e.target.value)}
              className="w-full bg-[#18191A] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#C5A880]"
            >
              <option value="All">Any Capacity</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
              <option value="6">6+ Bedrooms</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-[#6B6B67] uppercase mb-1">
              Keyword Filter
            </label>
            <input
              type="text"
              placeholder="Search keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#18191A] border border-white/15 px-3 py-2 text-white placeholder:text-[#6B6B67] focus:outline-none focus:border-[#C5A880]"
            />
          </div>
        </div>

        {/* Dynamic Count and Clear Action */}
        <div className="flex items-center justify-between text-xs font-mono text-[#C5A880] pt-2">
          <span>{filteredProperties.length} {filteredProperties.length === 1 ? 'RESIDENCE AVAILABLE' : 'RESIDENCES AVAILABLE'}</span>
          {(listingType !== 'All' || locationFilter !== 'All' || typeFilter !== 'All' || bedroomFilter !== 'All' || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-[#A0A09B] hover:text-white underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Render results based on mode */}
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
        /* Editorial View Mode (Asymmetrical large-format cards) */
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
  );
}
