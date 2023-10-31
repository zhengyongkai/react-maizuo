import { forwardRef, ReactNode } from "react";
import classNames from "classnames";
import { SpinLoading } from "antd-mobile";

import "../css/button.scss";

interface InternalButtonProps {
  type?: "danger" | "primary" | "success" | "default";
  size?: "large" | "small" | "middle";
  loading?: Boolean;
  shape?: "default" | "circle";
  disabled?: Boolean;
  children?: ReactNode;
  icon?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const InternalButton = (props: InternalButtonProps, ref: any) => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    const { onClick } = props;
    // FIXME: https://github.com/ant-design/ant-design/issues/30207
    if (disabled || loading) {
      e.preventDefault();
      return false;
    }
    (
      onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    )?.(e);
  };

  const {
    size = "middle",
    loading = false,
    shape = "default",
    disabled = false,
    children,
    type = "default",
    icon,
  } = props;
  const className = classNames(
    "k-button",
    [`k-${type}-button`, `k-${shape}-button`],
    `k-${disabled ? "disabled" : "common"}-button`,
    `k-${loading ? "loading" : "common"}-button`
  );
  const childrens = () => {
    if (loading) {
      return (
        <>
          <SpinLoading style={{ "--size": "16px" }} /> {children}
        </>
      );
    } else {
      return (
        <>
          {icon} {children}
        </>
      );
    }
  };

  return (
    <>
      <button className={className} ref={ref} onClick={handleClick}>
        {childrens()}
      </button>
    </>
  );
};

export default forwardRef(InternalButton);
