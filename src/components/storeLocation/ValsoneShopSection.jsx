import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { mockStores } from "@/data/stores";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

const storeData = mockStores.find((s) => s.id === "valsone-shop");
const valsoneImg = storeData?.image;

export default function ValsoneShopSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-325 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column: Image with Hover Zoom */}
          <Reveal direction="right" duration={0.65}>
            <div className="relative overflow-hidden group rounded-none bg-gray-50 shadow-sm cursor-pointer aspect-4/3 sm:aspect-16/11 lg:aspect-4/3">
              <img
                src={valsoneImg}
                alt="Valsone shop"
                width={701}
                height={622}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 will-change-transform"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>

          {/* Right Column: Store Information */}
          <div className="flex flex-col justify-center space-y-6 lg:pl-4">
            <Reveal direction="left" duration={0.65}>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1c1b1b] font-normal tracking-tight">
                Valsone shop
              </h2>
            </Reveal>

            <Stagger staggerDelay={0.08} className="space-y-6 pt-2">
              {/* Phone */}
              <StaggerItem direction="up" distance={16}>
                <div className="flex items-start gap-4 group/item">
                  <div className="mt-0.5 text-gray-700 transition-colors duration-200 group-hover/item:text-[#ca7b64]">
                    <Phone className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c1b1b]">
                      LET'S TALK
                    </h3>
                    <a
                      href="tel:+9993222000388"
                      className="text-xs sm:text-sm text-gray-600 font-normal hover:text-[#ca7b64] transition-colors mt-0.5 block"
                    >
                      +999 3222 000 388
                    </a>
                  </div>
                </div>
              </StaggerItem>

              {/* Mail */}
              <StaggerItem direction="up" distance={16}>
                <div className="flex items-start gap-4 group/item">
                  <div className="mt-0.5 text-gray-700 transition-colors duration-200 group-hover/item:text-[#ca7b64]">
                    <Mail className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c1b1b]">
                      SAY HI!
                    </h3>
                    <a
                      href="mailto:store@domain.com"
                      className="text-xs sm:text-sm text-gray-600 font-normal hover:text-[#ca7b64] transition-colors mt-0.5 block"
                    >
                      store@domain.com
                    </a>
                  </div>
                </div>
              </StaggerItem>

              {/* Store Address */}
              <StaggerItem direction="up" distance={16}>
                <div className="flex items-start gap-4 group/item">
                  <div className="mt-0.5 text-gray-700 transition-colors duration-200 group-hover/item:text-[#ca7b64]">
                    <MapPin className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c1b1b]">
                      STORE ADDRESS
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mt-0.5">
                      27 Eden walk eden centre, Broadway, United States
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* Opening Hours */}
              <StaggerItem direction="up" distance={16}>
                <div className="flex items-start gap-4 group/item">
                  <div className="mt-0.5 text-gray-700 transition-colors duration-200 group-hover/item:text-[#ca7b64]">
                    <Clock className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1c1b1b]">
                      OPENING HOURS
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-normal mt-0.5">
                      Mon - Fri : 9:00am - 6:00pm
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
