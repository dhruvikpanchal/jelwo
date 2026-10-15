// productsData.js
// ONE data file for the whole Jelwo mega menu (Necklace / Bracelets / Earrings / Rings).
//
// How it works:
//   1. Each unique product is written ONCE in `RAW` with variants and local image assets.
//   2. Derived properties (options, price, discount %, additional info, reviews, etc.) are built by buildProduct().
//   3. `MENU` maps every menu slot to a product handle.
//
// Prices are in rupees. Weights are in grams.

// ------------------------------------------------------------------
// Local Product & Theme Images Imports from src/assets/images/products
// ------------------------------------------------------------------

// Common & Theme Product Details Assets
import descBannerImg from "../assets/images/products/product-description.webp";
import descIcon1 from "../assets/images/products/product-description-icon1.png";
import descIcon2 from "../assets/images/products/product-description-icon2.png";
import descIcon3 from "../assets/images/products/product-description-icon3.png";
import measureImg from "../assets/images/products/measure.webp";
import fashionArrivalBannerImg from "../assets/images/products/product-about-img-1-opt.webp";
import fashionMakeBannerImg from "../assets/images/products/product-about-img-2.webp";

// Diamond Rings (also shared by glitter-diamond-ring)
import diamondRing26 from "../assets/images/products/diamond-rings/jewelry-pro-26.webp";
import diamondRing27 from "../assets/images/products/diamond-rings/jewelry-pro-27.webp";
import diamondRing28 from "../assets/images/products/diamond-rings/jewelry-pro-28.webp";
import diamondRing29 from "../assets/images/products/diamond-rings/jewelry-pro-29.webp";
import diamondRing30 from "../assets/images/products/diamond-rings/jewelry-pro-30.webp";

// Drop Earrings
import dropEarring46 from "../assets/images/products/drop-earrings/jewelry-pro-46.webp";
import dropEarring47 from "../assets/images/products/drop-earrings/jewelry-pro-47.webp";
import dropEarring48 from "../assets/images/products/drop-earrings/jewelry-pro-48.webp";
import dropEarring49 from "../assets/images/products/drop-earrings/jewelry-pro-49.webp";
import dropEarring50 from "../assets/images/products/drop-earrings/jewelry-pro-50.webp";

// Floral Gold Bangle
import floralBangle31 from "../assets/images/products/floral-gold-bangle/jewelry-pro-31.webp";
import floralBangle32 from "../assets/images/products/floral-gold-bangle/jewelry-pro-32.webp";
import floralBangle33 from "../assets/images/products/floral-gold-bangle/jewelry-pro-33.webp";
import floralBangle34 from "../assets/images/products/floral-gold-bangle/jewelry-pro-34.webp";
import floralBangle35 from "../assets/images/products/floral-gold-bangle/jewelry-pro-35.webp";

// Flower Jhumka
import flowerJhumka51 from "../assets/images/products/flower-jhumka/jewelry-pro-51.webp";
import flowerJhumka52 from "../assets/images/products/flower-jhumka/jewelry-pro-52.webp";
import flowerJhumka53 from "../assets/images/products/flower-jhumka/jewelry-pro-53.webp";
import flowerJhumka54 from "../assets/images/products/flower-jhumka/jewelry-pro-54.webp";
import flowerJhumka55 from "../assets/images/products/flower-jhumka/jewelry-pro-55.webp";

// Gold Nose Pin (also shared by flower-nose-pin)
import goldNosePin21 from "../assets/images/products/gold-nose-pin/jewelry-product-21.webp";
import goldNosePin22 from "../assets/images/products/gold-nose-pin/jewelry-product-22.webp";
import goldNosePin23 from "../assets/images/products/gold-nose-pin/jewelry-product-23.webp";
import goldNosePin24 from "../assets/images/products/gold-nose-pin/jewelry-product-24.webp";
import goldNosePin25 from "../assets/images/products/gold-nose-pin/jewelry-product-25.webp";

