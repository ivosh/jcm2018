import { API_SEND_EMAIL } from 'ui-common/common';
import { WS_API } from 'ui-common/store/wsAPI';

export const SEND_EMAIL = 'SEND_EMAIL';
export const sendEmail = ({ mailTo, subject, text }) => ({
  [WS_API]: {
    type: SEND_EMAIL,
    endpoint: API_SEND_EMAIL,
    request: { mailTo, subject, text },
    title: 'posílání emailu'
  }
});
