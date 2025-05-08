import Link from "next/link";
import Image from "next/image";
import { images } from "@/constants/images";
import { Separator } from "@radix-ui/react-separator";

function Footer() {
  const currentYear = new Date().getFullYear();

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
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-sm uppercase mb-4 tracking-wider text-gray-300">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-blue-500/50 hover:translate-x-1 transition-all duration-300 inline-flex"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-blue-500/50 hover:translate-x-1 transition-all duration-300 inline-flex"
                >
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-sm uppercase mb-4 tracking-wider text-gray-300">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-blue-500/50 hover:translate-x-1 transition-all duration-300 inline-flex"
                >
                  Web Development
                </Link>
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
