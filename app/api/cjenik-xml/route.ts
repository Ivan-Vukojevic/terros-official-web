import { buildPriceListXml, GOOGLE_PRICE_SHEET_URL, parsePriceListXml, readLocalPriceXmlFile } from '@/app/lib/priceXml';

export async function GET() {
  const localXml = readLocalPriceXmlFile();
  const xmlHeaders = {
    'Content-Type': 'application/xml; charset=utf-8',
    'Content-Disposition': 'inline; filename="cjenik_Terros_29008566778.xml"',
    'Cache-Control': 'no-store',
  };

  if (!GOOGLE_PRICE_SHEET_URL && localXml) {
    return new Response(localXml, {
      headers: xmlHeaders,
    });
  }

  try {
    const response = await fetch(GOOGLE_PRICE_SHEET_URL, { cache: 'no-store' });

    if (!response.ok) {
      if (localXml) {
        return new Response(localXml, {
          headers: xmlHeaders,
        });
      }

      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><error>Failed to fetch price list XML: ${response.status}</error>`,
        {
          status: 502,
          headers: xmlHeaders,
        }
      );
    }

    const xml = await response.text();
    const parsed = parsePriceListXml(xml);

    return new Response(buildPriceListXml(parsed.validFrom, parsed.groups), {
      headers: xmlHeaders,
    });
  } catch (error) {
    if (localXml) {
      return new Response(localXml, {
        headers: xmlHeaders,
      });
    }

    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><error>${message}</error>`, {
      status: 502,
      headers: xmlHeaders,
    });
  }
}
