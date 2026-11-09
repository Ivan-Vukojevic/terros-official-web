import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { priceList, validFrom } from "../app/data/priceList.ts";
import { LOCAL_PRICE_XML_FILENAME } from "../app/lib/priceXml.ts";

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "ostalo";

const xmlEntry = (group: string, item: { name: string; unit: string; price: number; description?: string; included?: string[]; date?: string; priceWithVat?: number; }) => {
  const priceWithVat = item.priceWithVat ?? item.price * 1.25;
  const oldPrice = item.price;
  const included = item.included?.join("; ") ?? "";

  return `  <usluga>
    <kategorija>${esc(group)}</kategorija>
    <kategorija_id>${esc(slugify(group))}</kategorija_id>
    <naziv_usluge>${esc(item.name)}</naziv_usluge>
    <podnaslov>${esc(item.description ?? "")}</podnaslov>
    <cijena_bez_pdv>${esc(item.price.toFixed(2))}</cijena_bez_pdv>
    <stopa_pdv>25</stopa_pdv>
    <maloprodajna_cijena>${esc(priceWithVat.toFixed(2))}</maloprodajna_cijena>
    <jedinica_mjere>${esc(item.unit)}</jedinica_mjere>
    <poseban_oblik_prodaje>NE</poseban_oblik_prodaje>
    <naziv_posebnog_oblika/>
    <najniza_cijena_30_dana_bez_pdv>0.00</najniza_cijena_30_dana_bez_pdv>
    <najniza_cijena_30_dana_s_pdv>0.00</najniza_cijena_30_dana_s_pdv>
    <stara_cijena_bez_pdv>${esc(oldPrice.toFixed(2))}</stara_cijena_bez_pdv>
    <stara_cijena_s_pdv>${esc((oldPrice * 1.25).toFixed(2))}</stara_cijena_s_pdv>
    <datum_stare_cijene>${esc(item.date ?? validFrom)}</datum_stare_cijene>
    <ukljuceno>${esc(included)}</ukljuceno>
  </usluga>`;
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<cjenik>
  <valid_from>${esc(validFrom)}</valid_from>
  ${priceList.map((group) => group.items.map((item) => xmlEntry(group.group, item)).join("\n")).join("\n")}
</cjenik>
`;

const outputDir = path.join(process.cwd(), "public");
mkdirSync(outputDir, { recursive: true });
writeFileSync(path.join(outputDir, LOCAL_PRICE_XML_FILENAME), xml);
