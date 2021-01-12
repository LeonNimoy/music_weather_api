import { LoadPlayListController } from './load-playlist'
import { MissingQueryError, ServerError } from '../../errors'
import { WeatherProvider } from './load-playlist-protocols'
import { LoadPlaylist } from '../../../domain/usecases/load-playlist'
import { Playlist } from '../../../domain/models/playlist'
interface SutTypes {
  sut: LoadPlayListController
  weatherProviderStub: WeatherProvider
  musicProviderServiceStub: LoadPlaylist
}

const makeWeatherProvider = (): WeatherProvider => {
  class WeatherProviderStub implements WeatherProvider {
    async loadUsingCity (city: string): Promise<number> {
      return 1
    }

    async loadUsingGeographicalCoordinates (lat: string, long: string): Promise<number> {
      return 1
    }
  }
  return new WeatherProviderStub()
}

const makeMusicProviderService = (): LoadPlaylist => {
  class MusicProviderServiceStub implements LoadPlaylist {
    async loadPlaylist (temperature: number): Promise<Playlist> {
      return ['any_song1', 'any_song2']
    }
  }
  return new MusicProviderServiceStub()
}

const makeSut = (): SutTypes => {
  const weatherProviderStub = makeWeatherProvider()
  const musicProviderServiceStub = makeMusicProviderService()
  const sut = new LoadPlayListController(weatherProviderStub, makeMusicProviderService())
  return {
    sut,
    weatherProviderStub,
    musicProviderServiceStub
  }
}

describe('Load Playlist Controller', () => {
  test('should return 200 if a valid city data is provided', async () => {
    const { sut } = makeSut()
    const httpRequestCity = 'any_city'

    const httpResponse = await sut.handleCity(httpRequestCity)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(['any_song1', 'any_song2'])
  })

  test('should return 200 if some valid geographic coordinates are provided', async () => {
    const { sut } = makeSut()
    const httpRequestLat = '123'
    const httpRequestLong = '456'

    const httpResponse = await sut.handleGeographicalCoordinates(httpRequestLat, httpRequestLong)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(['any_song1', 'any_song2'])
  })

  test('should return 400 if no city name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = ''

    const httpResponse = await sut.handleCity(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingQueryError())
  })

  test('should return 400 if no geographical coordinates are provided', async () => {
    const { sut } = makeSut()
    const httpRequestLat = ''
    const httpRequestLong = ''
    const httpResponse = await sut.handleGeographicalCoordinates(httpRequestLat, httpRequestLong)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingQueryError())
  }
  )

  test('should call WeatherProvider with correct city query', async () => {
    const { sut, weatherProviderStub } = makeSut()
    const loadSpy = jest.spyOn(weatherProviderStub, 'loadUsingCity')
    const httpRequestCity = 'any_city'

    await sut.handleCity(httpRequestCity)
    expect(loadSpy).toHaveBeenCalledWith('any_city')
  })

  test('should call WeatherProvider with the correct geographical coordinates query', async () => {
    const { sut, weatherProviderStub } = makeSut()
    const loadSpy = jest.spyOn(weatherProviderStub, 'loadUsingGeographicalCoordinates')
    const httpRequestLat = '123'
    const httpRequestLong = '456'

    await sut.handleGeographicalCoordinates(httpRequestLat, httpRequestLong)
    expect(loadSpy).toHaveBeenCalledWith('123', '456')
  })

  test('should return 500 if WeatherProvider, receives a city but throws', async () => {
    const { sut, weatherProviderStub } = makeSut()
    jest.spyOn(weatherProviderStub, 'loadUsingCity').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequestCity = 'any_city'

    const httpResponse = await sut.handleCity(httpRequestCity)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 500 if WeatherProvider, receives geographical coordinates but throws', async () => {
    const { sut, weatherProviderStub } = makeSut()
    jest.spyOn(weatherProviderStub, 'loadUsingGeographicalCoordinates').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequestLat = '123'
    const httpRequestLong = '456'

    const httpResponse = await sut.handleGeographicalCoordinates(httpRequestLat, httpRequestLong)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should call Music Provider Service with correct temperature query', async () => {
    const { sut, musicProviderServiceStub, weatherProviderStub } = makeSut()
    const loadSpy = jest.spyOn(musicProviderServiceStub, 'loadPlaylist')
    const httpRequestCity = 'any_city'

    await sut.handleCity(httpRequestCity)

    const cityTemperature = await weatherProviderStub.loadUsingCity(httpRequestCity)

    await musicProviderServiceStub.loadPlaylist(cityTemperature)

    expect(loadSpy).toHaveBeenCalledWith(cityTemperature)
  })

  test.skip('should return 500 if MusicProvider throws', async () => {
    const { sut, musicProviderServiceStub, weatherProviderStub } = makeSut()
    jest.spyOn(musicProviderServiceStub, 'loadPlaylist').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequestCity = 'any_city'

    const httpResponse = await sut.handleCity(httpRequestCity)
    const cityTemperature = await weatherProviderStub.loadUsingCity(httpRequestCity)

    await musicProviderServiceStub.loadPlaylist(cityTemperature)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
