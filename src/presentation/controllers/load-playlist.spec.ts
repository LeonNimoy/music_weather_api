import { LoadPlayListController } from './load-playlist'
import { MissingParamError, ServerError } from '../errors'
import { WeatherProvider } from '../protocols/weather-provider'

interface SutTypes {
  sut: LoadPlayListController
  weatherProviderStub: WeatherProvider
}

const makeWeatherProvider = (): WeatherProvider => {
  class WeatherProviderStub implements WeatherProvider {
    load (city: string): number {
      return 1
    }
  }
  return new WeatherProviderStub()
}

const makeSut = (): SutTypes => {
  const weatherProviderStub = makeWeatherProvider()
  const sut = new LoadPlayListController(weatherProviderStub)
  return {
    sut,
    weatherProviderStub
  }
}

describe('Load Playlist Controller', () => {
  test('should return 400 if no city name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      param: {
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('city_name'))
  })

  test('should call WeatherProvider with correct city param', () => {
    const { sut, weatherProviderStub } = makeSut()
    const loadSpy = jest.spyOn(weatherProviderStub, 'load')
    const httpRequest = {
      param: {
        city_name: 'any_city'
      }
    }
    sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_city')
  })

  test('should return 500 if WeatherProvider throws', () => {
    const { sut, weatherProviderStub } = makeSut()
    jest.spyOn(weatherProviderStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      param: {
        city_name: 'any_city'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
