
import { WeatherProviderAdapter } from './weather-provider'
import { InvalidParamError } from '../../presentation/errors'

describe('Weather Provider Adapter', () => {
  test('should return a success promise from Open Weather service, passing a city name as param', async () => {
    const city = 'Moscou'

    const sut = new WeatherProviderAdapter()

    const loadSpy = jest.spyOn(sut, 'loadUsingCity').mockResolvedValue(12)

    await sut.loadUsingCity(city)

    expect(loadSpy).toBeTruthy()
  })

  test('should return a success promise from Open Weather service, passing geographical coordinates as param', async () => {
    const lat = '-19.912998'
    const long = '-43.940933'

    const sut = new WeatherProviderAdapter()

    const loadSpy = jest.spyOn(sut, 'loadUsingGeographicalCoordinates').mockResolvedValue(12)

    await sut.loadUsingGeographicalCoordinates(lat, long)

    expect(loadSpy).toBeTruthy()
  })

  test('should return 400, if an invalid geographical coordinates is provided', async () => {
    const lat = 'invalid_lat'
    const long = 'invalid_long'

    const sut = new WeatherProviderAdapter()

    const musicProvider = await sut.loadUsingGeographicalCoordinates(lat, long)

    expect(musicProvider.body).toEqual(new InvalidParamError())
  })
})
