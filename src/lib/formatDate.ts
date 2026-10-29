const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/**
 * Renders an ISO date (YYYY-MM-DD) as a human-readable, timezone-safe label.
 * Falls back to the raw value if it cannot be parsed, so content never breaks
 * because of a malformed date.
 */
export function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;

  const [, year, month, day] = match;
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName) return value;

  return `${Number(day)} ${monthName} ${year}`;
}
