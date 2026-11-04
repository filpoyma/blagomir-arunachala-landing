import {
  getTelegramConfig,
  sendBookingToTelegram,
  validateBookingSubmission,
} from "@/lib/telegram-booking";

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const validated = validateBookingSubmission(body);
  if (!validated.ok) {
    return Response.json({ errors: validated.errors }, { status: 400 });
  }

  if (validated.data.website) {
    return Response.json({ ok: true });
  }

  const config = getTelegramConfig();
  if (!config) {
    console.error("[bookings] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_IDS");
    return Response.json(
      { error: "Сервис заявок временно недоступен" },
      { status: 503 }
    );
  }

  const { sent, failed } = await sendBookingToTelegram(validated.data, config);
  if (sent === 0) {
    console.error("[bookings] All Telegram deliveries failed", { failed });
    return Response.json(
      { error: "Не удалось доставить заявку организатору" },
      { status: 502 }
    );
  }

  if (failed > 0) {
    console.warn("[bookings] Partial Telegram delivery failure", { sent, failed });
  }

  return Response.json({ ok: true });
}
