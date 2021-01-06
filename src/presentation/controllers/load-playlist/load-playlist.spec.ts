import { LoadPlayListController } from './load-playlist'
import { MissingParamError, ServerError } from '../../errors'
import { WeatherProvider, MusicProvider } from './load-playlist-protocols'

interface SutTypes {
  sut: LoadPlayListController
  weatherProviderStub: WeatherProvider
  musicProviderStub: MusicProvider
}

const makeWeatherProvider = (): WeatherProvider => {
  class WeatherProviderStub implements WeatherProvider {
    load (city: string): number {
      return 1
    }
  }
  return new WeatherProviderStub()
}

const makeMusicProvider = (): MusicProvider => {
  class MusicProviderStub implements MusicProvider {
    load (temperature: number): string[] {
      return ['any_music']
    }
  }
  return new MusicProviderStub()
}

const makeSut = (): SutTypes => {
  const weatherProviderStub = makeWeatherProvider()
  const musicProviderStub = makeMusicProvider()
  const sut = new LoadPlayListController(weatherProviderStub, musicProviderStub)
  return {
    sut,
    weatherProviderStub,
    musicProviderStub
  }
}

describe('Load Playlist Controller', () => {
  test('should return 200 if valid data is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      param: {
        city_name: 'any_city'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(['any_music'])
  })

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

  test('should call MusicProvider with correct temperature param', () => {
    const { sut, musicProviderStub, weatherProviderStub } = makeSut()
    const loadSpy = jest.spyOn(musicProviderStub, 'load')
    const httpRequest = {
      param: {
        city_name: 'any_city'
      }
    }

    sut.handle(httpRequest)

    const cityTemperature = weatherProviderStub.load(httpRequest.param.city_name)

    expect(loadSpy).toHaveBeenCalledWith(cityTemperature)
  })

  test('should return 500 if MusicProvider throws', () => {
    const { sut, musicProviderStub } = makeSut()
    jest.spyOn(musicProviderStub, 'load').mockImplementationOnce(() => {
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
