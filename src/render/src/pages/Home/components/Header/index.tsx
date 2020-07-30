import React, { memo, useEffect } from 'react';
import { clipboard, ipcRenderer } from 'electron';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../store';

import { Button } from 'antd';
import {
  PlusSquareOutlined,
  FormatPainterOutlined,
  CopyOutlined
} from '@ant-design/icons';

import { IState } from '../../../../types';

import './index.scss';

const Header: React.FC = () => {
  const { mdInputValue } = useSelector((state: IState) => state.home);
  const dispatch = useDispatch();

  // 切换 自定义样式 状态
  const changeCustomStyleVisible = () => {
    dispatch(actions.changeCustomStyleVisible());
  };

  // 点击复制文本
  const handleCopyBtnClick = () => {
    const html = (document.querySelector('.home-content-right') as HTMLElement)
      .innerHTML;
    clipboard.writeHTML(html);
    ipcRenderer.send('copy-success');
  };

  useEffect(() => {
    ipcRenderer.on('open-custom-style', () => {
      dispatch(actions.changeCustomStyleVisible());
    });
  }, [dispatch]);

  return (
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
          onClick={handleCopyBtnClick}
        >
          复制文本
        </Button>
      </div>
    </header>
  );
};

export default memo(Header);
