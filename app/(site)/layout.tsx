import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: "PayAL",
  url: site.url,
  logo: `${site.url}${site.logo}`,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressCountry: "TR",
  },
  sameAs: ["https://x.com/payaltr"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  inLanguage: "tr-TR",
  publisher: { "@type": "Organization", name: site.name },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="site-shell">
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
