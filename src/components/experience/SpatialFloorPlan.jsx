import React from 'react';
import { X, Compass, ArrowRight, Layers } from 'lucide-react';
import { SPATIAL_ROOMS } from '../../data/spatialRooms';
import { audioSystem } from '../../utils/audioSystem';

export default function SpatialFloorPlan({
  isOpen,
  onClose,
  currentRoomId,
  currentFloorNumber,
  onSelectRoom = () => {}
}) {
  const [activeFloorTab, setActiveFloorTab] = React.useState(currentFloorNumber || 0);

  if (!isOpen) return null;

  const groundRooms = SPATIAL_ROOMS.filter((r) => r.floorNumber === 0);
  const upperRooms = SPATIAL_ROOMS.filter((r) => r.floorNumber === 1);
  const visibleRooms = activeFloorTab === 0 ? groundRooms : upperRooms;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-[#101112]/95 backdrop-blur-2xl border-l border-white/10 p-6 md:p-8 flex flex-col justify-between overflow-y-auto select-none animate-in slide-in-from-right duration-300">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
              <Compass size={13} />
              <span>SPATIAL BLUEPRINT SCHEMATIC</span>
            </div>
            <h3 className="text-xl font-serif text-white tracking-wide mt-1">
              Architectural Floor Plan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-white/15 text-[#A0A09B] hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Level Selector: Ground Floor (L0) vs Level 01 (L1) */}
        <div className="flex border border-white/15 p-1 bg-white/5 mb-6">
          <button
            onClick={() => {
              audioSystem.playClick();
              setActiveFloorTab(0);
            }}
            className={`flex-1 py-2 text-xs uppercase tracking-wider font-mono transition-colors ${
              activeFloorTab === 0
                ? 'bg-[#C5A880] text-[#0E0F0F] font-semibold'
                : 'text-[#A0A09B] hover:text-white'
            }`}
          >
            Ground Floor (Level 0)
          </button>
          <button
            onClick={() => {
              audioSystem.playClick();
              setActiveFloorTab(1);
            }}
            className={`flex-1 py-2 text-xs uppercase tracking-wider font-mono transition-colors ${
              activeFloorTab === 1
                ? 'bg-[#C5A880] text-[#0E0F0F] font-semibold'
                : 'text-[#A0A09B] hover:text-white'
            }`}
          >
            Level 01 (Upper Gallery)
          </button>
        </div>

        {/* Architectural Vector Schematic Plan */}
        <div className="relative w-full h-56 bg-[#08090A] border border-white/10 p-4 mb-6 flex flex-col justify-between text-[9px] font-mono text-[#6B6B67]">
          <div className="flex justify-between items-center text-[10px] text-[#C5A880]">
            <span>DEMONSTRATION SCHEMATIC · 1:100</span>
            <span>NORTH ↑</span>
          </div>

          {/* Interactive room blocks representing physical architectural layout */}
          {activeFloorTab === 0 ? (
            <div className="grid grid-cols-3 gap-2 h-36 my-auto">
              {[
                { id: 'entrance', name: 'Entrance Portal', area: 'Approach' },
                { id: 'foyer', name: 'Grand Foyer', area: '65 m²' },
                { id: 'living', name: 'Grand Salon', area: '140 m²' },
                { id: 'dining', name: 'Formal Dining', area: '55 m²' },
                { id: 'kitchen', name: 'Culinary Studio', area: '70 m²' },
                { id: 'terrace', name: 'Lagoon Terrace', area: '180 m²' },
                { id: 'pool', name: 'Basalt Infinity', area: '120 m²' },
                { id: 'exterior', name: 'Arrival Court', area: 'Site' }
              ].map((r) => {
                const isSelected = currentRoomId === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      audioSystem.playClick();
                      onSelectRoom(r.id);
                      onClose();
                    }}
                    className={`p-2 border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-[#C5A880] bg-[#C5A880]/25 text-white ring-1 ring-[#C5A880]'
                        : 'border-white/10 bg-white/5 hover:border-white/40 text-[#A0A09B]'
                    }`}
                  >
                    <span className="text-[10px] font-sans-ui font-medium truncate block">
                      {r.name}
                    </span>
                    <span className="text-[9px] font-mono text-[#C5A880]">
                      {r.area}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 h-36 my-auto">
              {[
                { id: 'staircase', name: 'Staircase Chasm', area: 'Core' },
                { id: 'upper_landing', name: 'Mezzanine Gallery', area: '45 m²' },
                { id: 'primary_suite', name: 'Primary Sky Suite', area: '125 m²' },
                { id: 'private_terrace', name: 'Sunset Balcony', area: '60 m²' }
              ].map((r) => {
                const isSelected = currentRoomId === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => {
                      audioSystem.playClick();
                      onSelectRoom(r.id);
                      onClose();
                    }}
                    className={`p-3 border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-[#C5A880] bg-[#C5A880]/25 text-white ring-1 ring-[#C5A880]'
                        : 'border-white/10 bg-white/5 hover:border-white/40 text-[#A0A09B]'
                    }`}
                  >
                    <span className="text-[11px] font-sans-ui font-medium block">
                      {r.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#C5A880]">
                      {r.area}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="text-[8px] text-right text-[#6B6B67]">
            Select any room to glide the 3D camera directly to that space
          </div>
        </div>

        {/* Room Directory List */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-[#6B6B67] uppercase tracking-wider block mb-2">
            AVAILABLE SPACES ON THIS FLOOR:
          </span>
          {visibleRooms.map((room) => {
            const isCurrent = currentRoomId === room.id;
            return (
              <div
                key={room.id}
                onClick={() => {
                  audioSystem.playClick();
                  onSelectRoom(room.id);
                  onClose();
                }}
                className={`p-3 border transition-all flex items-center justify-between cursor-pointer ${
                  isCurrent
                    ? 'border-[#C5A880] bg-[#C5A880]/15 text-white'
                    : 'border-white/10 bg-white/5 hover:border-white/30 text-[#A0A09B]'
                }`}
              >
                <div>
                  <h4 className="text-sm font-serif text-white">{room.name}</h4>
                  <p className="text-[11px] text-[#A0A09B] font-sans-ui truncate max-w-[280px]">
                    {room.description}
                  </p>
                </div>
                <div className="text-right">
                  {isCurrent ? (
                    <span className="px-2 py-0.5 bg-[#C5A880] text-[#0E0F0F] text-[9px] font-mono uppercase font-bold">
                      Current
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-[#C5A880] flex items-center gap-1">
                      Travel →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-6 border-t border-white/10 mt-6 text-center text-xs font-mono text-[#6B6B67]">
        Clicking a room initiates continuous camera trajectory
      </div>
    </div>
  );
}
