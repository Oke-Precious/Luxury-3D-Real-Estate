import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SpatialCameraRig from './SpatialCameraRig';
import ProceduralResidence from './ProceduralResidence';

function SpatialLightingRig({ mood }) {
  if (mood === 'night') {
    return (
      <>
        <ambientLight intensity={0.16} color="#0E1B26" />
        <directionalLight position={[10, 16, -8]} intensity={0.35} color="#8DA9C4" />
        <directionalLight position={[-12, 10, 10]} intensity={0.2} color="#4A6572" />
        <fog attach="fog" args={['#070A0D', 10, 42]} />
      </>
    );
  }

  if (mood === 'day') {
    return (
      <>
        <ambientLight intensity={0.65} color="#F2F7F9" />
        <directionalLight 
          position={[14, 20, 12]} 
          intensity={1.4} 
          color="#FFFDF7" 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-10, 8, -8]} intensity={0.35} color="#D1E8E2" />
        <fog attach="fog" args={['#0F1215', 18, 52]} />
      </>
    );
  }

  // Golden Hour (Default luxury amber lighting)
  return (
    <>
      <ambientLight intensity={0.42} color="#F4EADB" />
      <directionalLight 
        position={[16, 12, 10]} 
        intensity={1.8} 
        color="#F5B86E" 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-12, 6, -6]} intensity={0.45} color="#D4A373" />
      <fog attach="fog" args={['#0D0F11', 14, 46]} />
    </>
  );
}

export default function ResidenceSpatialScene({
  currentRoom,
  explorationMode = 'guided', // 'guided' | 'free'
  mood = 'golden',
  interiorLightsOn = true,
  xRayMode = false,
  activeFloor = 'all',
  autoTour = false,
  reducedMotion = false,
  onSelectPortal = () => {},
  onSelectHotspot = () => {},
  onTransitionEnd = () => {}
}) {
  return (
    <div className="relative w-full h-full select-none" data-cursor={explorationMode === 'free' ? 'drag' : 'explore'}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <Suspense fallback={null}>
          <SpatialLightingRig mood={mood} />

          <SpatialCameraRig
            currentRoom={currentRoom}
            mode={explorationMode}
            autoTour={autoTour}
            reducedMotion={reducedMotion}
            onTransitionEnd={onTransitionEnd}
          />

          <ProceduralResidence
            mood={mood}
            interiorLightsOn={interiorLightsOn}
            xRayMode={xRayMode}
            activeFloor={activeFloor}
            currentRoomId={currentRoom.id}
            onSelectPortal={onSelectPortal}
            onSelectHotspot={onSelectHotspot}
            currentConnections={currentRoom.connections || []}
            currentHotspots={currentRoom.hotspots || []}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