// Modish Bracelet
import modishBracelet41 from "../assets/images/products/modish-bracelet/jewelry-pro-41.webp";
import modishBracelet42 from "../assets/images/products/modish-bracelet/jewelry-pro-42.webp";
import modishBracelet43 from "../assets/images/products/modish-bracelet/jewelry-pro-43.webp";
import modishBracelet44 from "../assets/images/products/modish-bracelet/jewelry-pro-44.webp";
import modishBracelet45 from "../assets/images/products/modish-bracelet/jewelry-pro-45.webp";

// Rose Gold Rings
import roseGoldRing56 from "../assets/images/products/rose-gold-rings/jewelry-pro-56.webp";
import roseGoldRing57 from "../assets/images/products/rose-gold-rings/jewelry-pro-57.webp";
import roseGoldRing58 from "../assets/images/products/rose-gold-rings/jewelry-pro-58.webp";
import roseGoldRing59 from "../assets/images/products/rose-gold-rings/jewelry-pro-59.webp";
import roseGoldRing60 from "../assets/images/products/rose-gold-rings/jewelry-pro-60.webp";

// Simple Pearl Earrings
import pearlEarring6 from "../assets/images/products/simple-pearl-earrings/jewelry-product-6.webp";
import pearlEarring7 from "../assets/images/products/simple-pearl-earrings/jewelry-product-7.webp";
import pearlEarring8 from "../assets/images/products/simple-pearl-earrings/jewelry-product-8.webp";
import pearlEarring9 from "../assets/images/products/simple-pearl-earrings/jewelry-product-9.webp";
import pearlEarring10 from "../assets/images/products/simple-pearl-earrings/jewelry-product-10.webp";

// Local image lookup map
const localProductImages = {
  // diamond-rings & glitter-diamond-ring
  "jewelry-pro-26": diamondRing26,
  "jewelry-pro-27": diamondRing27,
  "jewelry-pro-28": diamondRing28,
  "jewelry-pro-29": diamondRing29,
  "jewelry-pro-30": diamondRing30,

  // drop-earrings
  "jewelry-pro-46": dropEarring46,
  "jewelry-pro-47": dropEarring47,
  "jewelry-pro-48": dropEarring48,
  "jewelry-pro-49": dropEarring49,
  "jewelry-pro-50": dropEarring50,

  // floral-gold-bangle
  "jewelry-pro-31": floralBangle31,
  "jewelry-pro-32": floralBangle32,
  "jewelry-pro-33": floralBangle33,
  "jewelry-pro-34": floralBangle34,
  "jewelry-pro-35": floralBangle35,

  // flower-jhumka
  "jewelry-pro-51": flowerJhumka51,
  "jewelry-pro-52": flowerJhumka52,
  "jewelry-pro-53": flowerJhumka53,
  "jewelry-pro-54": flowerJhumka54,
  "jewelry-pro-55": flowerJhumka55,

  // gold-nose-pin & flower-nose-pin
  "jewelry-product-21": goldNosePin21,
  "jewelry-product-22": goldNosePin22,
  "jewelry-product-23": goldNosePin23,
  "jewelry-product-24": goldNosePin24,
  "jewelry-product-25": goldNosePin25,

  // modish-bracelet
  "jewelry-pro-41": modishBracelet41,
  "jewelry-pro-42": modishBracelet42,
  "jewelry-pro-43": modishBracelet43,
  "jewelry-pro-44": modishBracelet44,
  "jewelry-pro-45": modishBracelet45,

  // rose-gold-rings
  "jewelry-pro-56": roseGoldRing56,
  "jewelry-pro-57": roseGoldRing57,
  "jewelry-pro-58": roseGoldRing58,
  "jewelry-pro-59": roseGoldRing59,
  "jewelry-pro-60": roseGoldRing60,

  // simple-pearl-earrings
  "jewelry-product-6": pearlEarring6,
  "jewelry-product-7": pearlEarring7,
  "jewelry-product-8": pearlEarring8,
  "jewelry-product-9": pearlEarring9,
  "jewelry-product-10": pearlEarring10,
};

