import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';
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

type ElementProps = { children?: ReactNode; src?: string };

const ctaClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg border-2 px-6 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark';

// Text column: offset from the left on desktop so images and key sentences can break out wider.
const column = 'max-w-[64ch] md:ml-[8%]';

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
    <p className={`my-10 ${column}`}>
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

const Strong = ({ children }: { children?: ReactNode }) => (
  <strong className="font-semibold text-white">{children}</strong>
);

const isImageElement = (node: ReactNode): node is ReactElement<ElementProps> =>
  isValidElement<ElementProps>(node) && node.props.src !== undefined;

const buildComponents = (heroSrc: string | undefined): Components => ({
  h1: ({ children }) => (
    <h1 className="mb-8 bg-gradient-to-br from-white via-[#c8e6ff] to-primary bg-clip-text font-display text-4xl font-semibold leading-[1.05] tracking-tight text-transparent md:text-6xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className={`mb-6 mt-24 font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl ${column}`}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className={`mb-3 mt-10 font-display text-2xl font-semibold md:text-3xl ${column}`}>{children}</h3>
  ),
  p: ({ children }) => {
    const parts = Children.toArray(children);

    const match = CTA_PATTERN.exec(toText(children).trim());
    if (match) return <CtaButton label={match[1]} target={match[2]} />;

    // Image followed by an italic caption becomes a wide figure.
    const image = parts.find(isImageElement);
    if (image) {
      const caption = parts.filter((part) => part !== image && toText(part).trim() !== '');
      return (
        <figure className="my-14 w-full md:-mx-6 md:w-[calc(100%+3rem)]">
          {image}
          {caption.length > 0 && (
            <figcaption className="mt-3 px-1 font-mono text-xs leading-relaxed tracking-wide text-white/55 [&_em]:not-italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    // A paragraph that is only italic text is the lead line under the title.
    if (parts.length === 1 && isValidElement(parts[0]) && parts[0].type === 'em') {
      return <p className="mb-14 max-w-3xl font-display text-xl italic leading-snug text-secondary/90 md:text-2xl">{children}</p>;
    }

    return <p className={`my-5 text-[17px] leading-[1.75] text-white/80 ${column}`}>{children}</p>;
  },
  ul: ({ children }) => {
    const items = Children.toArray(children).filter(isValidElement<ElementProps>);
    const first = (item: ReactElement<ElementProps>) => Children.toArray(item.props.children)[0];
    const leadsWithStrong = (item: ReactElement<ElementProps>) => {
      const lead = first(item);
      return isValidElement(lead) && lead.type === Strong;
    };
    const allLead = items.length > 0 && items.every(leadsWithStrong);

    // Bold lead ending in ":" = signposts to other posts; ending in "." = takeaway cards.
    if (allLead && items.every((item) => toText(first(item)).trim().endsWith(':'))) {
      return (
        <ul
          className={`my-8 list-none divide-y divide-white/10 border-y border-white/10 text-[17px] leading-[1.7] text-white/80 [&>li]:py-4 [&_strong]:mb-1 [&_strong]:block [&_strong]:font-mono [&_strong]:text-sm [&_strong]:font-bold [&_strong]:uppercase [&_strong]:tracking-wider [&_strong]:text-secondary ${column}`}
        >
          {children}
        </ul>
      );
    }
    if (allLead) {
      return (
        <ul className="my-10 grid list-none gap-4 text-[16px] leading-[1.65] text-white/75 sm:grid-cols-2 [&>li]:rounded-xl [&>li]:border [&>li]:border-primary/25 [&>li]:bg-[#162840]/50 [&>li]:p-6 [&_strong]:mb-2 [&_strong]:block [&_strong]:font-display [&_strong]:text-xl [&_strong]:font-semibold [&_strong]:leading-snug [&_strong]:text-white">
          {children}
        </ul>
      );
    }
    return <ul className={`my-5 list-disc space-y-2 pl-6 text-[17px] leading-[1.75] text-white/80 ${column}`}>{children}</ul>;
  },
  ol: ({ children }) => (
    <ol className={`my-5 list-decimal space-y-2 pl-6 text-[17px] leading-[1.75] text-white/80 ${column}`}>{children}</ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="key-quote my-20 w-full max-w-4xl border-t-2 border-primary/70 pt-8 font-display text-3xl font-medium italic leading-[1.12] tracking-tight text-white md:text-5xl [&_strong]:font-medium [&_strong]:text-secondary">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-white/10" />,
  strong: Strong,
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
  img: ({ src, alt, title }) => {
    if (!src || isPlaceholderAlt(alt)) {
      return (
        <span className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-white/20 bg-dark-lighter p-6 text-center font-mono text-sm text-white/60">
          {alt}
        </span>
      );
    }
    const isHero = src === heroSrc;
    // Markdown title "portrait" keeps a tall photo uncropped instead of forcing 16:9.
    const portrait = title === 'portrait';
    return (
      <img
        src={src}
        alt={alt ?? ''}
        width={portrait ? 900 : 1600}
        height={portrait ? 1562 : 900}
        loading={isHero ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-auto w-full rounded-2xl object-cover shadow-[0_20px_60px_rgba(0,153,255,0.12)] ${
          portrait ? 'mx-auto aspect-[900/1562] max-w-sm' : 'aspect-video'
        }`}
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
  <div className="blog-prose">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={buildComponents(firstRealImage(content))}>
      {content}
    </ReactMarkdown>
  </div>
);
