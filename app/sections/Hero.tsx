"use client";

import Image from 'next/image';
import { HeroMobile } from './HeroMobile';
import { Button } from '@/components/Button';
import { siteContent } from '@/app/content/siteContent';
import { ArrowRight, Phone } from 'lucide-react';
import { trackEvent } from '@/app/lib/analytics';

const heroImage = siteContent.hero.desktop.backgroundImage;
const desktopHeroCopy = siteContent.hero.desktop;
const HERO_IMAGE_QUALITY = 55;

export function Hero() {
  return (
    <div id="home">
      <div className="block sm:hidden">
        <HeroMobile />
      </div>
      <div className="hidden sm:block">
        <HeroDefault />
      </div>
    </div>
  );
}

function HeroDefault() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-8 sm:pt-24 sm:pb-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Rušenje stare kuće bagerom - Terros d.o.o."
          fill
          priority
          fetchPriority="high"
          quality={HERO_IMAGE_QUALITY}
          sizes="100vw"
          className="object-cover object-[68%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col justify-between min-h-[calc(100svh-8rem)] sm:block sm:min-h-0">
          <div>
          <h1 className="text-white mb-4 sm:mb-6 !text-[2.4rem] !leading-[1.15] sm:!text-6xl hyphens-auto lg:!text-7xl !font-bold tracking-tight">
            {desktopHeroCopy.title}
          </h1>
          <p className="text-gray-300 text-base sm:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
            {desktopHeroCopy.subtitle}
          </p>
          </div>

          <div className="my-auto sm:my-0 pt-6 sm:pt-0 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-sm sm:max-w-none mx-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto"
              onClick={() => {
                trackEvent('hero_primary_cta_click', {
                  event_category: 'funnel',
                  event_label: 'kontaktirajte_nas',
                  cta_location: 'hero_desktop',
                  cta_target: 'contact',
                });
                scrollToSection('contact');
              }}
            >
              {desktopHeroCopy.primaryCta}
              <Phone className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                trackEvent('hero_secondary_cta_click', {
                  event_category: 'funnel',
                  event_label: 'nase_usluge',
                  cta_location: 'hero_desktop',
                  cta_target: 'services',
                });
                scrollToSection('services');
              }}
            >
              {desktopHeroCopy.secondaryCta}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
