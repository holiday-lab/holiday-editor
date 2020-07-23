import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import { clipboard, ipcRenderer } from 'electron';
import { Converter } from 'showdown';
import { debounce } from 'lodash';
import { Radio, Button, Modal } from 'antd';
import {
  PlusSquareOutlined,
  FormatPainterOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { RadioChangeEvent } from 'antd/lib/radio';
// TODO: 使用七牛云 API 实现头图上传
// import * as qiniu from 'qiniu-js';

import './index.scss';

enum CLOUD_TYPE {
  QINIU = 'qiniu',
  OTHERS = 'others'
}

const Home: React.FC = () => {
  const [contentValue, setContentValue] = useState<string>('');
  const [hasUrlInput, setHasUrlInput] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // 切换图床
  const handleCloudChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    if (value === CLOUD_TYPE.OTHERS) {
      setHasUrlInput(true);
    } else {
      setHasUrlInput(false);
    }
  };

  // 自定义样式
  const handleStyleClick = () => {
    setModalVisible(!modalVisible);
  };

  // 复制富文本
  const handleCopyClick = () => {
    const wrapper = document.querySelector(
      '.home-content-content'
    ) as HTMLElement;
    if (wrapper.innerHTML) {
      ipcRenderer.send('copy-success', {
        title: '复制成功',
        body: '赶紧到其他编辑器中粘贴吧~'
      });
    }
    clipboard.writeText(wrapper.innerHTML);
  };

  // 防抖
  const handleInput = debounce((value: string) => {
    const content = new Converter({ tables: true });
    const html = content.makeHtml(value);
    const wrapper = document.querySelector(
      '.home-content-content'
    ) as HTMLElement;
    wrapper.innerHTML = html;
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });
  }, 300);

  // 处理 Markdown 高亮代码
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContentValue(value);
    handleInput(value);
  };

  // 保存自定义样式
  const handleStyleSave = () => {
    setModalVisible(!modalVisible);
  };

  // 关闭自定义样式弹窗
  const handleStyleCancel = () => {
    setModalVisible(!modalVisible);
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
          <Radio.Group
            defaultValue={CLOUD_TYPE.QINIU}
            size="large"
            onChange={handleCloudChange}
          >
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
            onClick={handleStyleClick}
          >
            自定义样式
          </Button>
          <Button
            className="home-header-button"
            type="primary"
            size="large"
            icon={<CopyOutlined />}
            disabled={!Boolean(contentValue)}
            onClick={handleCopyClick}
          >
            复制文本
          </Button>
          <input
            className="home-header-url"
            hidden={!hasUrlInput}
            placeholder="功能暂未上线，敬请期待..."
          />
        </div>
      </header>
      <main className="home-content">
        <textarea
          className="home-content-input"
          placeholder="请输入文章内容或拖拽文件至此区域...（支持 Markdown / 富文本）"
          value={contentValue}
          onChange={handleMarkdownChange}
        />
        <div className="home-content-content" />
      </main>
      <Modal
        title="自定义样式"
        visible={modalVisible}
        onOk={handleStyleSave}
        onCancel={handleStyleCancel}
      >
        <textarea />
      </Modal>
    </section>
  );
};

export default Home;
