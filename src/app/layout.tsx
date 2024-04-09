import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Που εν τούτον;",
  description: "Που εν το χωρκό στη φωτογραφία;",
  openGraph: {
    type: "website",
    url: "https://savvas.me/pouentouton",
    images: "https://savvas.me/pouentouton/pouentouton-tw.png"
  },
  twitter: {
    images: "https://savvas.me/pouentouton/pouentouton-tw.png",
    card: "summary_large_image"
  }
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
