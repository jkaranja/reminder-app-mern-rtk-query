import React from "react";

// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  EffectFlip,
  EffectCards,
  EffectCreative,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "swiper/css/a11y";

import "swiper/css/effect-creative";
import "swiper/css/effect-cube";
import "swiper/css/effect-flip";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";

import { Box } from "@mui/material";

const SwiperCarousel = () => {
  return (
    <Box minHeight={200}>
      <Swiper
        // install Swiper modules
        modules={[
          Navigation,
          Autoplay,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
          EffectCube,
          EffectCoverflow,
          EffectFlip,
          EffectCards,
          EffectCreative,
        ]}
        // spaceBetween={50}
        slidesPerView={1}
        loop
        speed={500}
        effect={"fade"}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        style={{ height: 400 }}
      >
        <SwiperSlide className="swiper-slide">
          <img width="80%" src="why-us.svg" alt="why us" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img width="80%" src="hero.jpg" alt="why us" />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <img width="80%" src="hero2.jpg" alt="why us" />
        </SwiperSlide>
      </Swiper>
      {/* <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        onSwiper={(swiper) => (window.swiper = swiper)}
        slidesPerView={3}
        spaceBetween={50}
        navigation
        loop
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </Swiper> */}
    </Box>
  );
};

export default SwiperCarousel;
