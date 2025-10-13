'use client';

import { cn } from '@/lib/utils';
import React, { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { highlight } from 'sugar-high';
import CopyButton from './copy-button';
import FileDownload from './file-download';
import VideoPlayer from './video-player';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const CodeBlock = ({
  language,
  value,
  className,
}: {
  language?: string;
  value: string;
  className: string;
}) => {
  return (
    <pre className="not-prose group relative overflow-y-hidden rounded-lg border border-zinc-300 p-3 pt-5 text-zinc-600 lg:p-6 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
      {language && !['text', 'plaintext'].includes(language) && (
        <div className="absolute top-1 left-1 text-xs opacity-70">{language}</div>
      )}
      <CopyButton text={value} alwaysShow className="absolute top-1 right-1" />
      <code
        className={cn(className, 'text-sm')}
        dangerouslySetInnerHTML={{ __html: highlight(value) }}
      />
    </pre>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = memo(({ content, className }) => {
  const components = useMemo(
    () => ({
      pre({ children }: any) {
        return children;
      },
      code({ inline, className, children, ...props }: any) {
        const language = /language-(\w+)/.exec(className || '')?.[1];
        const codeString = String(children).trim();

        if (inline) {
          return (
            <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[0.9em] text-pink-400">
              {children}
            </code>
          );
        }

        return (
          <CodeBlock language={language} value={codeString} className={className} {...props} />
        );
      },
      a({ href, children }: any) {
        if (href?.match(/\.(mp4|webm|ogg)$/i))
          return <VideoPlayer src={href} title={children?.toString() || 'Video'} />;
        if (href?.match(/\.(pdf|docx?|zip|rar|txt)$/i))
          return <FileDownload src={href} title={children?.toString() || 'File'} />;
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline underline-offset-2 transition-colors hover:text-blue-400"
            aria-label={'Open Link'}
          >
            {children}
          </a>
        );
      },
      img({ src, alt }: any) {
        if (!src) return null;
        if (src.match(/\.(mp4|webm|ogg)$/i))
          return <VideoPlayer src={src} title={alt || 'Video'} />;
        return (
          <figure className="my-8">
            <img
              src={src}
              alt={alt ?? ''}
              loading="lazy"
              className="h-auto max-w-full rounded-lg border border-zinc-800 shadow-lg"
            />
            {alt && (
              <figcaption className="mt-3 text-center text-sm text-gray-400 italic">
                {alt}
              </figcaption>
            )}
          </figure>
        );
      },
    }),
    []
  );

  return (
    <div className={cn('prose prose-neutral dark:prose-invert max-w-none', className)}>
      <ReactMarkdown rehypePlugins={[rehypeKatex, rehypeRaw]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
});

MarkdownRenderer.displayName = 'MarkdownRenderer';
export default MarkdownRenderer;
