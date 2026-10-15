import { MapPin, Phone, Mail } from "lucide-react";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

export default function QuickSupportSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "STORE LOCATION",
      description: "14 Ringe lane, las vegas, nv, 89156 united states",
      link: null,
    },
    {
      icon: Phone,
      title: "CONTACT CALL",
      description: "+00-1234567890",
      link: "tel:+001234567890",
    },
    {
      icon: Mail,
      title: "CONTACT MAIL",
      description: "demo@support.com",
      link: "mailto:demo@support.com",
    },
  ];

  return (
    <section className="w-full bg-white py-14 sm:py-20 md:py-24">
      <div className="max-w-325 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading in Della Respira font */}
        <Reveal direction="up">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-serif font-normal text-[#1c1b1b] tracking-tight mb-12 sm:mb-16 md:mb-20">
            Quick support
          </h2>
        </Reveal>

        {/* 3 Contact Support Cards */}
        <Stagger
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-16 max-w-5xl mx-auto"
        >
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <StaggerItem
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Circular Icon Container */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f6f3ee] flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#ca7b64] stroke-[1.6] transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Card Title */}
                <h3 className="text-[13.5px] sm:text-[14.5px] font-bold tracking-widest uppercase text-[#1c1b1b] mb-2.5 font-sans">
                  {item.title}
                </h3>

                {/* Card Subtext / Link */}
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-xs sm:text-[13.5px] text-gray-500 hover:text-[#ca7b64] transition-colors leading-relaxed font-sans"
                  >
                    {item.description}
                  </a>
                ) : (
                  <p className="text-xs sm:text-[13.5px] text-gray-500 leading-relaxed max-w-55 font-sans">
                    {item.description}
                  </p>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
