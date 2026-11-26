import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROFILE } from '../data/data';

const EVENT = 'rm-toast';

export const notify = (message: string) => window.dispatchEvent(new CustomEvent(EVENT, { detail: message }));

/** Copia el mail y avisa con un toast. Si el portapapeles no está disponible, abre el cliente de correo. */
export const copyEmail = async (message: string) => {
  try {
    await navigator.clipboard.writeText(PROFILE.email);
    notify(message);
    return true;
  } catch {
    window.location.href = `mailto:${PROFILE.email}`;
    return false;
  }
};

export default function Toaster() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let timer: number;
    const on = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener(EVENT, on);
    return () => {
      window.removeEventListener(EVENT, on);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-live="polite" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] pointer-events-none">
      <AnimatePresence>
        {msg && (
          <motion.div
            key={msg}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 rounded-full bg-[#0d2e2b] border border-[rgba(216,178,110,0.3)] px-4 py-2 text-sm text-[#f1f5f9] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="text-[#d8b26e]">
              <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
