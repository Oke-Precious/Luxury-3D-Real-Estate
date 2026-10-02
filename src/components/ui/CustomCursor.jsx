import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'VIEW' | 'EXPLORE' | 'DRAG' | 'PLAY' | 'link'
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const dotRef = useRef();

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hover targets
      const target = e.target;
      const clickable = target.closest('button, a, input, select, textarea');
      const propertyTarget = target.closest('[data-cursor="view"]');
      const threeTarget = target.closest('[data-cursor="explore"], canvas');
      const dragTarget = target.closest('[data-cursor="drag"]');
      const videoTarget = target.closest('[data-cursor="play"]');

      if (propertyTarget) {
        setCursorType('VIEW');
      } else if (threeTarget) {
        setCursorType('EXPLORE');
      } else if (dragTarget) {
        setCursorType('DRAG');
      } else if (videoTarget) {
        setCursorType('PLAY');
      } else if (clickable) {
        setCursorType('link');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const isTextCursor = ['VIEW', 'EXPLORE', 'DRAG', 'PLAY'].includes(cursorType);

  return (
    <div
      ref={dotRef}
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {isTextCursor ? (
        <div className="w-16 h-16 rounded-full bg-[#F4F1EA] text-[#0E0F0F] text-[9px] font-mono font-bold tracking-widest flex items-center justify-center uppercase shadow-2xl transition-all duration-200 scale-100">
          {cursorType}
        </div>
      ) : cursorType === 'link' ? (
        <div className="w-8 h-8 rounded-full border border-[#C5A880] bg-[#C5A880]/20 transition-all duration-200 scale-110" />
      ) : (
        <div className="w-2.5 h-2.5 rounded-full bg-[#C5A880] transition-all duration-150" />
      )}
    </div>
  );
}
