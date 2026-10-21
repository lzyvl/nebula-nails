import { z } from "zod";
import { FRENCH_TIP_ADD, REMOVAL_PRICE, gelServices } from "@/data/prices";

export const serviceIds = ["gel-overlay", "short", "medium", "long", "extra-long"] as const;
export const prepOptions = ["fresh", "removal", "infill"] as const;
export const timeOptions = ["morning", "afternoon", "evening", "flexible"] as const;
export const ageOptions = ["16plus", "under16"] as const;

export const prepLabels: Record<(typeof prepOptions)[number], string> = {
  fresh: "fresh start",
  removal: "removal",
  infill: "infill",
};

export const timeLabels: Record<(typeof timeOptions)[number], string> = {
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  flexible: "i'm flexible",
};

/** today's date as YYYY-MM-DD in the uk, so "not in the past" matches her calendar. */
export function todayInLondon(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function isRealDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

const text = (max: number) =>
  z.string().trim().max(max, `keep this under ${max} characters`);

export const bookingSchema = z
  .object({
    name: z.string().trim().min(1, "add your name").max(80, "keep this under 80 characters"),
    contact: z
      .string()
      .trim()
      .min(3, "add an instagram handle, email or phone number so she can reply")
      .max(120, "keep this under 120 characters"),
    service: z.enum(serviceIds, { error: "choose a service" }),
    french: z.boolean(),
    prep: z.enum(prepOptions, { error: "choose one" }),
    artNotes: text(800),
    inspoLink: text(300),
    date1: z.string().trim(),
    date2: z.string().trim(),
    time: z.enum(timeOptions, { error: "choose a time of day" }),
    age: z.enum(ageOptions, { error: "choose one" }),
    parentConsent: z.boolean(),
    notes: text(800),
    policy: z.literal(true, { error: "tick this to confirm you've read the booking policy" }),
    // honeypot: real people never see or fill this
    website: z.string().max(200),
  })
  .superRefine((v, ctx) => {
    const today = todayInLondon();

    if (!v.date1) {
      ctx.addIssue({ code: "custom", path: ["date1"], message: "pick the date you'd like" });
    } else if (!isRealDate(v.date1)) {
      ctx.addIssue({ code: "custom", path: ["date1"], message: "pick a real date" });
    } else if (v.date1 < today) {
      ctx.addIssue({ code: "custom", path: ["date1"], message: "pick a date from today onwards" });
    }

    if (v.date2) {
      if (!isRealDate(v.date2)) {
        ctx.addIssue({ code: "custom", path: ["date2"], message: "pick a real date" });
      } else if (v.date2 < today) {
        ctx.addIssue({ code: "custom", path: ["date2"], message: "pick a date from today onwards" });
      }
    }

    if (v.inspoLink && !isHttpUrl(v.inspoLink)) {
      ctx.addIssue({
        code: "custom",
        path: ["inspoLink"],
        message: "paste a full link starting with https://, or leave this empty",
      });
    }

    if (v.age === "under16" && !v.parentConsent) {
      ctx.addIssue({
        code: "custom",
        path: ["parentConsent"],
        message: "under 16s need proof of parental consent at the appointment",
      });
    }
  });

export type BookingInput = z.input<typeof bookingSchema>;

/** first error message per field */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}

export function serviceDetails(id: string) {
  return gelServices.find((s) => s.id === id);
}

/** estimated price in GBP; nail art is quoted separately and infills are priced by her. */
export function estimateGbp(input: { service: string; french: boolean; prep: string }): number | null {
  const svc = serviceDetails(input.service);
  if (!svc) return null;
  let total = svc.price;
  if (input.french) total += FRENCH_TIP_ADD;
  if (input.prep === "removal") total += REMOVAL_PRICE;
  return total;
}
