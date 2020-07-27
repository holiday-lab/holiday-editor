import React, { memo, useState, useEffect } from 'react';
import generator from '../../extensions';
import { useSelector, useDispatch } from 'react-redux';
import { Converter } from 'showdown';
import { useDebounceFn } from 'ahooks';
import { actions } from '../../store';
import CodeTheme from '../../template/code';
import ContentTheme from '../../template/base';

import { IState } from '../../../../types';

import './index.scss';

const Content: React.FC = () => {
  const [richText, setRichText] = useState<string>('');

  const { mdInputValue, codeTheme, contentTheme } = useSelector(
    (state: IState) => state.home
  );
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
      const converter = new Converter();
      const richText = converter.makeHtml(value);
      const result = generator(
        CodeTheme[codeTheme],
        ContentTheme[contentTheme],
        richText
      );
      setRichText(result);
    },
    { wait: 500 }
  );

  useEffect(() => {
    handleMdInputValueParse(mdInputValue);
  }, [mdInputValue, codeTheme, contentTheme]);

  return (
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
  );
};

export default memo(Content);
