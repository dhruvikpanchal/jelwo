// Mock Data for New Arrivals, Trending, and Bestseller Products

import proRashmiRing from "@/assets/images/home-newArrivals/jewelry-pro-21.webp";
import proFlowerNosePin from "@/assets/images/home-newArrivals/jewelry-pro-36.webp";
import proRoseGoldRing from "@/assets/images/home-newArrivals/jewelry-pro-56.webp";
import proPearlEarring from "@/assets/images/home-newArrivals/jewelry-pro-6.webp";

export const mockNewArrivals = {
  new: [
    {
      id: 1,
      title: "IAMOND RASHMI RING",
      category: "Jewelry",
      image: proRashmiRing,
      price: "12.00",
      hasFrom: true,
      originalPrice: null,
      rating: "5.0",
      discount: null,
      description:
        "Exquisite diamond crafted rashmi ring with intertwining gold bands, offering timeless grace for every special celebration.",
    },
    {
      id: 2,
      title: "FLOWER NOSE PIN",
      category: "Jewelry",
      image: proFlowerNosePin,
      price: "12.00",
      hasFrom: false,
      originalPrice: null,
      rating: "4.33",
      discount: null,
      description:
        "Delicately sculpted floral swirl nose pin in 18K solid yellow gold, combining traditional heritage with modern elegance.",
    },
    {
      id: 3,
      title: "ROSE GOLD RINGS",
      category: "Jewelry",
      image: proRoseGoldRing,
      price: "22.00",
      hasFrom: true,
      originalPrice: "40.00",
      rating: "5.0",
      discount: "45%",
      description:
        "Stunning entwined pave diamond band sculpted in lustrous rose and white gold, crafted for radiant everyday luxury.",
    },
    {
      id: 4,
      title: "PEARL EARRINGS",
      category: "Jewelry",
      image: proPearlEarring,
      price: "15.00",
      hasFrom: false,
      originalPrice: "20.00",
      rating: "5.0",
      discount: "25%",
      description:
        "Geometric filigree stud earrings accented with brilliant-cut diamonds and warm golden polish for understated elegance.",
    },
  ],
  trending: [
    {
      id: 3,
      title: "ROSE GOLD RINGS",
      category: "Jewelry",
      image: proRoseGoldRing,
      price: "22.00",
      hasFrom: true,
      originalPrice: "40.00",
      rating: "5.0",
      discount: "45%",
      description:
        "Stunning entwined pave diamond band sculpted in lustrous rose and white gold, crafted for radiant everyday luxury.",
    },
    {
      id: 1,
      title: "IAMOND RASHMI RING",
      category: "Jewelry",
      image: proRashmiRing,
      price: "12.00",
      hasFrom: true,
      originalPrice: null,
      rating: "5.0",
      discount: null,
      description:
        "Exquisite diamond crafted rashmi ring with intertwining gold bands, offering timeless grace for every special celebration.",
    },
    {
      id: 4,
      title: "PEARL EARRINGS",
      category: "Jewelry",
      image: proPearlEarring,
      price: "15.00",
      hasFrom: false,
      originalPrice: "20.00",
      rating: "5.0",
      discount: "25%",
      description:
        "Geometric filigree stud earrings accented with brilliant-cut diamonds and warm golden polish for understated elegance.",
    },
    {
      id: 2,
      title: "FLOWER NOSE PIN",
      category: "Jewelry",
      image: proFlowerNosePin,
      price: "12.00",
      hasFrom: false,
      originalPrice: null,
      rating: "4.33",
      discount: null,
      description:
        "Delicately sculpted floral swirl nose pin in 18K solid yellow gold, combining traditional heritage with modern elegance.",
    },
  ],
  bestseller: [
    {
      id: 4,
      title: "PEARL EARRINGS",
      category: "Jewelry",
      image: proPearlEarring,
      price: "15.00",
      hasFrom: false,
      originalPrice: "20.00",
      rating: "5.0",
      discount: "25%",
      description:
        "Geometric filigree stud earrings accented with brilliant-cut diamonds and warm golden polish for understated elegance.",
    },
    {
      id: 2,
      title: "FLOWER NOSE PIN",
      category: "Jewelry",
      image: proFlowerNosePin,
      price: "12.00",
      hasFrom: false,
      originalPrice: null,
      rating: "4.33",
      discount: null,
      description:
        "Delicately sculpted floral swirl nose pin in 18K solid yellow gold, combining traditional heritage with modern elegance.",
    },
    {
      id: 1,
      title: "IAMOND RASHMI RING",
      category: "Jewelry",
      image: proRashmiRing,
      price: "12.00",
      hasFrom: true,
      originalPrice: null,
      rating: "5.0",
      discount: null,
      description:
        "Exquisite diamond crafted rashmi ring with intertwining gold bands, offering timeless grace for every special celebration.",
    },
    {
      id: 3,
      title: "ROSE GOLD RINGS",
      category: "Jewelry",
      image: proRoseGoldRing,
      price: "22.00",
      hasFrom: true,
      originalPrice: "40.00",
      rating: "5.0",
      discount: "45%",
      description:
        "Stunning entwined pave diamond band sculpted in lustrous rose and white gold, crafted for radiant everyday luxury.",
    },
  ],
};

export default mockNewArrivals;
