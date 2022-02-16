import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Card } from 'antd';

export default () => {
  return (
    <>
      <PageHeader current="使用文档" />
      <div className="main-content-with-page-header">
        <Card bordered={false} style={{ minHeight: 280 }}>
          使用文档
        </Card>
      </div>
    </>
  );
};
