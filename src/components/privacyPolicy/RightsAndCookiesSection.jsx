
export default function RightsAndCookiesSection() {
  const storeCookies = [
    { name: "_dgjc", function: "The Green to Wear 2.0 standard aims" },
    { name: "_secure", function: "The Green to Wear 2.0 standard aims" },
    { name: "cart_st", function: "The Green to Wear 2.0 standard aims" },
    { name: "secret", function: "The Green to Wear 2.0 standard aims" },
    { name: "secure_customer", function: "The Green to Wear 2.0 standard aims" },
    { name: "_shopify_u", function: "The Green to Wear 2.0 standard aims" },
  ];

  const analyticsCookies = [
    { name: "_dgjc", function: "The Green to Wear 2.0 standard aims" },
    { name: "_secure", function: "The Green to Wear 2.0 standard aims" },
    { name: "cart_st", function: "The Green to Wear 2.0 standard aims" },
    { name: "secret", function: "The Green to Wear 2.0 standard aims" },
    { name: "secure_customer", function: "The Green to Wear 2.0 standard aims" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10">
      {/* Left Column: Your Rights, CCPA, Changes */}
      <div className="space-y-8">
        {/* Your Rights & GDPR */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#1c1b1b]">
            YOUR RIGHTS
          </h2>

          <div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
              <span className="text-sm sm:text-[14.5px] text-gray-700 font-medium">
                GDPR
              </span>
            </div>
            <p className="pl-4 text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal mt-1.5">
              The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
            </p>
          </div>

          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal pt-1">
            The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
          </p>
        </div>

        {/* CCPA */}
        <div className="space-y-3.5 pt-1">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#1c1b1b]">
            CCPA
          </h2>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
          </p>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
          </p>
        </div>

        {/* Changes */}
        <div className="space-y-3.5 pt-1">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#1c1b1b]">
            CHANGES
          </h2>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
          </p>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
          </p>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
          </p>
        </div>
      </div>

      {/* Right Column: Cookies & Analytics Tables */}
      <div className="space-y-8">
        {/* Cookies */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#1c1b1b]">
            COOKIES
          </h2>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex’s The List program.
          </p>
        </div>

        {/* Cookies Necessary for the Functioning of the Store */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#1c1b1b]">
            COOKIES NECESSARY FOR THE FUNCTIONING OF THE STORE
          </h2>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
          </p>

          {/* Table 1 */}
          <div className="w-full overflow-x-auto border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th className="py-3 px-4 sm:px-6 text-sm font-bold text-[#1c1b1b] border-r border-gray-200 w-2/5">
                    Name
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-sm font-bold text-[#1c1b1b] w-3/5">
                    Function
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white font-normal">
                {storeCookies.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4 sm:px-6 text-sm text-gray-600 border-r border-gray-200 font-mono text-[13px] sm:text-sm">
                      {row.name}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-sm text-gray-600">
                      {row.function}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reporting and Analytics */}
        <div className="space-y-4 pt-2">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#1c1b1b]">
            REPORTING AND ANALYTICS
          </h2>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.
          </p>

          {/* Table 2 */}
          <div className="w-full overflow-x-auto border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-white">
                  <th className="py-3 px-4 sm:px-6 text-sm font-bold text-[#1c1b1b] border-r border-gray-200 w-2/5">
                    Name
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-sm font-bold text-[#1c1b1b] w-3/5">
                    Function
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white font-normal">
                {analyticsCookies.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4 sm:px-6 text-sm text-gray-600 border-r border-gray-200 font-mono text-[13px] sm:text-sm">
                      {row.name}
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-sm text-gray-600">
                      {row.function}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
