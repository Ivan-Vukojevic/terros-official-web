import { GOOGLE_PRICE_SHEET_URL, readLocalPriceXmlFile } from '@/app/lib/priceXml';

export async function GET() {
  const localXml = readLocalPriceXmlFile();

  if (!GOOGLE_PRICE_SHEET_URL && localXml) {
    return new Response(localXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  try {
    const response = await fetch(GOOGLE_PRICE_SHEET_URL, { cache: 'no-store' });

    if (!response.ok) {
      if (localXml) {
        return new Response(localXml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'no-store',
          },
        });
      }

      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><error>Failed to fetch price list XML: ${response.status}</error>`,
        {
          status: 502,
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    const xml = await response.text();

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    if (localXml) {
      return new Response(localXml, {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      });
    }

    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><error>${message}</error>`, {
      status: 502,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }
}
