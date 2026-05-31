import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "bloomé",
  description: "Your finances, beautifully simple.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "bloomé",
  },
  icons: {
    icon: [{ url: "/iso.svg", type: "image/svg+xml" }],
    apple: "/iso.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#fffaf9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
