import React, { memo, useEffect } from 'react';
import hljs from 'highlight.js';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';
import { clipboard, ipcRenderer } from 'electron';
import { Converter } from 'showdown';
import { debounce } from 'lodash';
import { Radio, Button, Modal } from 'antd';
import {
  PlusSquareOutlined,
  FormatPainterOutlined,
  CopyOutlined
} from '@ant-design/icons';
// TODO: 使用七牛云 API 实现头图上传
// import * as qiniu from 'qiniu-js';

import { IState } from '../../types';
import { RadioChangeEvent } from 'antd/lib/radio';

import './index.scss';

enum CLOUD_TYPE {
  QINIU = 'qiniu',
  OTHERS = 'others'
}

const Home: React.FC = () => {
  const { mdInputValue, urlInputVisible, customStyleVisible } = useSelector(
    (state: IState) => state.home
  );
  const dispatch = useDispatch();

  // 处理 Markdown 输入
  const handleMdInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(actions.changeMdInputValue(event.target.value));
  };

  // 切换 自定义样式 状态
  const changeCustomStyleVisible = () => {
    dispatch(actions.changeCustomStyleVisible());
  };

  // 点击 自定义样式弹窗 确定
  const handleCustomStyleConfirm = () => {
    // TODO: 添加自定义样式处理
    dispatch(actions.changeCustomStyleVisible());
  };

  // 点击 自定义样式弹窗 取消
  const handleCustomStyleCancel = () => {
    dispatch(actions.changeCustomStyleVisible());
  };

  useEffect(() => {}, []);

  return (
    <section className="home">
      <header className="home-header">
        <input className="home-header-input" placeholder="请输入文章标题..." />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Radio.Group defaultValue={CLOUD_TYPE.QINIU} size="large">
            <Radio.Button value={CLOUD_TYPE.QINIU}>七牛云</Radio.Button>
            <Radio.Button value={CLOUD_TYPE.OTHERS}>其他云</Radio.Button>
          </Radio.Group>
          <Button
            className="home-header-button"
            type="default"
            size="large"
            icon={<PlusSquareOutlined />}
          >
            上传头图
          </Button>
          <Button
            className="home-header-button"
            type="primary"
            size="large"
            icon={<FormatPainterOutlined />}
            onClick={changeCustomStyleVisible}
          >
            自定义样式
          </Button>
          <Button
            className="home-header-button"
            type="primary"
            size="large"
            icon={<CopyOutlined />}
            disabled={!Boolean(mdInputValue)}
          >
            复制文本
          </Button>
          <input
            className="home-header-url"
            hidden={!urlInputVisible}
            placeholder="功能暂未上线，敬请期待..."
          />
        </div>
      </header>
      <main className="home-content">
        <textarea
          className="home-content-input"
          placeholder="请输入文章内容或拖拽文件至此区域...（支持 Markdown / 富文本）"
          value={mdInputValue}
          onChange={handleMdInputChange}
        />
        <div className="home-content-content" />
      </main>
      <Modal
        title="自定义样式"
        visible={customStyleVisible}
        onOk={handleCustomStyleConfirm}
        onCancel={handleCustomStyleCancel}
      >
        <textarea />
      </Modal>
    </section>
  );
};

export default memo(Home);
