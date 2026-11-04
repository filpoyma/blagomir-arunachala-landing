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
  twin: "Twin — $1 800",
  single: "Single — $2 250",
};

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

export function formatBookingTelegramMessage(data: IBookingSubmission): string {
  const sentAt = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "Europe/Moscow",
  }).format(new Date());

  const lines = [
    "<b>Новая заявка на ретрит «Аруначала»</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Контакт:</b> ${escapeHtml(data.contact)}`,
    `<b>Размещение:</b> ${escapeHtml(TARIFF_LABELS[data.tariff])}`,
    `<b>Каши (+$1 100):</b> ${data.kashi ? "Да" : "Нет"}`,
    `<b>Был(а) в Индии:</b> ${data.visitedIndia ? "Да" : "Нет"}`,
    `<b>Знаком(а) с мастером:</b> ${data.knowsMaster ? "Да" : "Нет"}`,
  ];

  if (data.comment) {
    lines.push("", `<b>Комментарий:</b>\n${escapeHtml(data.comment)}`);
  }

  lines.push("", `<i>Отправлено: ${escapeHtml(sentAt)} (МСК)</i>`);
  return lines.join("\n");
}

export async function sendBookingToTelegram(
  data: IBookingSubmission,
  config: { token: string; chatIds: readonly string[] }
): Promise<{ sent: number; failed: number }> {
  const text = formatBookingTelegramMessage(data);
  let sent = 0;
  let failed = 0;

  await Promise.all(
    config.chatIds.map(async (chatId) => {
      try {
        const res = await fetch(
          `https://api.telegram.org/bot${config.token}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text,
              parse_mode: "HTML",
              disable_web_page_preview: true,
            }),
          }
        );
        if (!res.ok) {
          failed += 1;
          console.error(
            `[bookings] Telegram sendMessage failed for chat ${chatId}:`,
            res.status,
            await res.text()
          );
          return;
        }
        sent += 1;
      } catch (err) {
        failed += 1;
        console.error(`[bookings] Telegram sendMessage error for chat ${chatId}:`, err);
      }
    })
  );

  return { sent, failed };
}
