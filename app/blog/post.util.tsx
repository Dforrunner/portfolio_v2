"use server";

import fs from "fs";
import matter from "gray-matter";
import path from "path";

// Folder where all markdown files live
const postsDirectory = path.join(process.cwd(), "/app/blog/content");

export interface BlogPostMetaData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  gradient: string;
  featured: boolean;
  author: string;
  url: string;
}

export interface BlogPost extends BlogPostMetaData {
  content: string;
}

// Get all posts (sorted by date)
interface GetAllPostsOptions {
  featuredOnly?: boolean;
}
export async function getAllPosts({
  featuredOnly,
}: GetAllPostsOptions): Promise<BlogPostMetaData[]> {
  const fileNames = fs.readdirSync(postsDirectory);

  let posts = fileNames
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        url: process.env.NEXT_PUBLIC_SITE_URL + `/blog/${slug}`,
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || content.substring(0, 150) + "...",
        readTime: data.readTime,
        category: data.category,
        image: data.image,
        gradient: data.gradient,
        featured: data.featured ?? false,
        author: data.author,
      };
    })
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  if (featuredOnly) {
    posts = posts.filter((post) => !post.featured);
  }

  return posts;
}

// Get one post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    url: process.env.NEXT_PUBLIC_SITE_URL + `/blog/${slug}`,
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || content.substring(0, 150) + "...",
    readTime: data.readTime,
    category: data.category,
    image: data.image,
    gradient: data.gradient,
    featured: data.featured ?? false,
    content,
    author: data.author,
  };
}
