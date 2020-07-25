import constants from './constants';
import { produce } from 'immer';
import { IHomeState } from '../types';

const defaultState: IHomeState = {
  mdInputValue: '',
  urlInputVisible: false,
  customStyleVisible: false
};

export default produce((draftState: IHomeState = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case constants.CHANGE_MD_INPUT_VALUE: {
      const { mdInputValue } = action;
      draftState.mdInputValue = mdInputValue;
      return draftState;
    }

    case constants.CHANGE_URL_INPUT_VISIBLE: {
      const { urlInputVisible } = draftState;
      draftState.urlInputVisible = !urlInputVisible;
      return draftState;
    }

    case constants.CHANGE_CUSTOM_STYLE_VISIBLE: {
      const { customStyleVisible } = draftState;
      draftState.customStyleVisible = !customStyleVisible;
      return draftState;
    }

    default:
      return draftState;
  }
});
