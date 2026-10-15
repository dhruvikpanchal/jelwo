
export default function CollectingInformationSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10">
      {/* Left Column: Collecting Personal Information & Device Information */}
      <div className="space-y-6">
        {/* Collecting Personal Information */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#1c1b1b]">
            COLLECTING PERSONAL INFORMATION
          </h2>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            When you visit the Site, we collect certain information about your device,
            your interaction with the Site, and information necessary to process your purchases.
            We may also collect additional information if you contact us for customer support.
          </p>
        </div>

        {/* Device Information */}
        <div className="space-y-4 pt-1">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#1c1b1b]">
            DEVICE INFORMATION
          </h2>

          <div className="space-y-4">
            {/* Examples of personal information collected */}
            <div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
                <span className="text-sm sm:text-[14.5px] text-gray-700 font-medium">
                  Examples of personal information collected:
                </span>
              </div>
              <p className="pl-4 text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal mt-1.5">
                The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
              </p>
            </div>

            {/* Purpose of collection */}
            <div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
                <span className="text-sm sm:text-[14.5px] text-gray-700 font-medium">
                  Purpose of collection:
                </span>
              </div>
              <p className="pl-4 text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal mt-1.5">
                The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
              </p>
            </div>

            {/* Source of collection */}
            <div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
                <span className="text-sm sm:text-[14.5px] text-gray-700 font-medium">
                  Source of collection:
                </span>
              </div>
              <p className="pl-4 text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal mt-1.5">
                The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sharing Personal Information & Behavioural Advertising */}
      <div className="space-y-6">
        {/* Sharing Personal Information */}
        <div className="space-y-3">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#1c1b1b]">
            SHARING PERSONAL INFORMATION
          </h2>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the TermsFeed Privacy Policy Generator.
          </p>
        </div>

        {/* Behavioural Advertising */}
        <div className="space-y-3.5 pt-1">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#1c1b1b]">
            BEHAVIOURAL ADVERTISING
          </h2>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
          </p>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the TermsFeed Privacy Policy Generator.
          </p>
          <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
            The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production.
          </p>
        </div>
      </div>
    </div>
  );
}
