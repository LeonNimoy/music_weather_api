import { LoadPlayListController } from './load-playlist'
import { MissingParamError } from '../errors/missing-param-erro'

const makeSut = (): LoadPlayListController => {
  return new LoadPlayListController()
}

describe('Load Playlist Controller', () => {
  test('should return 400 if no city name is provided', () => {
    const sut = makeSut()
    const httpRequest = {
      param: {
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('city_name'))
  })
})
