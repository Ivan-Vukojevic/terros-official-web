import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { priceList as fallbackPriceList, type PriceItem, type PriceListGroup } from '../data/priceList.ts';

export const GOOGLE_PRICE_SHEET_URL = process.env.GOOGLE_PRICE_SHEET_URL ?? '';
export const LOCAL_PRICE_XML_FILENAME = 'cjenik_Terros_29008566778.xml';
export const LOCAL_PRICE_XML_PATH = path.join(process.cwd(), 'public', LOCAL_PRICE_XML_FILENAME);

export function readLocalPriceXmlFile(): string | null {
  if (!existsSync(LOCAL_PRICE_XML_PATH)) {
    return null;
  }

  return readFileSync(LOCAL_PRICE_XML_PATH, 'utf8');
}

const VALID_FROM_TAGS = [
  'valid_from',
  'validfrom',
  'vrijedi_od',
  'datum_vrijedi_od',
  'datum_od',
  'datum_cjenika',
  'datum_objave',
  'datum_azuriranja',
];

export function decodeXmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

export function normalizeNumber(value: string | number | null | undefined): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  const text = String(value ?? '').trim();
  if (!text) return 0;

  const sanitized = text.replace(/\s+/g, '').replace(/[^0-9,.-]/g, '');
  if (!sanitized || sanitized === '-' || sanitized === '.') return 0;

  if (sanitized.includes(',') && sanitized.includes('.')) {
    const lastComma = sanitized.lastIndexOf(',');
    const lastDot = sanitized.lastIndexOf('.');

    if (lastComma > lastDot) {
      return Number(sanitized.replace(/\./g, '').replace(',', '.')) || 0;
    }

    return Number(sanitized.replace(/,/g, '')) || 0;
  }

  if (sanitized.includes(',')) {
    return Number(sanitized.replace(',', '.')) || 0;
  }

  return Number(sanitized) || 0;
}

export function readIncludedItems(value: string): string[] {
  return value
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => part.replace(/\s+/g, ' '));
}

function parseDateCandidate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const normalized = trimmed.replace(/\.$/, '');
  const date = new Date(normalized);
  if (!Number.isNaN(date.getTime())) {
    return date;
  }

  const numericMatch = normalized.match(/^(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{2,4})$/);
  if (numericMatch) {
    const [, day, month, year] = numericMatch;
    const yearNumber = year.length === 2 ? 2000 + Number(year) : Number(year);
    const parsed = new Date(yearNumber, Number(month) - 1, Number(day));
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  return null;
}

export function formatXmlDate(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';

  const parsed = parseDateCandidate(trimmed);
  if (!parsed) {
    return trimmed;
  }

  const day = Number(parsed.getDate());
  const month = Number(parsed.getMonth() + 1);
  const year = parsed.getFullYear();
  return `${day}.${month}.${year}.`;
}

export function getXmlFieldValue(xmlText: string, tagNames: string[]): string {
  for (const tagName of tagNames) {
    const regex = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
    const match = xmlText.match(regex);
    if (match) {
      return decodeXmlEntities(match[1].replace(/<[^>]+>/g, '').trim());
    }
  }

  return '';
}

function getServiceValue(serviceXml: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const valueMatch = serviceXml.match(regex);
  return valueMatch ? decodeXmlEntities(valueMatch[1].replace(/<[^>]+>/g, '').trim()) : '';
}

