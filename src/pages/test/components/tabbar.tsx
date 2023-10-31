import { PureComponent, ReactNode } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Style from "../css/tabbar.module.scss";

import { withRouter } from "@/pages/utils/hoc";

interface propsType {
  navigate: any;
  location: any;
}

interface stateType {
  path: string;
  tabbarList: Array<{
    path: string;
    name: string;
  }>;
}

class tabbar extends PureComponent<propsType, stateType> {
  constructor(props: propsType) {
    super(props);

    this.state = {
      path: this.props.location.pathname,
      tabbarList: [
        {
          path: "/name/home/1",
          name: "主页",
        },
        {
          path: "/name/news",
          name: "新闻",
        },
        {
          path: "/name/my",
          name: "我的",
        },
      ],
    };
  }

  componentDidUpdate(prevProps: Readonly<propsType>): void {
    if (
      prevProps.location.pathname !== this.props.location.pathname
    ) {
      this.setState({
        path: this.props.location.pathname,
      });
    }
  }

  routerChange(params: string) {
    this.props.navigate(params);
  }

  getTabbarContext() {
    return this.state.tabbarList.map((item, index) => {
      return (
        <div
          className={item.path === this.state.path ? "active" : ""}
          onClick={this.routerChange.bind(this, item.path)}
          key={index}
        >
          {item.name}
        </div>
      );
    });
  }

  render(): ReactNode {
    return <div className={Style.tabbar}>{this.getTabbarContext()}</div>;
  }
}

export default withRouter(tabbar);
