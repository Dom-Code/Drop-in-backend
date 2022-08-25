const request = require('supertest');
const app = require('./app');

describe('Test Handlers', () => {
  // partial providers
  test('gets partial providers', async () => {
    const res = await request(app).get('/api/partial-providers');
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.statusCode).toEqual(200);
  });

  // auth tests
  it('returns 400 code if no entry is provided', async () => {
    const res = await request(app).post('/api/auth').send({});
    expect(res.statusCode).toEqual(400);
  });

  it('returns 401 code when wrong email or password is entered', async () => {
    const res = await request(app).post('/api/auth').send({ email: 'lucy@lucy.com', pw: 'lucy' });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Incorrect email or password');
  });

  it('Correct email and password entered returns 200, truthy value of auth, and access and refresh tokens', async () => {
    const res = await request(app).post('/api/auth').send({ email: '89.dom.m@gmail.com', pw: 'Cassandr0!' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.refreshToken).toBeTruthy();
    expect(res.body.auth).toBeTruthy();
  });
});
