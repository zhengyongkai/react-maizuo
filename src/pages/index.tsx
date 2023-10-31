import TabBarBaseDemo from "@/components/Layout/TabBar";
import Navbar from "@/components/Layout/Navbar";
import { Component, useState } from "react";
import ConfigProvider from "@/components/config-provider/index";
import KButtonPage from "@/pages/main/Button";

function HomePage() {
  const [theme, setTheme] = useState<"Light" | "dark">("Light");

  return (
    <>
      <button onClick={() => setTheme(theme === "Light" ? "dark" : "Light")}>
        點擊我切換全局樣式
      </button>
      <br />
      <ConfigProvider theme={theme}>
        <KButtonPage></KButtonPage>
      </ConfigProvider>
    </>
  );
}

export default HomePage;
