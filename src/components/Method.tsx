import { METHOD, CLAUDE_MD_SNIPPET } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

export default function Method() {
  const { lang } = useLanguage();
  const m = METHOD[lang];

  return (
    <section id="metodo" className="py-20 lg:py-28 border-t border-[rgba(216,178,110,0.08)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f1f5f9]">{m.title}</h2>
        <p className="mt-4 text-lg text-[#94a3b8] max-w-2xl leading-relaxed">{m.intro}</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          <ol className="lg:col-span-7 flex flex-col">
            {m.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[auto_1fr] gap-x-5 py-6 border-t border-[rgba(216,178,110,0.1)] first:border-t-0 first:pt-0">
                <span className="text-sm font-mono text-[#d8b26e]/70 pt-1">0{i + 1}</span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-[#f1f5f9]">{s.title}</h3>
                  <p className="mt-2 text-[#94a3b8] leading-relaxed">{s.body}</p>
                  <p className="mt-2 text-xs font-mono text-[#d8b26e]/80">{s.evidence}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="lg:col-span-5 min-w-0">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-[#94a3b8] mb-3">{m.snippetLabel}</p>
              <pre className="overflow-x-auto rounded-2xl bg-[#030b0a] border border-white/10 p-5 text-[12.5px] leading-relaxed font-mono text-[#cbd5e1] whitespace-pre-wrap break-words">
{CLAUDE_MD_SNIPPET}
              </pre>
              <p className="mt-5 text-sm text-[#94a3b8] leading-relaxed">{m.credit}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
