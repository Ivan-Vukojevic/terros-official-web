"use client";

type GtagParams = Record<string, string | number | boolean>;

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function trackEvent(eventName: string, params: GtagParams = {}) {
  if (typeof window === "undefined") return;

  const gtag = (window as GtagWindow).gtag;
  if (typeof gtag !== "function") return;

  const pagePath = `${window.location.pathname}${window.location.search}`;

  gtag("event", eventName, {
    page_path: pagePath,
    ...params,
  });
}
