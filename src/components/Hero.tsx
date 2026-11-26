import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import portrait from '../assets/ramiro-retrato.webp';
import { useLanguage } from '../context/LanguageContext';
import { PROFILE } from '../data/data';
import { copyEmail } from './Toast';

/** Hora actual en Buenos Aires, para que quien contrata vea la superposición horaria. */
const useBuenosAiresTime = (lang: string) => {
  const fmt = () =>
    new Intl.DateTimeFormat(lang === 'es' ? 'es-AR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: lang !== 'es',
      timeZone: 'America/Argentina/Buenos_Aires',
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    setTime(fmt());
    const id = window.setInterval(() => setTime(fmt()), 30_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  return time;
};

const Hero = () => {
  const reduce = useReducedMotion();
  const { lang, t } = useLanguage();
  const time = useBuenosAiresTime(lang);
  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: 'easeOut' as const } };

  return (
    <section id="inicio" className="relative w-full overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(13,46,43,0.9),transparent_55%)] pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 backdrop-dots pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-8 min-w-0">
            <motion.div {...rise(0)} className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
              <span className="text-xs font-mono tracking-[0.2em] text-[#d8b26e] uppercase">{t.hero.eyebrow}</span>
              <span className="text-xs font-mono tracking-[0.1em] text-[#94a3b8]">{t.hero.place}</span>
            </motion.div>

            <motion.p {...rise(0.02)} className="inline-flex items-center gap-2.5 mb-6 rounded-full border border-emerald-300/15 bg-emerald-300/[0.04] pl-3 pr-3.5 py-1.5 text-[13px] text-[#cbd5e1]">
              <span aria-hidden="true" className="status-dot h-2 w-2 rounded-full bg-emerald-300" />
              <span className="whitespace-nowrap">{t.hero.status}</span>
              <span aria-hidden="true" className="h-3 w-px bg-white/15" />
              <span className="whitespace-nowrap text-[#94a3b8]">
                <time className="tabular-nums text-[#f1f5f9]">{time}</time>
                <span className="hidden sm:inline"> {t.hero.localTime}</span>
              </span>
            </motion.p>

            <motion.h1 {...rise(0.05)} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.06] text-[#f1f5f9] text-balance">
              {t.hero.title}
            </motion.h1>

            <motion.p {...rise(0.1)} className="text-lg text-[#94a3b8] leading-relaxed max-w-2xl mt-6">
              {t.hero.p}
            </motion.p>

            <motion.div {...rise(0.15)} className="mt-8 inline-flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-2xl bg-[#092220] border border-[rgba(216,178,110,0.18)] px-5 py-4 max-w-2xl">
              <span className="text-xl font-extrabold tracking-tight text-[#d8b26e] whitespace-nowrap">{t.hero.proofValue}</span>
              <span className="text-sm text-[#94a3b8] leading-relaxed">{t.hero.proofLabel}</span>
            </motion.div>

            <motion.div {...rise(0.2)} className="flex flex-wrap items-center gap-3 mt-8">
              <a href="#plinth" className="bg-[#d8b26e] text-[#061615] font-semibold px-6 py-3.5 rounded-full hover:bg-[#e3c68a] transition-colors">
                {t.hero.ctaCase}
              </a>
              <a href={PROFILE.cv[lang]} download className="border border-white/15 text-[#f1f5f9] font-semibold px-6 py-3.5 rounded-full hover:border-[#d8b26e]/50 transition-colors">
                {t.hero.ctaCv}
              </a>
            </motion.div>

            <motion.div {...rise(0.25)} className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-7 text-sm">
              <button
                onClick={() => void copyEmail(t.toast.emailCopied)}
                title={t.hero.copyEmail}
                className="group inline-flex items-center gap-2 font-mono text-[#f1f5f9] break-all text-left hover:text-[#d8b26e] transition-colors"
              >
                {PROFILE.email}
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0 text-[#94a3b8] group-hover:text-[#d8b26e]">
                  <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M10.5 5V3.5A1.5 1.5 0 0 0 9 2H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5H5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#d8b26e] hover:text-[#e3c68a]">LinkedIn</a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-[#d8b26e] hover:text-[#e3c68a]">GitHub</a>
            </motion.div>
          </div>

          <motion.div {...rise(0.1)} className="lg:col-span-4 w-full max-w-[300px] mx-auto lg:max-w-none">
            <div className="relative aspect-[43/48] rounded-[2rem] bg-gradient-to-b from-[#0d2e2b] to-[#061615] border border-[rgba(216,178,110,0.15)] overflow-hidden">
              <img src={portrait} alt="Ramiro Mauer" width={430} height={480} className="absolute inset-0 w-full h-full object-contain object-bottom" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
