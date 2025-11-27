"use client";

import { useEffect, useState } from "react";
import {
  getOpeningHoursInfo,
  getStatusIcon,
  type RestaurantStatus,
} from "@/lib/openingHours";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function LiveHoursIndicator() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<RestaurantStatus>("closed");
  const [statusText, setStatusText] = useState("");
  const [nextEvent, setNextEvent] = useState("");
  const [icon, setIcon] = useState("⏰");

  useEffect(() => {
    setMounted(true);

    // Update status immediately
    const updateStatus = () => {
      const info = getOpeningHoursInfo(t);
      setStatus(info.status);
      setStatusText(info.statusText);
      setNextEvent(info.nextEvent || "");
      setIcon(getStatusIcon(info.status));
    };

    updateStatus();

    // Update every minute
    const interval = setInterval(updateStatus, 60000);

    return () => clearInterval(interval);
  }, [language, t]);

  // Don't render during SSR to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all duration-300 ${
        status === "open"
          ? "bg-green-500/10 text-green-700 border border-green-500/20"
          : status === "closing-soon"
            ? "bg-amber-500/10 text-amber-700 border border-amber-500/20"
            : "bg-red-500/10 text-red-700 border border-red-500/20"
      }`}
    >
      <span className="text-sm" aria-hidden="true">
        {icon}
      </span>
      <span className="hidden sm:inline">{statusText}</span>
      {nextEvent && (
        <>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <span className="hidden md:inline text-muted-foreground">
            {nextEvent}
          </span>
        </>
      )}
    </div>
  );
}
