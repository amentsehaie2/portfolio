import { Link } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { notFoundSeo } from '../lib/seo';
import { useSeo } from '../lib/useSeo';

const SeoWhenStandalone = () => {
  useSeo(notFoundSeo());
  return null;
};

/** `seo={false}` when the parent page already applied the not-found head tags. */
export const BlogNotFound = ({ seo = true }: { seo?: boolean }) => (
  <div className="min-h-screen bg-dark text-white">
    {seo && <SeoWhenStandalone />}
    <Header />

    <main className="relative z-10 min-h-screen px-6 py-32 md:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">404</p>
        <h1 className="text-4xl font-light leading-tight md:text-6xl">Page not found</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
          This page does not exist. Head back to the blog to keep reading.
        </p>
        <Link
          to="/blog"
          className="mt-10 inline-flex rounded-full border border-primary/60 px-5 py-3 text-sm text-white transition-colors hover:bg-primary hover:text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark"
        >
          Back to blog
        </Link>
      </div>
    </main>

    <Footer />
  </div>
);
