import React, { useRef, useState, useEffect, useCallback } from 'react';

export function useDraggableScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    updateScrollButtons();
    const handleResize = () => updateScrollButtons();
    const handleScroll = () => updateScrollButtons();

    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollButtons]);

  const onMouseDown = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    isMouseDown.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
    el.style.userSelect = 'none';
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    isMouseDown.current = false;
    el.style.cursor = 'grab';
    el.style.removeProperty('user-select');
  };

  const onMouseUp = () => {
    const el = ref.current;
    if (!el) return;
    isMouseDown.current = false;
    el.style.cursor = 'grab';
    el.style.removeProperty('user-select');
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current) return;
    const el = ref.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5; // scroll speed multiplier
    el.scrollLeft = scrollLeft.current - walk;
  };

  // Convert vertical mouse wheel to horizontal scroll when hovering over the menu
  const onWheel = (e: React.WheelEvent) => {
    const el = ref.current;
    if (!el) return;
    if (e.deltaY !== 0 && el.scrollWidth > el.clientWidth) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  };

  const scrollByAmount = (amount: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return {
    ref,
    events: {
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
      onWheel
    },
    canScrollLeft,
    canScrollRight,
    scrollLeft: () => scrollByAmount(-200),
    scrollRight: () => scrollByAmount(200)
  };
}
