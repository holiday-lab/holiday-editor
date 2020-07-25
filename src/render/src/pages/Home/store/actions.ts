import constants from './constants';

export const changeMdInputValue = (mdInputValue: string) => ({
  type: constants.CHANGE_MD_INPUT_VALUE,
  mdInputValue
});

export const changeUrlInputVisible = () => ({
  type: constants.CHANGE_URL_INPUT_VISIBLE
});

export const changeCustomStyleVisible = () => ({
  type: constants.CHANGE_CUSTOM_STYLE_VISIBLE
});
