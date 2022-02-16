import React from 'react';
import { Layout } from 'antd';
import './index.less';

const { Footer } = Layout;

const GlobalFooter: React.FC = () => {
  return <Footer className="global-footer">{new Date().getFullYear()} @ 一点资讯</Footer>;
};

export default GlobalFooter;
