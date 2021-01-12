import request from 'supertest'

import app from '../config/app'

describe('Playlist Routes', () => {
  test('should return a playlist on success, if city param is provided', async () => {
    await request(app)
      .get('/playlist')
      .query({ city: 'Brasil' })
      .expect(200)
  })

  test('should return a playlist on success, if city param is provided', async () => {
    await request(app)
      .get('/playlist')
      .query({ lat: '123', long: '456' })
      .expect(200)
  })

  test.skip('should return 400, if no param is provided', async () => {
    await request(app)
      .get('/playlist')
      .expect(400)
  })
})
