import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Services } from "./sections/Services";
import { siteContent } from "./content/siteContent";

const Faq = dynamic(() => import("./sections/Faq").then((mod) => mod.Faq));
const Region = dynamic(() => import("./sections/Region").then((mod) => mod.Region));
const Gallery = dynamic(() => import("./sections/Gallery").then((mod) => mod.Gallery));
const Contact = dynamic(() => import("./sections/Contact").then((mod) => mod.Contact));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteContent.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: "Zemljani radovi Osijek | Terros d.o.o.",
  description:
    "Profesionalni zemljani radovi i građevinska logistika u Osijeku, Slavoniji i Baranji: strojni iskop, priprema terena, prijevoz materijala i odvoz građevinskog otpada.",
  keywords: [
    "zemljani radovi osijek",
    "strojni iskop osijek",
    "prijevoz materijala osijek",
    "odvoz otpada osijek",
    "građevinska logistika Slavonija",
    "Terros d.o.o.",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "hr-HR": "/",
    },
  },
  openGraph: {
    title: "Terros d.o.o. | Zemljani radovi Osijek, Slavonija i Baranja",
    description:
      "Pružamo strojni iskop, pripremu terena, prijevoz materijala i odvoz građevinskog otpada za projekte u Osijeku, Slavoniji i Baranji.",
    url: "https://terros.hr",
    type: "website",
    siteName: "Terros d.o.o.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terros d.o.o. | Zemljani radovi Osijek, Slavonija i Baranja",
    description:
      "Zemljani radovi i građevinska logistika u Osijeku, Slavoniji i Baranji.",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-[#0F0F0F]">
        <Navigation />
        <Hero />
        <About />
        <Services />
        <Faq />
        <Region />
        <Gallery />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
