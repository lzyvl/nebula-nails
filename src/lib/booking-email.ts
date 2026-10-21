import {
  estimateGbp,
  prepLabels,
  serviceDetails,
  timeLabels,
  type BookingInput,
} from "@/lib/booking";
import { FRENCH_TIP_ADD, formatGbp } from "@/data/prices";
import { site } from "@/data/site";

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

function prettyDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00Z`));
}

export function replyToFor(contact: string): string | undefined {
  const c = contact.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) ? c : undefined;
}

export function buildBookingEmail(b: BookingInput): { subject: string; text: string } {
  const svc = serviceDetails(b.service);
  const estimate = estimateGbp(b);

  const service = [
    svc ? `${svc.label}${svc.detail ? ` (${svc.detail})` : ""}` : b.service,
    b.french ? `french tips (+${formatGbp(FRENCH_TIP_ADD)})` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const lines = [
    "new booking request",
    "",
    `name: ${oneLine(b.name)}`,
    `reply to: ${oneLine(b.contact)}`,
    "",
    `service: ${service}`,
    `prep: ${prepLabels[b.prep]}`,
    estimate !== null
      ? `estimate: ${formatGbp(estimate)} (nail art is quoted separately; infills are priced by you)`
      : "estimate: n/a",
    "",
    `preferred date: ${prettyDate(b.date1)}, ${timeLabels[b.time]}`,
    b.date2 ? `backup date: ${prettyDate(b.date2)}` : null,
    "",
    b.age === "under16"
      ? "age: under 16 (they've said they'll bring proof of parental consent)"
      : "age: 16 or over",
    b.artNotes ? `nail art ideas: ${b.artNotes}` : null,
    b.inspoLink ? `inspo link: ${b.inspoLink}` : null,
    b.notes ? `notes: ${b.notes}` : null,
    "",
    `reminder: the booking isn't confirmed until the ${formatGbp(site.depositGbp)} deposit is paid.`,
  ].filter((l): l is string => l !== null);

  return {
    subject: `new booking request: ${oneLine(b.name)}, ${svc?.label ?? b.service}`.slice(0, 200),
    text: lines.join("\n"),
  };
}
