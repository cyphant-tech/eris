import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';

import './index.less';

const { Content } = Layout;

interface Props {
  home?: string;
  current?: string;
  children?: any;
}

class PageHeader extends Component<Props, {}> {
  static defaultProps = {
    home: '首页',
    current: '当前页面标题未指定',
  };

  render() {
    const props = this.props;
    return (
      <div className="page-header">
        <Content>
          <div className="layout-container">
            <Breadcrumb>
              <Breadcrumb.Item>{props.home}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.current}</Breadcrumb.Item>
            </Breadcrumb>

            <div className="page-header-title">
              <h2>{props.current}</h2>
            </div>

            {props.children}
          </div>
        </Content>
      </div>
    );
  }
}

export default PageHeader;
