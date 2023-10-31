import { forwardRef, ReactNode, useContext } from "react";
import classNames from "classnames";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";

import { ConfigContext } from "@/components/config-provider/context";

import { getDefaultPrefix } from "@/components/config-provider/context";

import "@/assets/css/button.scss";

interface InternalButtonProps {
  type?: "primary" | "default" | "tertiary";
  size?: "large" | "small" | "middle";
  loading?: boolean;
  shape?: "default" | "circle";
  disabled?: boolean;
  danger?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const prefixCls = getDefaultPrefix("btn");

const InternalButton: React.ForwardRefRenderFunction<
  HTMLButtonElement | null,
  InternalButtonProps
> = (props: InternalButtonProps, ref) => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    const { onClick } = props;
    if (disabled || loading) {
      e.preventDefault();
      return false;
    }
    (
      onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    )?.(e);
  };

  const { theme } = useContext(ConfigContext);

  const sizeClassNameMap = { large: "lg", small: "sm", middle: undefined };

  const {
    size = "middle",
    loading = false,
    shape = "default",
    disabled = false,
    children,
    type = "primary",
    danger = false,
    icon,
  } = props;

  const sizeCls = size ? sizeClassNameMap[size] || "" : "";

  const className = classNames(prefixCls, {
    [`${prefixCls}-danger`]: danger,
    [`${prefixCls}-shape-${shape}`]: !children && icon ? "circle" : undefined,
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-only-type`]: !children && icon,
    [`${prefixCls}-icon`]: children && icon,
    [`${prefixCls}-icon-only`]: !children && children !== 0 && !!icon,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-disabled`]: disabled,
  });

  const iconNode = function () {
    if (icon && loading) {
      return (
        <>
          <LoadingOutlined></LoadingOutlined>
        </>
      );
    } else if (loading) {
      return (
        <>
          <LoadingOutlined></LoadingOutlined>
        </>
      );
    } else if (icon) {
      return <>{icon}</>;
    }
    return <></>;
  };

  return (
    <>
      <button className={className} ref={ref} onClick={handleClick}>
        {iconNode()}
        <span>{children}</span>
      </button>
    </>
  );
};

const KButton = forwardRef(InternalButton);

export default KButton;
