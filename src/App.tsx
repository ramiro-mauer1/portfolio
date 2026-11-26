import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import Hero from './components/Hero';
import { Projects } from './components/Projects';
import Method from './components/Method';
import Notes from './components/Notes';
import About from './components/About';
import Contact from './components/Contact';
import { Footer } from './components/Footer';
import CaseStudy from './components/CaseStudy';
import NotePage from './components/NotePage';
import Backdrop from './components/Backdrop';
import CommandMenu from './components/CommandMenu';
import Toaster from './components/Toast';
import Lightbox from './components/Lightbox';
import { useLanguage } from './context/LanguageContext';

const PAGES = ['plinth', 'nota-voz', 'nota-fotos'] as const;
type Page = (typeof PAGES)[number] | 'home';

const readHash = () => window.location.hash.replace(/^#/, '');

export const App = () => {
  const { t } = useLanguage();
  const [route, setRoute] = useState<Page>(() => {
    const h = readHash();
    return (PAGES as readonly string[]).includes(h) ? (h as Page) : 'home';
  });

  useEffect(() => {
    const onHash = () => {
      const h = readHash();
      if ((PAGES as readonly string[]).includes(h)) {
        setRoute(h as Page);
        window.scrollTo({ top: 0 });
      } else {
        setRoute('home');
        requestAnimationFrame(() => {
          const el = h && h !== 'en' ? document.getElementById(h) : null;
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 88;
            window.scrollTo({ top: y, behavior: 'smooth' });
          } else if (!h || h === 'en') {
            window.scrollTo({ top: 0 });
          }
        });
      }
    };
    window.addEventListener('hashchange', onHash);
    // scroll to a section on first load (e.g. /#proyectos)
    const h = readHash();
    if (h && !(PAGES as readonly string[]).includes(h) && h !== 'en') setTimeout(onHash, 300);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#061615] text-[#f1f5f9] font-sans selection:bg-[#d8b26e]/30 selection:text-[#f1f5f9] overflow-x-hidden">
      <a
        href="#contenido"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('contenido')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-[#d8b26e] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#061615]"
      >
        {t.skip}
      </a>
      <Backdrop />
      <Navbar />
      <main id="contenido" tabIndex={-1} className="relative z-10 focus:outline-none">
        {route === 'home' && (
          <>
            <Hero />
            <Projects />
            <Method />
            <Notes />
            <About />
            <Contact />
          </>
        )}
        {route === 'plinth' && <CaseStudy />}
        {(route === 'nota-voz' || route === 'nota-fotos') && <NotePage id={route} />}
      </main>
      <Footer />
      <CommandMenu />
      <Lightbox />
      <Toaster />
    </div>
  );
};

export default App;
