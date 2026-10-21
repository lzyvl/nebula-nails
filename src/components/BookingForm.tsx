"use client";

import { useEffect, useRef, useState } from "react";
import { FRENCH_TIP_ADD, REMOVAL_PRICE, formatGbp, gelServices } from "@/data/prices";
import { site } from "@/data/site";
import {
  bookingSchema,
  estimateGbp,
  fieldErrors,
  prepLabels,
  prepOptions,
  serviceDetails,
  timeLabels,
  timeOptions,
  todayInLondon,
} from "@/lib/booking";
import { Doodle } from "./Doodle";

type Values = {
  name: string;
  contact: string;
  service: string;
  french: boolean;
  prep: string;
  artNotes: string;
  inspoLink: string;
  date1: string;
  date2: string;
  time: string;
  age: string;
  parentConsent: boolean;
  notes: string;
  policy: boolean;
  website: string;
};

const initial: Values = {
  name: "",
  contact: "",
  service: "",
  french: false,
  prep: "fresh",
  artNotes: "",
  inspoLink: "",
  date1: "",
  date2: "",
  time: "",
  age: "16plus",
  parentConsent: false,
  notes: "",
  policy: false,
  website: "",
};

// the order fields appear on the page, so the first error gets focus
const fieldOrder = [
  "service",
  "prep",
  "artNotes",
  "inspoLink",
  "date1",
  "date2",
  "time",
  "name",
  "contact",
  "age",
  "parentConsent",
  "notes",
  "policy",
];

type Banner = "not_configured" | "rate_limited" | "send_failed" | "network";

const bannerText: Record<Banner, string> = {
  not_configured:
    "online booking isn't switched on yet. please dm me on instagram to book instead.",
  rate_limited:
    "too many requests came from your connection. try again in an hour, or dm me on instagram.",
  send_failed:
    "your request didn't send. try again in a minute, or dm me on instagram to book.",
  network: "couldn't reach the server. check your connection and try again.",
};

function Err({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-[0.95rem] font-bold text-rosewater">
      {message}
    </p>
  );
}

