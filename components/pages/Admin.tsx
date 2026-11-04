"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { LogOut, RefreshCw } from "lucide-react";
import { LogoFull } from "@/components/Logo";
import { API_URL } from "@/data/content";
import type { IBookingRecord, TBookingStatus } from "@/types/content";

const STATUS_LABELS: Record<TBookingStatus, string> = {
  new: "Новая",
  contacted: "На связи",
  confirmed: "Подтверждена",
  rejected: "Отклонена",
};

const inputCls =
  "w-full bg-transparent border-b border-paper/25 focus:border-saffron-2 outline-none py-3 text-paper placeholder:text-paper/35 text-[15px] transition-colors";

interface ILoginResponse {
  readonly token?: string;
  readonly detail?: unknown;
}

const Admin = () => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [bookings, setBookings] = useState<IBookingRecord[] | null>(null);
  const [loadError, setLoadError] = useState("");

  const fetchBookings = useCallback(async (tk: string): Promise<void> => {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${tk}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem("dharma_admin_token");
        setToken("");
        return;
      }
      if (!res.ok) throw new Error();
      const data = (await res.json()) as IBookingRecord[];
      setLoadError("");
      setBookings(data);
    } catch {
      setLoadError("Не удалось загрузить заявки");
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("dharma_admin_token") || "";
    if (!saved) return;
    const id = requestAnimationFrame(() => {
      setToken(saved);
      void fetchBookings(saved);
    });
    return () => cancelAnimationFrame(id);
  }, [fetchBookings]);

  const login = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as ILoginResponse;
      if (!res.ok || !data.token) {
        const detail = typeof data.detail === "string" ? data.detail : "Ошибка входа";
        setLoginError(detail);
        return;
      }
      sessionStorage.setItem("dharma_admin_token", data.token);
      setToken(data.token);
      await fetchBookings(data.token);
    } catch {
      setLoginError("Сервер недоступен");
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = (): void => {
    sessionStorage.removeItem("dharma_admin_token");
    setToken("");
    setBookings(null);
  };

  const setStatus = async (id: string, status: TBookingStatus): Promise<void> => {
    await fetch(`${API_URL}/bookings/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    setBookings((b) => (b ? b.map((x) => (x.id === id ? { ...x, status } : x)) : b));
  };

  const total = bookings?.length || 0;
  const newCount = bookings?.filter((b) => b.status === "new").length || 0;
  const kashiCount = bookings?.filter((b) => b.kashi).length || 0;

  return (
    <div className="min-h-screen bg-jade-3 text-paper">
      <header className="border-b border-saffron/20 bg-jade/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 h-[72px] flex items-center justify-between">
          <LogoFull />
          <div className="flex items-center gap-4">
            <Link
              data-testid="admin-back-link"
              href="/"
              className="text-xs text-paper/50 hover:text-saffron-2 transition-colors"
            >
              ← На сайт
            </Link>
            {token && (
              <button
                data-testid="admin-logout-btn"
                onClick={logout}
                className="flex items-center gap-2 text-xs text-paper/60 hover:text-saffron-2 transition-colors"
              >
                <LogOut size={14} /> Выйти
              </button>
            )}
          </div>
        </div>
      </header>

      {!token ? (
        <div className="max-w-md mx-auto px-5 pt-24" data-testid="admin-login">
          <h1 className="font-serif text-3xl">Вход для организатора</h1>
          <p className="mt-3 text-sm text-paper/50">
            Доступ к заявкам на ретрит «Аруначала. Путь к Источнику».
          </p>
          <form onSubmit={login} className="mt-10 space-y-7" data-testid="admin-login-form">
            <div>
              <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-saffron-2">
                E-mail
              </label>
              <input
                data-testid="admin-email-input"
                type="email"
                className={inputCls}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-saffron-2">
                Пароль
              </label>
              <input
                data-testid="admin-password-input"
                type="password"
                className={inputCls}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {loginError && (
              <p
                data-testid="admin-login-error"
                className="text-sm text-red-300 border border-red-300/30 bg-red-300/10 px-4 py-3"
              >
                {loginError}
              </p>
            )}
            <button
              data-testid="admin-login-btn"
              type="submit"
              disabled={loggingIn}
              className="w-full py-4 rounded-full bg-saffron text-jade-3 font-semibold text-sm hover:bg-terracotta transition-colors disabled:opacity-50"
            >
              {loggingIn ? "Входим…" : "Войти"}
            </button>
          </form>
        </div>
      ) : (
        <main className="max-w-6xl mx-auto px-5 py-12" data-testid="admin-dashboard">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl">Заявки на ретрит</h1>
              <p className="mt-2 font-mono text-[11px] tracking-[0.2em] uppercase text-paper/45">
                Всего: {total} · Новых: {newCount} · С Каши: {kashiCount}
              </p>
            </div>
            <button
              data-testid="admin-refresh-btn"
              onClick={() => void fetchBookings(token)}
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-saffron/40 text-saffron-2 text-sm hover:bg-saffron hover:text-jade-3 transition-colors"
            >
              <RefreshCw size={14} /> Обновить
            </button>
          </div>

          {loadError && <p className="mt-6 text-sm text-red-300">{loadError}</p>}

          {bookings && bookings.length === 0 && (
            <p data-testid="admin-empty" className="mt-16 text-center text-paper/40 text-sm">
              Заявок пока нет. Они появятся здесь сразу после отправки формы на сайте.
            </p>
          )}

          <div className="mt-8 space-y-4">
            {bookings?.map((b) => (
              <article
                key={b.id}
                data-testid={`admin-booking-${b.id}`}
                className="border border-saffron/20 bg-jade-2/50 p-6 grid md:grid-cols-12 gap-5"
              >
                <div className="md:col-span-4">
                  <div className="font-serif text-xl text-paper">{b.name}</div>
                  <div className="mt-1 text-sm text-saffron-2 break-all">{b.contact}</div>
                  <div className="mt-2 font-mono text-[10px] tracking-[0.15em] uppercase text-paper/40">
                    {new Date(b.created_at).toLocaleString("ru-RU")}
                  </div>
                </div>
                <div className="md:col-span-5 text-sm text-paper/70 space-y-1.5">
                  <p>
                    Тариф:{" "}
                    <span className="text-paper">
                      {b.tariff === "twin" ? "Twin — $1 800" : "Single — $2 250"}
                    </span>
                  </p>
                  <p>
                    Каши: <span className="text-paper">{b.kashi ? "Да (+$1 100)" : "Нет"}</span>
                  </p>
                  {b.comment && <p className="text-paper/55 italic">«{b.comment}»</p>}
                </div>
                <div className="md:col-span-3 flex md:justify-end items-start">
                  <select
                    data-testid={`admin-status-select-${b.id}`}
                    value={b.status}
                    onChange={(e) => void setStatus(b.id, e.target.value as TBookingStatus)}
                    className="bg-jade-3 border border-saffron/30 text-paper text-sm px-4 py-2.5 outline-none focus:border-saffron-2 cursor-pointer"
                  >
                    {(Object.entries(STATUS_LABELS) as Array<[TBookingStatus, string]>).map(
                      ([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default Admin;
