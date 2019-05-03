import { API_SIGN_OUT } from 'ui-common/common';
import { WS_API } from 'ui-common/store/wsAPI';

const takeFromCache = state => !state.auth.authenticated;

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => ({
  [WS_API]: {
    type: SIGN_OUT,
    endpoint: API_SIGN_OUT,
    takeFromCache,
    title: 'odhlašování'
  }
});
