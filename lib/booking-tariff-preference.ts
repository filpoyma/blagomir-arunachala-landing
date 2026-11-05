import type { TBookingTariff } from "@/types/content";

const STORAGE_KEY = "arunachala-booking-tariff";

export const BOOKING_TARIFF_EVENT = "arunachala-booking-tariff";

export function isBookingTariff(value: unknown): value is TBookingTariff {
  return value === "twin" || value === "single";
}

export function setPreferredBookingTariff(tariff: TBookingTariff): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, tariff);
  window.dispatchEvent(new CustomEvent(BOOKING_TARIFF_EVENT, { detail: tariff }));
}

export function getPreferredBookingTariff(): TBookingTariff | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  return isBookingTariff(raw) ? raw : null;
}

export function subscribePreferredBookingTariff(onStoreChange: () => void): () => void {
  const onEvent = (): void => onStoreChange();
  window.addEventListener(BOOKING_TARIFF_EVENT, onEvent);
  return () => window.removeEventListener(BOOKING_TARIFF_EVENT, onEvent);
}

export function getPreferredBookingTariffSnapshot(): TBookingTariff {
  return getPreferredBookingTariff() ?? "twin";
}

export function getPreferredBookingTariffServerSnapshot(): TBookingTariff {
  return "twin";
}
