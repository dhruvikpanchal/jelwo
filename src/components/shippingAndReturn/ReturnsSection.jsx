
export default function ReturnsSection() {
  const returnPoints = [
    "The Green to Wear 2.0 standard aims to minimize",
    "The Green to Wear 2.0 standard aims to minimize",
    "The Green to Wear 2.0 standard aims to minimize",
    "To this end, we have developed Inditex's The List program.",
  ];

  return (
    <div className="flex flex-col space-y-4">
      {/* Section Title */}
      <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#1c1b1b]">
        RETURNS
      </h2>

      {/* Intro Description */}
      <p className="text-sm sm:text-[14.5px] text-gray-600 leading-relaxed font-normal">
        The Green to Wear 2.0 standard aims to minimize the environmental impact
        of textile production. To this end, we have developed Inditex's The List
        program.
      </p>

      {/* Bullet Points */}
      <ul className="space-y-3 pt-2">
        {returnPoints.map((point, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-sm sm:text-[14.5px] text-gray-600 leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2 shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
