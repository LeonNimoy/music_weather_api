import { LoadPlayListController } from './load-playlist'

describe('Load Playlist Controller', () => {
  test('should return 400 if no city name is provided', () => {
    const sut = new LoadPlayListController()
    const httpRequest = {
      body: {
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
