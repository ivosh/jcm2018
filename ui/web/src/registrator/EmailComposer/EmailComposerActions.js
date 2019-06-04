import { API_SEND_EMAIL } from 'ui-common/common';
import { WS_API } from 'ui-common/store/wsAPI';

export const SEND_EMAIL = 'SEND_EMAIL';
export const sendEmail = ({ mailTo, subject, body }) => ({
  [WS_API]: {
    type: SEND_EMAIL,
    endpoint: API_SEND_EMAIL,
    request: { mailTo, subject, body },
    title: 'posílání emailu'
  }
});
