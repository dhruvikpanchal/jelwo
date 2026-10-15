// Seed comments for articles
export const INITIAL_COMMENTS = {
  "jewels-as-unique-as-your-journey": [
    {
      id: "seed-1",
      name: "Elena Rostova",
      email: "elena.r@example.com",
      date: "Mar 10, 2025",
      time: "10:24 AM",
      message:
        "Absolutely in love with how each piece tells a story. The craftsmanship and attention to detail are second to none! Truly elevated my daily styling.",
      avatarColor: "bg-[#faf7f2] text-[#ca7b64] border-[#ca7b64]/30",
    },
    {
      id: "seed-2",
      name: "Marcus Vance",
      email: "marcus.v@example.com",
      date: "Mar 11, 2025",
      time: "02:45 PM",
      message:
        "The styling advice here is spot on. Jewelry really is the final touch of personal expression. Thank you for this inspiring perspective.",
      avatarColor: "bg-[#f5f1eb] text-[#8c6239] border-[#8c6239]/30",
    },
    {
      id: "seed-3",
      name: "Camille Laurent",
      email: "camille.l@example.com",
      date: "Mar 12, 2025",
      time: "06:15 PM",
      message:
        "Such an inspiring read. I've always believed jewelry transforms confidence and mood. Looking forward to the new collection release next month!",
      avatarColor: "bg-[#fcf8f5] text-[#b85d43] border-[#b85d43]/30",
    },
  ],
  "crafted-for-the-moments-that-matter": [
    {
      id: "seed-4",
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      date: "Mar 03, 2025",
      time: "11:10 AM",
      message:
        "The dedication to authentic craftsmanship shines through in every piece. Worth every bit of investment.",
      avatarColor: "bg-[#faf7f2] text-[#ca7b64] border-[#ca7b64]/30",
    },
    {
      id: "seed-5",
      name: "David Miller",
      email: "david.m@example.com",
      date: "Mar 04, 2025",
      time: "03:30 PM",
      message:
        "Timeless elegance that truly lasts a lifetime. Bought a necklace for our anniversary and it exceeded expectations.",
      avatarColor: "bg-[#f5f1eb] text-[#8c6239] border-[#8c6239]/30",
    },
    {
      id: "seed-6",
      name: "Victoria Sterling",
      email: "victoria.s@example.com",
      date: "Mar 05, 2025",
      time: "08:15 PM",
      message:
        "Breathtaking designs and timeless beauty. Truly one of a kind aesthetic.",
      avatarColor: "bg-[#fcf8f5] text-[#b85d43] border-[#b85d43]/30",
    },
  ],
  "timeless-treasures-unforgettable-moments": [
    {
      id: "seed-7",
      name: "Chloe Bennett",
      email: "chloe.b@example.com",
      date: "Mar 03, 2025",
      time: "01:20 PM",
      message:
        "Exquisite aesthetics and incredible craftsmanship. Absolutely stunning piece of writing.",
      avatarColor: "bg-[#faf7f2] text-[#ca7b64] border-[#ca7b64]/30",
    },
  ],
};

export const getStoredCommentCount = (slug) => {
  if (typeof window === "undefined") return (INITIAL_COMMENTS[slug] || []).length;
  try {
    const key = `jelwo_news_comments_${slug || "default"}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed.length;
    }
  } catch {
    // fallback
  }
  return (INITIAL_COMMENTS[slug] || []).length;
};

export default INITIAL_COMMENTS;

