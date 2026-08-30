import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
  variable: "--font-editorial",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Moda das Charmosas — Elegância em cada detalhe",
    template: "%s | Moda das Charmosas",
  },
  description:
    "Vitrine digital da Moda das Charmosas: vestidos, blusas, calças, saias e acessórios com estilo feminino e sofisticado.",
  openGraph: {
    title: "Moda das Charmosas",
    description: "Elegância em cada detalhe.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
