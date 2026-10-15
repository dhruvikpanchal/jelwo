import { Phone, Mail, MapPin } from "lucide-react";
import contactMapImg from "../../assets/images/contact/jewelry-contact-us-2.webp";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

/**
 * ContactMapInfoSection (Section-2 of Contact-2 Page)
 * Displays a 2-column contact overview with responsive location map visual on the left
 * and direct contact channels (Phone, Email, Address, Socials) on the right.
 */
export default function ContactMapInfoSection({
  subtitle = "WE'D LOVE TO HEAR FROM YOU",
  title = "Contact us",
  imageSrc = contactMapImg,
  imageAlt = "Store global presence and location map pins",
  phone = "+999 3222 000 388",
  email = "support@store.com",
  address = "27 Eden walk eden centre,Broadway, Paris, France",
}) {
  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-26 font-sans overflow-hidden">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center max-w-345 mx-auto">
          {/* Left Column: Responsive Location Map Image */}
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal direction="right" duration={0.65}>
              <div className="relative overflow-hidden rounded-xs shadow-sm bg-[#f5f2ed] w-full max-w-155 lg:max-w-none mx-auto group">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  width={800}
                  height={688}
                  className="w-full h-auto max-h-145 lg:max-h-160 object-cover object-center block transition-transform duration-700 ease-out group-hover:scale-[1.02] will-change-transform"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Contact Details & Social Links */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-center text-center lg:items-start lg:text-left max-w-md sm:max-w-lg mx-auto lg:max-w-none lg:mx-0 lg:pl-4 xl:pl-10 space-y-7 sm:space-y-8 w-full">
            {/* Header / Title */}
            <Reveal direction="left" duration={0.65}>
              <div>
                <span className="text-brand-terracotta text-xs sm:text-[13px] font-medium tracking-[0.22em] uppercase mb-2.5 sm:mb-3.5 inline-block">
                  {subtitle}
                </span>
                <h2 className="font-della text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-ink font-normal leading-[1.18] tracking-tight">
                  {title}
                </h2>
              </div>
            </Reveal>

            {/* Direct Contact Items */}
            <Stagger staggerDelay={0.08} className="space-y-6 sm:space-y-7 pt-1 w-full">
              {/* Phone */}
              <StaggerItem direction="up" distance={16}>
                <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-2.5 sm:gap-4">
                  <div className="mt-0.5 text-ink">
                    <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.6]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase text-ink font-sans mb-1">
                      LET'S TALK
                    </h3>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-xs sm:text-sm text-ink-muted hover:text-brand-terracotta transition-colors duration-200 block font-sans"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
              </StaggerItem>

              {/* Email */}
              <StaggerItem direction="up" distance={16}>
                <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-2.5 sm:gap-4">
                  <div className="mt-0.5 text-ink">
                    <Mail className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.6]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase text-ink font-sans mb-1">
                      SAY HI!
                    </h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs sm:text-sm text-ink-muted hover:text-brand-terracotta transition-colors duration-200 block font-sans"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </StaggerItem>

              {/* Address */}
              <StaggerItem direction="up" distance={16}>
                <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-2.5 sm:gap-4">
                  <div className="mt-0.5 text-ink">
                    <MapPin className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[1.6]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase text-ink font-sans mb-1">
                      STORE ADDRESS
                    </h3>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans max-w-sm mx-auto lg:mx-0">
                      {address}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </Stagger>

            {/* Social Media Links */}
            <Reveal direction="up" delay={0.1}>
              <div className="pt-2 flex justify-center lg:justify-start w-full">
              <div className="flex items-center gap-4 text-ink-muted">
                {/* Facebook */}
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="hover:text-brand-terracotta transition-colors duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a
                  href="#twitter"
                  aria-label="Twitter / X"
                  className="hover:text-brand-terracotta transition-colors duration-200"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="hover:text-brand-terracotta transition-colors duration-200"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="#pinterest"
                  aria-label="Pinterest"
                  className="hover:text-brand-terracotta transition-colors duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.376-.056.231-.184.281-.424.17-1.583-.736-2.571-3.048-2.571-4.908 0-3.997 2.903-7.669 8.375-7.669 4.398 0 7.818 3.134 7.818 7.324 0 4.37-2.755 7.887-6.579 7.887-1.285 0-2.493-.668-2.906-1.458l-.791 3.018c-.287 1.094-1.063 2.464-1.584 3.308C9.566 23.834 10.757 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="#youtube"
                  aria-label="YouTube"
                  className="hover:text-brand-terracotta transition-colors duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
