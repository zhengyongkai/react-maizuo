import Styles from '@/assets/css/cinemaItem.module.scss';
import { tudeStateImf } from '@/types/location';
import { chinemaDetailImf } from '@/types/movice';
import { getBetweenDistance } from '@/utils/location';
import { formatPrice } from '@/utils/price';
import { memo } from 'react';
import { useSelector } from 'react-redux';

interface cinemaItemProps {
  item: chinemaDetailImf;
  onClick: () => void;
}

function cinemaItem(props: cinemaItemProps) {
  const { item, onClick } = props;

  const locationAttr = useSelector(
    (state: tudeStateImf) => state.location.tude
  );

  function getDistance(longitude: number, latitude: number) {
    return (
      getBetweenDistance(
        locationAttr.longitude,
        locationAttr.latitude,
        longitude,
        latitude
      ).toFixed(1) + 'km'
    );
  }

  return (
    <div className={Styles['cinemas-item']} onClick={onClick}>
      <div className={Styles['cinemas-top']}>
        <div>{item.name}</div>
        <div>
          <span>{formatPrice(item.lowPrice)}</span> <span>起</span>{' '}
        </div>
      </div>
      <div className={Styles['cinemas-bottom']}>
        <div className="text-ellipsis">{item.address}</div>
        <div>{getDistance(item.longitude, item.latitude)}</div>
      </div>
    </div>
  );
}

export default memo(cinemaItem);
