import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { images } from "@/constants/images";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] border-t">
      <div className="container px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 bg-primary p-1 rounded-md flex items-center justify-center">
                <Image
                  src={images.artisanSyncLogo}
                  alt="Artisan Sync Logo"
                  width={50}
                  height={50}
                />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                ArtisanSync
              </span>
            </div>
            <p className="text-sm max-w-xs text-white">
              Transforming ideas into exceptional digital experiences with
              precision and artistry.
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                href="#"
                className="size-8 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Linkedin className="size-4 text-foreground" />
                <span className="sr-only text-white">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="size-8 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Twitter className="size-4 text-foreground" />
                <span className="sr-only text-white">Twitter</span>
              </Link>
              <Link
                href="#"
                className="size-8 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Instagram className="size-4 text-foreground" />
                <span className="sr-only text-white">Instagram</span>
              </Link>
              <Link
                href="#"
                className="size-8 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Github className="size-4 text-foreground" />
                <span className="sr-only text-white">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 tracking-wide  text-white">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#"
                  className="text-sm text-white hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-white hover:text-blue-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-white hover:text-blue-600 transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-white hover:text-blue-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 tracking-wide  text-white">
              Services
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#"
                  className="text-sm text-white hover:text-blue-600 transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-white hover:text-blue-600 transition-colors"
                >
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-white hover:text-blue-600 transition-colors"
                >
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-white hover:text-blue-600 transition-colors"
                >
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 tracking-wide text-foreground">
              Contact
            </h3>
            <address className="not-italic">
              <p className="text-sm text-white mb-2">
                123 Innovation Street
                <br />
                Silicon Valley, CA 94043
              </p>
              <p className="text-sm text-white">
                <a
                  href="mailto:hello@artisansync.com"
                  className="hover:text-blue-600 transition-colors"
                >
                  hello@artisansync.com
                </a>
              </p>
              <p className="text-sm text-white mt-2">
                <a
                  href="tel:+15555555555"
                  className="text-white hover:text-blue-600 transition-colors "
                >
                  +1 (555) 555-5555
                </a>
              </p>
            </address>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white">
            © {currentYear} ArtisanSync. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="#"
              className="text-xs text-white hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-white hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs text-white hover:text-blue-600 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
