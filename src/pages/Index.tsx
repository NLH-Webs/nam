import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-bg.jpg";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SignupForm } from "@/components/SignupForm";

// One job, one number: a Vietnamese man who wants brothers and a place to grow
// signs up to join NAM. The number is completed sign-ups / page views (GA4 generate_lead).
// One primary button per screen, all pointing at the sign-up form.

type Item = { title: string; desc: string };
type Letter = { letter: string; words: string };

const cream = { color: "var(--nam-cream)" };
const cream2 = { color: "var(--nam-cream-2)" };
const gold = { color: "var(--nam-gold-light)" };

const Index = () => {
  const { t } = useTranslation();
  const who = t("who.items", { returnObjects: true }) as Item[];
  const letters = t("values.letters", { returnObjects: true }) as Letter[];

  return (
    <div className="min-h-screen overflow-x-hidden font-inter" style={{ background: "var(--nam-black)", ...cream }}>
      <LanguageToggle />

      {/* 1 · HERO: who, what, for whom, one button (Z pattern) */}
      <header
        className="relative min-h-[92vh] flex items-end sm:items-center px-4 sm:px-8 pt-24 pb-16"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(13,13,13,.94) 0%, rgba(13,13,13,.75) 55%, rgba(13,13,13,.35) 100%), url('${heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-6xl w-full mx-auto">
          <div className="max-w-xl">
            <p className="text-sm sm:text-base font-semibold tracking-widest uppercase mb-4" style={gold}>
              {t("hero.kicker")}
            </p>
            <h1 className="text-5xl sm:text-7xl font-black tracking-wide mb-5" style={cream}>
              {t("hero.title")}
            </h1>
            <p className="text-xl sm:text-2xl leading-snug mb-8" style={cream}>
              {t("hero.line")}
            </p>
            <a href="#dang-ky" className="nam-cta" data-track="cta" data-cta="hero-dang-ky">{t("hero.cta")}</a>
            <p className="mt-6 text-sm" style={cream2}>{t("hero.proof")}</p>
          </div>
        </div>
      </header>

      <main>
        {/* 2 · WHO IT IS FOR: scannable, one title + one line each */}
        <section className="px-4 sm:px-8 py-16 sm:py-24" style={{ background: "var(--nam-black-2)" }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10" style={cream}>{t("who.title")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {who.map((it) => (
                <div key={it.title} className="rounded-2xl p-6 border-t-4" style={{ borderColor: "var(--nam-gold)", background: "var(--nam-black)" }}>
                  <h3 className="text-lg font-bold mb-2" style={gold}>{it.title}</h3>
                  <p style={cream2}>{it.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · WHAT NAM STANDS FOR: three letters, words only */}
        <section className="px-4 sm:px-8 py-16 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-10" style={cream}>{t("values.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {letters.map((l) => (
                <div key={l.letter} className="flex items-center gap-5 rounded-2xl p-6" style={{ background: "var(--nam-black-2)" }}>
                  <span className="text-6xl font-black leading-none" style={{ color: "var(--nam-gold)" }} aria-hidden="true">{l.letter}</span>
                  <p className="text-lg font-semibold" style={cream}>{l.words}</p>
                </div>
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

      <footer className="px-4 py-12 text-center text-sm" style={{ background: "#000", ...cream2 }}>
        <p className="mx-auto text-lg font-black tracking-wider mb-2" style={cream}>{t("footer.project")}</p>
        <p className="mx-auto mb-6">{t("footer.belong_to")} <span style={gold}>{t("footer.team")}</span></p>
        <div className="flex justify-center flex-wrap gap-6 mb-6 font-semibold">
          <a href="https://www.facebook.com/nam.nhileteam" target="_blank" rel="noopener noreferrer" className="hover:underline" data-track="contact" data-cta="footer-facebook">Facebook</a>
          <a href="https://www.instagram.com/namnhi.nlt/" target="_blank" rel="noopener noreferrer" className="hover:underline" data-track="contact" data-cta="footer-instagram">Instagram</a>
          <a href="https://t.me/namnhi" target="_blank" rel="noopener noreferrer" className="hover:underline" data-track="contact" data-cta="footer-telegram">Telegram</a>
        </div>
        <p className="mx-auto mb-2">{t("footer.legal")}</p>
        <p className="mx-auto mb-2">
          <Link to="/chinh-sach-bao-mat" className="underline underline-offset-4" data-track="contact" data-cta="footer-chinh-sach">{t("form.privacy_link")}</Link>
        </p>
        <p className="mx-auto opacity-80">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  );
};

export default Index;
