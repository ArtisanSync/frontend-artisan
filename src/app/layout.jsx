import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import NavbarFooterWrapper from "@/components/NavbarFooterWrapper";
import { Providers } from "@/providers/Providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Artisan Sync | Professional Software Development Services",
  description:
    "We are a team of professional software developers dedicated to delivering the best digital solutions for your business website and applications.",
  keywords:
    "software development, web development, mobile app, digital solutions, responsive websites, professional developers, Indonesia",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "Artisan Sync | Professional Software Development Services",
    description:
      "We are a team of professional software developers dedicated to delivering the best digital solutions for your business.",
    url: "https://artisansync.com",
    siteName: "Artisan Sync",
    images: [
      {
        url: "https://ik.imagekit.io/72mu50jam/logo%20vertical%20no%20text.jpg?updatedAt=1747501207279",
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3Z7JB9TG7L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3Z7JB9TG7L');
          `}
        </Script>
      </head>
      <body
        className={`${montserrat.variable} antialiased min-h-screen flex flex-col bg-[#10101E]`}
      >
        <Providers>
          <NavbarFooterWrapper>{children}</NavbarFooterWrapper>
        </Providers>
      </body>
    </html>
  );
}
