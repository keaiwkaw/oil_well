import Black from "@/components/black";
import Swiper from "@/components/swiper";

export const routeConfig = [
  { path: "/", element: <Black /> },
  { path: "/mine/:id", element: <Swiper /> },
];
