import { PROFILE } from '../data/data';
import { useLanguage } from '../context/LanguageContext';
import { copyEmail } from './Toast';

const btn = 'flex items-center justify-center py-3.5 px-5 rounded-2xl bg-[#092220] border border-[rgba(216,178,110,0.15)] hover:border-[#d8b26e]/40 hover:bg-[#0d2e2b] transition-colors text-sm font-medium text-[#f1f5f9]';

const Contact = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="contacto" className="py-20 lg:py-28 border-t border-[rgba(216,178,110,0.08)]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#f1f5f9] text-balance">{t.contact.title}</h2>
        <p className="text-lg text-[#94a3b8] mt-4">{t.contact.subtitle}</p>
        <p className="font-mono text-base text-[#d8b26e] mt-6 select-all break-all">{PROFILE.email}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
          <button onClick={() => void copyEmail(t.toast.emailCopied)} className={btn}>{t.contact.copy}</button>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className={btn}>LinkedIn</a>
          <a href={PROFILE.cv[lang]} download className={btn}>{t.nav.cv}</a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className={btn}>GitHub</a>
        </div>
        <a href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-sm text-[#94a3b8] hover:text-[#d8b26e]">
          WhatsApp
        </a>
      </div>
    </section>
  );
};

export default Contact;
