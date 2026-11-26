import { PROJECTS, type Shot } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

export const PhoneShots = ({ shots }: { shots: Shot[] }) => (
  <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
    {shots.map((s) => (
      <figure key={s.src} className="snap-start shrink-0 w-[150px] sm:w-[160px]">
        <img
          src={s.src}
          alt={s.alt}
          loading="lazy"
          width={390}
          height={844}
          className="w-full h-auto rounded-[1.4rem] border border-white/10 bg-black shadow-[0_12px_30px_rgba(0,0,0,0.45)]"
        />
        <figcaption className="mt-2 text-xs text-[#94a3b8] leading-snug">{s.alt}</figcaption>
      </figure>
    ))}
  </div>
);

const Chips = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((tech) => (
      <span key={tech} className="text-[11px] font-mono text-[#94a3b8] bg-[#092220] border border-[rgba(216,178,110,0.08)] rounded-full px-3 py-1">
        {tech}
      </span>
    ))}
  </div>
);

export function Projects() {
  const { lang, t } = useLanguage();
  const [featured, ...rest] = PROJECTS[lang];

  return (
    <section id="proyectos" className="py-20 lg:py-28 border-t border-[rgba(216,178,110,0.08)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f1f5f9] mb-12">{t.projects.title}</h2>

        {/* Featured: Plinth */}
        <article className="rounded-3xl bg-[#092220]/60 border border-[rgba(216,178,110,0.12)] p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-3xl font-bold text-[#f1f5f9]">{featured.title}</h3>
                <span className="text-xs font-mono text-[#94a3b8]">{featured.year}</span>
              </div>
              <p className="mt-2 text-[#f1f5f9]/90">{featured.tagline}</p>
              <p className="mt-1 text-xs font-mono text-[#94a3b8]">{t.projects.role}: {featured.role}</p>

              {featured.metric && (
                <div className="mt-6 rounded-2xl bg-[#061615] border border-[rgba(216,178,110,0.18)] px-5 py-4">
                  <div className="text-2xl font-extrabold tracking-tight text-[#d8b26e]">{featured.metric.value}</div>
                  <div className="text-sm text-[#94a3b8] mt-1">{featured.metric.label}</div>
                </div>
              )}

              <p className="mt-6 text-[#94a3b8] leading-relaxed">{featured.summary}</p>
              <ul className="mt-4 space-y-3">
                {featured.points.map((p) => (
                  <li key={p} className="text-sm text-[#cbd5e1] leading-relaxed pl-4 border-l border-[#d8b26e]/30">{p}</li>
                ))}
              </ul>
              <div className="mt-6"><Chips items={featured.tech} /></div>
              {featured.caseStudy && (
                <a href={featured.caseStudy} className="inline-flex mt-8 bg-[#d8b26e] text-[#061615] font-semibold px-6 py-3 rounded-full hover:bg-[#e3c68a] transition-colors">
                  {t.projects.readCase} &rarr;
                </a>
              )}
            </div>
            {featured.shots && (
              <div className="min-w-0 self-center">
                <PhoneShots shots={featured.shots} />
              </div>
            )}
          </div>
        </article>

        {/* Others */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {rest.map((p) => (
            <article key={p.id} className="rounded-3xl border border-[rgba(216,178,110,0.1)] p-6 md:p-8 flex flex-col gap-4 min-w-0">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-2xl font-bold text-[#f1f5f9]">{p.title}</h3>
                  <span className="text-xs font-mono text-[#94a3b8]">{p.year}</span>
                </div>
                <p className="mt-1 text-[#f1f5f9]/90 text-sm">{p.tagline}</p>
              </div>
              {p.shots && (
                <img src={p.shots[0].src} alt={p.shots[0].alt} loading="lazy" width={390} height={844}
                  className="w-full max-h-72 object-cover object-top rounded-2xl border border-white/10" />
              )}
              <p className="text-sm text-[#94a3b8] leading-relaxed">{p.summary}</p>
              <ul className="space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="text-sm text-[#cbd5e1] leading-relaxed pl-4 border-l border-[#d8b26e]/30">{pt}</li>
                ))}
              </ul>
              <div className="mt-auto pt-2 space-y-4">
                <Chips items={p.tech} />
                {p.code && (
                  <a href={p.code} target="_blank" rel="noopener noreferrer" className="inline-flex text-sm text-[#d8b26e] hover:text-[#e3c68a] font-medium">
                    {t.projects.viewCode} &rarr;
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
