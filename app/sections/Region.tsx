"use client";

import { MapPin } from 'lucide-react';

export function Region() {
  return (
    <section className="py-24 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#2C2C2C] to-[#3C3C3C] rounded-2xl p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C4976A] rounded-full mb-6">
              <MapPin className="w-8 h-8 text-[#0F0F0F]" />
            </div>
            <h2 className="text-white !text-3xl !font-bold mb-6">
              Pokrivamo Slavoniju i Baranju
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Podržavamo i male privatne projekte i velika gradilišta diljem
              <strong className="text-white"> Slavonije i Baranje</strong>. Nijedan projekt nije prevelik ni premali
              za naš iskusni tim i modernu mehanizaciju.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
