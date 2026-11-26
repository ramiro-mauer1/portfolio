import { NOTES } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

export default function Notes() {
  const { lang, t } = useLanguage();

  return (
    <section id="notas" className="py-20 lg:py-28 border-t border-[rgba(216,178,110,0.08)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f1f5f9]">{t.notes.title}</h2>
        <p className="mt-4 text-lg text-[#94a3b8]">{t.notes.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {NOTES[lang].map((n) => (
            <a key={n.id} href={`#${n.id}`} className="group rounded-3xl border border-[rgba(216,178,110,0.1)] hover:border-[#d8b26e]/40 p-6 md:p-8 transition-colors flex flex-col gap-3">
              <span className="text-xs font-mono text-[#94a3b8]">{n.date}</span>
              <h3 className="text-xl font-bold text-[#f1f5f9] group-hover:text-white">{n.title}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{n.summary}</p>
              <span className="mt-auto pt-2 text-sm font-medium text-[#d8b26e]">{t.notes.read} &rarr;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
