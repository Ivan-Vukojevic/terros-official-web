import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stranica nije pronađena | Terros d.o.o.",
  description:
    "Tražena stranica ne postoji ili je premještena. Povratak na početnu stranicu Terros d.o.o.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0F0F0F] px-6 text-white">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-[#D7D0C7]/70">404</p>
        <h1 className="mt-4 text-3xl font-semibold">Stranica nije pronađena</h1>
        <p className="mt-3 text-[#D7D0C7]">
          Tražena stranica ne postoji ili je premještena.
        </p>
      </div>
    </main>
  );
}
