"use client";

import Link from "next/link";
import { ArrowRight, LucideIcon } from 'lucide-react';
import { trackEvent } from "@/app/lib/analytics";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

export function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  return (
    <div className="h-full flex flex-col bg-[#2C2C2C] p-8 rounded-lg hover:bg-[#3C3C3C] transition-all duration-300 group">
      <div className="w-14 h-14 bg-[#C4976A] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-[#0F0F0F]" />
      </div>
      <h3 className="text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
      {href ? (
        <Link
          href={href}
          className="mt-auto pt-5 inline-flex items-center gap-2 text-[#C4976A] hover:text-[#D6AE86] transition-colors"
          onClick={() =>
            trackEvent('service_card_click', {
              event_category: 'funnel',
              event_label: title,
              cta_location: 'services_grid',
              destination_path: href,
            })
          }
        >
          Saznaj više
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : null}
    </div>
  );
}
