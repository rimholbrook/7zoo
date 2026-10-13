import { SECTIONS } from './data/site';
import { LightboxProvider } from './components/Lightbox';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Spread from './components/Spread';
import { useRoute } from './lib/route';

const LABELS: Record<string, string> = {
  'chi-siamo': 'Chi siamo', agenda: 'La nostra agenda', 'anima-delle-popolari': 'L’anima delle popolari', 'forza-della-seven': 'La forza della Seven',
  progetti: 'I nostri progetti', casa: 'La “casa”', 'aiuto-allo-studio': 'Aiuto allo studio', 'progetto-patenti': 'Progetto patenti',
  'musica-come-espressione': 'La musica come espressione', rap: 'Rap', 'supporto-famiglie': 'Supporto alle famiglie', sport: 'Crescere attraverso lo sport',
  'storie-degli-altri': 'Le storie degli altri', collaborazioni: 'Collaborazioni', contact: 'Contact Us',
};

export default function App() {
  const id = useRoute();
  const section = SECTIONS.find((s) => s.id === id)!;
  return (
    <LightboxProvider>
      <Navbar current={id} />
      <main key={id}>
        {section.parent && (
          <div className="back"><a href={`#${section.parent}`}>← {section.parent === 'home' ? 'Home' : LABELS[section.parent]}</a></div>
        )}
        {section.pages.map((n) => <Spread key={n} n={n} />)}
      </main>
      <Footer />
    </LightboxProvider>
  );
}
