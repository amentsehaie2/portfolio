import { Header } from './components/layout/Header';
import { FluidBackground } from './components/ui/FluidBackground';

function App() {
  return (
    <div className="relative min-h-screen bg-dark text-white font-sans selection:bg-primary/30">
      <FluidBackground />
      <Header />
      
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[200vh] pt-32">
        <h1 className="text-4xl font-bold mb-8">Phase 2 Core Testing</h1>
        <p className="max-w-xl text-center text-white/70">
          This is a temporary assembly to demonstrate the fluid background,
          the dynamic header structure, and scroll progress visibility.
          Keep scrolling down to see the header react.
        </p>
      </main>
    </div>
  );
}

export default App;
