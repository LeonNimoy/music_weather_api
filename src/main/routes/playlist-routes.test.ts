import request from 'supertest'

import app from '../config/app'

describe('Playlist Routes', () => {
  test('should return a playlist on success', async () => {
    await request(app)
      .get('/playlist')
      .expect(200)
  })
})
