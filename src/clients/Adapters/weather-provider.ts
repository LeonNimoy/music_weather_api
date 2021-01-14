import 'dotenv/config'
import fetch from 'node-fetch'

import env from '../../main/config/env'
import { WeatherProvider } from '../../presentation/protocols/weather-provider'
import { NotFoundError, InvalidParamError } from '../../presentation/errors'
import { notFound, badRequest } from '../../presentation/helpers/http-helper'

export class WeatherProviderAdapter implements WeatherProvider {
  public async loadUsingCity (city: string): Promise<any> {
    try {
      const getCityTemperature = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${env.openWeatherKey}`, {
        method: 'GET'
      })

      if (getCityTemperature.status === 404) {
        const getCityTemperatureResponse = await getCityTemperature.json()
        console.error(getCityTemperatureResponse)

        return notFound(new NotFoundError())
      } else if (getCityTemperature.status === 400) {
        const getCityTemperatureResponse = await getCityTemperature.json()
        console.error(getCityTemperatureResponse)

        return badRequest(new InvalidParamError())
      } else {
        const getCityTemperatureResponse = await getCityTemperature.json()

        const temperature = getCityTemperatureResponse.main.temp

        return temperature
      }
    } catch (error) {
      console.error(error)
    }
  }

  public async loadUsingGeographicalCoordinates (lat: string, long: string): Promise<any> {
    try {
      const getGeographicalCoordinateTemperature = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=pt_br&appid=${env.openWeatherKey}`, {
        method: 'GET'
      })

      if (getGeographicalCoordinateTemperature.status === 400) {
        const getGeographicalCoordinateTemperatureResponse = await getGeographicalCoordinateTemperature.json()

        console.error(getGeographicalCoordinateTemperatureResponse)
        return badRequest(new InvalidParamError())
      } else if (getGeographicalCoordinateTemperature.status === 404) {
        const getGeographicalCoordinateTemperatureResponse = await getGeographicalCoordinateTemperature.json()

        console.error(getGeographicalCoordinateTemperatureResponse)
        return notFound(new NotFoundError())
      } else {
        const getGeographicalCoordinateTemperatureResponse = await getGeographicalCoordinateTemperature.json()

        const temperature = getGeographicalCoordinateTemperatureResponse.main.temp

        return temperature
      }
    } catch (error) {
      console.error(error)
    }
  }
}
