
export default function ProductsAndBillingSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-8">
      {/* Left: Products or Services (If Applicable) */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#1c1b1b]">
          PRODUCTS OR SERVICES (IF APPLICABLE)
        </h2>
        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production.
        </p>
        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production. To this end, we have developed Inditex’s
          The List program.
        </p>
      </div>

      {/* Right: Accuracy of Billing and Account Information */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#1c1b1b]">
          ACCURACY OF BILLING AND ACCOUNT INFORMATION
        </h2>
        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production. To this end, we have developed Inditex’s
          The List program.
        </p>
        <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
          The Green to Wear 2.0 standard aims to minimize the environmental
          impact of textile production. To this end, we have developed Inditex’s
          The List program.
        </p>
      </div>
    </div>
  );
}
