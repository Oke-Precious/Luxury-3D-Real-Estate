import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Play, Pause, Compass, 
  Layers, Volume2, VolumeX, Calendar, ArrowRight, Check, Share2
} from 'lucide-react';
import { audioSystem } from '../../utils/audioSystem';
import { formatPrice } from '../../utils/formatCurrency';

export default function ResidenceExperience({
  property,
  currency = 'NGN',
  isOpen,
  onClose,
  onRequestViewing = () => {}
}) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isPlayingFilm, setIsPlayingFilm] = useState(false);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [selectedFloorLevel, setSelectedFloorLevel] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const filmTimerRef = useRef(null);

  const chapters = property?.chapters || [];
  const currentChapter = chapters[currentChapterIndex] || chapters[0];
  const floorPlans = property?.floorPlans || [];

  // Sync sound state
  useEffect(() => {
    return audioSystem.subscribe((active) => setIsSoundActive(active));
  }, []);

  // Handle film playback
  useEffect(() => {
    if (isPlayingFilm) {
      filmTimerRef.current = setInterval(() => {
        setCurrentChapterIndex((prev) => {
          if (prev >= chapters.length - 1) {
            setIsPlayingFilm(false);
            return prev;
          }
          audioSystem.playTransition();
          return prev + 1;
        });
      }, 6500);
    } else {
      clearInterval(filmTimerRef.current);
    }
    return () => clearInterval(filmTimerRef.current);
  }, [isPlayingFilm, chapters.length]);

  // Keyboard navigation (Esc to exit, Arrow keys for chapters)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNextChapter();
      } else if (e.key === 'ArrowLeft') {
        handlePrevChapter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentChapterIndex, chapters.length]);

  if (!isOpen || !property) return null;

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      audioSystem.playTransition();
      setCurrentChapterIndex((prev) => prev + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      audioSystem.playTransition();
      setCurrentChapterIndex((prev) => prev - 1);
    }
  };

  const handleJumpToChapter = (idx) => {
    audioSystem.playTransition();
    setCurrentChapterIndex(idx);
    setIsPlayingFilm(false);
  };

  const currentFloor = floorPlans[selectedFloorLevel] || floorPlans[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#0E0F0F] text-[#F4F1EA] overflow-hidden flex flex-col select-none animate-in fade-in duration-500">
      {/* 1. CINEMATIC BACKGROUND VISUAL WITH SMOOTH TRANSITION */}
      <div className="absolute inset-0 z-0">
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out scale-100 ${
            isNightMode ? 'brightness-75 contrast-125' : 'brightness-90'
          }`}
          style={{ backgroundImage: `url(${currentChapter?.image || property.heroImage})` }}
        />
        {/* Soft architectural vignette & gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F0F] via-[#0E0F0F]/30 to-[#0E0F0F]/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#0E0F0F]/70" />
      </div>

      {/* 2. TOP MINIMAL NAVIGATION BAR */}
      <header className="relative z-30 w-full px-6 md:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-[#C5A880]">
            RESIDENCE EXPERIENCE
          </span>
          <span className="text-[#6B6B67] hidden sm:inline">/</span>
          <h2 className="text-sm md:text-base font-serif tracking-wide text-white">
            {property.title}
          </h2>
          <span className="text-xs text-[#A0A09B] font-mono hidden md:inline">
            {property.district}, {property.city}
          </span>
        </div>

        {/* Action Controls: Sound, Night, Floor Plan, Exit */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Sound Toggle */}
          <button
            onClick={() => audioSystem.toggleSound()}
            className={`p-2 rounded-full border transition-all ${
              isSoundActive 
                ? 'border-[#C5A880] text-[#C5A880] bg-[#C5A880]/10' 
                : 'border-white/10 text-[#A0A09B] hover:text-white'
            }`}
            title="Toggle Ambient Audio"
          >
            {isSoundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Interactive Floor Plan Drawer Toggle */}
          <button
            onClick={() => {
              audioSystem.playClick();
              setShowFloorPlan(!showFloorPlan);
            }}
            className={`px-3 py-1.5 rounded-none border text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${
              showFloorPlan 
                ? 'border-[#C5A880] text-[#C5A880] bg-[#C5A880]/10' 
                : 'border-white/15 text-[#A0A09B] hover:text-white hover:border-white/40'
            }`}
          >
            <Compass size={14} />
            <span className="hidden sm:inline">Floor Plan</span>
          </button>

          {/* Film Autoplay button */}
          <button
            onClick={() => {
              audioSystem.playClick();
              setIsPlayingFilm(!isPlayingFilm);
            }}
            className={`px-3 py-1.5 rounded-none border text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${
              isPlayingFilm 
                ? 'border-[#C5A880] text-[#C5A880] bg-[#C5A880]/15' 
                : 'border-white/15 text-[#A0A09B] hover:text-white hover:border-white/40'
            }`}
          >
            {isPlayingFilm ? <Pause size={14} /> : <Play size={14} />}
            <span className="hidden sm:inline">{isPlayingFilm ? 'Pause Film' : 'Watch Film'}</span>
          </button>

          {/* Close / Return to Showcase */}
          <button
            onClick={() => {
              audioSystem.playClick();
              onClose();
            }}
            className="p-2 border border-white/20 hover:border-white text-white transition-colors"
            title="Exit Residence Experience (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* 3. CENTER EDITORIAL STORY CONTENT (The Chapter) */}
      <div className="relative z-20 flex-1 px-6 md:px-16 flex flex-col justify-end pb-24 md:pb-28 max-w-4xl">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 key={currentChapterIndex}">
          {/* Chapter numeral & sub-heading */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono tracking-[0.25em] text-[#C5A880]">
              CHAPTER {currentChapter?.phaseNumber} / {chapters.length.toString().padStart(2, '0')}
            </span>
            <span className="h-[1px] w-12 bg-[#C5A880]/40" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#A0A09B]">
              {currentChapter?.title}
            </span>
          </div>

          {/* Grand Editorial Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1] mb-4">
            {currentChapter?.heading}
          </h1>

          {/* Architectural Description */}
          <p className="text-sm md:text-base text-[#D0CAC0] font-sans-ui max-w-2xl leading-relaxed mb-6">
            {currentChapter?.description}
          </p>

          {/* Action Row for the Chapter */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                audioSystem.playClick();
                onRequestViewing(property);
              }}
              className="px-6 py-3 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors flex items-center gap-3"
            >
              <Calendar size={14} />
              Request Private Viewing
            </button>

            <button
              onClick={() => {
                audioSystem.playClick();
                setShowFloorPlan(true);
              }}
              className="px-5 py-3 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-white transition-colors"
            >
              Inspect Blueprint
            </button>

            <div className="text-xs font-mono text-[#A0A09B] ml-2">
              Valuation: <span className="text-white font-serif text-sm">{formatPrice(property.price, currency)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CHAPTER TIMELINE DOCK (Bottom Bar) */}
      <footer className="relative z-30 w-full px-6 md:px-12 py-4 border-t border-white/10 bg-[#0E0F0F]/80 backdrop-blur-md flex items-center justify-between gap-4">
        {/* Previous / Next buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevChapter}
            disabled={currentChapterIndex === 0}
            className={`p-2 border border-white/10 text-white transition-colors ${
              currentChapterIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-white'
            }`}
            title="Previous Chapter"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNextChapter}
            disabled={currentChapterIndex === chapters.length - 1}
            className={`p-2 border border-white/10 text-white transition-colors ${
              currentChapterIndex === chapters.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-white'
            }`}
            title="Next Chapter"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Scrollable Chapter Navigation Pills */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 md:gap-3 py-1">
          {chapters.map((ch, idx) => {
            const isActive = idx === currentChapterIndex;
            return (
              <button
                key={ch.id || idx}
                onClick={() => handleJumpToChapter(idx)}
                className={`whitespace-nowrap px-3 py-1.5 text-left transition-all ${
                  isActive 
                    ? 'border-b-2 border-[#C5A880] text-white bg-white/5' 
                    : 'text-[#6B6B67] hover:text-[#A0A09B]'
                }`}
              >
                <div className="text-[9px] font-mono text-[#C5A880]">
                  {ch.phaseNumber}
                </div>
                <div className="text-xs uppercase tracking-wider font-sans-ui">
                  {ch.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Property Specs Snapshot */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-[#A0A09B]">
          <span>{property.bedrooms} BEDS</span>
          <span>{property.bathrooms} BATHS</span>
          <span>{property.internalArea} M² INTERNAL</span>
        </div>
      </footer>

      {/* 5. INTERACTIVE FLOOR PLAN OVERLAY DRAWER */}
      {showFloorPlan && (
        <div className="absolute inset-y-0 right-0 z-40 w-full md:w-[480px] bg-[#121314]/95 backdrop-blur-2xl border-l border-white/10 p-6 md:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase block">
                  ARCHITECTURAL SCHEMATICS
                </span>
                <h3 className="text-xl font-serif text-white tracking-wide">
                  Interactive Floor Plan
                </h3>
              </div>
              <button 
                onClick={() => setShowFloorPlan(false)}
                className="p-1.5 border border-white/15 text-[#A0A09B] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Level Selector (L0, L1, B1) */}
            <div className="flex items-center gap-2 mb-6">
              {floorPlans.map((fp, idx) => (
                <button
                  key={fp.levelCode}
                  onClick={() => {
                    audioSystem.playClick();
                    setSelectedFloorLevel(idx);
                    setSelectedRoom(null);
                  }}
                  className={`flex-1 py-2 px-3 text-xs uppercase tracking-wider border transition-colors ${
                    selectedFloorLevel === idx
                      ? 'border-[#C5A880] bg-[#C5A880]/10 text-white font-medium'
                      : 'border-white/10 text-[#A0A09B] hover:border-white/30'
                  }`}
                >
                  {fp.levelCode}
                </button>
              ))}
            </div>

            <p className="text-xs text-[#A0A09B] mb-4">
              {currentFloor?.description}
            </p>

            {/* Interactive Vector CAD-style Floor Plan Schematic */}
            <div className="relative w-full h-48 border border-white/10 bg-[#0A0B0C] p-3 mb-6 flex flex-col justify-between font-mono text-[9px] text-[#6B6B67]">
              <div className="flex justify-between items-center text-[10px] text-[#C5A880]">
                <span>SCALE: 1:100</span>
                <span>{currentFloor?.level}</span>
                <span>NORTH ↑</span>
              </div>

              {/* Vector architectural layout representation with clickable rooms */}
              <div className="grid grid-cols-3 gap-1.5 h-32 my-auto">
                {currentFloor?.rooms.map((room) => {
                  const isRoomActive = selectedRoom?.id === room.id;
                  return (
                    <button
                      key={room.id}
                      onClick={() => {
                        audioSystem.playClick();
                        setSelectedRoom(room);
                      }}
                      className={`p-2 border text-left flex flex-col justify-between transition-all ${
                        isRoomActive 
                          ? 'border-[#C5A880] bg-[#C5A880]/20 text-[#F4F1EA]' 
                          : 'border-white/15 bg-white/5 hover:border-white/40 text-[#A0A09B]'
                      }`}
                    >
                      <span className="text-[10px] font-sans-ui font-medium truncate block">
                        {room.name}
                      </span>
                      <span className="text-[9px] font-mono text-[#C5A880]">
                        {room.area}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="text-[8px] text-right text-[#6B6B67]">
                Click any zone to inspect room specifications
              </div>
            </div>

            {/* Selected Room Details */}
            {selectedRoom ? (
              <div className="p-4 border border-[#C5A880]/30 bg-[#C5A880]/5 animate-in fade-in duration-200">
                <span className="text-[9px] font-mono text-[#C5A880] uppercase tracking-widest block mb-1">
                  SELECTED ZONE
                </span>
                <h4 className="text-base font-serif text-white mb-1">
                  {selectedRoom.name} ({selectedRoom.area})
                </h4>
                <p className="text-xs text-[#D0CAC0] leading-relaxed mb-3">
                  {selectedRoom.desc}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      audioSystem.playTransition();
                      setShowFloorPlan(false);
                    }}
                    className="text-xs text-[#C5A880] hover:text-white uppercase tracking-wider underline underline-offset-4"
                  >
                    View in Residence Experience →
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-xs text-[#6B6B67] italic text-center py-4">
                Select any room boundary above to view architectural tolerances and area schedule.
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/10 mt-6">
            <button
              onClick={() => {
                setShowFloorPlan(false);
                onRequestViewing(property);
              }}
              className="w-full py-3 bg-[#C5A880] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Book Viewing for this Residence
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
