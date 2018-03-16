'use strict';

jest.mock('async-file');
const fs = require('async-file');

const request = require('supertest');
const server = require('./staticHttpServer');

afterAll(() => {
  server.close();
});

it('unrecognized extension', async () => {
  const response = await request(server).get('/huhu.smrk');
  expect(response.statusCode).toBe(500);
});
