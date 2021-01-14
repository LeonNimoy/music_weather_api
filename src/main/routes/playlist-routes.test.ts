import request from 'supertest'

import app from '../config/app'

test('should return 400, if no param is provided', async () => {
  await request(app)
    .get('/playlist')
    .expect(400)
})
