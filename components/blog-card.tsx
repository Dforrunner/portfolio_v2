import { BlogPostMetaData } from '@/app/blog/post.util';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function BlogCard({ post }: { post: BlogPostMetaData }) {
  return (
    <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative block" prefetch>
      <article className="relative h-full overflow-hidden rounded-2xl border border-slate-300 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-slate-400 hover:shadow-2xl hover:shadow-slate-900/50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image || '/placeholder.svg'}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            width={400}
            height={300}
            loading="lazy"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${post.gradient} opacity-20 transition-opacity duration-500 group-hover:opacity-30`}
          />
          {/* Category Badge */}
          <div
            className={`absolute top-4 right-4 rounded-full bg-gradient-to-r ${post.gradient} px-3 py-1 text-xs font-semibold text-white shadow-lg`}
          >
            {post.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="mb-3 flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-3 text-xl leading-tight font-bold text-balance transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-pretty text-slate-400">
            {post.excerpt}
          </p>

          {/* Read More */}
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className={`bg-gradient-to-r ${post.gradient} bg-clip-text text-transparent`}>
              Read Full Article
            </span>
            <ArrowRight
              className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`}
            />
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div
          className={`absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br ${post.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
        />
      </article>
    </Link>
  );
}
