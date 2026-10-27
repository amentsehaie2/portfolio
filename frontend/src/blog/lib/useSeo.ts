import { useEffect } from 'react';
import { DEFAULT_TITLE, seoToTags, type SeoData } from './seo';

/** Client-side counterpart of the prerendered head: swaps data-seo tags when the route changes. */
export const useSeo = (seo: SeoData) => {
  useEffect(() => {
    document.title = seo.title;
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
    for (const { tag, attrs, text } of seoToTags(seo)) {
      const el = document.createElement(tag);
      el.setAttribute('data-seo', '');
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      if (text) el.textContent = text;
      document.head.appendChild(el);
    }
    return () => {
      document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
      document.title = DEFAULT_TITLE;
    };
  }, [seo]);
};
