"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { siteContent } from "@/app/content/siteContent";

const faq = siteContent.faq;

export function Faq() {
  return (
    <section id="faq" className="py-24 bg-[#151515]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#C4976A] text-xl font-medium mb-4 uppercase tracking-wider">{faq.eyebrow}</p>
          <h2 className="text-white !text-4xl !font-bold mb-4">{faq.heading}</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">{faq.description}</p>
        </div>

        <Accordion.Root type="single" collapsible className="space-y-3">
          {faq.items.map((item, index) => (
            <div key={item.question}>
              <Accordion.Item value={`faq-${index}`} className="rounded-lg border border-[#2C2C2C] overflow-hidden">
                <Accordion.Header>
                  <Accordion.Trigger className="group w-full flex items-center justify-between gap-4 px-5 py-4 bg-[#202020] text-left text-white hover:text-[#C4976A] transition-colors">
                    <span>{item.question}</span>
                    <ChevronDown className="w-5 h-5 text-[#C4976A] transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-5 py-4 bg-[#161616] text-gray-300 leading-relaxed">
                  {item.answer}
                </Accordion.Content>
              </Accordion.Item>
            </div>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
