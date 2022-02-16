import React from 'react';
import Authority from '@/components/Authority';
import BasicLayout from './BasicLayout';
import SidebarLayout from './SidebarLayout';
import appConfig from '@/config/app.config';

const { layout } = appConfig;

const LayoutComponent: React.FC = props => (
  <Authority>
    {layout.hasSidebar ? (
      <SidebarLayout theme={layout.theme}>{props.children}</SidebarLayout>
    ) : (
      <BasicLayout theme={layout.theme}>{props.children}</BasicLayout>
    )}
  </Authority>
);

export default LayoutComponent;
