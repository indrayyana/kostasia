'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { isBrowser } from '@/utils/browser';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      title="Scroll to top"
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-50 p-3 bg-gradient-to-l from-blue-400 via-blue-600 to-blue-800 text-white rounded-full shadow-lg transition-opacity ${
        isVisible ? 'opacity-1' : 'opacity-0'
      }`}
    >
      <ArrowUp size={24} />
    </button>
  );
};

export default ScrollToTop;

