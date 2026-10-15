import { useState } from "react";
import {
  Star,
  User,
  Plus,
  Minus,
  CheckCircle2,
  ChevronDown,
  X,
} from "lucide-react";
import { commonProductInfo } from "../../data/productsData";
import Reveal from "@/components/animation/Reveal";

export default function ProductSectionTwo({ product, onTriggerToast }) {
  // Open accordion state (can open multiple or single; Description is open by default)
  const [openSections, setOpenSections] = useState({
    description: true,
    additionalInfo: false,
    returnPolicies: false,
    reviews: false,
  });

  // Interactive reviews state
  const initialReviews = product?.reviews?.items || [
    {
      author: "rgre",
      rating: 5,
      title: "grgr",
      body: "ggg",
      date: "04/14/2025",
      verified: true,
    },
  ];

  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [sortOption, setSortOption] = useState("most-recent");

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Calculate live review stats
  const totalReviews = reviewsList.length;
  const averageRating = totalReviews
    ? (reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(2)
    : "5.00";

  const histogram = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviewsList.forEach((r) => {
    if (histogram[r.rating] !== undefined) histogram[r.rating]++;
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newBody) return;

    const newReview = {
      author: newAuthor,
      rating: newRating,
      title: newTitle,
      body: newBody,
      date: new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      verified: true,
    };

    setReviewsList([newReview, ...reviewsList]);
    setShowReviewForm(false);
    setNewAuthor("");
    setNewEmail("");
    setNewTitle("");
    setNewBody("");
    setNewRating(5);
    onTriggerToast?.("Thank you! Your review has been submitted.");
  };

  const sortedReviews = [...reviewsList].sort((a, b) => {
    if (sortOption === "highest") return b.rating - a.rating;
    if (sortOption === "lowest") return a.rating - b.rating;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <section className="w-full bg-white text-[#1c1b1b] border-t border-gray-200/80 pt-10 pb-16 sm:pb-24 font-sans select-text">
      <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" distance={20}>
          <div className="divide-y divide-gray-200/80 border-y border-gray-200/80">
          {/* =========================================================================
              1. DESCRIPTION ACCORDION (Screenshot 1 & 2)
          ========================================================================= */}
          <div className="py-4 sm:py-5">
            <button
              type="button"
              onClick={() => toggleSection("description")}
              className="w-full flex items-center justify-between text-left py-1 text-base sm:text-[17px] font-normal text-[#1c1b1b] hover:text-[#cb765f] transition-colors cursor-pointer group"
            >
              <span className="font-normal tracking-wide">Description</span>
              <span className="text-gray-500 group-hover:text-[#cb765f] transition-colors ml-4 shrink-0">
                {openSections.description ? (
                  <Minus className="w-4 h-4 stroke-[1.8]" />
                ) : (
                  <Plus className="w-4 h-4 stroke-[1.8]" />
                )}
              </span>
            </button>

            {openSections.description && (
              <div className="pt-6 pb-4 sm:pt-8 sm:pb-6 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Circular Ring Banner matching Screenshot 2 */}
                  <div className="lg:col-span-4 flex justify-center lg:justify-start">
                    <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full overflow-hidden bg-cream-light border border-gray-100 shadow-sm flex items-center justify-center p-2">
                      <img
                        src={commonProductInfo.description.banner}
                        alt="Product Description"
                        width={290}
                        height={290}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  {/* Right 2-Column Specifications Grid */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-10">
                    {/* Left Spec Column */}
                    <div className="space-y-6">
                      {/* Product Specifications */}
                      <div>
                        <h4 className="font-semibold text-sm sm:text-[15px] text-[#1c1b1b] mb-2">
                          Product Specifications
                        </h4>
                        <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                          {commonProductInfo.description.blocks[0]?.text}
                        </p>
                      </div>

                      {/* Washing Instructions */}
                      <div>
                        <h4 className="font-semibold text-sm sm:text-[15px] text-[#1c1b1b] mb-3">
                          Washing Instructions
                        </h4>
                        <ul className="space-y-2.5">
                          {commonProductInfo.description.blocks[1]?.items?.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-3 text-xs sm:text-[13px] text-gray-600"
                            >
                              <img
                                src={item.icon}
                                alt=""
                                width={20}
                                height={20}
                                className="w-5 h-5 object-contain shrink-0 opacity-85"
                                loading="lazy"
                                decoding="async"
                              />
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Spec Column */}
                    <div className="space-y-6">
                      {/* Material */}
                      <div>
                        <h4 className="font-semibold text-sm sm:text-[15px] text-[#1c1b1b] mb-2">
                          Material
                        </h4>
                        <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                          {commonProductInfo.description.blocks[2]?.text}
                        </p>
                      </div>

                      {/* Wearing */}
                      <div>
                        <h4 className="font-semibold text-sm sm:text-[15px] text-[#1c1b1b] mb-2">
                          Wearing
                        </h4>
                        <div className="space-y-1 text-xs sm:text-[13px] text-gray-600">
                          {commonProductInfo.description.blocks[3]?.lines?.map((line, idx) => (
                            <p key={idx}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =========================================================================
              2. ADDITIONAL INFO ACCORDION (Screenshot 1 & 3)
          ========================================================================= */}
          <div className="py-4 sm:py-5">
            <button
              type="button"
              onClick={() => toggleSection("additionalInfo")}
              className="w-full flex items-center justify-between text-left py-1 text-base sm:text-[17px] font-normal text-[#1c1b1b] hover:text-[#cb765f] transition-colors cursor-pointer group"
            >
              <span className="font-normal tracking-wide">Additional info</span>
              <span className="text-gray-500 group-hover:text-[#cb765f] transition-colors ml-4 shrink-0">
                {openSections.additionalInfo ? (
                  <Minus className="w-4 h-4 stroke-[1.8]" />
                ) : (
                  <Plus className="w-4 h-4 stroke-[1.8]" />
                )}
              </span>
            </button>

            {openSections.additionalInfo && (
              <div className="pt-4 pb-4 sm:pt-6 sm:pb-6 animate-fade-in">
                <div className="overflow-hidden border border-gray-200/80 rounded-[1px]">
                  <table className="w-full text-xs sm:text-[13px] border-collapse text-left">
                    <tbody>
                      {(product?.additionalInfo || []).map((row, idx) => (
                        <tr
                          key={idx}
                          className={`border-b border-gray-200/70 last:border-b-0 transition-colors ${
                            idx % 2 === 0 ? "bg-white" : "bg-[#fcfbf9]"
                          }`}
                        >
                          <td className="w-1/3 sm:w-1/4 py-3 sm:py-3.5 px-4 sm:px-6 font-semibold text-[#1c1b1b] border-r border-gray-200/70">
                            {row.label}
                          </td>
                          <td className="w-2/3 sm:w-3/4 py-3 sm:py-3.5 px-4 sm:px-6 text-gray-600 font-normal">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* =========================================================================
              3. RETURN POLICIES ACCORDION (Screenshot 1 & 4)
          ========================================================================= */}
          <div className="py-4 sm:py-5">
            <button
              type="button"
              onClick={() => toggleSection("returnPolicies")}
              className="w-full flex items-center justify-between text-left py-1 text-base sm:text-[17px] font-normal text-[#1c1b1b] hover:text-[#cb765f] transition-colors cursor-pointer group"
            >
              <span className="font-normal tracking-wide">Return policies</span>
              <span className="text-gray-500 group-hover:text-[#cb765f] transition-colors ml-4 shrink-0">
                {openSections.returnPolicies ? (
                  <Minus className="w-4 h-4 stroke-[1.8]" />
                ) : (
                  <Plus className="w-4 h-4 stroke-[1.8]" />
                )}
              </span>
            </button>

            {openSections.returnPolicies && (
              <div className="pt-4 pb-4 sm:pt-6 sm:pb-6 space-y-4 text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-normal animate-fade-in">
                {commonProductInfo.returnPolicies.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                {commonProductInfo.returnPolicies.points?.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                    {commonProductInfo.returnPolicies.points.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                )}

                {/* Additional clarification paragraph matching Screenshot 4 */}
                <p>
                  Provided the conditions in our refund policy have been met, refunds will be
                  processed using the original form of payment. You can return an item purchased
                  online by posting it to us. Please contact customer service for return address.
                  Please note that delivery costs will be excluded from the refund unless goods are
                  returned in accordance with your statutory rights (e.g. they are faulty or not as
                  ordered).
                </p>
              </div>
            )}
          </div>

          {/* =========================================================================
              4. REVIEW ACCORDION (Screenshot 1 & 5)
          ========================================================================= */}
          <div className="py-4 sm:py-5">
            <button
              type="button"
              onClick={() => toggleSection("reviews")}
              className="w-full flex items-center justify-between text-left py-1 text-base sm:text-[17px] font-normal text-[#1c1b1b] hover:text-[#cb765f] transition-colors cursor-pointer group"
            >
              <span className="font-normal tracking-wide">Review</span>
              <span className="text-gray-500 group-hover:text-[#cb765f] transition-colors ml-4 shrink-0">
                {openSections.reviews ? (
                  <Minus className="w-4 h-4 stroke-[1.8]" />
                ) : (
                  <Plus className="w-4 h-4 stroke-[1.8]" />
                )}
              </span>
            </button>

            {openSections.reviews && (
              <div className="pt-6 pb-6 sm:pt-8 sm:pb-8 animate-fade-in">
                <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#1c1b1b] text-center mb-8 sm:mb-10">
                  Customer Reviews
                </h3>

                {/* Top Summary Card matching Screenshot 5 */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-gray-200/80">
                  {/* Left: Rating score & badge */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1 text-[#e59819] mb-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-[#e59819] text-[#e59819]"
                        />
                      ))}
                      <span className="text-xs sm:text-sm font-medium text-gray-700 ml-1">
                        {averageRating} out of 5
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <span>Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </div>
                  </div>

                  {/* Middle: Histogram Rating Bars */}
                  <div className="md:col-span-5 flex flex-col gap-1.5 max-w-sm mx-auto w-full">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = histogram[stars] || 0;
                      const percentage = totalReviews ? (count / totalReviews) * 100 : 0;
                      return (
                        <div key={stars} className="flex items-center gap-3 text-xs text-gray-500">
                          {/* 5 mini stars */}
                          <div className="flex items-center gap-0.5 text-[#e59819] w-20">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${
                                  s <= stars
                                    ? "fill-[#e59819] text-[#e59819]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Progress bar */}
                          <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${percentage}%` }}
                              className="h-full bg-[#1c1b1b] rounded-full transition-all duration-500"
                            />
                          </div>

                          {/* Count */}
                          <span className="w-4 text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right: Write a Review CTA */}
                  <div className="md:col-span-3 flex justify-center md:justify-end">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="px-6 sm:px-7 py-3 sm:py-3.5 bg-[#cb765f] hover:bg-[#1c1b1b] text-white font-bold text-xs sm:text-[13px] tracking-[0.15em] uppercase rounded-[1px] transition-colors duration-300 shadow-xs cursor-pointer text-center"
                    >
                      WRITE A REVIEW
                    </button>
                  </div>
                </div>

                {/* Inline Write a Review Form */}
                {showReviewForm && (
                  <form
                    onSubmit={handleReviewSubmit}
                    className="my-8 p-6 sm:p-8 bg-cream-light border border-[#f0ece3] rounded-xs max-w-2xl mx-auto animate-fade-in"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-serif text-xl text-[#1c1b1b]">Write a Review</h4>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="text-gray-400 hover:text-black cursor-pointer p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Rating selection */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                          Your Rating *
                        </label>
                        <div className="flex items-center gap-1 text-[#e59819]">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewRating(star)}
                              className="p-1 cursor-pointer hover:scale-110 transition-transform"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= newRating
                                    ? "fill-[#e59819] text-[#e59819]"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="review-author-name" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                            Your Name *
                          </label>
                          <input
                            id="review-author-name"
                            name="author_name"
                            autoComplete="name"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 text-xs sm:text-[13px] rounded-[1px] focus:outline-none focus:border-[#1c1b1b]"
                          />
                        </div>
                        <div>
                          <label htmlFor="review-author-email" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                            Your Email *
                          </label>
                          <input
                            id="review-author-email"
                            name="author_email"
                            autoComplete="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 text-xs sm:text-[13px] rounded-[1px] focus:outline-none focus:border-[#1c1b1b]"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="review-title" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                          Review Title *
                        </label>
                        <input
                          id="review-title"
                          name="review_title"
                          type="text"
                          required
                          placeholder="Give your review a title"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 text-xs sm:text-[13px] rounded-[1px] focus:outline-none focus:border-[#1c1b1b]"
                        />
                      </div>

                      <div>
                        <label htmlFor="review-body" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                          Review Content *
                        </label>
                        <textarea
                          id="review-body"
                          name="review_content"
                          rows={4}
                          required
                          placeholder="Write your comments here"
                          value={newBody}
                          onChange={(e) => setNewBody(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-gray-300 text-xs sm:text-[13px] rounded-[1px] focus:outline-none focus:border-[#1c1b1b]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#cb765f] hover:bg-[#1c1b1b] text-white font-bold text-xs uppercase tracking-widest rounded-[1px] transition-colors cursor-pointer"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                )}

                {/* Sort / Filter dropdown */}
                <div className="flex items-center justify-between mt-6 mb-6">
                  <div className="relative inline-block">
                    <select
                      id="reviews-sort-select"
                      name="sort_reviews"
                      aria-label="Sort reviews"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="appearance-none bg-transparent pr-6 text-xs sm:text-[13px] font-medium text-gray-700 cursor-pointer outline-none border-b border-gray-300 pb-0.5"
                    >
                      <option value="most-recent">Most Recent</option>
                      <option value="highest">Highest Rating</option>
                      <option value="lowest">Lowest Rating</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-0 top-1 pointer-events-none" />
                  </div>
                </div>

                {/* Reviews Cards List matching Screenshot 5 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {sortedReviews.map((rev, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200/80 p-5 sm:p-6 rounded-xs shadow-2xs hover:shadow-sm transition-shadow flex flex-col justify-between text-left"
                    >
                      <div>
                        {/* Rating stars + Date */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-0.5 text-[#e59819]">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= rev.rating
                                    ? "fill-[#e59819] text-[#e59819]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] sm:text-xs text-gray-400 font-normal">
                            {rev.date}
                          </span>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-1.5 text-xs sm:text-[13px] text-gray-700 mb-3 font-medium">
                          <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            <User className="w-3 h-3" />
                          </div>
                          <span>{rev.author}</span>
                        </div>

                        {/* Title */}
                        <h5 className="font-semibold text-sm text-[#1c1b1b] mb-1">
                          {rev.title}
                        </h5>

                        {/* Body */}
                        <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal">
                          {rev.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
