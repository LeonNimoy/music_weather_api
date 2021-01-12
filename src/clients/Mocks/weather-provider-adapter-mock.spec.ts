
import { WeatherProviderAdapterMock } from './weather-provider-adapter-mock'

describe('Weather Provider Adapter Mock', () => {
  test('should return 13, if Londres param is passed', async () => {
    const city = 'Londres'
    const sut = new WeatherProviderAdapterMock()
    const playlist = await sut.loadUsingCity(city)
    expect(playlist).toEqual(13)
  })

  test('should return 34, if Brasil param is passed', async () => {
    const city = 'Brasil'
    const sut = new WeatherProviderAdapterMock()
    const playlist = await sut.loadUsingCity(city)
    expect(playlist).toEqual(34)
  })

  test('should return -12, if lat=123 and long=456 param is passed', async () => {
    const lat = '123'
    const long = '456'
    const sut = new WeatherProviderAdapterMock()
    const playlist = await sut.loadUsingGeographicalCoordinates(lat, long)
    expect(playlist).toEqual(-12)
  })

  test('should return 17, if lat=678 and long=890 param is passed', async () => {
    const lat = '678'
    const long = '890'
    const sut = new WeatherProviderAdapterMock()
    const playlist = await sut.loadUsingGeographicalCoordinates(lat, long)
    expect(playlist).toEqual(17)
  })
})
