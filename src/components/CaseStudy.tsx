import { PLINTH_CASE, PROJECTS } from '../data/data';
import { useLanguage } from '../context/LanguageContext';
import { PhoneShots } from './Projects';
import ReadingProgress from './ReadingProgress';

const extraShot = {
  es: { src: '/shots/plinth-fotos.jpg', alt: 'Mejora de fotos 4x con IA en el navegador' },
  en: { src: '/shots/plinth-fotos.jpg', alt: '4x AI photo enhancement in the browser' },
};

export default function CaseStudy() {
  const { lang } = useLanguage();
  const c = PLINTH_CASE[lang];
  const plinth = PROJECTS[lang][0];
  const shots = [...(plinth.shots ?? []), extraShot[lang]];

  return (
    <article className="pt-32 pb-20 lg:pt-40">
      <ReadingProgress />
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <a href="#proyectos" className="text-sm text-[#d8b26e] hover:text-[#e3c68a]">&larr; {c.back}</a>
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-[#f1f5f9]">{c.title}</h1>
        <p className="mt-4 text-xl text-[#94a3b8] leading-relaxed text-balance">{c.subtitle}</p>

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {c.facts.map((f) => (
            <div key={f.label} className="rounded-2xl bg-[#092220] border border-[rgba(216,178,110,0.1)] p-4">
              <dt className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#94a3b8]">{f.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-[#f1f5f9]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 mt-12">
        <PhoneShots shots={shots} />
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {c.sections.map((s) => (
          <section key={s.title} className="mt-14">
            <h2 className="text-2xl font-bold text-[#f1f5f9]">{s.title}</h2>
            {s.paragraphs?.map((p) => (
              <p key={p} className="mt-4 text-[#94a3b8] text-lg leading-relaxed">{p}</p>
            ))}
            {s.items && (
              <div className="mt-6 space-y-6">
                {s.items.map((it) => (
                  <div key={it.title} className="pl-5 border-l-2 border-[#d8b26e]/30">
                    <h3 className="font-semibold text-[#f1f5f9]">{it.title}</h3>
                    <p className="mt-1.5 text-[#94a3b8] leading-relaxed">{it.body}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
        <a href="#proyectos" className="inline-block mt-16 text-sm text-[#d8b26e] hover:text-[#e3c68a]">&larr; {c.back}</a>
      </div>
    </article>
  );
}
