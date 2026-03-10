import { Header } from './components/layout/Header';
import { FluidBackground } from './components/ui/FluidBackground';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';

function App() {
  return (
    <div className="relative min-h-screen bg-dark text-white font-sans selection:bg-primary/30">
      <FluidBackground />
      <Header />
      
      <main className="relative z-10">
        <Hero />
        <About />
      </main>
    </div>
  );
}

export default App;
