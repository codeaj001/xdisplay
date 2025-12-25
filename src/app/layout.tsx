import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "xdisplay",
  description: "Canonical analytics layer for Xandeum's decentralized storage network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
