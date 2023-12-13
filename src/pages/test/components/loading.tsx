// import { Loading } from "antd-mobile";
import LoadingIcons from '@/assets/img/loading.gif';
import '@/pages/css/loading.scss';

const LoadingIcon = () => {
  return (
    <>
      <div>
        <div className="parentBox">
          <div>
            <div className="contantBox"></div>
            <div>加载中...</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoadingIcon;
