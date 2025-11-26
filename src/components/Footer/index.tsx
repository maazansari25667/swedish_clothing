"use client";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { HighlightCard } from "@/components/ui/nc-card";
import { Button } from "@/components/ui/button";
import { siteName, qoplaOrderUrl } from "@/config/site";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <footer className="relative z-10 bg-background pt-16 md:pt-20 lg:pt-24 pb-12">
        <div className="container">
          {/* Weekly Special Section - Premium Typography */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide mb-4">
                ⭐ {t.footer.weeklySpecial.badge}
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                {t.footer.weeklySpecial.title}
              </h2>
              <p className="font-japanese text-lg text-primary/60 mt-2">
                週替わりスペシャル
              </p>
              <p className="font-sans font-light text-muted-foreground text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                {t.footer.weeklySpecial.subtitle}
              </p>
            </div>

            {/* PREMIUM DOUBLE-BORDER FRAME */}
            <div className="p-2 bg-gradient-to-br from-orange-400 via-primary to-orange-600 rounded-[32px] shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 max-w-4xl mx-auto">
              <div className="p-1.5 bg-white/95 rounded-[28px]">
                <HighlightCard className="overflow-hidden backdrop-blur-xl bg-white/90 border-2 border-white/50 shadow-[0_16px_64px_rgba(0,0,0,0.1)]">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Side */}
                    <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[400px] overflow-hidden group">
                      <Image
                        src="/images/hero/DSC08683-min-scaled.jpg"
                        alt={t.footer.weeklySpecial.dishName}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      {/* Gradient + Warm lighting */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-primary/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none" />

                      <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20">
                        {t.footer.weeklySpecial.badges.limitedTime}
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
                        {t.footer.weeklySpecial.title}
                      </h3>

                      <p className="font-sans font-light text-muted-foreground text-lg md:text-xl mb-6 leading-relaxed">
                        {t.footer.weeklySpecial.dishDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                          {t.footer.weeklySpecial.badges.freshDaily}
                        </span>
                        <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                          {t.footer.weeklySpecial.badges.premiumFish}
                        </span>
                        <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                          {t.footer.weeklySpecial.badges.pieces}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {t.footer.weeklySpecial.pricing.specialPrice}
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-primary">289:-</span>
                            <span className="text-lg text-muted-foreground line-through">349:-</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-primary">
                            {t.footer.weeklySpecial.pricing.save} 60 SEK
                          </p>
                        </div>
                      </div>

                      <a
                        href={qoplaOrderUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button variant="default" size="lg" className="w-full">
                          {t.footer.weeklySpecial.cta}
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Button>
                      </a>

                      <p className="text-xs text-muted-foreground text-center mt-4">
                        {t.footer.weeklySpecial.availability}
                      </p>
                    </div>
                  </div>
                </HighlightCard>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col items-center justify-center gap-6 pt-8 border-t border-border">
            <Link href="/" className="inline-block">
              <Image
                src="/images/hero/Nomi_Logo-oyxtc6ij8tw0kopf1gif67mdone2m0xxyrffzzvq64.png"
                alt={siteName}
                width={140}
                height={52}
                className="w-auto h-11"
              />
            </Link>
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteName}. {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
