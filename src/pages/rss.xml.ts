import rss from '@astrojs/rss';
import site from '../data/site';
import type { APIContext } from 'astro';

interface MarkdownPost {
  frontmatter: {
    title: string;
    description: string;
    slug: string;
    date: string;
  };
}

export async function GET(context: APIContext) {
  const allPosts = await import.meta.glob<MarkdownPost>('../data/posts/*.md', { eager: true });
  
  const posts = Object.entries(allPosts).map(([path, post]) => {
    const frontmatter = post.frontmatter;
    return {
      title: frontmatter.title,
      description: frontmatter.description,
      link: `/${frontmatter.slug}`,
      pubDate: new Date(frontmatter.date),
    };
  });
  
  // Sort by date descending
  posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: `${site.name}'s Blog`,
    description: site.description,
    site: context.site?.toString() || site.url,
    items: posts,
    customData: `<language>en-us</language>`,
  });
}
