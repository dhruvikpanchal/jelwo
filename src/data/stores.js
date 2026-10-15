// Mock Data for Store Locations

import valsoneImg from "@/assets/images/store-location/Valsone-shop.webp";
import melbourneImg from "@/assets/images/store-location/Melbourne-place-opt.webp";
import ansoltImg from "@/assets/images/store-location/Ansolt-park-opt.webp";

export const mockStores = [
  {
    id: "valsone-shop",
    name: "Valsone shop",
    image: valsoneImg,
    layout: "image-left",
    phone: "+999 3222 000 388",
    email: "store@domain.com",
    address: "27 Eden walk eden centre, Broadway, United States",
    openingHours: "Mon - Fri : 9:00am - 6:00pm",
  },
  {
    id: "melbourne-place",
    name: "Melbourne place",
    image: melbourneImg,
    layout: "image-right",
    phone: "+999 3222 000 388",
    email: "store@domain.com",
    address: "27 Eden walk eden centre, Broadway, United States",
    openingHours: "Mon - Fri : 9:00am - 6:00pm",
  },
  {
    id: "ansolt-park",
    name: "Ansolt park",
    image: ansoltImg,
    layout: "image-left",
    phone: "+999 3222 000 388",
    email: "store@domain.com",
    address: "27 Eden walk eden centre, Broadway, United States",
    openingHours: "Mon - Fri : 9:00am - 6:00pm",
  },
];

export default mockStores;
