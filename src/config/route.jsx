import Effect from "@/components/effect";
import Swiper from "@/components/swiper";
import Sample from "@/components/sample";
import { Navigate } from "react-router-dom";

export const routeConfig = [
  { path: "/", element: <Navigate to="/sample" /> },
  { path: "/sample", element: <Sample /> },
  { path: "/effect", element: <Effect /> },
  { path: "/mine/:id/:taskid", element: <Swiper /> },
];
