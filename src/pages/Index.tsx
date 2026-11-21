import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// Hình vẽ minh hoạ (tự vẽ, không người thật, không logo), nằm trong public/.
const heroImage = "/nam-anh-em.svg";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SignupForm } from "@/components/SignupForm";
import { Reveal } from "@/components/Reveal";
import { ClipboardPen, PhoneCall, Users, UsersRound, TrendingUp, Dumbbell, GraduationCap, type LucideIcon } from "lucide-react";

// Lucide icons (ISC licence), drawn as inline SVG, stroke 1.75px.
const STROKE = 1.75;
const STEP_ICONS: LucideIcon[] = [ClipboardPen, PhoneCall, Users];
const WHO_ICONS: LucideIcon[] = [UsersRound, TrendingUp, Dumbbell, GraduationCap];

// One job, one number: a Vietnamese man who wants brothers and a place to grow
// signs up to join NAM. The number is completed sign-ups / page views (GA4 generate_lead).
// One primary button per screen, all pointing at the sign-up form.

type Item = { title: string; desc: string };
type Step = { title: string; desc: string };
type Letter = { letter: string; words: string };

const cream = { color: "var(--nam-cream)" };
const cream2 = { color: "var(--nam-cream-2)" };
const gold = { color: "var(--nam-gold-light)" };

const Index = () => {
  const { t } = useTranslation();
  const who = t("who.items", { returnObjects: true }) as Item[];
  const letters = t("values.letters", { returnObjects: true }) as Letter[];
  const steps = t("steps.items", { returnObjects: true }) as Step[];

  return (
    <div className="min-h-screen overflow-x-hidden font-inter" style={{ background: "var(--nam-black)", ...cream }}>
      <LanguageToggle />

      {/* 1 · HERO: who, what, for whom, one button (Z pattern) */}
      <header
        className="nam-dark relative min-h-[92vh] flex items-end sm:items-center px-4 sm:px-8 pt-24 pb-16"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(13,13,13,.94) 0%, rgba(13,13,13,.75) 55%, rgba(13,13,13,.35) 100%), url('${heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "70% center",
        }}
      >
        <div className="max-w-6xl w-full mx-auto">
          <div className="max-w-xl">
            <p className="text-base font-semibold tracking-widest uppercase mb-4" style={gold}>
              {t("hero.kicker")}
            </p>
            <h1 className="text-5xl sm:text-7xl font-black tracking-wide mb-5" style={cream}>
              {t("hero.title")}
            </h1>
            <p className="text-xl sm:text-2xl leading-snug mb-8" style={cream}>
              {t("hero.line")}
            </p>
            <a href="#dang-ky" className="nam-cta" data-track="cta" data-cta="hero-dang-ky">{t("hero.cta")}</a>
            <p className="mt-6 text-base" style={cream2}>{t("hero.proof")}</p>
          </div>

          {/* How it works, at a glance: three steps with icons */}
          <ol className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl" aria-label={t("steps.title")}>
            {steps.map((st, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <li key={st.title} className="flex items-start gap-4 rounded-2xl p-4" style={{ background: "rgba(13,13,13,.78)", border: "1px solid rgba(232,192,112,.25)" }}>
                  <span className="flex-none flex items-center justify-center w-12 h-12 rounded-full" style={{ background: "rgba(183,134,11,.15)", color: "var(--nam-gold-light)" }}>
                    <Icon size={26} strokeWidth={STROKE} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-base font-bold" style={cream}>{i + 1}. {st.title}</span>
                    <span className="block text-base" style={cream2}>{st.desc}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="absolute right-4 bottom-3 text-base" style={{ color: "rgba(248,244,238,.7)" }}>{t("hero.image_note")}</p>
      </header>

      <main>
        {/* 2 · WHO IT IS FOR: scannable, one title + one line each */}
        <section className="px-4 sm:px-8 py-16 sm:py-24" style={{ background: "var(--nam-black-2)" }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10" style={cream}>{t("who.title")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {who.map((it, i) => {
                const Icon = WHO_ICONS[i];
                return (
                  <Reveal key={it.title} delay={i * 60}>
                    <div className="h-full rounded-2xl p-6 border-t-4" style={{ borderColor: "var(--nam-gold)", background: "var(--nam-black)" }}>
                      <Icon size={32} strokeWidth={STROKE} aria-hidden="true" className="mb-4" style={{ color: "var(--nam-gold-light)" }} />
                      <h3 className="text-lg font-bold mb-2" style={gold}>{it.title}</h3>
                      <p className="text-base" style={cream2}>{it.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3 · WHAT NAM STANDS FOR: three letters, words only */}
        <section className="px-4 sm:px-8 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10" style={cream}>{t("values.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {letters.map((l, i) => (
                <Reveal key={l.letter} delay={i * 80}>
                  <div className="flex items-center gap-5 rounded-2xl p-6 h-full" style={{ background: "var(--nam-black-2)" }}>
                    <span className="text-6xl font-black leading-none" style={{ color: "var(--nam-gold)" }} aria-hidden="true">{l.letter}</span>
                    <p className="text-lg font-semibold" style={cream}>{l.words}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="text-xl sm:text-2xl font-bold mb-8" style={gold}>{t("values.slogan")}</p>
            <a href="#dang-ky" className="nam-cta" data-track="cta" data-cta="gia-tri-dang-ky">{t("hero.cta")}</a>
          </div>
        </section>

        {/* 4 · SIGN UP: three fields */}
        <section id="dang-ky" className="px-4 sm:px-8 py-16 sm:py-24" style={{ background: "var(--nam-black-2)" }}>
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={cream}>{t("form.title")}</h2>
            <p className="mb-8" style={cream2}>{t("form.subtitle")}</p>
            <SignupForm />
          </div>
        </section>
      </main>

      <footer className="nam-dark px-4 py-12 text-center text-base" style={{ background: "var(--nam-black)", ...cream2 }}>
        <p className="mx-auto text-lg font-black tracking-wider mb-2" style={cream}>{t("footer.project")}</p>
        <p className="mx-auto mb-6">{t("footer.belong_to")} <span style={gold}>{t("footer.team")}</span></p>
        <div className="flex justify-center flex-wrap gap-6 mb-6 font-semibold">
          <a href="https://www.facebook.com/nam.nhileteam" target="_blank" rel="noopener noreferrer" className="nam-link px-2 hover:underline" data-track="contact" data-cta="footer-facebook">Facebook</a>
          <a href="https://www.instagram.com/namnhi.nlt/" target="_blank" rel="noopener noreferrer" className="nam-link px-2 hover:underline" data-track="contact" data-cta="footer-instagram">Instagram</a>
          <a href="https://t.me/namnhi" target="_blank" rel="noopener noreferrer" className="nam-link px-2 hover:underline" data-track="contact" data-cta="footer-telegram">Telegram</a>
        </div>
        <p className="mx-auto mb-2">{t("footer.legal")}</p>
        <p className="mx-auto mb-2">
          <Link to="/chinh-sach-bao-mat" className="nam-link underline underline-offset-4" data-track="contact" data-cta="footer-chinh-sach">{t("form.privacy_link")}</Link>
        </p>
        <p className="mx-auto opacity-80">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  );
};

export default Index;
