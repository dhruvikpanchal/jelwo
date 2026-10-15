import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import { fixedImages } from "../../utils/imagePath";
import PaymentBadges from "../common/PaymentBadges";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

const logoImg = fixedImages.logo;

export default function Footer() {
  const informationLinks = [
    {
      name: "About us",
      href: "/about-1",
      hasArrow: true,
      subOptions: [
        { name: "About 1", href: "/about-1" },
        { name: "About 2", href: "/about-2" },
      ],
    },
    { name: "Store location", href: "/store-location" },
    {
      name: "Contact",
      href: "/contact-1",
      hasArrow: true,
      subOptions: [
        { name: "Contact 1", href: "/contact-1" },
        { name: "Contact 2", href: "/contact-2" },
      ],
    },
    { name: "Faq's", href: "/faq" },
    { name: "News", href: "/news" },
    { name: "Wishlist", href: "/wishlist" },
  ];

  const privacyLinks = [
    { name: "Privacy policy", href: "/privacy-policy" },
    { name: "Refund policy", href: "/refund-policy" },
    { name: "Shipping & return", href: "/shipping-and-return" },
    { name: "Terms & condition", href: "/terms-and-condition" },
  ];

  const categoryLinks = [
    { name: "Bracelets", href: "#bracelets" },
    { name: "Earrings", href: "#earrings" },
    { name: "Necklace", href: "#necklace" },
    { name: "Rings", href: "#rings" },
  ];

  return (
    <footer className="w-full bg-surface text-ink border-t border-border-subtle font-sans overflow-hidden">
      {/* Main Footer Content */}
      <div className="site-container pt-16 pb-12 sm:pt-20 sm:pb-16">
        <Stagger staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12">
          {/* Column 1: Brand Logo, About Text & Payment Icons (Width: ~3.2 / 12) */}
          <StaggerItem direction="up" distance={16} className="sm:col-span-2 lg:col-span-3 xl:col-span-3">
            <div className="space-y-5">
              <a href="#" className="inline-block">
                <img
                  src={logoImg}
                  alt="JELWO"
                  width={260}
                  height={59}
                  className="h-8 sm:h-9 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <p className="body-small text-ink-muted leading-relaxed max-w-sm font-normal">
                Lorem Ipsum is simply text of the printing industry.
              </p>

              {/* Payment Icons */}
              <div className="pt-2">
                <PaymentBadges />
              </div>
            </div>
          </StaggerItem>

          {/* Column 2: Information (Width: ~2 / 12) */}
          <StaggerItem direction="up" distance={16} className="lg:col-span-2 xl:col-span-2">
            <div>
              <h3 className="heading-3 text-brand mb-4 sm:mb-5 font-normal tracking-wide">
                Information
              </h3>
            <ul className="space-y-2.5">
              {informationLinks.map((link) => {
                const hasSub = link.subOptions && link.subOptions.length > 0;

                return (
                  <li key={link.name} className="relative group/footlink">
                    <a
                      href={link.href}
                      className="body text-ink-muted hover:text-brand transition-colors duration-200 flex items-center justify-between py-0.5 group-hover/footlink:text-brand cursor-pointer"
                    >
                      <span>{link.name}</span>
                      {hasSub && (
                        <ChevronDown className="w-3.5 h-3.5 text-ink-soft group-hover/footlink:text-brand group-hover/footlink:rotate-180 transition-transform duration-200" />
                      )}
                    </a>

                    {/* Flyout Submenu on Hover */}
                    {hasSub && (
                      <div className="hidden lg:block absolute left-full top-0 ml-2 w-36 bg-surface rounded shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-border-soft py-1.5 z-50 opacity-0 invisible -translate-x-2 pointer-events-none group-hover/footlink:opacity-100 group-hover/footlink:visible group-hover/footlink:translate-x-0 group-hover/footlink:pointer-events-auto transition-all duration-200">
                        {link.subOptions.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-1.5 text-[13px] text-ink-muted hover:text-brand hover:bg-cream-light transition-colors"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            </div>
          </StaggerItem>

          {/* Column 3: Privacy & terms (Width: ~2 / 12) */}
          <StaggerItem direction="up" distance={16} className="lg:col-span-2 xl:col-span-2">
            <div>
              <h3 className="heading-3 text-brand mb-4 sm:mb-5 font-normal tracking-wide">
                Privacy &amp; terms
              </h3>
              <ul className="space-y-2.5">
                {privacyLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="body text-ink-muted hover:text-brand transition-colors duration-200 block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Column 4: Category (Width: ~2 / 12) */}
          <StaggerItem direction="up" distance={16} className="lg:col-span-2 xl:col-span-2">
            <div>
              <h3 className="heading-3 text-brand mb-4 sm:mb-5 font-normal tracking-wide">
                Category
              </h3>
              <ul className="space-y-2.5">
                {categoryLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="body text-ink-muted hover:text-brand transition-colors duration-200 block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* Column 5: Contact (Width: ~3 / 12) */}
          <StaggerItem direction="up" distance={16} className="sm:col-span-2 lg:col-span-3 xl:col-span-3">
            <div>
              <h3 className="heading-3 text-brand mb-4 sm:mb-5 font-normal tracking-wide">
                Contact
              </h3>
              <ul className="space-y-3.5">
                {/* Address */}
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand shrink-0 mt-1 stroke-[1.75]" />
                  <span className="body text-ink-muted leading-relaxed">
                    55 East 10th street, new york, ny 10003, united states
                  </span>
                </li>

                {/* Phone */}
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand shrink-0 stroke-[1.75]" />
                  <a
                    href="tel:+2201234567890"
                    className="body text-ink-muted hover:text-brand transition-colors duration-200"
                  >
                    + (220) 123 456 7890
                  </a>
                </li>

                {/* Email */}
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand shrink-0 stroke-[1.75]" />
                  <a
                    href="mailto:demo123546@gmail.com"
                    className="body text-ink-muted hover:text-brand transition-colors duration-200"
                  >
                    demo123546@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </StaggerItem>
        </Stagger>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <Reveal direction="up" distance={16}>
        <div className="border-t border-border-subtle py-6 px-4 sm:px-6 lg:px-10">
          <div className="site-container px-0! flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 body-small text-ink-muted">
            {/* Social Icons */}
            <div className="flex items-center gap-4 text-ink-muted">
              {/* Facebook */}
              <a
                href="#"
                className="hover:text-brand transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a
                href="#"
                className="hover:text-brand transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="hover:text-brand transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="#"
                className="hover:text-brand transition-colors duration-200"
                aria-label="Pinterest"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.98-.12-2.49.02-3.56l1-4.24s-.26-.51-.26-1.28c0-1.2.7-2.1 1.56-2.1.74 0 1.09.55 1.09 1.22 0 .74-.47 1.86-.72 2.89-.2.86.43 1.57 1.28 1.57 1.54 0 2.72-1.62 2.72-3.96 0-2.07-1.49-3.52-3.62-3.52-2.47 0-3.92 1.85-3.92 3.76 0 .74.29 1.54.64 1.98.07.09.08.16.06.25l-.24 1c-.04.16-.14.2-.31.11-1.18-.55-1.92-2.28-1.92-3.67 0-2.99 2.17-5.74 6.27-5.74 3.29 0 5.85 2.34 5.85 5.48 0 3.27-2.06 5.9-4.92 5.9-.96 0-1.86-.5-2.17-1.09l-.59 2.25c-.21.82-.79 1.85-1.17 2.48A12 12 0 1 0 12 0z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="hover:text-brand transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Divider */}
            <span className="hidden sm:inline-block text-border-strong select-none">|</span>

            {/* Copyright Text */}
            <p className="text-center sm:text-left text-ink-muted">
              Copyright &copy; 2026 by spacingtech
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
