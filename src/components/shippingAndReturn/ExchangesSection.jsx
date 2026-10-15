
export default function ExchangesSection() {
  return (
    <div className="flex flex-col space-y-4">
      {/* Section Title */}
      <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#1c1b1b]">
        EXCHANGES
      </h2>

      {/* Paragraph 1 */}
      <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
        The Green to Wear 2.0 standard aims to minimize the environmental impact
        of textile production.
      </p>

      {/* Paragraph 2 */}
      <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
        The Green to Wear 2.0 standard aims to minimize the environmental impact
        of textile production. To this end, we have developed Inditex's The List
        program.
      </p>

      {/* Sub-item Points */}
      <div className="space-y-4 pt-2">
        {/* Point 1 */}
        <div className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
          <div className="space-y-1">
            <h3 className="text-sm sm:text-[14.5px] font-normal text-gray-700">
              We only replace items if they are defective or damaged:
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              The Green to Wear 2.0 standard aims to minimize the environmental
              impact of textile production.
            </p>
          </div>
        </div>

        {/* Point 2 */}
        <div className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
          <div className="space-y-1">
            <h3 className="text-sm sm:text-[14.5px] font-normal text-gray-700">
              If the item wasn’t marked as a gift when purchased:
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              The Green to Wear 2.0 standard aims to minimize the environmental
              impact of textile production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
