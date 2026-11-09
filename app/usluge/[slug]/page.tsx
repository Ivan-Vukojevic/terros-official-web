import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Phone } from "lucide-react";
import { siteContent } from "@/app/content/siteContent";

type ServiceSlug = keyof typeof siteContent.servicePages;

const baseUrl = "https://terros.hr";
const fallbackDescription =
  "Profesionalni zemljani radovi i građevinska logistika u Osijeku, Slavoniji i Baranji: strojni iskop, priprema terena, prijevoz materijala i odvoz građevinskog otpada.";

function getServiceBySlug(slug: string) {
  return siteContent.servicePages[slug as ServiceSlug];
}

export function generateStaticParams() {
  return Object.keys(siteContent.servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Usluga nije pronađena | Terros d.o.o.",
      description: fallbackDescription,
      robots: {
        index: false,
        follow: false,
      },
      openGraph: {
        title: "Usluga nije pronađena | Terros d.o.o.",
        description: fallbackDescription,
        type: "website",
        url: `${baseUrl}/usluge`,
        siteName: "Terros d.o.o.",
      },
      twitter: {
        card: "summary_large_image",
        title: "Usluga nije pronađena | Terros d.o.o.",
        description: fallbackDescription,
      },
    };
  }

  const canonicalPath = `/usluge/${slug}`;

  return {
    title: service.seoTitle,
    description: service.seoDescription || fallbackDescription,
    keywords: service.keywords,
    alternates: {
      canonical: canonicalPath,
      languages: {
        "hr-HR": canonicalPath,
      },
    },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription || fallbackDescription,
      type: "article",
      url: `${baseUrl}${canonicalPath}`,
      siteName: "Terros d.o.o.",
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription || fallbackDescription,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.seoDescription,
    areaServed: "Slavonija i Baranja",
    provider: {
      "@type": "LocalBusiness",
      name: siteContent.company.name,
      telephone: siteContent.company.phone,
      email: siteContent.company.email,
      address: siteContent.company.address,
    },
  };

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-[#C4976A] hover:text-[#D6AE86] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Povratak na usluge
        </Link>

        <h1 className="!text-4xl !font-bold mb-4">{service.title}</h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-10">{service.intro}</p>

        <section className="rounded-xl border border-[#2C2C2C] bg-[#181818] p-7 mb-10">
          <h2 className="!text-2xl !font-semibold mb-5">Što uključuje usluga</h2>
          <ul className="space-y-3">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-gray-200">
                <CheckCircle2 className="w-5 h-5 text-[#C4976A] mt-0.5 shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-[#2C2C2C] bg-[#141414] p-7">
          <h2 className="!text-2xl !font-semibold mb-3">Zatražite ponudu</h2>
          <p className="text-gray-300 mb-5">
            Kontaktirajte nas za procjenu i termin izvođenja radova za ovu uslugu.
          </p>
          <a
            href="tel:+385911546041"
            className="inline-flex items-center gap-2 rounded-md bg-[#C4976A] px-5 py-3 text-[#0F0F0F] font-medium hover:bg-[#d0a57a] transition-colors"
          >
            <Phone className="w-5 h-5" />
            Nazovite odmah
          </a>
        </section>
      </div>
    </main>
  );
}
