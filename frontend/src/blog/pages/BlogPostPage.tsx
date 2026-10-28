import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { FluidBackground } from '../../components/ui/FluidBackground';
import { MarkdownBody } from '../components/MarkdownBody';
import { getPostBySlug } from '../lib/posts';
import { notFoundSeo, postSeo } from '../lib/seo';
import { useSeo } from '../lib/useSeo';
import { BlogNotFound } from './BlogNotFound';

export const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useSeo(post ? postSeo(post) : notFoundSeo());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <BlogNotFound seo={false} />;

  return (
    <div className="relative min-h-screen bg-dark text-white">
      <FluidBackground />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-dark/80 backdrop-blur-sm" />
      <Header />

      <main className="relative z-10 px-4 py-32 md:px-12">
        <article className="mx-auto w-full max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs uppercase tracking-widest text-white/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/blog" className="hover:text-white">Blog</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/80">{post.title}</li>
            </ol>
          </nav>

          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            {post.readingTime}
            <span aria-hidden="true"> · </span>
            By Amen Tsehaie
          </p>

          <MarkdownBody content={post.content} />

          <p className="mt-20 font-mono text-sm md:ml-[8%]">
            <Link to="/blog" className="text-secondary underline underline-offset-4 hover:text-white">
              &larr; Back to all posts
            </Link>
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
};