/* ------------------------------------------------------------------ */
/* Info that is IDENTICAL on every product page (theme-level content)  */
/* ------------------------------------------------------------------ */
export const commonProductInfo = {
  currency: "INR",
  currencyLabel: "Rs.",
  vendor: "Jelwo",
  type: "Jewelry",
  taxIncluded: true,
  shippingNote: "Tax included. Shipping calculated at checkout.",
  shortDescription:
    "Care for fiber: 30% more recycled polyester. We label garments manufactured using environmentally friendly technologies and raw materials with the Join Life label.",
  delivery: "Estimated delivery time: 5-7 days",
  returns: "Within 45 days of purchase",
  saleCountdown: { text: "Hurry up! Sale ends in:", endDate: "2030-08-30T00:00:00" },
  actions: ["Wishlist", "Sizeguide", "Question", "Share"],
  customOption: { label: "Custom option", placeholder: "Enter your text here" },
  paymentSecurity: {
    title: "Payment & Security",
    methods: ["Visa", "Mastercard", "American Express", "PayPal", "Diners Club", "Discover"],
    text: "Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.",
  },
  services: [
    { icon: "feather-map-pin", title: "Order tracking" },
    { icon: "feather-rotate-ccw", title: "90 days return" },
    { icon: "feather-dollar-sign", title: "Money guarantee" },
  ],
  description: {
    banner: descBannerImg,
    blocks: [
      {
        title: "Product Specifications",
        text: "Care for fiber: 30% more recycled polyester. We label garments manufactured using environmentally friendly technologies and raw materials with the Join Life label.",
      },
      {
        title: "Washing Instructions",
        items: [
          { icon: descIcon1, text: "Iron maximum 100ºC." },
          { icon: descIcon2, text: "Do not bleach/bleach." },
          { icon: descIcon3, text: "Do not dry clean." },
        ],
      },
      {
        title: "Material",
        text: "The Green to Wear 2.0 standard aims to minimize the environmental impact of textile production. To this end, we have developed Inditex's The List program.",
      },
      { title: "Wearing", lines: ["Model is 1.84 m wearing", "Size M"] },
    ],
  },
  returnPolicies: {
    paragraphs: [
      "Provided the conditions in our refund policy have been met, refunds will be processed using the original form of payment. You can return an item purchased online by posting it to us. Please contact customer service for return address. Please note that delivery costs will be excluded from the refund unless goods are returned in accordance with your statutory rights (e.g. they are faulty or not as ordered).",
    ],
    points: [
      "The items with the original receipt are returned within 30 days of purchase.",
      "Items must be in the original condition as purchased with all labels/tickets attached.",
    ],
  },
  sizeGuide: {
    columns: ["Size", "US", "Bust", "Waist", "Low Hip"],
    rows: [
      ["XS", "2", "32", "24 - 25", "33 - 34"],
      ["S", "4", "34 - 35", "26 - 27", "35 - 26"],
      ["M", "6", "36 - 37", "28 - 29", "38 - 40"],
      ["L", "8", "38 - 29", "30 - 31", "42 - 44"],
      ["XL", "10", "40 - 41", "32 - 33", "45 - 47"],
      ["XXL", "12", "42 - 43", "34 - 35", "48 - 50"],
    ],
    howToMeasure: [
      { title: "1. Chest", text: "Measure under your arms around the fullest part of your chest." },
      { title: "2. Waist", text: "Measure around your natural waistline, keeping the tape a bit loose." },
      { title: "3. Low hip", text: "With your feet together measure around the fullest part of your hips/rear." },
    ],
    image: measureImg,
  },
  aboutBanners: [
    {
      title: "New woman fashion arrivals",
      text: "As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze we’re asking women to invite us into their most intimate space.",
      image: fashionArrivalBannerImg,
      buttonText: "Shop now",
      href: "/collections/all",
    },
    {
      title: "I make clothes make fashion",
      text: "As part of our mission create space for women to express their sensuality without shame fear or the patriarchal gaze we’re asking women to invite us into their most intimate space.",
      image: fashionMakeBannerImg,
      buttonText: "Shop now",
      href: "/collections/all",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Builders (derive everything that can be calculated)                 */
/* ------------------------------------------------------------------ */
const SWATCH = {
  Gold: "rgb(212, 154, 6)",
  Yellow: "rgb(255, 229, 0)",
  Beige: "rgb(234, 216, 171)",
  Bronze: "rgb(205, 127, 50)",
  Brown: "rgb(154, 86, 48)",
  "Rose gold": "rgb(183, 110, 121)",
  Silver: "rgb(211, 211, 211)",
  Orange: "rgb(255, 138, 0)",
};

const unique = (arr) => [...new Set(arr)];
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Review row helper: R(author, rating, title, body, date, pictures?)
const R = (author, rating, title, body, date, pictures) => ({
  author,
  rating,
  title,
  body,
  date,
  verified: false,
  ...(pictures ? { pictures } : {}),
});

const buildReviews = (items = []) => {
  const count = items.length;
  if (!count) return { average: 0, count: 0, emptyText: "Be the first to write a review", items: [] };
  const histogram = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  items.forEach((r) => histogram[r.rating]++);
  const average = Math.round((items.reduce((s, r) => s + r.rating, 0) / count) * 100) / 100;
  return { average, count, histogram, items };
};

const shareLinks = (slug, name) => {
  const url = `https://jelwo.myshopify.com/products/${slug}`;
  return {
    url,
    facebook: `https://www.facebook.com/sharer.php?u=${url}`,
    twitter: `https://twitter.com/share?text=${encodeURIComponent(name)}&url=${url}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${url}`,
  };
};

/*
  images:   [fileKey, imageId]
  variants: [variantId, size|null, color, price, comparePrice|null, grams, fileKey, barcode?, sku?]
            sku defaults to "445"; pass null when the store has no SKU for that variant.
*/
const buildProduct = ({ id, name, slug, stock, images, variants, reviews }) => {
  const srcByFile = {};
  const imageList = images.map(([file, imgId]) => {
    const src = localProductImages[file] || file;
    srcByFile[file] = src;
    return { id: imgId, src, width: 1066, height: 1200, alt: name };
  });

  const variantList = variants.map(([vid, size, color, price, comparePrice, grams, file, barcode = null, sku = "445"]) => ({
    id: vid,
    title: size ? `${size} / ${color}` : color,
    size,
    color,
    sku,
    price,
    comparePrice,
    weightGrams: grams,
    barcode,
    image: srcByFile[file] || localProductImages[file] || file,
    available: true,
  }));

  const first = variantList[0]; // the page shows the first variant by default
  const sizes = unique(variantList.map((v) => v.size).filter(Boolean));
  const colors = unique(variantList.map((v) => v.color));

  return {
    id,
    slug,
    name,
    href: `/products/${slug}`,
    sku: first.sku,
    barcode: first.barcode,
    price: first.price,
    comparePrice: first.comparePrice,
    discountPercent: first.comparePrice ? Math.round(((first.comparePrice - first.price) / first.comparePrice) * 100) : 0,
    showSaleLabel: Boolean(first.comparePrice),
    stock,
    inStock: stock > 0,
    images: imageList,
    options: [
      ...(sizes.length ? [{ name: "Size", type: "pill", values: sizes, default: sizes[0] }] : []),
      { name: "Color", type: "swatch", default: colors[0], values: colors.map((n) => ({ name: n, rgb: SWATCH[n] })) },
    ],
    variants: variantList,
    additionalInfo: [
      { label: "Vendor", value: "Jelwo" },
      { label: "Type", value: "Jewelry" },
      ...(sizes.length ? [{ label: "Size", value: sizes.join(", ") }] : []),
      { label: "Color", value: colors.join(", ") },
      { label: "Sku", value: first.sku },
      ...(first.barcode ? [{ label: "Barcode", value: first.barcode }] : []),
      { label: "Weight", value: `${first.weightGrams / 1000} kg` },
    ],
    reviews: buildReviews(reviews),
    shareLinks: shareLinks(slug, name),
  };
};

/* ------------------------------------------------------------------ */
/* The 10 UNIQUE products                                             */
/* ------------------------------------------------------------------ */
const RAW = [
  // 1. rose-gold-rings
  {
    id: 7954700664969,
    slug: "rose-gold-rings",
    name: "Rose gold rings",
    stock: 15,
    images: [
      ["jewelry-pro-56", 26969118998665],
      ["jewelry-pro-57", 26969118834825],
      ["jewelry-pro-58", 26969118900361],
      ["jewelry-pro-59", 26969118965897],
      ["jewelry-pro-60", 26969118933129],
    ],
    variants: [
      [43242070638729, "28", "Gold",   22, 40, 90718, "jewelry-pro-56", "123456789"],
      [43242070671497, "28", "Beige",  22, 40, 90718, "jewelry-pro-56", "123456789"],
      [43242070704265, "28", "Silver", 22, 40, 90718, "jewelry-pro-56", "123456789"],
      [43242070769801, "29", "Gold",   25, 45, 90718, "jewelry-pro-60", "123456789"],
      [43242070802569, "29", "Beige",  25, 45, 90718, "jewelry-pro-60", "123456789"],
      [43242070835337, "29", "Silver", 25, 45, 90718, "jewelry-pro-60", "123456789"],
      [43242070900873, "30", "Gold",   28, 48, 90718, "jewelry-pro-58", "123456789"],
      [43242070933641, "30", "Beige",  28, 48, 90718, "jewelry-pro-58", "123456789"],
      [43242070966409, "30", "Silver", 28, 48, 90718, "jewelry-pro-58", "123456789"],
    ],
    reviews: [R("rgre", 5, "grgr", "ggg", "2025-04-14")],
  },

  // 2. flower-nose-pin (Repeat - uses gold-nose-pin images)
  {
    id: 7954700992649,
    slug: "flower-nose-pin",
    name: "Flower nose pin",
    stock: 15,
    images: [
      ["jewelry-product-21", 26965609676937],
      ["jewelry-product-22", 26965609644169],
      ["jewelry-product-23", 26965609709705],
      ["jewelry-product-24", 26965609775241],
      ["jewelry-product-25", 26965609611401],
    ],
    variants: [
      [43242077290633, null, "Gold",      12, null, 200,   "jewelry-product-21"],
      [43242077323401, null, "Beige",     12, null, 90718, "jewelry-product-25"],
      [43443317014665, null, "Rose gold", 12, null, 200,   "jewelry-product-23", null, null],
    ],
    reviews: [
      R("test", 4, "sdf", "sadf", "2025-09-01"),
      R("test", 4, "hbasdf", "haskdf", "2025-09-01"),
      R("gtgg", 5, "tghtttthtthththththththththt", "trhtrght", "2025-04-28"),
    ],
  },

  // 3. flower-jhumka
  {
    id: 7954700697737,
    slug: "flower-jhumka",
    name: "Flower jhumka",
    stock: 16,
    images: [
      ["jewelry-pro-51", 26969018663049],
      ["jewelry-pro-52", 26969018728585],
      ["jewelry-pro-53", 26969018597513],
      ["jewelry-pro-54", 26969018630281],
      ["jewelry-pro-55", 26969018794121],
    ],
    variants: [
      [43242071163017, null, "Gold",   18, 50, 90718, "jewelry-pro-51"],
      [43242071195785, null, "Yellow", 18, 50, 90718, "jewelry-pro-55"],
      [43242071228553, null, "Beige",  18, 50, 90718, "jewelry-pro-53"],
    ],
  },

  // 4. drop-earrings
  {
    id: 7954700763273,
    slug: "drop-earrings",
    name: "Drop earrings",
    stock: 16,
    images: [
      ["jewelry-pro-46", 26968995627145],
      ["jewelry-pro-47", 26968995594377],
      ["jewelry-pro-48", 26968995528841],
      ["jewelry-pro-49", 26968995561609],
      ["jewelry-pro-50", 26968995659913],
    ],
    variants: [
      [43242071589001, null, "Brown",  15, 44, 172,   "jewelry-pro-46", "12"],
      [43242071621769, null, "Gold",   16, 45, 100,   "jewelry-pro-50", "12312"],
      [43242071654537, null, "Orange", 17, 46, 14000, "jewelry-pro-48", "321"],
    ],
  },

  // 5. floral-gold-bangle
  {
    id: 7954700894345,
    slug: "floral-gold-bangle",
    name: "Floral gold bangle",
    stock: 16,
    images: [
      ["jewelry-pro-31", 26968892145801],
      ["jewelry-pro-32", 26968892113033],
      ["jewelry-pro-33", 26968892080265],
      ["jewelry-pro-34", 26968892047497],
      ["jewelry-pro-35", 26968892178569],
    ],
    variants: [
      [43242075947145, "2-12", "Gold",      28, null, 90718, "jewelry-pro-31", "123456789"],
      [43242075979913, "2-12", "Bronze",    28, null, 90718, "jewelry-pro-31"],
      [43242076012681, "2-12", "Rose gold", 28, null, 90718, "jewelry-pro-31"],
      [43242076045449, "2-14", "Gold",      28, null, 90718, "jewelry-pro-35", "123456789"],
      [43242076078217, "2-14", "Bronze",    28, null, 90718, "jewelry-pro-35"],
      [43242076110985, "2-14", "Rose gold", 28, null, 90718, "jewelry-pro-35"],
      [43242076143753, "2-16", "Gold",      28, null, 90718, "jewelry-pro-33", "123456789"],
      [43242076176521, "2-16", "Bronze",    28, null, 90718, "jewelry-pro-33"],
      [43242076209289, "2-16", "Rose gold", 28, null, 90718, "jewelry-pro-33"],
    ],
    reviews: [R("kalpesh khan", 4, "good", "good", "2025-02-25")],
  },

  // 6. simple-pearl-earrings
  {
    id: 8045123731593,
    slug: "simple-pearl-earrings",
    name: "Simple Pearl earrings",
    stock: 16,
    images: [
      ["jewelry-product-6", 27037334012041],
      ["jewelry-product-7", 27037334044809],
      ["jewelry-product-8", 27037334077577],
      ["jewelry-product-9", 27037334110345],
      ["jewelry-product-10", 27037334143113],
    ],
    variants: [
      [43790018248841, null, "Gold",   15, 20,   90718, "jewelry-product-6",  "123456789"],
      [43790018281609, null, "Brown",  15, null, 90718, "jewelry-product-10", "123456789"],
      [43790018314377, null, "Silver", 15, null, 90718, "jewelry-product-8",  "123456789"],
    ],
    reviews: [R("fb", 5, "fgjnfg", "dffd", "2025-09-17")],
  },

  // 7. diamond-rings
  {
    id: 7954700927113,
    slug: "diamond-rings",
    name: "Diamond rings",
    stock: 16,
    images: [
      ["jewelry-pro-26", 26965626126473],
      ["jewelry-pro-27", 26965625831561],
      ["jewelry-pro-28", 26965626093705],
      ["jewelry-pro-29", 26965626028169],
      ["jewelry-pro-30", 26965625962633],
    ],
    variants: [
      [43242076340361, "28", "Gold",   10, null, 90718, "jewelry-pro-26", "123456789"],
      [43242076373129, "28", "Yellow", 10, null, 90718, "jewelry-pro-26", "123456789"],
      [43242076405897, "28", "Beige",  10, null, 90718, "jewelry-pro-26", "123456789"],
      [43242076471433, "29", "Gold",   12, null, 90718, "jewelry-pro-30", "123456789"],
      [43242076504201, "29", "Yellow", 12, null, 90718, "jewelry-pro-30", "123456789"],
      [43242076536969, "29", "Beige",  12, null, 90718, "jewelry-pro-30", "123456789"],
      [43242076602505, "30", "Gold",   18, null, 90718, "jewelry-pro-28", "123456789"],
      [43242076635273, "30", "Yellow", 18, null, 90718, "jewelry-pro-28", "123456789"],
      [43242076668041, "30", "Beige",  18, null, 90718, "jewelry-pro-28", "123456789"],
    ],
  },

  // 8. gold-nose-pin
  {
    id: 8045128548489,
    slug: "gold-nose-pin",
    name: "Gold nose pin",
    stock: 16,
    images: [
      ["jewelry-product-21", 27037393977481],
      ["jewelry-product-22", 27037394010249],
      ["jewelry-product-23", 27037394043017],
      ["jewelry-product-24", 27037394075785],
      ["jewelry-product-25", 27037394108553],
    ],
    variants: [
      [43790048395401, null, "Gold",  12, null, 200,   "jewelry-product-21"],
      [43790048428169, null, "Beige", 12, null, 90718, "jewelry-product-25"],
      [43790048460937, null, "Brown", 12, null, 200,   "jewelry-product-23", null, null],
    ],
  },

  // 9. glitter-diamond-ring (Repeat - uses diamond-rings images)
  {
    id: 8045130416265,
    slug: "glitter-diamond-ring",
    name: "Glitter diamond ring",
    stock: 16,
    images: [
      ["jewelry-pro-26", 27037411672201],
      ["jewelry-pro-27", 27037411541129],
      ["jewelry-pro-28", 27037411573897],
      ["jewelry-pro-29", 27037411606665],
      ["jewelry-pro-30", 27037411639433],
    ],
    variants: [
      [43790067957897, "28", "Gold",   10, null, 90718, "jewelry-pro-26", "123456789"],
      [43790067990665, "28", "Yellow", 10, null, 90718, "jewelry-pro-26", "123456789"],
      [43790068023433, "28", "Beige",  10, null, 90718, "jewelry-pro-26", "123456789"],
      [43790068056201, "29", "Gold",   12, null, 90718, "jewelry-pro-30", "123456789"],
      [43790068088969, "29", "Yellow", 12, null, 90718, "jewelry-pro-30", "123456789"],
      [43790068121737, "29", "Beige",  12, null, 90718, "jewelry-pro-30", "123456789"],
      [43790068154505, "30", "Gold",   18, null, 90718, "jewelry-pro-28", "123456789"],
      [43790068187273, "30", "Yellow", 18, null, 90718, "jewelry-pro-28", "123456789"],
      [43790068220041, "30", "Beige",  18, null, 90718, "jewelry-pro-28", "123456789"],
    ],
  },

  // 10. modish-bracelet
  {
    id: 7954700828809,
    slug: "modish-bracelet",
    name: "Modish bracelet",
    stock: 16,
    images: [
      ["jewelry-pro-41", 26968936644745],
      ["jewelry-pro-42", 26968936677513],
      ["jewelry-pro-43", 26968936546441],
      ["jewelry-pro-44", 26968936611977],
      ["jewelry-pro-45", 26968936579209],
    ],
    variants: [
      [43242075390089, "6",   "Gold",   17, 39, 200,   "jewelry-pro-41", null, "445"],
      [43242075422857, "6",   "Yellow", 17, 39, 90718, "jewelry-pro-41", null, "446"],
      [43446000812169, "6",   "Brown",  17, 39, 200,   "jewelry-pro-41", null, null],
      [43242075455625, "6.5", "Gold",   18, 39, 200,   "jewelry-pro-45", null, "447"],
      [43242075488393, "6.5", "Yellow", 18, 39, 90718, "jewelry-pro-45", null, "448"],
      [43446000844937, "6.5", "Brown",  17, 39, 200,   "jewelry-pro-45", null, null],
      [43242075521161, "7",   "Gold",   19, 39, 200,   "jewelry-pro-41", null, "449"],
      [43242075553929, "7",   "Yellow", 19, 39, 90718, "jewelry-pro-41", null, "440"],
      [43446000877705, "7",   "Brown",  17, 39, 200,   "jewelry-pro-41", null, null],
      [43242075586697, "7.5", "Gold",   20, 39, 200,   "jewelry-pro-43", null, "441"],
      [43242075619465, "7.5", "Yellow", 20, 39, 90718, "jewelry-pro-43", null, "442"],
      [43446000910473, "7.5", "Brown",  17, 39, 200,   "jewelry-pro-43", null, null],
    ],
  },
];

export const products = RAW.map(buildProduct);
export const productsByHandle = Object.fromEntries(products.map((p) => [p.slug, p]));

/* ------------------------------------------------------------------ */
/* Mega menu: 4 columns x 6 slots. [navbar label, product handle]      */
/* Slots match products by the ORDER the pages were sent.              */
/* ------------------------------------------------------------------ */
const MENU = [
  {
    key: "bracelets",
    heading: "Bracelets",
    items: [
      ["Rose gold rings", "rose-gold-rings"],
      ["Flower nose pin", "flower-nose-pin"],
      ["Modish bracelet", "modish-bracelet"],
      ["Floral gold bangle", "floral-gold-bangle"],
      ["Gold nose pin", "gold-nose-pin"],
      ["Diamond rings", "diamond-rings"],
    ],
  },
  {
    key: "earrings",
    heading: "Earrings",
    items: [
      ["Flower jhumka", "flower-jhumka"],
      ["Drop earrings", "drop-earrings"],
      ["Simple Pearl earrings", "simple-pearl-earrings"],
      ["Rose gold rings", "rose-gold-rings"],
      ["Floral gold bangle", "floral-gold-bangle"],
      ["Glitter diamond ring", "glitter-diamond-ring"],
    ],
  },
  {
    key: "necklace",
    heading: "Necklace",
    items: [
      ["Rose gold rings", "rose-gold-rings"],
      ["Flower nose pin", "flower-nose-pin"],
      ["Flower jhumka", "flower-jhumka"],
      ["Drop earrings", "drop-earrings"],
      ["Floral gold bangle", "floral-gold-bangle"],
      ["Simple Pearl earrings", "simple-pearl-earrings"],
    ],
  },
  {
    key: "rings",
    heading: "Rings",
    items: [
      ["Rose gold rings", "rose-gold-rings"],
      ["Flower nose pin", "flower-nose-pin"],
      ["Diamond rings", "diamond-rings"],
      ["Floral gold bangle", "floral-gold-bangle"],
      ["Glitter diamond ring", "glitter-diamond-ring"],
      ["Gold nose pin", "gold-nose-pin"],
    ],
  },
];

// Menu structure only (no product data) – good for rendering the navbar
export const menuCategories = MENU.map((cat, c) => ({
  key: cat.key,
  heading: cat.heading,
  items: cat.items.map(([navLabel, productHandle], i) => ({
    menuId: `${c}-${i + 1}`,
    navLabel,
    navSlug: slugify(navLabel),
    productHandle,
  })),
}));

// Full item = shared page info + product data + menu info.
const toFullItem = (categoryKey) => (item) => ({
  ...commonProductInfo,
  ...(productsByHandle[item.productHandle] || {}),
  ...item,
  categoryKey,
});

export const menuItemsByCategory = Object.fromEntries(
  menuCategories.map((cat) => [cat.key, cat.items.map(toFullItem(cat.key))])
);

export const menuItems = Object.values(menuItemsByCategory).flat();

// Category products
export const necklaceProducts = menuItemsByCategory.necklace;
export const braceletsProducts = menuItemsByCategory.bracelets;
export const earringsProducts = menuItemsByCategory.earrings;
export const ringsProducts = menuItemsByCategory.rings;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
export const getProductByHandle = (handle) => {
  if (!handle) return products[0];
  const clean = slugify(handle);
  const found =
    productsByHandle[handle] ||
    productsByHandle[clean] ||
    products.find((p) => p.slug === clean || slugify(p.name) === clean || String(p.id) === String(handle));

  return found ? { ...commonProductInfo, ...found } : products[0];
};

export const getMenuItemById = (menuId) => menuItems.find((i) => i.menuId === menuId);

// e.g. getMenuItemBySlug("rings", "gold-nose-pin")
export const getMenuItemBySlug = (categoryKey, navSlug) =>
  (menuItemsByCategory[categoryKey] || []).find((i) => i.navSlug === navSlug);

// Find the variant for a chosen Size + Color (size is optional for 1-option products)
export const findVariant = (product, { size, color } = {}) =>
  product?.variants?.find(
    (v) => (size === undefined || v.size === size) && (color === undefined || v.color === color)
  );

export default {
  commonProductInfo,
  products,
  productsByHandle,
  menuCategories,
  menuItems,
  menuItemsByCategory,
  necklaceProducts,
  braceletsProducts,
  earringsProducts,
  ringsProducts,
  getProductByHandle,
  getMenuItemById,
  getMenuItemBySlug,
  findVariant,
};
