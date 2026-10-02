import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { 
  getConcreteTexture, 
  getTravertineTexture, 
  getMarbleTexture, 
  getTimberTexture, 
  getFabricTexture 
} from '../../utils/proceduralTextures';

/**
 * THE AURELIA RESIDENCE (Demonstration Architectural Digital Twin)
 * Coherent 3D architectural structure matching spatial coordinates in SPATIAL_ROOMS:
 * Ground Floor: Entrance, Foyer, Living Salon, Dining Gallery, Kitchen Studio, Terrace, Pool.
 * Level 01: Staircase, Upper Mezzanine, Primary Sky Suite, Private Balcony.
 */
export default function ProceduralResidence({
  mood = 'golden',
  interiorLightsOn = true,
  xRayMode = false,
  activeFloor = 'all', // 'all' | 'ground' | 'level1'
  currentRoomId = 'exterior',
  onSelectPortal = () => {},
  onSelectHotspot = () => {},
  currentConnections = [],
  currentHotspots = []
}) {
  const waterRef = useRef();

  // Load procedural textures
  const concreteTex = useMemo(() => getConcreteTexture(), []);
  const travertineTex = useMemo(() => getTravertineTexture(), []);
  const marbleTex = useMemo(() => getMarbleTexture(), []);
  const timberTex = useMemo(() => getTimberTexture(), []);
  const fabricTex = useMemo(() => getFabricTexture(), []);

  // Water ripple animation for the basalt pool
  useFrame((state) => {
    if (waterRef.current) {
      waterRef.current.position.y = 0.05 + Math.sin(state.clock.elapsedTime * 1.6) * 0.006;
    }
  });

  const isNight = mood === 'night';
  const isGolden = mood === 'golden';

  // Architectural palette
  const concreteColor = isNight ? '#161718' : isGolden ? '#D4CABF' : '#E4E0D8';
  const travertineColor = isNight ? '#22201D' : isGolden ? '#C8BCAE' : '#DDD4C8';
  const timberColor = isNight ? '#24160E' : isGolden ? '#825534' : '#6B4226';
  const glassColor = isNight ? '#050D14' : isGolden ? '#89A0A3' : '#A4B8BA';
  const poolColor = isNight ? '#09212D' : isGolden ? '#174857' : '#236F80';
  
  const lightIntensity = interiorLightsOn ? (isNight ? 2.6 : isGolden ? 1.4 : 0.6) : 0;
  const exteriorOpacity = xRayMode ? 0.2 : 1.0;
  const exteriorTransparent = xRayMode;
  const exteriorWireframe = xRayMode;

  return (
    <group position={[0, -0.6, 0]}>
      {/* ========================================================
          1. FOUNDATION & SITE CONTEXT
         ======================================================== */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <boxGeometry args={[16, 0.5, 14]} />
        <meshStandardMaterial 
          color={concreteColor} 
          map={concreteTex}
          roughness={0.75} 
          metalness={0.1}
          transparent={exteriorTransparent}
          opacity={exteriorOpacity}
          wireframe={exteriorWireframe}
        />
      </mesh>

      {/* ========================================================
          2. BASALT INFINITY POOL & REFLECTING MARGIN
         ======================================================== */}
      <group position={[0, 0, 4.2]}>
        {/* Pool Coping Rim */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[10, 0.35, 4.2]} />
          <meshStandardMaterial color="#111315" roughness={0.9} />
        </mesh>
        {/* Animated Water Surface */}
        <mesh ref={waterRef} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[9.7, 3.9]} />
          <meshStandardMaterial 
            color={poolColor} 
            roughness={0.06} 
            metalness={0.88} 
            transparent 
            opacity={0.88} 
          />
        </mesh>
        {/* Underwater Pool Downlight */}
        <pointLight position={[0, -0.05, 0]} color="#48CAE4" intensity={isNight ? 2.0 : 0.4} distance={6} />
      </group>

      {/* ========================================================
          3. GROUND FLOOR (Level 0) SPATIAL VOLUMES
         ======================================================== */}
      <group visible={activeFloor === 'all' || activeFloor === 'ground'}>
        {/* Ground Floor Slab */}
        <mesh position={[0.5, 0.1, 0]} receiveShadow>
          <boxGeometry args={[11.5, 0.2, 9.5]} />
          <meshStandardMaterial color={concreteColor} map={travertineTex} roughness={0.65} />
        </mesh>

        {/* Central Travertine Spine Wall dividing service core and living */}
        <mesh position={[-0.8, 1.4, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[0.3, 2.6, 7.8]} />
          <meshStandardMaterial color={travertineColor} map={travertineTex} roughness={0.7} />
        </mesh>

        {/* Rear Concrete Structural Wall */}
        <mesh position={[-4.5, 1.4, -3.2]} castShadow receiveShadow>
          <boxGeometry args={[4.5, 2.6, 0.4]} />
          <meshStandardMaterial 
            color={concreteColor} 
            map={concreteTex}
            roughness={0.8}
            transparent={exteriorTransparent}
            opacity={exteriorOpacity}
            wireframe={exteriorWireframe}
          />
        </mesh>

        {/* --- ZONE A: FOYER & ENTRANCE --- */}
        <group position={[-0.6, 0.2, 4.2]}>
          {/* Cast Bronze Pivot Door (Partially ajar at 25 degrees) */}
          <group position={[0.6, 1.2, 1.0]} rotation={[0, 0.4, 0]}>
            <mesh position={[0.7, 0, 0]}>
              <boxGeometry args={[1.4, 2.4, 0.08]} />
              <meshStandardMaterial color="#3D2E1E" metalness={0.8} roughness={0.35} />
            </mesh>
          </group>
          {/* Foyer Reflected Downlight */}
          <pointLight position={[0, 2.2, 0]} color="#FFDF9E" intensity={lightIntensity * 0.8} distance={4.5} />
        </group>

        {/* --- ZONE B: LIVING SALON --- */}
        <group position={[1.8, 0.2, 1.8]}>
          {/* Low Italian Minimalist Sofa Module */}
          <mesh position={[0, 0.2, -0.4]}>
            <boxGeometry args={[3.2, 0.4, 1.3]} />
            <meshStandardMaterial color="#222325" map={fabricTex} roughness={0.85} />
          </mesh>
          {/* Low Backrest */}
          <mesh position={[0, 0.55, -0.95]}>
            <boxGeometry args={[3.2, 0.35, 0.25]} />
            <meshStandardMaterial color="#1E1F21" map={fabricTex} roughness={0.85} />
          </mesh>
          {/* Travertine Low Plinth Coffee Table */}
          <mesh position={[0, 0.15, 0.6]}>
            <boxGeometry args={[2.0, 0.18, 0.9]} />
            <meshStandardMaterial color={travertineColor} map={travertineTex} roughness={0.5} />
          </mesh>
          {/* Suspended Steel Fireplace Flue */}
          <mesh position={[1.2, 1.6, 0.2]}>
            <cylinderGeometry args={[0.07, 0.07, 1.8, 16]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.25} />
          </mesh>
          {/* Fireplace Hearth Sphere */}
          <mesh position={[1.2, 0.55, 0.2]}>
            <sphereGeometry args={[0.26, 16, 16]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Flame Ember Glow */}
          <pointLight position={[1.2, 0.55, 0.2]} color="#FF7B25" intensity={isNight ? 2.2 : 1.0} distance={3.8} />
          {/* Ambient Living Ceiling Light */}
          <pointLight position={[0, 2.2, 0]} color="#FFE2A8" intensity={lightIntensity} distance={6} />
        </group>

        {/* Living Room Floor-to-Ceiling Glazing */}
        <mesh position={[2.2, 1.4, 3.2]}>
          <boxGeometry args={[5.2, 2.5, 0.08]} />
          <meshPhysicalMaterial 
            color={glassColor} 
            transmission={0.92} 
            roughness={0.04} 
            transparent 
            opacity={xRayMode ? 0.08 : 0.35} 
          />
        </mesh>

        {/* --- ZONE C: DINING GALLERY --- */}
        <group position={[2.4, 0.2, -1.0]}>
          {/* Long Cast Bronze Dining Table */}
          <mesh position={[0, 0.38, 0]}>
            <boxGeometry args={[1.1, 0.08, 2.8]} />
            <meshStandardMaterial color="#4A3B2C" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Dining Table Pedestal Plinths */}
          <mesh position={[0, 0.18, -0.8]}>
            <boxGeometry args={[0.3, 0.36, 0.3]} />
            <meshStandardMaterial color="#1E1F21" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.18, 0.8]}>
            <boxGeometry args={[0.3, 0.36, 0.3]} />
            <meshStandardMaterial color="#1E1F21" roughness={0.8} />
          </mesh>
          {/* Dining Chandelier Glow */}
          <pointLight position={[0, 2.0, 0]} color="#FFDCA0" intensity={lightIntensity * 0.9} distance={5} />
        </group>

        {/* --- ZONE D: KITCHEN STUDIO --- */}
        <group position={[3.6, 0.2, 0.4]}>
          {/* Monolithic Travertine / Marble Island */}
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[1.2, 0.9, 3.2]} />
            <meshStandardMaterial color={travertineColor} map={marbleTex} roughness={0.4} />
          </mesh>
          {/* Back Tall Cabinetry Wall */}
          <mesh position={[1.4, 1.3, 0]}>
            <boxGeometry args={[0.4, 2.6, 3.6]} />
            <meshStandardMaterial color="#1A1C1D" map={timberTex} roughness={0.75} />
          </mesh>
          {/* Kitchen Under-Cabinet Accent Light */}
          <pointLight position={[0.5, 2.0, 0]} color="#FFF3D6" intensity={lightIntensity * 0.85} distance={4.5} />
        </group>

        {/* --- ZONE E: SUNKEN LAGOON TERRACE --- */}
        <group position={[3.6, 0.1, 2.8]}>
          {/* Sunken Plinth Basin */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[2.8, 0.15, 2.8]} />
            <meshStandardMaterial color="#202224" roughness={0.9} />
          </mesh>
          {/* Circular Sunken Fire Pit Ring */}
          <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.25, 0.55, 24]} />
            <meshStandardMaterial color="#111213" roughness={0.8} />
          </mesh>
          {/* Outdoor Terrace Fire Glow */}
          <pointLight position={[0, 0.25, 0]} color="#FF8438" intensity={isNight ? 1.8 : 0.6} distance={4} />
        </group>

        {/* --- ZONE F: ARCHITECTURAL FLOATING STAIRCASE --- */}
        <group position={[-1.2, 0.2, 1.5]}>
          {/* 8 Cantilevered Oak Steps leading to Level 01 */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((step) => {
            const stepY = step * 0.32;
            const stepZ = -step * 0.28;
            return (
              <mesh key={step} position={[-0.3, stepY, stepZ]}>
                <boxGeometry args={[0.9, 0.08, 0.32]} />
                <meshStandardMaterial color={timberColor} roughness={0.65} />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* ========================================================
          4. LEVEL 01 (Upper Floor Cantilever)
         ======================================================== */}
      <group visible={activeFloor === 'all' || activeFloor === 'level1'}>
        {/* Floating Cantilever Floor Slab */}
        <mesh position={[-0.8, 2.75, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[10.5, 0.32, 8.5]} />
          <meshStandardMaterial 
            color={concreteColor} 
            roughness={0.6}
            transparent={exteriorTransparent}
            opacity={exteriorOpacity}
            wireframe={exteriorWireframe}
          />
        </mesh>

        {/* --- ZONE G: PRIMARY SKY SUITE --- */}
        <group position={[-2.4, 2.9, 1.2]}>
          {/* Platform Bed Base */}
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[2.2, 0.3, 2.4]} />
            <meshStandardMaterial color="#2B2D2F" roughness={0.85} />
          </mesh>
          {/* Fluted Walnut Acoustic Headboard */}
          <mesh position={[0, 0.8, -1.1]}>
            <boxGeometry args={[2.6, 1.0, 0.1]} />
            <meshStandardMaterial color={timberColor} roughness={0.6} />
          </mesh>
          {/* Suite Soft Reading Light */}
          <pointLight position={[0, 1.3, 0]} color="#FFE4A0" intensity={lightIntensity * 1.1} distance={5} />
        </group>

        {/* Primary Suite Corner Glass Windows */}
        <mesh position={[-1.2, 3.9, 2.8]}>
          <boxGeometry args={[2.8, 1.9, 0.08]} />
          <meshPhysicalMaterial 
            color={glassColor} 
            transmission={0.95} 
            roughness={0.04} 
            transparent 
            opacity={xRayMode ? 0.08 : 0.35} 
          />
        </mesh>
        <mesh position={[-3.8, 3.9, 1.4]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[2.8, 1.9, 0.08]} />
          <meshPhysicalMaterial 
            color={glassColor} 
            transmission={0.95} 
            roughness={0.04} 
            transparent 
            opacity={xRayMode ? 0.08 : 0.35} 
          />
        </mesh>

        {/* --- ZONE H: UPPER SUNSET BALCONY --- */}
        <group position={[1.8, 2.9, 2.8]}>
          {/* Cantilever Balcony Railing */}
          <mesh position={[0, 0.5, 0.8]}>
            <boxGeometry args={[3.8, 0.9, 0.06]} />
            <meshPhysicalMaterial color="#94A3B8" transmission={0.95} roughness={0.08} transparent opacity={0.3} />
          </mesh>
        </group>

        {/* Upper Mezzanine Glass Railing looking down onto salon */}
        <mesh position={[0.2, 3.4, 0.5]}>
          <boxGeometry args={[3.2, 0.9, 0.06]} />
          <meshPhysicalMaterial color="#94A3B8" transmission={0.95} roughness={0.08} transparent opacity={0.3} />
        </mesh>
      </group>

      {/* ========================================================
          5. FLOATING ROOF SLAB & TIMBER SOFFIT
         ======================================================== */}
      <group position={[0, 0, 0]}>
        <mesh position={[-0.8, 5.05, 0.2]} castShadow>
          <boxGeometry args={[11.2, 0.22, 9.2]} />
          <meshStandardMaterial 
            color={concreteColor} 
            roughness={0.55}
            transparent={exteriorTransparent}
            opacity={exteriorOpacity}
            wireframe={exteriorWireframe}
          />
        </mesh>
        {/* Warm Timber Underside Soffit */}
        <mesh position={[-0.8, 4.92, 0.2]}>
          <boxGeometry args={[11.1, 0.04, 9.1]} />
          <meshStandardMaterial color={timberColor} roughness={0.65} />
        </mesh>
      </group>

      {/* ========================================================
          6. 3D SPATIAL NAVIGATION DESTINATION PORTALS
          Subtle architectural rings placed at room thresholds
         ======================================================== */}
      {currentConnections.map((conn) => (
        <group
          key={conn.roomId}
          position={conn.pos}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPortal(conn.roomId);
          }}
          className="cursor-pointer"
        >
          {/* Outer glowing pulsing beacon ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.24, 0.32, 32]} />
            <meshBasicMaterial color="#C5A880" transparent opacity={0.85} side={THREE.DoubleSide} />
          </mesh>
          {/* Inner core dot */}
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          {/* Vertical subtle indicator line */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
            <meshBasicMaterial color="#C5A880" transparent opacity={0.7} />
          </mesh>
        </group>
      ))}

      {/* ========================================================
          7. 3D ARCHITECTURAL MATERIAL HOTSPOTS
          Clickable pins for room features (fireplace, stone, glazing, etc.)
         ======================================================== */}
      {currentHotspots.map((spot) => (
        <group
          key={spot.id}
          position={spot.pos}
          onClick={(e) => {
            e.stopPropagation();
            onSelectHotspot(spot);
          }}
          className="cursor-pointer"
        >
          {/* Inner focal diamond */}
          <mesh position={[0, 0.05, 0]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshBasicMaterial color="#FFD166" />
          </mesh>
          {/* Subtle pulse ring */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.16, 0.22, 24]} />
            <meshBasicMaterial color="#C5A880" transparent opacity={0.65} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
