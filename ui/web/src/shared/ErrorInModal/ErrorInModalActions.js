import { errorToStr } from 'ui-common/errorToStr';

export const hideError = () => ({ type: 'HIDE_ERROR' });

export const showError = ({ code, status, err, type, ...rest }) => ({
  type,
  code,
  status,
  err: errorToStr(err),
  ...rest,
  receivedAt: Date.now()
});
