import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { FluidBackground } from '../../components/ui/FluidBackground';
import { formatPostDate, getAllPosts } from '../lib/posts';
import { blogIndexSeo } from '../lib/seo';
import { useSeo } from '../lib/useSeo';

const seo = blogIndexSeo();

export const BlogIndex = () => {
  useSeo(seo);
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen bg-dark text-white">
      <FluidBackground />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-dark/80 backdrop-blur-sm" />
      <Header />

      <main className="relative z-10 px-6 py-32 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">Amen Tsehaie / Blog</p>
            <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">The Self-Taught Audio Lab</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
              For self-taught guitarists, church sound volunteers and home-studio producers.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-dark-lighter p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,153,255,0.15)]"
              >
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true"> · </span>
                  {post.readingTime}
                </p>
                <h2 className="mb-3 font-display text-2xl font-semibold text-white">{post.title}</h2>
                <p className="mb-6 flex-grow leading-relaxed text-white/70">{post.metaDescription}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-5 py-3 font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
                >
                  Read post
                  <ArrowUpRight size={18} aria-hidden="true" />
                  <span className="sr-only">: {post.title}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
