import { getAllPosts } from '@/app/blog/post.util';
import { BlogCard } from './blog-card';
import TextClamp from './text-clamp';

interface Props {
  featuredOnly?: boolean;
}
export default async function BlogSection({ featuredOnly = false }: Props) {
  const posts = await getAllPosts({
    featuredOnly,
  });

  return (
    <section className="scroll-mt-5 py-12" id="blog">
      <div className="container mx-auto p-3">
        {/* Header */}
        <div className="mb-16 text-center">
          <TextClamp maxFont={48} minFont={24} as="h2" className="mb-4 font-bold">
            Insights &{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </TextClamp>

          <p className="text-muted-foreground mx-auto max-w-2xl leading-relaxed text-pretty md:text-lg">
            Deep dives into web development, AI integration, and modern tech strategies that drive
            business growth.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
