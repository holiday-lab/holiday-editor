export interface IHomeState {
  mdInputValue: string;
  customStyleVisible: boolean;
}

export interface IHomeMethods {
  handleMdInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  changeCustomStyleVisible: () => void;
  handleCustomStyleConfirm: () => void;
  handleCustomStyleCancel: () => void;
}
