import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { LayoutProps, MainMenus, MainMenu } from '@/config/app.d';
import appConfig from '@/config/app.config';

import './index.less';

const { Sider } = Layout;
const MenuItem = Menu.Item;
const { SubMenu } = Menu;

interface GlobalSiderProps extends LayoutProps {
  collapsed: boolean;
  defaultSelectedKeys: string[];
}

const GenerateMenuItems = (menus: MainMenus) =>
  menus.map((menu: MainMenu) => {
    if (menu.subMenu && menu.subMenu.length > 0) {
      return (
        <SubMenu
          key={menu.key}
          title={
            <span>
              <Icon type={menu.icon} />
              <span>{menu.name}</span>
            </span>
          }
        >
          {GenerateMenuItems(menu.subMenu)}
        </SubMenu>
      );
    } else {
      return (
        <MenuItem key={menu.key}>
          <Link to={menu.key}>
            <Icon type={menu.icon} />
            <span>{menu.name}</span>
          </Link>
        </MenuItem>
      );
    }
  });

const GlobalSider: React.FC<GlobalSiderProps> = props => {
  return (
    <Sider
      theme={props.theme}
      width="260"
      trigger={null}
      collapsible={true}
      collapsed={props.collapsed}
    >
      <div className="logo">
        {/* <a href="/">
          <img src="http://si1.go2yd.com/get-image/0Z8vMt5u4kS" alt="" />
          <h1>Eris Simple App</h1>
        </a> */}
        <Link to="/">
          {appConfig.logo ? <img src={appConfig.logo.toString()} alt="" /> : null}
          <h1>{appConfig.appName}</h1>
        </Link>
      </div>
      <Menu theme={props.theme} mode="inline" defaultSelectedKeys={props.defaultSelectedKeys}>
        {GenerateMenuItems(appConfig.menus)}
      </Menu>
    </Sider>
  );
};

export default GlobalSider;
