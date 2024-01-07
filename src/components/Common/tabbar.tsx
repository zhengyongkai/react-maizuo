import { PureComponent, ReactNode } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Style from '@/assets/css/tabbar.module.scss';

import { withRouter } from '@/utils/hoc';
import SvgIcon from '@/components/SvgIcon';

interface propsType {
  navigate: any;
  location: any;
}

interface stateType {
  path: string;
  tabbarList: Array<{
    path: Array<string>;
    name: string;
    svg: string;
  }>;
}

class tabbar extends PureComponent<propsType, stateType> {
  constructor(props: propsType) {
    super(props);

    this.state = {
      path: this.props.location.pathname,
      tabbarList: [
        {
          path: ['/name/home/nowPlaying', '/name/home/comingSoon'],
          name: '主页',
          svg: 'cinema',
        },
        {
          path: ['/name/news'],
          name: '影院',
          svg: 'new',
        },
        {
          path: ['/name/my'],
          name: '我的',
          svg: 'my',
        },
      ],
    };
  }

  componentDidUpdate(prevProps: Readonly<propsType>): void {
    if (prevProps.location.pathname !== this.props.location.pathname) {
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
          className={item.path.includes(this.state.path) ? 'active' : ''}
          onClick={this.routerChange.bind(this, item.path[0])}
          key={index}
        >
          <div>
            <SvgIcon
              size={24}
              color={item.path.includes(this.state.path) ? '#ff8751' : ''}
              name={item.svg}
            ></SvgIcon>
          </div>
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
