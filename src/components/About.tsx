import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre-mi" className="py-20 lg:py-28 border-t border-[rgba(216,178,110,0.08)] bg-[#092220]/30">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f1f5f9] mb-8">{t.about.title}</h2>
        <div className="space-y-5 text-[#94a3b8] text-lg leading-relaxed">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </div>
      </div>
    </section>
  );
}
