import { combineReducers } from 'redux';
import { reducer as homeReducer } from '../pages/Home/store';

const reducer = combineReducers({
  home: homeReducer
});

export default reducer;
