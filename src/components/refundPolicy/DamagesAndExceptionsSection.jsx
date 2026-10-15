
export default function DamagesAndExceptionsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-8">
      {/* Left: Damages and Issues */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#1c1b1b]">
          DAMAGES AND ISSUES
        </h2>
        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production. To this end, we have developed Inditex's
          The List program.
        </p>
      </div>

      {/* Right: Exceptions / Non-Returnable Items */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#1c1b1b]">
          EXCEPTIONS / NON-RETURNABLE ITEMS
        </h2>
        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production. To this end, we have developed Inditex's
          The List program.
        </p>
      </div>
    </div>
  );
}
