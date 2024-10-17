/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

// Define the initial state using that type
const initialState: SnackbarState = {
  snackbar: {
    severity: 'info',
    msg: '',
  },
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbar: {
      reducer(state, action: PayloadAction<SnackbarPayload>) {
        state.snackbar = action.payload.snackbar;
      },
      prepare(snackbar: Snackbar) {
        return {
          payload: {
            snackbar,
          },
        };
      },
    },
    clearSnackbar: state => {
      state.snackbar = initialState.snackbar;
    },
  },
});

// Input Selectors
const selectSnackbar = (state: RootState) => state.snackbar.snackbar;

// Memoized Selectors
export const memoSelectSnackbar = createSelector([selectSnackbar], snackbar => snackbar);

export const { setSnackbar, clearSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
