import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function SpatialCameraRig({
  currentRoom,
  mode = 'guided', // 'guided' | 'free'
  autoTour = false,
  reducedMotion = false,
  onTransitionEnd = () => {}
}) {
  const cameraRef = useRef();
  const controlsRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const isTransitioningRef = useRef(false);

  const { camera } = useThree();

  // Pointer parallax tracking for guided mode
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // When room changes, initiate transition
  useEffect(() => {
    isTransitioningRef.current = true;
    if (controlsRef.current && mode === 'free') {
      controlsRef.current.target.set(...currentRoom.cameraTarget);
    }
  }, [currentRoom.id, mode]);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    const targetPos = new THREE.Vector3(...currentRoom.cameraPosition);
    const targetLookAt = new THREE.Vector3(...currentRoom.cameraTarget);

    if (reducedMotion) {
      // Instant / rapid teleport for reduced motion preference
      cameraRef.current.position.copy(targetPos);
      state.camera.lookAt(targetLookAt);
      isTransitioningRef.current = false;
      return;
    }

    if (mode === 'free') {
      // Free Explore Mode: OrbitControls handles orientation, but we smoothly position at current room
      if (isTransitioningRef.current) {
        cameraRef.current.position.lerp(targetPos, delta * 3.5);
        if (controlsRef.current) {
          controlsRef.current.target.lerp(targetLookAt, delta * 3.5);
        }
        if (cameraRef.current.position.distanceTo(targetPos) < 0.08) {
          isTransitioningRef.current = false;
          onTransitionEnd();
        }
      }
      return;
    }

    // Guided Mode: Smooth architectural camera dolly with subtle pointer depth
    const parallaxTarget = targetLookAt.clone().add(
      new THREE.Vector3(
        mouseRef.current.x * 0.25,
        -mouseRef.current.y * 0.15,
        0
      )
    );

    // Smooth weighted acceleration / deceleration
    const lerpSpeed = isTransitioningRef.current ? 2.4 : 3.0;
    cameraRef.current.position.lerp(targetPos, delta * lerpSpeed);
    
    // Smooth camera orientation
    const currentLook = state.camera.getWorldDirection(new THREE.Vector3()).add(state.camera.position);
    currentLook.lerp(parallaxTarget, delta * 2.8);
    state.camera.lookAt(currentLook);

    if (cameraRef.current.position.distanceTo(targetPos) < 0.06) {
      if (isTransitioningRef.current) {
        isTransitioningRef.current = false;
        onTransitionEnd();
      }
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={currentRoom.cameraPosition}
        fov={currentRoom.fov || 48}
        near={0.1}
        far={120}
      />

      {mode === 'free' && (
        <OrbitControls
          ref={controlsRef}
          target={currentRoom.cameraTarget}
          enablePan={false}
          enableZoom={true}
          minDistance={0.5}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.95}
          dampingFactor={0.06}
          rotateSpeed={0.5}
        />
      )}
    </>
  );
}
