import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggingIn: false,
  isSigningOut: false,
  isAuthenticated: false,
  accessToken: null,
  user: {},
  hasInitialUser: false,
  orgs: [],
  events: [],
  isPendingUser: false,
  isPendingOrgs: false,
  isPendingEvents: false,
  error: '',
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //Login
    startAuth: state => ({ ...state, ...state, isLoggingIn: true, isAuthenticated: false }),
    successAuth: (state, { payload: { result } }) => ({
      ...state,
      isLoggingIn: false,
      isAuthenticated: true,
      accessToken: result,
    }),
    failAuth: state => ({ ...state, isLoggingIn: false, isAuthenticated: false }),
  },
});

export default auth;
