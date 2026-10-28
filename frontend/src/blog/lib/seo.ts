import type { BlogPost } from '../types';

export const SITE_URL = 'https://amentsehaie.vercel.app';
export const AUTHOR_NAME = 'Amen Tsehaie';
export const BLOG_NAME = 'The Self-Taught Audio Lab';
export const DEFAULT_TITLE = 'Amen Tsehaie | Portfolio';

export interface SeoData {
  title: string;
  description: string;
  canonical: string;
  type: 'website' | 'article';
  image?: string;
  robots?: string;
  publishedTime?: string;
  jsonLd: object[];
}

const absolute = (url: string) => (url.startsWith('http') ? url : `${SITE_URL}${url}`);

/** Matches image syntax whose alt text is an `[IMAGE: ...]` placeholder. */
export const isPlaceholderAlt = (alt: string | undefined) => !!alt && alt.trim().startsWith('[IMAGE:');

/** First markdown image that is a real one (not an `[IMAGE: ...]` placeholder). */
export const firstRealImage = (markdown: string) => {
  for (const m of markdown.matchAll(/!\[((?:[^[\]]|\[[^\]]*\])*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    if (!isPlaceholderAlt(m[1])) return m[2];
  }
  return undefined;
};

const breadcrumbs = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

export const blogIndexSeo = (): SeoData => ({
  title: `Blog | ${BLOG_NAME} | ${AUTHOR_NAME}`,
  description:
    'Guides for self-taught guitarists, church sound volunteers and home-studio producers, by Amen Tsehaie.',
  canonical: `${SITE_URL}/blog`,
  type: 'website',
  jsonLd: [
    breadcrumbs([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Blog', url: `${SITE_URL}/blog` },
    ]),
  ],
});

export const postSeo = (post: BlogPost): SeoData => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = firstRealImage(post.content);
  return {
    title: post.title,
    description: post.metaDescription,
    canonical: url,
    type: 'article',
    image: image ? absolute(image) : undefined,
    publishedTime: post.date,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        author: { '@type': 'Person', name: AUTHOR_NAME, url: SITE_URL },
        url,
        mainEntityOfPage: url,
        keywords: [post.primaryKeyword, ...post.secondaryKeywords].filter(Boolean).join(', '),
        ...(image ? { image: absolute(image) } : {}),
      },
      breadcrumbs([
        { name: 'Home', url: `${SITE_URL}/` },
        { name: 'Blog', url: `${SITE_URL}/blog` },
        { name: post.title, url },
      ]),
    ],
  };
};

export const notFoundSeo = (): SeoData => ({
  title: 'Page not found | Amen Tsehaie',
  description: 'This page does not exist. Return to the blog to keep reading.',
  canonical: `${SITE_URL}/blog`,
  type: 'website',
  robots: 'noindex, follow',
  jsonLd: [],
});

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export interface HeadTag {
  tag: 'meta' | 'link' | 'script';
  attrs: Record<string, string>;
  text?: string;
}

export const seoToTags = (seo: SeoData): HeadTag[] => {
  const tags: HeadTag[] = [
    { tag: 'meta', attrs: { name: 'description', content: seo.description } },
    { tag: 'link', attrs: { rel: 'canonical', href: seo.canonical } },
    { tag: 'meta', attrs: { property: 'og:title', content: seo.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: seo.description } },
    { tag: 'meta', attrs: { property: 'og:url', content: seo.canonical } },
    { tag: 'meta', attrs: { property: 'og:type', content: seo.type } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: `${BLOG_NAME} by ${AUTHOR_NAME}` } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: seo.image ? 'summary_large_image' : 'summary' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: seo.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: seo.description } },
  ];
  if (seo.image) {
    tags.push({ tag: 'meta', attrs: { property: 'og:image', content: seo.image } });
    tags.push({ tag: 'meta', attrs: { name: 'twitter:image', content: seo.image } });
  }
  if (seo.publishedTime) {
    tags.push({ tag: 'meta', attrs: { property: 'article:published_time', content: seo.publishedTime } });
    tags.push({ tag: 'meta', attrs: { property: 'article:author', content: AUTHOR_NAME } });
  }
  if (seo.robots) tags.push({ tag: 'meta', attrs: { name: 'robots', content: seo.robots } });
  for (const ld of seo.jsonLd) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      text: JSON.stringify(ld).replace(/</g, '\\u003c'),
    });
  }
  return tags;
};

/** Head markup for the prerender step. Every tag carries data-seo so the client can swap it on navigation. */
export const seoToHtml = (seo: SeoData) =>
  [`<title>${esc(seo.title)}</title>`]
    .concat(
      seoToTags(seo).map(({ tag, attrs, text }) => {
        const a = Object.entries(attrs)
          .map(([k, v]) => `${k}="${esc(v)}"`)
          .join(' ');
        return tag === 'script' ? `<script data-seo ${a}>${text}</script>` : `<${tag} data-seo ${a}>`;
      }),
    )
    .join('\n    ');
