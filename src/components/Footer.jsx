import Link from "next/link";
import Image from "next/image";
import { images } from "@/constants/images";
import { Separator } from "@radix-ui/react-separator";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

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
    }
  };

  return (
    <footer className="bg-[#000000]">
      <div className="px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-between">
          <div className="md:col-span-1 flex flex-col items-start">
            <div className="mb-6">
              <Image
                src={images.artisanFooter}
                alt="Artisan Sync Footer Logo"
                width={120}
                height={120}
                className="object-contain"
                priority
              />
            </div>
            <p className="text-sm max-w-xs text-gray-300 leading-relaxed">
              Transforming ideas into exceptional digital experiences with
              precision and artistry.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link
                href="https://www.instagram.com/artisan_sync/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram
                  size={24}
                  className="hover:scale-115 duration-200"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/company/artisansync/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300 "
              >
                <FaLinkedin
                  size={24}
                  className="hover:scale-115 duration-200"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-sm uppercase mb-4 tracking-wider text-gray-300">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-sm text-gray-400 hover:text-blue-500/50 hover:translate-x-1 transition-all duration-300 inline-flex cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("service")}
                  className="text-sm text-gray-400 hover:text-blue-500/50 hover:translate-x-1 transition-all duration-300 inline-flex cursor-pointer"
                >
                  Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-sm text-gray-400 hover:text-blue-500/50 hover:translate-x-1 transition-all duration-300 inline-flex cursor-pointer"
                >
                  Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-sm text-gray-400 hover:text-blue-500/50 hover:translate-x-1 transition-all duration-300 inline-flex cursor-pointer"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("web-services")}
                  className="text-sm text-gray-400 hover:text-blue-500/50 hover:translate-x-1 transition-all duration-300 inline-flex cursor-pointer"
                >
                  Web Development
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-sm uppercase mb-4 tracking-wider text-gray-300">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <p className="text-sm max-w-xs text-gray-300 leading-relaxed">
                  Address: Kalimantan Timur, Samarinda, Samarinda Kota Jln
                  Wahidhasyim 75119
                </p>
              </li>
              <li>
                <p className="text-sm max-w-xs text-gray-300 leading-relaxed">
                  Mail: syncartisan@gmail.com
                </p>
              </li>
              <li>
                <p className="text-sm max-w-xs text-gray-300 leading-relaxed">
                  Phone/Wa : +62 821-5418-2046
                </p>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} ArtisanSync. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Crafted with love by ArtisanSync
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
