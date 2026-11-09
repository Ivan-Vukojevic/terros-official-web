"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteContent } from '@/app/content/siteContent';

type GalleryImage = { src: string; alt: string; label: string };

const galleryImages = siteContent.gallery.images satisfies GalleryImage[];
const GALLERY_IMAGE_WIDTH = 1600;
const GALLERY_IMAGE_HEIGHT = 900;
const GALLERY_IMAGE_QUALITY = 55;

function LabelBlock({ label }: { label: string }) {
  const [main, sub] = label.split(' / ');
  return (
    <>
      <span className="block text-white font-bold text-lg sm:text-xl leading-tight tracking-tight">{main}</span>
      {sub && <span className="block text-gray-300 text-sm mt-1">{sub}</span>}
    </>
  );
}

function MobileCategoryCard({
  label,
  items,
  onOpen,
}: {
  label: string;
  items: { image: GalleryImage; index: number }[];
  onOpen: (index: number) => void;
}) {
  const [slide, setSlide] = useState(0);

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="flex overflow-x-auto snap-x snap-mandatory"
        onScroll={(e) => {
          const el = e.currentTarget;
          setSlide(Math.round(el.scrollLeft / el.clientWidth));
        }}
      >
        {items.map(({ image, index }) => (
          <button
            key={index}
            type="button"
            aria-label={`Otvori sliku: ${image.alt}`}
            onClick={() => onOpen(index)}
            className="w-full shrink-0 snap-center"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={GALLERY_IMAGE_WIDTH}
              height={GALLERY_IMAGE_HEIGHT}
              quality={GALLERY_IMAGE_QUALITY}
              sizes="(max-width: 767px) 92vw, 100vw"
              loading="lazy"
              className="w-full h-80 object-cover"
              style={{ width: '100%', height: '20rem' }}
            />
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-16 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none">
        <div className="w-8 h-0.5 bg-[#C4976A] mb-2" />
        <LabelBlock label={label} />
      </div>

      {items.length > 1 && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/50 backdrop-blur-sm pointer-events-none">
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === slide ? 'w-4 bg-[#C4976A]' : 'w-1.5 bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Gallery() {
  const images = galleryImages;

  const mergedLabels: Record<string, string> = {
    'Usluge transporta s dizalicom / Prijevoz i dizalica': 'Usluge transporta s dizalicom / Dostava i istovar materijala',
    'Dostava i istovar materijala / Prijevoz i dizalica': 'Usluge transporta s dizalicom / Dostava i istovar materijala',
  };

  const categories = images.reduce<{ label: string; items: { image: GalleryImage; index: number }[] }[]>(
    (acc, image, index) => {
      const label = mergedLabels[image.label] ?? image.label;
      const group = acc.find((g) => g.label === label);
      if (group) group.items.push({ image, index });
      else acc.push({ label, items: [{ image, index }] });
      return acc;
    },
    []
  );

  categories.forEach((c) => {
    const i = c.items.findIndex((it) => it.image.src === '/images/rezanje-betona-pilom-terros.avif');
    if (i > 0) c.items.unshift(...c.items.splice(i, 1));
  });

  const [active, setActive] = useState<number | null>(null);
  const prev = () => setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  const next = () => setActive((i) => (i === null ? i : (i + 1) % images.length));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    const lock = (e: Event) => e.preventDefault();
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', lock, { passive: false });
    window.addEventListener('touchmove', lock, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', lock);
      window.removeEventListener('touchmove', lock);
    };
  }, [active]);

  const current = active === null ? null : images[active];

  return (
    <section id="gallery" className="py-24 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C4976A] text-xl font-medium mb-4 uppercase tracking-wider">Naši radovi</p>
          <h2 className="text-white !text-4xl !font-bold mb-4">
            Oprema i projekti
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pogledajte našu modernu flotu strojeva i završene projekte.
          </p>
        </div>

        <div className="md:hidden space-y-6">
          {categories.map((cat) => (
            <MobileCategoryCard key={cat.label} label={cat.label} items={cat.items} onOpen={setActive} />
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`Otvori sliku: ${image.alt}`}
              onClick={() => setActive(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActive(index);
                }
              }}
              className="relative group overflow-hidden rounded-xl cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4976A]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={GALLERY_IMAGE_WIDTH}
                height={GALLERY_IMAGE_HEIGHT}
                quality={GALLERY_IMAGE_QUALITY}
                sizes="(min-width: 1280px) 608px, (min-width: 768px) 46vw, 100vw"
                loading="lazy"
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ width: '100%', height: '20rem' }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {'label' in image && image.label && (
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-16 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                  <div className="w-8 h-0.5 bg-[#C4976A] mb-2" />
                  <LabelBlock label={image.label} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.label}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setActive(null)}
        >
            <button
              aria-label="Zatvori"
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              aria-label="Prethodna slika"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-[#C4976A] hover:text-[#0F0F0F] text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              aria-label="Sljedeća slika"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-[#C4976A] hover:text-[#0F0F0F] text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              key={active}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[78vh] sm:max-h-[82vh]"
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={GALLERY_IMAGE_WIDTH}
                height={GALLERY_IMAGE_HEIGHT}
                quality={GALLERY_IMAGE_QUALITY}
                sizes="92vw"
                priority
                className="max-w-[92vw] max-h-[78vh] sm:max-h-[82vh] object-contain rounded-lg"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-10 text-center bg-gradient-to-t from-black to-transparent pointer-events-none">
              {(() => {
                const [main, sub] = current.label.split(' / ');
                return (
                  <>
                    <div className="w-10 h-0.5 bg-[#C4976A] mx-auto mb-3" />
                    <p className="text-white font-bold text-xl sm:text-2xl leading-tight tracking-tight">{main}</p>
                    {sub && <p className="text-gray-300 text-sm sm:text-base mt-1.5">{sub}</p>}
                    <p className="text-gray-500 text-xs mt-3 tracking-widest">
                      {active! + 1} / {images.length}
                    </p>
                  </>
                );
              })()}
            </div>
        </div>
      ) : null}
    </section>
  );
}
