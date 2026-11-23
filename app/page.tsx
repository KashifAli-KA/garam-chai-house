import Image from "next/image";
import { cafe, menu } from "./content";
import { heroPhoto, photoSrc } from "./photos";
import { dishes, type Dish } from "./dishes";
import OrderBuilder from "./OrderBuilder";

const whatsappLink = `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(
  "Hello, I would like to order from Garam Chai House."
)}`;

const orderLink = (dish: Dish) =>
  `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(`Hello, I would like to order: ${dish.name}`)}`;

function Cup() {
  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-xs" role="img" aria-label="A steaming cup of chai">
      <g fill="none" stroke="#e6efea" strokeWidth="6" strokeLinecap="round">
        <path className="steam" d="M90 82c-12-14 12-24 0-40" />
        <path className="steam" d="M120 82c-12-14 12-24 0-40" />
        <path className="steam" d="M150 82c-12-14 12-24 0-40" />
      </g>
      <path d="M50 105h140v38a62 62 0 0 1-62 62h-16a62 62 0 0 1-62-62z" fill="#f4b400" />
      <path d="M190 122h12a24 24 0 0 1 0 48h-20" fill="none" stroke="#f4b400" strokeWidth="12" />
      <ellipse cx="120" cy="222" rx="92" ry="10" fill="#c8325a" />
    </svg>
  );
}

function DishCard({ dish }: { dish: Dish }) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10 ${
        dish.wide ? "sm:col-span-2 lg:col-span-3 md:flex-row" : ""
      }`}
    >
      <div className={`relative aspect-[4/3] ${dish.wide ? "md:aspect-auto md:min-h-80 md:w-2/5" : ""}`}>
        <Image
          src={`/images/${dish.file}`}
          alt={dish.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: dish.focus }}
        />
      </div>
      <div className={`flex flex-1 flex-col p-5 ${dish.wide ? "md:justify-center md:p-10" : ""}`}>
        <p className="font-semibold text-rose">{dish.category}</p>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <h3 className={`font-display font-bold ${dish.wide ? "text-3xl" : "text-xl"}`}>{dish.name}</h3>
          {dish.price && <span className="shrink-0 whitespace-nowrap font-display text-lg font-bold">{dish.price}</span>}
        </div>
        <p className="mt-2 flex-1 text-ink/80">{dish.description}</p>
        <a
          href={orderLink(dish)}
          className="mt-5 inline-block self-start rounded-full border-2 border-ink px-5 py-2 font-display font-bold hover:bg-ink hover:text-glass"
        >
          {dish.price ? "Order this" : "Ask on WhatsApp"}
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <header className="bg-ink text-glass">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-display text-xl font-bold">{cafe.name}</span>
          <div className="flex gap-5 text-lg sm:gap-6">
            <a href="#dishes" className="hover:text-marigold">Dishes</a>
            <a href="#menu" className="hover:text-marigold">Menu</a>
            <a href="#order" className="hover:text-marigold">Order</a>
            <a href="#visit" className="hover:text-marigold">Visit</a>
          </div>
        </nav>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-8 md:grid-cols-[1.3fr_1fr] md:pb-24 md:pt-16">
          <div>
            <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-7xl">
              Chai poured hot. Paratha straight off the tawa.
            </h1>
            <p className="mt-6 max-w-xl text-lg sm:text-xl">
              Open from 6 am in Businessman Colony. Eat in, or order on WhatsApp and take it away.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#order" className="rounded-full bg-marigold px-7 py-3 font-display text-lg font-bold text-ink">
                Build your order
              </a>
              <a href="#dishes" className="rounded-full border-2 border-glass px-7 py-3 font-display text-lg font-bold">
                See the dishes
              </a>
            </div>
            <p className="mt-6 text-base text-glass/80">Dine in or take away. 6 am to 2 pm. Closed on Fridays.</p>
          </div>

          {heroPhoto.ready ? (
            <div className="relative mx-auto w-full max-w-sm md:max-w-none">
              <div aria-hidden className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl bg-marigold" />
              <Image
                src={photoSrc(heroPhoto)}
                alt={heroPhoto.alt}
                width={heroPhoto.w}
                height={heroPhoto.h}
                priority
                sizes="(min-width: 768px) 40vw, 90vw"
                className="relative aspect-[4/5] w-full rounded-3xl object-cover"
              />
            </div>
          ) : (
            <div className="flex justify-center"><Cup /></div>
          )}
        </div>
      </header>

      <section id="dishes" className="mx-auto max-w-6xl scroll-mt-4 px-6 py-14 md:py-20">
        <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">Popular dishes</h2>
        <p className="mt-3 max-w-xl text-lg">Tap Order this and the dish goes straight into a WhatsApp message.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish) => (
            <DishCard key={dish.name} dish={dish} />
          ))}
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-6xl scroll-mt-4 px-6 pb-14 md:pb-20">
        <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">Full menu</h2>
        <div className="mt-10 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {menu.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-2xl font-bold text-rose">{group.title}</h3>
              <ul className="mt-5 space-y-5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline gap-3 font-display text-lg font-semibold sm:text-xl">
                      <span className="min-w-0">{item.name}</span>
                      <span aria-hidden className="min-w-4 flex-1 border-b-2 border-dotted border-ink/40" />
                      <span className="shrink-0 whitespace-nowrap">{item.price}</span>
                    </div>
                    <p className="text-ink/80">{item.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <OrderBuilder />

      <section id="visit" className="scroll-mt-4 bg-marigold">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">Come by, or order ahead</h2>
            <p className="mt-4 max-w-md text-lg sm:text-xl">
              Walk in any day except Friday, or send your order on WhatsApp and we will have it ready.
            </p>
            <a href={whatsappLink} className="mt-8 inline-block rounded-full bg-ink px-7 py-3 font-display text-lg font-bold text-glass">
              Message us on WhatsApp
            </a>
          </div>
          <div className="text-lg sm:text-xl">
            <p className="font-display text-2xl font-bold">Find us</p>
            <p className="mt-1">{cafe.address}</p>
            <p className="mt-8 font-display text-2xl font-bold">Hours</p>
            <dl className="mt-1">
              {cafe.hours.map(([days, time]) => (
                <div key={days} className="flex flex-wrap justify-between gap-x-6 border-b border-ink/30 py-2">
                  <dt>{days}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <footer className="bg-ink px-6 py-8 text-center text-glass">
        <p>{cafe.name}, {cafe.city}</p>
        <p className="mt-2 text-sm text-glass/70">Demo project by Kashif Ali, not a real business.</p>
      </footer>
    </main>
  );
}