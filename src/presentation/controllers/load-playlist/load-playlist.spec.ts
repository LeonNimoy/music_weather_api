import { LoadPlayListController } from './load-playlist'
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

  test('should call Music Provider Service with correct temperature query', async () => {
    const { sut, musicProviderServiceStub, weatherProviderStub } = makeSut()
    const loadSpy = jest.spyOn(musicProviderServiceStub, 'loadPlaylist')
    const httpRequestCity = 'any_city'

    await sut.handleCity(httpRequestCity)

    const cityTemperature = await weatherProviderStub.loadUsingCity(httpRequestCity)

    await musicProviderServiceStub.loadPlaylist(cityTemperature)

    expect(loadSpy).toHaveBeenCalledWith(cityTemperature)
  })
})
