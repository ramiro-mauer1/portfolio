import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { PROFILE } from '../data/data';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  const navItems = [
    { id: 'proyectos', label: t.nav.proyectos },
    { id: 'metodo', label: t.nav.metodo },
    { id: 'notas', label: t.nav.notas },
    { id: 'contacto', label: t.nav.contacto },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl">
        <div className={`flex items-center justify-between gap-4 px-4 md:px-5 py-2.5 transition-all duration-500 rounded-full border ${
          isScrolled
            ? 'bg-[#061615]/85 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-[#061615]/50 backdrop-blur-md border-white/5'
        }`}>
          <a href="#" className="flex items-center gap-2 pl-1 shrink-0" aria-label="Ramiro Mauer">
            <span className="font-bold tracking-tighter text-[#d8b26e] text-lg leading-none">
              RM<span className="text-white">.</span>
            </span>
            <span className="hidden sm:inline text-sm font-semibold text-[#f1f5f9]">Ramiro Mauer</span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 pr-1">
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center rounded-full border border-white/10 bg-black/20 p-0.5 text-[11px] font-bold tracking-widest"
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
            >
              <span className={`px-2.5 py-1.5 rounded-full ${lang === 'es' ? 'bg-[#d8b26e] text-[#061615]' : 'text-[#94a3b8]'}`}>ES</span>
              <span className={`px-2.5 py-1.5 rounded-full ${lang === 'en' ? 'bg-[#d8b26e] text-[#061615]' : 'text-[#94a3b8]'}`}>EN</span>
            </button>
            <a
              href={PROFILE.cv[lang]}
              download
              className="hidden md:flex items-center bg-white text-black hover:bg-[#d8b26e] rounded-full px-4 py-2 text-sm font-semibold transition-colors"
            >
              {t.nav.cv}
            </a>
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-50 relative text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <motion.span animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-current rounded-full block" />
              <motion.span animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-0.5 bg-current rounded-full block" />
              <motion.span animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-current rounded-full block" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#061615]/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-7 w-full px-6">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-bold tracking-tight text-white">
                  {item.label}
                </a>
              ))}
              <a href={PROFILE.cv[lang]} download onClick={() => setMobileMenuOpen(false)} className="mt-4 bg-[#d8b26e] text-[#061615] rounded-full px-6 py-3 font-semibold">
                {t.nav.cv}
              </a>
              <button
                onClick={toggleLanguage}
                className="text-sm font-mono tracking-widest text-[#94a3b8] uppercase border border-white/10 rounded-full px-6 py-2 bg-white/5"
              >
                {t.nav.language}: <span className="text-white font-bold">{lang === 'es' ? 'Español' : 'English'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
