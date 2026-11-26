import { PROFILE } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[rgba(216,178,110,0.05)] py-12 mt-12 bg-[#051110]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex flex-col items-center md:items-start">
          <span className="font-bold tracking-tighter text-[#d8b26e] text-xl mb-1">
            RM<span className="text-white">.</span>
          </span>
          <p className="text-xs text-[#94a3b8]">
            &copy; {new Date().getFullYear()} {PROFILE.name}.
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="text-xs uppercase tracking-widest font-mono text-[#94a3b8] hover:text-[#d8b26e] transition-colors flex items-center gap-2"
        >
          {t.footer.backToTop} &uarr;
        </button>

      </div>
    </footer>
  );
};
