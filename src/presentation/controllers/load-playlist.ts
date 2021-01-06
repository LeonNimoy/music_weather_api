import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { WeatherProvider } from '../protocols/weather-provider'
import { MusicProvider } from '../protocols/music-provider'

export class LoadPlayListController implements Controller {
  private readonly weatherProvider: WeatherProvider
  private readonly musicProvider: MusicProvider

  constructor (weatherProvider: WeatherProvider, musicProvider: MusicProvider) {
    this.weatherProvider = weatherProvider
    this.musicProvider = musicProvider
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.param.city_name) {
        return badRequest(new MissingParamError('city_name'))
      }

      const cityTemperature = this.weatherProvider.load(httpRequest.param.city_name)

      this.musicProvider.load(cityTemperature)
    } catch (error) {
      return serverError()
    }
  }
}