export function parsePriceListXml(xmlText: string): { validFrom: string; groups: PriceListGroup[] } {
  const validFrom = formatXmlDate(getXmlFieldValue(xmlText, VALID_FROM_TAGS));
  const serviceMatches = Array.from(xmlText.matchAll(/<usluga\b[^>]*>([\s\S]*?)<\/usluga>/gi));

  if (!serviceMatches.length) {
    return { validFrom, groups: fallbackPriceList };
  }

  const groupsMap = new Map<string, PriceItem[]>();

  for (const match of serviceMatches) {
    const serviceXml = match[1];
    const groupName = getServiceValue(serviceXml, 'kategorija') || 'Ostalo';
    const name = getServiceValue(serviceXml, 'naziv_usluge');
    const unit = getServiceValue(serviceXml, 'jedinica_mjere');
    const categoryId = getServiceValue(serviceXml, 'kategorija_id');
    const price = normalizeNumber(getServiceValue(serviceXml, 'cijena_bez_pdv'));
    const vatRate = normalizeNumber(getServiceValue(serviceXml, 'stopa_pdv'));
    const priceWithVat = normalizeNumber(getServiceValue(serviceXml, 'maloprodajna_cijena'));
    const specialSale = getServiceValue(serviceXml, 'poseban_oblik_prodaje');
    const specialSaleName = getServiceValue(serviceXml, 'naziv_posebnog_oblika');
    const lowestPriceWithoutVat = normalizeNumber(getServiceValue(serviceXml, 'najniza_cijena_30_dana_bez_pdv'));
    const lowestPriceWithVat = normalizeNumber(getServiceValue(serviceXml, 'najniza_cijena_30_dana_s_pdv'));
    const lowestPrice = normalizeNumber(getServiceValue(serviceXml, 'najniza_cijena_30_dana'));
    const oldPriceWithoutVat = normalizeNumber(getServiceValue(serviceXml, 'stara_cijena_bez_pdv'));
    const oldPriceWithVat = normalizeNumber(getServiceValue(serviceXml, 'stara_cijena_s_pdv'));
    const oldPrice = normalizeNumber(getServiceValue(serviceXml, 'stara_cijena'));
    const oldPriceDate = formatXmlDate(getServiceValue(serviceXml, 'datum_stare_cijene'));
    const included = readIncludedItems(getServiceValue(serviceXml, 'ukljuceno'));
    const description = getServiceValue(serviceXml, 'podnaslov');

    if (!name || !unit) continue;

    const currentItems = groupsMap.get(groupName) ?? [];
    currentItems.push({
      name,
      unit,
      price,
      priceWithVat: priceWithVat || undefined,
      vatRate: vatRate || undefined,
      categoryId: categoryId || undefined,
      specialSale: specialSale || undefined,
      specialSaleName: specialSaleName || undefined,
      date: validFrom,
      oldPriceWithVat: oldPriceWithVat > 0 ? oldPriceWithVat : undefined,
      oldPrice: oldPrice > 0 ? oldPrice : undefined,
      oldPriceWithoutVat: oldPriceWithoutVat > 0 ? oldPriceWithoutVat : undefined,
      oldPriceDate: oldPriceDate || undefined,
      description: description || undefined,
      included: included.length ? included : undefined,
      lowestPrice: lowestPrice || undefined,
      lowestPriceWithoutVat: lowestPriceWithoutVat > 0 ? lowestPriceWithoutVat : undefined,
      lowestPriceWithVat: lowestPriceWithVat > 0 ? lowestPriceWithVat : undefined,
    });
    groupsMap.set(groupName, currentItems);
  }

  if (groupsMap.size === 0) {
    return { validFrom, groups: fallbackPriceList };
  }

  return {
    validFrom,
    groups: Array.from(groupsMap.entries()).map(([group, items]) => ({ group, items })),
  };
}

export async function fetchPriceListData(url = GOOGLE_PRICE_SHEET_URL): Promise<{ validFrom: string; groups: PriceListGroup[] }> {
  const localXml = readLocalPriceXmlFile();

  if (!url) {
    if (localXml) {
      return parsePriceListXml(localXml);
    }

    throw new Error('Missing GOOGLE_PRICE_SHEET_URL and local price XML was not found. Run the XML generator script first.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      if (localXml) {
        return parsePriceListXml(localXml);
      }

      throw new Error(`Price list fetch failed with status ${response.status}`);
    }

    const xmlText = await response.text();
    return parsePriceListXml(xmlText);
  } catch (error) {
    if (localXml) {
      return parsePriceListXml(localXml);
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Price list fetch timed out after 15s.');
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchPriceListXml(url = GOOGLE_PRICE_SHEET_URL): Promise<PriceListGroup[]> {
  return (await fetchPriceListData(url)).groups;
}
