/**
 * Opening Hours Utility
 * Calculates real-time restaurant status based on Swedish time (Europe/Stockholm)
 */

export interface OpeningHoursSchedule {
  day: number; // 0 = Sunday, 1 = Monday, etc.
  open: string; // "11:00"
  close: string; // "20:00"
}

// Parse from siteConfig format to structured schedule
export const weeklySchedule: OpeningHoursSchedule[] = [
  { day: 0, open: "12:00", close: "20:30" }, // Sunday
  { day: 1, open: "11:00", close: "20:00" }, // Monday
  { day: 2, open: "11:00", close: "20:00" }, // Tuesday
  { day: 3, open: "11:00", close: "20:00" }, // Wednesday
  { day: 4, open: "11:00", close: "20:00" }, // Thursday
  { day: 5, open: "11:00", close: "20:30" }, // Friday
  { day: 6, open: "12:00", close: "20:30" }, // Saturday
];

export type RestaurantStatus = "open" | "closed" | "closing-soon";

export interface OpeningHoursInfo {
  status: RestaurantStatus;
  statusText: string;
  nextEvent?: string; // "Closes at 20:00" or "Opens Mon at 11:00"
  isClosingSoon: boolean; // True if closing within 30 minutes
}

/**
 * Convert time string "HH:MM" to minutes since midnight
 */
function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Get current time in Sweden (Europe/Stockholm timezone)
 */
function getCurrentSwedishTime(): Date {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Stockholm" })
  );
}

/**
 * Get day name from day number
 */
function getDayName(dayNumber: number, t?: any): string {
  // Use translated day abbreviations if available, otherwise fallback to English
  const daysEn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysSv = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
  
  // Check if we have translations and use Swedish days, otherwise English
  if (t && t.status) {
    return daysSv[dayNumber];
  }
  return daysEn[dayNumber];
}

/**
 * Calculate restaurant status and next event
 */
export function getOpeningHoursInfo(t?: any): OpeningHoursInfo {
  const now = getCurrentSwedishTime();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todaySchedule = weeklySchedule.find((s) => s.day === currentDay);

  if (!todaySchedule) {
    return {
      status: "closed",
      statusText: t?.status?.closed || "Closed",
      nextEvent: t?.status?.checkHours || "Check opening hours",
      isClosingSoon: false,
    };
  }

  const openMinutes = timeToMinutes(todaySchedule.open);
  const closeMinutes = timeToMinutes(todaySchedule.close);

  // Check if currently open
  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    const minutesUntilClose = closeMinutes - currentMinutes;
    const isClosingSoon = minutesUntilClose <= 30;

    if (isClosingSoon) {
      const closesAt = t?.status?.closesAt?.replace('{{time}}', todaySchedule.close) || `Closes at ${todaySchedule.close}`;
      return {
        status: "closing-soon",
        statusText: t?.status?.closingSoon || "Closing Soon",
        nextEvent: closesAt,
        isClosingSoon: true,
      };
    }

    const closesAt = t?.status?.closesAt?.replace('{{time}}', todaySchedule.close) || `Closes at ${todaySchedule.close}`;
    return {
      status: "open",
      statusText: t?.status?.open || "Open Now",
      nextEvent: closesAt,
      isClosingSoon: false,
    };
  }

  // Restaurant is closed - find next opening
  let nextOpeningDay = currentDay;
  let nextSchedule = todaySchedule;

  // If before opening time today, next opening is today
  if (currentMinutes < openMinutes) {
    const opensTodayAt = t?.status?.opensTodayAt?.replace('{{time}}', todaySchedule.open) || `Opens today at ${todaySchedule.open}`;
    return {
      status: "closed",
      statusText: t?.status?.closed || "Closed",
      nextEvent: opensTodayAt,
      isClosingSoon: false,
    };
  }

  // Otherwise find next day we're open
  for (let i = 1; i <= 7; i++) {
    nextOpeningDay = (currentDay + i) % 7;
    nextSchedule = weeklySchedule.find((s) => s.day === nextOpeningDay)!;

    if (nextSchedule) {
      const dayName = getDayName(nextOpeningDay, t);
      const openingTime = nextSchedule.open;
      const opensAt = t?.status?.opensAt?.replace('{{day}}', dayName).replace('{{time}}', openingTime) || `Opens ${dayName} at ${openingTime}`;

      return {
        status: "closed",
        statusText: t?.status?.closed || "Closed",
        nextEvent: opensAt,
        isClosingSoon: false,
      };
    }
  }

  return {
    status: "closed",
    statusText: t?.status?.closed || "Closed",
    nextEvent: t?.status?.checkHours || "Check opening hours",
    isClosingSoon: false,
  };
}

/**
 * Get status icon emoji
 */
export function getStatusIcon(status: RestaurantStatus): string {
  switch (status) {
    case "open":
      return "🟢";
    case "closing-soon":
      return "⏰";
    case "closed":
      return "🔴";
    default:
      return "⏰";
  }
}
