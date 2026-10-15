import { useState } from "react";
import faqData from "../../data/faqData";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/Accordion";
import Reveal from "@/components/animation/Reveal";

export default function FaqSectionList() {
  // Global single open accordion item across the entire page (auto-closes others)
  const [openItem, setOpenItem] = useState(null);

  return (
    <div className="flex-1 w-full space-y-12 sm:space-y-16">
      {faqData.map((section, sIdx) => {
        // Convert title to anchor ID e.g. "shopping-information"
        const sectionId = section.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        return (
          <Reveal key={sIdx} direction="up" distance={20}>
            <section id={sectionId} className="space-y-6 scroll-mt-28">
              {/* Section Title in Elegant Serif Font matching screenshots */}
              <h3 className="text-2xl sm:text-[28px] md:text-[30px] font-serif font-normal text-[#1c1b1b] tracking-tight">
                {section.title}
              </h3>

            {/* Accordion List for this Section */}
            <Accordion
              type="single"
              collapsible
              value={openItem}
              onValueChange={setOpenItem}
            >
              {section.items.map((item, iIdx) => {
                const itemKey = `item-${sIdx}-${iIdx}`;

                return (
                  <AccordionItem key={iIdx} value={itemKey}>
                    <AccordionTrigger>
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>
        </Reveal>
      );
    })}
  </div>
);
}
