import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";

type Section = { h: string; p: string };

const Privacy = () => {
  const { t } = useTranslation();
  const sections = t("privacy.sections", { returnObjects: true }) as Section[];

  useEffect(() => {
    document.title = `${t("privacy.title")} · NAM`;
    window.scrollTo(0, 0);
  }, [t]);

  return (
    <div className="min-h-screen font-inter" style={{ background: "var(--nam-black)", color: "var(--nam-cream)" }}>
      <LanguageToggle />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
        <Link to="/" className="text-sm underline underline-offset-4" style={{ color: "var(--nam-gold-light)" }}>
          {t("privacy.back")}
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold mt-6 mb-2">{t("privacy.title")}</h1>
        <p className="text-sm mb-10" style={{ color: "var(--nam-cream-2)" }}>{t("privacy.updated")}</p>
        {sections.map((s) => (
          <section key={s.h} className="mb-8">
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--nam-gold-light)" }}>{s.h}</h2>
            <p className="leading-relaxed" style={{ color: "var(--nam-cream-2)" }}>{s.p}</p>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Privacy;
