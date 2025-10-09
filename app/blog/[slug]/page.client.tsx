"use client";

import { AuthorCard } from "@/components/author-card";
import { ContactDialog } from "@/components/contact-dialog";
import MarkdownRenderer from "@/components/markdown-renderer";
import { ShareDialog } from "@/components/share-dialog";
import { ArrowLeft, Calendar, Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../post.util";

export default function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="h-full w-full object-cover opacity-20"
            width={1080}
            height={800}
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${post.gradient} opacity-30`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-gray-100 dark:via-slate-950/50 dark:to-slate-950" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-800 dark:text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
            <span
              className={`rounded-full bg-gradient-to-r ${post.gradient} px-4 py-1.5 font-semibold text-white`}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-balance lg:text-4xl">
            {post.title}
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-300 leading-relaxed text-pretty">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <MarkdownRenderer content={post.content} />
          </div>

        {/* Author Card Section */}
        <div className="mt-16">
          <h3 className="mb-6 text-2xl font-bold">About the Author</h3>
          <AuthorCard />
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl border border-slate-300 dark:border-slate-800 bg-slate-200/30 dark:bg-slate-900/50 p-8 backdrop-blur-sm lg:p-12">
          <div className="flex items-start gap-4">
            <div className={`rounded-xl bg-gradient-to-r ${post.gradient} p-3`}>
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-3 text-2xl font-bold">Ready to Get Started?</h3>
              <p className="mb-6 text-slate-400 dark:text-slate-300 leading-relaxed">
                I'd love to help you implement these strategies in your business. Let's schedule a
                free consultation to discuss your specific needs and how I can help you achieve your
                goals.
              </p>
              <ContactDialog
                trigger={
                  <button
                    className={`rounded-lg bg-gradient-to-r ${post.gradient} px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`}
                  >
                    Schedule Free Consultation
                  </button>
                }
              />
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 flex items-center justify-between border-t border-slate-800 pt-8">
          <Link
            href="/blog"
            className="flex items-center gap-2 dark:text-slate-400 text-slate-600 hover:text-slate-800 transition-colors dark:hover:text-white cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
          <ShareDialog title={post.title} description={post.excerpt} />
        </div>
      </article>
    </>
  );
}
