import { WeatherProvider } from '../../presentation/protocols/weather-provider'

export class WeatherProviderAdapterMock implements WeatherProvider {
  public async loadUsingCity (city: string): Promise<number> {
    if (city === 'Londres') {
      return 13
    } else if (city === 'Brasil') {
      return 34
    }
  }

  public async loadUsingGeographicalCoordinates (lat: string, long: string): Promise<number> {
    if (lat === '123' && long === '456') {
      return -12
    } else if (lat === '678' && long === '890') {
      return 17
    }
  }
}
