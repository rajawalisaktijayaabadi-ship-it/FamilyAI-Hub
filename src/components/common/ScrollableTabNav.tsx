import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDraggableScroll } from '../../hooks/useDraggableScroll';

interface ScrollableTabNavProps {
  children: React.ReactNode;
  className?: string;
  showArrows?: boolean;
}

export const ScrollableTabNav: React.FC<ScrollableTabNavProps> = ({
  children,
  className = '',
  showArrows = true
}) => {
  const { ref, events, canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useDraggableScroll<HTMLDivElement>();

  return (
    <div className="relative group/scroll-container w-full">
      {/* Left Scroll Arrow Button */}
      {showArrows && canScrollLeft && (
        <button
          onClick={scrollLeft}
          type="button"
          aria-label="Scroll left"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-lg flex items-center justify-center transition-all opacity-80 hover:opacity-100"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Main Draggable Scroll Container */}
      <div
        ref={ref}
        {...events}
        className={`flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none cursor-grab active:cursor-grabbing select-none scroll-smooth touch-pan-x ${className}`}
      >
        {children}
      </div>

      {/* Right Scroll Arrow Button */}
      {showArrows && canScrollRight && (
        <button
          onClick={scrollRight}
          type="button"
          aria-label="Scroll right"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-lg flex items-center justify-center transition-all opacity-80 hover:opacity-100"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
