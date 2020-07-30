import React, { memo, useState, useEffect } from 'react';
import fs from 'fs';
import generator from '../../extensions';
import { useSelector, useDispatch } from 'react-redux';
import { Converter, extension } from 'showdown';
import { useDebounceFn } from 'ahooks';
import { ipcRenderer } from 'electron';
import { actions } from '../../store';
import CodeTheme from '../../template/code';
import ContentTheme from '../../template/base';
import CustomStyles from '../CustomStyles';
import Header from '../../extensions/header';
import Footer from '../../extensions/footer';
import SubTitle from '../../extensions/subTitle';
import Link from '../../extensions/link';
import Title from '../../extensions/title';

import { IState } from '../../../../types';

import './index.scss';

const Content: React.FC = () => {
  const [richText, setRichText] = useState<string>('');

  const {
    mdInputValue,
    codeTheme,
    contentTheme,
    customCodeTheme,
    customContentTheme
  } = useSelector((state: IState) => state.home);
  const dispatch = useDispatch();

  // 处理 Markdown 输入
  const handleMdInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;
    dispatch(actions.changeMdInputValue(inputValue));
  };

  // 转译 Markdown 防抖
  const { run: handleMdInputValueParse } = useDebounceFn(
    (value: string) => {
      const converter = new Converter({
        extensions: ['header', 'footer', 'subTitle', 'link', 'title'],
        strikethrough: true,
        tables: true,
        tasklists: true
      });
      const richText = converter.makeHtml(value);
      // 样式组合 将自定义样式和主题同时注入 自定义样式覆盖主题
      const result = generator(
        CodeTheme[codeTheme] + customCodeTheme,
        ContentTheme[contentTheme] + customContentTheme,
        richText
      );
      setRichText(result);
    },
    { wait: 500 }
  );

  // FIXME: 禁用 Tab 切换
  const handleTabPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 9) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    handleMdInputValueParse(mdInputValue);

    extension('header', Header[contentTheme]);
    extension('footer', Footer[contentTheme]);
    extension('subTitle', SubTitle[contentTheme]);
    extension('link', Link[contentTheme]);
    extension('title', Title[contentTheme]);

    const element = document.querySelector('#drag') as HTMLElement;
    element.addEventListener('drop', (event) => {
      event.preventDefault();
      const files = (event.dataTransfer as DataTransfer).files;
      if (files && files.length > 0) {
        const path = files[0].path;
        if (/.md$/g.test(path)) {
          const fileContent = fs.readFileSync(path).toString();
          // 触发 Markdown 输入
          dispatch(actions.changeMdInputValue(fileContent));
          const options = {
            title: '导入成功',
            body: 'Markdown 转换成功，快点击复制去编辑器中粘贴吧~'
          };
          ipcRenderer.send('ondragstart', options);
        } else {
          const options = {
            title: '导入失败',
            body: '您导入的不是 Markdown 文件欧~'
          };
          ipcRenderer.send('ondragstart', options);
        }
      }
    });
    return () => {
      element.removeEventListener('drop', () => {});
    };
  }, [
    mdInputValue,
    codeTheme,
    contentTheme,
    customCodeTheme,
    customContentTheme,
    handleMdInputValueParse,
    dispatch
  ]);

  return (
    <main className="home-content">
      <div className="home-content-left">
        <textarea
          id="drag"
          className="home-content-input"
          placeholder="请输入文章内容或拖拽文件至此区域...（支持 Markdown / 富文本）"
          value={mdInputValue}
          onChange={handleMdInputChange}
          onKeyDown={handleTabPress}
        />
        <CustomStyles />
      </div>
      <div
        className="home-content-right"
        dangerouslySetInnerHTML={{ __html: richText }}
      />
    </main>
  );
};

export default memo(Content);
