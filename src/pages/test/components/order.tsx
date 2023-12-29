import useFetch from "@/hook/fetch";
import { getOrderByUser } from "@/pages/api/order";
import NavTitle from "./navTitle";

const orderPage = () => {
  const [orderList, loading] = useFetch(async () => getOrderByUser(), [], []);
  console.log(orderList);
  return (
    <>
      <div>
        <NavTitle back title={"电影订单"}></NavTitle>
      </div>
      <div></div>
    </>
  );
};

export default orderPage;
