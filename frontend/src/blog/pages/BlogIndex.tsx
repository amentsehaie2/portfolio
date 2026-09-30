import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { FluidBackground } from '../../components/ui/FluidBackground';

const PLACEHOLDER_POSTS = [
  {
    slug: 'building-a-home-studio',
    label: 'Article 01',
    category: 'Home recording',
    title: 'Building a home studio that works for you',
    description: 'A practical starting point for choosing the right tools, setup, and workflow.',
    quote: 'Good equipment helps, but a repeatable process matters more.',
  },
  {
    slug: 'church-audio-beginners-guide',
    label: 'Article 02',
    category: 'Church audio',
    title: 'A beginner\'s guide to church audio',
    description: 'Simple principles for creating a clear and reliable sound during a service.',
    quote: 'Clarity starts with listening before reaching for another control.',
  },
  {
    slug: 'recording-acoustic-and-electric-guitar',
    label: 'Article 03',
    category: 'Guitar craft',
    title: 'Recording acoustic and electric guitar',
    description: 'A comparison of two recording approaches and when each one makes sense.',
    quote: 'The best recording choice is the one that serves the song.',
  },
  {
    slug: 'cleaner-mixes-with-subtractive-eq',
    label: 'Article 04',
    category: 'Mixing & mastering',
    title: 'Making cleaner mixes with subtractive EQ',
    description: 'A focused look at removing problems before adding more processing.',
    quote: 'Space in a mix is created by decisions, not only by plugins.',
  },
  {
    slug: 'preventing-live-feedback',
    label: 'Article 05',
    category: 'Church audio',
    title: 'Preventing live feedback without losing tone',
    description: 'A calm troubleshooting order for finding feedback during a live setup.',
    quote: 'Solve the cause first, then make the smallest correction possible.',
  },
  {
    slug: 'from-bedroom-mix-to-streaming',
    label: 'Article 06',
    category: 'Mixing & mastering',
    title: 'From a bedroom mix to a streaming release',
    description: 'An introduction to reviewing balance, dynamics, and loudness before release.',
    quote: 'Finishing a mix is part technical check and part learning to let go.',
  },
];

export const BlogIndex = () => (
  <div className="relative min-h-screen bg-dark text-white">
    <FluidBackground />
    <div className="pointer-events-none absolute inset-0 z-[1] bg-dark/80 backdrop-blur-sm" />
    <Header />

    <main className="relative z-10 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">Amen Tsehaie / Blog</p>
          <h1 className="max-w-3xl text-5xl font-light leading-tight md:text-7xl">
            Notes on learning, sound, and building a creative practice.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
            This space will collect practical lessons from my development, home recording, guitar, and audio work.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-dark-lighter transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,153,255,0.15)]"
            >
              <div className="flex h-48 flex-col justify-between bg-gradient-to-br from-accent/80 via-dark-lighter to-primary/20 p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">{post.label}</span>
                <span className="text-sm text-secondary">{post.category}</span>
              </div>

              <div className="flex flex-grow flex-col p-6">
                <h2 className="mb-3 text-2xl font-semibold text-white">{post.title}</h2>
                <p className="mb-5 flex-grow leading-relaxed text-white/70">{post.description}</p>
                <p className="mb-6 text-sm italic leading-relaxed text-secondary">&ldquo;{post.quote}&rdquo;</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-5 py-3 font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
                >
                  View blog
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>

    <Footer />
  </div>
);