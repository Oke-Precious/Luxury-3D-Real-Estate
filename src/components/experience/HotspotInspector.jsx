import React from 'react';
import { X, Sparkles, Layers, Check, Shield } from 'lucide-react';
import { audioSystem } from '../../utils/audioSystem';

export default function HotspotInspector({ hotspot, onClose }) {
  if (!hotspot) return null;

  return (
    <div className="fixed bottom-24 left-6 md:left-12 z-50 max-w-sm w-full glass-panel p-6 border-l-2 border-[#C5A880] shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300 select-none">
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[#C5A880]" />
          <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
            ARCHITECTURAL SPECIFICATION
          </span>
        </div>
        <button
          onClick={() => {
            audioSystem.playClick();
            onClose();
          }}
          className="p-1 text-[#A0A09B] hover:text-white"
        >
          <X size={15} />
        </button>
      </div>

      <h4 className="text-lg font-serif text-white tracking-wide mb-1">
        {hotspot.title}
      </h4>

      {hotspot.material && (
        <div className="inline-block px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono text-[#D0CAC0] mb-3">
          MATERIAL: {hotspot.material}
        </div>
      )}

      <p className="text-xs text-[#A0A09B] font-sans-ui leading-relaxed mb-4">
        {hotspot.desc}
      </p>

      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#6B6B67]">
        <span>SPECIFICATION PROTOCOL VERIFIED</span>
        <button
          onClick={onClose}
          className="text-[#C5A880] hover:text-white uppercase underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
