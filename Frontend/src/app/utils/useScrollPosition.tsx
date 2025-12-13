'use client';
import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll, { passive: true }); // ✅ Added passive for performance
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isAtTop };
}
