import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/app/content/siteContent";

export const metadata: Metadata = {
  title: "Usluge zemljanih radova | Osijek, Slavonija i Baranja",
  description:
    "Strojni iskop, prijevoz materijala, odvoz građevinskog otpada i oblikovanje terena u Osijeku, Slavoniji i Baranji. Provjerite cijene i zatražite ponudu.",
  keywords: [
    "usluge zemljanih radova osijek",
    "strojni iskop slavonija",
    "prijevoz materijala baranja",
    "odvoz otpada osijek",
    "oblikovanje terena slavonija",
  ],
  alternates: {
    canonical: "/usluge",
    languages: {
      "hr-HR": "/usluge",
    },
  },
  openGraph: {
    title: "Usluge zemljanih radova | Osijek, Slavonija i Baranja",
    description:
      "Strojni iskop, prijevoz materijala, odvoz građevinskog otpada i oblikovanje terena za privatne i poslovne projekte u Osijeku i Slavoniji.",
    url: "https://terros.hr/usluge",
    type: "website",
  },
};

export default function ServicesIndexPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="!text-4xl !font-bold mb-4">Usluge</h1>
        <p className="text-gray-300 text-lg mb-10">
          Odaberite uslugu i saznajte više o načinu izvođenja radova i području djelovanja.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {siteContent.services.items.map((service) => (
            <Link
              key={service.slug}
              href={`/usluge/${service.slug}`}
              className="rounded-lg border border-[#2C2C2C] bg-[#1B1B1B] p-6 hover:border-[#C4976A] transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-400 mb-4">{service.description}</p>
              <span className="inline-flex items-center gap-2 text-[#C4976A]">
                Saznaj više
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
