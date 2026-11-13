import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Projects from "@/components/Projects";
import CaseStudies from "@/components/CaseStudies";
import Playground from "@/components/Playground";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Home = () => (
  <div className="relative min-h-screen bg-ink text-zinc-100 overflow-x-clip">
    <Nav />
    <main>
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <CaseStudies />
      <Playground />
      <Experience />
      <Skills />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Home;
