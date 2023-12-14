/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
// import { Loading } from "antd-mobile";
import "@/pages/css/loading.scss";
import { ReactNode } from "react";

interface propsImf {
  children: ReactNode;
  loading: boolean;
}

const loadingWrap = (props: propsImf) => {
  let { children, loading } = props;
  return (
    <>
      {loading ? (
        <div>
          <div className="parentBox">
            <div>
              <div className="contantBox"></div>
              <div>加载中...</div>
            </div>
          </div>
        </div>
      ) : null}
      <div className={[loading ? "loading" : ""].join(",")}>{children}</div>
    </>
  );
};
export default loadingWrap;
