import { isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { getPostByNumber } from '../lib/posts';
import { firstRealImage, isPlaceholderAlt } from '../lib/seo';

const CTA_PATTERN = /^\[(?:OPTIONAL )?CTA(?: BUTTON)?:\s*"(.+?)"(?:\s*button)?\s*linking to\s+(.+?)\]$/;

const toText = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(toText).join('');
  if (isValidElement(node)) return toText((node.props as { children?: ReactNode }).children);
  return '';
};

const ctaClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg border-2 px-6 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark';

/** Resolves "Post 02" or "/blog" to a route, or null when the target post does not exist yet. */
const resolveCtaTarget = (target: string): string | null => {
  const trimmed = target.trim();
  if (trimmed.startsWith('/')) return trimmed;
  const number = /Post\s+0*(\d+)/i.exec(trimmed)?.[1];
  const post = number ? getPostByNumber(Number(number)) : undefined;
  return post ? `/blog/${post.slug}` : null;
};

const CtaButton = ({ label, target }: { label: string; target: string }) => {
  const to = resolveCtaTarget(target);
  return (
    <p className="my-8">
      {to ? (
        <Link to={to} className={`${ctaClasses} border-primary bg-primary text-white hover:bg-transparent hover:text-primary`}>
          {label}
        </Link>
      ) : (
        <span
          role="link"
          aria-disabled="true"
          title="This post is not published yet"
          className={`${ctaClasses} cursor-not-allowed border-white/20 text-white/40`}
        >
          {label}
        </span>
      )}
    </p>
  );
};

const buildComponents = (heroSrc: string | undefined): Components => ({
  h1: ({ children }) => <h1 className="mb-6 text-4xl font-light leading-tight md:text-5xl">{children}</h1>,
  h2: ({ children }) => <h2 className="mb-4 mt-14 text-2xl font-semibold leading-snug md:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-3 mt-10 text-xl font-semibold md:text-2xl">{children}</h3>,
  p: ({ children }) => {
    const match = CTA_PATTERN.exec(toText(children).trim());
    if (match) return <CtaButton label={match[1]} target={match[2]} />;
    return <p className="my-5 text-[17px] leading-[1.7] text-white/80">{children}</p>;
  },
  ul: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-white/80">{children}</ul>,
  ol: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6 text-[17px] leading-[1.7] text-white/80">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-primary pl-5 italic text-white/70">{children}</blockquote>
  ),
  hr: () => <hr className="my-12 border-white/10" />,
  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  a: ({ href = '', children }) => {
    const cls = 'text-secondary underline underline-offset-2 hover:text-white';
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={cls}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    if (!src || isPlaceholderAlt(alt)) {
      return (
        <span className="my-6 flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-white/20 bg-dark-lighter p-6 text-center text-sm text-white/60">
          {alt}
        </span>
      );
    }
    const isHero = src === heroSrc;
    return (
      <img
        src={src}
        alt={alt ?? ''}
        width={1600}
        height={900}
        loading={isHero ? 'eager' : 'lazy'}
        decoding="async"
        className="my-6 aspect-video h-auto w-full rounded-xl object-cover"
      />
    );
  },
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[16px] text-white/80">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b border-white/20 px-3 py-2 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-b border-white/10 px-3 py-2">{children}</td>,
});

export const MarkdownBody = ({ content }: { content: string }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(firstRealImage(content))}>
    {content}
  </ReactMarkdown>
);
