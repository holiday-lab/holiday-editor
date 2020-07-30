import constants from './constants';
import { produce } from 'immer';
import { IHomeState } from '../types';

const defaultState: IHomeState = {
  mdInputValue: '',
  customStyleVisible: false,
  codeTheme: 'AtomOneDark',
  contentTheme: 'TaobaoFED',
  customCodeTheme: '',
  customContentTheme: ''
};

export default produce((draftState: IHomeState = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case constants.CHANGE_MD_INPUT_VALUE: {
      const { mdInputValue } = action;
      draftState.mdInputValue = mdInputValue;
      return draftState;
    }

    case constants.CHANGE_CUSTOM_STYLE_VISIBLE: {
      const { customStyleVisible } = draftState;
      draftState.customStyleVisible = !customStyleVisible;
      return draftState;
    }

    case constants.CHANGE_CODE_THEME: {
      const { codeTheme } = action;
      draftState.codeTheme = codeTheme;
      return draftState;
    }

    case constants.CHANGE_CONTENT_THEME: {
      const { contentTheme } = action;
      draftState.contentTheme = contentTheme;
      return draftState;
    }

    case constants.CHANGE_CUSTOM_CODE_THEME: {
      const { customCodeTheme } = action;
      draftState.customCodeTheme = customCodeTheme;
      return draftState;
    }

    case constants.CHANGE_CUSTOM_CONTENT_THEME: {
      const { customContentTheme } = action;
      draftState.customContentTheme = customContentTheme;
      return draftState;
    }

    default:
      return draftState;
  }
});
