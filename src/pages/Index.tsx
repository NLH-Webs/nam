import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroImage from "@/assets/hero-bg.jpg";
import { useState } from "react";
import { saveToGoogleSheets } from "@/services/googleSheetsService";
import { motion, Variants } from "framer-motion";
import { Loader2 } from "lucide-react";
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
  const [showThankYou, setShowThankYou] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save to Google Sheets
      await saveToGoogleSheets(formData);
      // Wait a bit for effect
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowThankYou(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show success message even if Google Sheets fails
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowThankYou(true);
    } finally {
      setIsLoading(false);
    }
  };

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

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card border border-border/50 p-8 rounded-2xl shadow-xl shadow-black/20"
              >
                <h3 className="text-2xl font-bold mb-8 text-primary flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-background text-sm font-bold">1</span>
                  {t('form.step1.title')}
                </h3>

                {!showThankYou ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base">{t('form.step1.name_label')}</Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t('form.step1.name_placeholder')}
                        className="h-12 bg-background/50 text-lg border-white/10 focus:border-primary/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">{t('form.step1.email_label')}</Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t('form.step1.email_placeholder')}
                        className="h-12 bg-background/50 text-lg border-white/10 focus:border-primary/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base">{t('form.step1.phone_label')}</Label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('form.step1.phone_placeholder')}
                        className="h-12 bg-background/50 text-lg border-white/10 focus:border-primary/50"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full h-14 text-lg font-bold mt-4"
                      variant="default"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t('form.step1.sending')}
                        </>
                      ) : (
                        t('form.step1.submit')
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      {t('form.step1.privacy')}
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 text-green-500">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{t('form.step1.success_title')}</h3>
                    <p className="text-muted-foreground mb-8">{t('form.step1.success_desc')}</p>
                    <Button
                      onClick={() => {
                        setShowThankYou(false);
                        setFormData({ name: '', email: '', phone: '' });
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      {t('form.step1.reset_btn')}
                    </Button>
                  </motion.div>
                )}
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card border border-border/50 p-8 rounded-2xl shadow-xl shadow-black/20"
              >
                <h3 className="text-2xl font-bold mb-8 text-primary flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-background text-sm font-bold">2</span>
                  {t('form.step2.title')}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <Button variant="social" className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white border-0" asChild>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScCdQhfI1pOT9gUQBTN0hxs0kN15TuZ1U4WEzq-L2aQdukDaQ/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('form.step2.btn_google')}
                    </a>
                  </Button>
                  <Button variant="social" className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white border-0" asChild>
                    <a href="https://www.facebook.com/nam.nhileteam" target="_blank" rel="noopener noreferrer">
                      {t('form.step2.btn_facebook')}
                    </a>
                  </Button>
                  <Button variant="social" className="w-full h-14 bg-pink-600 hover:bg-pink-700 text-white border-0" asChild>
                    <a href="https://www.instagram.com/namnhi.nlt/" target="_blank" rel="noopener noreferrer">
                      {t('form.step2.btn_instagram')}
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="nlh-lead" id="lien-he">
          <nlh-contact site="nam" topics-vi="Tham gia Dự án NAM|Hợp tác|Tài trợ – đồng hành" topics-en="Join the NAM Project|Partnership|Sponsorship" />
        </section>
      </main>

      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <h3 className="text-2xl font-black text-foreground mb-4 tracking-wider">{t('footer.project')}</h3>
          <p className="mb-2 text-lg">
            {t('footer.belong_to')} <strong className="text-primary">{t('footer.team')}</strong>
          </p>
          <p className="mb-8 opacity-80">{t('footer.slogan')}</p>

          <div className="flex justify-center flex-wrap gap-8 mb-8">
            <a href="https://www.facebook.com/nam.nhileteam" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors uppercase text-sm font-bold tracking-widest">{t('footer.facebook')}</a>
            <a href="https://www.instagram.com/namnhi.nlt/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors uppercase text-sm font-bold tracking-widest">{t('footer.instagram')}</a>
            <a href="https://t.me/namnhi" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors uppercase text-sm font-bold tracking-widest">{t('footer.telegram')}</a>
          </div>

          <p className="text-sm opacity-50">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
