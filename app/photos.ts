// Photos live in public/images. Set ready to false to hide one.
// w and h only set the shape (ratio) of each photo in the gallery.
export type Photo = { file: string; alt: string; ready: boolean; w: number; h: number };

export const heroPhoto: Photo = {
  file: "doodh-patti-chai.jpg",
  alt: "A cup of milky chai on a wooden tray beside a brass kettle",
  ready: true,
  w: 900,
  h: 1125,
};

export const gallery: Photo[] = [
  { file: "paratha-anda.jpg", alt: "Parathas cooking on a tawa, flipped with a spatula", ready: true, w: 800, h: 1200 },
  { file: "halwa-puri.jpg", alt: "A plate with a puri, chana curry and sides", ready: true, w: 1280, h: 720 },
  { file: "bakery-spread.jpg", alt: "A bakery display case with croissants and pastries", ready: true, w: 800, h: 1200 },
  { file: "brownie.jpg", alt: "A stack of three chocolate brownies", ready: true, w: 800, h: 1200 },
  { file: "butter-croissant.jpg", alt: "Golden butter croissants on a plate", ready: true, w: 1200, h: 800 },
  { file: "kashmiri-chai.jpg", alt: "Pink Kashmiri chai in a glass mug", ready: true, w: 800, h: 1200 },
  { file: "cheesecake-slice.jpg", alt: "A cheesecake with lemon slices on top", ready: true, w: 800, h: 1200 },
  { file: "chana-naan.jpg", alt: "Chana curry in a pan with naan, green chillies and lime", ready: true, w: 800, h: 800 },
  { file: "red-velvet-cupcake.jpg", alt: "A red velvet cupcake with cream frosting and a strawberry", ready: true, w: 800, h: 1200 },
];

export const photoSrc = (p: Photo) => `/images/${p.file}`;