import { Loading } from "antd-mobile";

const LoadingIcon = () => {
  return (
    <>
      <div
        style={{
          margin: "0 auto",
          textAlign: "center",
          fontSize: 16,
          height: "100%",
        }}
      >
        <Loading />
      </div>
    </>
  );
};
export default LoadingIcon;
