import { NextResponse } from 'next/server';

import { priceList } from '@/app/data/priceList';
import { fetchPriceListData } from '@/app/lib/priceXml';

export async function GET() {
  try {
    const { validFrom, groups } = await fetchPriceListData();

    return NextResponse.json({
      validFrom,
      groups,
    });
  } catch (error) {
    console.error('[pricelist] Live feed failed, using fallback data.', error);

    return NextResponse.json({
      validFrom: '',
      groups: priceList,
      fallback: true,
      error: error instanceof Error ? error.message : 'Unknown price list fetch error',
    });
  }
}
