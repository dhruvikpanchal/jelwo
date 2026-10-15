
import Reveal from "@/components/animation/Reveal";
import Stagger, { StaggerItem } from "@/components/animation/Stagger";

export default function FaqSidebar({ onCategoryClick }) {
  const sidebarLinks = [
    { label: "MY ACCOUNT", sectionId: "shopping-information" },
    { label: "COMPANY POLICIES", sectionId: "returns-and-exchanges" },
    { label: "PAYMENT OPTIONS", sectionId: "payment-information" },
    { label: "TERM AND CONDITIONS", sectionId: "returns-and-exchanges" },
  ];

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    if (onCategoryClick) {
      onCategoryClick(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 lg:pr-10 xl:pr-12 lg:border-r lg:border-gray-200">
      <div className="lg:sticky lg:top-28 space-y-8">
        {/* Eyebrow & Title */}
        <Reveal direction="right">
          <div>
            <span className="block text-[#ca7b64] font-medium tracking-[0.25em] text-xs uppercase mb-2 font-sans">
              MOST COMMON
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1c1b1b] font-normal tracking-tight">
              Questions
            </h2>
          </div>
        </Reveal>

        {/* Sidebar Nav Items */}
        <Stagger staggerDelay={0.06} className="space-y-4 pt-2">
          {sidebarLinks.map((link, idx) => (
            <StaggerItem key={idx} direction="right" distance={16}>
              <a
                href={`#${link.sectionId}`}
                onClick={(e) => handleClick(e, link.sectionId)}
                className="block text-[13px] sm:text-[13.5px] font-bold tracking-wider uppercase text-[#1c1b1b] hover:text-[#ca7b64] transition-colors duration-200 cursor-pointer py-1 font-sans"
              >
                {link.label}
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </aside>
  );
}
