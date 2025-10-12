import { getAllPosts } from "@/app/blog/post.util";
import { BlogCard } from "./blog-card";

interface Props {
  featuredOnly?: boolean;
}
export default async function BlogSection({ featuredOnly = false }: Props) {
  const posts = await getAllPosts({
    featuredOnly,
  });

  return (
    <section id="blog">
      <div className="mx-auto container p-3 py-20 ">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-balance">
            Insights &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 text-pretty leading-relaxed">
            Deep dives into web development, AI integration, and modern tech strategies that drive
            business growth.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
