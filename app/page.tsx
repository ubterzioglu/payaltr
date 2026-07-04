import Aurora from "@/components/Aurora";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Aurora />
      <main className="app">
        <Hero />
        <Footer />
      </main>
    </>
  );
}
