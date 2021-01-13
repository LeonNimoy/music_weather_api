import 'dotenv/config'
import fetch from 'node-fetch'

import env from '../../main/config/env'
import { WeatherProvider } from '../../presentation/protocols/weather-provider'

export class WeatherProviderAdapter implements WeatherProvider {
  public async loadUsingCity (city: string): Promise<number> {
    const getCityTemperature = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${env.openWeatherKey}`, {
      method: 'GET'
    })

    const getCityTemperatureResponse = await getCityTemperature.json()

    const temperature = getCityTemperatureResponse.main.temp

    return temperature
  }

  public async loadUsingGeographicalCoordinates (lat: string, long: string): Promise<number> {
    const getGeographicalCoordinateTemperature = await fetch(`http://api.openweathermap.org/data/2.5/weather??lat=${lat}&lon=${long}&units=metric&lang=pt_br&appid=${env.openWeatherKey}`, {
      method: 'GET'
    })
    const getGeographicalCoordinateTemperatureResponse = await getGeographicalCoordinateTemperature.json()

    console.log(getGeographicalCoordinateTemperatureResponse)

    // const temperature = getGeographicalCoordinateTemperatureResponse.main.temp

    return 1
  }
}
