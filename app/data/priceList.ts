// PLACEHOLDER cijene — zamijeniti stvarnim vrijednostima
export const validFrom = '10.9.2026.';

export const VAT_RATE = 0.25;

export type PriceItem = {
  name: string;
  unit: string;
  price: number;
  priceWithVat?: number;
  vatRate?: number;
  categoryId?: string;
  specialSale?: string;
  specialSaleName?: string;
  date: string;
  datePrice?: number;
  oldPrice?: number;
  oldPriceWithoutVat?: number;
  oldPriceWithVat?: number;
  oldPriceDate?: string;
  description?: string;
  included?: string[];
  lowestPrice?: number;
  lowestPriceWithoutVat?: number;
  lowestPriceWithVat?: number;
};

export type PriceListGroup = { group: string; items: PriceItem[] };

export const priceList: PriceListGroup[] = [
  {
    group: 'Strojni iskop',
    items: [
      { name: 'Bager (mini, do 3 t)', unit: 'sat', price: 45, date: '10.9.26.', datePrice: 35 },
      { name: 'Iskop za infrastrukturu / priključke', unit: 'm¹', price: 15, date: '2.11.26.' },
    ],
  },
  {
    group: 'Prijevoz i dizalica',
    items: [
      { name: 'Kamion kiper', unit: 'sat', price: 45, date: '2.11.26.' },
      { name: 'Kamion s dizalicom', unit: 'sat', price: 60, date: '2.11.26.' },
      { name: 'Dostava i istovar materijala', unit: 'tura', price: 40, date: '2.11.26.' },
    ],
  },
  {
    group: 'Odvoz otpada',
    items: [
      { name: 'Odvoz građevinskog otpada', unit: 'm³', price: 25, date: '2.11.26.' },
      { name: 'Rušenje i uklanjanje objekata', unit: 'm²', price: 45, date: '2.11.26.' },
    ],
  },
  {
    group: 'Oblikovanje terena',
    items: [
      { name: 'Nivelacija i uređenje dvorišta', unit: 'sat', price: 40, date: '2.11.26.' },
      { name: 'Zemljani radovi', unit: 'sat', price: 40, date: '2.11.26.' },
    ],
  },
];

export function formatPriceValue(value: number) {
  return value.toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function getVatMultiplier(itemOrRate?: PriceItem | number) {
  const vatRate = typeof itemOrRate === 'number'
    ? itemOrRate
    : typeof itemOrRate?.vatRate === 'number' && itemOrRate.vatRate >= 0
      ? itemOrRate.vatRate
      : VAT_RATE * 100;

  return 1 + vatRate / 100;
}

export function formatPrice(item: PriceItem, withVat: boolean) {
  const value = withVat ? (item.priceWithVat ?? item.price * getVatMultiplier(item)) : item.price;
  return `${formatPriceValue(value)} €`;
}

export function formatPriceAmount(value: number) {
  return `${formatPriceValue(value)} €`;
}

export function isSpecialSale(item: PriceItem) {
  return item.specialSale?.toUpperCase() === 'DA';
}

export function getCurrentPriceAmount(item: PriceItem, withVat: boolean) {
  return withVat ? (item.priceWithVat ?? item.price * getVatMultiplier(item)) : item.price;
}

export function getLowestPriceAmount(item: PriceItem, withVat: boolean) {
  if (withVat) {
    if (item.lowestPriceWithVat && item.lowestPriceWithVat > 0) return item.lowestPriceWithVat;
    if (item.lowestPriceWithoutVat && item.lowestPriceWithoutVat > 0) return item.lowestPriceWithoutVat * getVatMultiplier(item);
    return undefined;
  }

  if (item.lowestPriceWithoutVat && item.lowestPriceWithoutVat > 0) return item.lowestPriceWithoutVat;
  if (item.lowestPriceWithVat && item.lowestPriceWithVat > 0) return item.lowestPriceWithVat / getVatMultiplier(item);
  return undefined;
}

export function getOldPriceAmount(item: PriceItem, withVat: boolean) {
  if (withVat) {
    if (item.oldPriceWithVat && item.oldPriceWithVat > 0) return item.oldPriceWithVat;
    if (item.oldPrice && item.oldPrice > 0) return item.oldPrice;
    if (item.oldPriceWithoutVat && item.oldPriceWithoutVat > 0) return item.oldPriceWithoutVat * getVatMultiplier(item);
    if (item.datePrice && item.datePrice > 0) return item.datePrice * getVatMultiplier(item);
    return undefined;
  }

  if (item.oldPriceWithoutVat && item.oldPriceWithoutVat > 0) return item.oldPriceWithoutVat;
  if (item.datePrice && item.datePrice > 0) return item.datePrice;
  if (item.oldPriceWithVat && item.oldPriceWithVat > 0) return item.oldPriceWithVat / getVatMultiplier(item);
  if (item.oldPrice && item.oldPrice > 0) return item.oldPrice / getVatMultiplier(item);
  return undefined;
}

export function getPreviousPriceAmount(item: PriceItem, withVat: boolean) {
  return getOldPriceAmount(item, withVat) ?? getCurrentPriceAmount(item, withVat);
}

export function getDisplayedPriceAmount(item: PriceItem, withVat: boolean) {
  if (isSpecialSale(item)) {
    const lowestPriceAmount = getLowestPriceAmount(item, withVat);
    if (lowestPriceAmount && lowestPriceAmount > 0) return lowestPriceAmount;
  }

  return getCurrentPriceAmount(item, withVat);
}

const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const cell = (v: string, style = '') =>
  `<Cell${style ? ` ss:StyleID="${style}"` : ''}><Data ss:Type="String">${esc(v)}</Data></Cell>`;

export function downloadPriceListXml() {
  const rows = [
    `<Row>${cell(`Cjenik vrijedi od ${validFrom}`, 'h')}</Row>`,
    `<Row>${['Grupa', 'Usluga', 'Jedinica', 'Cijena (bez PDV-a)', 'Cijena (+25% PDV)'].map((h) => cell(h, 'h')).join('')}</Row>`,
    ...priceList.flatMap((g) =>
      g.items.map(
        (i) => `<Row>${[g.group, i.name, i.unit, formatPrice(i, false), formatPrice(i, true)].map((v) => cell(v)).join('')}</Row>`
      )
    ),
  ].join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Styles><Style ss:ID="h"><Font ss:Bold="1"/></Style></Styles>
<Worksheet ss:Name="Cjenik"><Table>
<Column ss:Width="140"/><Column ss:Width="260"/><Column ss:Width="90"/><Column ss:Width="110"/><Column ss:Width="110"/>
${rows}
</Table></Worksheet>
</Workbook>`;

  const url = URL.createObjectURL(new Blob([xml], { type: 'application/xml;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'terros-cjenik.xml';
  a.click();
  URL.revokeObjectURL(url);
}
