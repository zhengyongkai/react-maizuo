import Components from "@/components";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "@/store/user/user";
import TabBarBaseDemo from "@/components/Layout/TabBar";
import TClass from "@/components/Text/TClass";

let { TButton } = Components;

function HomePage() {
  const { value } = useSelector((store: any) => store.counter);
  const dispatch = useDispatch();
  return (
    <>
      <TButton titles="good"></TButton>
      <TClass title={1}></TClass>
      <p
        onClick={() => {
          // console.log("ss");
          dispatch(increment({ value: 1 }));
        }}
      >
        {value}
      </p>
      <TabBarBaseDemo></TabBarBaseDemo>
    </>
  );
}

export default HomePage;
