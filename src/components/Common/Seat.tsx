import SvgIcon from '@/components/SvgIcon/Index';
import type { seatsInf } from '@/types/seat';
import { memo } from 'react';

interface seatProps {
  data: seatsInf;
  onSelect: (args: seatsInf, event: React.MouseEvent<any, MouseEvent>) => void;
  selecteds: Boolean;
}

function Seat(item: seatProps) {
  const { data, onSelect, selecteds } = item;
  /**
   * @description: 根据不同的状态显示不同的座位效果
   * @return {*}
   */
  function getSeat() {
    if (data.isBroken) {
      return <SvgIcon size={24} name="lock"></SvgIcon>;
    }
    if (data.isOccupied) {
      return <SvgIcon size={24} name="in-seat"></SvgIcon>;
    }
    if (selecteds) {
      return <SvgIcon size={24} name="choose" onClick={(e) => onSelect(data, e)}></SvgIcon>;
    }
    return <SvgIcon size={24} name="seat" onClick={(e) => onSelect(data, e)}></SvgIcon>;
  }
  return getSeat();
}

export default memo(Seat);
