import { useRef, useState } from "react";
import KButton from "@/components/KButton/KButton";
import UserAddOutlined from "@ant-design/icons/UserAddOutlined";

export default function ButtonTest() {
  const [shape, setShape] = useState<"circle" | "default">("default");
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <button
        onClick={() => {
          setShape(shape === "default" ? "circle" : "default");
        }}
      >
        點擊我更改樣式
      </button>
      <button
        onClick={() => {
          setDisabled(true);
        }}
      >
        點擊我禁用按鈕
      </button>
      <button
        onClick={() => {
          console.log(ref.current);
        }}
      >
        獲取Button節點
      </button>
      <button
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }}
      >
        點擊我試著加載數據
      </button>
      <div style={{ marginLeft: 20 }}>
        <h3>常規按鈕</h3>
        <KButton>我是按鈕</KButton> &nbsp;&nbsp;
        <KButton size="large">我是按鈕</KButton> &nbsp;&nbsp;
        <KButton size="small">我是按鈕</KButton> &nbsp;&nbsp;
        <h3>危險按鈕</h3>
        <KButton danger>我是按鈕</KButton> &nbsp;&nbsp;
        <KButton size="large" danger>
          我是按鈕
        </KButton>
        &nbsp;&nbsp;
        <KButton size="small" danger>
          我是按鈕
        </KButton>
        &nbsp;&nbsp;
        <h3>按鈕類型</h3>
        <KButton type="default">邊框按鈕</KButton> &nbsp;&nbsp;
        <KButton type="default" danger>
          邊框危險按鈕
        </KButton>{" "}
        &nbsp;&nbsp;
        <KButton type="tertiary">文字按鈕</KButton>
        <KButton type="tertiary" danger>
          文字危險按鈕
        </KButton>
        &nbsp;&nbsp;
        <h3>圖標按鈕</h3>
        <KButton icon={<UserAddOutlined />}>圖標按鈕</KButton> &nbsp;&nbsp;
        <KButton icon={<UserAddOutlined />} size="large"></KButton>&nbsp;&nbsp;
        <KButton icon={<UserAddOutlined />}></KButton>&nbsp;&nbsp;
        <KButton icon={<UserAddOutlined />} size="small"></KButton>&nbsp;&nbsp;
        <KButton
          icon={<UserAddOutlined />}
          size="large"
          type="primary"
          danger
        ></KButton>
        &nbsp;&nbsp;
        <KButton icon={<UserAddOutlined />} type="primary" danger></KButton>
        &nbsp;&nbsp;
        <KButton
          icon={<UserAddOutlined />}
          size="small"
          type="primary"
          danger
        ></KButton>
        &nbsp;&nbsp;
        <KButton
          icon={<UserAddOutlined />}
          size="large"
          type="default"
          shape="circle"
        ></KButton>
        &nbsp;&nbsp;
        <KButton
          icon={<UserAddOutlined />}
          type="default"
          shape="circle"
        ></KButton>
        &nbsp;&nbsp;
        <KButton
          icon={<UserAddOutlined />}
          size="small"
          type="default"
          shape="circle"
        ></KButton>
        &nbsp;&nbsp;
        <KButton
          icon={<UserAddOutlined />}
          size="large"
          type="default"
          shape="circle"
          danger
        ></KButton>
        &nbsp;&nbsp;
        <KButton
          icon={<UserAddOutlined />}
          type="default"
          shape="circle"
          danger
        ></KButton>
        &nbsp;&nbsp;
        <KButton
          icon={<UserAddOutlined />}
          size="small"
          type="default"
          shape="circle"
          danger
        ></KButton>
        &nbsp;&nbsp;
        <KButton icon={<UserAddOutlined />} size="large" type="tertiary">
          我是按鈕
        </KButton>
        &nbsp;&nbsp;
        <KButton icon={<UserAddOutlined />} type="tertiary" danger>
          我是按鈕
        </KButton>
        &nbsp;&nbsp;
        <h3>禁用</h3>
        <KButton icon={<UserAddOutlined />} disabled>
          圖標按鈕
        </KButton>
        &nbsp;&nbsp;
        <KButton icon={<UserAddOutlined />} type="default" disabled>
          禁用按鈕
        </KButton>
        &nbsp;&nbsp;
        <KButton icon={<UserAddOutlined />} size="large" disabled></KButton>
        &nbsp;&nbsp;
        <KButton
          icon={<UserAddOutlined />}
          size="large"
          type="tertiary"
          disabled
        ></KButton>
        &nbsp;&nbsp;
      </div>
    </>
  );
}
