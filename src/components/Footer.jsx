import Link from "next/link";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { images } from "@/constants/images";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 bg-primary p-1 rounded-md flex items-center justify-center">
                <Image src={images.artisanSyncLogo} />
              </div>
              <span className="font-bold text-lg tracking-tight">
                ArtisanSync
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Transforming ideas into exceptional digital experiences with
              precision and artistry.
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                href="#"
                className="size-8 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Linkedin className="size-4 text-foreground" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="size-8 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Twitter className="size-4 text-foreground" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="size-8 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Instagram className="size-4 text-foreground" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="size-8 rounded-md bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Github className="size-4 text-foreground" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 tracking-wide text-foreground">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 tracking-wide text-foreground">
              Services
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
              <p className="text-sm text-muted-foreground mb-2">
                123 Innovation Street
                <br />
                Silicon Valley, CA 94043
              </p>
              <p className="text-sm text-muted-foreground">
                <a
                  href="mailto:hello@artisansync.com"
                  className="hover:text-primary transition-colors"
                >
                  hello@artisansync.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <a
                  href="tel:+15555555555"
                  className="hover:text-primary transition-colors"
                >
                  +1 (555) 555-5555
                </a>
              </p>
            </address>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} ArtisanSync. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
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
