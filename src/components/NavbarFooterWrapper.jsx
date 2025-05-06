"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollUpButton from "./ui/scrollUpButton";

export default function NavbarFooterWrapper({ children }) {
  const pathname = usePathname();

  const hideNavbarFooter =
    pathname.startsWith("/admin") || pathname.startsWith("/sync");

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <div className="flex-grow">{children}</div>
      {!hideNavbarFooter && <ScrollUpButton />}
      {!hideNavbarFooter && <Footer />}
    </>
  );
}
