import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LanguageToggle = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <motion.div
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
        >
            <div className="flex items-center backdrop-blur-md border rounded-full p-1 relative" style={{ background: "#0D0D0D", borderColor: "rgba(232,192,112,.45)" }}>
                <button
                    onClick={() => changeLanguage('vi')}
                    className={cn(
                        "relative z-10 min-w-[44px] min-h-[44px] px-4 text-base font-bold rounded-full transition-colors duration-300",
                        i18n.language === 'vi' ? "text-[#0D0D0D]" : "text-[#D9D2C6] hover:text-[#F8F4EE]"
                    )}
                >
                    VI
                    {i18n.language === 'vi' && (
                        <motion.div
                            layoutId="active-lang-pill"
                            className="absolute inset-0 bg-[#E8C070] rounded-full -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </button>
                <button
                    onClick={() => changeLanguage('en')}
                    className={cn(
                        "relative z-10 min-w-[44px] min-h-[44px] px-4 text-base font-bold rounded-full transition-colors duration-300",
                        i18n.language === 'en' ? "text-[#0D0D0D]" : "text-[#D9D2C6] hover:text-[#F8F4EE]"
                    )}
                >
                    EN
                    {i18n.language === 'en' && (
                        <motion.div
                            layoutId="active-lang-pill"
                            className="absolute inset-0 bg-[#E8C070] rounded-full -z-10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </button>
            </div>
        </motion.div>
    );
};