export function BookingForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [banner, setBanner] = useState<Banner | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [sentTo, setSentTo] = useState({ name: "", contact: "" });

  const date1Ref = useRef<HTMLInputElement>(null);
  const date2Ref = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // dates can't be in the past (set after load so the build date never goes stale)
  useEffect(() => {
    const today = todayInLondon();
    if (date1Ref.current) date1Ref.current.min = today;
    if (date2Ref.current) date2Ref.current.min = today;
  }, []);

  useEffect(() => {
    if (status === "sent") {
      successRef.current?.focus();
      successRef.current?.scrollIntoView({ block: "center" });
    }
  }, [status]);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) {
      setErrors((e) => {
        const { [key]: _removed, ...rest } = e;
        void _removed;
        return rest;
      });
    }
  }

  function focusFirstError(errs: Record<string, string>) {
    const first = fieldOrder.find((k) => errs[k]) ?? Object.keys(errs)[0];
    if (!first) return;
    if (["artNotes", "inspoLink", "notes"].includes(first)) {
      setMoreOpen(true);
      setTimeout(() => document.getElementById(`f-${first}`)?.focus(), 50);
    } else {
      document.getElementById(`f-${first}`)?.focus();
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const parsed = bookingSchema.safeParse(values);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      focusFirstError(errs);
      return;
    }

    setErrors({});
    setBanner(null);
    setStatus("sending");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setSentTo({ name: values.name.trim(), contact: values.contact.trim() });
        setStatus("sent");
        return;
      }

      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        fields?: Record<string, string>;
      };

      setStatus("idle");
      if (res.status === 422 && body.fields) {
        setErrors(body.fields);
        focusFirstError(body.fields);
      } else if (body.error === "not_configured") {
        setBanner("not_configured");
      } else if (res.status === 429) {
        setBanner("rate_limited");
      } else {
        setBanner("send_failed");
      }
    } catch {
      setStatus("idle");
      setBanner("network");
    }
  }

  function reset() {
    setValues(initial);
    setErrors({});
    setBanner(null);
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-[2rem] border-2 border-plum bg-white p-8 shadow-[6px_6px_0_var(--ballet)] outline-none md:p-12"
      >
        <Doodle name="planet" className="bob h-14 w-14" />
        <h3 className="display mt-4 text-[clamp(2.2rem,6vw,3.4rem)]">request sent</h3>
        <p className="mt-4 max-w-[48ch] text-[1.1rem]">
          thanks{sentTo.name ? `, ${sentTo.name}` : ""}. i&apos;ll reply to {sentTo.contact} to
          confirm your slot and sort the {formatGbp(site.depositGbp)} deposit. your appointment
          isn&apos;t confirmed until the deposit is paid.
        </p>
        <button type="button" onClick={reset} className="sticker sticker-quiet mt-8">
          make another request
        </button>
      </div>
    );
  }

  const estimate = estimateGbp(values);
  const svc = serviceDetails(values.service);
  const err = (k: string) => errors[k];
  const invalid = (k: string) => (errors[k] ? true : undefined);
  const described = (k: string) => (errors[k] ? `err-${k}` : undefined);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="booking request"
      className="grid gap-10 rounded-[2rem] border-2 border-plum bg-white p-6 shadow-[6px_6px_0_var(--ballet)] md:p-10 lg:grid-cols-[1fr_18rem] lg:gap-14"
    >
      <div className="space-y-9">
        {/* honeypot: hidden from people, irresistible to bots */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            leave this empty
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(e) => set("website", e.target.value)}
            />
          </label>
        </div>

        <fieldset className="min-w-0">
          <legend className="mb-3 text-[1.15rem] font-bold">choose your set</legend>
          <div
            id="f-service"
            tabIndex={-1}
            role="radiogroup"
            aria-label="choose a service"
            aria-invalid={invalid("service")}
            aria-describedby={described("service")}
            className="grid gap-2.5 outline-none sm:grid-cols-2"
          >
            {gelServices.map((s) => (
              <label key={s.id} className="choice">
                <input
                  type="radio"
                  name="service"
                  value={s.id}
                  checked={values.service === s.id}
                  onChange={() => set("service", s.id)}
                />
                <span className="choice-face">
                  <span>
                    {s.id === "gel-overlay" ? "gel overlay" : s.label}
                    {s.detail ? (
                      <span className="block text-sm font-normal text-mauve">{s.detail}</span>
                    ) : null}
                  </span>
                  <span className="choice-price">{formatGbp(s.price)}</span>
                </span>
              </label>
            ))}
            <label className="choice">
              <input
                type="checkbox"
                checked={values.french}
                onChange={(e) => set("french", e.target.checked)}
              />
              <span className="choice-face">
                <span>add french tips</span>
                <span className="choice-price">+{formatGbp(FRENCH_TIP_ADD)}</span>
              </span>
            </label>
          </div>
          <Err id="err-service" message={err("service")} />
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="mb-3 text-[1.15rem] font-bold">what&apos;s on your nails now?</legend>
          <div
            id="f-prep"
            tabIndex={-1}
            role="radiogroup"
            aria-label="removal or infill"
            aria-invalid={invalid("prep")}
            aria-describedby={described("prep")}
            className="grid gap-2.5 sm:grid-cols-3"
          >
            {prepOptions.map((p) => (
              <label key={p} className="choice">
                <input
                  type="radio"
                  name="prep"
                  value={p}
                  checked={values.prep === p}
                  onChange={() => set("prep", p)}
                />
                <span className="choice-face justify-center text-center">
                  <span>
                    {prepLabels[p]}
                    {p === "removal" ? ` +${formatGbp(REMOVAL_PRICE)}` : ""}
                  </span>
                </span>
              </label>
            ))}
          </div>
          <Err id="err-prep" message={err("prep")} />
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="mb-3 text-[1.15rem] font-bold">when suits you?</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="f-date1" className="mb-1.5 block text-sm font-semibold">
                first choice
              </label>
              <input
                ref={date1Ref}
                id="f-date1"
                type="date"
                className="field"
                value={values.date1}
                onChange={(e) => set("date1", e.target.value)}
                aria-required="true"
                aria-invalid={invalid("date1")}
                aria-describedby={described("date1")}
              />
              <Err id="err-date1" message={err("date1")} />
            </div>
            <div>
              <label htmlFor="f-date2" className="mb-1.5 block text-sm font-semibold">
                backup date (optional)
              </label>
              <input
                ref={date2Ref}
                id="f-date2"
                type="date"
                className="field"
                value={values.date2}
                onChange={(e) => set("date2", e.target.value)}
                aria-invalid={invalid("date2")}
                aria-describedby={described("date2")}
              />
              <Err id="err-date2" message={err("date2")} />
            </div>
          </div>
          <div
            id="f-time"
            tabIndex={-1}
            role="radiogroup"
            aria-label="time of day"
            aria-invalid={invalid("time")}
            aria-describedby={described("time")}
            className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
          >
            {timeOptions.map((t) => (
              <label key={t} className="choice">
                <input
                  type="radio"
                  name="time"
                  value={t}
                  checked={values.time === t}
                  onChange={() => set("time", t)}
                />
                <span className="choice-face justify-center">{timeLabels[t]}</span>
              </label>
            ))}
          </div>
          <Err id="err-time" message={err("time")} />
        </fieldset>

        <fieldset className="min-w-0">
          <legend className="mb-3 text-[1.15rem] font-bold">you</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="f-name" className="mb-1.5 block text-sm font-semibold">
                name
              </label>
              <input
                id="f-name"
                type="text"
                autoComplete="name"
                maxLength={80}
                className="field"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                aria-required="true"
                aria-invalid={invalid("name")}
                aria-describedby={described("name")}
              />
              <Err id="err-name" message={err("name")} />
            </div>
            <div>
              <label htmlFor="f-contact" className="mb-1.5 block text-sm font-semibold">
                instagram, email or phone
              </label>
              <input
                id="f-contact"
                type="text"
                autoComplete="off"
                maxLength={120}
                className="field"
                value={values.contact}
                onChange={(e) => set("contact", e.target.value)}
                aria-required="true"
                aria-invalid={invalid("contact")}
                aria-describedby={described("contact")}
                placeholder="@yourname"
              />
              <Err id="err-contact" message={err("contact")} />
            </div>
          </div>

          <label className="mt-4 flex items-center gap-3">
            <input
              id="f-age"
              type="checkbox"
              className="h-5 w-5 accent-[var(--rosewater)]"
              checked={values.age === "under16"}
              onChange={(e) => set("age", e.target.checked ? "under16" : "16plus")}
            />
            <span>i&apos;m under 16</span>
          </label>
          {values.age === "under16" ? (
            <div className="mt-3">
              <label className="flex items-start gap-3">
                <input
                  id="f-parentConsent"
                  type="checkbox"
                  className="mt-1 h-5 w-5 flex-none accent-[var(--rosewater)]"
                  checked={values.parentConsent}
                  onChange={(e) => set("parentConsent", e.target.checked)}
                  aria-invalid={invalid("parentConsent")}
                  aria-describedby={described("parentConsent")}
                />
                <span>i&apos;ll bring proof of parental consent to my appointment</span>
              </label>
              <Err id="err-parentConsent" message={err("parentConsent")} />
            </div>
          ) : null}
        </fieldset>

        <details
          className="fold"
          open={moreOpen}
          onToggle={(e) => setMoreOpen(e.currentTarget.open)}
        >
          <summary>nail art ideas or notes (optional)</summary>
          <div className="fold-body space-y-4">
            <div>
              <label htmlFor="f-artNotes" className="mb-1.5 block text-sm font-semibold">
                the design you want. nail art is quoted separately.
              </label>
              <textarea
                id="f-artNotes"
                rows={3}
                maxLength={800}
                className="field"
                value={values.artNotes}
                onChange={(e) => set("artNotes", e.target.value)}
                aria-invalid={invalid("artNotes")}
                aria-describedby={described("artNotes")}
              />
              <Err id="err-artNotes" message={err("artNotes")} />
            </div>
            <div>
              <label htmlFor="f-inspoLink" className="mb-1.5 block text-sm font-semibold">
                link to an inspo photo
              </label>
              <input
                id="f-inspoLink"
                type="url"
                inputMode="url"
                maxLength={300}
                className="field"
                value={values.inspoLink}
                onChange={(e) => set("inspoLink", e.target.value)}
                aria-invalid={invalid("inspoLink")}
                aria-describedby={described("inspoLink")}
                placeholder="https://"
              />
              <Err id="err-inspoLink" message={err("inspoLink")} />
            </div>
            <div>
              <label htmlFor="f-notes" className="mb-1.5 block text-sm font-semibold">
                anything else i should know?
              </label>
              <textarea
                id="f-notes"
                rows={2}
                maxLength={800}
                className="field"
                value={values.notes}
                onChange={(e) => set("notes", e.target.value)}
                aria-invalid={invalid("notes")}
                aria-describedby={described("notes")}
              />
              <Err id="err-notes" message={err("notes")} />
            </div>
          </div>
        </details>
      </div>

      <aside className="self-start rounded-[1.5rem] bg-petal p-6 lg:sticky lg:top-24">
        <h3 className="display text-[1.6rem]">your request</h3>
        {svc && estimate !== null ? (
          <dl className="mt-3 space-y-2">
            <div className="flex justify-between gap-4">
              <dt>{svc.id === "gel-overlay" ? "gel overlay" : svc.label}</dt>
              <dd className="font-semibold">{formatGbp(svc.price)}</dd>
            </div>
            {values.french ? (
              <div className="flex justify-between gap-4">
                <dt>french tips</dt>
                <dd className="font-semibold">+{formatGbp(FRENCH_TIP_ADD)}</dd>
              </div>
            ) : null}
            {values.prep === "removal" ? (
              <div className="flex justify-between gap-4">
                <dt>removal</dt>
                <dd className="font-semibold">+{formatGbp(REMOVAL_PRICE)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-4 border-t-2 border-dotted border-peony pt-3">
              <dt className="font-bold">estimate</dt>
              <dd className="font-display text-[1.5rem] font-semibold [font-variation-settings:'SOFT'_100]">
                {formatGbp(estimate)}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-3 text-mauve">pick a set to see your estimate.</p>
        )}
        <p className="mt-3 text-sm text-mauve">
          nail art is quoted separately. a {formatGbp(site.depositGbp)} deposit confirms your slot.
        </p>

        <label className="mt-5 flex items-start gap-3">
          <input
            id="f-policy"
            type="checkbox"
            className="mt-1 h-5 w-5 flex-none accent-[var(--rosewater)]"
            checked={values.policy}
            onChange={(e) => set("policy", e.target.checked)}
            aria-invalid={invalid("policy")}
            aria-describedby={described("policy")}
          />
          <span className="text-[0.95rem]">
            i&apos;ve read the{" "}
            <a href="/prices#policy" className="underline decoration-peony decoration-2 underline-offset-4">
              booking policy
            </a>
          </span>
        </label>
        <Err id="err-policy" message={err("policy")} />

        {banner ? (
          <p role="alert" className="mt-5 rounded-2xl border-2 border-rosewater bg-white p-4 text-[0.95rem] font-semibold text-rosewater">
            {bannerText[banner]}{" "}
            {banner !== "network" ? (
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                @{site.handle}
              </a>
            ) : null}
          </p>
        ) : null}

        <button
          type="submit"
          className="sticker mt-5 w-full"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
        >
          {status === "sending" ? "sending" : "send request"}
        </button>
      </aside>
    </form>
  );
}
