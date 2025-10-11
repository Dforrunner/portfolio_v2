"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Code, Copy, Share2 } from "lucide-react";
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

interface Props {
  title: string;
  description: string;
  children?: React.ReactNode;
  triggerTitle?: string;
}
export function ShareDialog({
  title,
  description,
  children,
  triggerTitle = "Share article ",
}: Props) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // Get the full URL for sharing
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = title;
  const shareDescription = description;

  // Generate embed code
  const embedCode = `<iframe src="${shareUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ?? (
          <button className="flex items-center gap-2 dark:text-slate-400 text-slate-600 hover:text-slate-800 transition-colors dark:hover:text-white cursor-pointer">
            <Share2 className="h-4 w-4" />
            {triggerTitle}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md dark:bg-slate-900 dark:border-slate-800 dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Share this article</DialogTitle>
          <DialogDescription className="dark:text-slate-400">
            Share this article with your network or embed it on your website
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Social Media Sharing */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Share on social media
            </h4>
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
            <h4 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Copy link
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 focus:border-slate-400 dark:focus:border-slate-600 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 rounded-lg border border-slate-600 dark:bg-slate-800 px-4 py-2 text-sm font-medium transition-colors dark:hover:bg-slate-700"
              >
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
            <h4 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Embed on your website
            </h4>
            <div className="space-y-2">
              <textarea
                value={embedCode}
                readOnly
                rows={3}
                className="w-full rounded-lg border border-slate-400 dark:border-slate-700 dark:bg-slate-800 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 font-mono focus:border-slate-600 focus:outline-none resize-none"
              />
              <button
                onClick={handleCopyEmbed}
                className="flex items-center gap-2 rounded-lg border border-slate-400 dark:border-slate-700 dark:bg-slate-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-700"
              >
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
  );
}
