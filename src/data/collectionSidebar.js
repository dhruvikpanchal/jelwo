// src/data/sidebarData.js

export const categories = [
  {
    name: "14K, 58.3%",
    count: 12,
    slug: "14k-58-3",
  },
  {
    name: "18K, 75.0%",
    count: 12,
    slug: "18k-75-0",
  },
  {
    name: "22K, 91.7%",
    count: 12,
    slug: "22k-91-7",
  },
  {
    name: "24K, 99.9%",
    count: 12,
    slug: "24k-99-9",
  },
  {
    name: "Bangles",
    count: 12,
    slug: "bangles",
  },
  {
    name: "Best seller",
    count: 12,
    slug: "best-seller",
  },
  {
    name: "Bracelets",
    count: 12,
    slug: "bracelets",
  },
  {
    name: "Brooch",
    count: 12,
    slug: "brooch",
  },
  {
    name: "Chain",
    count: 12,
    slug: "chain",
  },
  {
    name: "Diamond",
    count: 10,
    slug: "diamond",
  },
  {
    name: "Diamonds",
    count: 10,
    slug: "diamond-1",
  },
  {
    name: "Earring",
    count: 12,
    slug: "earrings-1",
  },
  {
    name: "Earrings",
    count: 10,
    slug: "earrings",
  },
  {
    name: "Gold",
    count: 12,
    slug: "gold",
  },
  {
    name: "Jewelry",
    count: 12,
    slug: "jewelry",
  },
  {
    name: "Meenakari",
    count: 8,
    slug: "diamond-2",
  },
  {
    name: "Necklace",
    count: 12,
    slug: "necklace",
  },
  {
    name: "Necklace",
    count: 8,
    slug: "necklaces-1",
  },
  {
    name: "Necklaces",
    count: 12,
    slug: "necklaces",
  },
  {
    name: "New product",
    count: 12,
    slug: "new-product",
  },
  {
    name: "Nose pins",
    count: 12,
    slug: "nose-pins",
  },
  {
    name: "Pendant",
    count: 8,
    slug: "pendants-1",
  },
  {
    name: "Pendants",
    count: 12,
    slug: "pendants",
  },
  {
    name: "Platinum ring",
    count: 12,
    slug: "xyz",
  },
  {
    name: "Rings",
    count: 12,
    slug: "frontpage",
  },
  {
    name: "Rose gold",
    count: 12,
    slug: "rose-gold",
  },
  {
    name: "Trending product",
    count: 12,
    slug: "trending-product",
  },
];

export const availabilityFilters = [
  {
    name: "In stock",
    value: "1",
    count: 24,
  },
  {
    name: "Out of stock",
    value: "0",
    count: 1,
  },
];

export const priceFilter = {
  min: 0,
  max: 28,
  currency: "₹",
  highestPrice: "Rs. 28.00",
};

export const colorFilters = [
  {
    name: "Beige",
    count: 11,
    value: "beige",
    color: "rgb(234, 216, 171)",
    metaobjectId: "119223484553",
  },
  {
    name: "Bronze",
    count: 3,
    value: "bronze",
    color: "rgb(205, 127, 50)",
    metaobjectId: "119223681161",
  },
  {
    name: "Brown",
    count: 13,
    value: "brown",
    color: "rgb(154, 86, 48)",
    metaobjectId: "111133589641",
  },
  {
    name: "Gold",
    count: 24,
    value: "gold",
    color: "rgb(212, 154, 6)",
    metaobjectId: "111133622409",
  },
  {
    name: "Orange",
    count: 6,
    value: "orange",
    color: "rgb(255, 138, 0)",
    metaobjectId: "111133655177",
  },
  {
    name: "Rose gold",
    count: 2,
    value: "rose-gold",
    color: "rgb(183, 110, 121)",
    metaobjectId: "119223877769",
  },
  {
    name: "Silver",
    count: 6,
    value: "silver",
    color: "rgb(211, 211, 211)",
    metaobjectId: "119223419017",
  },
  {
    name: "Yellow",
    count: 7,
    value: "yellow",
    color: "rgb(255, 229, 0)",
    metaobjectId: "119214145673",
  },
];

