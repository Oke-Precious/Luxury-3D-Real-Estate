import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural Luxury Architectural Villa
 * Modeled with cantilevered post-tensioned concrete, floor-to-ceiling glass,
 * warm interior lighting, water reflection margin, and X-Ray structural modes.
 */
export default function ArchitecturalVilla({ 
  mood = 'golden', 
  xRayMode = false, 
  activeLevel = 'all', // 'all' | 'ground' | 'level1' | 'level2'
  activeHotspot = null,
  onSelectHotspot = () => {}
}) {
  const groupRef = useRef();
  const poolWaterRef = useRef();

  // Gentle water ripple animation
  useFrame((state, delta) => {
    if (poolWaterRef.current) {
      poolWaterRef.current.position.y = 0.05 + Math.sin(state.clock.elapsedTime * 1.5) * 0.008;
    }
  });

  // Dynamic colors based on mood
  const isNight = mood === 'night';
  const isGolden = mood === 'golden';

  const concreteColor = isNight ? '#18191A' : isGolden ? '#D2C8BA' : '#E2DFD8';
  const timberColor = isNight ? '#2A1B12' : '#8A5A36';
  const glassColor = isNight ? '#081018' : '#8EA3A6';
  const interiorLightIntensity = isNight ? 2.8 : isGolden ? 1.4 : 0.4;
  const poolColor = isNight ? '#0A2533' : isGolden ? '#1B4D5C' : '#2A7282';

  // Material settings according to X-Ray mode
  const exteriorOpacity = xRayMode ? 0.18 : 1.0;
  const exteriorTransparent = xRayMode;
  const exteriorWireframe = xRayMode;

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 1. FOUNDATION & REFLECTING PODIUM */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <boxGeometry args={[14, 0.5, 12]} />
        <meshStandardMaterial 
          color={concreteColor} 
          roughness={0.7} 
          metalness={0.1}
          transparent={exteriorTransparent}
          opacity={exteriorOpacity}
          wireframe={exteriorWireframe}
        />
      </mesh>

      {/* 2. BASALT INFINITY POOL */}
      <group position={[0, 0, 3.8]}>
        {/* Pool Basin Rim */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[9.5, 0.4, 4.2]} />
          <meshStandardMaterial color="#111314" roughness={0.9} />
        </mesh>
        {/* Animated Water Surface */}
        <mesh ref={poolWaterRef} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[9.2, 3.9]} />
          <meshStandardMaterial 
            color={poolColor} 
            roughness={0.08} 
            metalness={0.85} 
            transparent 
            opacity={0.88} 
          />
        </mesh>
        {/* Underwater Pool Accent Light */}
        <pointLight position={[0, -0.05, 0]} color="#48CAE4" intensity={isNight ? 1.6 : 0.3} distance={5} />
      </group>

      {/* 3. GROUND FLOOR PAVILION (Level 0) */}
      <group position={[0, 0, 0]} visible={activeLevel === 'all' || activeLevel === 'ground'}>
        {/* Ground Floor Slab */}
        <mesh position={[-1, 0.1, -0.5]}>
          <boxGeometry args={[9, 0.2, 7]} />
          <meshStandardMaterial color={concreteColor} roughness={0.6} />
        </mesh>

        {/* Minimal Rear Concrete Anchor Wall */}
        <mesh position={[-4, 1.4, -3.8]} castShadow receiveShadow>
          <boxGeometry args={[4, 2.6, 0.4]} />
          <meshStandardMaterial 
            color={concreteColor} 
            roughness={0.8}
            transparent={exteriorTransparent}
            opacity={exteriorOpacity}
            wireframe={exteriorWireframe}
          />
        </mesh>

        {/* Board-formed Travertine Spine Wall */}
        <mesh position={[-1.2, 1.4, -0.5]} castShadow>
          <boxGeometry args={[0.3, 2.6, 6.5]} />
          <meshStandardMaterial color="#C5BDB0" roughness={0.7} />
        </mesh>

        {/* Floor-to-ceiling Glass Pavilion Walls (Living Salon) */}
        <mesh position={[1.5, 1.4, 0.5]}>
          <boxGeometry args={[5.8, 2.5, 5]} />
          <meshPhysicalMaterial 
            color={glassColor} 
            transmission={0.92} 
            roughness={0.05} 
            ior={1.5}
            transparent 
            opacity={xRayMode ? 0.08 : 0.35} 
          />
        </mesh>

        {/* Interior Ground Floor Elements (Furniture & Warm Glow) */}
        <group position={[1.8, 0.5, 0.5]}>
          {/* Low Italian Minimalist Sofa */}
          <mesh position={[0, 0.2, 0.5]}>
            <boxGeometry args={[2.8, 0.35, 1.2]} />
            <meshStandardMaterial color="#2B2D2F" roughness={0.85} />
          </mesh>
          {/* Travertine Coffee Plinth */}
          <mesh position={[0, 0.15, -0.4]}>
            <boxGeometry args={[1.8, 0.2, 0.8]} />
            <meshStandardMaterial color="#D7CFBE" roughness={0.5} />
          </mesh>
          {/* Suspended Fireplace Column */}
          <mesh position={[1.2, 1.5, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 1.8, 16]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[1.2, 0.5, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.9} />
          </mesh>
          {/* Fireplace Ember Glow */}
          <pointLight position={[1.2, 0.5, 0]} color="#FF8C42" intensity={isNight ? 1.8 : 0.8} distance={3.5} />
          {/* Warm Interior Ceiling Downlights */}
          <pointLight position={[0, 2.2, 0.5]} color="#FFD166" intensity={interiorLightIntensity} distance={6} />
        </group>
      </group>

      {/* 4. UPPER CANTILEVERED LEVEL 01 (Primary Suites) */}
      <group position={[0, 0, 0]} visible={activeLevel === 'all' || activeLevel === 'level1'}>
        {/* Floating Cantilever Floor Slab */}
        <mesh position={[-0.8, 2.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[9.5, 0.35, 7.5]} />
          <meshStandardMaterial 
            color={concreteColor} 
            roughness={0.6}
            transparent={exteriorTransparent}
            opacity={exteriorOpacity}
            wireframe={exteriorWireframe}
          />
        </mesh>

        {/* Cantilever Master Bedroom Box extending out dramatically */}
        <mesh position={[-2.4, 3.9, 0.8]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 2.1, 4.8]} />
          <meshStandardMaterial 
            color={concreteColor} 
            roughness={0.65} 
            metalness={0.05}
            transparent={exteriorTransparent}
            opacity={exteriorOpacity}
            wireframe={exteriorWireframe}
          />
        </mesh>

        {/* Master Suite Corner Structural Glass */}
        <mesh position={[-1.2, 3.85, 2.8]}>
          <boxGeometry args={[2.6, 1.8, 0.1]} />
          <meshPhysicalMaterial 
            color={glassColor} 
            transmission={0.95} 
            roughness={0.05} 
            transparent 
            opacity={xRayMode ? 0.1 : 0.4} 
          />
        </mesh>

        {/* Master Bedroom Interior Elements & Lighting */}
        <group position={[-2.4, 3.1, 0.8]}>
          {/* Platform Bed plinth */}
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[2.2, 0.3, 2.4]} />
            <meshStandardMaterial color="#4A443F" roughness={0.8} />
          </mesh>
          {/* Fluted Timber Headboard */}
          <mesh position={[0, 0.8, -1.1]}>
            <boxGeometry args={[2.8, 1.0, 0.1]} />
            <meshStandardMaterial color={timberColor} roughness={0.7} />
          </mesh>
          {/* Warm Suite Reading Glow */}
          <pointLight position={[0, 1.2, 0]} color="#FFE099" intensity={interiorLightIntensity * 1.1} distance={5} />
        </group>

        {/* Upper Balcony Glass Railing */}
        <mesh position={[1.8, 3.3, 3.2]}>
          <boxGeometry args={[4.2, 0.8, 0.05]} />
          <meshPhysicalMaterial color="#94A3B8" transmission={0.95} roughness={0.1} transparent opacity={0.3} />
        </mesh>
      </group>

      {/* 5. FLOATING ROOF PLANE */}
      <group position={[0, 0, 0]} visible={activeLevel === 'all' || activeLevel === 'level2'}>
        <mesh position={[-0.8, 5.05, 0]} castShadow>
          <boxGeometry args={[10.2, 0.22, 8.2]} />
          <meshStandardMaterial 
            color={concreteColor} 
            roughness={0.55}
            transparent={exteriorTransparent}
            opacity={exteriorOpacity}
            wireframe={exteriorWireframe}
          />
        </mesh>
        {/* Warm Timber Soffit under roof */}
        <mesh position={[-0.8, 4.92, 0]}>
          <boxGeometry args={[10.1, 0.04, 8.1]} />
          <meshStandardMaterial color={timberColor} roughness={0.6} />
        </mesh>
      </group>

      {/* 6. ARCHITECTURAL DETAILS & LANDSCAPING */}
      {/* Stepping Stones across the pool */}
      <group position={[3.6, 0.08, 3.8]}>
        {[-1.2, -0.4, 0.4, 1.2].map((zPos, idx) => (
          <mesh key={idx} position={[0, 0, zPos]}>
            <boxGeometry args={[1.2, 0.1, 0.6]} />
            <meshStandardMaterial color="#D0CAC0" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Minimal Architectural Trees / Cypress Silhouettes */}
      <group position={[-5.8, 0.8, 2.5]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 2.6, 8]} />
          <meshStandardMaterial color="#2B2118" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.8, 0]}>
          <coneGeometry args={[0.65, 2.2, 8]} />
          <meshStandardMaterial color={isNight ? "#0C1F15" : "#243D2A"} roughness={0.85} />
        </mesh>
      </group>

      <group position={[-6.5, 0.6, 0.8]}>
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.07, 0.1, 2.2, 8]} />
          <meshStandardMaterial color="#2B2118" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <coneGeometry args={[0.55, 1.8, 8]} />
          <meshStandardMaterial color={isNight ? "#0C1F15" : "#2D4B34"} roughness={0.85} />
        </mesh>
      </group>

      {/* 7. INTERACTIVE 3D HOTSPOTS */}
      {[
        { id: 'salon', name: 'Living Pavilion', pos: [1.8, 1.4, 1.2], desc: 'Double-height volume with 270° lagoon view' },
        { id: 'pool', name: 'Infinity Margin', pos: [0, 0.4, 4.2], desc: 'Black volcanic basalt infinity lap pool' },
        { id: 'suite', name: 'Primary Sky Wing', pos: [-2.4, 3.8, 2.2], desc: 'Cantilevered bedroom with sunset balcony' },
        { id: 'terrace', name: 'Lagoon Terrace', pos: [3.8, 0.5, 1.5], desc: 'Sunken fire pit and outdoor dining court' }
      ].map((spot) => {
        const isSelected = activeHotspot === spot.id;
        return (
          <group 
            key={spot.id} 
            position={spot.pos} 
            onClick={(e) => {
              e.stopPropagation();
              onSelectHotspot(spot);
            }}
          >
            {/* Outer pulsating beacon ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.18, 0.24, 32]} />
              <meshBasicMaterial 
                color={isSelected ? "#FFD166" : "#C5A880"} 
                transparent 
                opacity={0.8} 
                side={THREE.DoubleSide} 
              />
            </mesh>
            {/* Center glowing focal point */}
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={isSelected ? "#FFFFFF" : "#C5A880"} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
