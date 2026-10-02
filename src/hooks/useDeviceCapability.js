import { useState, useEffect } from 'react';

export function useDeviceCapability() {
  const [capability, setCapability] = useState({
    tier: 'HIGH', // 'HIGH' | 'MEDIUM' | 'LITE'
    isMobile: false,
    prefersReducedMotion: false,
    dpr: 1.5,
  });

  useEffect(() => {
    const checkCapability = () => {
      const isMobile = window.innerWidth < 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Hardware concurrency check as a safe signal
      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;
      
      let tier = 'HIGH';
      if (isMobile || cores <= 4 || memory < 4) {
        tier = 'MEDIUM';
      }
      if (prefersReducedMotion || (isMobile && cores <= 2)) {
        tier = 'LITE';
      }

      const dpr = Math.min(window.devicePixelRatio || 1, tier === 'HIGH' ? 2 : 1.25);

      setCapability({
        tier,
        isMobile,
        prefersReducedMotion,
        dpr
      });
    };

    checkCapability();
    window.addEventListener('resize', checkCapability);
    return () => window.removeEventListener('resize', checkCapability);
  }, []);

  return capability;
}
