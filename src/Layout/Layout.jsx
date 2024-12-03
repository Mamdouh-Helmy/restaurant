import { Outlet } from "react-router-dom";
import "swiper/swiper-bundle.css";
import Slider from "../components/Slider";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="bg-[#f4f5f5] flex-grow hide-scrollbar md:overflow-y-auto order-1 order-2">
        <Outlet />
      </div>
      <Slider/>
    </div>
  );
};
export default Layout;