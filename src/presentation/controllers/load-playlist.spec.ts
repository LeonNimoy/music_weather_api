import { LoadPlayListController } from './load-playlist'
import { MissingParamError } from '../errors/missing-param-erro'

describe('Load Playlist Controller', () => {
  test('should return 400 if no city name is provided', () => {
    const sut = new LoadPlayListController()
    const httpRequest = {
      param: {
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('city_name'))
  })
})
