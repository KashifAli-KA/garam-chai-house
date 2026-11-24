Garam Chai House

A one-page website for a made-up chai and breakfast café in Rahim Yar Khan, Pakistan. This is a demo project, not a real business. Live site: https://garam-chai-house.vercel.app

<!-- TODO: add a screenshot here, for example: ![Home page](./public/screenshot.png) -->
What it does
Shows the café's most popular dishes as photo cards, each with a short description, a price and an "Order this" button
Lets visitors build an order from the full menu: pick items and quantities, choose dine in or take away, pick a day and time, and send it as a ready-made WhatsApp message
Warns the visitor if they pick a Friday (closed) or a time outside 6 am to 2 pm
Shows the opening hours and the area
Works on phones and large screens
Built with
Next.js (App Router) and TypeScript
Tailwind CSS
Fonts: Bricolage Grotesque and Source Serif 4
Deployed on Vercel
Run it on your computer
bash
npm install
npm run dev

Then open http://localhost:3000.

Project structure
app/content.ts the café details and the menu (names, notes, prices, hours)
app/dishes.ts the photo cards (prices are read from the menu)
app/OrderBuilder.tsx the order builder (React state, WhatsApp message)
app/page.tsx the page layout
app/globals.css the colours, fonts and the pattern
public/images the photos