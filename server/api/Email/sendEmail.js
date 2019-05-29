'use strict';

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { CODE_OK, CODE_TOKEN_INVALID } = require('../../../common/common');
const config = require('../../config');
const logger = require('../../logger');

/* Usage:
    export GOOGLE_OAUTH2_CLIENT_ID=...
    export GOOGLE_OAUTH2_CLIENT_SECRET=...
    export GOOGLE_MAIL_USER=...
    export GOOGLE_OAUTH2_REFRESH_TOKEN=...
    NODE_ENV=production LOG_LEVEL=silly node ./server/api/Email/sendEmail.js

  https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1
*/

const { OAuth2 } = google.auth;

const createGmailTransport = async () => {
  const oauth2Client = new OAuth2(
    config.email.gmail.clientId,
    config.email.gmail.clientSecret,
    'https://developers.google.com/oauthplayground' // Redirect URL
  );
  oauth2Client.setCredentials({ refresh_token: config.email.gmail.refreshToken });

  logger.debug('Obtaining Google OAuth2 access token...');
  let accessToken;
  try {
    accessToken = await oauth2Client.getAccessToken();
  } catch (error) {
    logger.error(error);
    return { code: CODE_TOKEN_INVALID, status: 'Chyba při získávání tokenu z Google OAuth2.' };
  }

  logger.info('Obtained Google OAuth2 access token.');
  logger.silly('Access token: ', accessToken);

  return {
    code: CODE_OK,
    transport: nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        user: config.email.gmail.user,
        clientId: config.email.gmail.clientId,
        clientSecret: config.email.gmail.clientSecret,
        refreshToken: config.email.gmail.refreshToken,
        accessToken
      }
    })
  };
};

const createMockTransport = async () => {
  const sendMailMock = jest.fn();
  return {
    code: CODE_OK,
    transport: nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock })
  };
};

const transports = {
  gmail: createGmailTransport,
  mock: createMockTransport
};

const sendEmail = async ({ request }) => {
  const { mailTo, subject, html } = request;

  const { code, status, transport } = await transports[config.email.transport]();
  if (code !== CODE_OK) {
    return { code, status };
  }

  const mailOptions = {
    from: 'ivosh@ivosh.net', // :TODO: email z modelu User
    to: mailTo,
    subject,
    generateTextFromHTML: true,
    html
  };

  logger.debug(`Sending email to ${mailTo}...`);
  try {
    const response = await transport.sendMail(mailOptions);
    logger.info(`Email to ${mailTo} sent successfully.`);
    logger.silly('Response: ', response);
  } catch (error) {
    logger.error('Failed to send the email: ', error);
    return { code: CODE_UNFULFILLED_REQUEST, status: 'Chyba při posílání emailu.' };
  } finally {
    transport.close();
  }

  return { code: CODE_OK, status: undefined };
};

module.exports = sendEmail;

sendEmail({
  request: {
    mailTo: 'ivosh@ivosh.net',
    subject: 'Node.js Email with Secure OAuth2',
    html: '<b>test</b> email'
  }
})
  .then()
  .catch(err => logger.error(err));
