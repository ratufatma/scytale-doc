import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';

interface BackToTopProps {
  threshold?: number;
}

export const BackToTop: React.FC<BackToTopProps> = ({ threshold = 350 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check once on mount in case already scrolled
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const label = language === 'id' ? 'Kembali ke atas' : 'Back to top';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label={label}
          title={label}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-zinc-900/90 dark:bg-zinc-100/90 hover:bg-zinc-950 dark:hover:bg-white text-white dark:text-zinc-950 shadow-lg hover:shadow-xl border border-zinc-700/60 dark:border-zinc-300/60 backdrop-blur-xs transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <ArrowUp className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span className="text-xs font-mono font-medium hidden sm:inline whitespace-nowrap">
            {label}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
