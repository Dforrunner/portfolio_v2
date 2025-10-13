'use client';

import { siteConfig } from '@/lib/site-config';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface AuthorCardProps {
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  link?: string;
}

export function AuthorCard({
  name = siteConfig.name,
  title = siteConfig.title,
  description = siteConfig.description,
  image = siteConfig.profileImage,
  link = siteConfig.url,
}: AuthorCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label="Author"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-300 bg-gradient-to-br from-slate-200/50 to-slate-200/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-slate-400 hover:shadow-2xl hover:shadow-purple-500/10 dark:border-slate-800 dark:from-slate-900/50 dark:to-slate-800/50 dark:hover:border-slate-700">
        {/* Animated gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-blue-500/10 ${
            isHovered ? 'opacity-100' : ''
          }`}
        />

        {/* Animated border glow */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 blur-xl transition-opacity duration-500 dark:from-purple-500 dark:via-pink-500 dark:to-blue-500 ${
            isHovered ? 'opacity-20' : ''
          }`}
        />

        <div className="relative flex items-start gap-4">
          {/* Author Image */}
          <div className="relative shrink-0">
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 blur-md transition-all duration-500 ${
                isHovered ? 'scale-110 opacity-50' : ''
              }`}
            />
            <Image
              src={image || '/placeholder.svg'}
              width={256}
              height={208}
              alt={name}
              className={`relative h-16 w-16 rounded-full border-2 border-slate-700 object-cover transition-all duration-500 ${
                isHovered ? 'scale-110 border-purple-500' : ''
              }`}
              loading="lazy"
            />
          </div>

          {/* Author Info */}
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h4 className="text-lg font-bold text-slate-800 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent dark:text-white">
                {name}
              </h4>
              <ExternalLink
                className={`h-4 w-4 text-slate-400 transition-all duration-300 ${
                  isHovered ? 'translate-x-1 -translate-y-1 text-purple-400' : ''
                }`}
              />
            </div>
            <p className="mb-2 text-sm font-medium text-purple-400">{title}</p>
            <p className="text-sm leading-relaxed text-slate-700 transition-colors duration-300 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-300">
              {description}
            </p>
          </div>
        </div>

        {/* Animated particles effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div
            className={`absolute top-1/2 -left-4 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition-all duration-700 dark:bg-purple-500/20 ${
              isHovered ? 'translate-x-8 scale-150' : ''
            }`}
          />
          <div
            className={`absolute top-1/4 -right-4 h-32 w-32 rounded-full bg-pink-500/10 blur-2xl transition-all duration-700 dark:bg-pink-500/20 ${
              isHovered ? '-translate-x-8 scale-150' : ''
            }`}
          />
        </div>
      </div>
    </a>
  );
}
