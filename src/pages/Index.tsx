import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/LanguageToggle";

// Animation Variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

const Index = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background text-foreground font-inter overflow-x-hidden">
      <LanguageToggle />
      {/* HERO */}
      <header className="relative min-h-screen flex items-center justify-center text-center p-4 sm:p-6 overflow-hidden">
        {/* Background with Parallax-like fixed attachment */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(5, 10, 20, 0.8), rgba(5, 10, 20, 0.8)), url('${heroImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />

        <div className="max-w-4xl relative z-10 px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={fadeIn} className="text-lg sm:text-xl text-primary font-semibold mb-3 tracking-wide">
              {t('hero.project_from')}
            </motion.p>
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider mb-6 brand-letter text-shadow-golden">
              {t('hero.title')}
            </motion.h1>
            <motion.h2 variants={fadeIn} className="text-xl sm:text-2xl md:text-4xl font-bold mb-8 text-foreground/90">
              {t('hero.subtitle')}
            </motion.h2>
            <motion.p variants={fadeIn} className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground leading-relaxed">
              {t('hero.description')} <strong className="text-primary">{t('hero.description_bold')}</strong>
            </motion.p>

            <motion.div variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="#form-dang-ky" className="inline-block">
                <Button
                  variant="hero"
                  size="lg"
                  className="hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all duration-300 border-2 border-primary/20 backdrop-blur-sm"
                >
                  {t('hero.cta')}
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full" />
          </div>
        </motion.div>
      </header>

      <main>
        {/* FEATURES */}
        <section className="py-20 sm:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {t('features.title')}
              </motion.h2>
              <motion.div variants={fadeIn} className="h-1 w-24 bg-primary mx-auto rounded-full" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {(t('features.items', { returnObjects: true }) as any[]).map((item, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="bg-card/50 backdrop-blur-sm border border-white/5 p-8 rounded-xl hover:bg-card hover:border-primary/30 transition-all duration-300 group"
                >
                  <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-primary-hover">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center text-xl sm:text-2xl text-muted-foreground"
            >
              {t('features.conclusion_1')} <strong className="text-foreground">{t('features.conclusion_yes')}</strong>{t('features.conclusion_2')} <strong className="text-primary">{t('features.conclusion_nam')}</strong> {t('features.conclusion_3')}
            </motion.p>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="py-20 sm:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                {t('manifesto.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('manifesto.description')}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* N */}
              <motion.div variants={fadeIn} className="bg-secondary/20 p-8 rounded-2xl border-t-4 border-primary hover:bg-secondary/40 transition-colors group">
                <h3 className="text-7xl md:text-8xl font-black text-primary/20 group-hover:text-primary transition-colors duration-300 mb-6 select-none relative">
                  {t('manifesto.n.letter')}
                </h3>
                <ul className="space-y-4">
                  {(t('manifesto.n.items', { returnObjects: true }) as any[]).map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-primary font-bold">●</span>
                      <span><strong className="text-foreground text-lg">{item.term}</strong> – {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* A */}
              <motion.div variants={fadeIn} className="bg-secondary/20 p-8 rounded-2xl border-t-4 border-primary hover:bg-secondary/40 transition-colors group">
                <h3 className="text-7xl md:text-8xl font-black text-primary/20 group-hover:text-primary transition-colors duration-300 mb-6 select-none relative">
                  {t('manifesto.a.letter')}
                </h3>
                <ul className="space-y-4">
                  {(t('manifesto.a.items', { returnObjects: true }) as any[]).map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-primary font-bold">●</span>
                      <span><strong className="text-foreground text-lg">{item.term}</strong> – {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* M */}
              <motion.div variants={fadeIn} className="bg-secondary/20 p-8 rounded-2xl border-t-4 border-primary hover:bg-secondary/40 transition-colors relative group">
                <h3 className="text-7xl md:text-8xl font-black text-primary/20 group-hover:text-primary transition-colors duration-300 mb-6 select-none relative">
                  {t('manifesto.m.letter')}
                </h3>
                <ul className="space-y-4">
                  {(t('manifesto.m.items', { returnObjects: true }) as any[]).map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-primary font-bold">●</span>
                      <span><strong className="text-foreground text-lg">{item.term}</strong> – {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SLOGAN */}
        <section className="py-20 bg-gradient-to-b from-secondary/50 to-background border-y border-white/5">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-primary tracking-wider mb-6">
                {t('slogan.title')}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {t('slogan.provide_1')} <strong className="text-foreground">{t('slogan.provide_bold')}</strong> {t('slogan.provide_2')} <br className="hidden md:block" />
                {t('slogan.protect_1')} <strong className="text-foreground">{t('slogan.protect_bold')}</strong> {t('slogan.protect_2')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* FORM */}
        <section id="form-dang-ky" className="py-20 md:py-32 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {t('form.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('form.subtitle')}
              </p>
            </motion.div>

            {/* One form only: the shared NhiLe lead form. It reports a real error
                and offers an email fallback when sending fails. */}
            <div className="max-w-3xl mx-auto">
              <nlh-contact
                site="nam"
                no-heading=""
                topics-vi="Tham gia Dự án NAM|Hợp tác|Tài trợ – đồng hành"
                topics-en="Join the NAM Project|Partnership|Sponsorship"
              />
              <p className="mt-6 text-sm text-muted-foreground text-center">
                {t('form.privacy')}{" "}
                <Link to="/chinh-sach-bao-mat" className="underline underline-offset-4 hover:text-primary">
                  {t('form.privacy_link')}
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <h3 className="text-2xl font-black text-white mb-4 tracking-wider">{t('footer.project')}</h3>
          <p className="mx-auto mb-2 text-lg">
            {t('footer.belong_to')} <strong className="text-primary">{t('footer.team')}</strong>
          </p>
          <p className="mx-auto mb-8 opacity-80">{t('footer.slogan')}</p>

          <div className="flex justify-center flex-wrap gap-8 mb-8">
            <a href="https://www.facebook.com/nam.nhileteam" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors uppercase text-sm font-bold tracking-widest">{t('footer.facebook')}</a>
            <a href="https://www.instagram.com/namnhi.nlt/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors uppercase text-sm font-bold tracking-widest">{t('footer.instagram')}</a>
            <a href="https://t.me/namnhi" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors uppercase text-sm font-bold tracking-widest">{t('footer.telegram')}</a>
          </div>

          <p className="mx-auto text-sm opacity-70 mb-2">{t('footer.legal')}</p>
          <p className="mx-auto text-sm opacity-70 mb-2">
            <Link to="/chinh-sach-bao-mat" className="underline underline-offset-4 hover:text-primary">{t('form.privacy_link')}</Link>
          </p>
          <p className="mx-auto text-sm opacity-50">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
