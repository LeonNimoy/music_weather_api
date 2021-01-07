import { LoadPlayListController } from './load-playlist'
import { MissingQueryError, ServerError } from '../../errors'
import { WeatherProvider, MusicProvider } from './load-playlist-protocols'

interface SutTypes {
  sut: LoadPlayListController
  weatherProviderStub: WeatherProvider
  musicProviderStub: MusicProvider
}

const makeWeatherProvider = (): WeatherProvider => {
  class WeatherProviderStub implements WeatherProvider {
    async loadUsingCity (city: string): Promise<number> {
      return 1
    }

    async loadUsingGeographicalCoordinates (lat: string): Promise<number> {
      return 1
    }
  }
  return new WeatherProviderStub()
}

const makeMusicProvider = (): MusicProvider => {
  class MusicProviderStub implements MusicProvider {
    async load (temperature: number): Promise<string[]> {
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
  test('should return 200 if a valid city data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(['any_music'])
  })

  test('should return 200 if a valid geographic coordinates are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
        lat: '123',
        long: '456'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(['any_music'])
  })

  test('should return 400 if no city name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingQueryError())
  })

  test('should call WeatherProvider with correct city query', async () => {
    const { sut, weatherProviderStub } = makeSut()
    const loadSpy = jest.spyOn(weatherProviderStub, 'loadUsingCity')
    const httpRequest = {
      query: {
        city: 'any_city'
      }
    }
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_city')
  })

  test('should return 500 if WeatherProvider throws', async () => {
    const { sut, weatherProviderStub } = makeSut()
    jest.spyOn(weatherProviderStub, 'loadUsingCity').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      query: {
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should call MusicProvider with correct temperature query', async () => {
    const { sut, musicProviderStub, weatherProviderStub } = makeSut()
    const loadSpy = jest.spyOn(musicProviderStub, 'load')
    const httpRequest = {
      query: {
        city: 'any_city'
      }
    }

    await sut.handle(httpRequest)

    const cityTemperature = await weatherProviderStub.loadUsingCity(httpRequest.query.city)

    expect(loadSpy).toHaveBeenCalledWith(cityTemperature)
  })

  test('should return 500 if MusicProvider throws', async () => {
    const { sut, musicProviderStub } = makeSut()
    jest.spyOn(musicProviderStub, 'load').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      query: {
        city: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
