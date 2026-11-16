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
    <div className="min-h-screen bg-background text-foreground font-inter">
      <LanguageToggle />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
        <Link to="/" className="text-sm text-primary underline underline-offset-4">
          {t("privacy.back")}
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold mt-6 mb-2">{t("privacy.title")}</h1>
        <p className="text-sm text-muted-foreground mb-10">{t("privacy.updated")}</p>
        {sections.map((s) => (
          <section key={s.h} className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-2">{s.h}</h2>
            <p className="text-muted-foreground leading-relaxed">{s.p}</p>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Privacy;
