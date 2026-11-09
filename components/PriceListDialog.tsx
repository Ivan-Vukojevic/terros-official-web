"use client";

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Accordion from '@radix-ui/react-accordion';
import { ReceiptText, ArrowRight, X, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import {
  priceList,
  formatPriceAmount,
  getCurrentPriceAmount,
  getDisplayedPriceAmount,
  getLowestPriceAmount,
  getOldPriceAmount,
  isSpecialSale,
  type PriceListGroup,
} from '@/app/data/priceList';

const modes = [
  { id: 'b2b', label: 'Za firme (Bez PDV-a)' },
  { id: 'b2c', label: 'Za građane (+25% PDV)' },
] as const;

export function PriceListDialog() {
  const [mode, setMode] = useState<'b2b' | 'b2c'>('b2b');
  const [groups, setGroups] = useState<PriceListGroup[]>(priceList);
  const [loading, setLoading] = useState(true);
  const withVat = mode === 'b2c';

  useEffect(() => {
    let isMounted = true;

    fetch('/api/pricelist')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Price list fetch failed');
        }

        const data = await response.json();
        const nextGroups = Array.isArray(data?.groups) && data.groups.length > 0 ? data.groups : priceList;

        if (isMounted) {
          setGroups(nextGroups);
        }
      })
      .catch(() => {
        if (isMounted) {
          setGroups(priceList);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="lg">
          <ReceiptText className="w-5 h-5" />
          Cjenik
          <ArrowRight className="w-5 h-5" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-[calc(100%-2rem)] max-w-2xl max-h-[92svh] sm:max-h-[85vh] overflow-y-auto sm:rounded-xl rounded-t-xl bg-[#1A1A1A] border border-[#2C2C2C] p-4 sm:p-8 focus:outline-none">
          <Dialog.Close
            aria-label="Zatvori"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#2C2C2C] transition-colors"
          >
            <X className="w-5 h-5" />
          </Dialog.Close>

          <div className="flex flex-col gap-3">
            <div>
              <Dialog.Title className="text-white text-xl sm:text-2xl font-bold pr-10">Cjenik usluga</Dialog.Title>
              <Dialog.Description className="text-gray-400 text-sm mt-1">
                Cijene su informativne. Za točnu ponudu nas kontaktirajte.
              </Dialog.Description>
            </div>

            <div role="radiogroup" aria-label="Vrsta kupca" className="grid grid-cols-2 p-1 rounded-lg bg-[#2C2C2C]">
              {modes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={mode === m.id}
                  onClick={() => setMode(m.id)}
                  className={`px-2 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-colors ${
                    mode === m.id ? 'bg-[#C4976A] text-[#0F0F0F]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-[10px] leading-snug text-gray-500">
              *Za pravne osobe primjenjuje se prijenos porezne obveze prema čl. 75. st. 3. t. a.
            </p>
          </div>

          {loading ? <p className="mt-5 text-sm text-gray-400">Učitavanje cjenika...</p> : null}

          {/* Mobile: accordion */}
          <Accordion.Root
            type="single"
            collapsible
            defaultValue={groups[0]?.group}
            className="sm:hidden mt-5 flex flex-col gap-3"
          >
            {groups.map((group) => (
              <Accordion.Item key={group.group} value={group.group} className="rounded-lg overflow-hidden border border-[#2C2C2C]">
                <Accordion.Header>
                  <Accordion.Trigger className="group w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-[#2C2C2C] text-[#C4976A] font-semibold uppercase tracking-wider text-sm">
                    {group.group}
                    <ChevronDown className="w-5 h-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <div className="flex flex-col gap-2 p-2">
                    {group.items.map((item) => {
                      const specialSaleActive = isSpecialSale(item);
                      const specialSaleName = item.specialSaleName?.trim() || 'Akcija';
                      const displayedPriceValue = getDisplayedPriceAmount(item, withVat);
                      const regularPriceValue = getCurrentPriceAmount(item, withVat);
                      const lowestPriceValue = getLowestPriceAmount(item, withVat);
                      const oldPriceValue = getOldPriceAmount(item, withVat);
                      const previousDate = item.oldPriceDate || item.date;
                      const showSpecialSale = specialSaleActive && !!regularPriceValue && regularPriceValue > 0;
                      const showLowestPrice = specialSaleActive && !!lowestPriceValue && lowestPriceValue > 0;
                      const showOldPrice = !!oldPriceValue && oldPriceValue > 0;

                      return (
                        <div
                          key={item.name}
                          className="flex items-start justify-between gap-3 rounded-lg bg-[#0F0F0F] px-3 py-3"
                        >
                          <span className="text-[13px] font-bold text-white leading-snug">{item.name}</span>
                          <span className="shrink-0 flex flex-col items-end whitespace-nowrap min-w-[5.5rem]">
                            <span className="text-sm font-semibold text-[#C4976A]">
                              {formatPriceAmount(displayedPriceValue)} <span className="text-gray-400 font-normal">/ {item.unit}</span>
                            </span>
                            {showSpecialSale ? (
                              <span className="mt-1 flex gap-2 text-[11px] leading-tight text-gray-400">
                                <span className="text-[#C4976A]">{specialSaleName}</span>
                                <span className="line-through">{formatPriceAmount(regularPriceValue)}</span>
                              </span>
                            ) : null}
                            {showLowestPrice ? (
                              <span className="mt-1 text-[11px] leading-tight text-gray-400">
                                Najniža cijena u 30 dana: {formatPriceAmount(lowestPriceValue ?? 0)}
                              </span>
                            ) : null}
                            {showOldPrice ? (
                              <span className="mt-1 flex gap-2 text-[11px] leading-tight text-gray-500">
                                {previousDate ? <span>{previousDate}</span> : null}
                                <span>{formatPriceAmount(oldPriceValue ?? 0)}</span>
                              </span>
                            ) : null}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          {/* Desktop: tables */}
          <div className="hidden sm:block space-y-6 mt-6">
            {groups.map((group) => (
              <div key={group.group}>
                <h4 className="text-[#C4976A] uppercase tracking-wider text-sm mb-2">{group.group}</h4>
                <table className="w-full table-fixed text-left text-sm">
                  <colgroup>
                    <col />
                    <col className="w-24" />
                    <col className="w-48" />
                  </colgroup>
                  <thead>
                    <tr className="text-gray-500 border-b border-[#2C2C2C]">
                      <th className="py-2 font-normal">Usluga</th>
                      <th className="py-2 font-normal">Jedinica</th>
                      <th className="py-2 font-normal text-right">Cijena</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item) => {
                      const specialSaleActive = isSpecialSale(item);
                      const specialSaleName = item.specialSaleName?.trim() || 'Akcija';
                      const displayedPriceValue = getDisplayedPriceAmount(item, withVat);
                      const regularPriceValue = getCurrentPriceAmount(item, withVat);
                      const lowestPriceValue = getLowestPriceAmount(item, withVat);
                      const oldPriceValue = getOldPriceAmount(item, withVat);
                      const previousDate = item.oldPriceDate || item.date;
                      const showSpecialSale = specialSaleActive && !!regularPriceValue && regularPriceValue > 0;
                      const showLowestPrice = specialSaleActive && !!lowestPriceValue && lowestPriceValue > 0;
                      const showOldPrice = !!oldPriceValue && oldPriceValue > 0;

                      return (
                        <tr key={item.name} className="border-b border-[#2C2C2C]/60 text-gray-200">
                          <td className="py-3 pr-3">{item.name}</td>
                          <td className="py-3 pr-3 text-gray-400 whitespace-nowrap">{item.unit}</td>
                          <td className="py-3 text-right whitespace-nowrap">
                            <div className="flex flex-col items-end">
                              <span className="text-base text-white font-semibold">{formatPriceAmount(displayedPriceValue)}</span>
                              {showSpecialSale ? (
                                <span className="mt-1 flex gap-2 text-[11px] leading-tight text-gray-400">
                                  <span className="text-[#C4976A]">{specialSaleName}</span>
                                  <span className="line-through">{formatPriceAmount(regularPriceValue)}</span>
                                </span>
                              ) : null}
                              {showLowestPrice ? (
                                <span className="mt-1 text-[11px] leading-tight text-gray-400">
                                  Najniža cijena u 30 dana: {formatPriceAmount(lowestPriceValue ?? 0)}
                                </span>
                              ) : null}
                              {showOldPrice ? (
                                <span className="mt-1 flex gap-2 text-[11px] leading-tight text-gray-500">
                                  {previousDate ? <span>{previousDate}</span> : null}
                                  <span>{formatPriceAmount(oldPriceValue ?? 0)}</span>
                                </span>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <Dialog.Close asChild>
            <Button
              className="mt-6 sm:mt-8 w-full"
              onClick={() =>
                setTimeout(
                  () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
                  150
                )
              }
            >
              Zatraži ponudu
            </Button>
          </Dialog.Close>
          <p className="mt-3 text-[10px] leading-snug text-gray-500 text-center">
            Cijene su informativne naravi i podložne promjeni ovisno o lokaciji, opsegu i uvjetima rada. Konačna cijena
            utvrđuje se ponudom.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
