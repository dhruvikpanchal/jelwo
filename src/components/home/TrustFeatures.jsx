import Stagger, { StaggerItem } from "@/components/animation/Stagger";

const features = [
  {
    id: 1,
    title: "Free shipping",
    description: "Free shipping all order",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 sm:w-11 sm:h-11 text-brand-terracotta"
      >
        {/* Delivery Truck with Thick Outlines */}
        <path d="M2 7h18v14H2z" />
        <path d="M20 12h6l4 4v5h-10v-9z" />
        <circle cx="7" cy="23" r="2.5" fill="#ffffff" strokeWidth="2.2" />
        <circle cx="25" cy="23" r="2.5" fill="#ffffff" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Quality support",
    description: "Support 24/7 hours a day",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 sm:w-11 sm:h-11 text-brand-terracotta"
      >
        {/* Support Headset */}
        <path d="M5 16a11 11 0 0 1 22 0" />
        <rect x="3" y="16" width="4.5" height="8" rx="2" fill="#ffffff" strokeWidth="2.2" />
        <rect x="24.5" y="16" width="4.5" height="8" rx="2" fill="#ffffff" strokeWidth="2.2" />
        <path d="M26.5 24v2a3.5 3.5 0 0 1-3.5 3.5h-5" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Money return",
    description: "30 days for free return",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 sm:w-11 sm:h-11 text-brand-terracotta"
      >
        {/* Dual Circular Arrows */}
        <path d="M5 16A11 11 0 0 1 24.5 8L27 10.5" />
        <path d="M27 4.5v6h-6" />
        <path d="M27 16a11 11 0 0 1-19.5 8L5 21.5" />
        <path d="M5 27.5v-6h6" />
        {/* Dollar Symbol */}
        <path d="M16 10v12" strokeWidth="1.8" />
        <path d="M18.5 12.8a2.5 2.5 0 0 0-5 0c0 3 5 2 5 4.8a2.5 2.5 0 0 1-5 0" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "100% Payment secure",
    description: "We ensure secure payment",
    icon: (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 sm:w-11 sm:h-11 text-brand-terracotta"
      >
        {/* Security Shield */}
        <path d="M16 3L5 7.5v9c0 7 4.5 12 11 13.5 6.5-1.5 11-6.5 11-13.5v-9L16 3z" />
        {/* Checkmark */}
        <path d="M11.5 16l3.5 3.5 6-6.5" strokeWidth="2.4" />
      </svg>
    ),
  },
];

export default function TrustFeatures() {
  return (
    <section className="w-full bg-white border-y border-border-soft/80 py-12 sm:py-16 font-sans">
      <div className="site-container">
        <Stagger
          staggerDelay={0.06}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 items-center justify-items-center max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-none mx-auto"
        >
          {features.map((item) => (
            <StaggerItem key={item.id} direction="up" distance={18}>
              <div
                className="flex items-center gap-4 sm:gap-5 group cursor-pointer select-none w-fit"
              >
                {/* 3D Vertical 180° Mirror Flip Icon on Hover */}
                <div className="shrink-0 perspective-[1000px]">
                  <div className="transition-transform duration-600 ease-in-out transform-3d group-hover:transform-[rotateY(180deg)]">
                    {item.icon}
                  </div>
                </div>

                {/* Text Info */}
                <div className="flex flex-col text-left">
                  <h4 className="text-[15px] sm:text-[16px] font-bold text-ink group-hover:text-brand-terracotta transition-colors duration-200 tracking-tight leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-ink-muted leading-tight mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
