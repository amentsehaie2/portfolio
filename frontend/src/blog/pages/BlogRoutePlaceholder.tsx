import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';

type BlogRoutePlaceholderProps = {
  type: 'article' | 'category' | 'not-found';
};

const routeCopy = {
  article: {
    label: 'Article route ready',
    heading: 'This article is being prepared.',
    body: 'The dynamic article route is connected. Article content will be added in Phase 2 and Phase 3.',
  },
  category: {
    label: 'Category route ready',
    heading: 'This category is being prepared.',
    body: 'The dynamic category route is connected. Category filtering will be added with the content model.',
  },
  'not-found': {
    label: 'Page not found',
    heading: 'This route does not exist yet.',
    body: 'Return to the blog hub to continue exploring the portfolio.',
  },
} as const;

export const BlogRoutePlaceholder = ({ type }: BlogRoutePlaceholderProps) => {
  const { category, slug } = useParams();
  const copy = routeCopy[type];
  const routeValue = slug ?? category;

  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />

      <main className="relative z-10 min-h-screen px-6 py-32 md:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">{copy.label}</p>
          <h1 className="text-4xl font-light leading-tight md:text-6xl">{copy.heading}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{copy.body}</p>
          {routeValue && <p className="mt-4 text-sm text-white/40">Requested path: {routeValue}</p>}
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
};