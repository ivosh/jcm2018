'use strict';

const request = require('supertest');
const server = require('./static_http');

it('get /', async () => {
  const response = await request(server).get('/');

  // response.body is an empty object because response is some HTML
  expect(response.statusCode).toBe(200);
  expect(typeof response.text).toBe('string');
  expect(response.text.length).toBeGreaterThan(0);
});

it('get /manifest.json', async () => {
  const response = await request(server).get('/manifest.json');

  expect(response.statusCode).toBe(200);
  expect(typeof response.body).toBe('object');
});

it('get /nonexistent => index.html', async () => {
  const response = await request(server).get('/nonexistent');

  expect(response.statusCode).toBe(200);
  expect(typeof response.text).toBe('string');
  expect(response.text.length).toBeGreaterThan(0);
});