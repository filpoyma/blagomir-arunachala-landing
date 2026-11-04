import { SITE_URL, TG_LINK_PAYMENTS } from "@/data/content";
import type { TBookingTariff } from "@/types/content";

export interface IBookingSubmission {
  readonly name: string;
  readonly contact: string;
  readonly tariff: TBookingTariff;
  readonly kashi: boolean;
  readonly visitedIndia: boolean;
  readonly knowsMaster: boolean;
  readonly comment: string;
  readonly website: string;
}

export interface IBookingValidationError {
  readonly field: string;
  readonly message: string;
}

const TARIFF_LABELS: Record<TBookingTariff, string> = {
  twin: "Twin",
  single: "Single",
};

const TARIFF_PRICES_USD: Record<TBookingTariff, number> = {
  twin: 1800,
  single: 2250,
};

const TARIFF_CLIENT_LABELS: Record<TBookingTariff, string> = {
  twin: "Размещение Twin (место в двухместном номере)",
  single: "Размещение Single (индивидуальный номер)",
};

const KASHI_PRICE_USD = 1100;

const PRICE_INCREASE_USD = 200;
const PRICE_INCREASE_FROM = new Date("2026-12-12T00:00:00+03:00");

interface IBookingPrice {
  readonly tariff: number;
  readonly total: number;
  readonly prepayment: number;
  readonly remainder: number;
  readonly increased: boolean;
}

function calculateBookingPrice(data: IBookingSubmission, at: Date): IBookingPrice {
  const increased = at >= PRICE_INCREASE_FROM;
  const tariff = TARIFF_PRICES_USD[data.tariff] + (increased ? PRICE_INCREASE_USD : 0);
  const total = tariff + (data.kashi ? KASHI_PRICE_USD : 0);
  const prepayment = Math.ceil(total / 2);
  return { tariff, total, prepayment, remainder: total - prepayment, increased };
}

function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("ru-RU").replace(/\s/g, " ")}`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function parseTelegramChatIds(raw: string | undefined): readonly string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export function getTelegramConfig(): {
  token: string;
  chatIds: readonly string[];
} | null {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatIds = parseTelegramChatIds(process.env.TELEGRAM_CHAT_IDS);
  if (!token || chatIds.length === 0) return null;
  return { token, chatIds };
}

function isBookingTariff(value: unknown): value is TBookingTariff {
  return value === "twin" || value === "single";
}

export function validateBookingSubmission(
  body: unknown
): { ok: true; data: IBookingSubmission } | { ok: false; errors: IBookingValidationError[] } {
  if (!body || typeof body !== "object") {
    return { ok: false, errors: [{ field: "body", message: "Некорректное тело запроса" }] };
  }

  const o = body as Record<string, unknown>;
  const name = typeof o.name === "string" ? o.name.trim() : "";
  const contact = typeof o.contact === "string" ? o.contact.trim() : "";
  const comment = typeof o.comment === "string" ? o.comment.trim() : "";
  const website = typeof o.website === "string" ? o.website.trim() : "";

  const errors: IBookingValidationError[] = [];
  if (!name) errors.push({ field: "name", message: "Укажите имя" });
  if (contact.length < 2) errors.push({ field: "contact", message: "Укажите способ связи" });
  const tariffRaw = o.tariff;
  if (!isBookingTariff(tariffRaw)) {
    errors.push({ field: "tariff", message: "Выберите тариф" });
  }

  if (errors.length > 0) return { ok: false, errors };
  if (!isBookingTariff(tariffRaw)) {
    return { ok: false, errors: [{ field: "tariff", message: "Выберите тариф" }] };
  }

  return {
    ok: true,
    data: {
      name,
      contact,
      tariff: tariffRaw,
      kashi: Boolean(o.kashi),
      visitedIndia: Boolean(o.visitedIndia),
      knowsMaster: Boolean(o.knowsMaster),
      comment,
      website,
    },
  };
}

export function formatBookingTelegramMessage(data: IBookingSubmission, at: Date): string {
  const sentAt = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "Europe/Moscow",
  }).format(at);
  const price = calculateBookingPrice(data, at);
  const tariffNote = price.increased ? ` (с надбавкой ${formatUsd(PRICE_INCREASE_USD)})` : "";

  const lines = [
    "<b>Новая заявка на ретрит «Аруначала»</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Контакт:</b> ${escapeHtml(data.contact)}`,
    `<b>Размещение:</b> ${TARIFF_LABELS[data.tariff]} — ${formatUsd(price.tariff)}${tariffNote}`,
    `<b>Каши (+${formatUsd(KASHI_PRICE_USD)}):</b> ${data.kashi ? "Да" : "Нет"}`,
    `<b>Итого:</b> ${formatUsd(price.total)}, предоплата ${formatUsd(price.prepayment)}`,
    `<b>Был(а) в Индии:</b> ${data.visitedIndia ? "Да" : "Нет"}`,
    `<b>Знаком(а) с мастером:</b> ${data.knowsMaster ? "Да" : "Нет"}`,
  ];

  if (data.comment) {
    lines.push("", `<b>Комментарий:</b>\n${escapeHtml(data.comment)}`);
  }

  lines.push(
    "",
    `<i>Отправлено: ${escapeHtml(sentAt)} (МСК)</i>`,
    "<i>Следующее сообщение — текст для клиента, его можно скопировать и отправить.</i>"
  );
  return lines.join("\n");
}

