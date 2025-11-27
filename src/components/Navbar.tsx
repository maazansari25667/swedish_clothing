"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { qoplaOrderUrl } from "@/config/site";
import { LiveHoursIndicator } from "./LiveHoursIndicator";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "./navigation/LanguageSwitcher";

const Navbar = () => {
  const pathname = usePathname();
  const { t, language } = useLanguage();

  console.log("🎯 Navbar render - current language:", language);
  console.log("📝 Navbar translations - Home label:", t.nav.home);

  // Navigation links for restaurant
  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border backdrop-blur-md bg-white/95 shadow-sm md:bg-background/80 md:shadow-none">
      <nav aria-label="Main Navigation" className="h-16 md:h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
          <div className="flex items-center justify-between w-full">
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/images/hero/Nomi_Logo-oyxtc6ij8tw0kopf1gif67mdone2m0xxyrffzzvq64.png"
                  alt="Nomi Sushi & Thai"
                  width={160}
                  height={60}
                  className="w-auto h-12"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation Links - Center */}
            <ul className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-base font-medium transition-all duration-200 hover:underline underline-offset-4 ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary hover:opacity-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop: CTA Button + Live Hours - Right */}
            {/* Mobile: Language Switcher + Status Pill + Order Button */}
            <div className="flex items-center gap-2 lg:gap-3">
              <LanguageSwitcher />
              <LiveHoursIndicator />
              <a href={qoplaOrderUrl} target="_blank" rel="noopener noreferrer" className="hidden lg:block">
                <Button variant="default">{t.nav.orderOnline}</Button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
