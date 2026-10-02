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
 * High-End Realistic Architectural Villa for the Hero Section
 * Fully detailed with:
 * - Real luxury modular couch (plinth, separate cushions, backrests, throw pillows, coffee table with books)
 * - Real luxury kitchen (waterfall marble island, barstools, induction cooktop, gooseneck faucet, wall ovens, lit shelves)
 * - Real building walls (board-formed concrete, travertine spine, fluted timber, bronze mullions, recessed ceiling lights)
 * - Real outdoor terrace & pool (infinity weir, coping, sun loungers, sunken fire pit with glowing rocks, tropical planters)
 * - Real upper suite (floating king bed, duvet, pillows, bedside tables, reading sconces, glass balustrade)
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
  const flameRef = useRef();

  // Load procedural textures
  const concreteTex = useMemo(() => getConcreteTexture(), []);
  const travertineTex = useMemo(() => getTravertineTexture(), []);
  const marbleTex = useMemo(() => getMarbleTexture(), []);
  const timberTex = useMemo(() => getTimberTexture(), []);
  const fabricTex = useMemo(() => getFabricTexture(), []);

  // Animate pool water ripple & subtle flame flicker
  useFrame((state) => {
    if (poolWaterRef.current) {
      poolWaterRef.current.position.y = 0.06 + Math.sin(state.clock.elapsedTime * 1.6) * 0.006;
    }
    if (flameRef.current) {
      flameRef.current.intensity = (isNight ? 2.4 : 1.2) + Math.sin(state.clock.elapsedTime * 10) * 0.25;
    }
  });

  const isNight = mood === 'night';
  const isGolden = mood === 'golden';

  const concreteTint = isNight ? '#222325' : isGolden ? '#E5DCD0' : '#EDE8E0';
  const interiorLightIntensity = isNight ? 2.8 : isGolden ? 1.5 : 0.5;
  const poolColor = isNight ? '#0A2534' : isGolden ? '#1B5060' : '#2C7A8C';
  const glassColor = isNight ? '#061019' : isGolden ? '#8AA3A6' : '#A2B9BC';

  const exteriorOpacity = xRayMode ? 0.18 : 1.0;
  const exteriorTransparent = xRayMode;
  const exteriorWireframe = xRayMode;

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* ========================================================
          1. FOUNDATION & SITE PODIUM (Large Format Travertine / Concrete)
         ======================================================== */}
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <boxGeometry args={[16, 0.5, 14]} />
        <meshStandardMaterial 
          color={concreteTint}
          map={concreteTex}
          roughness={0.75} 
          metalness={0.05}
          transparent={exteriorTransparent}
          opacity={exteriorOpacity}
          wireframe={exteriorWireframe}
        />
      </mesh>

      {/* Travertine Interior & Terrace Floor Plinth */}
      <mesh position={[0.5, 0.02, 0]} receiveShadow>
        <boxGeometry args={[12.5, 0.06, 11]} />
        <meshStandardMaterial 
          color="#F0EBE1" 
          map={travertineTex} 
          roughness={0.5} 
          metalness={0.05} 
        />
      </mesh>

      {/* ========================================================
          2. REAL BASALT INFINITY POOL & SUN DECK
         ======================================================== */}
      <group position={[0, 0, 4.2]}>
        {/* Flamed Basalt Perimeter Coping Border */}
        <mesh position={[0, -0.08, 0]}>
          <boxGeometry args={[10.4, 0.32, 4.6]} />
          <meshStandardMaterial color="#141618" roughness={0.92} />
        </mesh>
        {/* Animated Water Surface */}
        <mesh ref={poolWaterRef} position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[9.8, 4.0]} />
          <meshStandardMaterial 
            color={poolColor} 
            roughness={0.04} 
            metalness={0.9} 
            transparent 
            opacity={0.88} 
          />
        </mesh>
        {/* Submerged Entry Steps (3 steps) */}
        {[-1.6, -1.2, -0.8].map((zPos, idx) => (
          <mesh key={idx} position={[-4.0, 0.02 - idx * 0.08, zPos]}>
            <boxGeometry args={[1.4, 0.08, 0.35]} />
            <meshStandardMaterial color="#1E2328" roughness={0.8} />
          </mesh>
        ))}
        {/* Underwater Pool Accent Lights */}
        <pointLight position={[-2.5, -0.05, 0]} color="#48CAE4" intensity={isNight ? 1.8 : 0.4} distance={6} />
        <pointLight position={[2.5, -0.05, 0]} color="#48CAE4" intensity={isNight ? 1.8 : 0.4} distance={6} />
      </group>

      {/* Luxury Sun Loungers by the Pool Deck */}
      <group position={[-3.6, 0.05, 1.8]}>
        {/* Lounger 1 */}
        <group position={[-0.8, 0, 0]}>
          {/* Slat wood frame */}
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.75, 0.1, 2.0]} />
            <meshStandardMaterial color="#3D2617" roughness={0.8} />
          </mesh>
          {/* White fabric cushion */}
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[0.7, 0.08, 1.95]} />
            <meshStandardMaterial color="#F4F1EA" roughness={0.9} />
          </mesh>
          {/* Angled headrest pillow */}
          <mesh position={[0, 0.25, -0.75]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.65, 0.08, 0.35]} />
            <meshStandardMaterial color="#DED8CE" roughness={0.85} />
          </mesh>
        </group>
        {/* Lounger 2 */}
        <group position={[0.4, 0, 0]}>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.75, 0.1, 2.0]} />
            <meshStandardMaterial color="#3D2617" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[0.7, 0.08, 1.95]} />
            <meshStandardMaterial color="#F4F1EA" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.25, -0.75]} rotation={[0.3, 0, 0]}>
            <boxGeometry args={[0.65, 0.08, 0.35]} />
            <meshStandardMaterial color="#DED8CE" roughness={0.85} />
          </mesh>
        </group>
        {/* Low bronze cocktail plinth between loungers */}
        <mesh position={[-0.2, 0.14, -0.4]}>
          <cylinderGeometry args={[0.22, 0.22, 0.28, 24]} />
          <meshStandardMaterial color="#7A6348" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* ========================================================
          3. REAL BUILDING STRUCTURE & WALLS
         ======================================================== */}
      <group visible={activeLevel === 'all' || activeLevel === 'ground'}>
        {/* Main Board-formed Concrete Anchor Wall (Rear) */}
        <mesh position={[-4.5, 1.4, -3.2]} castShadow receiveShadow>
          <boxGeometry args={[4.5, 2.7, 0.35]} />
          <meshStandardMaterial 
            color={concreteTint} 
            map={concreteTex} 
            roughness={0.75} 
            transparent={exteriorTransparent}
            opacity={exteriorOpacity}
            wireframe={exteriorWireframe}
          />
        </mesh>

        {/* Board-formed Travertine Spine Wall dividing living & circulation */}
        <mesh position={[-0.8, 1.4, 0.4]} castShadow receiveShadow>
          <boxGeometry args={[0.32, 2.7, 7.8]} />
          <meshStandardMaterial 
            color="#EAE3D6" 
            map={travertineTex} 
            roughness={0.55} 
            metalness={0.05} 
          />
        </mesh>

        {/* Structural Dark Bronze Perimeter Window Frames & Mullions */}
        <group position={[2.2, 1.4, 3.2]}>
          {/* Top & Bottom Window Frame Tracks */}
          <mesh position={[0, 1.3, 0]}>
            <boxGeometry args={[5.6, 0.08, 0.12]} />
            <meshStandardMaterial color="#1E2022" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, -1.3, 0]}>
            <boxGeometry args={[5.6, 0.08, 0.12]} />
            <meshStandardMaterial color="#1E2022" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Vertical Bronze Mullions */}
          {[-2.7, -0.9, 0.9, 2.7].map((xPos, idx) => (
            <mesh key={idx} position={[xPos, 0, 0]}>
              <boxGeometry args={[0.07, 2.6, 0.12]} />
              <meshStandardMaterial color="#1E2022" metalness={0.85} roughness={0.25} />
            </mesh>
          ))}
          {/* Floor-to-Ceiling High Performance Acoustic Glazing */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[5.5, 2.55, 0.04]} />
            <meshPhysicalMaterial 
              color={glassColor} 
              transmission={0.93} 
              roughness={0.04} 
              ior={1.52}
              transparent 
              opacity={xRayMode ? 0.08 : 0.35} 
            />
          </mesh>
        </group>

        {/* ========================================================
            4. REAL LUXURY MODULAR COUCH & LIVING SALON
           ======================================================== */}
        <group position={[1.8, 0.05, 1.6]}>
          {/* Dark smoked oak recessed sofa platform plinth */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[3.4, 0.1, 2.2]} />
            <meshStandardMaterial color="#1C130D" roughness={0.8} />
          </mesh>

          {/* Luxury Modular Couch - Main Seating Cushions */}
          {/* Left Chaise Cushion */}
          <mesh position={[-1.0, 0.22, 0.4]}>
            <boxGeometry args={[1.05, 0.26, 1.5]} />
            <meshStandardMaterial color="#2B2D30" map={fabricTex} roughness={0.85} />
          </mesh>
          {/* Middle Cushion */}
          <mesh position={[0.1, 0.22, 0.1]}>
            <boxGeometry args={[1.05, 0.26, 0.9]} />
            <meshStandardMaterial color="#2B2D30" map={fabricTex} roughness={0.85} />
          </mesh>
          {/* Right Cushion */}
          <mesh position={[1.2, 0.22, 0.1]}>
            <boxGeometry args={[1.05, 0.26, 0.9]} />
            <meshStandardMaterial color="#2B2D30" map={fabricTex} roughness={0.85} />
          </mesh>

          {/* Comfortable Backrest Cushions */}
          <mesh position={[0.1, 0.52, -0.42]} rotation={[-0.08, 0, 0]}>
            <boxGeometry args={[1.0, 0.38, 0.22]} />
            <meshStandardMaterial color="#242629" map={fabricTex} roughness={0.85} />
          </mesh>
          <mesh position={[1.2, 0.52, -0.42]} rotation={[-0.08, 0, 0]}>
            <boxGeometry args={[1.0, 0.38, 0.22]} />
            <meshStandardMaterial color="#242629" map={fabricTex} roughness={0.85} />
          </mesh>
          <mesh position={[-1.0, 0.52, -0.42]} rotation={[-0.08, 0, 0]}>
            <boxGeometry args={[1.0, 0.38, 0.22]} />
            <meshStandardMaterial color="#242629" map={fabricTex} roughness={0.85} />
          </mesh>

          {/* Armrests */}
          <mesh position={[1.8, 0.38, 0.1]}>
            <boxGeometry args={[0.22, 0.35, 1.0]} />
            <meshStandardMaterial color="#242629" map={fabricTex} roughness={0.85} />
          </mesh>
          <mesh position={[-1.6, 0.38, 0.4]}>
            <boxGeometry args={[0.22, 0.35, 1.6]} />
            <meshStandardMaterial color="#242629" map={fabricTex} roughness={0.85} />
          </mesh>

          {/* Designer Throw Pillows in Cream Bouclé and Bronze Velvet */}
          <mesh position={[-0.8, 0.42, -0.22]} rotation={[0.15, 0.2, 0]}>
            <boxGeometry args={[0.36, 0.36, 0.1]} />
            <meshStandardMaterial color="#E8E2D6" roughness={0.9} />
          </mesh>
          <mesh position={[0.6, 0.42, -0.22]} rotation={[0.15, -0.15, 0]}>
            <boxGeometry args={[0.34, 0.34, 0.1]} />
            <meshStandardMaterial color="#8C6E4A" roughness={0.7} />
          </mesh>
          <mesh position={[1.5, 0.42, 0]} rotation={[0, 0.3, 0]}>
            <boxGeometry args={[0.32, 0.32, 0.1]} />
            <meshStandardMaterial color="#C5A880" roughness={0.65} />
          </mesh>

          {/* Real Travertine Low Coffee Table with Bronze Feet */}
          <group position={[0.3, 0, 1.3]}>
            {/* 4 Bronze cylinder legs */}
            {[[-0.7, -0.3], [0.7, -0.3], [-0.7, 0.3], [0.7, 0.3]].map(([lx, lz], i) => (
              <mesh key={i} position={[lx, 0.08, lz]}>
                <cylinderGeometry args={[0.025, 0.025, 0.16, 16]} />
                <meshStandardMaterial color="#6B5338" metalness={0.85} roughness={0.25} />
              </mesh>
            ))}
            {/* Thick Honed Roman Travertine Slab Tabletop */}
            <mesh position={[0, 0.18, 0]}>
              <boxGeometry args={[1.7, 0.06, 0.85]} />
              <meshStandardMaterial color="#EAE2D5" map={travertineTex} roughness={0.5} />
            </mesh>

            {/* Objects on Coffee Table: Architectural Book & Ceramic Bowl */}
            <mesh position={[-0.35, 0.22, 0.05]} rotation={[0, 0.15, 0]}>
              <boxGeometry args={[0.32, 0.03, 0.24]} />
              <meshStandardMaterial color="#1B1C1D" roughness={0.8} />
            </mesh>
            <mesh position={[-0.35, 0.24, 0.05]} rotation={[0, 0.15, 0]}>
              <boxGeometry args={[0.28, 0.02, 0.22]} />
              <meshStandardMaterial color="#C5A880" roughness={0.6} />
            </mesh>
            {/* Sculptural Ceramic Centerpiece Bowl */}
            <mesh position={[0.25, 0.24, -0.05]}>
              <cylinderGeometry args={[0.12, 0.06, 0.06, 24]} />
              <meshStandardMaterial color="#353638" roughness={0.7} />
            </mesh>
            {/* Glass Hurricane Candle Holder with gentle glow */}
            <mesh position={[0.48, 0.25, 0.1]}>
              <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
              <meshPhysicalMaterial color="#FFFFFF" transmission={0.9} roughness={0.1} transparent opacity={0.6} />
            </mesh>
            <pointLight position={[0.48, 0.28, 0.1]} color="#FFA64D" intensity={0.4} distance={1.2} />
          </group>

          {/* Suspended Modern Steel Fireplace */}
          <group position={[1.4, 0, 0]}>
            {/* Vertical Flue pipe going to ceiling */}
            <mesh position={[0, 1.5, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 1.8, 24]} />
              <meshStandardMaterial color="#161718" metalness={0.9} roughness={0.25} />
            </mesh>
            {/* Suspended Fireplace Conical Bowl */}
            <mesh position={[0, 0.55, 0]}>
              <sphereGeometry args={[0.28, 24, 24]} />
              <meshStandardMaterial color="#161718" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Realistic Fireplace Glowing Embers */}
            <mesh position={[0, 0.52, 0.08]}>
              <boxGeometry args={[0.24, 0.06, 0.14]} />
              <meshBasicMaterial color="#FF7B25" />
            </mesh>
            {/* Dynamic Flickering Firelight */}
            <pointLight 
              ref={flameRef} 
              position={[0, 0.58, 0.12]} 
              color="#FF7F24" 
              intensity={isNight ? 2.4 : 1.2} 
              distance={4.2} 
            />
          </group>

          {/* Warm Recessed Ceiling Spotlights in living area */}
          <pointLight position={[0, 2.3, 0.5]} color="#FFDF9F" intensity={interiorLightIntensity} distance={5.5} />
        </group>

        {/* ========================================================
            5. REAL LUXURY KITCHEN (Waterfall Island, Stools, Cooktop, Ovens)
           ======================================================== */}
        <group position={[3.6, 0.05, -0.6]}>
          {/* Waterfall Calacatta Marble Island Top */}
          <mesh position={[0, 0.46, 0]}>
            <boxGeometry args={[1.2, 0.08, 3.4]} />
            <meshStandardMaterial color="#F7F5F0" map={marbleTex} roughness={0.3} metalness={0.05} />
          </mesh>
          {/* Left Waterfall Side Slab to Floor */}
          <mesh position={[0, 0.22, 1.66]}>
            <boxGeometry args={[1.2, 0.44, 0.08]} />
            <meshStandardMaterial color="#F7F5F0" map={marbleTex} roughness={0.3} metalness={0.05} />
          </mesh>
          {/* Right Waterfall Side Slab to Floor */}
          <mesh position={[0, 0.22, -1.66]}>
            <boxGeometry args={[1.2, 0.44, 0.08]} />
            <meshStandardMaterial color="#F7F5F0" map={marbleTex} roughness={0.3} metalness={0.05} />
          </mesh>
          {/* Dark Charcoal Island Body */}
          <mesh position={[0.15, 0.22, 0]}>
            <boxGeometry args={[0.9, 0.44, 3.2]} />
            <meshStandardMaterial color="#1F2124" roughness={0.8} />
          </mesh>

          {/* Induction Cooktop (Recessed black glass with glowing rings) */}
          <mesh position={[-0.1, 0.505, -0.4]}>
            <boxGeometry args={[0.55, 0.01, 0.8]} />
            <meshStandardMaterial color="#0A0B0C" roughness={0.1} metalness={0.9} />
          </mesh>
          {/* Glowing induction heating elements */}
          <mesh position={[-0.1, 0.512, -0.4]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.1, 0.12, 24]} />
            <meshBasicMaterial color={isNight ? "#FF4500" : "#D4AF37"} />
          </mesh>

          {/* Brushed Bronze Gooseneck Designer Faucet */}
          <group position={[-0.1, 0.5, 0.6]}>
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.3, 16]} />
              <meshStandardMaterial color="#8C6E4A" metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[0.06, 0.28, 0]} rotation={[0, 0, -Math.PI / 3]}>
              <cylinderGeometry args={[0.012, 0.012, 0.15, 16]} />
              <meshStandardMaterial color="#8C6E4A" metalness={0.85} roughness={0.25} />
            </mesh>
          </group>

          {/* 3 Luxury Minimalist Barstools along the overhang */}
          {[-0.9, 0, 0.9].map((zStool, idx) => (
            <group key={idx} position={[-0.6, 0, zStool]}>
              {/* Slender black metal stool legs */}
              {[[-0.14, -0.14], [0.14, -0.14], [-0.14, 0.14], [0.14, 0.14]].map(([bx, bz], bi) => (
                <mesh key={bi} position={[bx, 0.16, bz]}>
                  <cylinderGeometry args={[0.012, 0.012, 0.32, 12]} />
                  <meshStandardMaterial color="#161718" metalness={0.9} roughness={0.3} />
                </mesh>
              ))}
              {/* Horizontal footrest ring */}
              <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.14, 0.16, 20]} />
                <meshStandardMaterial color="#161718" metalness={0.9} />
              </mesh>
              {/* Curved Saddle Leather Seat */}
              <mesh position={[0, 0.34, 0]}>
                <boxGeometry args={[0.34, 0.04, 0.34]} />
                <meshStandardMaterial color="#4A2E1B" roughness={0.7} />
              </mesh>
            </group>
          ))}

          {/* Back Tall Smoked Oak Cabinetry Wall */}
          <group position={[1.4, 0, 0]}>
            <mesh position={[0, 1.35, 0]}>
              <boxGeometry args={[0.45, 2.7, 3.6]} />
              <meshStandardMaterial color="#2B1A0E" map={timberTex} roughness={0.7} />
            </mesh>
            {/* Integrated Double Wall Ovens (Glass fronts with warm internal light) */}
            <mesh position={[-0.23, 1.2, 0]}>
              <boxGeometry args={[0.02, 0.9, 0.65]} />
              <meshStandardMaterial color="#0E0F10" roughness={0.1} metalness={0.9} />
            </mesh>
            {/* Oven display light */}
            <pointLight position={[-0.26, 1.2, 0]} color="#FFDF9F" intensity={0.5} distance={1.5} />
            {/* Open Floating Display Shelf with Crystal Decanters */}
            <mesh position={[-0.24, 1.9, 0]}>
              <boxGeometry args={[0.15, 0.03, 2.4]} />
              <meshStandardMaterial color="#8C6E4A" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Glass decanters */}
            {[-0.6, -0.3, 0.3, 0.6].map((gx, gi) => (
              <mesh key={gi} position={[-0.24, 1.98, gx]}>
                <cylinderGeometry args={[0.03, 0.05, 0.14, 16]} />
                <meshPhysicalMaterial color="#FFFFFF" transmission={0.95} roughness={0.05} transparent opacity={0.6} />
              </mesh>
            ))}
          </group>

          {/* Warm Kitchen Downlight Cone */}
          <pointLight position={[0, 2.3, 0]} color="#FFF1D6" intensity={interiorLightIntensity * 0.9} distance={5} />
        </group>

        {/* ========================================================
            6. REAL SUNKEN LAGOON TERRACE & FIRE PIT
           ======================================================== */}
        <group position={[3.6, 0.06, 3.0]}>
          {/* Sunken Floor Basin with Travertine Wall Trim */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[2.8, 0.12, 2.8]} />
            <meshStandardMaterial color="#1E2022" roughness={0.9} />
          </mesh>
          {/* Circular Sunken Bench with Upholstered Cashmere Cushions */}
          <mesh position={[0, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.55, 1.15, 32]} />
            <meshStandardMaterial color="#303236" map={fabricTex} roughness={0.85} />
          </mesh>
          {/* Central Black Volcanic Fire Bowl */}
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.32, 0.22, 0.12, 24]} />
            <meshStandardMaterial color="#141416" roughness={0.9} />
          </mesh>
          {/* Glowing Red/Amber Volcanic Lava Rocks */}
          <mesh position={[0, 0.22, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial color="#FF5500" />
          </mesh>
          <pointLight position={[0, 0.35, 0]} color="#FF7B25" intensity={isNight ? 2.2 : 0.8} distance={4.5} />
        </group>

        {/* ========================================================
            7. ARCHITECTURAL PLANTERS WITH REAL TROPICAL FOLIAGE
           ======================================================== */}
        <group position={[-5.4, 0.05, 2.0]}>
          {/* Long Raw Concrete Planter Box */}
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[0.9, 0.7, 3.8]} />
            <meshStandardMaterial color={concreteTint} map={concreteTex} roughness={0.85} />
          </mesh>
          {/* Dark Soil */}
          <mesh position={[0, 0.68, 0]}>
            <boxGeometry args={[0.8, 0.05, 3.7]} />
            <meshStandardMaterial color="#1C1814" roughness={0.95} />
          </mesh>
          {/* Lush Green Architectural Monsteras / Birds of Paradise Leaves */}
          {[-1.3, -0.6, 0.1, 0.8, 1.4].map((pz, pi) => (
            <group key={pi} position={[0, 0.7, pz]} rotation={[0, pi * 1.1, 0]}>
              {/* Slender green stem */}
              <mesh position={[0, 0.45, 0]}>
                <cylinderGeometry args={[0.02, 0.03, 0.9, 8]} />
                <meshStandardMaterial color="#1F3D24" roughness={0.8} />
              </mesh>
              {/* Wide architectural leaf fan */}
              <mesh position={[0.12, 0.85, 0]} rotation={[0.4, 0, -0.3]}>
                <boxGeometry args={[0.42, 0.65, 0.01]} />
                <meshStandardMaterial color={isNight ? "#0E2415" : "#2A5934"} roughness={0.65} />
              </mesh>
              <mesh position={[-0.12, 0.75, 0.1]} rotation={[-0.3, 0.4, 0.2]}>
                <boxGeometry args={[0.38, 0.55, 0.01]} />
                <meshStandardMaterial color={isNight ? "#0E2415" : "#244E2E"} roughness={0.65} />
              </mesh>
            </group>
          ))}
        </group>
      </group>

      {/* ========================================================
          8. UPPER LEVEL CANTILEVER (Primary Suite & Real Bedroom)
         ======================================================== */}
      <group visible={activeLevel === 'all' || activeLevel === 'level1'}>
        {/* Floating Post-Tensioned Cantilever Floor Slab */}
        <mesh position={[-0.8, 2.75, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[10.5, 0.35, 8.2]} />
          <meshStandardMaterial 
            color={concreteTint} 
            map={concreteTex} 
            roughness={0.65}
            transparent={exteriorTransparent}
            opacity={exteriorOpacity}
            wireframe={exteriorWireframe}
          />
        </mesh>

        {/* Real Master Bedroom Suite Furniture */}
        <group position={[-2.4, 2.9, 1.0]}>
          {/* Smoked Oak Floating King Bed Base */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[2.2, 0.2, 2.4]} />
            <meshStandardMaterial color="#26170E" roughness={0.8} />
          </mesh>
          {/* Upholstered Luxury Mattress */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[2.0, 0.18, 2.2]} />
            <meshStandardMaterial color="#EAE5DC" roughness={0.85} />
          </mesh>
          {/* Folded Designer Bedcover / Duvet */}
          <mesh position={[0, 0.34, 0.35]}>
            <boxGeometry args={[2.02, 0.12, 1.5]} />
            <meshStandardMaterial color="#4A4E54" roughness={0.85} />
          </mesh>
          {/* 4 Plush Sleeping Pillows */}
          {[-0.5, 0.5].map((px, pi) => (
            <group key={pi} position={[px, 0.42, -0.75]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.55, 0.12, 0.35]} />
                <meshStandardMaterial color="#FAF8F5" roughness={0.9} />
              </mesh>
              <mesh position={[0, 0.08, -0.05]} rotation={[-0.2, 0, 0]}>
                <boxGeometry args={[0.5, 0.1, 0.3]} />
                <meshStandardMaterial color="#D7CFBE" roughness={0.8} />
              </mesh>
            </group>
          ))}

          {/* Fluted Walnut Acoustic Wall Behind Bed */}
          <mesh position={[0, 0.8, -1.15]}>
            <boxGeometry args={[3.2, 1.2, 0.08]} />
            <meshStandardMaterial color="#5C381E" map={timberTex} roughness={0.6} />
          </mesh>

          {/* Bedside Floating Tables & Minimal Globe Lamps */}
          {[-1.3, 1.3].map((nx, ni) => (
            <group key={ni} position={[nx, 0.22, -0.6]}>
              <mesh>
                <boxGeometry args={[0.45, 0.12, 0.45]} />
                <meshStandardMaterial color="#26170E" roughness={0.7} />
              </mesh>
              {/* Minimal Brass Lamp Stem & Glass Globe */}
              <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.2, 12]} />
                <meshStandardMaterial color="#C5A880" metalness={0.85} />
              </mesh>
              <mesh position={[0, 0.28, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color="#FFF1D0" />
              </mesh>
              <pointLight position={[0, 0.28, 0]} color="#FFE2A0" intensity={0.6} distance={1.8} />
            </group>
          ))}
        </group>

        {/* Master Bedroom Corner Mitered Acoustic Glazing */}
        <mesh position={[-1.2, 3.85, 2.8]}>
          <boxGeometry args={[2.8, 1.85, 0.06]} />
          <meshPhysicalMaterial 
            color={glassColor} 
            transmission={0.94} 
            roughness={0.04} 
            transparent 
            opacity={xRayMode ? 0.08 : 0.35} 
          />
        </mesh>
        <mesh position={[-3.8, 3.85, 1.4]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[2.8, 1.85, 0.06]} />
          <meshPhysicalMaterial 
            color={glassColor} 
            transmission={0.94} 
            roughness={0.04} 
            transparent 
            opacity={xRayMode ? 0.08 : 0.35} 
          />
        </mesh>

        {/* Balcony Glass Railing with Steel Spigot Clamps */}
        <group position={[1.8, 3.3, 3.0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[4.2, 0.85, 0.05]} />
            <meshPhysicalMaterial color="#94A3B8" transmission={0.95} roughness={0.08} transparent opacity={0.3} />
          </mesh>
          {/* Top cap rail */}
          <mesh position={[0, 0.44, 0]}>
            <boxGeometry args={[4.2, 0.03, 0.08]} />
            <meshStandardMaterial color="#1E2022" metalness={0.85} />
          </mesh>
        </group>
      </group>

      {/* ========================================================
          9. FLOATING ROOF SLAB WITH RECESSED CEILING SPOTLIGHTS
         ======================================================== */}
      <group position={[0, 0, 0]} visible={activeLevel === 'all' || activeLevel === 'level2'}>
        <mesh position={[-0.8, 5.05, 0]} castShadow>
          <boxGeometry args={[11.5, 0.24, 9.5]} />
          <meshStandardMaterial 
            color={concreteTint} 
            map={concreteTex} 
            roughness={0.6}
            transparent={exteriorTransparent}
            opacity={exteriorOpacity}
            wireframe={exteriorWireframe}
          />
        </mesh>
        {/* Warm Timber Underside Soffit */}
        <mesh position={[-0.8, 4.92, 0]}>
          <boxGeometry args={[11.4, 0.03, 9.4]} />
          <meshStandardMaterial color="#663E20" map={timberTex} roughness={0.65} />
        </mesh>

        {/* Recessed Canister Spotlights in Soffit Overhang */}
        {[[-3.0, 3.5], [-1.0, 3.5], [1.0, 3.5], [3.0, 3.5]].map(([sx, sz], si) => (
          <group key={si} position={[sx, 4.9, sz]}>
            <mesh rotation={[Math.PI, 0, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
              <meshStandardMaterial color="#161718" metalness={0.9} />
            </mesh>
            <pointLight position={[0, -0.2, 0]} color="#FFE8BA" intensity={isNight ? 1.0 : 0.2} distance={3.5} />
          </group>
        ))}
      </group>

      {/* ========================================================
          10. INTERACTIVE 3D HOTSPOTS
         ======================================================== */}
      {[
        { id: 'salon', name: 'Living Pavilion & Hearth', pos: [1.8, 1.4, 1.6], desc: 'Modular sofa suite and suspended bio-ethanol steel fireplace' },
        { id: 'kitchen', name: 'Culinary Studio & Island', pos: [3.6, 1.3, -0.4], desc: 'Waterfall Calacatta marble island with integrated induction' },
        { id: 'pool', name: 'Basalt Infinity Weir', pos: [0, 0.4, 4.2], desc: '25m temperature-controlled basalt pool with hydraulic overflow' },
        { id: 'suite', name: 'Primary Sky Suite', pos: [-2.4, 3.8, 2.0], desc: 'Floating platform bed and fluted acoustic walnut wall' },
        { id: 'terrace', name: 'Sunken Fire Pit', pos: [3.6, 0.6, 2.8], desc: 'Volcanic basalt conversation pit with automated fire rocks' }
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
              <ringGeometry args={[0.18, 0.26, 32]} />
              <meshBasicMaterial 
                color={isSelected ? "#FFD166" : "#C5A880"} 
                transparent 
                opacity={0.85} 
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
