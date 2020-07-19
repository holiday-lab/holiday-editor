import React, { useState } from 'react';
import hljs from 'highlight.js';
import { Converter } from 'showdown';
import { clipboard } from 'electron';
import { debounce } from 'lodash';
import { Radio, Button } from 'antd';
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
  const [hasUrlInput, setHasUrlInput] = useState<boolean>(false);
  const [richtext, setRichtext] = useState<string>('');

  const handleCopyClick = () => {
    clipboard.writeText(richtext);
  };

  const handleCloudChange = (e: RadioChangeEvent) => {
    const value = e.target.value;
    if (value === CLOUD_TYPE.OTHERS) {
      setHasUrlInput(true);
    } else {
      setHasUrlInput(false);
    }
  };

  // 防抖
  const handleInput = debounce((value: string) => {
    const content = new Converter({ tables: true });
    const html = content.makeHtml(value);
    setRichtext(html);
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });
  }, 300);

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    handleInput(value);
  };

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
          >
            自定义样式
          </Button>
          <Button
            className="home-header-button"
            type="primary"
            size="large"
            icon={<CopyOutlined />}
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
          placeholder="请输入文章内容...（支持 Markdown / 富文本）"
          onChange={handleMarkdownChange}
        />
        <div
          className="home-content-content"
          dangerouslySetInnerHTML={{ __html: richtext }}
        />
      </main>
    </section>
  );
};

export default Home;
