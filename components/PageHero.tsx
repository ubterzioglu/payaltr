export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1 className="page-hero__title">{title}</h1>
        {subtitle ? <p className="page-hero__sub">{subtitle}</p> : null}
      </div>
    </section>
  );
}
