import SvgIcon from "@/components/SvgIcon";
import { seatsInf, selectSeatsInf } from "@/pages/types/seat";
import { memo } from "react";

interface seatProps {
  data: seatsInf;
  onSelect: (args: seatsInf) => void;
  selecteds: Boolean;
}

const BROKEN_SEAT = "BROKEN_SEAT";
const OCCUPIED_SEAT = "OCCUPIED_SEAT";
const SELECTABLE_SEAT = "SELECTABLE_SEAT";
const SELECTED_SEAT = "SELECTED_SEAT";

const seat = (item: seatProps) => {
  const { data, onSelect, selecteds } = item;
  // console.log("goods", selecteds);

  function getSeat() {
    if (data.isBroken) {
      return <SvgIcon size={24} name="lock"></SvgIcon>;
    }
    if (data.isOccupied) {
      return <SvgIcon size={24} name="in-seat"></SvgIcon>;
    }
    if (selecteds) {
      return (
        <SvgIcon
          size={24}
          name="choose"
          onClick={() => onSelect(data)}
        ></SvgIcon>
      );
    }
    return (
      <SvgIcon size={24} name="seat" onClick={() => onSelect(data)}></SvgIcon>
    );
  }
  return getSeat();
};

export default memo(seat);
