import type { Metadata } from "next";
import { Nunito_Sans } from 'next/font/google'
import "./globals.css";

const nunito = Nunito_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})


export const metadata: Metadata = {
  title: "Talent Bridge",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} antialiased light bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
