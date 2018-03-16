'use strict';

jest.mock('async-file');
const fs = require('async-file');

const request = require('supertest');
const server = require('./staticHttpServer');

afterAll(() => {
  server.close();
});

it('fs.fstat fails', async () => {
  const error = new Error('Something broke.');
  error.code = 'EBROKEN';
  fs.fstat.mockImplementation(() => Promise.reject(error));

  const response = await request(server).get('/haha');
  expect(response.statusCode).toBe(500);
});
