import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useLanguage } from "../context/LanguageContext";
import Image1 from "./../assets/fa01f162867b2736f8563a59bf8b7e11.jpg";
import Image2 from "./../assets/0f1ac5e815b0068a71377208a86cc110.jpg";
import Image3 from "./../assets/2eef717a16f93fdc9fb4e7cfc487cbd2.jpg";
import Header from "./Header";

export default function lider() {
  const { language } = useLanguage();
  return (
    <>
      <div className="w-full md:w-[57%] relative md:order-2 order-1">
        <Header />
        <img
          src={Image1}
          alt="Static Content"
          className="static-image w-full h-full object-cover md:block hidden"
        />
        <div className="slider md:hidden block pt-[55px]">
          <Swiper
            key={language}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <SwiperSlide>
              <img src={Image1} alt="Slide 1" className="w-full h-auto" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Image2} alt="Slide 2" className="w-full h-auto" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Image3} alt="Slide 3" className="w-full h-auto" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
