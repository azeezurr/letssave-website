export default function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-800">{eyebrow}</p>
      <h1 className="mt-3 font-heading text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">{lede}</p>
    </header>
  );
}
