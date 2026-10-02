import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import ArchitecturalVilla from './ArchitecturalVilla';
import { audioSystem } from '../../utils/audioSystem';

/**
 * Camera Rig to smoothly animate between default, hotspots, and subtle mouse parallax
 */
function CameraController({ targetPosition, isExploring, autoTour, onTourStepChange }) {
  const cameraRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const tourStepRef = useRef(0);
  const tourTimeRef = useRef(0);

  // Curated cinematic camera sequence for "WATCH FILM" / Auto-Tour
  const tourKeyframes = [
    { pos: [0, 4, 15], target: [0, 1.5, 0], title: 'Overview & Arrival' },
    { pos: [7, 2.5, 9], target: [1.8, 1.2, 1], title: 'Living Pavilion & Reflection Court' },
    { pos: [2, 0.8, 6.5], target: [0, 0.2, 3.8], title: 'Basalt Infinity Lap Margin' },
    { pos: [-5, 4.5, 8], target: [-2.4, 3.8, 1], title: 'Cantilevered Primary Sky Suite' },
    { pos: [6, 1.2, 4], target: [3.8, 0.5, 1.5], title: 'Sunken Fire Pit & Lagoon Terrace' }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    if (autoTour) {
      tourTimeRef.current += delta;
      if (tourTimeRef.current > 7) {
        tourTimeRef.current = 0;
        tourStepRef.current = (tourStepRef.current + 1) % tourKeyframes.length;
        if (onTourStepChange) onTourStepChange(tourKeyframes[tourStepRef.current].title);
      }
      const currentKf = tourKeyframes[tourStepRef.current];
      cameraRef.current.position.lerp(new THREE.Vector3(...currentKf.pos), delta * 0.8);
      state.camera.lookAt(new THREE.Vector3(...currentKf.target));
      return;
    }

    if (isExploring) {
      // User is controlling camera manually via OrbitControls
      return;
    }

    // Default or Hotspot target
    const baseTarget = targetPosition 
      ? new THREE.Vector3(targetPosition[0] * 1.5, targetPosition[1] + 1.2, targetPosition[2] + 4.5)
      : new THREE.Vector3(mouse.current.x * 0.8, 3.2 - mouse.current.y * 0.5, 13.5);

    cameraRef.current.position.lerp(baseTarget, delta * 1.8);
    
    // Look at focal point
    const lookTarget = targetPosition 
      ? new THREE.Vector3(...targetPosition)
      : new THREE.Vector3(0, 1.5, 0);

    state.camera.lookAt(lookTarget);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 4.5, 17]}
      fov={42}
      near={0.1}
      far={100}
    />
  );
}

/**
 * Environmental Lighting rig supporting Morning, Golden Hour, and Night moods
 */
function LightingRig({ mood }) {
  if (mood === 'night') {
    return (
      <>
        <ambientLight intensity={0.18} color="#0D1B2A" />
        <directionalLight position={[12, 18, -10]} intensity={0.4} color="#8DA9C4" />
        {/* Soft moonlight rim */}
        <directionalLight position={[-15, 12, 10]} intensity={0.25} color="#415A77" />
        <fog attach="fog" args={['#080B0E', 12, 38]} />
      </>
    );
  }

  if (mood === 'morning') {
    return (
      <>
        <ambientLight intensity={0.65} color="#EBF4F6" />
        <directionalLight 
          position={[16, 22, 14]} 
          intensity={1.4} 
          color="#FFFDF7" 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-12, 10, -10]} intensity={0.4} color="#C9D6DF" />
        <fog attach="fog" args={['#101315', 18, 48]} />
      </>
    );
  }

  // Default: Golden Hour (architectural honey light)
  return (
    <>
      <ambientLight intensity={0.45} color="#F3E9DC" />
      <directionalLight 
        position={[18, 14, 12]} 
        intensity={1.8} 
        color="#F5B971" 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      {/* Soft warm fill light */}
      <directionalLight position={[-14, 8, -8]} intensity={0.5} color="#C59B67" />
      <fog attach="fog" args={['#0E1012', 15, 42]} />
    </>
  );
}

