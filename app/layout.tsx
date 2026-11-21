import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const body = Source_Serif_4({ subsets: ["latin"], variable: "--font-source" });

export const metadata: Metadata = {
  title: "Garam Chai House | Chai and breakfast in Rahim Yar Khan",
  description: "Hot chai and fresh breakfast from 6:30 am. Order ahead on WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}