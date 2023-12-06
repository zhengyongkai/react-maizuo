import { Loading3QuartersOutlined } from "@ant-design/icons";
import { SpinLoading } from "antd-mobile";
import React from "react";

interface LoadingPropsImf {
  children: React.ReactNode;
  loading: boolean;
}

export default function Loading(props: LoadingPropsImf) {
  const { children, loading } = props;
  return (
    <div style={{ position: "relative" }}>
      {loading ? (
        <div
          style={{
            position: "absolute",
            inset: "0",
            background: "#666",
            zIndex: "10",
            opacity: "0.6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SpinLoading color="currentColor" />
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
}
