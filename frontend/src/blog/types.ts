export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  persona: string;
  funnelStage: string;
  readingTime: string;
  /** Number from a `post-NN-...` file name, used to resolve `Post NN` CTA targets */
  postNumber: number | null;
  /** Markdown body without front matter */
  content: string;
}
