/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

// Define the initial state using that type
const initialState: AuthenticatedState = {
  authenticated: false,
};

const authenticatedSlice = createSlice({
  name: 'authenticated',
  initialState,
  reducers: {
    setAuthenticated: {
      reducer(state, action: PayloadAction<AuthenticatedPayload>) {
        state.authenticated = action.payload.authenticated;
      },
      prepare(authenticated: Authenticated) {
        return {
          payload: {
            authenticated,
          },
        };
      },
    },
    clearAuthenticated: state => {
      state.authenticated = false;
    },
  },
});

// Input Selectors
export const selectAuthenticated = (state: RootState) => state.authenticated.authenticated;

export const { setAuthenticated, clearAuthenticated } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
