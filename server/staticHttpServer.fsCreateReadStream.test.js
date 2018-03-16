'use strict';

jest.mock('async-file');
const fs = require('async-file');

const request = require('supertest');
const server = require('./staticHttpServer');

afterAll(() => {
  server.close();
});

it('fs.createReadStream fails', async () => {
  const error = new Error('Something broke.');
  error.code = 'EBROKEN';
  fs.createReadStream.mockImplementation(() => undefined);

  const response = await request(server).get('/hoho.svg');
  expect(response.statusCode).toBe(500);
});
