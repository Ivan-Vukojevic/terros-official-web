"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, FileDown, ChevronDown } from "lucide-react";
import { siteContent } from '@/app/content/siteContent';

const logo = "/images/logo.png";
const company = siteContent.company;
const quickLinks = siteContent.footer.quickLinks;
const legalTexts = siteContent.footer.legalTexts;

export function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black py-14 text-gray-400 tracking-[0.01em]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-7 flex items-center gap-3">
              <Image
                src={logo}
                alt="Terros d.o.o. logo"
                width={48}
                height={48}
                loading="lazy"
                fetchPriority="low"
                sizes="48px"
                className="h-12 w-12 rounded-full"
              />
              <span className="text-xl font-bold text-white">{company.name}</span>
            </div>
            <div className="flex flex-col gap-1 text-left text-[13px] leading-[1.45] text-gray-300 tracking-[0.01em]">
              <p className="m-0">
                <span className="block sm:inline">Sjedište: {company.address}</span>
                <span className="hidden sm:inline">&nbsp;|&nbsp;</span>
                <span className="block sm:inline">OIB: {company.oib}</span>
              </p>
              <p className="m-0">
                <span className="block sm:inline">Upis: {company.registrationCourt}</span>
                <span className="hidden sm:inline">&nbsp;|&nbsp;</span>
                <span className="block sm:inline">MB: {company.companyNumber}</span>
              </p>
              <p className="m-0">
                <span className="block sm:inline">Djelatnost: {company.activityCode}</span>
                <span className="hidden sm:inline">&nbsp;|&nbsp;</span>
                <span className="block sm:inline">Zastupa: {company.director}</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white">Brze veze</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] leading-[1.4] text-gray-400">
              {quickLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full py-1.5 text-left text-gray-300 transition-all duration-200 hover:translate-x-0.5 hover:text-[#C4976A]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white">Kontakt</h4>
            <div className="space-y-3.5 text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C4976A]" />
                <span>{company.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C4976A]" />
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-[#C4976A]">
                  {company.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C4976A]" />
                <span>{company.region}</span>
              </div>
            </div>
          </div>

          {/* Legal Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-white">Pravne info</h4>
            <div className="space-y-3.5 text-gray-300">
              {legalTexts.map((item) => (
                <details key={item.title} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 py-0.5 transition-colors hover:text-[#C4976A] [&::-webkit-details-marker]:hidden">
                    {item.title}
                    <ChevronDown className="h-4 w-4 shrink-0 text-[#C4976A] transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 text-[12px] leading-[1.5] text-gray-400">{item.body}</p>
                </details>
              ))}
              <Link
                href="/api/cjenik-xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-[#C4976A]"
              >
                <FileDown className="h-4 w-4 text-[#C4976A]" />
                Službeni XML cjenik
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-300">
          <p className="tracking-[0.01em]">&copy; {new Date().getFullYear()} Terros d.o.o. Sva prava pridržana.</p>
        </div>
      </div>
    </footer>
  );
}
