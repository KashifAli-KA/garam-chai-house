import { menu } from "./content";

// One entry per photo card. Prices come from content.ts by matching the name,
// so the name must be spelled exactly like the menu item.
// focus = which part of the photo stays visible when it is cropped (x% y%).
export type Dish = {
  name: string;
  category: string;
  description: string;
  file: string;
  alt: string;
  focus: string;
  wide?: boolean;
  price?: string;
};

const priceOf = (name: string) =>
  menu.flatMap((group) => group.items).find((item) => item.name === name)?.price;

const base: Dish[] = [
  {
    name: "Doodh patti",
    category: "Chai",
    description: "Strong chai boiled with milk until it is rich and dark, served hot the way it is made at home.",
    file: "doodh-patti-chai.jpg",
    alt: "A cup of milky chai on a wooden tray beside a brass kettle",
    focus: "50% 75%",
  },
  {
    name: "Kashmiri chai",
    category: "Chai",
    description: "Pink chai made with milk and a pinch of salt, finished with crushed nuts. Creamy and gentle.",
    file: "kashmiri-chai.jpg",
    alt: "Pink Kashmiri chai in a glass mug",
    focus: "50% 70%",
  },
  {
    name: "Paratha and anda",
    category: "Breakfast",
    description: "Paratha cooked fresh on the tawa and served with a fried egg. Crisp edges, soft inside.",
    file: "paratha-anda.jpg",
    alt: "Parathas cooking on a tawa, flipped with a spatula",
    focus: "50% 60%",
  },
  {
    name: "Halwa puri",
    category: "Breakfast",
    description: "Puffed puri with halwa and spiced chana, the classic weekend breakfast. Good to share.",
    file: "halwa-puri.jpg",
    alt: "A plate with a puri, chana curry and sides",
    focus: "40% 50%",
  },
  {
    name: "Chana and naan",
    category: "Breakfast",
    description: "Chickpeas cooked slowly with spices, served with warm naan, green chillies and lime.",
    file: "chana-naan.jpg",
    alt: "Chana curry in a pan with naan, green chillies and lime",
    focus: "50% 50%",
  },
  {
    name: "Fudge brownie",
    category: "Bakery",
    description: "A rich chocolate brownie. Pair it with a cup of doodh patti.",
    file: "brownie.jpg",
    alt: "A stack of three chocolate brownies",
    focus: "50% 65%",
  },
  {
    name: "Butter croissant",
    category: "Bakery",
    description: "Flaky, buttery layers with a golden crust. Best with a cup of chai.",
    file: "butter-croissant.jpg",
    alt: "Golden butter croissants on a plate",
    focus: "50% 50%",
  },
  {
    name: "Cheesecake slice",
    category: "Bakery",
    description: "Creamy cheesecake on a biscuit base, finished with lemon.",
    file: "cheesecake-slice.jpg",
    alt: "A cheesecake with lemon slices on top",
    focus: "50% 70%",
  },
  {
    name: "Red velvet cupcake",
    category: "Bakery",
    description: "Soft red velvet sponge with cream cheese frosting.",
    file: "red-velvet-cupcake.jpg",
    alt: "A red velvet cupcake with cream frosting and a strawberry",
    focus: "50% 75%",
  },
  {
    name: "From the bakery counter",
    category: "Bakery",
    description:
      "Croissants, pastries and sweet treats, baked fresh each morning. Ask what is ready today, or send your order on WhatsApp.",
    file: "bakery-spread.jpg",
    alt: "A bakery display case with croissants and pastries",
    focus: "50% 60%",
    wide: true,
  },
];

export const dishes: Dish[] = base.map((d) => ({ ...d, price: priceOf(d.name) }));