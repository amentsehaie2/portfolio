import type { BlogPost } from '../types';

const WORDS_PER_MINUTE = 200;

const files = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

type FrontMatter = Record<string, string | string[]>;

const unquote = (value: string) => {
  const v = value.trim();
  if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1).replace(/\\"/g, '"');
  if (v.length >= 2 && v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replace(/\\'/g, "'");
  return v;
};

// Minimal parser for the YAML subset used in post front matter: scalars and string lists.
const parseFrontMatter = (raw: string): { data: FrontMatter; content: string } => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.replace(/^\uFEFF/, ''));
  if (!match) return { data: {}, content: raw };

  const data: FrontMatter = {};
  let listKey: string | null = null;
  for (const line of match[1].split(/\r?\n/)) {
    const item = /^\s+-\s+(.*)$/.exec(line);
    if (item && listKey) {
      (data[listKey] as string[]).push(unquote(item[1]));
      continue;
    }
    const pair = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (!pair) continue;
    if (pair[2] === '') {
      data[pair[1]] = [];
      listKey = pair[1];
    } else {
      data[pair[1]] = unquote(pair[2]);
      listKey = null;
    }
  }
  return { data, content: match[2] };
};

const str = (value: string | string[] | undefined) => (Array.isArray(value) ? value.join(', ') : (value ?? ''));

const computeReadingTime = (content: string) => {
  const words = content.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min read`;
};

const toPost = (path: string, raw: string): BlogPost => {
  const { data, content } = parseFrontMatter(raw);
  const fileName = path.split('/').pop()!.replace(/\.md$/, '');
  const readingTime = str(data.readingTime);
  const number = /^post-(\d+)-/.exec(fileName)?.[1];

  return {
    slug: str(data.slug) || fileName.replace(/^post-\d+-/, ''),
    title: str(data.title) || fileName,
    metaDescription: str(data.metaDescription),
    primaryKeyword: str(data.primaryKeyword),
    secondaryKeywords: Array.isArray(data.secondaryKeywords) ? data.secondaryKeywords : [],
    persona: str(data.persona),
    funnelStage: str(data.funnelStage),
    date: str(data.date),
    readingTime: !readingTime || /\[X\]/.test(readingTime) ? computeReadingTime(content) : readingTime,
    postNumber: number ? Number(number) : null,
    content,
  };
};

const timestamp = (date: string) => {
  const t = Date.parse(date);
  return Number.isNaN(t) ? 0 : t;
};

const posts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => timestamp(b.date) - timestamp(a.date) || (b.postNumber ?? 0) - (a.postNumber ?? 0));

export const getAllPosts = () => posts;

export const getPostBySlug = (slug: string | undefined) => posts.find((post) => post.slug === slug);

export const getPostByNumber = (n: number) => posts.find((post) => post.postNumber === n);

export const formatPostDate = (date: string) => {
  const t = Date.parse(date);
  if (Number.isNaN(t)) return date;
  return new Date(t).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
};
