import React, { Component } from 'react';
import { Layout } from 'antd';
import { LayoutProps } from '@/config/app.d';
import GlobalHeader from '@/components/GlobalHeaderWithMenu';
import GlobalFooter from '@/components/GlobalFooter';
import appConfig from '@/config/app.config';
import getCurrentRoute from '@/utils/get_current_route';

const defaultSelectedKeys = getCurrentRoute(appConfig.appId).splited;

import './BasicLayout.less';

const { Content } = Layout;

interface BasicLayoutProps extends LayoutProps {}

class BasicLayout extends Component<BasicLayoutProps> {
  state = {
    collapsed: false,
  };

  toggleSider = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className="basic-layout">
        <GlobalHeader
          defaultSelectedKeys={defaultSelectedKeys}
          theme={this.props.theme}
          collapsed={this.state.collapsed}
          toggleSider={this.toggleSider}
        />
        <Content className="basic-layout-content">{this.props.children}</Content>
        <GlobalFooter />
      </Layout>
    );
  }
}

export default BasicLayout;
