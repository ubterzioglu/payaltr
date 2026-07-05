export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Sabit, sunucuda üretilen JSON — kullanıcı girdisi içermez.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
