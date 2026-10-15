import diamondRing26 from "../assets/images/products/diamond-rings/jewelry-pro-26.webp";
import goldNosePin21 from "../assets/images/products/gold-nose-pin/jewelry-product-21.webp";
import roseGoldRing56 from "../assets/images/products/rose-gold-rings/jewelry-pro-56.webp";
import floralBangle31 from "../assets/images/products/floral-gold-bangle/jewelry-pro-31.webp";
import flowerJhumka51 from "../assets/images/products/flower-jhumka/jewelry-pro-51.webp";
import modishBracelet41 from "../assets/images/products/modish-bracelet/jewelry-pro-41.webp";
import dropEarring46 from "../assets/images/products/drop-earrings/jewelry-pro-46.webp";
import pearlEarring6 from "../assets/images/products/simple-pearl-earrings/jewelry-product-6.webp";

export const navLinks = [
  {
    name: "Home",
    href: "/",
    hasDropdown: true,
    badge: null,
    subItems: [
      { title: "Option-1", href: "/" },
      { title: "Option-2", href: "/products" },
      { title: "Option-3", href: "/blogs" },
      { title: "Option-4", href: "/about-1" },
      { title: "Option-5", href: "/contact-1" },
    ],
  },
  {
    name: "Shop",
    href: "/collections",
    hasDropdown: true,
    badge: "SALE",
    megaMenu: {
      type: "shop",
      categories: [
        {
          title: "Bracelets",
          items: [
            { name: "Rose gold rings", href: "/products/rose-gold-rings" },
            { name: "Flower nose pin", href: "/products/flower-nose-pin" },
            { name: "Modish bracelet", href: "/products/modish-bracelet" },
            { name: "Floral gold bangle", href: "/products/floral-gold-bangle" },
            { name: "Gold nose pin", href: "/products/gold-nose-pin" },
            { name: "Diamond rings", href: "/products/diamond-rings" },
          ],
        },
        {
          title: "Earrings",
          items: [
            { name: "Flower jhumka", href: "/products/flower-jhumka" },
            { name: "Drop earrings", href: "/products/drop-earrings" },
            { name: "Simple Pearl earrings", href: "/products/simple-pearl-earrings" },
            { name: "Rose gold rings", href: "/products/rose-gold-rings" },
            { name: "Floral gold bangle", href: "/products/floral-gold-bangle" },
            { name: "Glitter diamond ring", href: "/products/glitter-diamond-ring" },
          ],
        },
        {
          title: "Necklace",
          items: [
            { name: "Rose gold rings", href: "/products/rose-gold-rings" },
            { name: "Flower nose pin", href: "/products/flower-nose-pin" },
            { name: "Flower jhumka", href: "/products/flower-jhumka" },
            { name: "Drop earrings", href: "/products/drop-earrings" },
            { name: "Floral gold bangle", href: "/products/floral-gold-bangle" },
            { name: "Simple Pearl earrings", href: "/products/simple-pearl-earrings" },
          ],
        },
        {
          title: "Rings",
          items: [
            { name: "Rose gold rings", href: "/products/rose-gold-rings" },
            { name: "Flower nose pin", href: "/products/flower-nose-pin" },
            { name: "Diamond rings", href: "/products/diamond-rings" },
            { name: "Floral gold bangle", href: "/products/floral-gold-bangle" },
            { name: "Glitter diamond ring", href: "/products/glitter-diamond-ring" },
            { name: "Gold nose pin", href: "/products/gold-nose-pin" },
          ],
        },
      ],
      banner: {
        title: "New jewelry",
        discount: "30% OFF",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
        link: "/products/rose-gold-rings",
      },
    },
  },
  {
    name: "Products",
    href: "/products",
    hasDropdown: true,
    badge: null,
    megaMenu: {
      type: "products",
      categories: [
        {
          title: "Bracelets",
          items: [
            { name: "Rose gold rings", href: "/products/rose-gold-rings" },
            { name: "Flower nose pin", href: "/products/flower-nose-pin" },
            { name: "Modish bracelet", href: "/products/modish-bracelet" },
            { name: "Floral gold bangle", href: "/products/floral-gold-bangle" },
            { name: "Gold nose pin", href: "/products/gold-nose-pin" },
            { name: "Diamond rings", href: "/products/diamond-rings" },
          ],
        },
        {
          title: "Earrings",
          items: [
            { name: "Flower jhumka", href: "/products/flower-jhumka" },
            { name: "Drop earrings", href: "/products/drop-earrings" },
            { name: "Simple Pearl earrings", href: "/products/simple-pearl-earrings" },
            { name: "Rose gold rings", href: "/products/rose-gold-rings" },
            { name: "Floral gold bangle", href: "/products/floral-gold-bangle" },
            { name: "Glitter diamond ring", href: "/products/glitter-diamond-ring" },
          ],
        },
        {
          title: "Necklace",
          items: [
            { name: "Rose gold rings", href: "/products/rose-gold-rings" },
            { name: "Flower nose pin", href: "/products/flower-nose-pin" },
            { name: "Flower jhumka", href: "/products/flower-jhumka" },
            { name: "Drop earrings", href: "/products/drop-earrings" },
            { name: "Floral gold bangle", href: "/products/floral-gold-bangle" },
            { name: "Simple Pearl earrings", href: "/products/simple-pearl-earrings" },
          ],
        },
        {
          title: "Rings",
          items: [
            { name: "Rose gold rings", href: "/products/rose-gold-rings" },
            { name: "Flower nose pin", href: "/products/flower-nose-pin" },
            { name: "Diamond rings", href: "/products/diamond-rings" },
            { name: "Floral gold bangle", href: "/products/floral-gold-bangle" },
            { name: "Glitter diamond ring", href: "/products/glitter-diamond-ring" },
            { name: "Gold nose pin", href: "/products/gold-nose-pin" },
          ],
        },
      ],
      popularCollection: [
        {
          id: 1,
          title: "DIAMOND RINGS",
          category: "Rings",
          price: "Rs. 10.00",
          rating: "5.0",
          href: "/products/diamond-rings",
          image: diamondRing26,
        },
        {
          id: 2,
          title: "FLOWER NOSE PIN",
          category: "Nose Pin",
          price: "Rs. 12.00",
          rating: "4.33",
          href: "/products/flower-nose-pin",
          image: goldNosePin21,
        },
        {
          id: 3,
          title: "ROSE GOLD RINGS",
          category: "Rings",
          price: "Rs. 22.00",
          rating: "5.0",
          href: "/products/rose-gold-rings",
          image: roseGoldRing56,
        },
        {
          id: 4,
          title: "FLORAL GOLD BANGLE",
          category: "Bracelets",
          price: "Rs. 28.00",
          rating: "4.9",
          href: "/products/floral-gold-bangle",
          image: floralBangle31,
        },
        {
          id: 5,
          title: "FLOWER JHUMKA",
          category: "Earrings",
          price: "Rs. 18.00",
          rating: "4.8",
          href: "/products/flower-jhumka",
          image: flowerJhumka51,
        },
        {
          id: 6,
          title: "MODISH BRACELET",
          category: "Bracelets",
          price: "Rs. 17.00",
          rating: "4.6",
          href: "/products/modish-bracelet",
          image: modishBracelet41,
        },
        {
          id: 7,
          title: "DROP EARRINGS",
          category: "Earrings",
          price: "Rs. 15.00",
          rating: "4.7",
          href: "/products/drop-earrings",
          image: dropEarring46,
        },
        {
          id: 8,
          title: "SIMPLE PEARL EARRINGS",
          category: "Earrings",
          price: "Rs. 15.00",
          rating: "5.0",
          href: "/products/simple-pearl-earrings",
          image: pearlEarring6,
        },
      ],
    },
  },
  {
    name: "Blogs",
    href: "/blogs",
    hasDropdown: false,
    badge: null,
  },
  {
    name: "Pages",
    href: "#",
    hasDropdown: true,
    badge: null,
    subItems: [
      {
        title: "About us",
        href: "/about-1",
        hasArrow: true,
        subOptions: [
          { title: "About 1", href: "/about-1" },
          { title: "About 2", href: "/about-2" },
        ],
      },
      {
        title: "Contact",
        href: "/contact-1",
        hasArrow: true,
        subOptions: [
          { title: "Contact 1", href: "/contact-1" },
          { title: "Contact 2", href: "/contact-2" },
        ],
      },
      { title: "Faq’s", href: "/faq", hasArrow: false },
      { title: "Privacy policy", href: "/privacy-policy", hasArrow: false },
      { title: "Refund policy", href: "/refund-policy", hasArrow: false },
      { title: "Store location", href: "/store-location", hasArrow: false },
      { title: "Shipping & return", href: "/shipping-and-return", hasArrow: false },
      { title: "Terms & condition", href: "/terms-and-condition", hasArrow: false },
    ],
  },
];

export default navLinks;
