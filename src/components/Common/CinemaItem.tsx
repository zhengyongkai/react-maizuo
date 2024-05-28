// import Styles from '@/assets/css/cinemaItem.module.scss';
import type { tudeStateInf } from '@/types/location';
import type { cinemasInfoInf } from '@/types/cinema';
import { getBetweenDistance } from '@/utils/location';
import { formatPrice } from '@/utils/price';
import { memo } from 'react';
import { useSelector } from 'react-redux';
// import { cssCb } from '@/utils/css';

interface cinemaItemProps {
  item: cinemasInfoInf;
  onClick: () => void;
}

function CinemaItem(props: cinemaItemProps) {
  const { item, onClick } = props;

  const locationAttr = useSelector((state: tudeStateInf) => state.location.tude);

  /**
   * @description: 通过当前经纬度和目标经纬度获取距离
   * @param {number} longitude
   * @param {number} latitude
   * @return {*}
   */
  function getDistance(longitude: number, latitude: number): string {
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
    <div p-15 onClick={onClick}>
      <div flex items-center>
        <div text-15 mb-5 text-black hidden truncate flex-1>
          {item.name}
        </div>
        {item.lowPrice ? (
          <div text-orange-50 w-70 text-right>
            <span text-15>{formatPrice(item.lowPrice)}</span> <span text-10>起</span>{' '}
          </div>
        ) : (
          <div text-orange-50 w-70 text-right>
            价格未知
          </div>
        )}
      </div>
      <div text-13 text-grey-50 flex hidden truncate>
        <div truncate flex-1>
          {item.address}
        </div>
        <div w-70 text-right>
          {getDistance(item.longitude, item.latitude)}
        </div>
      </div>
    </div>
  );
}

export default memo(CinemaItem);
