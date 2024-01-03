import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getQueryVariable } from "@/utils";
import { queryOrder } from "@/api/order";
import NavTitle from "@/components/Common/navTitle";
import { Button, Result } from "antd-mobile";
import "@/assets/css/orderQuery.scss";

export default function Orderquery() {
  const { search } = useLocation();
  const navigator = useNavigate();
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const query = getQueryVariable(search);

    async function fn() {
      try {
        setLoading(true);
        await queryOrder({
          out_trade_no: query.get("out_trade_no"),
          trade_no: query.get("trade_no"),
        });
        setLoading(false);
        setStatus(true);
      } catch {
        setStatus(false);
      }
    }
    fn();
  }, []);
  return (
    <>
      <NavTitle title="结果查询"></NavTitle>
      <div className="query_result">
        {!loading ? (
          status ? (
            <>
              <div>
                <Result
                  status="success"
                  title="支付成功"
                  description="请前往我的订单页查看"
                />
                <Button onClick={() => navigator("/order")}>返回订单页</Button>
              </div>
            </>
          ) : (
            <>
              <Result
                status="error"
                title="支付失败"
                description="如有疑问，请联系客服"
              />
              <Button onClick={() => navigator("/name/home/nowPlaying")}>
                返回首页
              </Button>
            </>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
