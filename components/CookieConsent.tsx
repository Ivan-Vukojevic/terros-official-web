"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

const CONSENT_STORAGE_KEY = "terros_cookie_consent_v1";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

type ConsentState = "granted" | "denied" | null;

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === "granted" || stored === "denied") {
      setConsent(stored);
    }
    setIsHydrated(true);
  }, []);

  const showBanner = isHydrated && consent === null;
  const shouldLoadGa = isHydrated && consent === "granted" && Boolean(GA_MEASUREMENT_ID);

  const gaBootstrap = useMemo(() => {
    return `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
      gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
    `;
  }, []);

  const setConsentAndPersist = (next: Exclude<ConsentState, null>) => {
    setConsent(next);
    window.localStorage.setItem(CONSENT_STORAGE_KEY, next);
  };

  return (
    <>
      {shouldLoadGa ? (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="google-analytics-consent" strategy="lazyOnload">
            {gaBootstrap}
          </Script>
        </>
      ) : null}

      {showBanner ? (
        <>
          {!isMobilePanelOpen ? (
            <button
              type="button"
              onClick={() => setIsMobilePanelOpen(true)}
              className="sm:hidden fixed bottom-4 right-4 z-[60] rounded-full border border-[#3a3a3a] bg-[#161616]/95 px-4 py-2 text-sm text-gray-200 shadow-xl backdrop-blur-md"
            >
              Postavke kolačića
            </button>
          ) : null}

          {isMobilePanelOpen ? (
            <div className="sm:hidden fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-[#2C2C2C] bg-[#121212]/98 px-4 py-4 shadow-2xl backdrop-blur-md">
              <p className="text-xs leading-relaxed text-gray-300">
                Koristimo analitiku za poboljšanje web stranice. Želite li omogućiti analitičke kolačiće?
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-200 hover:bg-[#1D1D1D] transition-colors"
                  onClick={() => setConsentAndPersist("denied")}
                >
                  Odbij
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-md bg-[#C4976A] px-3 py-2 text-sm font-medium text-[#0F0F0F] hover:bg-[#d0a57a] transition-colors"
                  onClick={() => setConsentAndPersist("granted")}
                >
                  Prihvati
                </button>
              </div>
            </div>
          ) : null}

          <div className="hidden sm:block fixed inset-x-0 bottom-0 z-[60] border-t border-[#2C2C2C] bg-[#121212] px-4 py-4 shadow-2xl">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-300">
                Koristimo analitiku radi mjerenja performansi i poboljšanja korisničkog iskustva. Odaberite želite li
                omogućiti analitičke kolačiće.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-200 hover:bg-[#1D1D1D] transition-colors"
                  onClick={() => setConsentAndPersist("denied")}
                >
                  Odbij
                </button>
                <button
                  type="button"
                  className="rounded-md bg-[#C4976A] px-4 py-2 text-sm font-medium text-[#0F0F0F] hover:bg-[#d0a57a] transition-colors"
                  onClick={() => setConsentAndPersist("granted")}
                >
                  Prihvati
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
