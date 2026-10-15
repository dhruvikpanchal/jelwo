
export default function ReturnOverviewSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-8">
      {/* Left Column: 30-Day Policy Intro */}
      <div className="space-y-4">
        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          We have a 30-day return policy, which means you have 30 days after
          receiving your item to request a return.
        </p>
        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production.
        </p>
        <ul className="space-y-2.5 pt-1">
          <li className="flex items-start gap-3 text-sm sm:text-[14.5px] text-gray-600 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
            <span>The Green to Wear 2.0 standard aims to minimize</span>
          </li>
          <li className="flex items-start gap-3 text-sm sm:text-[14.5px] text-gray-600 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
            <span>The Green to Wear 2.0 standard aims to minimize</span>
          </li>
        </ul>
      </div>

      {/* Right Column: Contact Support & Intro */}
      <div className="space-y-4">
        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          You can always contact us for any return question at{" "}
          <a
            href="mailto:support@store.com"
            className="text-[#ca7b64] hover:underline font-medium"
          >
            support@store.com
          </a>
        </p>
        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production.
        </p>
        <ul className="space-y-2.5 pt-1">
          <li className="flex items-start gap-3 text-sm sm:text-[14.5px] text-gray-600 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
            <span>The Green to Wear 2.0 standard aims to minimize</span>
          </li>
          <li className="flex items-start gap-3 text-sm sm:text-[14.5px] text-gray-600 leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
            <span>The Green to Wear 2.0 standard aims to minimize</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
