"use client";

import dynamic from 'next/dynamic';
import { ServiceCard } from '@/components/ServiceCard';
import { Button } from '@/components/Button';
import { HardHat, Truck, Trash2, Landmark } from 'lucide-react';
import { siteContent } from '@/app/content/siteContent';

const PriceListDialog = dynamic(
  () => import('@/components/PriceListDialog').then((mod) => mod.PriceListDialog),
  {
    ssr: false,
    loading: () => (
      <Button size="lg" disabled aria-disabled="true">
        Učitavanje cjenika...
      </Button>
    ),
  }
);

const serviceIcons: Record<string, typeof HardHat> = {
  hardhat: HardHat,
  truck: Truck,
  trash: Trash2,
  land: Landmark,
};

const services = siteContent.services.items.map((service) => ({
  ...service,
  icon: serviceIcons[service.iconKey],
}));

export function Services() {

  return (
    <section id="services" className="py-24 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#C4976A] text-xl font-medium mb-4 uppercase tracking-wider">{siteContent.services.eyebrow}</p>
          <h2 className="text-white !text-4xl !font-bold mb-4">
            {siteContent.services.heading}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {siteContent.services.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              href={`/usluge/${service.slug}`}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <PriceListDialog />
        </div>
      </div>
    </section>
  );
}
