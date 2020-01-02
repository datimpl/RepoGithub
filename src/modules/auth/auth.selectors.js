import { createSelector } from '@reduxjs/toolkit';

export const getAuthFromStore = state => state.auth;

export const getAuthLocale = createSelector(getAuthFromStore, auth => auth.locale);
