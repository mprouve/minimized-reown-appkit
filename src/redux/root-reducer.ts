import { combineReducers } from '@reduxjs/toolkit';
import snackbar from 'src/redux/slices/snackbar/snackbar';
import authenticated from 'src/redux/slices/authenticated/authenticated';

const rootReducer = combineReducers({
  snackbar,
  authenticated,
});

export default rootReducer;
