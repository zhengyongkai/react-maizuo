import { Swiper, SwiperSlide } from 'swiper/react';

import Styles from '@/assets/css/swiper.module.scss';
import 'swiper/css';
import type { detailsInf } from '@/types/movice';
import { forwardRef } from 'react';

interface cinemaSwiperProps {
  items: Array<detailsInf>;
  change: (e: any) => void;
}

function CinemaSwiper(props: cinemaSwiperProps, ref: any) {
  let { items, change } = props;

  return (
    <Swiper
      ref={ref}
      centeredSlides={true}
      spaceBetween={16}
      slidesPerView={4}
      onSlideChange={(e: any) => {
        change(e.activeIndex);
      }}>
      {items.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className={Styles['cinema-swiper']}>
              <img src={item.poster} alt="" />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default forwardRef(CinemaSwiper);
