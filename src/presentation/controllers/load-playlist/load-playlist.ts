import { Controller, HttpRequest, HttpResponse, MusicProvider, WeatherProvider } from './load-playlist-protocols'
import { MissingQueryError } from '../../errors'
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
      const { city, lat, long } = httpRequest.query

      if (!city && !(lat && long)) {
        return badRequest(new MissingQueryError())
      }

      if (city) {
        const cityTemperature = await this.weatherProvider.loadUsingCity(city)
        const playlist = await this.musicProvider.load(cityTemperature)
        return ok(playlist)
      }

      if (lat && long) {
        const geographicalCoordinatesTemperature = await this.weatherProvider.loadUsingGeographicalCoordinates(lat, long)
        const playlist = await this.musicProvider.load(geographicalCoordinatesTemperature)
        return ok(playlist)
      }
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
