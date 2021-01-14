import request from 'supertest'

import app from '../config/app'

describe('Playlist Routes', () => {
  test('should return a playlist on success, if city param is provided', async () => {
    await request(app)
      .get('/playlist')
      .query({ city: 'Brazil' })
      .expect(200)
  })

  test('should return a playlist on success, if city param is provided', async () => {
    await request(app)
      .get('/playlist')
      .query({ lat: '35', long: '139' })
      .expect(200)
  })

  test('should return 400, if no param is provided', async () => {
    await request(app)
      .get('/playlist')
      .expect(400)
  })
})
