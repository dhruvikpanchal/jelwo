import { fixedImages } from "../../utils/imagePath";
import Reveal from "@/components/animation/Reveal";

export default function PageBanner({
  title = "Page Title",
  breadcrumb = "PAGE",
  bgImage = fixedImages.breadcrumbBanner,
  onNavigateHome,
}) {
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-55 sm:h-65 md:h-75 overflow-hidden flex items-center justify-center select-none">
      {/* Background Image with slight dark overlay */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt={title}
          width={1920}
          height={300}
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <Reveal direction="down" duration={0.6}>
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-[0.2em] text-white/90 font-medium mb-2">
            <button
              type="button"
              onClick={handleHomeClick}
              className="hover:text-[#ca7b64] transition-colors cursor-pointer"
            >
              HOME
            </button>
            <span>-</span>
            <span className="text-white uppercase">{breadcrumb}</span>
          </div>

          {/* Page Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-normal tracking-tight">
            {title}
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
