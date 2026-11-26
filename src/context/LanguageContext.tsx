import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

export const translations = {
  es: {
    nav: { proyectos: 'Proyectos', metodo: 'Cómo trabajo', notas: 'Notas', contacto: 'Contacto', cv: 'Descargar CV', language: 'IDIOMA' },
    hero: {
      eyebrow: 'AI Product Engineer',
      place: 'Buenos Aires · remoto o híbrido',
      title: 'Construyo productos con IA, de la idea a producción.',
      p: 'Diseño y desarrollo apps web y PWAs dirigiendo agentes de código, con foco en que el usuario haga menos pasos. Mi producto principal, Plinth, ya lo usa un asesor inmobiliario en su trabajo.',
      proofValue: '6 propiedades en 40 min',
      proofLabel: 'captadas con Plinth el primer día de uso. Antes: unas 10 por mes.',
      ctaCase: 'Ver el caso de Plinth',
      ctaCv: 'Descargar CV',
      status: 'Disponible para trabajar',
      localTime: 'en Buenos Aires',
      copyEmail: 'Copiar mail',
    },
    projects: { title: 'Proyectos', role: 'Rol', readCase: 'Leer el caso de estudio', viewCode: 'Ver código', viewDemo: 'Probar la demo', enlarge: 'Ampliar captura', close: 'Cerrar' },
    notes: { title: 'Notas', intro: 'Cómo resolví problemas concretos en mis productos.', read: 'Leer nota', back: 'Volver al portfolio', next: 'Siguiente nota' },
    about: {
      title: 'Sobre mí',
      p1: 'Soy Ramiro Mauer, AI Product Engineer en Buenos Aires. Construyo productos completos: entiendo el problema con quien lo tiene, diseño la experiencia, lo desarrollo dirigiendo agentes de IA y lo pongo en producción.',
      p2: 'Aprendo just in time: cuando algo técnico me frena, lo resuelvo y queda sumado a lo que sé hacer. Busco un equipo donde construir productos con IA que la gente use todos los días.',
    },
    contact: { title: 'Hablemos', subtitle: 'Estoy abierto a puestos de AI Product Engineer, remotos o híbridos en Buenos Aires.', copy: 'Copiar mail', copied: 'Copiado' },
    toast: { emailCopied: 'Mail copiado' },
    skip: 'Saltar al contenido',
    menu: {
      open: 'Abrir el menú de comandos',
      placeholder: 'Buscar una sección o acción…',
      empty: 'Nada coincide con esa búsqueda.',
      hint: 'para moverte, Enter para abrir',
      groupGo: 'Ir a',
      groupDo: 'Acciones',
      case: 'Caso de estudio de Plinth',
      about: 'Sobre mí',
      toggleLang: 'Ver en inglés',
    },
    footer: { backToTop: 'Volver arriba', colophon: 'Diseñado y construido por Ramiro con Claude Code. Vite, React y Tailwind, publicado en Vercel.', source: 'Ver el código' },
  },
  en: {
    nav: { proyectos: 'Projects', metodo: 'How I work', notas: 'Notes', contacto: 'Contact', cv: 'Download CV', language: 'LANGUAGE' },
    hero: {
      eyebrow: 'AI Product Engineer',
      place: 'Buenos Aires · remote or hybrid',
      title: 'I build products with AI, from idea to production.',
      p: 'I design and build web apps and PWAs by directing coding agents, focused on fewer steps for the user. My main product, Plinth, is already used by a real estate agent in his work.',
      proofValue: '6 listings in 40 min',
      proofLabel: 'secured with Plinth on day one. Before: about 10 per month.',
      ctaCase: 'See the Plinth case study',
      ctaCv: 'Download CV',
      status: 'Available for work',
      localTime: 'in Buenos Aires',
      copyEmail: 'Copy email',
    },
    projects: { title: 'Projects', role: 'Role', readCase: 'Read the case study', viewCode: 'View code', viewDemo: 'Try the demo', enlarge: 'Enlarge screenshot', close: 'Close' },
    notes: { title: 'Notes', intro: 'How I solved concrete problems in my products.', read: 'Read note', back: 'Back to portfolio', next: 'Next note' },
    about: {
      title: 'About me',
      p1: "I'm Ramiro Mauer, an AI Product Engineer in Buenos Aires. I build complete products: I understand the problem with the people who have it, design the experience, build it by directing AI agents, and ship it to production.",
      p2: 'I learn just in time: when something technical blocks me, I solve it and it becomes part of what I can do. I am looking for a team where I can build AI products people use every day.',
    },
    contact: { title: "Let's talk", subtitle: 'I am open to AI Product Engineer roles, remote or hybrid in Buenos Aires.', copy: 'Copy email', copied: 'Copied' },
    toast: { emailCopied: 'Email copied' },
    skip: 'Skip to content',
    menu: {
      open: 'Open the command menu',
      placeholder: 'Search a section or action…',
      empty: 'Nothing matches that search.',
      hint: 'to move, Enter to open',
      groupGo: 'Go to',
      groupDo: 'Actions',
      case: 'Plinth case study',
      about: 'About me',
      toggleLang: 'View in Spanish',
    },
    footer: { backToTop: 'Back to top', colophon: 'Designed and built by Ramiro with Claude Code. Vite, React and Tailwind, deployed on Vercel.', source: 'View the code' },
  },
};

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const readInitial = (): Language => {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'es') return q;
    if (window.location.hash === '#en') return 'en';
    const saved = localStorage.getItem('lang');
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* storage unavailable */
  }
  return 'es';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(readInitial);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => {
      const next = prev === 'es' ? 'en' : 'es';
      try {
        localStorage.setItem('lang', next);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
