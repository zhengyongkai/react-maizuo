/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: svg Conponents
 */
import { useMemo } from "react";

type SvgIconProps = {
  prefix?: string;
  name: string;
  color?: string;
  size?: number | string;
  onClick?: (e: React.MouseEvent<any, MouseEvent>) => void;
};

const SvgIcon = (props: SvgIconProps) => {
  const { prefix = "icon", name, color, size = 16, onClick } = props;
  const symbolId = useMemo(() => `#${prefix}-${name}`, [prefix, name]);
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      fill={color}
      onClick={(e) => (onClick ? onClick(e) : {})}
    >
      <use href={symbolId} fill={color} />
    </svg>
  );
};
export default SvgIcon;
