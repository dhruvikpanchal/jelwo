import { useState } from "react";
import { Mail, Check } from "lucide-react";
import Reveal from "@/components/animation/Reveal";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setToastMessage("Please enter a valid email address.");
      setTimeout(() => setToastMessage(""), 3000);
      return;
    }

    setToastMessage("Thank you! Your 10% discount code has been sent.");
    setEmail("");
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  return (
    <section className="w-full bg-cream py-16 sm:py-20 lg:py-24 font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-white px-5 py-3 rounded-xs shadow-xl flex items-center gap-3 animate-fade-in border border-border-strong/30">
          <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs sm:text-sm font-medium tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}

      <div className="site-container-narrow text-center">
        <Reveal direction="up" distance={24}>
          {/* Subtitle / Kicker */}
          <span className="text-brand-terracotta text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase mb-2 sm:mb-3 block">
            JOIN NEWSLETTER
          </span>

          {/* Main Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-ink font-normal leading-[1.2] tracking-tight max-w-xl mx-auto mb-7 sm:mb-9">
            Enjoy 10% off
            <br className="hidden sm:inline" /> your first order
          </h2>

          {/* Subscription Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto flex items-center bg-white rounded-[1px] shadow-xs overflow-hidden"
          >
            <input
              type="email"
              id="newsletter-email-input"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 sm:px-6 py-3.5 sm:py-4 text-xs sm:text-sm text-ink placeholder:text-ink-soft bg-transparent outline-none"
              aria-label="Email address"
              required
            />

            <button
              type="submit"
              className="w-12 sm:w-14 self-stretch bg-brand-terracotta hover:bg-ink text-white flex items-center justify-center transition-colors duration-200 cursor-pointer shrink-0"
              title="Subscribe"
              aria-label="Subscribe to newsletter"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
