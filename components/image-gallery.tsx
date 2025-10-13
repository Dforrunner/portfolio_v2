'use client';

import type React from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface GalleryImage {
  url: string;
  caption?: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedIndex(null), 300);
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="space-y-6">
        {title && (
          <h2 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group border-card-services bg-card-services relative aspect-video overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <Image
                src={image.url || '/placeholder.svg'}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute right-0 bottom-0 left-0 p-4">
                  {image.caption && (
                    <p className="text-sm font-medium text-balance text-white">{image.caption}</p>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                    <Maximize2 className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="h-[95vh] max-w-[95vw] border-0 bg-black/95 p-0 backdrop-blur-xl"
          onKeyDown={handleKeyDown}
        >
          {selectedIndex !== null && (
            <div className="relative h-full w-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                {selectedIndex + 1} / {images.length}
              </div>

              {/* Main Image - Fixed height calculation to account for caption and thumbnails */}
              <div
                className={`relative w-full ${
                  images[selectedIndex].caption
                    ? 'h-[calc(100%-180px)]'
                    : images.length > 1
                      ? 'h-[calc(100%-100px)]'
                      : 'h-full'
                } p-4 md:p-8`}
              >
                <div className="animate-fade-in relative h-full w-full">
                  <Image
                    src={images[selectedIndex].url || '/placeholder.svg'}
                    alt={images[selectedIndex].alt}
                    fill
                    className="object-contain"
                    loading="lazy"
                    sizes="95vw"
                  />
                </div>
              </div>

              {/* Caption */}
              {images[selectedIndex].caption && (
                <div className="absolute right-0 bottom-[100px] left-0 border-t border-white/10 bg-black/50 p-6 text-center backdrop-blur-sm">
                  <p className="text-lg text-white">{images[selectedIndex].caption}</p>
                </div>
              )}

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-4 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="absolute right-0 bottom-0 left-0 overflow-x-auto border-t border-white/10 bg-black/50 p-4 backdrop-blur-sm">
                  <div className="flex min-w-max justify-center gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                          index === selectedIndex
                            ? 'scale-110 border-blue-500'
                            : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={image.url || '/placeholder.svg'}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
