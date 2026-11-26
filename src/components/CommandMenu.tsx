import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { NOTES, PROFILE } from '../data/data';
import { copyEmail } from './Toast';

const OPEN_EVENT = 'rm-command-menu';
export const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_EVENT));

type Item = { id: string; group: 'go' | 'do'; label: string; hint?: string; run: () => void };

const goTo = (hash: string) => {
  if (window.location.hash === hash) window.dispatchEvent(new HashChangeEvent('hashchange'));
  else window.location.hash = hash;
};

const openUrl = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

const download = (href: string) => {
  const a = document.createElement('a');
  a.href = href;
  a.download = '';
  document.body.appendChild(a);
  a.click();
  a.remove();
};

/** Quita tildes y pasa a minúsculas para que "metodo" encuentre "Método". */
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function CommandMenu() {
  const { lang, t, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const items: Item[] = useMemo(
    () => [
      { id: 'proyectos', group: 'go', label: t.nav.proyectos, run: () => goTo('#proyectos') },
      { id: 'plinth', group: 'go', label: t.menu.case, run: () => goTo('#plinth') },
      { id: 'metodo', group: 'go', label: t.nav.metodo, run: () => goTo('#metodo') },
      ...NOTES[lang].map<Item>((n) => ({ id: n.id, group: 'go', label: n.title, hint: t.nav.notas, run: () => goTo(`#${n.id}`) })),
      { id: 'sobre-mi', group: 'go', label: t.menu.about, run: () => goTo('#sobre-mi') },
      { id: 'contacto', group: 'go', label: t.nav.contacto, run: () => goTo('#contacto') },
      { id: 'cv', group: 'do', label: t.nav.cv, hint: 'PDF', run: () => download(PROFILE.cv[lang]) },
      { id: 'mail', group: 'do', label: t.hero.copyEmail, hint: PROFILE.email, run: () => void copyEmail(t.toast.emailCopied) },
      { id: 'lang', group: 'do', label: t.menu.toggleLang, run: toggleLanguage },
      { id: 'github', group: 'do', label: 'GitHub', hint: 'ramiro-mauer1', run: () => openUrl(PROFILE.github) },
      { id: 'linkedin', group: 'do', label: 'LinkedIn', run: () => openUrl(PROFILE.linkedin) },
    ],
    [lang, t, toggleLanguage],
  );

  const results = useMemo(() => {
    const q = norm(query.trim());
    return q ? items.filter((i) => norm(`${i.label} ${i.hint ?? ''}`).includes(q)) : items;
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      returnFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const run = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    // Deja que el menú se cierre antes de navegar o descargar.
    requestAnimationFrame(() => item.run());
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === 'Tab') {
      e.preventDefault(); // el foco queda dentro del menú
    }
  };

  useEffect(() => {
    document.getElementById(`cmd-${results[active]?.id}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, results]);

  const groups: { key: Item['group']; title: string }[] = [
    { key: 'go', title: t.menu.groupGo },
    { key: 'do', title: t.menu.groupDo },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-[#030b0a]/75 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.menu.open}
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-lg rounded-2xl bg-[#0a2522] border border-[rgba(216,178,110,0.2)] shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.menu.placeholder}
              role="combobox"
              aria-expanded="true"
              aria-controls="cmd-list"
              aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
              className="w-full bg-transparent px-5 py-4 text-[15px] text-[#f1f5f9] placeholder:text-[#64748b] border-b border-white/10 focus:outline-none"
            />
            <ul id="cmd-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-[#94a3b8]">{t.menu.empty}</li>}
              {groups.map((g) => {
                const list = results.filter((r) => r.group === g.key);
                if (!list.length) return null;
                return (
                  <li key={g.key} role="presentation">
                    <p className="px-3 pt-3 pb-1.5 text-xs text-[#64748b]">{g.title}</p>
                    <ul role="presentation">
                      {list.map((item) => {
                        const idx = results.indexOf(item);
                        const isActive = idx === active;
                        return (
                          <li
                            key={item.id}
                            id={`cmd-${item.id}`}
                            role="option"
                            aria-selected={isActive}
                            onMouseMove={() => setActive(idx)}
                            onClick={() => run(item)}
                            className={`flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm cursor-pointer ${
                              isActive ? 'bg-[#d8b26e]/10 text-[#f1f5f9]' : 'text-[#cbd5e1]'
                            }`}
                          >
                            <span className="truncate">{item.label}</span>
                            {item.hint && <span className="shrink-0 text-xs text-[#64748b] truncate max-w-[45%]">{item.hint}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
            <div className="hidden sm:flex items-center gap-2 border-t border-white/10 px-4 py-2.5 text-xs text-[#64748b]">
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-sans">↑</kbd>
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-sans">↓</kbd>
              <span>{t.menu.hint}</span>
              <kbd className="ml-auto rounded border border-white/15 px-1.5 py-0.5 font-sans">Esc</kbd>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
