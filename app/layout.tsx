import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";

const siteUrl = "https://terros.hr";
const companyName = "Terros d.o.o.";
const companyPhone = "+385911546041";
const companyEmail = "terrosdoo@gmail.com";
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "";
const googleBusinessProfileUrl = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL ?? "";
const facebookPageUrl = process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL ?? "";
const instagramProfileUrl = process.env.NEXT_PUBLIC_INSTAGRAM_PROFILE_URL ?? "";
const linkedinPageUrl = process.env.NEXT_PUBLIC_LINKEDIN_PAGE_URL ?? "";
const CookieConsent = dynamic(
  () => import("@/components/CookieConsent").then((mod) => mod.CookieConsent)
);

const sameAsProfiles = [
  googleBusinessProfileUrl,
  facebookPageUrl,
  instagramProfileUrl,
  linkedinPageUrl,
].filter(Boolean);

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: companyName,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/images/rusenje-stare-kuce-bagerom-terros.avif`,
  telephone: companyPhone,
  email: companyEmail,
  description:
    "Terros d.o.o. pruža profesionalne zemljane radove, strojni iskop, pripremu terena, građevinsku logistiku i odvoz građevinskog otpada na području Osijeka, Slavonije i Baranje.",
  areaServed: ["Slavonija", "Baranja", "Osijek", "Hrvatska"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Osječka ulica 10",
    addressLocality: "Sarvaš",
    postalCode: "31000",
    addressRegion: "Osječko-baranjska županija",
    addressCountry: "HR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: companyPhone,
    contactType: "customer service",
    areaServed: "HR",
    availableLanguage: ["Croatian"],
  },
  sameAs: sameAsProfiles,
  priceRange: "€€",
  openingHours: "Mo-Fr 08:00-17:00",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Usluge zemljanih radova i građevinske logistike",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Strojni iskop",
          areaServed: "Slavonija i Baranja",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Prijevoz materijala",
          areaServed: "Slavonija i Baranja",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Odvoz građevinskog otpada",
          areaServed: "Slavonija i Baranja",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Oblikovanje terena",
          areaServed: "Slavonija i Baranja",
        },
      },
    ],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Terros d.o.o. | Zemljani radovi Osijek, Slavonija i Baranja",
    template: "%s | Terros d.o.o.",
  },
  description:
    "Profesionalni zemljani radovi i građevinska logistika u Osijeku, Slavoniji i Baranji: strojni iskop, priprema terena, prijevoz materijala i odvoz građevinskog otpada.",
  keywords: [
    "zemljani radovi",
    "zemljani radovi osijek",
    "građevinska logistika",
    "iskop",
    "strojni iskop osijek",
    "priprema terena",
    "odvoz otpada",
    "odvoz građevinskog otpada osijek",
    "prijevoz materijala osijek",
    "rušenje objekata",
    "Slavonija",
    "Baranja",
    "Osijek",
    "Osječko-baranjska županija",
    "Terros d.o.o.",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "hr-HR": "/",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: siteUrl,
    title: "Terros d.o.o. | Zemljani radovi Osijek, Slavonija i Baranja",
    description:
      "Vaš pouzdani partner za strojni iskop, pripremu terena, prijevoz materijala i građevinsku logistiku u Osijeku, Slavoniji i Baranji.",
    siteName: "Terros d.o.o.",
    images: [
      {
        url: "/images/rusenje-stare-kuce-bagerom-terros.avif",
        width: 1200,
        height: 630,
        alt: "Terros d.o.o. - zemljani radovi i građevinska logistika",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terros d.o.o. | Zemljani radovi Osijek, Slavonija i Baranja",
    description:
      "Profesionalni zemljani radovi i građevinska logistika u Osijeku, Slavoniji i Baranji.",
    images: ["/images/rusenje-stare-kuce-bagerom-terros.avif"],
  },
  verification: {
    google: googleSiteVerification || undefined,
    other: bingSiteVerification
      ? {
          "msvalidate.01": bingSiteVerification,
        }
      : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
