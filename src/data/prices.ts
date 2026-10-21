// all prices in GBP. gel prices are from the july 2025 price list (from august 2025).
// press-on prices are from the custom press-on kit guide.

export const FRENCH_TIP_ADD = 5;
export const REMOVAL_PRICE = 10;
export const REPAIR_PRICE = 3;

export type GelService = {
  id: "gel-overlay" | "short" | "medium" | "long" | "extra-long";
  label: string;
  detail?: string;
  price: number;
};

export const gelServices: GelService[] = [
  { id: "gel-overlay", label: "gel manicure, biab or gel overlay", price: 28 },
  { id: "short", label: "short set", detail: "1 to 3 magnets", price: 33 },
  { id: "medium", label: "medium set", detail: "4 to 7 magnets", price: 35 },
  { id: "long", label: "long set", detail: "8 to 10 magnets", price: 37 },
  { id: "extra-long", label: "extra long set", detail: "11+ magnets", price: 40 },
];

export type PressOnLength = {
  label: string;
  mm: string;
  plain: number;
  french: number;
};

export const pressOnLengths: PressOnLength[] = [
  { label: "short", mm: "11 to 17mm", plain: 14, french: 17 },
  { label: "medium", mm: "18 to 25mm", plain: 16, french: 19 },
  { label: "long", mm: "26 to 32mm", plain: 18, french: 21 },
  { label: "extra long", mm: "33 to 50mm", plain: 20, french: 23 },
];

export const pressOnKitIncludes = [
  "wooden cuticle pusher",
  "alcohol wipes",
  "mini nail buffer",
  "nail glue",
  "nail stickers",
  "your custom set of press-on nails",
];

// width of each press-on size, from the measuring guide
export const pressOnSizes: { size: number; mm: number }[] = [
  { size: 1, mm: 14 },
  { size: 2, mm: 13 },
  { size: 3, mm: 12 },
  { size: 4, mm: 11 },
  { size: 5, mm: 10 },
  { size: 6, mm: 9.5 },
  { size: 7, mm: 9 },
  { size: 8, mm: 8 },
  { size: 9, mm: 7.5 },
  { size: 10, mm: 7 },
  { size: 11, mm: 6.5 },
];

export function formatGbp(n: number): string {
  return Number.isInteger(n) ? `£${n}` : `£${n.toFixed(2)}`;
}
