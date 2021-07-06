import { useCallback, useEffect, useRef } from 'react';

type OptionsType = {
  root?: HTMLElement;
  rootMargin?: string;
  threshold?: number;
};

export default function useInfinityScroll(
  callback: Function,
  options: OptionsType = {
    threshold: 0.3,
  }
) {
  const targetRef = useRef<HTMLElement>(null);

  const intersectionCallback = useCallback(
    ([entry], observer) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      callback();
      observer.observe(targetRef.current);
    },
    [callback]
  );

  useEffect(() => {
    const io = new IntersectionObserver(intersectionCallback, options);
    if (targetRef.current) io.observe(targetRef.current);

    return () => io && io.disconnect();
  }, [intersectionCallback, options]);

  return targetRef;
}
