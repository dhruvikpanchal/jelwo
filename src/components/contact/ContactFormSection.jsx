import { useState } from "react";
import Reveal from "@/components/animation/Reveal";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    acceptTerms: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
        acceptTerms: false,
      });
    }, 3000);
  };

  return (
    <section className="w-full bg-[#f8f5f0] py-16 sm:py-20 md:py-28">
      <div className="max-w-360 mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Heading in Della Respira font */}
        <Reveal direction="up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-serif font-normal text-center text-[#1c1b1b] tracking-tight mb-12 sm:mb-16 md:mb-20">
            Keep in touch with us
          </h2>
        </Reveal>

        {/* Contact Form */}
        <Reveal direction="up" delay={0.08}>
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {/* Left Inputs Column */}
            <div className="space-y-5 sm:space-y-6">
              <input
                type="text"
                id="contact-fullname"
                name="fullName"
                autoComplete="name"
                required
                placeholder="Your full name"
                aria-label="Your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full bg-white px-6 py-4 sm:py-4.5 text-sm sm:text-base text-[#1c1b1b] placeholder:text-gray-400 border border-transparent focus:border-[#ca7b64] outline-none shadow-xs font-sans transition-colors"
              />

              <input
                type="email"
                id="contact-email"
                name="email"
                autoComplete="email"
                required
                placeholder="Your email address"
                aria-label="Your email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-white px-6 py-4 sm:py-4.5 text-sm sm:text-base text-[#1c1b1b] placeholder:text-gray-400 border border-transparent focus:border-[#ca7b64] outline-none shadow-xs font-sans transition-colors"
              />

              <input
                type="tel"
                id="contact-phone"
                name="phone"
                autoComplete="tel"
                placeholder="Your mobile number"
                aria-label="Your mobile number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-white px-6 py-4 sm:py-4.5 text-sm sm:text-base text-[#1c1b1b] placeholder:text-gray-400 border border-transparent focus:border-[#ca7b64] outline-none shadow-xs font-sans transition-colors"
              />
            </div>

            {/* Right Message Textarea Column */}
            <div className="flex flex-col">
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="Your message here..."
                aria-label="Your message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full h-full min-h-47.5 sm:min-h-55 bg-white px-6 py-4 sm:py-4.5 text-sm sm:text-base text-[#1c1b1b] placeholder:text-gray-400 border border-transparent focus:border-[#ca7b64] outline-none shadow-xs font-sans resize-none transition-colors"
              />
            </div>
          </div>

          {/* Bottom Row: Checkbox on Left, Send Message on Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center pt-2">
            {/* Terms & Conditions Checkbox */}
            <label htmlFor="contact-terms-checkbox" className="flex items-start gap-3.5 cursor-pointer select-none">
              <input
                type="checkbox"
                id="contact-terms-checkbox"
                name="acceptTerms"
                required
                checked={formData.acceptTerms}
                onChange={(e) =>
                  setFormData({ ...formData, acceptTerms: e.target.checked })
                }
                className="w-4.5 h-4.5 mt-0.5 rounded-none border-gray-300 accent-[#ca7b64] cursor-pointer shrink-0"
              />
              <span className="text-xs sm:text-sm md:text-[14.5px] text-gray-500 leading-relaxed font-sans font-normal">
                I accept the terms &amp; conditions and I understand that my data will be hold securely in accordance with the privacy policy.
              </span>
            </label>

            {/* Send Message Button */}
            <div className="flex md:justify-start">
              <button
                type="submit"
                className="bg-[#ca7b64] hover:bg-[#232323] text-white font-medium text-xs sm:text-sm tracking-[0.12em] uppercase px-10 sm:px-12 py-4 sm:py-4.5 shadow-sm transition-all duration-300 cursor-pointer font-sans"
              >
                {isSubmitted ? "MESSAGE SENT!" : "SEND MESSAGE"}
              </button>
            </div>
          </div>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
