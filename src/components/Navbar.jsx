"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { images } from "@/constants/images";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["hero", "service", "projects", "team", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  const navLinks = [
    { id: "hero", label: "ABOUT US" },
    { id: "service", label: "SERVICES" },
    { id: "projects", label: "PROJECTS" },
    { id: "team", label: "TEAM" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-black/80 shadow-lg"
          : "backdrop-blur-sm bg-black/60"
      } border-b border-white/10`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-full p-2">
            <Image
              src={images.artisanSyncLogo}
              alt="Artisan Sync Logo"
              width={40}
              height={40}
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <span className="text-sm font-bold tracking-wider text-white hidden sm:inline-block group-hover:text-[#5ffbf1] transition-colors">
            ARTISAN SYNC
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.id)}
              className={`relative text-xs font-medium transition-colors py-1 group ${
                activeSection === link.id
                  ? "text-[#5ffbf1]"
                  : "text-white hover:text-[#5ffbf1]"
              }`}
            >
              {link.label}
              <span
                className={`absolute left-0 right-0 bottom-0 h-0.5 bg-[#5ffbf1] transition-transform duration-300 origin-left ${
                  activeSection === link.id
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              ></span>
            </button>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-black/95 border-white/10 p-0"
          >
            <SheetHeader className="px-4 pt-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            </SheetHeader>
            <div className="flex justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Image
                  src={images.artisanSyncLogo}
                  alt="Artisan Sync Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="text-sm font-bold tracking-wider text-white">
                  ARTISAN SYNC
                </span>
              </div>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>

            <nav className="flex flex-col px-6 py-6 space-y-6">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`text-sm font-medium transition-colors text-left ${
                      activeSection === link.id
                        ? "text-[#5ffbf1]"
                        : "text-white hover:text-[#5ffbf1]"
                    }`}
                  >
                    {link.label}
                  </button>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
