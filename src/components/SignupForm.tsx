import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Same endpoint as the shared <nlh-contact> form (NhiLe Leads Apps Script:
// Google Sheet + email to contact@nhi.sg). It answers { ok, id }.
// Never show a fake success: anything but ok:true is an error.
const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzG2THjkAqFQNFF4IWjIJOMcb9hkwrQ7AYewI1h3iHKuvxsINR7Y_02DfH5IN5fZKnwGw/exec";
const TEAM_EMAIL = "contact@nhi.sg";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok"; id: string } | { kind: "error" };

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

// Channel names as the NhiLe Leads sheet already receives them from nlh-contact.
const CHANNEL_VALUE = { zalo: "Zalo", phone: "Gọi điện", email: "Email" } as const;

const ss = (k: string) => { try { return sessionStorage.getItem("nlh_" + k) || ""; } catch { return ""; } };

export const SignupForm = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "vi";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState<"zalo" | "phone" | "email">("zalo");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [err, setErr] = useState<{ field: string; msg: string } | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(Date.now());

  const normPhone = () => {
    const p = phone.trim();
    if (!p || p.startsWith("+")) return p;
    return "+84 " + p.replace(/^0+/, "");
  };

  // Lỗi gắn đúng ô sai, hiện ngay dưới ô đó (nguyên tắc 9: nhận ra và sửa lỗi).
  const validate = (): { field: string; msg: string } | null => {
    if (!name.trim()) return { field: "name", msg: t("form.need_name") };
    if (channel === "email" && !email.trim()) return { field: "email", msg: t("form.need_email") };
    if (channel !== "email" && !phone.trim()) return { field: "phone", msg: t("form.need_phone") };
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return { field: "email", msg: t("form.bad_email") };
    if (!consent) return { field: "consent", msg: t("form.need_consent") };
    return null;
  };
  const errFor = (f: string) =>
    err && err.field === f ? (
      <p id={`err-${f}`} role="alert" className="mt-2 text-base font-semibold" style={{ color: "var(--state-error)" }}>{err.msg}</p>
    ) : null;
  const invalid = (f: string) => (err && err.field === f ? { "aria-invalid": true as const, "aria-describedby": `err-${f}` } : {});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErr(v);
    if (v) {
      const el = document.querySelector<HTMLInputElement>(`form [name="${v.field}"]`);
      el?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    const payload = {
      site: "nam", lang,
      name: name.trim(), email: email.trim(), phone: normPhone(),
      channel: CHANNEL_VALUE[channel], country: "", topic: lang === "en" ? "Join the NAM Project" : "Tham gia Dự án NAM",
      organisation: "", bestTime: "", message: "",
      consent: true, website: hp,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      page: location.href, referrer: ss("referrer") || document.referrer || "(direct)",
      utm_source: ss("utm_source"), utm_medium: ss("utm_medium"), utm_campaign: ss("utm_campaign"),
      userAgent: navigator.userAgent, elapsedMs: Date.now() - startedAt.current,
    };
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // no CORS preflight for Apps Script
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      const res = await r.json();
      if (res && res.ok) {
        setStatus({ kind: "ok", id: String(res.id || "") });
        // Count the sign-up in GA4 without any personal data.
        window.gtag?.("event", "generate_lead", { site: "nam" });
      } else {
        setStatus({ kind: "error" });
      }
    } catch {
      setStatus({ kind: "error" });
    } finally {
      clearTimeout(timer);
    }
  };

  if (status.kind === "ok") {
    return (
      <div role="status" className="text-center py-10">
        <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--nam-gold-light)" }}>{t("form.ok_title")}</h3>
        <p className="text-base mb-6" style={{ color: "var(--nam-cream-2)" }}>
          {t("form.ok_body", { id: status.id, channel: t(`form.chs_${channel}`) })}
        </p>
        <p className="text-base mb-3" style={{ color: "var(--nam-cream)" }}>{t("form.ok_next")}</p>
        <a href="https://www.facebook.com/nam.nhileteam" target="_blank" rel="noopener noreferrer"
          className="underline underline-offset-4 font-semibold" style={{ color: "var(--nam-gold-light)" }}
          data-track="contact" data-cta="cam-on-facebook">{t("form.ok_next_link")}</a>
      </div>
    );
  }

  const mailto =
    "mailto:" + TEAM_EMAIL +
    "?subject=" + encodeURIComponent("[nam] form-loi-gui-email") +
    "&body=" + encodeURIComponent([name.trim(), normPhone(), email.trim(), "Kênh: " + CHANNEL_VALUE[channel], "", "— nam.nhi.sg · " + location.href, "utm: " + [ss("utm_source"), ss("utm_medium"), ss("utm_campaign")].join(" / ")].join("\n"));

  return (
    <form onSubmit={submit} noValidate className="space-y-5 text-left">
      <label className="block">
        <span className="block mb-2 font-semibold" style={{ color: "var(--nam-cream)" }}>{t("form.name")}</span>
        <input className="nam-input" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} {...invalid("name")} />
        {errFor("name")}
      </label>
      <fieldset>
        <legend className="block mb-2 font-semibold" style={{ color: "var(--nam-cream)" }}>{t("form.channel")}</legend>
        <div className="grid grid-cols-3 gap-2">
          {(["zalo", "phone", "email"] as const).map((c) => (
            <label key={c} className="flex items-center justify-center min-h-[48px] rounded-xl cursor-pointer text-base font-semibold border focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#B7860B]"
              style={channel === c
                ? { background: "var(--nam-gold-light)", color: "var(--nam-black)", borderColor: "var(--nam-gold-light)" }
                : { background: "var(--nam-black)", color: "var(--nam-cream)", borderColor: "var(--nam-line)" }}>
              <input type="radio" name="channel" value={c} checked={channel === c} onChange={() => setChannel(c)} className="sr-only" />
              {t(`form.ch_${c}`)}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="block mb-2 font-semibold" style={{ color: "var(--nam-cream)" }}>{channel === "email" ? t("form.phone_optional") : t("form.phone")}</span>
        <input className="nam-input" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="09xx xxx xxx" value={phone} onChange={(e) => setPhone(e.target.value)} {...invalid("phone")} />
        {errFor("phone")}
      </label>
      <label className="block">
        <span className="block mb-2 font-semibold" style={{ color: "var(--nam-cream)" }}>{channel === "email" ? t("form.email_required") : t("form.email")}</span>
        <input className="nam-input" name="email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} {...invalid("email")} />
        {errFor("email")}
      </label>
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <input tabIndex={-1} autoComplete="off" name="website" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>
      <label className="flex gap-3 items-start text-base" style={{ color: "var(--nam-cream-2)" }}>
        <input type="checkbox" name="consent" className="mt-0.5 w-6 h-6 flex-none accent-[#B7860B]" checked={consent} onChange={(e) => setConsent(e.target.checked)} {...invalid("consent")} />
        <span>
          {t("form.consent")}{" "}
          <Link to="/chinh-sach-bao-mat" className="underline underline-offset-4 inline-block py-[11px]" style={{ color: "var(--nam-gold-light)" }}>
            {t("form.privacy_link")}
          </Link>
        </span>
      </label>

      {errFor("consent")}

      {status.kind === "error" && (
        <div role="alert" className="rounded-xl p-4 border" style={{ borderColor: "var(--nam-line)", background: "var(--nam-black)" }}>
          <p className="font-bold mb-1" style={{ color: "var(--nam-cream)" }}>{t("form.err_title")}</p>
          <p className="text-base mb-3" style={{ color: "var(--nam-cream-2)" }}>{t("form.err_body")}</p>
          <a href={mailto} data-track="contact" data-cta="form-loi-gui-email" className="underline underline-offset-4 font-semibold" style={{ color: "var(--nam-gold-light)" }}>{t("form.err_mail")}</a>
        </div>
      )}

      <button type="submit" className="nam-cta w-full" data-track="cta" data-cta="form-dang-ky" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? t("form.sending") : status.kind === "error" ? t("form.retry") : t("form.submit")}
      </button>
    </form>
  );
};
