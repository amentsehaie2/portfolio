import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './app/Router';
import { getAllPosts } from './blog/lib/posts';
import { blogIndexSeo, notFoundSeo, postSeo, seoToHtml, SITE_URL, type SeoData } from './blog/lib/seo';

export interface PrerenderRoute {
  /** Route path, or '/404' for the not-found page */
  path: string;
  seo: SeoData;
  html: string;
  headHtml: string;
  lastmod?: string;
}

const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );

export const getPrerenderRoutes = (): PrerenderRoute[] => {
  const posts = getAllPosts();
  const routes: PrerenderRoute[] = [];

  const blogSeo = blogIndexSeo();
  routes.push({
    path: '/blog',
    seo: blogSeo,
    html: render('/blog'),
    headHtml: seoToHtml(blogSeo),
    lastmod: posts[0]?.date,
  });

  for (const post of posts) {
    const seo = postSeo(post);
    routes.push({
      path: `/blog/${post.slug}`,
      seo,
      html: render(`/blog/${post.slug}`),
      headHtml: seoToHtml(seo),
      lastmod: post.date,
    });
  }

  const nf = notFoundSeo();
  routes.push({ path: '/404', seo: nf, html: render('/blog/page-not-found'), headHtml: seoToHtml(nf) });

  return routes;
};

export const siteUrl = SITE_URL;
