import React from 'react';
import { Card } from 'antd';

import './index.less';

export default function() {
  return (
    <>
      <div className="main-content">
        <Card bordered={false} style={{ minHeight: 380 }}>
          首页
        </Card>
      </div>
    </>
  );
}
