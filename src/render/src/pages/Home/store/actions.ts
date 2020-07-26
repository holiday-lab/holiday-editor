import constants from './constants';

export const changeMdInputValue = (mdInputValue: string) => ({
  type: constants.CHANGE_MD_INPUT_VALUE,
  mdInputValue
});

export const changeCustomStyleVisible = () => ({
  type: constants.CHANGE_CUSTOM_STYLE_VISIBLE
});

export const changeCodeTheme = (codeTheme: string) => ({
  type: constants.CHANGE_CODE_THEME,
  codeTheme
});

export const changeContentTheme = (contentTheme: string) => ({
  type: constants.CHANGE_CONTENT_THEME,
  contentTheme
});
