import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../store';
import CodeTheme from '../../template/code';
import ContentTheme from '../../template/base';

import { Button, Modal, Select } from 'antd';
import {
  PlusSquareOutlined,
  FormatPainterOutlined,
  CopyOutlined
} from '@ant-design/icons';

import { IState } from '../../../../types';

import './index.scss';

const { Option } = Select;

const Header: React.FC = () => {
  const [customCodeTheme, setCustomCodeTheme] = useState<string>('');
  const [customContentTheme, setCustomContentTheme] = useState<string>('');

  const {
    mdInputValue,
    customStyleVisible,
    codeTheme,
    contentTheme
  } = useSelector((state: IState) => state.home);
  const dispatch = useDispatch();

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

  // 切换代码样式
  const handleCodeThemeChange = (value: string) => {
    dispatch(actions.changeCodeTheme(value));
  };

  // 切换正文样式
  const handleContentThemeChange = (value: string) => {
    dispatch(actions.changeContentTheme(value));
  };

  return (
    <header className="home-header">
      <Modal
        className="home-modal"
        width="650px"
        title="自定义样式"
        visible={customStyleVisible}
        onOk={handleCustomStyleConfirm}
        onCancel={handleCustomStyleCancel}
      >
        <div className="home-modal-block">
          <label>
            代码主题：
            <Select
              className="home-modal-select"
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
            className="home-modal-input"
            placeholder="输入自定义代码样式...（将会覆盖选中的代码主题）"
            value={customCodeTheme}
          />
        </div>
        <div className="home-modal-block">
          <label>
            文章主题：
            <Select
              className="home-modal-select"
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
            className="home-modal-input"
            placeholder="输入自定义文章样式...（将会覆盖选中的文章主题）"
            value={customContentTheme}
          />
        </div>
      </Modal>
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
  );
};

export default memo(Header);
