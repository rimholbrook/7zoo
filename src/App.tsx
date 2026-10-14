import { SECTIONS, FLUSH } from './data/site';
import { crops, pages } from './lib/pages';
import { LightboxProvider } from './components/Lightbox';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Spread from './components/Spread';
import { useRoute } from './lib/route';

export default function App() {
  const id = useRoute();
  const section = SECTIONS.find((s) => s.id === id)!;
  const cr = crops(section.pages, FLUSH);
  return (
    <LightboxProvider>
      <Navbar current={id} />
      <main key={id}>
        {section.pages.map((n, i) => <Spread key={n} n={n} crop={cr[i]} join={i > 0 && pages[n - 1].bg === pages[section.pages[i - 1] - 1].bg} />)}
      </main>
      <Footer />
    </LightboxProvider>
  );
}