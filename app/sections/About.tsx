"use client";

import Image from 'next/image';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { siteContent } from '@/app/content/siteContent';

const aboutContent = siteContent.about;

export function About() {
  return (
    <section id="about" className="py-24 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#C4976A] text-xl font-medium mb-4 uppercase tracking-wider">{aboutContent.eyebrow}</p>
            <h2 className="text-white mb-6 !text-4xl !font-bold">{aboutContent.heading}</h2>

            {aboutContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-gray-400 mb-6 leading-relaxed text-lg">
                {paragraph.startsWith('Terros d.o.o.') ? (
                  <><strong className="text-white">Terros d.o.o.</strong>{paragraph.slice('Terros d.o.o.'.length)}</>
                ) : (
                  paragraph
                )}
              </p>
            ))}

            <div className="grid sm:grid-cols-2 gap-4">
              {aboutContent.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#C4976A] flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={aboutContent.image}
                alt={aboutContent.imageAlt}
                width={1600}
                height={1000}
                quality={55}
                loading="lazy"
                fetchPriority="low"
                sizes="(min-width: 1280px) 608px, (min-width: 1024px) 44vw, 100vw"
                className="w-full h-[500px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
