"use client";

import React, { memo, Suspense } from "react";

// Props for your renderer
interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Lazy-load heavy markdown modules only when needed
const LazyMarkdown = React.lazy(async () => {
  const [
    { default: ReactMarkdown },
    { default: remarkGfm },
    { default: remarkMath },
    { default: rehypeKatex },
    { default: rehypeHighlight },
    { default: rehypeSanitize },
    { default: rehypeRaw },
  ] = await Promise.all([
    import("react-markdown"),
    import("remark-gfm"),
    import("remark-math"),
    import("rehype-katex"),
    import("rehype-highlight"),
    import("rehype-sanitize"),
    import("rehype-raw"),
  ]);

  // Define custom renderers
  const components = {
    code({ className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <pre className="rounded-lg bg-zinc-900 text-zinc-100 p-4 overflow-x-auto text-sm">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      ) : (
        <code className="bg-zinc-800 text-zinc-100 px-1.5 py-0.5 rounded-md" {...props}>
          {children}
        </code>
      );
    },

    a({ href, children, ...props }: any) {
      const isYouTube = href && /youtu\.?be/.test(href);
      const isTweet = href && /twitter\.com\/[^/]+\/status\/\d+/.test(href);
      const isCodeSandbox = href && /codesandbox\.io/.test(href);

      // YouTube
      if (isYouTube) {
        const id = href.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/)?.[1];
        if (id) {
          return (
            <div className="my-6 aspect-video w-full overflow-hidden rounded-xl shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          );
        }
      }

      // Tweet
      if (isTweet) {
        return (
          <blockquote className="my-6 border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-300">
            <a href={href} target="_blank" rel="noopener noreferrer">
              View Tweet
            </a>
          </blockquote>
        );
      }

      // CodeSandbox
      if (isCodeSandbox) {
        return (
          <div className="my-6 rounded-xl overflow-hidden shadow-lg aspect-[4/3]">
            <iframe
              src={`${href}?fontsize=14&hidenavigation=1&theme=dark`}
              title="CodeSandbox"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              className="w-full h-full"
            />
          </div>
        );
      }

      // Default link
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          {...props}
        >
          {children}
        </a>
      );
    },

    img({ src, alt, ...props }: any) {
      if (!src) return null;
      return (
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          className="rounded-lg shadow-md max-w-full h-auto"
          {...props}
        />
      );
    },
  };

  // Return wrapped markdown component with correct typing
  const MarkdownComponent: React.FC<MarkdownRendererProps> = ({ content, className }) => (
    <div
      className={`prose prose-neutral dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:font-semibold ${className ?? ""}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeSanitize, rehypeRaw]}
        components={components as any}
      >
        {content}
      </ReactMarkdown>
    </div>
  );

  return { default: MarkdownComponent };
});

const MarkdownRenderer: React.FC<MarkdownRendererProps> = memo(({ content, className }) => {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse text-gray-500 dark:text-gray-400">
          Rendering markdown...
        </div>
      }
    >
      <LazyMarkdown content={content} className={className} />
    </Suspense>
  );
});

MarkdownRenderer.displayName = "MarkdownRenderer";

export default MarkdownRenderer;
