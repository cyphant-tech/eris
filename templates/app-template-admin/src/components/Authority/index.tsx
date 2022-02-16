import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import { ConnectState, Dispatch, UserModelState } from '@/models/connect';

import './index.less';

interface AuthorityProps {
  children?: React.ReactNode;
  user: UserModelState;
  dispatch: Dispatch;
}

interface AuthorityState {
  isAuthing: boolean;
}

const Authority: React.FC<AuthorityProps> = ({ children, user, dispatch }) => {
  useEffect(() => {
   
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default connect(({ user }: ConnectState) => ({
  user,
}))(Authority);
