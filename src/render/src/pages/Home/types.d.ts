export interface IHomeState {
  mdInputValue: string;
  customStyleVisible: boolean;
  codeTheme: TCodeTheme;
  contentTheme: TContentTheme;
  customCodeTheme: string;
  customContentTheme: string;
}

export interface IHomeMethods {
  handleMdInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  changeCustomStyleVisible: () => void;
  handleCustomStyleConfirm: () => void;
  handleCustomStyleCancel: () => void;
}

export type TCodeTheme = 'AtomOneDark' | 'AtomOneLight' | 'Dark';
export type TContentTheme = 'TaobaoFED';

export type TThemeObj = {
  [key: string]: string;
};
