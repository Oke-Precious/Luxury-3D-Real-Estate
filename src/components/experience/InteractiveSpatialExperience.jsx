import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Play, Pause, Compass, 
  Layers, Volume2, VolumeX, Calendar, ArrowRight, Sun, Moon, 
  Sunset, Lightbulb, Shield, Eye, Video
} from 'lucide-react';
import ResidenceSpatialScene from '../three/ResidenceSpatialScene';
import SpatialFloorPlan from './SpatialFloorPlan';
import HotspotInspector from './HotspotInspector';
import { SPATIAL_ROOMS, GUIDED_CHAPTERS } from '../../data/spatialRooms';
import { audioSystem } from '../../utils/audioSystem';
import { formatPrice } from '../../utils/formatCurrency';

export default function InteractiveSpatialExperience({
  property,
  currency = 'NGN',
  isOpen,
  onClose,
  onRequestViewing = () => {}
}) {
  // Navigation & Spatial State
  const [currentRoomId, setCurrentRoomId] = useState('exterior');
  const [explorationMode, setExplorationMode] = useState('guided'); // 'guided' | 'free'
  const [mood, setMood] = useState('golden'); // 'day' | 'golden' | 'night'
  const [interiorLightsOn, setInteriorLightsOn] = useState(true);
  const [xRayMode, setXRayMode] = useState(false);
  const [activeFloor, setActiveFloor] = useState('all'); // 'all' | 'ground' | 'level1'
  
  // Modals & Panels
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  
  // Film / Auto-Tour State
  const [isAutoTourActive, setIsAutoTourActive] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const autoTourTimerRef = useRef(null);

  // Architectural Entry Sequence State
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    return sessionStorage.getItem('atelier_residence_intro_seen') === 'true';
  });
  const [showIntroSequence, setShowIntroSequence] = useState(false);
  const [introStep, setIntroStep] = useState(0);

  // Sound state
  const [isSoundActive, setIsSoundActive] = useState(false);

  useEffect(() => {
    return audioSystem.subscribe((active) => setIsSoundActive(active));
  }, []);

  // Initialize intro sequence when opened
  useEffect(() => {
    if (isOpen && !hasSeenIntro) {
      setShowIntroSequence(true);
      const timer1 = setTimeout(() => setIntroStep(1), 1200);
      const timer2 = setTimeout(() => setIntroStep(2), 2600);
      const timer3 = setTimeout(() => setIntroStep(3), 4200);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen, hasSeenIntro]);

  const handleFinishIntro = () => {
    sessionStorage.setItem('atelier_residence_intro_seen', 'true');
    setHasSeenIntro(true);
    setShowIntroSequence(false);
    audioSystem.playTransition();
    // Glide to entrance portal on start
    setCurrentRoomId('entrance');
  };

  // Keyboard Navigation (Esc to exit, Arrow keys for chapters)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedHotspot) setSelectedHotspot(null);
        else if (showFloorPlan) setShowFloorPlan(false);
        else onClose();
      } else if (e.key === 'ArrowRight' && explorationMode === 'guided') {
        handleNextChapter();
      } else if (e.key === 'ArrowLeft' && explorationMode === 'guided') {
        handlePrevChapter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedHotspot, showFloorPlan, explorationMode, currentChapterIndex]);

  // Handle Auto-Tour Film
  useEffect(() => {
    if (isAutoTourActive) {
      autoTourTimerRef.current = setInterval(() => {
        setCurrentChapterIndex((prev) => {
          const nextIndex = (prev + 1) % GUIDED_CHAPTERS.length;
          const targetRoom = GUIDED_CHAPTERS[nextIndex].roomId;
          setCurrentRoomId(targetRoom);
          audioSystem.playTransition();
          return nextIndex;
        });
      }, 7000);
    } else {
      clearInterval(autoTourTimerRef.current);
    }
    return () => clearInterval(autoTourTimerRef.current);
  }, [isAutoTourActive]);

  if (!isOpen || !property) return null;

  const currentRoom = SPATIAL_ROOMS.find((r) => r.id === currentRoomId) || SPATIAL_ROOMS[0];

  const handleTravelToRoom = (targetRoomId) => {
    audioSystem.playTransition();
    setCurrentRoomId(targetRoomId);
    setSelectedHotspot(null);
    
    // Update guided chapter if matching
    const matchingChapterIdx = GUIDED_CHAPTERS.findIndex((c) => c.roomId === targetRoomId);
    if (matchingChapterIdx !== -1) {
      setCurrentChapterIndex(matchingChapterIdx);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < GUIDED_CHAPTERS.length - 1) {
      const nextIdx = currentChapterIndex + 1;
      setCurrentChapterIndex(nextIdx);
      handleTravelToRoom(GUIDED_CHAPTERS[nextIdx].roomId);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      const prevIdx = currentChapterIndex - 1;
      setCurrentChapterIndex(prevIdx);
      handleTravelToRoom(GUIDED_CHAPTERS[prevIdx].roomId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070809] text-[#F4F1EA] overflow-hidden flex flex-col select-none animate-in fade-in duration-500">
      {/* ========================================================
          1. OPTIONAL ARCHITECTURAL ENTRY SEQUENCE OVERLAY
         ======================================================== */}
      {showIntroSequence && (
        <div className="absolute inset-0 z-50 bg-[#0E0F0F] flex flex-col items-center justify-center p-8 select-none animate-in fade-in duration-700">
          <div className="max-w-2xl text-center space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A880] block">
              THE AURELIA RESIDENCE · DEMONSTRATION ARCHITECTURAL DIGITAL TWIN
            </span>

            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-tight">
              A residence is more<br />
              <span className="italic text-[#C5A880]">than what you see.</span>
            </h2>

            <div className="h-16 flex items-center justify-center font-mono text-xs text-[#A0A09B] tracking-widest uppercase">
              {introStep === 0 && <span>01 / CONSTRUCTING POST-TENSIONED CONCRETE SLABS...</span>}
              {introStep === 1 && <span>02 / GLIZING SILL-LESS LOW-E ACOUSTIC FACADES...</span>}
              {introStep === 2 && <span>03 / CALIBRATING AMBIENT WATER MARGIN & NOCTURNE LIGHTS...</span>}
              {introStep === 3 && <span className="text-[#C5A880]">SPATIAL ENVIRONMENT READY</span>}
            </div>

            <div className="pt-4 flex items-center justify-center gap-4">
              <button
                onClick={handleFinishIntro}
                className="px-8 py-4 bg-[#F4F1EA] text-[#0E0F0F] text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors"
              >
                Enter Spatial Residence
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          2. CORE 3D ARCHITECTURAL SPATIAL SCENE
         ======================================================== */}
      <div className="absolute inset-0 z-0">
        <ResidenceSpatialScene
          currentRoom={currentRoom}
          explorationMode={explorationMode}
          mood={mood}
          interiorLightsOn={interiorLightsOn}
          xRayMode={xRayMode}
          activeFloor={activeFloor}
          autoTour={isAutoTourActive}
          onSelectPortal={handleTravelToRoom}
          onSelectHotspot={(spot) => {
            audioSystem.playClick();
            setSelectedHotspot(spot);
          }}
        />
      </div>

      {/* ========================================================
          3. TOP CONTEXT-AWARE ARCHITECTURAL HEADER BAR
         ======================================================== */}
      <header className="relative z-30 w-full px-6 md:px-12 py-5 flex items-center justify-between pointer-events-auto">
        {/* Left: Brand & Residence Monograph */}
        <div className="flex items-center gap-4">
          <div className="glass-panel px-3 py-1.5 flex items-center gap-2 border-l-2 border-[#C5A880]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
              SPATIAL RESIDENCE
            </span>
          </div>
          <span className="text-[#6B6B67] hidden md:inline">/</span>
          <h2 className="text-sm md:text-base font-serif text-white hidden sm:block">
            {property.title}
          </h2>
        </div>

        {/* Center: CURRENT SPACE BADGE */}
        <div className="glass-panel px-4 py-1.5 text-center hidden md:block">
          <span className="text-[9px] font-mono tracking-[0.25em] text-[#6B6B67] uppercase block">
            CURRENT SPACE
          </span>
          <span className="text-xs font-serif text-[#F4F1EA] tracking-wide uppercase font-semibold">
            {currentRoom.name}
          </span>
        </div>

        {/* Right Action Controls: Lighting, Lights switch, Audio, Exit */}
        <div className="flex items-center gap-2 md:gap-3 text-xs font-mono">
          {/* Environment Mood Switcher: Day / Golden / Night */}
          <div className="glass-panel px-2 py-1 flex items-center gap-1">
            {[
              { id: 'day', label: 'Day', icon: Sun },
              { id: 'golden', label: 'Golden', icon: Sunset },
              { id: 'night', label: 'Night', icon: Moon }
            ].map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    audioSystem.playClick();
                    setMood(m.id);
                  }}
                  className={`px-2 py-1 flex items-center gap-1 uppercase tracking-wider transition-colors ${
                    mood === m.id
                      ? 'bg-white/15 text-white font-medium'
                      : 'text-[#6B6B67] hover:text-[#A0A09B]'
                  }`}
                  title={`${m.label} Environmental Lighting`}
                >
                  <Icon size={12} />
                  <span className="hidden sm:inline text-[10px]">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interior Lights Switch */}
          <button
            onClick={() => {
              audioSystem.playClick();
              setInteriorLightsOn(!interiorLightsOn);
            }}
            className={`glass-panel px-2.5 py-1.5 flex items-center gap-1.5 transition-colors ${
              interiorLightsOn 
                ? 'border-[#C5A880]/60 text-[#C5A880]' 
                : 'text-[#6B6B67] hover:text-white'
            }`}
            title="Toggle Interior Lights"
          >
            <Lightbulb size={13} />
            <span className="hidden sm:inline text-[10px] uppercase">
              {interiorLightsOn ? 'Lights: On' : 'Lights: Off'}
            </span>
          </button>

          {/* Audio Toggle */}
          <button
            onClick={() => audioSystem.toggleSound()}
            className={`p-2 glass-panel transition-colors ${
              isSoundActive ? 'text-[#C5A880] border-[#C5A880]' : 'text-[#6B6B67] hover:text-white'
            }`}
            title="Toggle Ambient Audio"
          >
            {isSoundActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Exit Spatial Residence (Esc) */}
          <button
            onClick={() => {
              audioSystem.playClick();
              onClose();
            }}
            className="p-2 border border-white/20 hover:border-white text-white transition-colors"
            title="Exit Residence (Esc)"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* ========================================================
          4. CENTER SPATIAL DESTINATION BADGE (Mobile / Small Screen)
         ======================================================== */}
      <div className="relative z-20 px-6 md:hidden">
        <div className="glass-panel px-3 py-1 inline-block text-left">
          <span className="text-[9px] font-mono text-[#6B6B67] uppercase block">Current:</span>
          <span className="text-xs font-serif text-white">{currentRoom.name}</span>
        </div>
      </div>

      <div className="flex-1 pointer-events-none" />

      {/* ========================================================
          5. ROOM-TO-ROOM DIRECT TRANSITION PORTAL DOCK
          Prominently displays adjacent physical destinations!
         ======================================================== */}
      <div className="relative z-20 px-6 md:px-12 pb-3 pointer-events-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        {/* Connected Portals from Current Space */}
        <div className="glass-panel p-3 border-l-2 border-[#C5A880] max-w-xl">
          <span className="text-[9px] font-mono text-[#C5A880] tracking-[0.25em] uppercase block mb-1.5">
            PHYSICAL DESTINATIONS FROM HERE:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {currentRoom.connections?.map((conn) => (
              <button
                key={conn.roomId}
                onClick={() => handleTravelToRoom(conn.roomId)}
                className="px-3 py-1.5 border border-white/15 bg-white/5 hover:border-[#C5A880] hover:bg-[#C5A880]/15 text-xs font-sans-ui text-white transition-all flex items-center gap-2"
              >
                <span>{conn.label}</span>
                <ArrowRight size={12} className="text-[#C5A880]" />
              </button>
            ))}
          </div>
        </div>

        {/* Rapid Floor Switcher */}
        <div className="glass-panel px-3 py-2 flex items-center gap-2 text-xs font-mono">
          <span className="text-[10px] text-[#6B6B67] uppercase">FLOOR:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'ground', label: 'L0 (Ground)' },
            { id: 'level1', label: 'L1 (Upper)' }
          ].map((fl) => (
            <button
              key={fl.id}
              onClick={() => {
                audioSystem.playClick();
                setActiveFloor(fl.id);
              }}
              className={`px-2 py-0.5 uppercase tracking-wider transition-colors ${
                activeFloor === fl.id ? 'bg-[#C5A880] text-[#0E0F0F] font-bold' : 'text-[#A0A09B] hover:text-white'
              }`}
            >
              {fl.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          6. BOTTOM TIMELINE & CONTROL DOCK
         ======================================================== */}
      <footer className="relative z-30 w-full px-6 md:px-12 py-3.5 border-t border-white/10 bg-[#0E0F0F]/85 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 pointer-events-auto">
        {/* Left: Guided Navigation arrows & Chapters */}
        <div className="flex items-center gap-2">
          {explorationMode === 'guided' && (
            <div className="flex items-center gap-1 mr-2 border-r border-white/10 pr-2">
              <button
                onClick={handlePrevChapter}
                disabled={currentChapterIndex === 0}
                className={`p-1.5 border border-white/10 text-white ${
                  currentChapterIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-white'
                }`}
                title="Previous Chapter"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={handleNextChapter}
                disabled={currentChapterIndex === GUIDED_CHAPTERS.length - 1}
                className={`p-1.5 border border-white/10 text-white ${
                  currentChapterIndex === GUIDED_CHAPTERS.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-white'
                }`}
                title="Next Chapter"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          {/* Chapter Quick Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-md md:max-w-xl py-0.5">
            {GUIDED_CHAPTERS.map((ch, idx) => {
              const isActive = currentRoomId === ch.roomId;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleTravelToRoom(ch.roomId)}
                  className={`whitespace-nowrap px-2.5 py-1 text-left text-xs font-mono transition-all ${
                    isActive
                      ? 'border-b-2 border-[#C5A880] text-white bg-white/10 font-medium'
                      : 'text-[#6B6B67] hover:text-[#A0A09B]'
                  }`}
                >
                  <span className="text-[9px] text-[#C5A880] mr-1">{ch.chapterNumber}</span>
                  <span className="uppercase">{ch.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Mode Switcher, Floor Plan, X-Ray, Watch Film */}
        <div className="flex items-center gap-3">
          {/* Mode Switcher: Guided vs Free Explore */}
          <div className="flex border border-white/15 p-0.5 bg-white/5 text-xs font-mono">
            <button
              onClick={() => {
                audioSystem.playClick();
                setExplorationMode('guided');
              }}
              className={`px-3 py-1 uppercase tracking-wider transition-colors ${
                explorationMode === 'guided'
                  ? 'bg-[#C5A880] text-[#0E0F0F] font-semibold'
                  : 'text-[#A0A09B] hover:text-white'
              }`}
            >
              Guided Tour
            </button>
            <button
              onClick={() => {
                audioSystem.playClick();
                setExplorationMode('free');
              }}
              className={`px-3 py-1 uppercase tracking-wider transition-colors ${
                explorationMode === 'free'
                  ? 'bg-[#C5A880] text-[#0E0F0F] font-semibold'
                  : 'text-[#A0A09B] hover:text-white'
              }`}
            >
              Free Explore
            </button>
          </div>

          {/* Architectural X-Ray Switch */}
          <button
            onClick={() => {
              audioSystem.playClick();
              setXRayMode(!xRayMode);
            }}
            className={`px-3 py-1.5 border text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              xRayMode
                ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880]'
                : 'border-white/15 text-[#A0A09B] hover:border-white'
            }`}
            title="Toggle Structural X-Ray"
          >
            <Layers size={13} />
            <span className="hidden sm:inline">X-Ray</span>
          </button>

          {/* Interactive Floor Plan Drawer Trigger */}
          <button
            onClick={() => {
              audioSystem.playClick();
              setShowFloorPlan(!showFloorPlan);
            }}
            className={`px-3 py-1.5 border text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              showFloorPlan
                ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880]'
                : 'border-white/15 text-[#A0A09B] hover:border-white'
            }`}
          >
            <Compass size={13} />
            <span className="hidden sm:inline">Floor Plan</span>
          </button>

          {/* Watch Film / Cinematic Auto-Tour */}
          <button
            onClick={() => {
              audioSystem.playClick();
              setIsAutoTourActive(!isAutoTourActive);
            }}
            className={`px-3 py-1.5 border text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              isAutoTourActive
                ? 'border-[#C5A880] bg-[#C5A880]/20 text-[#C5A880]'
                : 'border-white/15 text-[#A0A09B] hover:border-white'
            }`}
          >
            {isAutoTourActive ? <Pause size={13} /> : <Play size={13} />}
            <span className="hidden sm:inline">{isAutoTourActive ? 'Pause Film' : 'Watch Film'}</span>
          </button>

          {/* Inquire Viewing */}
          <button
            onClick={() => onRequestViewing(property)}
            className="px-4 py-1.5 bg-[#F4F1EA] text-[#0E0F0F] text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#C5A880] transition-colors hidden lg:block"
          >
            Request Viewing
          </button>
        </div>
      </footer>

      {/* ========================================================
          7. INTERACTIVE FLOOR PLAN SCHEMATIC DRAWER
         ======================================================== */}
      <SpatialFloorPlan
        isOpen={showFloorPlan}
        onClose={() => setShowFloorPlan(false)}
        currentRoomId={currentRoomId}
        currentFloorNumber={currentRoom.floorNumber}
        onSelectRoom={handleTravelToRoom}
      />

      {/* ========================================================
          8. 3D HOTSPOT INSPECTOR POPUP
         ======================================================== */}
      <HotspotInspector
        hotspot={selectedHotspot}
        onClose={() => setSelectedHotspot(null)}
      />
    </div>
  );
}
