"use client";

import Image from 'next/image';
import { Phone, ArrowDown, MapPin } from 'lucide-react';
import { siteContent } from '@/app/content/siteContent';
import { trackEvent } from '@/app/lib/analytics';

const heroImage = siteContent.hero.mobile.backgroundImage;
const mobileHeroCopy = siteContent.hero.mobile;
const MOBILE_HERO_IMAGE_QUALITY = 55;

export function HeroMobile() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-black">
      <Image
        src={heroImage}
        alt="Rušenje stare kuće bagerom - Terros d.o.o."
        fill
        priority
        fetchPriority="high"
        quality={MOBILE_HERO_IMAGE_QUALITY}
        sizes="100vw"
        className="absolute inset-x-0 -top-[8svh] h-[108svh] object-cover object-[68%_18%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent h-32" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 via-45% to-transparent to-75%" />

      <div className="relative z-10 px-5 pb-8 pt-40">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-gray-200">
            <MapPin className="w-3.5 h-3.5 text-[#C4976A]" />
            {mobileHeroCopy.eyebrow}
          </span>

          <h1 className="text-white !text-[2.1rem] !leading-[1.1] !font-bold tracking-tight mb-3">
            {mobileHeroCopy.title.split(' i ')[0]} <span className="text-[#C4976A]">{mobileHeroCopy.title.split(' i ')[1]}</span>
          </h1>
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            {mobileHeroCopy.subtitle}
          </p>

          <button
            type="button"
            onClick={() => {
              trackEvent('hero_primary_cta_click', {
                event_category: 'funnel',
                event_label: 'kontaktirajte_nas',
                cta_location: 'hero_mobile',
                cta_target: 'contact',
              });
              scrollToSection('contact');
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#C4976A] text-[#0F0F0F] font-semibold active:scale-[0.98] transition-transform"
          >
            <Phone className="w-5 h-5" />
            {mobileHeroCopy.primaryCta}
          </button>
          <button
            type="button"
            onClick={() => {
              trackEvent('hero_secondary_cta_click', {
                event_category: 'funnel',
                event_label: 'pogledaj_usluge',
                cta_location: 'hero_mobile',
                cta_target: 'services',
              });
              scrollToSection('services');
            }}
            className="w-full inline-flex items-center justify-center gap-2 mt-2 py-3 text-[#C4976A] font-medium"
          >
            {mobileHeroCopy.secondaryCta}
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
