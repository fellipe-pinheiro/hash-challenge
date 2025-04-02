const request = require('supertest');
const server = require('../../../src/server');

describe('route: healthcheck', () => {
  it('when call healthcheck endpoint return 200', async () => {
    await request(server)
      .get('/v1/healthcheck')
      .expect((res) => res.body === 'OK');
  });
});
