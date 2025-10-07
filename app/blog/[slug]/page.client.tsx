"use client";

import { AuthorCard } from "@/components/author-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Calendar, Check, Clock, Code, Copy, Share2, TrendingUp } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  ThreadsIcon,
  ThreadsShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  gradient: string;
};

export default function BlogPostClient({ post, content }: { post: BlogPost; content: React.ReactNode }) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // Get the full URL for sharing
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.title;
  const shareDescription = post.excerpt;

  // Generate embed code
  const embedCode = `<iframe src="${shareUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2000);
    } catch (err) {
      console.error("Failed to copy embed code:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-full w-full object-cover opacity-20" />
          <div className={`absolute inset-0 bg-gradient-to-b ${post.gradient} opacity-30`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
            <span className={`rounded-full bg-gradient-to-r ${post.gradient} px-4 py-1.5 font-semibold text-white`}>{post.category}</span>
            <span className="flex items-center gap-2 text-slate-400">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-2 text-slate-400">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-balance lg:text-6xl">{post.title}</h1>
          <p className="text-xl text-slate-300 leading-relaxed text-pretty">{post.excerpt}</p>
        </div>
      </div>

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-invert prose-lg max-w-none">{content}</div>
        {/* Author Card Section */}
        <div className="mt-16">
          <h3 className="mb-6 text-2xl font-bold">About the Author</h3>
          <AuthorCard
            
          />
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm lg:p-12">
          <div className="flex items-start gap-4">
            <div className={`rounded-xl bg-gradient-to-r ${post.gradient} p-3`}>
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-3 text-2xl font-bold">Ready to Get Started?</h3>
              <p className="mb-6 text-slate-300 leading-relaxed">
                I'd love to help you implement these strategies in your business. Let's schedule a free consultation to discuss your specific needs and how I can help you achieve your goals.
              </p>
              <button className={`rounded-lg bg-gradient-to-r ${post.gradient} px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                Schedule Free Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 flex items-center justify-between border-t border-slate-800 pt-8">
          <Link href="/blog" className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>
          <button onClick={() => setShareDialogOpen(true)} className="flex items-center gap-2 text-slate-400 transition-colors hover:text-white">
            <Share2 className="h-4 w-4" />
            Share article
          </button>
        </div>
      </article>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Share this article</DialogTitle>
            <DialogDescription className="text-slate-400">Share this article with your network or embed it on your website</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Social Media Sharing */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-300">Share on social media</h4>
              <div className="flex flex-wrap gap-3">
                <TwitterShareButton url={shareUrl} title={shareTitle}>
                  <XIcon size={40} round />
                </TwitterShareButton>
                <ThreadsShareButton url={shareUrl} title={shareTitle}>
                  <ThreadsIcon size={40} round />
                </ThreadsShareButton>
                <FacebookShareButton url={shareUrl} title={shareTitle}>
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
                <LinkedinShareButton url={shareUrl} title={shareTitle} summary={shareDescription}>
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
                <RedditShareButton url={shareUrl} title={shareTitle}>
                  <RedditIcon size={40} round />
                </RedditShareButton>
                <WhatsappShareButton url={shareUrl} title={shareTitle}>
                  <WhatsappIcon size={40} round />
                </WhatsappShareButton>
                <EmailShareButton url={shareUrl} subject={shareTitle} body={shareDescription}>
                  <EmailIcon size={40} round />
                </EmailShareButton>
              </div>
            </div>

            {/* Copy Link */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-300">Copy link</h4>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 focus:border-slate-600 focus:outline-none"
                />
                <button onClick={handleCopyLink} className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-700">
                  {copiedLink ? (
                    <>
                      <Check className="h-4 w-4 text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Embed Code */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-slate-300">Embed on your website</h4>
              <div className="space-y-2">
                <textarea
                  value={embedCode}
                  readOnly
                  rows={3}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 font-mono focus:border-slate-600 focus:outline-none resize-none"
                />
                <button onClick={handleCopyEmbed} className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-700">
                  {copiedEmbed ? (
                    <>
                      <Check className="h-4 w-4 text-green-400" />
                      Copied embed code!
                    </>
                  ) : (
                    <>
                      <Code className="h-4 w-4" />
                      Copy embed code
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
