import Ambient, { ScrollProgress } from "./components/Ambient";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import Workflow from "./components/Workflow";

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink text-chalk antialiased">
      <Ambient />
      <ScrollProgress />
      <Cursor />

      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Projects />
          <Stats />
          <Workflow />
          <Testimonials />
        </main>
        <Contact />
      </div>
    </div>
  );
}
