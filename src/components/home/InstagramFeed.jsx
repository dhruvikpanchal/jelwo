
import { mockInstagramPosts } from "@/data/home/instagram";
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";
const instagramPosts = mockInstagramPosts;

export default function InstagramFeed() {
  return (
    <section className="w-full bg-[#fbf9f5] section-spacing font-sans overflow-hidden">
      <div className="site-container">
        {/* Section Header */}
        <Reveal direction="up" distance={20}>
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-brand-terracotta text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase mb-2 block">
              SOCIAL MEDIA
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-ink font-normal tracking-tight">
              Follow instagram
            </h2>
          </div>
        </Reveal>

        {/* 5 Photos Responsive Grid */}
        <Stagger staggerDelay={0.05} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {instagramPosts.map((post) => (
            <StaggerItem key={post.id} direction="up" distance={18}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xs bg-cream-card block shadow-xs"
              >
                {/* Product / Lifestyle Image with Zoom on Hover */}
                <img
                  src={post.image}
                  alt={post.alt}
                  width={512}
                  height={512}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out transform group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />

                {/* Color Tint & Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-ink/35 group-hover:bg-ink/45 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center backdrop-brightness-95">
                  {/* Instagram Icon Scaling Animation */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white transform scale-50 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out drop-shadow-md">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 sm:w-7 sm:h-7"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
