import { MapPin, Phone, Mail } from "lucide-react";
import womanWithPhoneImg from "../../assets/images/contact/jewelry-contact-us-3.webp";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

export default function ContactDirectInfoSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* Left Column: Large Image with jewelry & phone */}
          <div className="lg:col-span-6 overflow-hidden select-none w-full">
            <Reveal direction="right" duration={0.65}>
              <img
                src={womanWithPhoneImg}
                alt="Woman wearing jewelry with phone"
                width={800}
                height={688}
                className="w-full h-auto max-h-160 lg:max-h-170 object-cover object-center shadow-xs"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
          </div>

          {/* Right Column: Contact Details */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-10 lg:pl-4 xl:pl-8 flex flex-col items-center text-center lg:items-start lg:text-left max-w-md sm:max-w-lg mx-auto lg:max-w-none lg:mx-0 w-full">
            {/* Eyebrow & Title */}
            <Reveal direction="left" duration={0.65}>
              <div>
                <span className="block text-xs sm:text-sm md:text-[14px] font-medium tracking-[0.22em] uppercase text-[#ca7b64] mb-3 font-sans">
                  WE'D LOVE TO HEAR FROM YOU
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-serif font-normal text-[#1c1b1b] tracking-tight">
                  Contact us
                </h2>
              </div>
            </Reveal>

            {/* Contact Items */}
            <Stagger staggerDelay={0.08} className="space-y-7 sm:space-y-8 pt-2 w-full">
              {/* Address */}
              <StaggerItem direction="up" distance={16}>
                <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-3 sm:gap-5">
                  <MapPin className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#1c1b1b] shrink-0 mt-0.5 stroke-[1.6]" />
                  <div>
                    <h3 className="text-xs sm:text-sm md:text-[14px] font-bold tracking-widest uppercase text-[#1c1b1b] font-sans mb-1.5">
                      ADDRESS
                    </h3>
                    <p className="text-sm sm:text-[15px] md:text-base text-gray-500 leading-relaxed font-sans font-normal max-w-md mx-auto lg:mx-0">
                      70 Washington square south new york, NY 10012, united states
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* Phone */}
              <StaggerItem direction="up" distance={16}>
                <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-3 sm:gap-5">
                  <Phone className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#1c1b1b] shrink-0 mt-0.5 stroke-[1.6]" />
                  <div>
                    <h3 className="text-xs sm:text-sm md:text-[14px] font-bold tracking-widest uppercase text-[#1c1b1b] font-sans mb-1.5">
                      PHONE
                    </h3>
                    <a
                      href="tel:+12345678910"
                      className="text-sm sm:text-[15px] md:text-base text-gray-500 hover:text-[#ca7b64] transition-colors leading-relaxed font-sans font-normal block"
                    >
                      +1 234 567 8910
                    </a>
                  </div>
                </div>
              </StaggerItem>

              {/* Email */}
              <StaggerItem direction="up" distance={16}>
                <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-3 sm:gap-5">
                  <Mail className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-[#1c1b1b] shrink-0 mt-0.5 stroke-[1.6]" />
                  <div>
                    <h3 className="text-xs sm:text-sm md:text-[14px] font-bold tracking-widest uppercase text-[#1c1b1b] font-sans mb-1.5">
                      EMAIL
                    </h3>
                    <a
                      href="mailto:info@yourdomain.com"
                      className="text-sm sm:text-[15px] md:text-base text-gray-500 hover:text-[#ca7b64] transition-colors leading-relaxed font-sans font-normal block"
                    >
                      info@yourdomain.com
                    </a>
                  </div>
                </div>
              </StaggerItem>
            </Stagger>

            {/* Social Media Icons */}
            <Reveal direction="up" delay={0.1}>
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-gray-700 w-full">
              {/* Facebook */}
              <a
                href="#"
                className="hover:text-[#ca7b64] transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="#"
                className="hover:text-[#ca7b64] transition-colors"
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="hover:text-[#ca7b64] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5"
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
                className="hover:text-[#ca7b64] transition-colors"
                aria-label="Pinterest"
              >
                <svg
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.98-.12-2.49.02-3.56l1-4.24s-.26-.51-.26-1.28c0-1.2.7-2.1 1.56-2.1.74 0 1.09.55 1.09 1.22 0 .74-.47 1.86-.72 2.89-.2.86.43 1.57 1.28 1.57 1.54 0 2.72-1.62 2.72-3.96 0-2.07-1.49-3.52-3.62-3.52-2.47 0-3.92 1.85-3.92 3.76 0 .74.29 1.54.64 1.98.07.09.08.16.06.25l-.24 1c-.04.16-.14.2-.31.11-1.18-.55-1.92-2.28-1.92-3.67 0-2.99 2.17-5.74 6.27-5.74 3.29 0 5.85 2.34 5.85 5.48 0 3.27-2.06 5.9-4.92 5.9-.96 0-1.86-.5-2.17-1.09l-.59 2.25c-.21.82-.79 1.85-1.17 2.48A12 12 0 1 0 12 0z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="hover:text-[#ca7b64] transition-colors"
                aria-label="YouTube"
              >
                <svg
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
