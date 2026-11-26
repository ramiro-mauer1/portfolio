import { useEffect } from 'react';

/**
 * Fondo fijo detrás de todo el sitio: grano y la grilla de puntos iluminada alrededor del cursor (solo con mouse y sin
 * "reducir movimiento"; el CSS la oculta en pantallas táctiles).
 */
export default function Backdrop() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--mx', `${x}px`);
        root.style.setProperty('--my', `${y}px`);
        frame = 0;
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 backdrop-glow" />
      <div className="absolute inset-0 backdrop-dots-lit" />
      <div className="absolute inset-0 backdrop-grain" />
    </div>
  );
}
