import React from 'react';
import './index.less';

const hideLoading = () => {
  document.querySelector('#loading').style.display = 'none';
};

export default function () {
  // 可以根据实际场景处理 loading
  // 也可以在 pages/document.ejs 中调整 #loading 位置，放在 #root 里面，以使 render 后 loading 自动消失
  hideLoading();

  return (
    <div className="main">
      <img className="logo" src="//si1.go2yd.com/get-image/0Z8vMt5u4kS" alt="" />
      <h1 className="title">app-template-h5</h1>
      <p className="desp">基于 React 的 H5 模板，可进入 layouts 及 pages 目录自由发挥</p>
    </div>
  );
}
