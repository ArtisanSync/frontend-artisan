import { Poppins } from "next/font/google";
import "./globals.css";
import NavbarFooterWrapper from "@/components/NavbarFooterWrapper";
import { Providers } from "@/providers/Providers";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Artisan Sync | Professional Software Development Services",
  description:
    "We are a team of professional software developers dedicated to delivering the best digital solutions for your business website and applications.",
  keywords:
    "software development, web development, mobile app, digital solutions, responsive websites, professional developers, Indonesia",
  openGraph: {
    title: "Artisan Sync | Professional Software Development Services",
    description:
      "We are a team of professional software developers dedicated to delivering the best digital solutions for your business.",
    url: "https://artisansync.com",
    siteName: "Artisan Sync",
    images: [
      {
        url: "https://artisansync.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Artisan Sync - Professional Software Development Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://artisansync.com",
  },
  verification: {
    google: "google-site-verification-code",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased min-h-screen flex flex-col bg-[#10101E]`}
      >
        <Providers>
          <NavbarFooterWrapper>{children}</NavbarFooterWrapper>
        </Providers>
      </body>
    </html>
  );
}
