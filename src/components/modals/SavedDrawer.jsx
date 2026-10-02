import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Share2 } from 'lucide-react';
import { PROPERTIES } from '../../data/properties';
import { formatPrice } from '../../utils/formatCurrency';
import { audioSystem } from '../../utils/audioSystem';

export default function SavedDrawer({
  isOpen,
  onClose,
  savedIds = [],
  onToggleSave = () => {},
  onSelectProperty = () => {},
  onRequestViewing = () => {},
  currency = 'NGN'
}) {
  if (!isOpen) return null;

  const savedProperties = PROPERTIES.filter((p) => savedIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end select-none">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-lg bg-[#121314] text-[#F4F1EA] h-full shadow-2xl border-l border-white/10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block mb-1">
              CURATED COLLECTION
            </span>
            <h2 className="text-2xl font-serif text-white tracking-wide">
              Saved Residences ({savedProperties.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-white/15 text-[#A0A09B] hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* List of Saved Residences */}
        <div className="p-8 flex-1 overflow-y-auto space-y-6">
          {savedProperties.length === 0 ? (
            <div className="py-20 text-center text-[#A0A09B]">
              <Bookmark size={36} className="mx-auto mb-4 text-[#6B6B67] stroke-1" />
              <p className="text-base font-serif text-white mb-2">Your private portfolio is empty.</p>
              <p className="text-xs max-w-xs mx-auto leading-relaxed">
                Click the bookmark icon on any residence to curate your private list for private review or collective comparison.
              </p>
            </div>
          ) : (
            savedProperties.map((p) => (
              <div 
                key={p.id} 
                className="border border-white/10 bg-white/5 p-4 flex flex-col gap-4 group"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.heroImage}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button
                    onClick={() => onToggleSave(p.id)}
                    className="absolute top-2 right-2 p-1.5 bg-[#0E0F0F]/80 text-[#C5A880] hover:text-red-400 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-[#0E0F0F]/80 text-[10px] font-mono text-[#C5A880]">
                    {p.type}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#A0A09B] uppercase tracking-wider block">
                    {p.district}, {p.city}
                  </span>
                  <h3 className="text-lg font-serif text-white mt-0.5">
                    {p.title}
                  </h3>
                  <div className="text-sm font-serif text-[#C5A880] mt-1">
                    {formatPrice(p.price, currency)}
                  </div>
                  <div className="text-xs font-mono text-[#6B6B67] mt-2">
                    {p.bedrooms} Beds · {p.bathrooms} Baths · {p.internalArea} m²
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProperty(p);
                    }}
                    className="text-xs text-[#C5A880] hover:text-white uppercase tracking-wider font-mono flex items-center gap-1.5"
                  >
                    Enter Residence
                    <ArrowRight size={12} />
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onRequestViewing(p);
                    }}
                    className="px-3 py-1.5 bg-[#F4F1EA] text-[#0E0F0F] text-[11px] uppercase tracking-wider font-semibold hover:bg-[#C5A880] transition-colors"
                  >
                    Book Viewing
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Total / Action */}
        {savedProperties.length > 0 && (
          <div className="p-8 border-t border-white/10 bg-[#0E0F0F]">
            <button
              onClick={() => {
                onClose();
                onRequestViewing(savedProperties[0]);
              }}
              className="w-full py-3.5 bg-[#C5A880] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Request Portfolio Viewing Dossier
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
