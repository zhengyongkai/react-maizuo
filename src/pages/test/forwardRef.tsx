import { forwardRef, ReactComponentElement, useRef, useState } from "react";

interface childPorps {
  data: string;
}

const Children = forwardRef((props: childPorps, ref: any) => {
  return (
    <>
      <div>
        <button
          onClick={() => {
            console.log(ref);
          }}
        >
          獲取Ref
        </button>
        <input ref={ref}></input>
      </div>
    </>
  );
});

export default function Parent() {
  const [data, setData] = useState("data");
  const ref = useRef(null);

  return (
    <>
      <button>點擊我</button>
      <Children data={data} ref={ref}></Children>
    </>
  );
}
