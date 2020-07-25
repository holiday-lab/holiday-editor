import React, { memo, useState, useEffect } from 'react';
import hljs from 'highlight.js';
import juice from 'juice';
import { table, code, AtomOneDark, AtomOneLight } from './template';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';
import { clipboard, ipcRenderer } from 'electron';
import { Converter } from 'showdown';
import { debounce, throttle } from 'lodash';
import { Button, Modal } from 'antd';
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
  const [richText, setRichText] = useState<string>('');

  const { mdInputValue, customStyleVisible } = useSelector(
    (state: IState) => state.home
  );
  const dispatch = useDispatch();

  // 处理 Markdown 输入
  const handleMdInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;
    dispatch(actions.changeMdInputValue(inputValue));
    handleMdInputValueParse(inputValue);
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

  // 转译 Markdown 防抖
  const handleMdInputValueParse = debounce((value: string) => {
    const converter = new Converter();
    const richText = converter.makeHtml(value);
    const ele = document.createElement('div');
    ele.innerHTML = `<style>${table}${code}${AtomOneDark}</style>` + richText;
    ele.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });
    // TODO: 防止 XSS 攻击
    const result = juice(ele.innerHTML, {
      // 支持 !important
      preserveImportant: true
    });
    setRichText(result);
  }, 1000);

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
        </div>
      </header>
      <main className="home-content">
        <textarea
          className="home-content-input"
          placeholder="请输入文章内容或拖拽文件至此区域...（支持 Markdown / 富文本）"
          value={mdInputValue}
          onChange={handleMdInputChange}
        />
        <div
          className="home-content-content"
          dangerouslySetInnerHTML={{ __html: richText }}
        />
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
