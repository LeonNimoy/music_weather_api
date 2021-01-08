import { AxiosStatic } from 'axios'

import env from '../../main/config/env'
import { WeatherProvider } from '../../presentation/protocols/weather-provider'

export class WeatherProviderAdapter implements WeatherProvider {
  private readonly request: AxiosStatic
  private readonly openWeatherLanguage: 'pt_br'
  private readonly openWeatherUnit: 'metric'
  private readonly openWeatherBaseUrl: 'api.openweathermap.org/data/2.5/weather'

  constructor (request: AxiosStatic) {
    this.request = request
  }

  public async loadUsingCity (city: string): Promise<number> {
    const { data } = await this.request.get(`${this.openWeatherBaseUrl}?q=${city}&units=${this.openWeatherUnit}&lang=${this.openWeatherLanguage}&appid=${env.openWeatherKey}`)

    const { main: { temp: cityTemperature } } = data

    return cityTemperature
  }

  public async loadUsingGeographicalCoordinates (lat: string, long: string): Promise<number> {
    const { data } = await this.request.get(`${this.openWeatherBaseUrl}?lat=${lat}&lon=${long}&units=${this.openWeatherUnit}&lang=${this.openWeatherLanguage}&appid=${env.openWeatherKey}`)

    const { main: { temp: geographicalCoordinateTemperature } } = data

    return geographicalCoordinateTemperature
  }
}
