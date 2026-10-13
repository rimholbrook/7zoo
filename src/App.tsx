import { SECTIONS } from './data/site';
import { LightboxProvider } from './components/Lightbox';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Spread from './components/Spread';
export default function App() {
  return (
    <LightboxProvider>
      <Navbar />
      <main>
        {SECTIONS.map((s) => s.pages.map((n, i) => <Spread key={n} n={n} id={i === 0 ? s.id : undefined} />))}
      </main>
      <Footer />
    </LightboxProvider>
  );
}
