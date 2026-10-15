// Mock Data for Section 7: Best Products / Hot Picks Carousel

// Static videos from public directory (avoids Vite dev transform & cache errors)
const video1 = "/videos/1.mp4";
const video2 = "/videos/2.mp4";
const video3 = "/videos/3.mp4";
const video4 = "/videos/4.mp4";
const video5 = "/videos/5.mp4";

// Product images from assets
import pro11 from "@/assets/images/home-best/jewelry-pro-11.webp";
import pro12 from "@/assets/images/home-best/jewelry-pro-12.webp";
import pro16 from "@/assets/images/home-best/jewelry-pro-16.webp";
import pro17 from "@/assets/images/home-best/jewelry-pro-17.webp";
import pro21 from "@/assets/images/home-best/jewelry-pro-21.webp";
import pro22 from "@/assets/images/home-best/jewelry-pro-22.webp";
import pro26 from "@/assets/images/home-best/jewelry-product-26.webp";
import pro27 from "@/assets/images/home-best/jewelry-product-27.webp";
import pro46 from "@/assets/images/home-best/jewelry-pro-46.webp";
import pro47 from "@/assets/images/home-best/jewelry-pro-47.webp";
import pro51 from "@/assets/images/home-best/jewelry-product-51.webp";
import pro52 from "@/assets/images/home-best/jewelry-product-52.webp";

// Posters / Thumbnails
import thumb1 from "@/assets/images/home-best/72e5b0f02511443c8a62a81b9024ddb9.thumbnail.0000000000_small.webp";
import thumb2 from "@/assets/images/home-best/7826750f43d941b28a3d57b2fd330864.thumbnail.0000000000_small.webp";
import thumb3 from "@/assets/images/home-best/accac3e666ff4e5c9314443e6438ea3a.thumbnail.0000000000_small.webp";
import thumb4 from "@/assets/images/home-best/ba3a4b4a570f4749a2bf30fd1aa1b96d.thumbnail.0000000000_small.webp";

export const mockBestProducts = [
  {
    id: 1,
    video: video1,
    poster: thumb1,
    title: "FLOWER PENDANT",
    price: "Rs. 22.00",
    originalPrice: null,
    imageFront: pro11,
    imageBack: pro12,
    rotateDirection: "horizontal",
    url: "/products/flower-pendant",
  },
  {
    id: 2,
    video: video2,
    poster: thumb2,
    title: "DROP EARRINGS",
    price: "Rs. 15.00",
    originalPrice: "Rs. 44.00",
    imageFront: pro16,
    imageBack: pro17,
    rotateDirection: "vertical",
    url: "/products/drop-earrings",
  },
  {
    id: 3,
    video: video3,
    poster: thumb3,
    title: "FLOWER NOSE PIN",
    price: "Rs. 12.00",
    originalPrice: null,
    imageFront: pro26,
    imageBack: pro27,
    rotateDirection: "diagonal",
    url: "/products/flower-nose-pin",
  },
  {
    id: 4,
    video: video4,
    poster: thumb4,
    title: "FLOWER PENDANT",
    price: "Rs. 22.00",
    originalPrice: null,
    imageFront: pro21,
    imageBack: pro22,
    rotateDirection: "horizontal",
    url: "/products/flower-pendant-2",
  },
  {
    id: 5,
    video: video5,
    poster: thumb1,
    title: "GLITTER DIAMOND RING",
    price: "Rs. 10.00",
    originalPrice: null,
    imageFront: pro51,
    imageBack: pro52,
    rotateDirection: "vertical",
    url: "/products/glitter-diamond-ring",
  },
  {
    id: 6,
    video: video2,
    poster: thumb2,
    title: "TWISTER BANGLE",
    price: "Rs. 28.00",
    originalPrice: "Rs. 35.00",
    imageFront: pro46,
    imageBack: pro47,
    rotateDirection: "horizontal",
    url: "/products/twister-bangle",
  },
  {
    id: 7,
    video: video1,
    poster: thumb1,
    title: "GEMSTONE JHUMKAS",
    price: "Rs. 18.00",
    originalPrice: "Rs. 50.00",
    imageFront: pro11,
    imageBack: pro16,
    rotateDirection: "diagonal",
    url: "/products/gemstone-jhumkas",
  },
];

export default mockBestProducts;
