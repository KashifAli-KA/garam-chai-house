import { cafe, menu } from "./content";

const whatsappLink = `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(
  "Hello, I would like to order from Garam Chai House."
)}`;

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

export default function Home() {
  return (
    <main>
      <header className="bg-ink text-glass">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-display text-xl font-bold">{cafe.name}</span>
          <div className="flex gap-6 text-lg">
            <a href="#menu" className="hover:text-marigold">Menu</a>
            <a href="#visit" className="hover:text-marigold">Visit</a>
          </div>
        </nav>

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-12 md:grid-cols-[1.5fr_1fr] md:pt-20">
          <div>
            <h1 className="font-display text-5xl font-bold leading-[1.03] md:text-7xl">
              Chai poured hot. Paratha straight off the tawa.
            </h1>
            <p className="mt-6 max-w-xl text-xl">
              Open from 6:30 every morning in {cafe.city}. Sit down, or order ahead on WhatsApp and
              pick it up on your way to work.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={whatsappLink} className="rounded-full bg-marigold px-7 py-3 font-display text-lg font-bold text-ink">
                Order on WhatsApp
              </a>
              <a href="#menu" className="rounded-full border-2 border-glass px-7 py-3 font-display text-lg font-bold">
                See the menu
              </a>
            </div>
          </div>
          <div className="flex justify-center"><Cup /></div>
        </div>
      </header>

      <section id="menu" className="mx-auto max-w-6xl scroll-mt-4 px-6 py-20">
        <h2 className="font-display text-4xl font-bold md:text-5xl">Menu</h2>
        <div className="mt-10 grid gap-14 md:grid-cols-2">
          {menu.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-2xl font-bold text-rose">{group.title}</h3>
              <ul className="mt-5 space-y-5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline gap-3 font-display text-xl font-semibold">
                      <span>{item.name}</span>
                      <span aria-hidden className="flex-1 border-b-2 border-dotted border-ink/40" />
                      <span>{item.price}</span>
                    </div>
                    <p className="text-ink/80">{item.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="visit" className="scroll-mt-4 bg-marigold">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Come by, or order ahead</h2>
            <p className="mt-4 max-w-md text-xl">
              Send your order on WhatsApp and we will tell you when it is ready.
            </p>
            <a href={whatsappLink} className="mt-8 inline-block rounded-full bg-ink px-7 py-3 font-display text-lg font-bold text-glass">
              Message us on WhatsApp
            </a>
          </div>
          <div className="text-xl">
            <p className="font-display text-2xl font-bold">Find us</p>
            <p className="mt-1">{cafe.address}</p>
            <p className="mt-8 font-display text-2xl font-bold">Hours</p>
            <dl className="mt-1">
              {cafe.hours.map(([days, time]) => (
                <div key={days} className="flex justify-between gap-6 border-b border-ink/30 py-2">
                  <dt>{days}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <footer className="bg-ink px-6 py-8 text-center text-glass">
        {cafe.name}, {cafe.city}
      </footer>
    </main>
  );
}