
import Link from "next/link";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { SiGithub,  SiX } from "@icons-pack/react-simple-icons";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
        {/* Brand */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>

            <span className="text-2xl font-bold">BookNook</span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-slate-400">
            Discover your next favorite book with BookNook. Explore, collect,
            and share your love of reading with our growing book community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">Quick Links</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link href="/all-books" className="transition hover:text-white">
                All Books
              </Link>
            </li>

            <li>
              <Link href="/signin" className="transition hover:text-white">
                Login
              </Link>
            </li>

            <li>
              <Link href="/signup" className="transition hover:text-white">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">Contact Us</h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <span>support@yourdomain.com</span>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <span>+880 1XXXXXXXXX</span>
            </li>

            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span>Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        {/* Social Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold text-white">Follow Me</h3>

          <p className="mb-5 text-sm text-slate-400">
            Connect with me on social media and stay updated.
          </p>

          <div className="flex items-center gap-3">
            {/* GitHub */}
            <Link
              href="https://github.com/jitudey24"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 transition hover:border-white hover:bg-white hover:text-black"
            >
              <SiGithub className="h-5 w-5" />
            </Link>

            {/* LinkedIn */}
            <Link
              href="https://www.linkedin.com/in/your-profile/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 transition hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white"
            >
              <FaLinkedinIn className="h-5 w-5" />
            </Link>

            {/* X / Twitter */}
            <Link
              href="https://x.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 transition hover:border-white hover:bg-white hover:text-black"
            >
              <SiX className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-slate-400 lg:px-6">
          © 2026 BookNook. All rights reserved. Made with
        </div>
      </div>
    </footer>
  );
};

export default Footer;
