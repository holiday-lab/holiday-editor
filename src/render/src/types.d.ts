import { compose } from 'redux';
import { IHomeState } from './pages/Home/types';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

export interface IState {
  home: IHomeState;
}
