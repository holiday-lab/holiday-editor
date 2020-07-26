import React, { memo, useEffect } from 'react';
import Header from './components/Header';
import Content from './components/Content';

// TODO: 使用七牛云 API 实现头图上传
// import * as qiniu from 'qiniu-js';

import './index.scss';

enum CLOUD_TYPE {
  QINIU = 'qiniu',
  OTHERS = 'others'
}

const Home: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <section className="home">
      <Header />
      <Content />
    </section>
  );
};

export default memo(Home);