// Image imports for special products & sidebar banner
import pro36 from "../assets/images/home-newArrivals/jewelry-pro-36.webp";
import pro16 from "../assets/images/home-best/jewelry-pro-16.webp";
import pro56 from "../assets/images/products/rose-gold-rings/jewelry-pro-56.webp";
import pro6 from "../assets/images/products/simple-pearl-earrings/jewelry-product-6.webp";
import pro11 from "../assets/images/home-best/jewelry-pro-11.webp";
import pro21 from "../assets/images/products/gold-nose-pin/jewelry-product-21.webp";
import pro31 from "../assets/images/products/floral-gold-bangle/jewelry-pro-31.webp";
import pro41 from "../assets/images/products/modish-bracelet/jewelry-pro-41.webp";
import pro26 from "../assets/images/products/diamond-rings/jewelry-pro-26.webp";
import bannerImg from "../assets/images/home-banner/jewelry-3-banner-3.webp";

export const specialProducts = [
  {
    id: "43242075652233",
    name: "IAMOND RASHMI RING",
    slug: "diamond-rings",
    price: 12,
    oldPrice: null,
    image: pro36,
    images: ["jewelry-pro-36.jpg", "jewelry-pro-39.jpg"],
  },
  {
    id: "43242077585545",
    name: "TWISTER BANGLE",
    slug: "floral-gold-bangle",
    price: 28,
    oldPrice: 35,
    image: pro16,
    images: ["jewelry-pro-16.jpg", "jewelry-pro-17.jpg"],
  },
  {
    id: "43242077290633",
    name: "Flower nose pin",
    slug: "flower-nose-pin",
    price: 12,
    oldPrice: null,
    image: pro21,
    images: ["jewelry-pro-21.jpg", "jewelry-pro-22.jpg"],
  },
  {
    id: "43242070638729",
    name: "Rose gold rings",
    slug: "rose-gold-rings",
    price: 22,
    oldPrice: 40,
    image: pro56,
    images: ["jewelry-pro-56.jpg", "jewelry-pro-57.jpg"],
  },
  {
    id: "43242078634121",
    name: "Pearl earrings",
    slug: "simple-pearl-earrings",
    price: 15,
    oldPrice: 20,
    image: pro6,
    images: ["jewelry-pro-6.jpg", "jewelry-pro-7.jpg"],
  },
  {
    id: "43242078109833",
    name: "Flower pendant",
    slug: "flower-nose-pin",
    price: 22,
    oldPrice: null,
    image: pro11,
    images: ["jewelry-pro-11.jpg", "jewelry-pro-12.jpg"],
  },
  {
    id: "43242076897417",
    name: "Sherbi ring",
    slug: "rose-gold-rings",
    price: 26,
    oldPrice: 30,
    image: pro36,
    images: ["jewelry-pro-1.jpg", "jewelry-pro-2.jpg"],
  },
  {
    id: "43242075947145",
    name: "Floral gold bangle",
    slug: "floral-gold-bangle",
    price: 28,
    oldPrice: null,
    image: pro31,
    images: ["jewelry-pro-31.jpg", "jewelry-pro-32.jpg"],
  },
  {
    id: "43242075390089",
    name: "Modish bracelet",
    slug: "modish-bracelet",
    price: 17,
    oldPrice: 39,
    image: pro41,
    images: ["jewelry-pro-41.jpg", "jewelry-pro-42.jpg"],
  },
  {
    id: "43242076340361",
    name: "Diamond rings",
    slug: "diamond-rings",
    price: 10,
    oldPrice: null,
    image: pro26,
    images: ["jewelry-pro-26.jpg", "jewelry-pro-27.jpg"],
  },
];

export const sidebarBanner = {
  image: bannerImg,
  title: "Meet our new collection",
  subtitle: "BEAUTY & ELEGANCE",
  width: 350,
  height: 470,
  link: "/products",
  alt: "Jewelry collection",
};

export const sidebarData = {
  categories,
  availability: availabilityFilters,
  price: priceFilter,
  colors: colorFilters,
  specialProducts,
  banner: sidebarBanner,
};

export default sidebarData;

