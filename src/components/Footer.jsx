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
      <div className="container px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-between">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 p-1.5 rounded-md flex items-center justify-center">
                <Image
                  src={images.artisanSyncLogo}
                  alt="Artisan Sync Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                ArtisanSync
              </span>
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
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/artisansync/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-sm uppercase mb-4 tracking-wider text-gray-300">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-sm text-gray-400 hover:text-blue-500/50 hover:translate-x-1 transition-all duration-300 inline-flex"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("team")}
                  className="text-sm text-gray-400 hover:text-blue-500/50 hover:translate-x-1 transition-all duration-300 inline-flex"
                >
                  Our Team
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3
              className="font-semibold text-sm uppercase mb-4 tracking-wider text-gray-300"
              onClick={() => scrollToSection("service")}
            >
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("service")}
                  className="text-sm text-gray-400 hover:text-blue-500/50 hover:translate-x-1 transition-all duration-300 inline-flex"
                >
                  Web Development
                </button>
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
