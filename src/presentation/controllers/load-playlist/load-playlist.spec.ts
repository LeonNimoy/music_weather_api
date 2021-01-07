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
    async load (city: string): Promise<number> {
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
  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      query: {
        city_name: 'any_city'
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
    expect(httpResponse.body).toEqual(new MissingQueryError('city_name'))
  })

  test('should call WeatherProvider with correct city query', async () => {
    const { sut, weatherProviderStub } = makeSut()
    const loadSpy = jest.spyOn(weatherProviderStub, 'load')
    const httpRequest = {
      query: {
        city_name: 'any_city'
      }
    }
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_city')
  })

  test('should return 500 if WeatherProvider throws', async () => {
    const { sut, weatherProviderStub } = makeSut()
    jest.spyOn(weatherProviderStub, 'load').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      query: {
        city_name: 'any_city'
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
        city_name: 'any_city'
      }
    }

    await sut.handle(httpRequest)

    const cityTemperature = await weatherProviderStub.load(httpRequest.query.city_name)

    expect(loadSpy).toHaveBeenCalledWith(cityTemperature)
  })

  test('should return 500 if MusicProvider throws', async () => {
    const { sut, musicProviderStub } = makeSut()
    jest.spyOn(musicProviderStub, 'load').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      query: {
        city_name: 'any_city'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
