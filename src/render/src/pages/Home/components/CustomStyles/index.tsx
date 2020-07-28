import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../store';
import CodeTheme from '../../template/code';
import ContentTheme from '../../template/base';

import { Select } from 'antd';

import { IState } from '../../../../types';

import './index.scss';

const { Option } = Select;

const CustomStyles: React.FC = () => {
  const {
    customStyleVisible,
    codeTheme,
    contentTheme,
    customCodeTheme,
    customContentTheme
  } = useSelector((state: IState) => state.home);
  const dispatch = useDispatch();

  // 切换代码样式
  const handleCodeThemeChange = (value: string) => {
    dispatch(actions.changeCodeTheme(value));
  };

  // 切换正文样式
  const handleContentThemeChange = (value: string) => {
    dispatch(actions.changeContentTheme(value));
  };

  // 自定义代码样式输入
  const handleCustomCodeThemeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(actions.changeCustomCodeTheme(e.target.value));
  };

  // 自定义正文样式输入
  const handleCustomContentThemeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(actions.changeCustomContentTheme(e.target.value));
  };

  return (
    <div className="home-style" hidden={!customStyleVisible}>
      <div className="home-style-block">
        <label style={{ width: '100%' }}>
          代码主题：
          <Select
            className="home-style-select"
            defaultValue={codeTheme}
            onChange={handleCodeThemeChange}
          >
            {Object.keys(CodeTheme).map((key) => (
              <Option key={key} value={key}>
                {key}
              </Option>
            ))}
          </Select>
        </label>
        <textarea
          className="home-style-input"
          placeholder="输入自定义代码样式...（将会覆盖选中的代码主题）"
          value={customCodeTheme}
          onChange={handleCustomCodeThemeChange}
        />
      </div>
      <div className="home-style-block">
        <label style={{ width: '100%' }}>
          文章主题：
          <Select
            className="home-style-select"
            defaultValue={contentTheme}
            onChange={handleContentThemeChange}
          >
            {Object.keys(ContentTheme).map((key) => (
              <Option key={key} value={key}>
                {key}
              </Option>
            ))}
          </Select>
        </label>
        <textarea
          className="home-style-input"
          placeholder="输入自定义文章样式...（将会覆盖选中的文章主题）"
          value={customContentTheme}
          onChange={handleCustomContentThemeChange}
        />
      </div>
    </div>
  );
};

export default CustomStyles;
