import { Controller, HttpRequest, HttpResponse, MusicProvider, WeatherProvider } from './load-playlist-protocols'
import { MissingParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class LoadPlayListController implements Controller {
  private readonly weatherProvider: WeatherProvider
  private readonly musicProvider: MusicProvider

  constructor (weatherProvider: WeatherProvider, musicProvider: MusicProvider) {
    this.weatherProvider = weatherProvider
    this.musicProvider = musicProvider
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.param.city_name) {
        return badRequest(new MissingParamError('city_name'))
      }

      const cityTemperature = await this.weatherProvider.load(httpRequest.param.city_name)

      const playlist = await this.musicProvider.load(cityTemperature)

      return ok(playlist)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
