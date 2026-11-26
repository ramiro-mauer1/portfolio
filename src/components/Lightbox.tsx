import { useEffect, useRef, useState } from 'react';
import type { Shot } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

const EVENT = 'rm-lightbox';
export const openShot = (shot: Shot) => window.dispatchEvent(new CustomEvent(EVENT, { detail: shot }));

/** Captura ampliada en un <dialog> nativo: Esc, clic afuera y foco los resuelve el navegador. */
export default function Lightbox() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDialogElement>(null);
  const [shot, setShot] = useState<Shot | null>(null);

  useEffect(() => {
    const on = (e: Event) => setShot((e as CustomEvent<Shot>).detail);
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (shot && !d.open) d.showModal();
  }, [shot]);

  return (
    <dialog
      ref={ref}
      className="lightbox bg-transparent p-0 m-auto max-w-[92vw] max-h-[92vh] overflow-visible"
      onClose={() => setShot(null)}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      aria-label={shot?.alt}
    >
      {shot && (
        <figure className="flex flex-col items-center gap-3">
          <img
            src={shot.src}
            alt={shot.alt}
            className="max-h-[80vh] w-auto rounded-[1.6rem] border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          />
          <figcaption className="max-w-sm text-center text-sm text-[#cbd5e1]">{shot.alt}</figcaption>
          <button
            onClick={() => ref.current?.close()}
            className="rounded-full border border-white/15 bg-[#0a2522] px-4 py-1.5 text-sm text-[#f1f5f9] hover:border-[#d8b26e]/50"
            autoFocus
          >
            {t.projects.close}
          </button>
        </figure>
      )}
    </dialog>
  );
}
