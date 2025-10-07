"use client";

import { useState } from "react";
import { ArrowRight, Clock, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "./blog-posts";

export default function BlogPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-balance">
            Insights & <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Expertise</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 text-pretty leading-relaxed">
            Deep dives into web development, AI integration, and modern tech strategies that drive business growth.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group relative block" onMouseEnter={() => setHoveredId(post.id)} onMouseLeave={() => setHoveredId(null)}>
              <article className="relative h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-slate-700 hover:shadow-2xl hover:shadow-slate-900/50">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${post.gradient} opacity-20 transition-opacity duration-500 group-hover:opacity-30`} />
                  {/* Category Badge */}
                  <div className={`absolute right-4 top-4 rounded-full bg-gradient-to-r ${post.gradient} px-3 py-1 text-xs font-semibold text-white shadow-lg`}>{post.category}</div>
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
                  <h2 className="mb-3 text-xl font-bold leading-tight text-balance group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="mb-4 text-sm text-slate-400 leading-relaxed text-pretty line-clamp-3">{post.excerpt}</p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span className={`bg-gradient-to-r ${post.gradient} bg-clip-text text-transparent`}>Read Full Article</span>
                    <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${hoveredId === post.id ? "translate-x-1" : ""}`} />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${post.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />
              </article>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center backdrop-blur-sm">
          <TrendingUp className="mx-auto mb-4 h-12 w-12 text-blue-400" />
          <h2 className="mb-4 text-3xl font-bold text-balance">Ready to Transform Your Business?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-400 leading-relaxed text-pretty">
            Let's discuss how custom web development, AI integration, and modern tech solutions can drive your business forward.
          </p>
          <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50">
            <span className="relative z-10">Schedule a Free Consultation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
