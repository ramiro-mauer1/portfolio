import { NOTES } from '../data/data';
import { useLanguage } from '../context/LanguageContext';
import ReadingProgress from './ReadingProgress';

export default function NotePage({ id }: { id: string }) {
  const { lang, t } = useLanguage();
  const list = NOTES[lang];
  const idx = Math.max(0, list.findIndex((n) => n.id === id));
  const note = list[idx];
  const next = list[(idx + 1) % list.length];

  return (
    <article className="pt-32 pb-20 lg:pt-40">
      <ReadingProgress />
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
        {next.id !== note.id && (
          <a
            href={`#${next.id}`}
            className="group mt-14 block rounded-2xl border border-[rgba(216,178,110,0.15)] bg-[#092220]/60 p-6 hover:border-[#d8b26e]/40 transition-colors"
          >
            <span className="text-sm text-[#94a3b8]">{t.notes.next}</span>
            <span className="mt-1 block text-xl font-bold text-[#f1f5f9] group-hover:text-[#d8b26e] transition-colors">{next.title}</span>
            <span className="mt-1 block text-sm text-[#94a3b8]">{next.summary}</span>
          </a>
        )}
        <a href="#notas" className="inline-block mt-10 text-sm text-[#d8b26e] hover:text-[#e3c68a]">&larr; {t.notes.back}</a>
      </div>
    </article>
  );
}
