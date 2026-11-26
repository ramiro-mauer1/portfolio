import { NOTES } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

export default function NotePage({ id }: { id: string }) {
  const { lang, t } = useLanguage();
  const note = NOTES[lang].find((n) => n.id === id) ?? NOTES[lang][0];

  return (
    <article className="pt-32 pb-20 lg:pt-40">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        <a href="#notas" className="text-sm text-[#d8b26e] hover:text-[#e3c68a]">&larr; {t.notes.back}</a>
        <p className="mt-8 text-xs font-mono text-[#94a3b8]">{note.date} · Ramiro Mauer</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight text-[#f1f5f9] text-balance">{note.title}</h1>
        <p className="mt-4 text-xl text-[#94a3b8] leading-relaxed">{note.summary}</p>
        <div className="mt-10">
          {note.body.map((b) =>
            b.startsWith('## ') ? (
              <h2 key={b} className="mt-10 mb-3 text-xl font-bold text-[#f1f5f9]">{b.slice(3)}</h2>
            ) : (
              <p key={b} className="mt-4 text-[17px] text-[#cbd5e1] leading-[1.75]">{b}</p>
            ),
          )}
        </div>
        <a href="#notas" className="inline-block mt-14 text-sm text-[#d8b26e] hover:text-[#e3c68a]">&larr; {t.notes.back}</a>
      </div>
    </article>
  );
}
