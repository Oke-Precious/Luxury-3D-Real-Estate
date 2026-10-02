import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, SlidersHorizontal, ArrowRight, Check } from 'lucide-react';
import { PROPERTIES } from '../../data/properties';
import { formatPrice } from '../../utils/formatCurrency';
import { audioSystem } from '../../utils/audioSystem';

export default function SearchModal({
  isOpen,
  onClose,
  currency = 'NGN',
  onSelectProperty = () => {}
}) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedListingType, setSelectedListingType] = useState('All');
  const [minBedrooms, setMinBedrooms] = useState('All');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  if (!isOpen) return null;

  const locationsList = ['All', 'Ikoyi', 'Banana Island', 'Victoria Island', 'Eko Atlantic', 'Lekki'];
  const typesList = ['All', 'Villa', 'Penthouse', 'Waterfront Estate', 'Architectural Residence'];
  const listingTypesList = ['All', 'Sale', 'Rent'];
  const amenitiesList = [
    'Private Boat Dock',
    'Infinity Pool',
    'Acoustic Cinema',
    'Wine Cellar',
    'Wellness Suite',
    'Helipad Landing Rights',
    'Smart Automation'
  ];

  const toggleAmenity = (amenity) => {
    audioSystem.playClick();
    setSelectedAmenities((prev) => 
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleClearFilters = () => {
    audioSystem.playClick();
    setKeyword('');
    setSelectedLocation('All');
    setSelectedType('All');
    setSelectedListingType('All');
    setMinBedrooms('All');
    setSelectedAmenities([]);
  };

  // Live filter computation
  const filteredProperties = PROPERTIES.filter((p) => {
    if (keyword) {
      const q = keyword.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchLoc = p.location.toLowerCase().includes(q) || p.district.toLowerCase().includes(q);
      const matchArch = p.architect?.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchArch) return false;
    }

    if (selectedLocation !== 'All' && p.location !== selectedLocation) {
      return false;
    }

    if (selectedType !== 'All' && p.type !== selectedType) {
      return false;
    }

    if (selectedListingType !== 'All' && p.listingType !== selectedListingType) {
      return false;
    }

    if (minBedrooms !== 'All' && p.bedrooms < parseInt(minBedrooms, 10)) {
      return false;
    }

    if (selectedAmenities.length > 0) {
      const hasAll = selectedAmenities.every((a) => 
        p.amenities.some((pAmenity) => pAmenity.toLowerCase().includes(a.toLowerCase()))
      );
      if (!hasAll) return false;
    }

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center p-4 md:p-10 select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
      />

      {/* Main Dialog Box */}
      <div className="relative z-10 w-full max-w-4xl bg-[#121314] border border-white/10 text-[#F4F1EA] shadow-2xl flex flex-col max-h-[88vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Search Input Bar */}
        <div className="p-6 border-b border-white/10 flex items-center gap-4 bg-[#161819]">
          <Search size={20} className="text-[#C5A880] shrink-0" />
          <input
            type="text"
            placeholder="Search by residence title, enclave (e.g. Ikoyi, Banana Island), or architect..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-base md:text-lg text-white placeholder:text-[#6B6B67] focus:outline-none font-serif"
          />
          {keyword && (
            <button
              onClick={() => setKeyword('')}
              className="text-xs text-[#A0A09B] hover:text-white"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 border border-white/15 text-[#A0A09B] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="p-6 border-b border-white/10 bg-[#0E0F0F] space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Listing Type: Buy / Rent */}
            <div>
              <label className="block text-[10px] font-mono text-[#6B6B67] uppercase mb-1">
                Category
              </label>
              <select
                value={selectedListingType}
                onChange={(e) => setSelectedListingType(e.target.value)}
                className="w-full bg-[#18191A] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#C5A880]"
              >
                {listingTypesList.map((t) => (
                  <option key={t} value={t}>{t === 'All' ? 'Buy & Rent' : t}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[10px] font-mono text-[#6B6B67] uppercase mb-1">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#18191A] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#C5A880]"
              >
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>{loc === 'All' ? 'All Enclaves' : loc}</option>
                ))}
              </select>
            </div>

            {/* Property Typology */}
            <div>
              <label className="block text-[10px] font-mono text-[#6B6B67] uppercase mb-1">
                Typology
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-[#18191A] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#C5A880]"
              >
                {typesList.map((t) => (
                  <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>
                ))}
              </select>
            </div>

            {/* Minimum Bedrooms */}
            <div>
              <label className="block text-[10px] font-mono text-[#6B6B67] uppercase mb-1">
                Min Bedrooms
              </label>
              <select
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(e.target.value)}
                className="w-full bg-[#18191A] border border-white/15 px-3 py-2 text-white focus:outline-none focus:border-[#C5A880]"
              >
                <option value="All">Any Size</option>
                <option value="4">4+ Suites</option>
                <option value="5">5+ Suites</option>
                <option value="6">6+ Suites</option>
              </select>
            </div>
          </div>

          {/* Quick Amenities Filter Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[10px] font-mono text-[#6B6B67] uppercase mr-2">
              Features:
            </span>
            {amenitiesList.map((am) => {
              const isSelected = selectedAmenities.includes(am);
              return (
                <button
                  key={am}
                  onClick={() => toggleAmenity(am)}
                  className={`px-2.5 py-1 text-[11px] font-mono border transition-colors ${
                    isSelected
                      ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#F4F1EA]'
                      : 'border-white/10 text-[#A0A09B] hover:border-white/30'
                  }`}
                >
                  {am}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Results Status Bar */}
        <div className="px-6 py-3 bg-[#161819] border-b border-white/10 flex items-center justify-between text-xs font-mono">
          <span className="text-[#C5A880]">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'RESIDENCE FOUND' : 'RESIDENCES FOUND'}
          </span>
          {(keyword || selectedLocation !== 'All' || selectedType !== 'All' || selectedListingType !== 'All' || minBedrooms !== 'All' || selectedAmenities.length > 0) && (
            <button
              onClick={handleClearFilters}
              className="text-[#A0A09B] hover:text-white underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Live Filter Results List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {filteredProperties.length === 0 ? (
            <div className="py-12 text-center text-[#A0A09B]">
              <p className="text-base font-serif text-white mb-2">No residences match your current criteria.</p>
              <button
                onClick={handleClearFilters}
                className="text-xs uppercase tracking-wider text-[#C5A880] underline underline-offset-4"
              >
                Clear all filters and show portfolio
              </button>
            </div>
          ) : (
            filteredProperties.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  audioSystem.playClick();
                  onClose();
                  onSelectProperty(p);
                }}
                className="group p-4 border border-white/10 bg-white/5 hover:border-[#C5A880]/60 hover:bg-white/[0.08] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={p.heroImage}
                    alt={p.title}
                    className="w-16 h-16 object-cover border border-white/10 shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-wider block">
                      {p.district}, {p.city} · {p.type}
                    </span>
                    <h4 className="text-base font-serif text-white group-hover:text-[#C5A880] transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#A0A09B] font-mono mt-0.5">
                      {p.bedrooms} Beds · {p.bathrooms} Baths · {p.internalArea} m²
                    </p>
                  </div>
                </div>

                <div className="text-right self-end sm:self-center">
                  <div className="text-base font-serif text-[#C5A880]">
                    {formatPrice(p.price, currency)}
                  </div>
                  <span className="text-[10px] font-mono text-[#A0A09B] uppercase group-hover:text-white flex items-center gap-1 justify-end">
                    Enter Experience →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#0E0F0F] border-t border-white/10 text-center text-[11px] font-mono text-[#6B6B67]">
          Press ESC to dismiss search overlay
        </div>
      </div>
    </div>
  );
}
