import React from 'react';
import { X, Check, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { PROPERTIES } from '../../data/properties';
import { formatPrice } from '../../utils/formatCurrency';
import { audioSystem } from '../../utils/audioSystem';

export default function PropertyCompareModal({
  isOpen,
  onClose,
  compareIds,
  onRemoveCompare,
  onClearCompare,
  onSelectProperty,
  onRequestViewing,
  currency = 'NGN'
}) {
  if (!isOpen) return null;

  const comparedProperties = PROPERTIES.filter((p) => compareIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-6xl max-h-[90vh] bg-[#121314] border border-white/10 text-[#F4F1EA] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-1">
              ARCHITECTURAL BENCHMARK
            </span>
            <h2 className="text-2xl font-serif text-white tracking-wide">
              Residence Comparison ({comparedProperties.length} of 3)
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {comparedProperties.length > 0 && (
              <button
                onClick={() => {
                  audioSystem.playClick();
                  onClearCompare();
                }}
                className="text-xs font-mono uppercase text-[#A0A09B] hover:text-white flex items-center gap-1.5"
              >
                <Trash2 size={14} />
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 border border-white/15 text-[#A0A09B] hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Comparison Table / View */}
        <div className="p-8 overflow-y-auto flex-1">
          {comparedProperties.length === 0 ? (
            <div className="py-16 text-center text-[#A0A09B]">
              <p className="text-base font-serif text-white mb-2">No residences selected for comparison.</p>
              <p className="text-xs">Click "Compare" on any residence in the portfolio to evaluate architectural specifications side-by-side.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparedProperties.map((p) => (
                <div key={p.id} className="border border-white/10 bg-white/5 p-6 flex flex-col justify-between">
                  <div>
                    {/* Visual & Remove */}
                    <div className="relative h-44 mb-4 overflow-hidden group">
                      <img 
                        src={p.heroImage} 
                        alt={p.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <button
                        onClick={() => onRemoveCompare(p.id)}
                        className="absolute top-2 right-2 p-1.5 bg-[#0E0F0F]/80 text-[#A0A09B] hover:text-white transition-colors"
                        title="Remove from comparison"
                      >
                        <X size={14} />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-[#0E0F0F]/80 text-[10px] font-mono text-[#C5A880]">
                        {p.type}
                      </div>
                    </div>

                    <h3 className="text-xl font-serif text-white mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#A0A09B] font-mono mb-4">
                      {p.district}, {p.city}
                    </p>

                    <div className="text-lg font-serif text-[#C5A880] mb-6 pb-4 border-b border-white/10">
                      {formatPrice(p.price, currency)}
                    </div>

                    {/* Spec List */}
                    <div className="space-y-3 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#6B6B67]">INTERNAL AREA</span>
                        <span className="text-white font-medium">{p.internalArea} m²</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#6B6B67]">EXTERNAL AREA</span>
                        <span className="text-white font-medium">{p.externalArea} m²</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#6B6B67]">BEDROOMS</span>
                        <span className="text-white font-medium">{p.bedrooms} Suites</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#6B6B67]">BATHROOMS</span>
                        <span className="text-white font-medium">{p.bathrooms}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#6B6B67]">VEHICLE GALLERY</span>
                        <span className="text-white font-medium">{p.parking} Bays</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#6B6B67]">ARCHITECT</span>
                        <span className="text-white font-sans-ui text-right truncate max-w-[140px]">{p.architect}</span>
                      </div>
                    </div>

                    {/* Key Amenities */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880] block mb-2">
                        DISTINCTIVE FEATURES
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#A0A09B]">
                        {p.amenities.slice(0, 4).map((amenity, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check size={12} className="text-[#C5A880] shrink-0" />
                            <span className="truncate">{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(p);
                      }}
                      className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-medium transition-colors"
                    >
                      Enter Experience
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onRequestViewing(p);
                      }}
                      className="w-full py-2.5 bg-[#C5A880] hover:bg-white text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold transition-colors"
                    >
                      Request Viewing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