export default function HeroCanvas({
  mood = 'golden',
  onMoodChange = () => {},
  xRayMode = false,
  onToggleXRay = () => {},
  activeLevel = 'all',
  onChangeLevel = () => {},
  autoTour = false,
  onToggleAutoTour = () => {}
}) {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isFreeExplore, setIsFreeExplore] = useState(false);
  const [tourStepTitle, setTourStepTitle] = useState('Overview & Arrival');
  const controlsRef = useRef();

  const handleSelectHotspot = (spot) => {
    audioSystem.playTransition();
    setActiveHotspot(spot);
    setIsFreeExplore(false);
  };

  const handleResetCamera = () => {
    audioSystem.playClick();
    setActiveHotspot(null);
    setIsFreeExplore(false);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[620px] select-none">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <LightingRig mood={mood} />
          
          <CameraController 
            targetPosition={activeHotspot ? activeHotspot.pos : null} 
            isExploring={isFreeExplore}
            autoTour={autoTour}
            onTourStepChange={setTourStepTitle}
          />

          <ArchitecturalVilla 
            mood={mood} 
            xRayMode={xRayMode}
            activeLevel={activeLevel}
            activeHotspot={activeHotspot ? activeHotspot.id : null}
            onSelectHotspot={handleSelectHotspot}
          />

          {isFreeExplore && (
            <OrbitControls 
              ref={controlsRef}
              enablePan={false}
              enableZoom={true}
              minDistance={6}
              maxDistance={24}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.05}
              dampingFactor={0.06}
              rotateSpeed={0.6}
            />
          )}
        </Suspense>
      </Canvas>

      {/* 3D Atmospheric Vignette Controls (Floating subtle dock on bottom right of hero) */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Hotspot Info Popup if selected */}
        {activeHotspot && (
          <div className="glass-panel p-4 rounded-none border-l-2 border-[#C5A880] max-w-xs text-left animate-in fade-in duration-300">
            <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase font-mono block mb-1">
              HOTSPOT INSPECTION
            </span>
            <h4 className="text-base font-serif text-[#F4F1EA] tracking-wide mb-1">
              {activeHotspot.name}
            </h4>
            <p className="text-xs text-[#A0A09B] leading-relaxed mb-3">
              {activeHotspot.desc}
            </p>
            <button 
              onClick={handleResetCamera}
              className="text-[11px] tracking-wider text-[#C5A880] hover:text-[#F4F1EA] uppercase underline underline-offset-4"
            >
              Reset Perspective
            </button>
          </div>
        )}

        {/* Cinematic Auto-Tour Banner if active */}
        {autoTour && (
          <div className="glass-panel px-4 py-2 text-xs flex items-center gap-3 border border-[#C5A880]/40">
            <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
            <span className="text-[#A0A09B] uppercase tracking-widest text-[10px]">CINEMATIC FILM:</span>
            <span className="text-[#F4F1EA] font-serif text-sm">{tourStepTitle}</span>
            <button 
              onClick={onToggleAutoTour}
              className="ml-2 text-[10px] text-[#A0A09B] hover:text-white uppercase tracking-wider underline"
            >
              Exit Film
            </button>
          </div>
        )}

        {/* Control Bar: Mood, Mode, X-Ray */}
        <div className="glass-panel px-3 py-2 flex items-center gap-4 text-xs font-sans-ui text-[#A0A09B]">
          {/* Mood Selector: Morning / Golden / Night */}
          <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
            <span className="text-[10px] uppercase tracking-widest text-[#6B6B67] hidden sm:inline">MOOD:</span>
            {[
              { id: 'morning', label: 'Day' },
              { id: 'golden', label: 'Golden' },
              { id: 'night', label: 'Night' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  audioSystem.playClick();
                  onMoodChange(m.id);
                }}
                className={`px-2 py-0.5 text-[11px] uppercase tracking-wider transition-colors ${
                  mood === m.id ? 'text-[#F4F1EA] font-medium bg-white/10' : 'hover:text-[#F4F1EA]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Mode: Guided Tour vs Free Explore */}
          <div className="flex items-center gap-2 border-r border-white/10 pr-3">
            <button
              onClick={() => {
                audioSystem.playClick();
                setIsFreeExplore(!isFreeExplore);
                if (activeHotspot) setActiveHotspot(null);
              }}
              className={`px-2 py-0.5 text-[11px] uppercase tracking-wider transition-colors ${
                isFreeExplore ? 'text-[#C5A880] font-semibold bg-[#C5A880]/15' : 'hover:text-white'
              }`}
            >
              {isFreeExplore ? 'Free Orbit (On)' : 'Explore 3D'}
            </button>

            {isFreeExplore && (
              <button 
                onClick={handleResetCamera}
                title="Reset View"
                className="text-[10px] uppercase text-[#A0A09B] hover:text-white underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Architectural X-Ray Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioSystem.playClick();
                onToggleXRay();
              }}
              className={`px-2 py-0.5 text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                xRayMode ? 'text-[#C5A880] font-semibold bg-[#C5A880]/20' : 'hover:text-white'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${xRayMode ? 'bg-[#C5A880]' : 'bg-[#6B6B67]'}`} />
              X-Ray Structure
            </button>

            {xRayMode && (
              <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-white/10">
                {['all', 'ground', 'level1', 'level2'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      audioSystem.playClick();
                      onChangeLevel(lvl);
                    }}
                    className={`px-1.5 py-0.5 text-[9px] uppercase tracking-widest ${
                      activeLevel === lvl ? 'text-white bg-white/20' : 'text-[#6B6B67] hover:text-white'
                    }`}
                  >
                    {lvl === 'all' ? 'All' : lvl === 'ground' ? 'L0' : lvl === 'level1' ? 'L1' : 'Roof'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
