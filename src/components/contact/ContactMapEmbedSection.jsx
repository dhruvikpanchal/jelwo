import { ExternalLink } from "lucide-react";
import Reveal from "@/components/animation/Reveal";

/**
 * ContactMapEmbedSection (Section-4 of Contact-2 Page)
 * Displays a full-control Google Map embed for Amendoeira Organics (37.178846, -7.967596)
 * with interactive zoom (Ctrl + mouse scroll / +/- keys), pan, and fullscreen controls.
 */
export default function ContactMapEmbedSection({
  mapUrl = "https://maps.google.com/maps?ll=37.178846,-7.967596&z=15&t=m&hl=en&gl=US&mapclient=embed&cid=605514301255740189&output=embed",
  directLink = "https://maps.google.com/maps?ll=37.178846,-7.967596&z=15&t=m&hl=en&gl=US&mapclient=embed&cid=605514301255740189",
}) {
  return (
    <section className="w-full bg-white pb-16 sm:pb-22 lg:pb-28 pt-6 sm:pt-10 font-sans">
      <div className="site-container">
        <Reveal direction="up">
          <div className="w-full max-w-345 mx-auto relative rounded-xs overflow-hidden shadow-xs border border-border bg-[#f2ede7]">
          {/* Top Floating "Open in Maps" Quick Action Button */}
          <div className="absolute top-4 left-4 z-10">
            <a
              href={directLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 hover:bg-white text-[#1c1b1b] text-xs sm:text-[13px] font-medium rounded-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-gray-200/80 transition-all duration-200 hover:text-brand-terracotta"
            >
              <span>Open in Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-current" />
            </a>
          </div>

          {/* Full Control Google Maps iFrame */}
          <div className="w-full h-100 sm:h-120 md:h-135 lg:h-145">
            <iframe
              title="Store Location Map - Amendoeira Organics"
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full block"
            />
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
