"use client";

import { useState } from "react";
import { cafe, menu } from "./content";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const OPEN = "06:00";
const CLOSE = "14:00";

const toNumber = (price: string) => Number(price.replace(/[^0-9]/g, ""));
const money = (n: number) => `Rs. ${n.toLocaleString("en-US")}`;

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "pm" : "am"}`;
}

const field =
  "mt-1 w-full rounded-lg border-2 border-ink/30 bg-white px-3 py-2 text-lg focus:border-ink focus:outline-none";

export default function OrderBuilder() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [mode, setMode] = useState<"Dine in" | "Take away">("Take away");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const change = (item: string, delta: number) =>
    setQty((q) => ({ ...q, [item]: Math.max(0, (q[item] ?? 0) + delta) }));

  const lines = menu
    .flatMap((group) => group.items)
    .filter((item) => (qty[item.name] ?? 0) > 0)
    .map((item) => ({ ...item, count: qty[item.name], cost: qty[item.name] * toNumber(item.price) }));
  const total = lines.reduce((sum, l) => sum + l.cost, 0);

  const isFriday = date ? new Date(`${date}T00:00:00`).getDay() === 5 : false;
  const timeOk = time ? time >= OPEN && time <= CLOSE : false;

  let problem = "";
  if (lines.length === 0) problem = "Add at least one item.";
  else if (!date || !time) problem = "Pick a day and a time.";
  else if (isFriday) problem = "We are closed on Fridays. Please pick another day.";
  else if (!timeOk) problem = "We are open 6 am to 2 pm. Please pick a time in that range.";

  const message = [
    "Hello, I would like to place an order.",
    "",
    name ? `Name: ${name}` : null,
    `Order type: ${mode}`,
    date && time ? `Day: ${DAYS[new Date(`${date}T00:00:00`).getDay()]}, ${date}` : null,
    time ? `Time: ${formatTime(time)}` : null,
    "",
    "Items:",
    ...lines.map((l) => `- ${l.count} x ${l.name} (${money(l.cost)})`),
    "",
    `Total: ${money(total)}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const link = `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <section id="order" className="mx-auto max-w-6xl scroll-mt-4 px-6 pb-14 md:pb-20">
      <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">Build your order</h2>
      <p className="mt-3 max-w-xl text-lg">
        Pick your items, choose dine in or take away, and send it on WhatsApp.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          {menu.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-2xl font-bold text-rose">{group.title}</h3>
              <ul className="mt-3 divide-y divide-ink/15 rounded-2xl bg-white ring-1 ring-ink/10">
                {group.items.map((item) => {
                  const count = qty[item.name] ?? 0;
                  return (
                    <li key={item.name} className="flex items-center justify-between gap-4 p-4">
                      <div className="min-w-0">
                        <p className="font-display text-lg font-semibold">{item.name}</p>
                        <p className="text-ink/80">{item.price}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          type="button"
                          onClick={() => change(item.name, -1)}
                          disabled={count === 0}
                          aria-label={`Remove one ${item.name}`}
                          className="h-10 w-10 rounded-full border-2 border-ink text-xl font-bold disabled:opacity-30"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-display text-lg font-bold" aria-live="polite">
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => change(item.name, 1)}
                          aria-label={`Add one ${item.name}`}
                          className="h-10 w-10 rounded-full bg-ink text-xl font-bold text-glass"
                        >
                          +
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl bg-white p-5 ring-1 ring-ink/10 lg:sticky lg:top-6">
          <h3 className="font-display text-2xl font-bold">Your order</h3>

          <div className="mt-4 grid grid-cols-2 gap-2" role="group" aria-label="Order type">
            {(["Take away", "Dine in"] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-full border-2 border-ink px-4 py-2 font-display font-bold ${
                  mode === m ? "bg-ink text-glass" : ""
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <label className="mt-4 block">
            Your name (optional)
            <input value={name} onChange={(e) => setName(e.target.value)} className={field} />
          </label>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block">
              Day
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={field} />
            </label>
            <label className="block">
              Time
              <input
                type="time"
                value={time}
                min={OPEN}
                max={CLOSE}
                onChange={(e) => setTime(e.target.value)}
                className={field}
              />
            </label>
          </div>

          <ul className="mt-5 space-y-1">
            {lines.length === 0 && <li className="text-ink/70">Nothing added yet.</li>}
            {lines.map((l) => (
              <li key={l.name} className="flex justify-between gap-3">
                <span>{l.count} x {l.name}</span>
                <span className="shrink-0">{money(l.cost)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t border-ink/20 pt-3 font-display text-xl font-bold">
            <span>Total</span>
            <span>{money(total)}</span>
          </p>

          {problem ? (
            <>
              <p className="mt-4 text-rose" role="status">{problem}</p>
              <button
                type="button"
                disabled
                className="mt-3 w-full rounded-full bg-ink/20 px-6 py-3 font-display text-lg font-bold text-ink/50"
              >
                Send on WhatsApp
              </button>
            </>
          ) : (
            <a
              href={link}
              className="mt-5 block rounded-full bg-marigold px-6 py-3 text-center font-display text-lg font-bold text-ink"
            >
              Send on WhatsApp
            </a>
          )}
        </aside>
      </div>
    </section>
  );
}