import type { Metadata } from "next";
import { Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import GlobalCanvasBackground from "@/components/GlobalCanvasBackground";
import { LanguageProvider } from "@/context/LanguageContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PAJÔ | One Signal. Three Disciplines.",
  description: "Portfólio oficial de PAJÔ. Design, Música e Tecnologia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${spaceGrotesk.variable} ${orbitron.variable} antialiased`}>
        <LanguageProvider>
          <GlobalCanvasBackground />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
