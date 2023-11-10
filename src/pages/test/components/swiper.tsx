import { Swiper, SwiperSlide } from "swiper/react";

import "@/pages/css/swiper.scss";
import "swiper/css";
import { chinemaDetailImf, detailsImf } from "@/pages/types/movice";
import { forwardRef } from "react";

interface cinemaSwiperProps {
  items: Array<detailsImf>;
  change: (e: any) => void;
}

function cinemaSwiper(props: cinemaSwiperProps, ref: any) {
  let { items, change } = props;

  function onSlideChange(e: any) {
    change(e.activeIndex);
  }

  return (
    <Swiper
      ref={ref}
      centeredSlides={true}
      spaceBetween={16}
      slidesPerView={4}
      onSlideChange={(e: any) => onSlideChange(e)}
    >
      {items.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="cinema-swiper">
              <img src={item.poster} alt="" />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default forwardRef(cinemaSwiper);
