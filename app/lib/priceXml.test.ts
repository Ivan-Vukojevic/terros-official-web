import assert from 'node:assert/strict';
import test from 'node:test';

import { getCurrentPriceAmount, getOldPriceAmount } from '../data/priceList.ts';
import { formatXmlDate, normalizeNumber, parsePriceListXml } from './priceXml.ts';

test('normalizeNumber handles European and US number formats', () => {
  assert.equal(normalizeNumber('1.234,50'), 1234.5);
  assert.equal(normalizeNumber('1,234.50'), 1234.5);
  assert.equal(normalizeNumber('42'), 42);
  assert.equal(normalizeNumber(''), 0);
});

test('formatXmlDate normalizes common XML date values', () => {
  assert.equal(formatXmlDate('2024-06-15'), '15.6.2024.');
  assert.equal(formatXmlDate('15.06.2024.'), '15.6.2024.');
  assert.equal(formatXmlDate(''), '');
});

test('parsePriceListXml extracts validFrom and item pricing metadata', () => {
  const xml = `
    <root>
      <valid_from>2024-06-15</valid_from>
      <usluga>
        <kategorija>Strojni iskop</kategorija>
        <naziv_usluge>Mini bager</naziv_usluge>
        <jedinica_mjere>sat</jedinica_mjere>
        <cijena_bez_pdv>120</cijena_bez_pdv>
        <stopa_pdv>25</stopa_pdv>
        <stara_cijena_bez_pdv>150</stara_cijena_bez_pdv>
      </usluga>
    </root>
  `;

  const parsed = parsePriceListXml(xml);

  assert.equal(parsed.validFrom, '15.6.2024.');
  assert.equal(parsed.groups[0].group, 'Strojni iskop');
  assert.equal(parsed.groups[0].items[0].price, 120);
  assert.equal(parsed.groups[0].items[0].oldPriceWithoutVat, 150);
  assert.equal(parsed.groups[0].items[0].date, '15.6.2024.');
});

test('old-price helpers keep VAT logic centralized and consistent', () => {
  const item = {
    name: 'Test',
    unit: 'sat',
    price: 100,
    priceWithVat: 125,
    oldPriceWithoutVat: 110,
    oldPriceWithVat: 137.5,
    vatRate: 25,
    date: '15.6.2024.',
  };

  assert.equal(getCurrentPriceAmount(item, false), 100);
  assert.equal(getCurrentPriceAmount(item, true), 125);
  assert.equal(getOldPriceAmount(item, false), 110);
  assert.equal(getOldPriceAmount(item, true), 137.5);
});
