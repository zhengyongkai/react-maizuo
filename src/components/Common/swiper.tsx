import { Swiper, SwiperSlide } from "swiper/react";

import Styles from "@/assets/css/swiper.module.scss";
import "swiper/css";
import type { detailsInf } from "@/types/movice";
import { forwardRef } from "react";

interface cinemaSwiperProps {
  items: Array<detailsInf>;
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
            <div className={Styles["cinema-swiper"]}>
              <img src={item.poster} alt="" />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default forwardRef(cinemaSwiper);
