'use strict';

jest.mock('async-file');
const fs = require('async-file');

const request = require('supertest');
const server = require('./staticHttpServer');

afterAll(() => {
  server.close();
});

it('fs.open fails', async () => {
  const error = new Error('Something broke.');
  error.code = 'EBROKEN';
  fs.open.mockImplementation(() => Promise.reject(error));

  const response = await request(server).get('/huhu');
  expect(response.statusCode).toBe(500);
});
