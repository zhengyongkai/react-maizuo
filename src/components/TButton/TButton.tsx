import React from "react";
import { Button, ButtonProps } from "antd-mobile";
import PropTypes from "prop-types";

interface TButtonProps extends ButtonProps {
  titles: string;
}

const TButton: React.FC<TButtonProps> = (props) => {
  let { loading } = props;

  return (
    <Button size="large" block loading={loading}>
      强按钮
    </Button>
  );
};

// 必填屬性檢查
TButton.propTypes = {
  titles: PropTypes.string.isRequired,
};
export default TButton;