export function formatClientPaymentMessage(data: IBookingSubmission, at: Date): string {
  const firstName = data.name.split(/\s+/)[0];
  const price = calculateBookingPrice(data, at);

  const lines = [
    `Здравствуйте, ${escapeHtml(firstName)}!`,
    "",
    "Спасибо за заявку на ретрит «Аруначала. Путь к Источнику» (2–12 января 2027, Тируваннамалай). Место за вами подтверждено.",
    "",
    "Ваш вариант:",
    `• ${TARIFF_CLIENT_LABELS[data.tariff]}: ${formatUsd(price.tariff)}`,
  ];

  if (price.increased) {
    lines.push(
      `  (с 12 декабря стоимость размещения увеличена на ${formatUsd(PRICE_INCREASE_USD)})`
    );
  }

  if (data.kashi) {
    lines.push(`• Программа «Каши» в Варанаси (13–16 января): ${formatUsd(KASHI_PRICE_USD)}`);
  }

  lines.push(
    `<b>Итого: ${formatUsd(price.total)}</b>`,
    "",
    `Чтобы закрепить место, внесите предоплату 50%: <b>${formatUsd(price.prepayment)}</b>.`,
    "Предоплата невозвратная.",
    `Оставшиеся ${formatUsd(price.remainder)} оплачиваются на месте в Индии.`,
    "Оплата в рублях по курсу, указанному в счёте.",
    "",
    `Реквизиты для оплаты: ${TG_LINK_PAYMENTS}`,
    "",
    "После оплаты пришлите, пожалуйста, чек или скриншот в ответ на это сообщение.",
    "",
    "В стоимость не входят: авиабилеты, виза, страховка, трансферы из/в аэропорт, обеды и ужины.",
    `Условия участия: ${SITE_URL}/oferta`
  );

  return lines.join("\n");
}

async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string
): Promise<boolean> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      console.error(
        `[bookings] Telegram sendMessage failed for chat ${chatId}:`,
        res.status,
        await res.text()
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[bookings] Telegram sendMessage error for chat ${chatId}:`, err);
    return false;
  }
}

export async function sendBookingToTelegram(
  data: IBookingSubmission,
  config: { token: string; chatIds: readonly string[] }
): Promise<{ sent: number; failed: number }> {
  const now = new Date();
  const bookingText = formatBookingTelegramMessage(data, now);
  const clientText = formatClientPaymentMessage(data, now);

  const results = await Promise.all(
    config.chatIds.map(async (chatId) => {
      const bookingSent = await sendTelegramMessage(config.token, chatId, bookingText);
      if (bookingSent) await sendTelegramMessage(config.token, chatId, clientText);
      return bookingSent;
    })
  );

  const sent = results.filter(Boolean).length;
  return { sent, failed: results.length - sent };
}
