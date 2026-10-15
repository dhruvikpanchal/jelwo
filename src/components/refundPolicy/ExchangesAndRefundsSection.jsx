
export default function ExchangesAndRefundsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-8">
      {/* Left Column: Exchanges */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#1c1b1b]">
          EXCHANGES
        </h2>

        <div className="space-y-4 pt-1">
          {/* Sub-item 1 */}
          <div className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
            <div className="space-y-1">
              <h3 className="text-sm sm:text-[14.5px] font-normal text-gray-700">
                Examples of Personal Information collected:
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                The Green to Wear 2.0 standard aims to minimize the environmental
                impact of textile production.
              </p>
            </div>
          </div>

          {/* Sub-item 2 */}
          <div className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
            <div className="space-y-1">
              <h3 className="text-sm sm:text-[14.5px] font-normal text-gray-700">
                Purpose of collection:
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                The Green to Wear 2.0 standard aims to minimize the environmental
                impact of textile production.
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal pt-1">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production.
        </p>

        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production. To this end, we have developed Inditex’s
          The List program.
        </p>
      </div>

      {/* Right Column: Refunds */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#1c1b1b]">
          REFUNDS
        </h2>

        <div className="space-y-4 pt-1">
          {/* Sub-item 1 */}
          <div className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
            <div className="space-y-1">
              <h3 className="text-sm sm:text-[14.5px] font-normal text-gray-700">
                Examples of Personal Information collected:
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                The Green to Wear 2.0 standard aims to minimize the environmental
                impact of textile production.
              </p>
            </div>
          </div>

          {/* Sub-item 2 */}
          <div className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
            <div className="space-y-1">
              <h3 className="text-sm sm:text-[14.5px] font-normal text-gray-700">
                Purpose of collection:
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                The Green to Wear 2.0 standard aims to minimize the environmental
                impact of textile production.
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal pt-1">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production.
        </p>

        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production.
        </p>
      </div>
    </div>
  );
}
