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

const PAGES = ['plinth', 'nota-voz', 'nota-fotos'] as const;
type Page = (typeof PAGES)[number] | 'home';

const readHash = () => window.location.hash.replace(/^#/, '');

export const App = () => {
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
      <Navbar />
      <main className="relative z-10">
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
    </div>
  );
};

export default App;
