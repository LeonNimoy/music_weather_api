import { Controller, HttpRequest, HttpResponse, WeatherProvider } from './load-playlist-protocols'
import { MissingQueryError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { MusicProviderService } from '../../services/music-provider'

export class LoadPlayListController implements Controller {
  private readonly weatherProvider: WeatherProvider
  private readonly musicProviderService: MusicProviderService

  constructor (weatherProvider: WeatherProvider) {
    this.weatherProvider = weatherProvider
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { city, lat, long } = httpRequest.query

      if (!city && !(lat && long)) {
        return badRequest(new MissingQueryError())
      }

      if (city) {
        const cityTemperature = await this.weatherProvider.loadUsingCity(city)
        const playlist = await this.musicProviderService.loadPlaylist(cityTemperature)
        return ok(playlist)
      }

      if (lat && long) {
        const geographicalCoordinatesTemperature = await this.weatherProvider.loadUsingGeographicalCoordinates(lat, long)
        const playlist = await this.musicProviderService.loadPlaylist(geographicalCoordinatesTemperature)
        return ok(playlist)
      }
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
