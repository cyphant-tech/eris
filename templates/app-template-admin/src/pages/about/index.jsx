import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Card } from 'antd';

export default () => {
  return (
    <>
      <PageHeader current="关于" />
      <div className="main-content-with-page-header">
        <Card bordered={false} style={{ minHeight: 280 }}>
          关于
        </Card>
      </div>
    </>
  );
};
